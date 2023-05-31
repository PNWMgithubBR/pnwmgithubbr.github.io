let canvas;
let ctx;
let selectedCamada = -1;
let clickPos = {x:0, y:0};
let posAtClick = {x:0, y:0};
let dragging = false;
const Types = {
    Image:0,
    Text:1
}
const Colors = {
    White:"white",
    FollowImage:"red"
}
const defaultCamadaImage = {
    type:Types.Image,
    scale: 1,
    posX:1920/2,
    posY:1080/2,
    glowColor:Colors.FollowImage,
    glowSize:0,
    image:null
}
const defaultCamadaText = {
    type:Types.Text,
    posX:1920/2,
    posY:1080/2,
    glowColor:Colors.FollowImage,
    glowSize:0,
    textColor:Colors.FollowImage,
    text:"PUTZ",
    font:"COCOGOOSE",
    fontSize:180,
    textAlign:"left"
}
const img = new Image();

let camadas = [
    {
        "type": 0,
        "scale": 3.2,
        "posX": 0,
        "posY": 0,
        "glowColor": "red",
        "glowSize": 0,
        "image": img
    },
    {
        "type": 1,
        "scale": 1,
        "posX": 216,
        "posY": 604,
        "glowColor": "red",
        "glowSize": 120,
        "textColor": "red",
        "text": "P",
        "font": "COCOGOOSE",
        "fontSize": "200",
        "textAlign": "left"
    },
    {
        "type": 1,
        "posX": 352,
        "posY": 609,
        "glowColor": "red",
        "glowSize": 0,
        "textColor": "white",
        "text": "UTZ",
        "font": "COCOGOOSE",
        "fontSize": "200",
        "textAlign": "left"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    //inicialiar os listeners apenas depois que a página carregar
    img.src = "putzImg/vermelho.png";
    img.onload = function(){
        setupListeners();
        setupCanvas();
        drawCanvas();
        drawCamadas();
    }
});

function setupListeners() {
    //listeners do canvas
    canvas = document.getElementById("thumb");
    canvas.addEventListener("mousedown", (e) => {
        dragging = true;
        clickPos.x = e.offsetX;
        clickPos.y = e.offsetY;
        if(selectedCamada != -1){
            posAtClick.x = camadas[selectedCamada].posX;
            posAtClick.y = camadas[selectedCamada].posY;
        }
    });
    canvas.addEventListener("mousemove", (e) => {
        if(selectedCamada != -1 && dragging){
            camadas[selectedCamada].posX = posAtClick.x + (e.offsetX - clickPos.x);
            camadas[selectedCamada].posY = posAtClick.y + (e.offsetY - clickPos.y);
            drawCanvas();
        }
    });
    canvas.addEventListener("mouseup", (e) => {
        dragging = false;
    });

    //any place mouse up sets dragging to false
    document.addEventListener("mouseup", (e) => {
        dragging = false;
    });

    //listeners dos parametros para ediçao
    // document.getElementById("titulo").addEventListener("input", setupCanvas);
    document.getElementById("cor").addEventListener("input", setColor);
    document.getElementById("add-text").addEventListener("click", () => {
        camadas.push(defaultCamadaText);
        drawCanvas();
        drawCamadas();
    });
    document.getElementById("add-image").addEventListener("click", () => {
        camadas.push(defaultCamadaImage);
        drawCanvas();
        drawCamadas();
    });

    //listeners do download
    document.getElementById("baixar").addEventListener("click", downloadCanvas);
}

function setupCanvas(){
    //inicializar o canvas
    canvas = document.getElementById("thumb");
    ctx = canvas.getContext("2d");
}

function drawCanvas(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < camadas.length; ++i){
        if(camadas[i].type == Types.Image){
            drawImage(camadas[i]);
        }
        else if(camadas[i].type == Types.Text){
            drawText(camadas[i]);
        }
    }
}

function drawImage(camada){
    ctx.shadowBlur = camada.glowSize;
    ctx.shadowColor = camada.glowColor;
    if(camada.image != null){
        ctx.drawImage(camada.image, camada.posX, camada.posY, camada.image.width*camada.scale, camada.image.height*camada.scale);
    }
}

function drawText(camada){
    ctx.shadowBlur = camada.glowSize;
    ctx.shadowColor = camada.glowColor;
    ctx.font = camada.fontSize+"px "+camada.font;
    ctx.fillStyle = camada.textColor;
    ctx.textAlign = camada.textAlign;
    ctx.fillText(camada.text, camada.posX, camada.posY);
}

function setColor(){
    //set hue rotation to #cor
    const hue = document.getElementById("cor").value;
    canvas.style.filter = "hue-rotate("+hue+"deg)";
}

function downloadCanvas(){
    const canvas = document.getElementById("thumb");
    //get certificado image data
    const data = canvas.toDataURL("image/png");
    //create download link
    let link = document.createElement("a");
    link.download = "thumbnail.png";
    link.href = data;
    //click download link
    link.click();
}

