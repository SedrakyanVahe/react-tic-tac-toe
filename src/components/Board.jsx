import { useState, useEffect } from 'react'
import Box from './Box'
import { playSound, isContainEmptyString } from '../utils/helpers'
import clickSound from '../assets/audio/click-sound.mp3'
import resetSound from '../assets/audio/reset-sound.mp3'
import winSound from '../assets/audio/win-sound.mp3'

const initialValue = ['', '', '', '', '', '', '', '', '']

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function Board() {
  const [board, setBoard] = useState(initialValue)
  const [boardValue, setBoardValue] = useState(true)
  const [gameEnd, setGameEnd] = useState(false)
  const [winner, setWinner] = useState('')

  useEffect(() => {
    for (let i = 0; i < lines.length; i++) {
      if (board[lines[i][0]] && board[lines[i][0]] === board[lines[i][1]] && board[lines[i][0]] === board[lines[i][2]]) {
        setWinner(board[lines[i][0]])
        setGameEnd(true)
        playSound(winSound)
      }
    }

    if (!board.some(isContainEmptyString)) {
      setGameEnd(true)
      playSound(winSound)
    }
  }, [board])

  const onBoxClickHandler = (index) => {
    if (gameEnd) return
    const newBoard = [...board]

    if (newBoard[index]) {
      alert('Please click empty box')
      return
    }

    newBoard[index] = boardValue ? 'X' : 'O'
    setBoard(newBoard)
    setBoardValue(!boardValue)
    playSound(clickSound)
  }

  const onResetBtnClickHandler = () => {
    setBoard(initialValue)
    setGameEnd(false)
    setBoardValue(true)
    playSound(resetSound)
  }

  return (
    <div style={{ paddingTop: '30px' }}>
      <div style={{ margin: '15px 0' }}>
        {gameEnd ? <h2>{winner} {winner  === '' ? <>Draw</> : <span>won the game</span> }</h2> : <h2>{boardValue ? 'X' : 'O'}'s turn</h2>}
      </div>

      <div className='row'>
        <Box value={board[0]} onBoxClick={() => onBoxClickHandler(0)} />
        <Box value={board[1]} onBoxClick={() => onBoxClickHandler(1)} />
        <Box value={board[2]} onBoxClick={() => onBoxClickHandler(2)} />
      </div>
      <div className='row'>
        <Box value={board[3]} onBoxClick={() => onBoxClickHandler(3)} />
        <Box value={board[4]} onBoxClick={() => onBoxClickHandler(4)} />
        <Box value={board[5]} onBoxClick={() => onBoxClickHandler(5)} />
      </div>
      <div className='row'>
        <Box value={board[6]} onBoxClick={() => onBoxClickHandler(6)} />
        <Box value={board[7]} onBoxClick={() => onBoxClickHandler(7)} />
        <Box value={board[8]} onBoxClick={() => onBoxClickHandler(8)} />
      </div>

      <button className='resetBtn' onClick={onResetBtnClickHandler}>
        Reset
      </button>
    </div>
  )
}

export default Board
