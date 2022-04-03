let Width  = parseInt((window.innerWidth || document.documentElement.clientWidth) - 2);
let Height = parseInt((window.innerHeight|| document.documentElement.clientHeight) - 2);
const StartingDate = new Date();
let starting = [];
let center;
let radiusCircle;
let weightOfTheStroke;
const framerating = 60;
let pxS = 0, pyS = 0, pxM = 0, pyM = 0, pxH = 0, pyH = 0;
let img;
let divisorX = [];
let divisorY = [];
let first = [true, true, true];

function branchlessSinOvPi(a, b) {
  return (((2*PI)/b) * a)*1*(a!=0);
}
function branchlessCosOfPi(a, b) {
  if(a == 0) return 0;
  return Math.pow((((2*PI)/b) * a), 0+1*(a!=0));
}
function sinOvPi(a, b) {
  if(a==0) return 0;
  else return (2*PI)/b *a;
}
function cosOfPi(a, b) {
  if(a==0) return 1;
  else return (2*PI)/b *a;
}


// function preload() {
//
// }

function setup() {
	createCanvas(Width, Height);
  img = loadImage('/Clock/img/wallbackground.jpg');
	starting[0] = StartingDate.getSeconds();
	starting[1] = StartingDate.getMinutes();
	starting[2] = StartingDate.getHours();

	center = createVector(Width/2, Height/2);
	radiusCircle = (brachlessMin(Width, Height))*9/12;
	weightOfTheStroke = radiusCircle / 24;
	sizeSeconds = radiusCircle/4;

	for(let i=0; i<12; i++) {
		divisorX[i] = parseInt(Math.sin(branchlessSinOvPi(i, 12)) * (radiusCircle*43/100));
		divisorY[i] = parseInt(Math.cos(branchlessCosOfPi(i, 12)) * (radiusCircle*43/100));
	}
	divisorY[0] = Math.cos(0) * radiusCircle*43/100;

}


function draw() {
	//updateEverything();
  //image(img, 0, 0);
	drawClock();
	drawH();
	drawMinutes();
	drawSeconds();
}

function brachlessMin(a, b) {
	return b + ((a-b) & (a-b)>>31);
}

function updateEverything() {
	Width  = parseInt((window.innerWidth || document.documentElement.clientWidth) - 2);
	Height = parseInt((window.innerHeight|| document.documentElement.clientHeight) - 2);
	center = createVector(Width/2, Height/2);
	radiusCircle = (brachlessMin(Width, Height))*4/5;
	weightOfTheStroke = radiusCircle / 24;
	resizeCanvas(Width, Height);
	for(let i=0; i<12; i++) {
		divisorX[i] = parseInt(Math.sin(branchlessSinOvPi(i, 12)) * (radiusCircle*43/100));
		divisorY[i] = parseInt(Math.cos(branchlessCosOfPi(i, 12)) * (radiusCircle*43/100));
	}
	divisorY[0] = radiusCircle*43/100;
}

function drawDivisors() {
	let weight = 1;
	for(let i=0; i<12; i++) {
		strokeWeight(weight+2*((i)%3==0));
		line(center.x + divisorX[i]*126/144, center.y + divisorY[i]*126/144, center.x + divisorX[i], center.y + divisorY[i]);

	}
}

function drawClock() {
	//background(255);
	translate(2, 2);
	fill(255);
	stroke(0);
	strokeWeight(weightOfTheStroke);
	ellipse(center.x, center.y, radiusCircle-weightOfTheStroke, radiusCircle-weightOfTheStroke);
	ellipse(center.x, center.y, radiusCircle/144, radiusCircle/144);
	drawDivisors();
}

function drawSeconds() {

	let seconds = frameCount / 60 + starting[0];

	if(frameCount % framerating == 0) {
		pxS = branchlessCosOfPi(seconds-15, 60);
		pyS = branchlessSinOvPi(seconds-15, 60);
		pxS = Math.cos(pxS);
		pyS = Math.sin(pyS);
		pxS *= radiusCircle*30/100;
		pyS *= radiusCircle*30/100;
		seconds;
	}

	else if(first[0]) {
		pxS = branchlessCosOfPi(seconds-15, 60);
		pyS = branchlessSinOvPi(seconds-15, 60);
		pxS = Math.cos(pxS);
		pyS = Math.sin(pyS);
		pxS *= radiusCircle*30/100;
		pyS *= radiusCircle*30/100;
		first[0] = false;
	}

	stroke(240, 16, 4);
	strokeWeight(1);
	line(center.x, center.y, center.x + pxS, center.y + pyS);
}

function drawMinutes() {

	let minutes =  starting[1] + (frameCount / 60 + starting[0]) / 60 ;
	//console.log(minutes);
	if (frameCount % framerating == 60) {
		pxM = branchlessCosOfPi(minutes - 15, 60);
		pyM = branchlessSinOvPi(minutes - 15, 60);
		pxM = Math.cos(pxM);
		pyM = Math.sin(pyM);
		pxM *= radiusCircle*42/100;
		pyM *= radiusCircle*42/100;

	}
	else if(first[1]) {
		pxM = branchlessCosOfPi(minutes - 15, 60);
		pyM = branchlessSinOvPi(minutes - 15, 60);
		pxM = Math.cos(pxM);
		pyM = Math.sin(pyM);
		pxM *= radiusCircle*42/100;
		pyM *= radiusCircle*42/100;
		first[1] = false;
	}

	stroke(12, 12, 12);
	strokeWeight(3);
	line(center.x, center.y, center.x + pxM, center.y + pyM);
}

function drawH() {
	let minutes =starting[1] + (frameCount / 60 + starting[0]) / 60;
	let hours = starting[2]*5 + (minutes / 60)*5;
	//console.log( minutes / 60);
	if(frameCount % 60 == 0) {
		pxH = branchlessCosOfPi(hours - 3*5, 60);
		pyH = branchlessSinOvPi(hours - 3*5, 60);
		pxH = Math.cos(pxH);
		pyH = Math.sin(pyH);
		pxH *= radiusCircle*28/100;
		pyH *= radiusCircle*28/100;
		//console.log(seconds);
	}

	else if(first[2]) {
		pxH = branchlessCosOfPi(hours - 3*5, 60);
		pyH = branchlessSinOvPi(hours - 3*5, 60);
		pxH = Math.cos(pxH);
		pyH = Math.sin(pyH);
		pxH *= radiusCircle*28/100;
		pyH *= radiusCircle*28/100;
		first[2] = false;
	}

	stroke(4, 4, 4);
	strokeWeight(7);
	line(center.x, center.y, center.x + pxH, center.y + pyH);
}
