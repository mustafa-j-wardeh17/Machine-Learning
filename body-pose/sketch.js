let video; // For webcam
let bodyPose;
let poses = [];
let connections = [];
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
    createCanvas(1280,720); // key word createCanvas is a function to create a canvas in p5
    // For static video
    // video = createVideo('test.mov');
    // video.loop()

    // For camera
    video = createCapture(VIDEO);
    video.hide();
    video.elt.muted = true;

    bodyPose.detectStart(video, gotResults)
    connections = bodyPose.getSkeleton()
}

function draw() {
    background(0) // to showing the sketch in dark view
    //image(video, 0, 0, width, height); // to show video in canvas

    if (poses.length > 0) {
        let pose = poses[0];
        let x = pose.nose.x * (width / video.width);
        let y = pose.nose.y * (height / video.height);

        fill(255, 0, 0);
        circle(x, y, 15);

        // draw the keypoints
        for (let i = 0; i < pose.keypoints.length; i++) {
            let keypoint = pose.keypoints[i];
            if (keypoint.confidence > 0.3) {
                fill(0, 0, 255);
                noStroke();
                circle(keypoint.x * (width / video.width), keypoint.y * (height / video.height), 8);
            }
        }

        // draw the skeleton
        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            let partA = connection[0];
            let partB = connection[1];
            let keyPointA = pose.keypoints[partA];
            let keyPointB = pose.keypoints[partB];
            if (keyPointA.confidence > 0.3 && keyPointB.confidence > 0.3) {
                stroke(0, 255, 0);
                strokeWeight(5);
                line(
                    keyPointA.x * (width / video.width), keyPointA.y * (height / video.height),
                    keyPointB.x * (width / video.width), keyPointB.y * (height / video.height)
                );
            }
        }
    }
}