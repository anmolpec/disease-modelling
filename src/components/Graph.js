import "./Graph.css";

const Graph = (props) => {
    return (
        <div className="graph-container">
            <div
                className="bar-container"
                style={{ backgroundColor: "#b9ffb9c7" }}
            >
                <div className="label">Susceptible</div>
                <div className="label">
                    {(props.data.susceptible * 100).toFixed(0)}%
                </div>
                <div
                    className="graph-bar"
                    style={{
                        backgroundColor: "green",
                        height: `${props.data.susceptible * 100}%`,
                    }}
                ></div>
            </div>
            <div
                className="bar-container"
                style={{ backgroundColor: "#ff000024" }}
            >
                <div className="label">Infected</div>
                <div className="label">
                    {(props.data.infected * 100).toFixed(0)}%
                </div>
                <div
                    className="graph-bar"
                    style={{
                        backgroundColor: "red",
                        height: `${props.data.infected * 100}%`,
                    }}
                ></div>
            </div>
            <div
                className="bar-container"
                style={{ backgroundColor: "#96ebef" }}
            >
                <div className="label">Recovered</div>
                <div className="label">
                    {(props.data.recovered * 100).toFixed(0)}%
                </div>
                <div
                    className="graph-bar"
                    style={{
                        backgroundColor: "blue",
                        height: `${props.data.recovered * 100}%`,
                    }}
                ></div>
            </div>
            <div
                className="bar-container"
                style={{ backgroundColor: "#9370dba6" }}
            >
                <div className="label">Vaccinated</div>
                <div className="label">
                    {(props.data.vaccinated * 100).toFixed(0)}%
                </div>
                <div
                    className="graph-bar"
                    style={{
                        backgroundColor: "purple",
                        height: `${props.data.vaccinated * 100}%`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Graph;
