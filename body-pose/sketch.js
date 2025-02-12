let video; // For webcam
let bodyPose;
let poses = [];

function preload() {
    bodyPose = ml5.bodyPose("MoveNet")
}

function gotResults(results) {
    poses = results;
}

function mousePressed() {
    console.log(poses)
}

// Runs once at the beginning.
function setup() {
    createCanvas(640,480); // key word createCanvas is a function to create a canvas in p5
    video = createCapture(VIDEO);
    video.hide();
    video.elt.muted = true;

    bodyPose.detectStart(video, gotResults)
}

function draw() {
    image(video, 0, 0, width, height)

    if (poses.length > 0) {
        let pose = poses[0];
        let x = pose.nose.x;
        let y = pose.nose.y;
        fill(255,0,0);
        circle(x, y, 15);
    }

}
