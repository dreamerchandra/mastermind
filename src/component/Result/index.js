import React from 'react'
import { RESULT_ENUM } from '../../js/const'
import { useGameContext } from '../GameContext'

const GetResult = ({ disabled, setNextStep }) => (
  <button className="tries" disabled={disabled} onClick={setNextStep}>Check</button>
)

const compareResult = (first, sec) => {
  const SORT_ORDER = [RESULT_ENUM.FULL, RESULT_ENUM.PARTIAL, RESULT_ENUM.NONE]
  const firstId = SORT_ORDER.findIndex((ele) => ele === first.result)
  const secId = SORT_ORDER.findIndex((ele) => ele === sec.result)
  return firstId - secId;
}
const Result = ({ codes, tryId, }) => (
  <div className="tries" key={tryId}>
    {
      JSON.parse(JSON.stringify(codes)).sort(compareResult).map(({ codeId, result }) => (
        <code key={codeId} data-code={result || 'none'}></code>
      ))
    }
  </div>
)

const Results = () => {
  const { gameState, setNextStep } = useGameContext()
  const { tries, activeTryId } = gameState
  return (
    <div className="result-wrapper">
      {
        tries?.map(({ tryId, codes, isCompleted }) => {
          if (isCompleted) {
            return (<Result codes={codes} tryId={tryId} key={tryId} />)
          }
          return (<GetResult disabled={activeTryId !== tryId} setNextStep={setNextStep} key={tryId}/>)
        })
      }
    </div>
  )
}

export default Results;