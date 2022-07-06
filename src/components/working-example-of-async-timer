import { useState, useEffect, useRef } from "react";

// this code is based on https://stackoverflow.com/a/53090848

const delay = 1;

export default function App() {
  const updates = useRef(0);
  const [counter, setCounter] = useState(1);

  const toggleRef = useRef(false);
  const [toggleValue, setToggleValue] = useState(false);
  //we set toggleValue state to the same like toggleRef to force re-render

  const timer = useRef(null); // save timer in useRef and pass it to child

  //count up all re-renders
  useEffect(() => {
    updates.current++;
  });

  const intervalTimer = () => {
    toggleRef.current = !toggleRef.current;
    console.log("useEffect toggleRef updated", toggleRef.current);
    // useRef value stored in .current property
    if (toggleRef.current) {
      //get the latest value of state, not the value of first render
      setToggleValue((s) => (s = !s));

      //timer.current = setInterval(() => setCounter((c) => c + 1), delay * 1000);
      timer.current = setInterval(() => {
        setCounter((c) => c + 1);
        console.log("tick");
      }, delay * 1000);
    } else {
      setCounter(0);
      clearInterval(timer.current);
      setToggleValue((s) => (s = false));
    }
  };

  // function Child({ counter, currentTimer }) {
  function Child({ toggleValue, currentTimer }) {
    // this will clearInterval in parent component after counter gets to 5
    useEffect(() => {
      //führe den clearInterval gar nicht erst aus, solange der counter nicht bei 5 ist
      // if (counter <= 5) return; //it is a loop condition so to speak
      if (toggleValue) return; //it is a loop condition so to speak
      //currentTimer is also updated because with every call the intervalID changes
      // setCounter(0);
      clearInterval(currentTimer); //currentTimer stores the intervalID
      //counter is the number which counts up with each call
      //}, [toggleRef, currentTimer]); change in toggleRef doesn't force a re-render
      //instead we need observe the toggleValue state change
    }, [toggleValue, currentTimer]);

    return null;
  }

  return (
    <div>
      <input
        type="checkbox"
        id="toggle"
        name="toggle"
        value={toggleRef.current}
        onChange={intervalTimer}
      />
      <label for="toggle">toggleRef to: {!toggleRef.current + ""}</label>
      <div>
        re-renders: {updates.current}
        <br />
        interval counter is: <b>{counter} </b>
        <br />
        intervalID is: <b>{timer.current} </b>
        <br />
        toggleRef.current: {toggleRef.current + ""}
        <br />
        {
          //toggleValue: {toggleValue + ""}
        }
      </div>

      {/*  <button onClick={intervalTimer}>
        start intervalTimer
        <br />
        and toggle
        <br />
        toggleRef to: <br />
        {!toggleRef.current + ""}
      </button>
      <br/> */}

      <Child
        counter={counter}
        currentTimer={timer.current}
        toggleValue={toggleValue}
      />
    </div>
  );
}
