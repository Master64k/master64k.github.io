//import * as faceapi from "./vendor/face-api";

$(document).ready(function(){

  faceapi.nets.ssdMobilenetv1.loadFromUri('models');

  if('serviceWorlder' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('registration: ', reg);
        });
    });
  }


  $('#file-input').on('change', async function() {

    const uploadEl = document.getElementById('file-input').files[0];

    const image = await faceapi.bufferToImage(uploadEl);

    const detection = await faceapi.detectSingleFace(image);

    if(detection !== undefined) {

      UIkit.modal(document.getElementById('result-modal')).show();

      const displaySize = { width: image.width, height: image.height }

      $('#result-img').attr({'src': URL.createObjectURL(uploadEl)});

      $('#result-img').css({width: image.width, height: image.height});

      const canvas = document.getElementById('result-canvas');

      faceapi.matchDimensions(canvas, displaySize)

      faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detection, displaySize))

    } else alert('Nenhum rosto detectado');



  })


});
