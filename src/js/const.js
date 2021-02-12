const MAX_TRY = 15
const MAX_CODES = 4;
const COLOR_ENUM = {
  BLUE: 'blue',
  BLACK: 'black',
  BROWN: 'brown',
  YELLOW: 'yellow',
  GREEN: 'green',
  WHITE: 'white',
  ORANGE: 'orange',
  RED: 'red',
}

const RESULT_ENUM = {
  NONE: null,
  PARTIAL: 'partial',
  FULL: 'full',
}

const STREAM_TYPE = {
  AUDIO: 'audio',
  VIDEO: 'video',
}

const EASY = [COLOR_ENUM.BLUE, COLOR_ENUM.BLACK, COLOR_ENUM.BROWN, COLOR_ENUM.YELLOW, COLOR_ENUM.GREEN, COLOR_ENUM.WHITE]

export { MAX_TRY, MAX_CODES, COLOR_ENUM, RESULT_ENUM, EASY, STREAM_TYPE }