function drawCamadas(){
    const camadasDiv = document.getElementById("editor-camadas");
    camadasDiv.innerHTML = "";
    for(var i = 0; i < camadas.length; ++i){
        const camadaDiv = document.createElement("div");
        camadaDiv.classList.add("editor-camada");
        camadaDiv.classList.add("camada"+i);
        camadasDiv.appendChild(camadaDiv);
        //add all properties
        const camada = camadas[i];
        if(camada.type == Types.Image){
            drawImageCamadaProperties(camadaDiv, camada, i);
        } else if(camada.type == Types.Text){
            drawTextCamadaProperties(camadaDiv, camada, i);
        }
    }
    if(selectedCamada != -1){
        console.log("selectedCamada: "+selectedCamada);
        const camadaDiv = document.querySelector(".camada"+selectedCamada);
        camadaDiv.classList.add("selected");
    }
}

function drawImageCamadaProperties(camadaDiv, camada, i){
    //add image
    const img = document.createElement("img");
    if(camada.image != null){
        img.src = camada.image.src;
    }
    img.classList.add("editor-camada-img");
    img.classList.add("editor-item");
    camadaDiv.appendChild(img);
    //image input on change set image on load draw canvas
    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.addEventListener("change", () => {
        const newImg = new Image();
        newImg.src = URL.createObjectURL(imgInput.files[0]);
        newImg.onload = function(){
            camada.image = newImg;
            drawCanvas();
            drawCamadas();
        }
    });
    camadaDiv.appendChild(imgInput);
    //add scale
    const scaleDiv = document.createElement("div");
    scaleDiv.classList.add("editor-camada-scale");
    scaleDiv.classList.add("editor-item");
    const scaleLabel = document.createElement("label");
    scaleLabel.innerText = "Escala:";
    scaleDiv.appendChild(scaleLabel);
    const scaleInput = document.createElement("input");
    scaleInput.classList.add("input");
    scaleInput.type = "number";
    scaleInput.value = camada.scale;
    scaleInput.addEventListener("input", () => {
        camada.scale = scaleInput.value;
        drawCanvas();
    });
    scaleDiv.appendChild(scaleInput);
    camadaDiv.appendChild(scaleDiv);
    //add glow color
    const glowColorDiv = document.createElement("div");
    glowColorDiv.classList.add("editor-camada-glow-color");
    glowColorDiv.classList.add("editor-item");
    const glowColorLabel = document.createElement("label");
    glowColorLabel.innerText = "Cor do brilho:";
    glowColorDiv.appendChild(glowColorLabel);
    const glowColorInput = document.createElement("select");
    glowColorInput.classList.add("input");
    //options from Colors
    for(let i = 0; i < 2; i++){
        const option = document.createElement("option");
        if(i == 0){
            option.value = Colors.White;
            option.innerText = "Branco";
        }else{
            option.value = Colors.FollowImage;
            option.innerText = "Seguir Cor do Fundo";
        }
        glowColorInput.appendChild(option);
    }
    glowColorInput.value = camada.glowColor;
    glowColorInput.addEventListener("change", () => {
        camada.glowColor = glowColorInput.value;
        drawCanvas();
    });
    glowColorDiv.appendChild(glowColorInput);
    camadaDiv.appendChild(glowColorDiv);
    //add glow size
    const glowSizeDiv = document.createElement("div");
    glowSizeDiv.classList.add("editor-camada-glow-size");
    glowSizeDiv.classList.add("editor-item");
    const glowSizeLabel = document.createElement("label");
    glowSizeLabel.innerText = "Tamanho do brilho:";
    glowSizeDiv.appendChild(glowSizeLabel);
    const glowSizeInput = document.createElement("input");
    glowSizeInput.classList.add("input");
    glowSizeInput.type = "number";
    glowSizeInput.value = camada.glowSize;
    glowSizeInput.addEventListener("input", () => {
        camada.glowSize = glowSizeInput.value;
        drawCanvas();
    });
    glowSizeDiv.appendChild(glowSizeInput);
    camadaDiv.appendChild(glowSizeDiv);
    //add remove button
    const removeButton = document.createElement("div");
    removeButton.classList.add("editor-btn-remove");
    removeButton.innerText = "Remover";
    removeButton.addEventListener("click", () => {
        camadas.splice(i, 1);
        if(selectedCamada == i){
            selectedCamada = -1;
        }
        drawCanvas();
        drawCamadas();
    });
    //select button
    const selectButton = document.createElement("div");
    selectButton.classList.add("editor-btn-select");
    selectButton.innerText = "Selecionar";
    selectButton.addEventListener("click", () => {
        selectedCamada = i;
        drawCanvas();
        drawCamadas();
    });
    //btns div
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("editor-camada-btns");
    btnsDiv.appendChild(selectButton);
    btnsDiv.appendChild(removeButton);
    camadaDiv.appendChild(btnsDiv);
}

