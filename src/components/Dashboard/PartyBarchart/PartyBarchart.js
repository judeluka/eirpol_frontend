import * as d3 from 'd3'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { allParties } from '../../../Backend/metaData'
import { chamber, current } from '../../../Backend/rollCall'
import { Typography, Checkbox, Select, MenuItem, ListSubheader, FormControl, InputLabel, makeStyles } from '@material-ui/core'
import { ContactSupport, ContactSupportOutlined, SlowMotionVideoOutlined } from '@material-ui/icons'





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


export const PartyBarchart = ({data}) => {


    const options = [

    "Followers", "Retweets", "Original Tweets", "TDs", "Average Followers", "Followers per Retweets", "Retweets per Original Tweet"
    
    ]

    const followers = d => d.totalFollows
    const retweets = d => d.totalRetweets
    const originalTweets = d => d.totalOriginalTweets
    const TDAmount = d => d.TDAmount
    const TDFollowerAvg = d => d.followersToTDs
    const retweetsToFollowers = d => d.retweetsToFollowers
    const retweetsToOriginalTweetsFunc = d => d.retweetsToOriginalTweets

    const optionsFunctions = 
    
    [ followers, retweets, originalTweets, TDAmount, TDFollowerAvg, retweetsToFollowers, retweetsToOriginalTweetsFunc]


    const classes = useStyles();

    
    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)
    const [xOption, setXOption] = useState(1)
    const [yOption, setYOption] = useState(0)
    const [secOption, setSecOption] = useState(1)


    const margin = {top: 20, right: 20, bottom: 20, left: 60}

    const height = 600
    const width = 1020

    

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

const onChangeSec = (event, child) => {
    setSecOption(event.target.value)
    console.log('sec:' + event.target.value);
    console.log(child);
};


useEffect(() => {

    setTDData(data)

}, [])

useEffect(() => {

    if(!TDData) return null;

    setCurrentWeekIndex(TDData[0].followerData.length - 1)

}, [TDData])


    useEffect(() => {

        if(!TDData || !currentWeekIndex) return null;

        function makePartyObj() {

        let partyArr = []

        let parties = TDData.map(d => d.party)

        parties = [...new Set(parties)];



       function retweetsToFollowersFunc(i) {

        var a = TDData.map(function(d) {
            if(parties[i] === d.party) {
                return d
            }
        }).filter(function(x) {
                    return x !== undefined
                })

        var follows = a.map(d => d.followerData[currentWeekIndex].followers).reduce(function(a, b) {return a + b})
        var retweets = a.map(d => d.retweetData[currentWeekIndex].retweets).reduce(function(a, b) {return a + b})
        var ratio = follows / retweets

        if(ratio === Infinity) {
            ratio = 0
        }

        return ratio 

       }
       function retweetsToOriginalTweetsFunc(i) {

        var a = TDData.map(function(d) {
            if(parties[i] === d.party) {
                return d
            }
        }).filter(function(x) {
                    return x !== undefined
                })

        var retweets = a.map(d => d.retweetData[currentWeekIndex].retweets).reduce(function(a, b) {return a + b})
        var original_tweets = a.map(d => d.retweetData[currentWeekIndex].original_tweets).reduce(function(a, b) {return a + b})
        var ratio = retweets / original_tweets

        if(ratio === Infinity) {
            ratio = 0
        }

        ratio = ratio ? ratio : 0;

        return ratio 

       }

            for(let i = 0; i < parties.length; i++) {


        function partyObj() {
            this.party = parties[i];
            this.TDs = TDData.map(function(d) {
                if(parties[i] === d.party) {
                    return d
                }
            }).filter(function(x) {
                        return x !== undefined
                    })
            this.totalFollows = this.TDs.map(d => d.followerData[currentWeekIndex].followers).reduce(function(a, b) {return a + b})
            this.totalRetweets = this.TDs.map(d => d.retweetData[currentWeekIndex].retweets).reduce(function(a, b) {return a + b})
            this.totalOriginalTweets = this.TDs.map(d => d.retweetData[currentWeekIndex].original_tweets).reduce(function(a, b) {return a + b})
            this.TDAmount = this.TDs.length
            this.followersToTDs = (this.TDs.map(d => d.followerData[currentWeekIndex].followers).reduce(function(a, b) {return a + b}) / this.TDAmount)
            this.retweetsToFollowers = retweetsToFollowersFunc(i)
            this.retweetsToOriginalTweets = retweetsToOriginalTweetsFunc(i)
        }

        partyArr.push(new partyObj())
            }

            return partyArr

    }
    


    console.log(makePartyObj())

    const partyData = makePartyObj()

        const xValue = d => d.party
        const yValue = optionsFunctions[yOption]
        const secondaryValue = optionsFunctions[secOption]
        const party = d => d.party     
        const partyColor = d => partyColors[party(d)] 

        

        const svg = d3.select(svgRef.current);

        const xScale = d3.scaleBand()
                            .domain(partyData.map(xValue))
                            .range([0, width])
                            .padding(0.2)


        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(partyData, yValue)])
                        .range([height, 0]);

        const xAxis = d3.axisBottom(xScale).ticks(partyData.length);

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


        var rects = d3.select("#container-party-bar")
                    .selectAll(".bar")
                    .data(partyData)
                    .join("rect")
                    .attr("class", "bar")  
                    .attr("fill", partyColor)
                    .attr("x", d => xScale(xValue(d)))
                    

                rects.transition()
                    .duration(400)
                    .attr("y", d => yScale(yValue(d)))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => 600 - yScale(yValue(d)))


                    console.log(yScale(yValue(300)))



                const hoverColor = "#eec42d"


                rects
                    .on('mouseover', function (d, i) {
                        tooltip
                        .html(
                            `<div>Party: ${d.party}</div><div>${options[yOption]}: ${yValue(d).toLocaleString()}</div><div>${options[secOption]}: ${secondaryValue(d).toLocaleString()}</div></div>`
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
    }, [TDData, xOption, yOption, secOption, currentWeekIndex])






    return (
    <div className={"featuredItem"} style={{textAlign: "center"}}>
            <Typography variant="h5">Party Bar Chart</Typography>
            <p style={{marginTop: "10px"}}>As of 25/08/21.</p>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Original Tweets</MenuItem>
          <MenuItem value={3}>TDs on Twitter</MenuItem>
          <MenuItem value={4}>Avg Followers</MenuItem>  
          <MenuItem value={5}>Followers per Retweet </MenuItem>       
          <MenuItem value={6}>Retweets per Original Tweet</MenuItem>     
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
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Tooltip Value</InputLabel>
        <Select onChange={onChangeSec} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Original Tweets</MenuItem>
          <MenuItem value={3}>TDs on Twitter</MenuItem>
          <MenuItem value={4}>Avg Followers</MenuItem>  
          <MenuItem value={5}>Followers per Retweet </MenuItem>       
          <MenuItem value={6}>Retweets per Original Tweet</MenuItem>     
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
            <g id="container-party-bar" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </g>
            </svg>
        </div>
    </div>
    )
}
