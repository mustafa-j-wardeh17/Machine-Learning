let video; // For webcam
let bodyPose;
let poses = [];
let connections = [];
let angle = 0; // Define the angle variable

function preload() {
    // Initialize BlazePose model for 3D pose estimation
    bodyPose = ml5.bodyPose("BlazePose");
}

function gotResults(results) {
    poses = results;
}

function mousePressed() {
    console.log(poses)
}

// Runs once at the beginning.
function setup() {
    createCanvas(1280, 720, WEBGL); // key word createCanvas is a function to create a canvas in p5
    // For static video
    video = createVideo("./test.mov", videoLoaded);
    video.loop();
    video.hide();
}

function videoLoaded() {
    // Start detecting poses
    bodyPose.detectStart(video, gotResults);

    // Retrieve the skeleton connections used by the model
    connections = bodyPose.getSkeleton();
}

function draw() {
    background(0); // to showing the sketch in dark view
    //image(video, -width / 2, -height / 2, width, height); // to show video in canvas

    if (poses.length > 0) {
        let pose = poses[0];

        // Draw skeleton connections
        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            let a = connection[0];
            let b = connection[1];
            let keyPointA = pose.keypoints3D[a];
            let keyPointB = pose.keypoints3D[b];

            let confA = keyPointA.confidence;
            let confB = keyPointB.confidence;

            // Only draw connections with sufficient confidence
            if (confA > 0.1 && confB > 0.1) {
                stroke(0, 255, 255);
                strokeWeight(4);
                beginShape();
                vertex(keyPointA.x *300, keyPointA.y *300, keyPointA.z *300);
                vertex(keyPointB.x *300, keyPointB.y *300, keyPointB.z *300);
                endShape();
            }
        }

        // Draw keypoints as rotating 3D boxes
        for (let i = 0; i < pose.keypoints.length; i++) {
            let keypoint = pose.keypoints3D[i];
            stroke(255, 0, 255);
            strokeWeight(1);
            fill(255, 150);

            if (keypoint.confidence > 0.1) {
                push();
                translate(keypoint.x *300, keypoint.y *300, keypoint.z *300);
                rotateZ(angle);
                box(4);
                pop();
            }
        }
    }

    angle += 0.01; // Update the angle for rotation
}