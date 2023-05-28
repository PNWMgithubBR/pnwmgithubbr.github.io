const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");

const fotoInput = document.getElementById("imagem-input");

const WIDTH = cnv.width;
const HEIGHT = cnv.height;

const background = new Image();
background.src = "";

function cores(cor) {
  // a imagem vai carregar dnv por causa do background.onload
  switch (cor) {
    case "branco":
      background.src = "./putzImg/branco.png";
      break;

    case "vermelho":
      background.src = "./putzImg/vermelho.png";
      break;

    case "laranja":
      background.src = "./putzImg/laranja.png";
      break;

    case "amarelo":
      background.src = "./putzImg/amarelo.png";
      break;

    case "azulClaro":
      background.src = "./putzImg/azulClaro.png";
      break;

    case "azulEscuro":
      background.src = "./putzImg/azulEscuro.png";
      break;

    case "verde":
      background.src = "./putzImg/verde.png";
      break;

    case "roxo":
      background.src = "./putzImg/roxo.png";
      break;

    case "rosa":
      background.src = "./putzImg/rosa.png";
      break;

    default:
      background.src = "./putzImg/branco.png";
      break;
  }
}

background.onload = () => {
  ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
  ctx.font = "100px myFirstFont";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText("PUTZ", 50, HEIGHT / 2);
};

fotoInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
      ctx.font = "100px myFirstFont";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("PUTZ", 50, HEIGHT / 2);

      const aspectRatio = img.width / img.height;
      const desiredWidth = 200;
      const desiredHeight = desiredWidth / aspectRatio;
      const posX = 400;
      const posY = HEIGHT/5;
      ctx.drawImage(img, posX, posY, desiredWidth, desiredHeight);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});
