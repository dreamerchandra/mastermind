import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useGameContext } from '../GameContext'

function useWindowSize () {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize () {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

const Confetti = () => {
  const { gameState } = useGameContext()
  const { result } = gameState
  const { width, height } = useWindowSize()
  return (
    result ?
      <ReactConfetti
        width={width}
        height={height}
      />
      : null
  )
}

export default Confetti