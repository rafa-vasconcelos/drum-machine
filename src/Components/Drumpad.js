import React from "react";
import PropTypes from "prop-types";

const Drumpad = (props) => {
  Drumpad.propTypes = {
    bank: PropTypes.array,
    power: PropTypes.bool,
    updateDisplay: PropTypes.func,
    volumeValue: PropTypes.number,
  };

  const { bank } = props;

  const soundSample = React.useMemo(() => {
    const soundSample = new Audio(props.bank.url);
    soundSample.volume = props.volumeValue;
    return soundSample;
  }, [props.bank, props.volumeValue]);

  const playSound = () => {
    soundSample.currentTime = 0;
    if (props.power) {
      soundSample.play();
    }
  };

  // const pauseSound = () => {
  //   if (!props.power) {
  //     soundSample.currentTime = 0;
  //     soundSample.pause();
  //   }
  // };

  const handleKeyPress = (event) => {
    if (
      event.key === bank.keyTrigger.toLowerCase() ||
      event.key === bank.keyTrigger
    ) {
      playSound();
      props.updateDisplay(event, bank.id);
    }
  };

  React.useEffect(() => {
    if (props.power === false) {
      soundSample.pause();
    }
  }, [props.power]);

  // React.useEffect(() => {
  //   const sound = document.getElementsByClassName(props.bank.id)[0];
  //   sound.currentTime = 0;
  //   if (props.power === true) {
  //     document.addEventListener("keydown", handleKeyPress);
  //   }
  //   return function cleanup() {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [props.bank, props.power]);

  // React.useEffect(() => {
  //   document.getElementsByClassName(props.bank.id)[0].volume =
  //     props.volumeValue.toString();
  // }, [props.volumeValue, props.bank]);

  return (
    <div
      className="drum-pad"
      onClick={(event) => {
        props.updateDisplay(event);
        playSound();
      }}
      id={bank.id}
      key={bank.id}
      src={bank.url}
      onKeyDown={handleKeyPress}
      // tabIndex={"0"}
    >
      <audio
        className={bank.id + " clip"}
        id={bank.keyTrigger}
        // onKeyDown={handleKeyPress}
        // tabIndex="0"
      >
        <source src={bank.url} /* onKeyDown={handleKeyPress} tabIndex="0" */ />
      </audio>
      {bank.keyTrigger}
    </div>
  );
};

export default Drumpad;
