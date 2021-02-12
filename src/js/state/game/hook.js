import { nanoid } from 'nanoid'
import { useReducer, useState } from 'react'
import { EASY, MAX_CODES, MAX_TRY, RESULT_ENUM } from '../../const'
import { shuffle } from '../../utils'

const initCodes = (length) => {
  return Array.apply(null, { length }).map(() => ({ // https://stackoverflow.com/a/47826868/5277189
    codeId: nanoid(),
    value: '',
    result: RESULT_ENUM.NONE
  }))
}
/**
 * {
 *  tries: [{
 *    tryId: 'asfdasdf',
 *    codes: [{
 *      id: 'asdfasdfasdfsadfasdf',
 *      value: 'blue',
 *      result: RESULT_ENUM
 *    }],
 *    completed: false,
 *  }],
 *  resultCodes: [BLUE, BLACK, GREEN, ....],
 *  activeTryId: 'afadsfas',
 *  result: true|false
 * }
 */
const initState = () => {
  const tries = Array.apply(null, { length: MAX_TRY }).map(() => (
    {
      tryId: nanoid(),
      codes: initCodes(MAX_CODES),
      isCompleted: false,
    }))
  return {
    tries,
    resultCodes: shuffle(EASY)?.slice(0, MAX_CODES),
    activeTryId: tries[tries.length - 1].tryId,
    result: false,
  }
}

const SET_CODE = 'update-code'
const NEXT_STEP = 'next-step'

function gameReducer (state, { type, tryId, code, codeId }) {
  switch (type) {
    case SET_CODE: {
      const newState = JSON.parse(JSON.stringify(state))
      const activeTryId = tryId || state.activeTryId;
      const tryPos = newState.tries.findIndex((ele) => ele.tryId === activeTryId)
      if (tryPos < 0) return state;
      const codePos = newState.tries[tryPos].codes.findIndex((code) => code.codeId === codeId)
      if (codePos < 0) return state;
      newState.tries[tryPos].codes[codePos].value = code
      const correctlyPlaced = newState.resultCodes.findIndex((ele) => ele === code) === codePos
      newState.tries[tryPos].codes[codePos].result = !newState.resultCodes.includes(code) ? RESULT_ENUM.NONE : correctlyPlaced ? RESULT_ENUM.FULL : RESULT_ENUM.PARTIAL
      return newState;
    }
    case NEXT_STEP: {
      const newState = JSON.parse(JSON.stringify(state))
      const { activeTryId } = state;
      const tryPos = newState.tries.findIndex((ele) => ele.tryId === activeTryId)
      if (tryPos < 0) return state;
      newState.tries[tryPos].isCompleted = true
      if (tryPos === 0) return newState;
      newState.activeTryId = newState.tries[tryPos - 1].tryId
      const isCracked = newState.tries[tryPos].codes.every(({ result }) => result === RESULT_ENUM.FULL)
      newState.result = isCracked
      return newState;
    }
    default:
      throw new Error(`Unhandled type: ${type}`)
  }
}

export default function useGame () {
  const [gameState, dispatch] = useReducer(gameReducer, initState());
  const [options, setMode] = useState([null, ...EASY])
  const [selection, _setSelection] = useState(null)
  const setSelection = (choice) => {
    if (!options.includes(choice)) return
    _setSelection(choice)
  }
  const setCode = ({ code, codeId }) => {
    dispatch({
      type: SET_CODE, code, codeId,
    })
  }
  const setNextStep = () => {
    dispatch({
      type: NEXT_STEP,
    })
  }
  return {gameState, setCode, setNextStep, options, setMode, selection, setSelection }
}