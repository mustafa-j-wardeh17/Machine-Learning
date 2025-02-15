# 3D Body Pose Estimation with p5.js and ml5.js

This project demonstrates how to use the ml5.js library for 3D body pose estimation with a video feed. The example uses the BlazePose model to detect and visualize 3D body poses in real-time.

## Table of Contents

- [3D Body Pose Estimation with p5.js and ml5.js](#3d-body-pose-estimation-with-p5js-and-ml5js)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/mustafa-j-wardeh17/Machine-Learning.git
    cd Machine-Learning/3d-body-pose-estimation
    ```

2. Open `index.html` in your web browser to run the project.

## Usage

- The project will start playing the video from `test.mov`.
- The BlazePose model will detect 3D body poses in real-time.
- The detected keypoints and skeleton will be displayed on the canvas as rotating 3D boxes and lines.