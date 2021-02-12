import React from 'react'
import Tries from '../Tries'
import Results from '../Result'

export default function Board () {
  return (
    <div className="board">
      <Tries />
      <Results />
    </div>
  )
}