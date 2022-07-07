import "./App.scss";
import Drumpad from "./Components/Drumpad.js";
import { bankOne, bankTwo } from "./data/bank.js";
import Controls from "./Components/Controls";
import React from "react";

const App = () => {
  const [currentBank, setCurrentBank] = React.useState(bankOne);

  const [power, setPower] = React.useState(true);

  const [display, setDisplay] = React.useState("");

  const [volumeValue, setVolumeValue] = React.useState(0.5);

  const [pressedButton, setPressedButton] = React.useState({
    Q: false,
    W: false,
    E: false,
    A: false,
    S: false,
    D: false,
    Z: false,
    X: false,
    C: false,
  });

  const sounds = React.useMemo(() => {
    const newArray = [];
    for (let i = 0; i < currentBank.length; i++) {
      newArray.push(new Audio(currentBank[i].url));
    }
    newArray.forEach((item) => (item.volume = volumeValue));
    return newArray;
  }, [currentBank, volumeValue]);

  React.useEffect(() => {
    if (!power) {
      for (let i = 0; i < currentBank.length; i++) {
        sounds[i].pause();
      }
    }
  }, [power]);

  const updateDisplay = (event) => {
    const id = event.target.id;
    if (power && event.type === "click") {
      setDisplay(id);
    }
  };

  const changeVolumeHandler = (event) => {
    setVolumeValue(event.target.value);
    setDisplay(`Volume: ${Math.round(event.target.value * 100)}`);
  };

  const changeBank = () => {
    if (power === true) {
      setCurrentBank((prevBank) => (prevBank === bankOne ? bankTwo : bankOne));
    }
  };

  const changePower = () => {
    setPower((prevPower) => !prevPower);
    setDisplay("");
  };

  const handleKeyPress = (event) => {
    if (power) {
      for (let i = 0; i < currentBank.length; i++) {
        if (
          event.key === currentBank[i].keyTrigger ||
          event.key === currentBank[i].keyTrigger.toLowerCase()
        ) {
          sounds[i].currentTime = 0;
          sounds[i].play();
          setDisplay(currentBank[i].id);
          setPressedButton((prevState) => ({
            ...prevState,
            [currentBank[i].keyTrigger]: !prevState[currentBank[i].keyTrigger],
          }));
          setTimeout(
            () =>
              setPressedButton((prevState) => ({
                ...prevState,
                [currentBank[i].keyTrigger]:
                  !prevState[currentBank[i].keyTrigger],
              })),
            100
          );
        }
      }
    } else if (!power) {
      for (let i = 0; i < currentBank.length; i++) {
        if (
          event.key === currentBank[i].keyTrigger ||
          event.key === currentBank[i].keyTrigger.toLowerCase()
        ) {
          setPressedButton((prevState) => ({
            ...prevState,
            [currentBank[i].keyTrigger]: !prevState[currentBank[i].keyTrigger],
          }));
          setTimeout(
            () =>
              setPressedButton((prevState) => ({
                ...prevState,
                [currentBank[i].keyTrigger]:
                  !prevState[currentBank[i].keyTrigger],
              })),
            100
          );
        }
      }
    }
  };

  const handleClick = (event, bankId, keyTrigger) => {
    const id = event.target.id;
    if (id === bankId) {
      setPressedButton((prevState) => {
        return { ...prevState, [keyTrigger]: !prevState[keyTrigger] };
      });
      setTimeout(() => {
        setPressedButton((prevState) => {
          return { ...prevState, [keyTrigger]: !prevState[keyTrigger] };
        });
      }, 100);
    }
  };

  const padBank = currentBank.map((item) => {
    return (
      <Drumpad
        key={item.id}
        bank={item}
        updateDisplay={updateDisplay}
        currentBank={currentBank}
        power={power}
        display={display}
        volumeValue={volumeValue}
        pressedButton={pressedButton}
        handleClick={handleClick}
      />
    );
  });

  return (
    <div id="drum-machine" onKeyDown={handleKeyPress} tabIndex="-1">
      <div id="display">
        <div id="drum-button">{padBank}</div>
        <Controls
          changeBank={changeBank}
          changePower={changePower}
          currentBank={currentBank}
          power={power}
          display={display}
          volumeValue={volumeValue}
          changeVolumeHandler={changeVolumeHandler}
        />
      </div>
    </div>
  );
};

export default App;
