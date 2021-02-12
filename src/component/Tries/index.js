import React from 'react'
import { useGameContext } from '../GameContext'

const getColoHex = (color) => {
  return color;
}

const Tries = () => {
  const { gameState, setCode, selection } = useGameContext()
  const { tries } = gameState
  return (
    <div className="sandbox">
      {
        tries?.map(({ tryId, codes }) => (
          <div className="tries" key={tryId}>
            {
              codes.map(({ codeId, value }) => (
                <code key={codeId} data-code={getColoHex(value) || 'none'} onClick={() => {
                  setCode({ codeId, code: selection })
                }}></code>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Tries;