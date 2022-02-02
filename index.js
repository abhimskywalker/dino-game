'use strict'

let game = document.getElementById('game-container')
let character = document.getElementById('character')
let obstacle = document.getElementById('obstacle')
let gameScore = document.getElementById('game-score')
let isJumping = false
let isCrossing = false
let score = 0

function jump() {
	if (isJumping) {
		return
	}
	if (obstacle.classList != "obstacle-animation") {
		obstacle.classList.add("obstacle-animation")
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
	if (gapX < 40 && gapY <= 50) {
		characterDead()
		// console.log('gapX:', gapX, ', gapY:', gapY)
	} else if (gapX < 40 && gapY > 50 && !isCrossing) {
		isCrossing = true
		score++
		gameScore.textContent = 'Score: ' + score
		setTimeout(() => {
            isCrossing=false;
        }, 200);
	}
}, 100)

function characterDead() {
	character.classList.remove("character-jump")
	obstacle.classList.remove("obstacle-animation")
	alert('You lost!')
}
