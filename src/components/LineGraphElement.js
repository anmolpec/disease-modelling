import "./Graph.css";

const LineGraphElement = (props) => {
    return (
        <div
            className="line-graph-element"
            style={{
                marginLeft: `${props.position.x}px`,
                marginTop: `${props.position.y}px`,
                backgroundColor: props.color,
            }}
        ></div>
    );
};

export default LineGraphElement;
