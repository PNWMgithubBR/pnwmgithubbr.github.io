import os
from flask import Flask, flash, request, redirect, url_for, render_template, send_from_directory
from werkzeug.utils import secure_filename
import json
import logging

log = logging.getLogger('werkzeug')
log.disabled = True

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'md', 'pdf', 'jpg', 'jpeg', 'svg', 'gif', 'png', 'wav', 'ogg', 'mp3', 'mp4'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# routes
@app.route('/', methods = ['GET', 'POST'])
def list():
    if request.method == 'POST':
        if 'file' not in request.files:
            return "Sem parte do arquivo"
        file = request.files['file']
        if file.filename == '':
            return "Nenhum arquivo selecionado"
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect("/")
    else:
        listing = []
        for filename in os.listdir(app.config['UPLOAD_FOLDER']):
            listing.append(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return render_template('list.html', listing=listing)
    return 'Arquivo não carregado com sucesso'

@app.route('/uploads/<path:filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename, as_attachment=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if __name__ == "__main__":
    app.run()