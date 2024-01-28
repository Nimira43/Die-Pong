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

function drawRect() { 

}

function drawCircle() { 

}

function drawText() { 

}

function drawNet() { 

}

function runGame() { 
    drawRect(0, 0, canvasEl.width, canvasEl.height, 'blue')
    drawNet()
    drawText(
        playerPaddleRI.score,
        (1 * canvasEl.width) / 4,
        (1 * canvasEl.height) / 10,
        'yellow'
    )
    drawText(
        playerPaddleAI.score,
        (3 * canvasEl.width) / 4,
        (1 * canvasEl.height) / 10,
        'yellow'
    )
    drawRect(
        playerPaddleRI.xP,
        playerPaddleRI.yP,
        playerPaddleRI.width,
        playerPaddleRI.height,
        playerPaddleRI.colour,
    )
    drawRect(
        playerPaddleAI.xP,
        playerPaddleAI.yP,
        playerPaddleAI.width,
        playerPaddleAI.height,
        playerPaddleAI.colour,
    )
    drawCircle(ball.xP, ball.yP, ball.radius, ball.colour)
}

canvasEl.addEventListener('mousemove', movePaddle)

function movePaddle() { 

}

function paddleColDetect() { 

}

function resetBall() {
    ball.xP = canvasEl.width / 2
    ball.yP = canvasEl.height / 2
    ball.speed = 7
}

function utilities() { 
    ball.xP + ball.xV
    ball.yP + ball.yV
    let intelLevel = 0.1
    playerPaddleAI.yP +=
        (ball.yP - (playerPaddleAI.yP + playerPaddleAI.height / 2)) * intelLevel
    if (ball.yP + ball.radius > canvasEl.height || ball.yP - ball.radius < 0) {
        ball.yV = -ball.yV
        wall.play()
    }
    let player = ball.xP + ball.radius < canvasEl.width / 2
        ? playerPaddleRI
        : playerPaddleAI
    if (paddleColDetect(ball, player)) {
        hit.play()
        let collisionPoint = ball.yP - (player.yP + player.height / 2)
        collisionPoint = (collisionPoint * Math.PI) / 4
        let direction = ball.xP + ball.radius < canvasEl.width / 2 ? 1 : -1
        ball.xV = direction * ball.speed * Math.cos(bouncAngle)
        ball.yV = ball.speed * Math.sin(bounceAngle)
        ball.speed += 0.1
    }
    if (ball.xP + ball.radius < 0) {
        playerPaddleAI.score++
        AIScore.play()
        resetBall()
    } else if (ball.xP - ball.radius > canvsEl.width) {
        playerPaddleRI.score++
        RIScore.play()
        resetBall()
    }
}

function gameInit() { 
    utilities()
    runGame()
}

const FPS = 60
setInterval(gameInit, 1000 / FPS)



