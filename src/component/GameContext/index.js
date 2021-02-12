import React, { useContext } from 'react'
import useGame from '../../js/state/game/hook'

const GameContext = React.createContext()

export function GameProvider ({ children }) {
  const value = useGame()
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGameContext () {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error(`useGameContext must be used within a GameProvider`)
  }
  return context
}