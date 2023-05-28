function downloadCanvas() {
  // Cria um elemento <a> temporário
  const link = document.createElement('a');
  // Define o atributo 'download' com o nome do arquivo desejado
  link.download = 'imagem.jpg';
  // Define o atributo 'href' com o conteúdo do canvas (convertido para base64)
  link.href = cnv.toDataURL('image/jpeg', 1); // Qualidade de 80%
  // Simula um clique no link para iniciar o download
  link.click();
}

// Adicione um botão ou evento que chame a função de download
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', downloadCanvas);
