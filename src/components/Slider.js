import "./Slider.css";

const Slider = (props) => {
    return (
        <div className="slider">
            <div>{props.title}</div>
            <input
                type="range"
                onChange={props.valueChange}
                min={props.min}
                max={props.max}
                id={props.id}
            ></input>
        </div>
    );
};

export default Slider;
