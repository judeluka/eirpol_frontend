import React from 'react'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import * as d3 from 'd3'







const GroupedBarChart = ({data}) => {



    const [oirLossData, setOirLossData] = useState(null)
    const [oirCarriedData, setOirCarriedData] = useState(null)

    const svgRef= useRef()

    const margin = {top: 20, right: 20, bottom: 20, left: 60}

    const height = 600
    const width = 900


    useEffect(() => {

        
        axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Lost').then((response) => {
            setOirLossData(response.data)

            });
            axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Carried').then((response) => {
                setOirCarriedData(response.data)
                });

    }, [])  





    useEffect(() => {


        if(!oirLossData || !oirCarriedData) return null;

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
    
        const carriedLossArr = [{name: "Carried", values: carriedArr, color: "green"}, {name: "Lost", values: lostArr, color: "red"}]
    




    // if(!carriedLossArr) return null;



    // finalArr.push(carriedArr, lossArr)

    return carriedLossArr

}    


    
        const data = carriedLoss();

        console.log(carriedLoss())

        if(!data) return null;

    var parseDate = d3.timeParse("%Y-%m");



    let dateData = data[0].values.map(d => parseDate(d.date))

    let testtt = data[0].values.map(d => d.amount)


    console.log(testtt)

// data.forEach(function(d) {
//     data.forEach(function(d) {
//         d.date = parseDate(d.date)
//         d.carried = d.carried;
//         d.lost = d.lost
//     })
// }
// )



        const x0Value = d => d.date
        const x1Value = d => 2
        const y0Value = d => d.amount

        console.log(y0Value(data[0].values.map(d => d.amount)))
        
    


        const svg = d3.select(svgRef.current);

        var x0Scale = d3
                    .scaleTime()
                    .domain(d3.extent(data[0].values.map(x0Value)))
                    .range([0, width]);


        const y0Scale = d3.scaleLinear()
                        .domain([0, d3.max(data[0].values, y0Value)])
                        .range([height, 0]);


        


                        console.log(d3.max(data[1].values, y0Value))
        

        const xAxis = d3.axisBottom(x0Scale).ticks(8)

        svg
            .select(".x-axis")
            .attr("transform", "translate(0," + 600 + ")")
            .transition(2000)
            .call(xAxis);

        const yAxis = d3.axisLeft(y0Scale);

    svg
        .select(".y-axis")
        .attr("transform", "translate(0,0)")
        .style("color", "white")
        .transition(500)
        .call(yAxis)



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

        svg.append("g")
            .selectAll("g")
            .data(dateData)
            .join("g")
            .selectAll(rects)


        var rects = d3.select("#container-groupbar")
                    .selectAll(".bar")
                    .data(data[0].values)
                    .join("rect")
                    .attr("class", "bar")
                    .attr("fill", "green")






                rects.transition()
                    .duration(400)
                    .attr("x", d => x0Scale(x0Value(d)))
                    .attr("y", d => y0Scale(y0Value(d)))
                    .attr("width", 10)
                    .attr("height", d => 600 - y0Scale(y0Value(d)))

                    console.log(x0Scale())

                    console.log(y0Value(data[0].values[2]))


                    const hoverColor = "#eec42d"


                    rects
                        .on('mouseover', function (d, i) {
                            tooltip
                            .html(
                                `<div>${x0Value(d).toLocaleString('default', {month: 'long', year: 'numeric'} )}</div><div> Votes Carried: ${y0Value(d).toLocaleString()}</div>`
                            )
                                .style('visibility', 'visible');
                                d3.select(this).transition().attr('fill', hoverColor);
                            })
                            .on('mousemove', function () {
                                tooltip
                                .style('top', d3.event.pageY - 10 + 'px')
                                .style('left', d3.event.pageX + 10 + 'px');
                            })
                            .on('mouseout', function () {
                                tooltip.html(``).style('visibility', 'hidden');
                                d3.select(this).transition().attr('fill', "green");
                            });









        console.log(data)




    }, [oirCarriedData, oirLossData])







    return (
        <div className="featuredItem" style={{textAlign: "center"}}>
        <svg ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>
            <g id="container-groupbar" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </g>
            </svg>
        </div>
    )
}

export default GroupedBarChart