function drawTextCamadaProperties(camadaDiv, camada, i){
    //add text
    const textDiv = document.createElement("div");
    textDiv.classList.add("editor-camada-text");
    textDiv.classList.add("editor-item");
    const textLabel = document.createElement("label");
    textLabel.innerText = "Texto:";
    textDiv.appendChild(textLabel);
    const textInput = document.createElement("input");
    textInput.classList.add("input");
    textInput.type = "text";
    textInput.value = camada.text;
    textInput.addEventListener("input", () => {
        camada.text = textInput.value;
        drawCanvas();
    });
    textDiv.appendChild(textInput);
    camadaDiv.appendChild(textDiv);
    //add font size
    const fontSizeDiv = document.createElement("div");
    fontSizeDiv.classList.add("editor-camada-font-size");
    fontSizeDiv.classList.add("editor-item");
    const fontSizeLabel = document.createElement("label");
    fontSizeLabel.innerText = "Tamanho da fonte:";
    fontSizeDiv.appendChild(fontSizeLabel);
    const fontSizeInput = document.createElement("input");
    fontSizeInput.classList.add("input");
    fontSizeInput.type = "number";
    fontSizeInput.value = camada.fontSize;
    fontSizeInput.addEventListener("input", () => {
        camada.fontSize = fontSizeInput.value;
        drawCanvas();
    });
    fontSizeDiv.appendChild(fontSizeInput);
    camadaDiv.appendChild(fontSizeDiv);
    //add text color
    const textColorDiv = document.createElement("div");
    textColorDiv.classList.add("editor-camada-text-color");
    textColorDiv.classList.add("editor-item");
    const textColorLabel = document.createElement("label");
    textColorLabel.innerText = "Cor do texto:";
    textColorDiv.appendChild(textColorLabel);
    const textColorInput = document.createElement("select");
    textColorInput.classList.add("input");
    //options from Colors
    for(let i = 0; i < 2; i++){
        const option = document.createElement("option");
        if(i == 0){
            option.value = Colors.White;
            option.innerText = "Branco";
        }else{
            option.value = Colors.FollowImage;
            option.innerText = "Seguir Cor do Fundo";
        }
        textColorInput.appendChild(option);
    }
    textColorInput.value = camada.textColor;
    textColorInput.addEventListener("input", () => {
        camada.textColor = textColorInput.value;
        drawCanvas();
    });
    textColorDiv.appendChild(textColorInput);
    camadaDiv.appendChild(textColorDiv);
    //add glow color
    const glowColorDiv = document.createElement("div");
    glowColorDiv.classList.add("editor-camada-glow-color");
    glowColorDiv.classList.add("editor-item");
    const glowColorLabel = document.createElement("label");
    glowColorLabel.innerText = "Cor do brilho:";
    glowColorDiv.appendChild(glowColorLabel);
    const glowColorInput = document.createElement("select");
    glowColorInput.classList.add("input");
    //options from Colors
    for(let i = 0; i < 2; i++){
        const option = document.createElement("option");
        if(i == 0){
            option.value = Colors.White;
            option.innerText = "Branco";
        }else{
            option.value = Colors.FollowImage;
            option.innerText = "Seguir Cor do Fundo";
        }
        glowColorInput.appendChild(option);
    }
    glowColorInput.value = camada.glowColor;
    glowColorInput.addEventListener("input", () => {
        camada.glowColor = glowColorInput.value;
        drawCanvas();
    });
    glowColorDiv.appendChild(glowColorInput);
    camadaDiv.appendChild(glowColorDiv);
    //add glow size
    const glowSizeDiv = document.createElement("div");
    glowSizeDiv.classList.add("editor-camada-glow-size");
    glowSizeDiv.classList.add("editor-item");
    const glowSizeLabel = document.createElement("label");
    glowSizeLabel.innerText = "Tamanho do brilho:";
    glowSizeDiv.appendChild(glowSizeLabel);
    const glowSizeInput = document.createElement("input");
    glowSizeInput.classList.add("input");
    glowSizeInput.type = "number";
    glowSizeInput.value = camada.glowSize;
    glowSizeInput.addEventListener("input", () => {
        camada.glowSize = glowSizeInput.value;
        drawCanvas();
    }
    );
    glowSizeDiv.appendChild(glowSizeInput);
    camadaDiv.appendChild(glowSizeDiv);
    //add remove button
    const removeButton = document.createElement("div");
    removeButton.classList.add("editor-btn-remove");
    removeButton.innerText = "Remover";
    removeButton.addEventListener("click", () => {
        camadas.splice(i, 1);
        if(selectedCamada == i){
            selectedCamada = -1;
        }
        drawCanvas();
        drawCamadas();
    }
    );
    //select button
    const selectButton = document.createElement("div");
    selectButton.classList.add("editor-btn-select");
    selectButton.innerText = "Selecionar";
    selectButton.addEventListener("click", () => {
        selectedCamada = i;
        drawCanvas();
        drawCamadas();
    }
    );
    //btns div
    const btnsDiv = document.createElement("div");
    btnsDiv.classList.add("editor-camada-btns");
    btnsDiv.appendChild(selectButton);
    btnsDiv.appendChild(removeButton);
    camadaDiv.appendChild(btnsDiv);
}
