import { useState } from "react";

import "./App.css";

import Header from "./components/Header";
import Grid from "./components/Grid";
import StartStop from "./components/StartStop";
import Graph from "./components/Graph";
import StartVaccine from "./components/StartVaccine";
import LineGraph from "./components/LineGraph";
import Slider from "./components/Slider";

//infectionDuration:10, infectionSpreadRate:0.5, immunity:15, vaccinationRate:0.003

let t;

let speed = 50;

let count = 50;

let infectionDuration = 10;

let infectionSpreadRate = 0.5;

let immunity = 15;

let vaccinationRate = 30;

let vaccination = false;

let gridArray = [];

for (let i = 0; i < count; i++) {
    let tempArr = [];
    for (let j = 0; j < count; j++) {
        let gridElement = {
            id: i * count + j,
            state: "dead",
            nextState: "",
            infectedFor: 0,
            immunityDuration: immunity,
        };
        tempArr = [...tempArr, gridElement];
    }
    gridArray = [...gridArray, tempArr];
}

const calcNeighbours = (arr, i, j) => {
    let c = 0;
    if (i - 1 >= 0 && j - 1 >= 0 && arr[i - 1][j - 1].state === "infected")
        c += Math.random();
    if (i - 1 >= 0 && arr[i - 1][j].state === "infected") c += Math.random();
    if (i - 1 >= 0 && j + 1 < count && arr[i - 1][j + 1].state === "infected")
        c += Math.random();
    if (j - 1 >= 0 && arr[i][j - 1].state === "infected") c += Math.random();
    if (j + 1 < count && arr[i][j + 1].state === "infected") c += Math.random();
    if (i + 1 < count && j - 1 >= 0 && arr[i + 1][j - 1].state === "infected")
        c += Math.random();
    if (i + 1 < count && arr[i + 1][j].state === "infected") c += Math.random();
    if (
        i + 1 < count &&
        j + 1 < count &&
        arr[i + 1][j + 1].state === "infected"
    )
        c += Math.random();

    return c;
};

