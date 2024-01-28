const canvasEl = document.querySelector('canvas')
const cc = canvasEl.getContext('2d')
canvasEl.width = 1500
canvasEl.height = 720

let playerScore = new Audio()
let computerScore = new Audio()
let hit = new Audio()
let wall = new Audio()
hit.src = 'sounds/hit.mp3'
wall.src = 'sounds/wall.mp3'
computerScore.src = 'sounds/computerScore.mp3'
playerScore.src = 'sounds/playerScore.mp3'

const player = {
    xP: 0,
    yP: canvasEl.height / 2 - 100 / 2,
    height: 100,
    width: 10,
    colour: 'darkred',
    score: 0,
}

const computer = {
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
    speed: 8,
    xV: 5,
    yV: 5,
    colour: 'black',
}

const net = {
    xP: canvasEl.width / 2 - 1,
    yP: 0,
    width: 2,
    height: 10,
    colour: 'white',
}

function drawRect(xP, yP, width, height, colour) { 
    cc.fillStyle = colour
    cc.fillRect(xP, yP, width, height)
}

function drawCircle(xP, yP, radius, colour) { 
    cc.fillStyle = colour
    cc.beginPath()
    cc.arc(xP, yP, radius, 0, Math.PI * 2)
    cc.fill()
}

function drawText(content, xP, yP, colour) { 
    cc.fillStyle = colour
    cc.font = '45px sans-serif'
    cc.fillText(content, xP, yP)
}

function drawNet() { 
    for (let i = 0; i < canvasEl.height; i += 15) {
        drawRect(net.xP, net.yP + i, net.width, net.height, net.colour)
    }
}

function runGame() { 
    drawRect(0, 0, canvasEl.width, canvasEl.height, 'blue')
    drawNet()
    drawText(
        player.score,
        (1 * canvasEl.width) / 4,
        (1 * canvasEl.height) / 10,
        'yellow'
    )
    drawText(
        computer.score,
        (3 * canvasEl.width) / 4,
        (1 * canvasEl.height) / 10,
        'yellow'
    )
    drawRect(
        player.xP,
        player.yP,
        player.width,
        player.height,
        player.colour,
    )
    drawRect(
        computer.xP,
        computer.yP,
        computer.width,
        computer.height,
        computer.colour,
    )
    drawCircle(ball.xP, ball.yP, ball.radius, ball.colour)
}

canvasEl.addEventListener('mousemove', movePaddle)

function movePaddle(e) { 
    let canvasRect = canvasEl.getBoundingClientRect()
    player.yP = e.clientY - canvasRect.top - player.height / 2
}

function paddleColDetect(BALL, PADDLE) { 
    BALL.top = BALL.yP - BALL.radius
    BALL.bottom = BALL.yP + BALL.radius
    BALL.left = BALL.xP - BALL.radius
    BALL.right = BALL.xP + BALL.radius

    PADDLE.top = PADDLE.yP
    PADDLE.bottom = PADDLE.yP + PADDLE.height
    PADDLE.left = PADDLE.xP 
    PADDLE.right = PADDLE.xP + PADDLE.width
    return (
        BALL.right > PADDLE.left &&
        BALL.bottom > PADDLE.top &&
        BALL.left < PADDLE.right &&
        BALL.top < PADDLE.bottom
    )
}

function resetBall() {
    ball.xP = canvasEl.width / 2
    ball.yP = canvasEl.height / 2
    ball.speed = 7
}

function utilities() { 
    ball.xP += ball.xV
    ball.yP += ball.yV
    let intelLevel = 0.094
    computer.yP += (ball.yP - (computer.yP + computer.height / 2)) * intelLevel
    if (ball.yP + ball.radius > canvasEl.height || ball.yP - ball.radius < 0) {
        ball.yV = -ball.yV
        wall.play()
    }
    let playerAct = ball.xP + ball.radius < canvasEl.width / 2
        ? player
        : computer
    if (paddleColDetect(ball, playerAct)) {
        hit.play()
        let collisionPoint = ball.yP - (playerAct.yP + playerAct.height / 2)
        collisionPoint = collisionPoint / (playerAct.height / 2)
        let bounceAngle = (collisionPoint * Math.PI) / 4
        let direction = ball.xP + ball.radius < canvasEl.width / 2 ? 1 : -1
        ball.xV = direction * ball.speed * Math.cos(bounceAngle)
        ball.yV = ball.speed * Math.sin(bounceAngle)
        ball.speed += 0.1
    }
    if (ball.xP + ball.radius < 0) {
        computer.score++
        computerScore.play()
        resetBall()
    } else if (ball.xP - ball.radius > canvasEl.width) {
        player.score++
        playerScore.play()
        resetBall()
    }
}

function gameInit() { 
    utilities()
    runGame()
}

const FPS = 60
setInterval(gameInit, 1000 / FPS)



