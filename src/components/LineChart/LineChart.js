import React, { useState } from 'react'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import axios from 'axios'



    




const LineChart = (data) => {

    const [oirLossData, setOirLossData] = useState(null)
    const [oirCarriedData, setOirCarriedData] = useState(null)

    const svgRef= useRef()




    useEffect(() => {

        
        axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Lost').then((response) => {
            setOirLossData(response.data)

            });
            axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Carried').then((response) => {
                setOirCarriedData(response.data)
                });


                

    
    }, [])    


    var data1 = [
        {
          name: "USA",
          values: [
            { date: "2000", price: "100" },
            { date: "2001", price: "110" },
            { date: "2002", price: "145" },
            { date: "2003", price: "241" },
            { date: "2004", price: "101" },
            { date: "2005", price: "90" },
            { date: "2006", price: "10" },
            { date: "2007", price: "35" },
            { date: "2008", price: "21" },
            { date: "2009", price: "201" }
          ]
        },
        {
          name: "Canada",
          values: [
            { date: "2000", price: "200" },
            { date: "2001", price: "120" },
            { date: "2002", price: "33" },
            { date: "2003", price: "21" },
            { date: "2004", price: "51" },
            { date: "2005", price: "190" },
            { date: "2006", price: "120" },
            { date: "2007", price: "85" },
            { date: "2008", price: "221" },
            { date: "2009", price: "101" }
          ]
        },
        {
          name: "Mexico",
          values: [
            { date: "2000", price: "50" },
            { date: "2001", price: "10" },
            { date: "2002", price: "5" },
            { date: "2003", price: "71" },
            { date: "2004", price: "20" },
            { date: "2005", price: "9" },
            { date: "2006", price: "220" },
            { date: "2007", price: "235" },
            { date: "2008", price: "61" },
            { date: "2009", price: "10" }
          ]
        }
      ];


    var width = 500;
    var height = 500;
    var margin = 50;

