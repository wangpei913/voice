const navigator = window.navigator
navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia
const AudioContext = window.AudioContext ||
                      window.webkitAudioContext

const isSupport = !!(navigator.getUserMedia && AudioContext)
const context = isSupport && new AudioContext()
export default {
  isSupport,
  start () {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext  AudioContent API
    return new Promise((resolve, reject) => {
      navigator.getUserMedia({audio: true}, stream => {
        const source = context.createMediaStreamSource(stream)
        const analyser = context.createAnalyser();
        source.connect(analyser)
        analyser.fftSize = 256
        resolve(analyser)
      }, () => {
        reject()
      })
    })
  },
  getVoiceSize (analyser) {
    let bufferLengthAlt = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLengthAlt);
    // let drawAlt = function () {
    //   drawVisual = requestAnimationFrame(drawAlt);
    //   analyser.getByteFrequencyData(dataArray);
    //   let sum = 0;
    //   let barHeight;
    //   for (let i = 0; i < bufferLengthAlt; i++) {
    //     barHeight = dataArray[i];
    //     sum += barHeight;
    //   }
    //   if (sum > 2000) {
    //     console.log(sum, 'sum')
    //   }
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      let barHeight;
      for (let i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArray[i];
        sum += barHeight;
      }
      return sum;
  }
}
