function executarCSS(cor) {
    let elemento = document.querySelector(".img img");
    elemento.classList.remove("vermelho", "laranja", "azul", "verde", "roxo");
    elemento.classList.add(cor);

    let letterSpan = document.getElementById("letter");
    letterSpan.className = '';
    letterSpan.classList.add(cor);

    let elementoPreview = document.querySelector("#imagem-preview img");
    elementoPreview.style.filter = "drop-shadow(0 0 1rem " + getCorHexadecimal(cor) + ")";

    if (cor === "branco") {
        elementoPreview.style.filter = "grayscale(100%) drop-shadow(0 0 1rem white)"; // Aplica o filtro de preto e branco e o sombreamento
    }
}

function getCorHexadecimal(cor) {
        switch (cor) {
            case 'branco':
                return '#FFFFFF';
            case 'vermelho':
                return '#FF0000';
            case 'laranja':
                return '#FFA500';
            case 'azul':
                return '#0000FF';
            case 'verde':
                return '#008000';
            case 'roxo':
                return '#800080';
            default:
                return '#000000'; // Cor preta como padrão
        }
    }

    const input = document.getElementById('imagem-input');
    const preview = document.getElementById('imagem-preview');

    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.innerHTML = '';
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    });