useEffect(() => {

if(!oirLossData || !oirCarriedData) return null;


//     function carriedLoss() {

//     const oirLossDataDates = oirLossData.results.map(d => d.contextDate)
//     const oirCarriedDataDates = oirCarriedData.results.map(d => d.contextDate)
//     const arrLossMonths = [];
//     const arrCarriedMonths = [];

//     for(let i = 0; i < oirLossDataDates.length; i++) {
//         var a = oirLossDataDates[i].slice(0, -3)
//         arrLossMonths.push(a)
//     }

//     for(let i = 0; i < oirCarriedDataDates.length; i++) {
//         var a = oirCarriedDataDates[i].slice(0, -3)
//         arrCarriedMonths.push(a)
//     }

//     const uniqLossMonths = [...new Set(arrLossMonths)];
//     const uniqCarriedMonths = [...new Set(arrCarriedMonths)];


//     const countsLoss = {};
//     const countsCarried = {};

//     arrLossMonths.forEach(function (x) { countsLoss[x] = (countsLoss[x] || 0) + 1; });

//     arrCarriedMonths.forEach(function (x) { countsCarried[x] = (countsCarried[x] || 0) + 1; });

//     let lossArr = [];
//     let carriedArr = [];

// for(let i = 0; i < uniqLossMonths.length; i++) {


//     function dateLossObj() {
//         this.date = uniqLossMonths[i]
//         this.amount = countsLoss[uniqLossMonths[i]]
//     }

//     lossArr.push(new dateLossObj())

// }

// for(let i = 0; i < uniqCarriedMonths.length; i++) {


//     function dateCarriedObj() {
//         this.date = uniqCarriedMonths[i]
//         this.amount = countsCarried[uniqCarriedMonths[i]]
//     }

//     carriedArr.push(new dateCarriedObj())

// }

//     const carriedLossArr = [{name: "Carried", values: carriedArr, color: "green"}, {name: "Lost", values: lossArr, color: "red"}]


//     return carriedLossArr


//     }

function carriedLoss() {


    function dateRange(startDate, endDate) {
        var start      = startDate.split('-');
        var end        = endDate.split('-');
        var startYear  = parseInt(start[0]);
        var endYear    = parseInt(end[0]);
        var dates      = [];
      
        for(var i = startYear; i <= endYear; i++) {
          var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
          var startMon = i === startYear ? parseInt(start[1])-1 : 0;
          for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
            var month = j+1;
            var displayMonth = month < 10 ? '0'+month : month;
            dates.push([i, displayMonth, '01'].join('-'));
          }
        }
        return dates;
      }


    const dR = dateRange("2020-01-01", "2021-09-19")
    const dRArr = []
    
    for(let i = 0; i < dR.length; i++) {
        var a = dR[i].slice(0, -3)
        dRArr.push(a)
    }

    console.log(dRArr)


const oirLossDataDates = oirLossData.results.map(d => d.contextDate)
const oirCarriedDataDates = oirCarriedData.results.map(d => d.contextDate)
const arrLossMonths = [];
const arrCarriedMonths = [];

for(let i = 0; i < oirLossDataDates.length; i++) {
    var a = oirLossDataDates[i].slice(0, -3)
    arrLossMonths.push(a)
}

for(let i = 0; i < oirCarriedDataDates.length; i++) {
    var a = oirCarriedDataDates[i].slice(0, -3)
    arrCarriedMonths.push(a)
}

const uniqLossMonths = [...new Set(arrLossMonths)];
const uniqCarriedMonths = [...new Set(arrCarriedMonths)];


const countsLoss = {};
const countsCarried = {};

arrLossMonths.forEach(function (x) { countsLoss[x] = (countsLoss[x] || 0) + 1; });

arrCarriedMonths.forEach(function (x) { countsCarried[x] = (countsCarried[x] || 0) + 1; });

let lossArr = [];

const finalArr = []
const carriedArr = []
const lostArr = []

const finalFinalArr = [];

for(let i = 0; i < dRArr.length; i++) {

function amountCarried () {
        if(uniqCarriedMonths.includes(dRArr[i])) {
            return countsCarried[dRArr[i]]
        } else {
            return 0
        }
       } 

function amountLoss () {
        if(uniqLossMonths.includes(dRArr[i])) {
            return countsLoss[dRArr[i]]
        } else {
            return 0
        }
        } 
function carriedObj() {
    this.date = dRArr[i]
    this.amount = amountCarried()
}

function lossObj() {
this.date = dRArr[i]
this.amount = amountLoss()
}

carriedArr.push(new carriedObj())
lostArr.push(new lossObj())

}

// for(let i = 0; i < uniqLossMonths.length; i++) {


//     function dateLossObj() {
//         this.date = uniqLossMonths[i]
//         this.amount = countsLoss[uniqLossMonths[i]]
//     }

//     lossArr.push(new dateLossObj())

// }

// for(let i = 0; i < uniqCarriedMonths.length; i++) {


//     function dateCarriedObj() {
//         this.date = uniqCarriedMonths[i]
//         this.amount = countsCarried[uniqCarriedMonths[i]]
//     }

//     carriedArr.push(new dateCarriedObj())

// }

const carriedLossObj = [{name: "Carried", values: carriedArr, color: "green"}, {name: "Lost", values: lostArr, color: "red"}]





// if(!carriedLossArr) return null;



// finalArr.push(carriedArr, lossArr)

return carriedLossObj

}  


    const data = carriedLoss();

    if(!data) return null;







console.log(carriedLoss())





var parseDate = d3.timeParse("%Y-%m");

    data.forEach(function(d) {
      d.values.forEach(function(d) {
        d.date = parseDate(d.date)
        d.amount = d.amount;
      });
    })

    const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'd3-tooltip')
    .style('position', 'absolute')
    .style('z-index', '10')
    .style('visibility', 'hidden')
    .style('padding', '10px')
    .style('background', 'rgba(0,0,0,0.6)')
    .style('border-radius', '4px')
    .style('color', '#fff')
    .text('a simple tooltip');

    var duration = 250;

    var lineOpacity = "1";
    var lineOpacityHover = "1";
    var otherLinesOpacityHover = "1";
    var lineStroke = "3.5px";
    var lineStrokeHover = "3.5px";

    var circleOpacity = "0.85";
    var circleOpacityOnLineHover = "0.8";
    var circleRadius = 5;
    var circleRadiusHover = 6;



    var xScale = d3
    .scaleTime()
    .domain(d3.extent(data[0].values, d => d.date))
    .range([0, width - margin]);

var yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data[0].values, d => d.amount)])
        .range([height - margin, 0]);

        const svg = d3
            .select(svgRef.current)
            .attr("width", width + margin + "px")
            .attr("height", height + margin + "px")
            .append("g")
            .attr("transform", `translate(${margin}, ${margin})`);

    var line = d3
        .line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.amount));

    let lines = svg.append("g").attr("class", "lines").attr("fill", "#191c24");

            lines
            .selectAll(".line-group")
            .data(data)
            
            .enter()
            .append("g")
            .attr("class", "line-group")
            // .on("mouseover", function(d, i) {
            // svg
            //     .append("text")
            //     .attr("class", "title-text")
            //     .style("fill", d.color)
            //     .text(d.name)
            //     .attr("text-anchor", "middle")
            //     .attr("x", (width - margin) / 2)
            //     .attr("y", 30);
            //     })
            //     .on("mouseout", function(d) {
            //     svg.select(".title-text").remove();
            //     })
                .append("path")
                .attr("class", "line")
                .attr("d", d => line(d.values))
                .style("stroke", (d, i) => d.color)
                .style("opacity", lineOpacity)
                .on("mouseover", function(d) {
                d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
                d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
                d3.select(this)
                    .style("opacity", lineOpacityHover)
                    .style("stroke-width", 3)
                    .style("cursor", "pointer");
                })
                .on("mouseout", function(d) {
                d3.selectAll(".line").style("opacity", lineOpacity);
                d3.selectAll(".circle").style("opacity", circleOpacity);
                d3.select(this)
                    .style("stroke-width", 1)
                    .style("cursor", "none");
                });

            /* Add circles in the line */
            lines
                    .selectAll("circle-group")
                    .data(data)
                    .enter()
                    .append("g")
                    .style("fill", (d, i) => d.color)
                    .selectAll("circle")
                    .data(d => d.values)
                    .enter()
                    .append("g")
                    .attr("class", "circle")
                    .on("mouseover", function(d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .append("text")
                        .attr("class", "text")
                        .style("fill", "white")
                        .text(`${d.amount}`)
                        .attr("x", d => xScale(d.date) + 5)
                        .attr("y", d => yScale(d.amount) - 10);
                    })
                    .on("mouseout", function(d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .transition()
                        .duration(duration)
                        .selectAll(".text")
                        .remove();
                    })
                    .append("circle")
                    .attr("cx", d => xScale(d.date))
                    .attr("cy", d => yScale(d.amount))
                    .attr("r", circleRadius)
                    .style("opacity", circleOpacity)
                    .on("mouseover", function(d) {
                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr("r", circleRadiusHover);
                    })
                    .on("mouseout", function(d) {
                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr("r", circleRadius);
                    });

var xAxis = d3.axisBottom(xScale).ticks(8);
var yAxis = d3.axisLeft(yScale).ticks(5);

svg
  .append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height - margin})`)
  .call(xAxis);

svg
  .append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")

  svg.append("circle").attr("cx", 350).attr("cy",30).attr("r", 6).style("fill", "green")
  svg.append("circle").attr("cx",350).attr("cy",60).attr("r", 6).style("fill", "red")
  svg.append("text").attr("x", 370).attr("y", 30).text("Divisions Carried").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white")
  svg.append("text").attr("x", 370).attr("y", 60).text("Divisions Lost").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white")

console.log(data)

}, [data, oirCarriedData, oirLossData])


    return (
        <div className="featuredItem">
            <div id="chart" className={"scroll-svg-container"} style={{textAlign: "center"}}>
                <svg ref={svgRef}>

                </svg>
            </div>
        </div>
    )
}

export default LineChart
