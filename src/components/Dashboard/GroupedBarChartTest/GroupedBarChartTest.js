import React from 'react'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import * as d3 from 'd3'







const GroupedBarChartTest = ({data}) => {



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
    
        const carriedLossObj = {Carried: carriedArr, Lost: lostArr}
    




    // if(!carriedLossArr) return null;



    // finalArr.push(carriedArr, lossArr)

    return carriedLossObj

}    

        const data = carriedLoss()

        console.log(data)

        if(!data) return null;


        const subgroups = Object.keys(data)


        console.log(subgroups)



        const svg = d3.select(svgRef.current);

        var parseDate = d3.timeParse("%Y-%m");

        const x0Value = d => parseDate(d.date) 
        const y0Value = d => d.amount





        const x0Scale = d3
                    .scaleTime()
                    .domain(d3.extent(data.Carried.map(x0Value)))
                    .range([0, width]);


        const y0Scale = d3.scaleLinear()
                        .domain([0, d3.max(data.Carried, y0Value)])
                        .range([height, 0]);


        const xSubgroup = d3.scaleBand()
                        .domain(subgroups)
                        .range([0, 10])
                        .padding([0.05])     
        

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






            svg.append("g")
                .selectAll("g")
                .data(data)
                .enter()
                .append("g")
                    .attr("transform", function(d) { return "translate(" + xSubgroup(d.subgroup) + ",0)"})
                .selectAll(".bar")
                .data(data.Carried)
                .join("rect")
                .attr("class", "bar")
                .attr("fill", "green")

            .transition()
            .duration(400)
            .attr("x", d => x0Scale(x0Value(d)))
            .attr("y", d => y0Scale(y0Value(d)))
            .attr("width", 10)
            .attr("height", d => 600 - y0Scale(y0Value(d)))














        










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

export default GroupedBarChartTest
