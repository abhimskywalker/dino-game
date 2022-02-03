'use strict'

let game = document.getElementById('game-container')
let character = document.getElementById('character')
let obstacle = document.getElementById('obstacle')
let gameScore = document.getElementById('game-score')
let gameStatus = ''
let isJumping = false
let isCrossing = false
let score = 0

function gameStart() {
	gameStatus = 'playing'
	obstacle.classList.add("obstacle-animation")
	score = 0
}

function gameEnd() {
	character.classList.remove("character-jump")
	obstacle.classList.remove("obstacle-animation")
	gameStatus = 'lost'
	alert('You lost!')
}

function jump() {
	if (isJumping) {
		return
	}
	if (!['playing', 'lost'].includes(gameStatus)) {
		gameStart()
	}
	isJumping = true
	character.classList.add('character-jump')
	setTimeout(()=>{
		character.classList.remove("character-jump")
		isJumping = false
    },700);
}

function handleKeyDown(e) {
	console.log(e.key)
	if (e.key === ' ') {
		jump()
	} else return
}

game.onclick = jump
window.addEventListener('keydown', handleKeyDown)

setInterval(() => {
	let characterX = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
	let characterY = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
	let obstacleX = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'))
	let obstacleY = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'))

	let gapX = Math.abs(obstacleX - characterX)
	let gapY = Math.abs(characterY - obstacleY)
	// console.log('gapX:', gapX, ', gapY:', gapY)
	if (gapX < 35 && gapY <= 50) {
		gameEnd()
		console.log('gapX:', gapX, ', gapY:', gapY)
	} else if (gapX < 35 && gapY > 50 && !isCrossing) {
		isCrossing = true
		score++
		gameScore.textContent = 'Score: ' + score
		setTimeout(() => {
            isCrossing=false;
        }, 200);
	}
}, 50)

