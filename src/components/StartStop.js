import { useState } from "react";

import "./StartStop.css";

let toggle = false;

const StartStop = (props) => {
    const [buttonState, setButtonState] = useState("START");

    const onClickHandler = () => {
        if (buttonState === "START") setButtonState("STOP");
        else setButtonState("START");
        toggle = !toggle;
        props.clickHandler(toggle);
    };

    return (
        <div className="container">
            <button onClick={onClickHandler}>{buttonState}</button>
        </div>
    );
};

export default StartStop;
