let model_url = "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/"
let pitch;
let audioContext;
let mic;
let freq = 0;

function setup() {
    createCanvas(400, 400);
    console.log("ml5js version: " + ml5.version);

    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);
}

function listening() {
    console.log("Mic is listening!");

    pitch = ml5.pitchDetection(
        model_url,
        audioContext,
        mic.stream,
        modelLoaded
    );
}

function modelLoaded() {
    console.log("Model loaded!");

    pitch.getPitch(gotPitch);
}

function gotPitch(err, frequency) {
    if(err) {
        console.error(error)
    } else {
        if(frequency) {
            freq = frequency;
        }
    }
    pitch.getPitch(gotPitch);
}

function draw() {
    background(0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(64);
    text(freq.toFixed(2) + "Hz", width / 2, height / 2);
}