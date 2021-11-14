sound = "";
leftwristX = "";
rightwristX = "";
leftwristY = "";
rightwristY = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    sound = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(500, 200);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("cyan");
    stroke("lime");
    if (scoreLeftWrist > 0) {
        circle(leftwristX, leftwristY, 30);
        inNumberLeftWristY = Number(leftwristY);
        removeDecimals = floor(inNumberLeftWristY);
        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "VOLUME = " + volume;
        sound.setVolume(volume);
    }
    circle(rightwristX, rightwristY, 30);
    if (rightwristY > 0 && rightwristY <= 100) {
        sound.rate(0.5)
        document.getElementById("speed").innerHTML = "SPEED = 0.5x";
    } else if (rightwristY > 100 && rightwristY <= 200) {
        sound.rate(1)
        document.getElementById("speed").innerHTML = "SPEED = 1x";
    } else if (rightwristY > 200 && rightwristY <= 300) {
        sound.rate(1.5)
        document.getElementById("speed").innerHTML = "SPEED = 1.5x";
    } else if (rightwristY > 300 && rightwristY <= 400) {
        sound.rate(2)
        document.getElementById("speed").innerHTML = "SPEED = 2x";
    } else if (rightwristY > 400 && rightwristY <= 500) {
        sound.rate(2.5)
        document.getElementById("speed").innerHTML = "SPEED = 2.5x";
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log(results);
        console.log("The X for Left is: " + leftwristX + ", The Y for Left is: " + leftwristY + ", The X for right is: " + rightwristX + " and the Y of right is: " + rightwristY);
        console.log(scoreLeftWrist);
    }
}

function play() {
    sound.play();
}

function modelLoaded() {
    console.log("The Model is Loaded");
}