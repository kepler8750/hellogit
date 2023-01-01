export function startGame() {
	randomStart()
	if(counter0 === undefined){
		counterElement.innerText = `0 : 0`
		counterX = 0
		counter0 = 0
	} else {
		counterElement.innerText = `${counter0} : ${counterX}`
	}
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}
