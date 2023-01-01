import '@babel/polyfill';
import './index.html';
import {startGame} from './modules/module1'
import './index.scss';


const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const clearButton = document.getElementById('clearButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
const counterElement = document.getElementById('counter')
let isPlayer_O_Turn = false
let winner
let counterX
let counter0

startGame()

restartButton.addEventListener('click', startGame)
clearButton.addEventListener('click', () => {location.reload(); return false})

//startGame here

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;

	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		if(counter0 === undefined && counterX === undefined){
			counterX = 0
			counter0 = 0
		}
		if(currentClass === 'x'){
			++counterX
		} else ++counter0;
		endGame(false);
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

 function endGame(draw) {
   if(draw){
     winningMessageTextElement.innerText = "It's a draw!"
		 ++counterX
		 ++counter0
		 counterElement.innerText = `${counter0} : ${counterX}`
   }else {
     winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "0's" : "X's"} wins!`
		 counterElement.innerText = `${counter0} : ${counterX}`
	 }
   winningMessageElement.classList.add('show')
 }

 function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function randomStart() {
	if(Math.round(Math.random())){
		isPlayer_O_Turn = true
	} else {
		isPlayer_O_Turn = false
	}
}

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}
