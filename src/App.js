import "./App.scss";
import Drumpad from "./Drumpad.js";
import { bankOne, bankTwo } from "./bank.js";
import Controls from "./Controls";
import React from "react";

function App() {
  const [state, setState] = React.useState({
    currentBank: bankOne,
    power: true,
    display: "",
    volumeValue: 0.2,
  });

  function updateDisplay(event, displayInfo) {
    let id = event.target.id;
    if (state.power && event.type === "click") {
      setState({ ...state, display: id });
    } else if (state.power && event.type === "keydown") {
      setState((prevState) => ({ ...prevState, display: displayInfo }));
    }
  }

  function changeVolume(event) {
    setState((prevState) => ({
      ...prevState,
      volumeValue: event.target.value,
      display: `Volume: ${Math.round(event.target.value * 200)}`,
    }));
  }

  function setBank() {
    if (state.power === true) {
      setState({
        ...state,
        currentBank: state.currentBank === bankOne ? bankTwo : bankOne,
      });
    }
  }

  function setPower() {
    setState({ ...state, power: !state.power, display: "" });
    if (state.power === false) {
      document.getElementById("myRange").disabled = false;
    } else if (state.power === true) {
      document.getElementById("myRange").disabled = true;
    }
  }

  const padBank = state.currentBank.map((item) => {
    return <Drumpad bank={item} updateDisplay={updateDisplay} state={state} />;
  });

  return (
    <div id="drum-machine">
      <div id="display">
        <div id="buttons">{padBank}</div>
        <Controls
          setBank={setBank}
          setPower={setPower}
          state={state}
          changeVolume={changeVolume}
        />
      </div>
    </div>
  );
}

export default App;
