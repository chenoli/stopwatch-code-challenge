import {  useEffect, useMemo, useRef, useState } from 'react';

import { padTime } from './utils/padTime';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timer>();

  const formattedTime = useMemo(( ) => {
    let seconds = Math.floor(time / 100);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    let milliseconds = (time * 10) % 1000;


    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${padTime(hours)}:${padTime(minutes)}:${padTime(
      seconds)}:${padTime(milliseconds, 3)}`;
  }, [time]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevState => prevState + 1);
      }, 10)
    } else if (!isRunning && intervalRef) {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  const counter = () => {
    setIsRunning(prevState => !prevState);
  }

const clear = () => {
  setIsRunning(false);
  setTime(0);
}

  return (
    <div className='container'>
      <span className='clock'>{formattedTime}</span>
      <button className='button' onClick={counter}>{isRunning ? 'Stop' : 'Start'}</button>
      <button className='button' disabled={time === 0} onClick={clear}>Clear</button>
    </div>
  );
}

export default App;
