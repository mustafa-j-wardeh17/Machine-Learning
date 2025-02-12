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
        // Nose position
        let pose = poses[0];
        let x = pose.nose.x;
        let y = pose.nose.y;



        // -------------------------------------------
        // ------------Body Pose Detection------------
        // -------------------------------------------
        fill(255, 0, 0);
        circle(x, y, 15);
        // draw the keypoints
        for (let i = 0; i < pose.keypoints.length; i++) {
            let keypoint = pose.keypoints[i];
            if (keypoint.confidence > 0.3) { // To remove the keypoint that has low confidence
                fill(0, 0, 255);
                noStroke(); // To remove the stroke
                circle(keypoint.x, keypoint.y, 8);
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
                strokeWeight(2);
                line(keyPointA.x, keyPointA.y, keyPointB.x, keyPointB.y);
            }
        }



        // ----------------------------------------------------------------------------------------------------
        // -----------For Nose Cicle Size to be like the distance between right hand and left hand ------------
        // ----------------------------------------------------------------------------------------------------

        // let rx = pose.right_wrist.x
        // let ry = pose.right_wrist.y

        // let lx = pose.left_wrist.x
        // let ly = pose.left_wrist.y

        // fill(0, 0, 255);
        // circle(rx, ry, 15);

        // fill(0, 255, 0);
        // circle(lx, ly, 15);

        // let distance = dist(rx, ry, lx, ly)

        // fill(255, 0, 0);
        // circle(x, y, distance);
    }

}