function App() {
    const [number, setNumber] = useState(0);
    const [grid, setGrid] = useState(gridArray);
    //const [vaccination, setVaccination] = useState(false);
    const [statistics, setStatistics] = useState({
        susceptible: 0,
        infected: 0,
        recovered: 0,
        vaccinated: 0,
    });
    const [running, setRunning] = useState(false);

    let calcNextState = () => {
        setGrid((prevState) => {
            let susceptible = 0,
                infected = 0,
                recovered = 0,
                vaccinated = 0;
            for (let i = 0; i < prevState.length; i++) {
                for (let j = 0; j < prevState[0].length; j++) {
                    if (prevState[i][j].state === "infected") {
                        prevState[i][j].infectedFor =
                            prevState[i][j].infectedFor - 1;
                        if (prevState[i][j].infectedFor <= 0) {
                            prevState[i][j].nextState = "immune";
                            prevState[i][j].immunityDuration = immunity;
                        } else {
                            prevState[i][j].nextState = "infected";
                        }
                    }
                    if (prevState[i][j].state === "dead") {
                        prevState[i][j].nextState = "dead";
                    }
                    if (prevState[i][j].state === "alive") {
                        let infectedNeighbours = calcNeighbours(
                            prevState,
                            i,
                            j
                        );
                        let infectionProbability =
                            infectedNeighbours * Math.random();
                        if (
                            infectionProbability >
                            4 - infectionSpreadRate / 100
                        ) {
                            prevState[i][j].nextState = "infected";
                            prevState[i][j].infectedFor = infectionDuration;
                        } else {
                            prevState[i][j].nextState = "alive";
                        }
                    }
                    if (prevState[i][j].state === "immune") {
                        prevState[i][j].immunityDuration =
                            prevState[i][j].immunityDuration - 1;
                        if (prevState[i][j].immunityDuration <= 0) {
                            prevState[i][j].nextState = "alive";
                            prevState[i][j].infectedFor = infectionDuration;
                        } else {
                            prevState[i][j].nextState = "immune";
                        }
                    }
                    if (prevState[i][j].state === "permanentlyImmune") {
                        prevState[i][j].nextState = "permanentlyImmune";
                    }
                }
            }
            for (let i = 0; i < prevState.length; i++) {
                for (let j = 0; j < prevState[0].length; j++) {
                    prevState[i][j].state = prevState[i][j].nextState;
                    prevState[i][j].nextState = "";
                    if (
                        vaccination &&
                        (prevState[i][j].state === "alive" ||
                            prevState[i][j].state === "immune" ||
                            prevState[i][j].state === "infected")
                    ) {
                        if (Math.random() < vaccinationRate / 10000) {
                            prevState[i][j].state = "permanentlyImmune";
                        }
                    }
                    if (prevState[i][j].state === "alive") susceptible += 1;
                    if (prevState[i][j].state === "infected") infected += 1;
                    if (prevState[i][j].state === "immune") recovered += 1;
                    if (prevState[i][j].state === "permanentlyImmune")
                        vaccinated += 1;
                }
                let total = susceptible + infected + recovered + vaccinated;
                setStatistics({
                    susceptible: susceptible / total,
                    infected: infected / total,
                    recovered: recovered / total,
                    vaccinated: vaccinated / total,
                });
            }
            return [...prevState];
        });
    };

    const onClickHandler = (buttonState) => {
        setRunning(buttonState);
        if (buttonState) {
            t = setInterval(function () {
                setNumber((num) => {
                    return num + 1;
                });
                calcNextState();
            }, 1000 - speed * 10);
        } else {
            clearInterval(t);
        }
    };

    const vaccineHandler = () => {
        // setVaccination((prevState) => {
        //     console.log(prevState);
        //     return !prevState;
        // });
        clearInterval(t);
        vaccination = !vaccination;
        onClickHandler(running);
    };

    const elementStateChangeHandler = (event, element) => {
        event.preventDefault();
        let id = Number(element.id);
        let i = Math.floor(id / count);
        let j = id % count;
        let newState = element.state;
        if (newState === "dead") newState = "alive";
        else if (newState === "alive") newState = "infected";
        //else if (newState === "infected") newState = "permanentlyImmune";
        else newState = "dead";
        setGrid((prevState) => {
            console.log(prevState[i][j]);
            prevState[i][j].state = newState;
            if (newState === "infected") {
                prevState[i][j].infectedFor = infectionDuration;
            }
            return prevState;
        });
        return newState;
    };

    const sliderChange = (event) => {
        if (event.target.id === "infectionDuration") {
            infectionDuration = event.target.value;
        }
        if (event.target.id === "infectionSpreadRate") {
            infectionSpreadRate = event.target.value;
        }
        if (event.target.id === "immunity") {
            immunity = event.target.value;
        }
        if (event.target.id === "vaccinationRate") {
            vaccinationRate = event.target.value;
        }
        if (event.target.id === "speed") {
            speed = event.target.value;
            clearInterval(t);
            onClickHandler(running);
        }
    };

    return (
        <div>
            <Header />
            <div className="model">
                <Grid
                    grid={grid}
                    count={count}
                    elementStateChange={elementStateChangeHandler}
                />
                <div className="graph">
                    <Graph data={statistics}></Graph>
                    <LineGraph data={statistics} step={number}></LineGraph>
                </div>
            </div>
            <div className="controls">
                <div className="step-button-div">
                    <h2 className="step-count">STEP : {number}</h2>
                    <div className="buttons">
                        <StartStop clickHandler={onClickHandler} />
                        <StartVaccine clickHandler={vaccineHandler} />
                    </div>
                </div>

                <div className="slider-container">
                    <div
                        style={{
                            backgroundColor: "rgb(231 215 255)",
                            borderRadius: "10px",
                            gridRowStart: "1",
                            gridRowEnd: "3",
                            margin: "10%",
                            borderStyle: "solid",
                            borderColor: "#8000805e",
                        }}
                    >
                        <input
                            type="range"
                            min="0"
                            max="99"
                            id={"speed"}
                            onChange={sliderChange}
                            style={{
                                transform: "rotate(270deg)",
                                width: "100%",
                                height: "70%",
                            }}
                        ></input>
                        <div style={{ color: "#3f0c6d", textAlign: "center" }}>
                            Speed
                        </div>
                    </div>
                    <Slider
                        valueChange={sliderChange}
                        id={"infectionDuration"}
                        max={"100"}
                        min={"1"}
                        title={"Infection Duration"}
                    ></Slider>
                    <Slider
                        valueChange={sliderChange}
                        id={"immunity"}
                        max={"100"}
                        min={"1"}
                        title={"Immunity Duration"}
                    ></Slider>
                    <Slider
                        valueChange={sliderChange}
                        id={"infectionSpreadRate"}
                        max={"399"}
                        min={"301"}
                        title={"Infection Spread Rate"}
                    ></Slider>
                    <Slider
                        valueChange={sliderChange}
                        id={"vaccinationRate"}
                        max={"50"}
                        min={"1"}
                        title={"Vaccination Rate"}
                    ></Slider>
                </div>
            </div>
        </div>
    );
}

export default App;
