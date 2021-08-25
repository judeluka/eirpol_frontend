import * as d3 from 'd3'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Typography, Checkbox, Select, MenuItem, ListSubheader, FormControl, InputLabel, makeStyles } from '@material-ui/core'





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


export const BarChart = ({data}) => {


    const options = [

    "Followers", "Retweets", "Original Tweets", "Followers per Retweet", "Retweets Per Original Tweet", "Polarity", "Subjectivity"

    ]

    const followers = d => d.followerData[2].followers
    const retweets = d => d.retweetData[2].retweets
    const originalTweets = d => d.retweetData[2].original_tweets
    const followersPerRetweet = (d) => {

        var f = d.followerData[2].followers 
        var r = d.retweetData[2].retweets

        var test = f / r

        if(test === Infinity) {
            test = 0
        }
    return test

    }
    const retweetsPerOriginalTweet = (d) => {

        var r = d.retweetData[2].retweets 
        var o = d.retweetData[2].original_tweets

        var test = r / o

        if(test === Infinity ) {

            test = 0
        
    }

    test = test ? test : 0;


    return test
}
    const polarity = d => d.sentimentData[2].polarity
    const subjectivity = d => d.sentimentData[2].subjectivity


    const optionsFunctions =

    [followers, retweets, originalTweets, followersPerRetweet, retweetsPerOriginalTweet, polarity, subjectivity]


    const classes = useStyles();


    const [TDData, setTDData] = useState(null)
    const [xOption, setXOption] = useState(1)
    const [yOption, setYOption] = useState(0)



    const margin = {top: 20, right: 20, bottom: 20, left: 60}

    const height = 600
    const width = 900



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

// const onChangeR = (event, child) => {
//     setROption(event.target.value)
//     console.log('r:' + event.target.value);
//     console.log(child);
// };


useEffect(() => {

    setTDData(data)

}, [])

    useEffect(() => {

        if(!TDData) return null;

        const TDDataHolderBar = TDData;

        TDDataHolderBar.sort(function(a, b) {
         return   d3.ascending(a.party, b.party)
        })

        console.log(TDDataHolderBar)

        const xValue = d => d.name
        const yValue = optionsFunctions[yOption]
        const party = d => d.party
        const partyColor = d => partyColors[party(d)]


        const svg = d3.select(svgRef.current);


        const xScale = d3.scaleBand()
                            .domain(TDDataHolderBar.map(xValue))
                            .range([0, width])
                            .padding(0.2)


        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(TDDataHolderBar, yValue)])
                        .range([height, 0]);



                        console.log(yValue)

        const xAxis = d3.axisBottom(xScale)

        svg
            .select(".x-axis")
            .attr("transform", "translate(0," + 600 + ")")
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


        var rects = d3.select("#container-bar")
                    .selectAll(".bar")
                    .data(TDDataHolderBar)
                    .join("rect")
                    .attr("class", "bar")
                    .attr("fill", partyColor)



                rects.transition()
                    .duration(400)
                    .attr("x", d => xScale(xValue(d)))
                    .attr("y", d => yScale(yValue(d)))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => 600 - yScale(yValue(d)))



                const hoverColor = "#eec42d"


                rects
                    .on('mouseover', function (d, i) {
                        tooltip
                        .html(
                            `<div>Name: ${d.name}</div><div>Party: ${d.party}</div><div>${options[yOption]}: ${yValue(d).toLocaleString()}</div></div>`
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
                            d3.select(this).transition().attr('fill', partyColor);
                        });

                        svg.select('.x-axis').selectAll("text").remove();


        console.log(yScale(yValue(TDData[2])))
    }, [TDData, yOption])






    return (
    <div className={"featuredItem"} style={{textAlign: "center", padding: "0px", margin: "0px"}}>
            {/* <Typography variant="h5">Most Followed TDs</Typography> */}
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Original Tweets</MenuItem>          
          <MenuItem value={3}>Followers Per Retweet</MenuItem>
          <MenuItem value={4}>Retweets Per Original Tweet</MenuItem>
          <MenuItem value={5}>Polarity</MenuItem>
          <MenuItem value={6}>Subjectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>          
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
            <g id="container-bar" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </g>
            </svg>
        </div>
    </div>
    )
}
