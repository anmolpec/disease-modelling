import { useState } from "react";
import { Line } from "react-chartjs-2";

import "./Graph.css";

import LineGraphElement from "./LineGraphElement.js";

const len = 50;

const INITIAL_ARR = Array(len).fill({
    susceptible: 0,
    infected: 0,
    recovered: 0,
    vaccinated: 0,
});

const LineGraph = (props) => {
    const [graphData, setGraphData] = useState(INITIAL_ARR);
    const [currentStep, setStep] = useState(0);

    if (currentStep < props.step) {
        setGraphData((prevState) => {
            if (props.step <= len) {
                prevState[props.step] = props.data;
            } else prevState = [...prevState, props.data];

            if (props.step > 250) {
                prevState.shift();
            }

            return prevState;
        });
        setStep((prevState) => prevState + 1);
    }

    const data = {
        labels: Array(graphData.length).fill(""),
        datasets: [
            {
                label: "Susceptible",
                data: graphData.map((element) => element.susceptible * 100),
                borderColor: "green",
                fill: true,
            },
            {
                label: "Infected",
                data: graphData.map((element) => element.infected * 100),
                borderColor: "red",
            },
            {
                label: "Immune",
                data: graphData.map((element) => element.recovered * 100),
                borderColor: "blue",
            },
            {
                label: "Vaccinated",
                data: graphData.map((element) => element.vaccinated * 100),
                borderColor: "purple",
            },
        ],
    };

    const options = {
        title: {
            display: true,
            text: "Chart Title",
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                    },
                },
            ],
        },
        animation: false,
    };

    return (
        <div className="line-graph-container">
            {/* {graphData.map((element, index) => {
                return (
                    <LineGraphElement
                        position={{ x: index, y: element.infected * 100 }}
                        color="red"
                    />
                );
            })}
            {graphData.map((element, index) => {
                return (
                    <LineGraphElement
                        position={{ x: index, y: element.susceptible * 100 }}
                        color="green"
                    />
                );
            })}
            {graphData.map((element, index) => {
                return (
                    <LineGraphElement
                        position={{ x: index, y: element.recovered * 100 }}
                        color="blue"
                    />
                );
            })}
            {graphData.map((element, index) => {
                return (
                    <LineGraphElement
                        position={{ x: index, y: element.vaccinated * 100 }}
                        color="purple"
                    />
                );
            })} */}

            <Line data={data} options={options}></Line>
        </div>
    );
};

export default LineGraph;
