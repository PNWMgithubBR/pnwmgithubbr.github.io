const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

const fotoInput = document.getElementById("imagem-input");

const WIDTH = cnv.width;
const HEIGHT = cnv.height;

const background = new Image();
background.src = "";

let corAtual = "";

// let posX = 400;
// let posY = HEIGHT / 5;

function cores(cor) {
  // a imagem vai carregar dnv por causa do background.onload
  switch (cor) {
    case "branco":
      background.src = "./putzImg/branco.png";
      corAtual = "#FFFFFF";
      break;

    case "vermelho":
      background.src = "./putzImg/vermelho.png";
      corAtual = "#FF0000";
      break;

    case "laranja":
      background.src = "./putzImg/laranja.png";
      corAtual = "#FFA500";
      break;

    case "amarelo":
      background.src = "./putzImg/amarelo.png";
      corAtual = "#e8d631";
      break;

    case "azulClaro":
      background.src = "./putzImg/azulClaro.png";
      corAtual = "#3452eb";
      break;

    case "azulEscuro":
      background.src = "./putzImg/azulEscuro.png";
      corAtual = "#0e108f";
      break;

    case "verde":
      background.src = "./putzImg/verde.png";
      corAtual = "#008000";
      break;

    case "roxo":
      background.src = "./putzImg/roxo.png";
      corAtual = "#800080";
      break;

    case "rosa":
      background.src = "./putzImg/rosa.png";
      corAtual = "#8f0e53";
      break;

    default:
      background.src = "./putzImg/branco.png";
      corAtual = "#FFFFFF";
      break;
  }
}

background.onload = () => {
  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

  // Adiciona sombra
  ctx.shadowColor = corAtual; // Cor da sombra
  ctx.shadowBlur = 7; // Desfoque da sombra
  ctx.shadowOffsetX = 0; // Deslocamento horizontal da sombra
  ctx.shadowOffsetY = 0; // Deslocamento vertical da sombra

  ctx.font = "100px myFirstFont";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText("PUTZ", 50, HEIGHT / 2);

  // Muda a cor da primeira letra para vermelho
  ctx.fillStyle = corAtual;
  ctx.fillText("P", 50, HEIGHT / 2);

  // Limpa a configuração de cor
  ctx.fillStyle = "white";
};

fotoInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

      // Adiciona sombra
      ctx.shadowColor = corAtual; // Cor da sombra
      ctx.shadowBlur = 7; // Desfoque da sombra
      ctx.shadowOffsetX = 0; // Deslocamento horizontal da sombra
      ctx.shadowOffsetY = 0; // Deslocamento vertical da sombra

      // Muda a cor da primeira letra para vermelho
      ctx.fillStyle = corAtual;
      ctx.fillText("P", 50, HEIGHT / 2);

      // Limpa a configuração de cor
      ctx.fillStyle = "white";

      const desiredWidth = 300;
      const aspectRatio = img.width / img.height;
      const desiredHeight = desiredWidth / aspectRatio;
      const posX = 400;
      const posY = HEIGHT / 5;
      ctx.drawImage(img, posX, posY, desiredWidth, desiredHeight);

      ctx.font = "100px myFirstFont";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("PUTZ", 50, HEIGHT / 2);

      // Limpa as configurações de sombra
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

const direita = document.getElementById("direita");
const esquerda = document.getElementById("esquerda");
const cima = document.getElementById("cima");
const baixo = document.getElementById("baixo");

let posX = 400;
let posY = HEIGHT / 5;

direita.addEventListener("click", () => {
  posX += 10;
  desenhaImagem();
});
esquerda.addEventListener("click", () => {
  posX -= 10;
  desenhaImagem();
});
cima.addEventListener("click", () => {
  posY -= 10;
  desenhaImagem();
});
baixo.addEventListener("click", () => {
  posY += 10;
  desenhaImagem();
});

function desenhaImagem() {
  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);

  // Adiciona sombra
  ctx.shadowColor = corAtual; // Cor da sombra
  ctx.shadowBlur = 7; // Desfoque da sombra
  ctx.shadowOffsetX = 0; // Deslocamento horizontal da sombra
  ctx.shadowOffsetY = 0; // Deslocamento vertical da sombra

  // Muda a cor da primeira letra para vermelho
  ctx.fillStyle = corAtual;
  ctx.fillText("P", 50, HEIGHT / 2);

  // Limpa a configuração de cor
  ctx.fillStyle = "white";

  const file = fotoInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const desiredWidth = 300;
        const aspectRatio = img.width / img.height;
        const desiredHeight = desiredWidth / aspectRatio;
        ctx.drawImage(img, posX, posY, desiredWidth, desiredHeight);

        ctx.font = "100px myFirstFont";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.fillText("PUTZ", 50, HEIGHT / 2);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
