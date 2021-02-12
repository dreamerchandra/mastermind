import React from 'react';
import Board from '../Board';
import { GameProvider, useGameContext } from '../GameContext';
import Confetti from '../Confetti'

const Options = () => {
  const { options, setSelection } = useGameContext()
  return (
    <div className="options">
      {
        options.filter(option => option).map((option) => (
          <code key={option} data-code={option} onClick={() => {
            setSelection(option)
          }}></code>
        ))
      }
    </div>
  )
}

export function Game () {
  return (
    <GameProvider>
      <div className="game">
        <Board />
        <Options />
        <Confetti />
      </div>
    </GameProvider>
  )
}