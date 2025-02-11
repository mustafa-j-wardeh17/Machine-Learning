let classifier;
let video;
let img;
let label = "waiting...";
let confidence = 0;

// The preload() function in p5.js is executed before setup(), ensuring assets (like images, fonts, models) are fully loaded before the sketch starts.
function preload() {
    classifier = ml5.imageClassifier("MobileNet")
    // img = loadImage("chainlinkfence.jpeg") // key word loadImage is a function in p5 that loads an image
}

function gotResults(results) {
    console.log(results)
    label = results[0].label;
    confidence = results[0].confidence;
}

// Runs once at the beginning.
function setup() {
    createCanvas(400, 400); // key word createCanvas is a function to create a canvas in p5

    video = createCapture(); // key word createCapture is a function in p5 that captures video from the webcam
    video.hide(); // key word hide is a function in p5 that hides the video

    video.elt.muted = true; // mute the video so that it doesn't play the audio

    // classifier.classify(img, gotResults, 1) // it's a async function so i need a callback function to get the results ,8 is the number of results i want
    classifier.classifyStart(video, gotResults, 1) // it's a async function so i need a callback function to get the results ,8 is the number of results i want
}

// Runs in a loop forever (by default, 60 times per second).
function draw() {
    background(220); // key word background is a function in p5 that sets the background color
    // image(img, 0, 0, width, height) // key word image is a function in p5
    image(video, 0, 0, width, height) // key word image is a function in p5

    // Draw a rectangle with the label
    rectMode(CENTER);
    fill(0);
    rect(200, 360, 400, 80);

    // Draw the label
    textSize(24);
    fill(255);
    textAlign(CENTER, CENTER);
    noStroke();
    text(label, 200, 350);
    text(confidence, 200, 380);
}
