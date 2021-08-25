import * as d3 from 'd3'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { allParties } from '../../../Backend/metaData'
import { chamber, current } from '../../../Backend/rollCall'
import { Typography, Checkbox, Select, MenuItem, ListSubheader, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import { ContactSupport } from '@material-ui/icons'
import axios from 'axios'
import { scaleBand } from 'd3'





const useStyles = makeStyles((theme) => ({
    icon: {
      color: "white"
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,   
  }

}));

const partyColors = {
    "Sinn Féin": "#326760", 
    "Fine Gael": "#6699FF", 
    "Fianna Fáil": "#66BB66",
    "Labour Party": "#CC0000",
    "Solidarity - People Before Profit": "#8E2420",
    "Independent": "white",
    "Green Party": "#99CC33",
    "Social Democrats": "#752F8B",
    "Aontú": "#44532A",
    "Independents 4 Change": "grey"}


export const VoteBarchart = ({data}) => {





    const options = [

    "Followers", "Retweets", "Original Tweets", "TDs", "Average Followers", "Retweets per Original Tweet", "Followers per Retweets" 
    
    ]

    const followers = d => d.tyoe.results.length
    const retweets = d => d.totalRetweets
    const originalTweets = d => d.totalOriginalTweets
    const TDAmount = d => d.TDAmount
    const TDFollowerAvg = d => d.followersToTDs

    const optionsFunctions = 
    
    [followers, retweets, originalTweets, TDAmount, TDFollowerAvg]


    const classes = useStyles();

    
    const [TDData, setTDData] = useState(null)
    const [oirLossData, setOirLossData] = useState(null)
    const [oirCarriedData, setOirCarriedData] = useState(null)
    const [xOption, setXOption] = useState(1)
    const [yOption, setYOption] = useState(0)
    const [rOption, setROption] = useState(0)


    const margin = {top: 20, right: 20, bottom: 20, left: 60}

    const height = 400
    const width = 420

    

    const svgRef= useRef()


const onChangeX = (event, child) => {
        setXOption(event.target.value)
        console.log('x:' + event.target.value);
        console.log(child);
};

const onChangeY = (event, child) => {
        setYOption(event.target.value)
        console.log('y:' + event.target.value);
        console.log(child);
};

const onChangeR = (event, child) => {
    setROption(event.target.value)
    console.log('r:' + event.target.value);
    console.log(child);
};


useEffect(() => {

    setTDData(data)
    axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Lost').then((response) => {

        setOirLossData(response.data)
        
      });

}, [])    

useEffect(() => {
        
        
        axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Carried').then((response) => {

        setOirCarriedData(response.data)
        
      });

      console.log(oirLossData)
      
    }, []);

    useEffect(() => {

        if(!TDData || !oirLossData || !oirCarriedData) return null;


        // function makePartyObj() {

        // let partyArr = []

        // let parties = TDData.map(d => d.party)

        // parties = [...new Set(parties)];

        //     for(let i = 0; i < parties.length; i++) {


    //     function partyObj() {
    //         this.party = parties[i];
    //         this.TDs = TDData.map(function(d) {
    //             if(parties[i] === d.party) {
    //                 return d
    //             }
    //         }).filter(function(x) {
    //                     return x !== undefined
    //                 })
    //         this.totalFollows = this.TDs.map(d => d.followerData[0].followers).reduce(function(a, b) {return a + b})
    //         this.totalRetweets = this.TDs.map(d => d.retweetData[0].retweets).reduce(function(a, b) {return a + b})
    //         this.totalOriginalTweets = this.TDs.map(d => d.retweetData[0].original_tweets).reduce(function(a, b) {return a + b})
    //         this.TDAmount = this.TDs.length
    //         this.retweetsToOriginal = this.totalRetweets / this.totalOriginalTweets
    //         this.followersToTDs = (this.totalFollows / this.TDAmount)
    //     }

    //     partyArr.push(new partyObj())
    //         }

    //         return partyArr

    // }


    function carriedLost () {

        const arr = [{color: "green", name: "Carried", amount: oirCarriedData.results.length, dates: oirCarriedData.results}, {color: "red", name:"Lost", amount: oirLossData.results.length, dates: oirLossData.results.contextDate}]

        return arr

    }

    const carriedLostData = carriedLost()

    

    if(!carriedLostData) return null;


function dateMap() {


    var amount = 0;
    const dates = carriedLost()[0].dates.map(d => d.contextDate)
    var copiedDates = dates

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "December"]
    const years = ["2020", "2021", "2022", "2023"]
    
    var arrM = []
    var arrY = [];

    
    
    for(let i = 0; i < dates.length; i++) {

        var splitStr = copiedDates[i].split('-')
        var m = true;
        var y = true; 

        if(splitStr[0] === '2021') {
                arrY.push(y)
            }
            
            if(splitStr[1] ===  '02') {
                arrM.push(m)
            }
        }
        return arrY
    }

console.log(dateMap())

// const monthCountArr = new Array(12).fill(0); 
//     dates.forEach((date) => monthCountArr[new Date(date).getMonth()] += 1)

// console.log(monthCountArr)

// var getDaysArray = function(start, end) {
//     for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
//         arr.push(new Date(dt));
//     }
//     return arr;
// };

// var daylist = getDaysArray(new Date("2018-05-01"),new Date("2018-06-01"));
// daylist.map((v)=>v.toISOString().slice(0,10)).join("")











        const xValue = d => d.name
        const yValue = d => d.amount
        const color = d => d.color


        const svg = d3.select(svgRef.current);

        const xScale = d3.scaleBand()
                            .domain(carriedLostData.map(xValue))
                            .range([0, width])
                            .padding(0.6)

        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(carriedLostData, yValue)])
                        .range([height, 0]);

        const xAxis = d3.axisBottom(xScale).ticks(carriedLostData.length);

        svg
            .select(".x-axis")
            .attr("transform", "translate(0," + 400 + ")")
            .transition(2000)
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale);

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


        var rects = d3.select("#container-votes-bar")
                    .selectAll(".bar")
                    .data(carriedLostData)
                    .join("rect")
                    .attr("class", "bar")  
                    .attr("fill", color)



                rects.transition()
                    .duration(400)
                    .attr("x", d => xScale(xValue(d)))
                    .attr("y", d => yScale(yValue(d)))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => 400 - yScale(yValue(d)))



                const hoverColor = "#eec42d"


                rects
                    .on('mouseover', function (d, i) {
                        tooltip
                        .html(
                            `<div>${d.name}: ${yValue(d).toLocaleString()}</div>`
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
                            d3.select(this).transition().attr('fill', color);
                        }); 


        console.log((yValue(oirCarriedData)))



    }, [TDData, oirLossData, oirCarriedData, xOption, yOption])






    return (
    <div className={"featuredItem"} style={{textAlign: "center"}}>
            <Typography variant="h5">Votes</Typography>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Original Tweets</MenuItem>
          <MenuItem value={3}>TDs on Twitter</MenuItem>
          <MenuItem value={4}>Avg Followers</MenuItem>          
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>Motions Tabled</MenuItem>
          <MenuItem disabled>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>Votes recieved in last election</MenuItem>
          <MenuItem disabled>Avg. Poll</MenuItem>
        </Select>
      </FormControl>
        <div className={"scroll-svg-container"}>
            <svg ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>
            <g id="container-votes-bar" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </g>
            </svg>
        </div>
    </div>
    )
}
