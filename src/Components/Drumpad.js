import React from "react";
import PropTypes from "prop-types";

const Drumpad = (props) => {
  Drumpad.propTypes = {
    bank: PropTypes.array,
    power: PropTypes.bool,
    updateDisplay: PropTypes.func,
    volumeValue: PropTypes.number,
    handleKeyPress: PropTypes.func,
    pressedButton: PropTypes.object,
    handleClick: PropTypes.func,
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

  React.useEffect(() => {
    if (props.power === false) {
      soundSample.pause();
    }
  }, [props.power]);

  const styles = (() => {
    if (props.power && props.pressedButton[bank.keyTrigger]) {
      return {
        backgroundColor: "orange",
        marginTop: "2px",
        marginLeft: "2px",
        boxShadow: "none",
      };
    } else if (props.pressedButton[bank.keyTrigger]) {
      return {
        marginTop: "2px",
        marginLeft: "2px",
        boxShadow: "none",
      };
    }
  })();

  return (
    <div
      style={styles}
      className="drum-pad"
      onClick={(event) => {
        props.updateDisplay(event);
        playSound();
        props.handleClick(event, bank.id, bank.keyTrigger);
      }}
      id={bank.id}
      key={bank.id}
      src={bank.url}
      onKeyDown={props.handleKeyPress}
    >
      <audio className={bank.id + " clip"} id={bank.keyTrigger}>
        <source src={bank.url} />
      </audio>
      {bank.keyTrigger}
    </div>
  );
};

export default Drumpad;
