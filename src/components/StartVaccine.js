import { useState } from "react";

import "./StartStop.css";

const StartVaccine = (props) => {
    const [buttonState, setButtonState] = useState("Start Vaccine");

    const onClickHandler = () => {
        setButtonState((prevState) => {
            if (prevState === "Start Vaccine") return "Stop Vaccine";
            else return "Start Vaccine";
        });
        props.clickHandler();
    };

    return (
        <div className="container">
            <button onClick={onClickHandler}>{buttonState}</button>
        </div>
    );
};

export default StartVaccine;
