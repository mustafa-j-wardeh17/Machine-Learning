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
    createCanvas(640, 480); // key word createCanvas is a function to create a canvas in p5
    video = createCapture(VIDEO);
    video.hide();
    video.elt.muted = true;

    bodyPose.detectStart(video, gotResults)
    connections = bodyPose.getSkeleton()
}

function draw() {
    image(video, 0, 0, width, height)

    if (poses.length > 0) {
        let pose = poses[0];
        let x = pose.nose.x;
        let y = pose.nose.y;
        fill(255, 0, 0);
        circle(x, y, 15);

        for (let i = 0; i < pose.keypoints.length; i++) {
            let keypoint = pose.keypoints[i];
            if (keypoint.confidence > 0.3) { // To remove the keypoint that has low confidence
                fill(0, 0, 255);
                noStroke(); // To remove the stroke
                circle(keypoint.x, keypoint.y, 8);
            }
        }

        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            let partA = connection[0];
            let partB = connection[1];
            let keyPointA = pose.keypoints[partA];
            let keyPointB = pose.keypoints[partB];
            stroke(0, 255, 0);
            strokeWeight(2);
            line(keyPointA.x, keyPointA.y, keyPointB.x, keyPointB.y);
        }
    }

}
