import { useState } from "react";

import GridElement from "./GridElement";
import "./Grid.css";

const Grid = (props) => {
    let count = props.count;
    let grid = props.grid;

    const [clicked, setClicked] = useState(false);

    const onElementClickHandler = (event, element) => {
        props.elementStateChange(event, element);
    };

    return (
        <div
            className="grid-container"
            style={{ gridTemplateColumns: `repeat(${props.count}, 1fr)` }}
            onMouseDown={() => setClicked(true)}
            onMouseUp={() => setClicked(false)}
        >
            {grid.map((element) => {
                return element.map((element) => (
                    <GridElement
                        key={element.id}
                        gridElement={element}
                        clickHandler={onElementClickHandler}
                        clicked={clicked}
                    />
                ));
            })}
        </div>
    );
};

export default Grid;
