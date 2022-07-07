import React from "react";
import { bankTwo } from "../data/bank";
import PropTypes from "prop-types";

const Controls = (props) => {
  Controls.propTypes = {
    power: PropTypes.bool,
    changePower: PropTypes.bool,
    display: PropTypes.string,
    volumeValue: PropTypes.number,
    changeVolumeHandler: PropTypes.func,
    changeBank: PropTypes.func,
    currentBank: PropTypes.array,
  };

  return (
    <div className="controls">
      <p>{props.power ? "Power: ON" : "Power: OFF"}</p>
      <div className="toggle" onClick={props.changePower}>
        <div
          className="inner-toggle"
          style={props.power ? { float: "right" } : { float: "left" }}
        ></div>
      </div>
      <div className="info-screen">{props.display.replace(/-/g, " ")}</div>
      <p id="volume">Volume</p>
      <input
        id="myRange"
        type="range"
        max="1"
        min="0"
        step="0.01"
        name="volume"
        value={props.volumeValue}
        disabled={!props.power ? "disabled" : undefined}
        onChange={props.changeVolumeHandler}
        onInput={props.changeVolumeHandler}
      ></input>
      <p>Bank</p>
      <div
        id="bank"
        className="toggle"
        style={!props.power ? { opacity: 0.5 } : undefined}
        onClick={props.changeBank}
      >
        <div
          className="inner-toggle"
          style={props.currentBank === bankTwo ? { float: "right" } : undefined}
        ></div>
      </div>
    </div>
  );
};

export default Controls;
