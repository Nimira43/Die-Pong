const canvasEl = document.querySelector('canvas')
const cc = canvasEl.getContext('2d')
canvasEl.width = 1500
canvasEl.height = 720

let RIScore = new Audio()
let AIScore = new Audio()
let hit = new Audio()
let wall = new Audio()
hit.src = 'sounds/hit.mp3'
wall.src = 'sounds/wall.mp3'
AIScore.src = 'sounds/AIScore.mp3'
RIScore.src = 'sounds/RIScore.mp3'

const playerPaddleRI = {
    xP: 0,
    yP: canvasEl.height / 2 - 100 / 2,
    height: 100,
    width: 10,
    colour: 'darkred',
    score: 0,
}

const playerPaddleAI = {
    xP: canvasEl.width - 10,
    yP: canvasEl.height / 2 - 100 / 2,
    height: 100,
    width: 10,
    colour: 'darkgoldenrod',
    score: 0,
}

const ball = {
    xP: canvasEl.width / 2,
    yP: canvasEl.height / 2,
    radius: 10,
    xV: 5,
    yV: 5,
    colour: 'black',
}

const net = {
    xP: canvasEl.width / 2 - 1,
    yP: 0,
    height: 10,
    width: 2,
    colour: 'white',
}

function drawRect() { }
function drawCircle() { }
function drawText() { }
function drawNet() { }
function runGame() { }
function movePaddle() { }
function paddleColDetect() { }
function everythingManager() { }
function gameInit() { 
    
}



