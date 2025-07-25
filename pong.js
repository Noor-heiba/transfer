var canvas = document.getElementById("gameboard")

var rightPressed = false
var leftPressed = false

function keyDownHandler(event){
    if (event.key == "ArrowRight"){
        rightPressed = true
        console.log("Right Pressed")
    } else if (event.key == "ArrowLeft"){
        leftPressed = true
        console.log("Left Pressed")
    }  
}

function keyUpHandler(event){
    if (event.key == "ArrowRight"){
        rightPressed = false
        console.log('Right Up')
    } else if (event.key == "ArrowLeft"){
        leftPressed = false
        console.log("Left Up")
    }
}

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)

var ball = {
    x: canvas.width / 2,
    y: 20,
    speedX: 6,
    speedY: 6,
    width: 10
}

var paddle = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 100,
    height: 15,
    speed: 8
}

var context = canvas.getContext('2d')

function drawBall(){
    context.beginPath()
    context.arc(ball.x, ball.y, ball.width, 0, Math.PI * 2)
    context.fillStyle = "#D68FB3"
    context.fill()
    context.closePath()
}

function drawPaddle(){
    context.beginPath()
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height)
    context.fillStyle = "#E7DDFF"
    context.fill()
    context.closePath()
}

drawBall()
drawPaddle()

function moveBall(){
    ball.x += ball.speedX
    ball.y += ball.speedY
}

function movePaddle(){
    if (rightPressed){
        paddle.x += paddle.speed
    } else if (leftPressed){
        paddle.x -= paddle.speed
    }
}

function collisionDetection(){
    if (ball.x + ball.speedX > canvas.width - ball.width){
        ball.speedX = -ball.speedX
    } else if (ball.x + ball.speedX < 0 + ball.width){
        ball.speedX = -ball.speedX
    }

    if (ball.y + ball.speedY < 0 + ball.width){
        ball.speedY = -ball.speedY
    } else if (ball.y + ball.speedY > canvas.height - ball.width){
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width){
            ball.speedY = -ball.speedY
            if ( ball.speedX > 0){
                ball.speedX++
            } else {
                ball.speedX--
            }
        } else {
            return true
        }  
    }
    return false
}

function gameLoop(){
    context.clearRect(0, 0, canvas.width, canvas.height)

    drawBall()
    drawPaddle()

    var offScreen = collisionDetection()
    moveBall()
    movePaddle()

    if (offScreen == false){
        requestAnimationFrame(gameLoop)
    } else {
        setTimeout(function(){
            ball.y = 50
            ball.x = canvas.width / 2

        requestAnimationFrame(gameLoop)
        }, 3000)
    }
}

gameLoop()