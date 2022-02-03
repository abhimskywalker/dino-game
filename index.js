'use strict'

let game = document.getElementById('game-container')
let character = document.getElementById('character')
let characterAnimation
let obstacle = document.getElementById('obstacle')
let obstacleAnimation
let gameScore = document.getElementById('game-score')
let restartButton = document.getElementById('restart')
let gameStatus = ''
let isJumping = false
let isCrossing = false
let score = 0

function gameLoad() {
	// reset objects to initial state
	character.classList.remove('character-animation')
	obstacle.classList.remove('obstacle-animation')
	// trigger DOM reflow
	obstacle.offsetHeight
	character.offsetHeight
	// Ad animations and initialise animation reference
	character.classList.add('character-animation')
	obstacle.classList.add('obstacle-animation')
	characterAnimation = character.getAnimations()[0]
	obstacleAnimation = obstacle.getAnimations()[0]
	// Pause animation from starting right away
	obstacleAnimation.pause()
	characterAnimation.pause()
	score = 0
	gameScore.textContent = 'Score: ' + score
}

function gameStart() {
	gameStatus = 'playing'
	character.textContent = '🙂'
	obstacleAnimation.play()
	score = 0
	gameScore.textContent = 'Score: ' + score
}

function gameEnd() {
	character.textContent = '😵'
	obstacleAnimation.pause()
	characterAnimation.pause()
	gameStatus = 'lost'
	restartButton.style.visibility = 'visible'
	// alert('You lost!')
}

function restartGame() {
	restartButton.style.visibility = 'hidden'
	obstacleAnimation.cancel()
	characterAnimation.finish()
	gameLoad()
	gameStart()
}

function gameTick() {
	if (gameStatus === 'lost') {return}
	let characterX = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
	let characterY = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
	let obstacleX = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'))
	let obstacleY = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'))

	let gapX = Math.abs(obstacleX - characterX)
	let gapY = Math.abs(characterY - obstacleY)
	// console.log('gapX:', gapX, ', gapY:', gapY)
	if (gapX < 35 && gapY <= 50) {
		
		// console.log('gapX:', gapX, ', gapY:', gapY)
		gameEnd()
	} else if (gapX < 35 && gapY > 50 && !isCrossing) {
		isCrossing = true
		score++
		gameScore.textContent = 'Score: ' + score
		setTimeout(() => {
            isCrossing=false;
        }, 200);
	}
}

function jump() {
	if (!['paused','finished'].includes(characterAnimation.playState)) {
		return
	}
	if (!['playing', 'lost'].includes(gameStatus)) {
		gameStart()
	} else if (gameStatus === 'lost'){return}
	characterAnimation.play()
}

function handleKeyDown(e) {
	console.log(e.key)
	if (e.key === ' ') {
		jump()
	} else return
}

gameLoad()
game.onclick = jump
restartButton.onclick = restartGame
window.addEventListener('keydown', handleKeyDown)
setInterval(gameTick, 50)

