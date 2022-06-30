import React from "react";

function Drumpad(props) {
  function playSound() {
    const sound = document.getElementsByClassName(props.bank.id)[0];
    sound.currentTime = 0;
    if (props.state.power) {
      sound.play();
    }
  }

  function pauseSound() {
    const sound = document.getElementsByClassName(props.bank.id)[0];
    sound.currentTime = 0;
    sound.pause();
  }

  function handleKeyPress(event) {
    if (
      (event.key === props.bank.keyTrigger.toLowerCase() &&
        props.state.power) ||
      (event.key === props.bank.keyTrigger && props.state.power)
    ) {
      playSound();
      props.updateDisplay(event, props.bank.id);
    }
  }

  React.useEffect(() => {
    const sound = document.getElementsByClassName(props.bank.id)[0];
    sound.currentTime = 0;
    if (props.state.power === true) {
      document.addEventListener("keydown", handleKeyPress);
    } else if (props.state.power === false) {
      pauseSound();
    }
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bank, props.state.power]);

  React.useEffect(
    function () {
      document.getElementsByClassName(props.bank.id)[0].volume =
        props.state.volumeValue.toString();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.state.volumeValue, props.bank]
  );

  return (
    <div
      className="drum-pad"
      onClick={(event) => {
        props.updateDisplay(event);
        playSound();
      }}
      id={props.bank.id}
      key={props.bank.id}
      src={props.bank.url}
    >
      <audio className={props.bank.id + " clip"} id={props.bank.keyTrigger}>
        <source src={props.bank.url} />
      </audio>
      {props.bank.keyTrigger}
    </div>
  );
}

export default Drumpad;
