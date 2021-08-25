import React from 'react'
import { Pie } from "react-chartjs-2"
import regionalData from "./data.json";
import './simplepiechart.css'

const SimplePieChart = () => {

    let labels = regionalData.map((el) => el["Region Arms Sales Dashboard"]);
// console.log(labels);
let numbers = regionalData.map((el) =>
  el.Notifications.match(/[0-9]/g).join("")
);


    const data = {
        labels,
        datasets: [
          {
            label: "Arm Sales",
            data: numbers,
            backgroundColor: ["#66BB66", "#6699FF", "#326760", "#CC0000", "#99CC33", "white", "grey", "#660000", "#752F8B"],
            hoverBackgroundColor: [
              "#b9006e",
              "#005792",
              "#C1292E",
              "#2b9464",
              "#42218E"
            ]
          }
        ]
    }

    const options = {

        
        title: {
            display: true,
            text: "Twitter Follower Share",
            fontSize: 15,
            fontColor: "white"
          },
          // responsive: true,
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontSize: 12, //labels font size
              fontColor: "white"
            }
          },
          plugins: {
            datalabels: {
              font: {
                size: 300,
              }
            }
          },
          tooltips: {
            bodyFontSize: 12,
            callbacks: {
              label: function (tooltipItem, data) {
                // console.log({ tooltipItem, data });
                const label = data.labels[tooltipItem.index]; //index gives the the index of this data item in the dataset
                // console.log(data.labels[2])
                const value = formatNumber(
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ] //finding the matching data item in dataset
                );

                return `${label}: $${value}`;
              }
            }
          }

    }

    const formatNumber = (num) => {
        return num.toString("").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };


    return (
       


            <div className="featuredItem">


                <Pie data={data} options={options}/>

                

            </div>
            

    )
}

export default SimplePieChart
