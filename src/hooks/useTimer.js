import { useCallback, useEffect, useRef, useState } from 'react'

export function useTimer() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const intervalRef = useRef(null)

  const stop = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const start = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((previousSeconds) => previousSeconds + 1)
    }, 1000)
  }, [])

  const reset = useCallback(() => {
    stop()
    setElapsedSeconds(0)
  }, [stop])

  useEffect(() => stop, [stop])

  return { elapsedSeconds, start, stop, reset }
}
