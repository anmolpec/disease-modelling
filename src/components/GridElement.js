import { useState } from "react";
import "./GridElement.css";

const GridElement = (props) => {
    const [state, setState] = useState({ element: props.gridElement });

    const elementClickHandler = (event) => {
        if (!props.clicked && event.type === "mouseover") return;
        event.preventDefault();
        let newState = props.clickHandler(event, props.gridElement);
        setState((prevState) => {
            return { ...prevState, state: newState };
        });
    };

    const elementColor = (status) => {
        if (status === "dead") return "white";
        if (status === "alive") return "green";
        if (status === "infected") return "red";
        if (status === "immune") return "blue";
        if (status === "permanentlyImmune") return "purple";
    };

    return (
        <div
            className="grid-element"
            style={{
                backgroundColor: elementColor(state.element.state),
            }}
            onClick={elementClickHandler}
            onMouseOver={elementClickHandler}
        >.</div>
    );
};

export default GridElement;
