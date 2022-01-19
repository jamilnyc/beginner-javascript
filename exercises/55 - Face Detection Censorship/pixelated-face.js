// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.
console.log('Hello There');
const video = document.querySelector('.webcam');

const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');


const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

const optionsInputs = document.querySelectorAll('.controls input[type="range"]');

const options = {
    SHRINK_SIZE: 10,
    SCALE: 1.5,
};

/**
 * Handles slider change events
 */
function handleOption(event) {
    const {value, name} = event.currentTarget;
    options[name] = parseFloat(value);
    console.log(options);
}
optionsInputs.forEach(input => input.addEventListener('input', handleOption));

const faceDetector = new FaceDetector();


async function populateVideo() {
    // stream is a MediaStream object
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: 1280,
            height: 720,
        }
    });

    video.srcObject = stream;

    // Wait for the video to start playing so we can get an accurate height and width
    await video.play();

    // Resize the canvas to be the same size as the video
    // console.log(`Video Width: ${video.videoWidth}, Video Height: ${video.videoHeight}`);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
}

/**
 * Detect a face in the video frame
 */
async function detect() {
    const faces = await faceDetector.detect(video);
    console.log(`# Faces Detected: ${faces.length}`);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    faces.forEach(drawFace);

    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    faces.forEach(censor);
    // ask the browser when the next animation frame is and tell it to run detect for us
    requestAnimationFrame(detect);
}

function drawFace(face, index) {
    // We need the dimensions of the face in the frame
    const {width, height, top, left} = face.boundingBox;
    // console.log({width, height, top, left});
    console.log(`Drawing Face #${index}`)

    
    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);
}

function censor({boundingBox: face}) {
    faceCtx.imageSmoothingEnabled = false;
    
    // draw a scaled down face (pixelating it)
    faceCtx.drawImage(
        video, // source image
        face.x, // dimensions of the source image
        face.y,
        face.width, 
        face.height,

        // Where to draw it (as a shrunken image)
        face.x,
        face.y,
        options.SHRINK_SIZE,
        options.SHRINK_SIZE, 
    );

    // scale it back up 
    const width = face.width * options.SCALE;
    const height = face.height * options.SCALE;
    faceCtx.drawImage(
        // Take the shrunk image as the source
        faceCanvas, 
        face.x, 
        face.y,
        options.SHRINK_SIZE,
        options.SHRINK_SIZE,

        // Blow it up
        face.x - (width - face.width)/2,
        face.y - (height - face.height)/2,
        width,
        height,
    );
}

populateVideo().then(detect)