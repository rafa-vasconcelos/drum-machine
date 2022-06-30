import React from "react";
import { bankTwo } from "./bank";

function Controls(props) {
  return (
    <div className="controls">
      <p>{props.state.power ? "Power: ON" : "Power: OFF"}</p>
      <div className="select" onClick={props.setPower}>
        <div
          className="inner-select"
          style={props.state.power ? { float: "right" } : { float: "left" }}
        ></div>
      </div>
      <div className="info-screen">
        {props.state.display.replace(/-/g, " ")}
      </div>
      <p id="volume">Volume</p>
      <input
        id="myRange"
        type="range"
        max="0.5"
        min="0"
        step="0.01"
        name="volume"
        value={props.state.volumeValue}
        onChange={props.changeVolume}
        onInput={props.changeVolume}
      ></input>
      <p>Bank</p>
      <div
        id="bank"
        className="select"
        style={!props.state.power ? { opacity: 0.5 } : undefined}
        onClick={props.setBank}
      >
        <div
          className="inner-select"
          style={
            props.state.currentBank === bankTwo ? { float: "right" } : undefined
          }
        ></div>
      </div>
    </div>
  );
}

export default Controls;
