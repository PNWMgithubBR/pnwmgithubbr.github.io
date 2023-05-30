let canvas;
let ctx;
const img = new Image();

document.addEventListener("DOMContentLoaded", () => {
    //inicialiar os listeners apenas depois que a página carregar
    img.src = "putzImg/vermelho.png";
    img.onload = function(){
        setupListeners();
        setupCanvas();
    }
});

function setupListeners() {
    //listeners do canvas

    //listeners dos parametros para ediçao
    document.getElementById("titulo").addEventListener("input", setupCanvas);
    document.getElementById("cor").addEventListener("input", setColor);

    //listeners do download
    document.getElementById("baixar").addEventListener("click", downloadCanvas);
}

function setupCanvas(){
    //inicializar o canvas
    canvas = document.getElementById("thumb");
    ctx = canvas.getContext("2d");
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //inicializar a imagem
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //inicializar o texto
    ctx.shadowColor = "red"; // Cor da sombra
    ctx.shadowBlur = 7; // Desfoque da sombra
    ctx.shadowOffsetX = 0; // Deslocamento horizontal da sombra
    ctx.shadowOffsetY = 0; // Deslocamento vertical da sombra
    ctx.font = "180px COCOGOOSE";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    const titulo = document.getElementById("titulo").value;
    texter(titulo, 100, canvas.height/2);
    setColor();
}

function texter(str, x, y){
    for(var i = 0; i <= str.length; ++i){
        var ch = str.charAt(i);
        if(i==0){
            ctx.fillStyle = "red";
        } else{
            ctx.fillStyle = "white";
        }
        ctx.fillText(ch, x, y);
        x += ctx.measureText(ch).width;
    }
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