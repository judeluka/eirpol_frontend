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

    "Followers", "Retweets", "Original Tweets", "Follower Engagement Rate", "Retweets Per Original Tweet", "Polarity", "Subjectivity", "Written Questions", "Oral Questions"

    ]

    const followers = d => {

        if(d.followerData.length === 0) {
          return 0
        } else {
          return d.followerData[currentWeekIndex].followers
        }
  
      }
      const retweets = d => {

        if(d.retweetData.length === 0) {
          return 0
        } else {
          return d.retweetData[currentWeekIndex].retweets
        }
  
      }

    const originalTweets = d => {

      if(d.retweetData.length === 0) {
        return 0
      } else {
        return d.retweetData[currentWeekIndex].original_tweets
      }

    }

    const followerEngagementRate = (d) => {

      if(d.followerData.length === 0) {
        return 0
      } else {

      


      var f = d.followerData[currentWeekIndex].followers
      var r = d.retweetData[currentWeekIndex].retweets 
 
      var test = ((r / f))

      if(test === Infinity ) {

          test = 0
      
  }

  test = test ? test : 0;

  return test
}
    }
const retweetsPerOriginalTweet = (d) => {


      if(d.followerData.length === 0) {
        return 0
      } else {

      

      var r = d.retweetData[currentWeekIndex].retweets 
      var o = d.retweetData[currentWeekIndex].original_tweets

      var test = r / o

      if(test === Infinity ) {

          test = 0
      
  }

  test = test ? test : 0;


  return test
}
}
const polarity = d => {

    if(d.sentimentData == undefined || d.sentimentData.length == 0) {
      return 0
    } else {
      return d.sentimentData[currentWeekIndex].polarity
    }

  }

    const subjectivity = d => {

      if(d.sentimentData == undefined || d.sentimentData.length == 0) {
        return 0
      } else {
        return d.sentimentData[currentWeekIndex].subjectivity
      }



    }

    const writtenQuestions = (d) => {


        var holder = d.writtenQuestions[0].writtenQuestions.to
        if(!holder) return 0;
        const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

        var sum = sumValues(holder)

        return sum
        
    }
    const oralQuestions = (d) => {


        var holder = d.oralQuestions[0].oralQuestions.to
        if(!holder) return 0;
        const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

        var sum = sumValues(holder)

        return sum


    }





    const optionsFunctions =

    [followers, retweets, originalTweets, followerEngagementRate, retweetsPerOriginalTweet, polarity, subjectivity, writtenQuestions, oralQuestions]


    const classes = useStyles();


    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)
    const [highlightOption, setHighlightOption] = useState(0)
    const [baseColorOption, setBaseColorOption] = useState(0)
    const [yOption, setYOption] = useState(0)



    const margin = {top: 20, right: 20, bottom: 20, left: 60}

    const height = 600
    const width = 900



    const svgRef= useRef()


const onChangeHighlight = (event, child) => {
        setHighlightOption(event.target.value)
        console.log('Highlight:' + event.target.value);
        console.log(child);
};

const onChangeBaseColor = (event, child) => {
  setBaseColorOption(event.target.value)
  console.log('Base color:' + event.target.value);
  console.log(child);
};

const onChangeY = (event, child) => {
        setYOption(event.target.value)
        console.log('y:' + event.target.value);
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

        const TDDataHolderBar = TDData;

        TDDataHolderBar.sort(function(a, b) {
         return   d3.ascending(a.party, b.party)
        })

        console.log(TDDataHolderBar)

        const xValue = d => d.name
        const yValue = optionsFunctions[yOption]
        const party = d => d.party
        const color = (d) => {


        const officeArr = []
        let cabinetColor = "#FFC000"

          if(baseColorOption === 1 && highlightOption != 0) {
            cabinetColor = "red"
          }



        let trueArr = [];

        if(highlightOption === 1) {

        if(d.member_offices[0].length != 0) {

          for(let i = 0; i < d.member_offices[0].length; i++) {
  
          var office = d.member_offices[0][i].office.officeName.showAs
  
          if(!d.member_offices[0][i].office.dateRange.end) {
              officeArr.push(office)
          } 
      }
    }

        for(let i = 0; i < officeArr.length; i++) {

            if(officeArr[i].search("Minister for") != -1 || officeArr[i].search("Taoiseach") != -1) { 
              trueArr.push(true)   
            } 
          }
          if(trueArr.includes(true)) {
              return cabinetColor
          } else if(baseColorOption === 0) {
              return partyColors[party(d)]
          } else if (baseColorOption === 1) {
            return "white"
          }
} 

if(highlightOption == 2) {

    if(d.member_offices[0].length != 0) {

      for(let i = 0; i < d.member_offices[0].length; i++) {

      var office = d.member_offices[0][i].office.officeName.showAs

      if(!d.member_offices[0][i].office.dateRange.end) {
          officeArr.push(office)
      } 
  }
}

    for(let i = 0; i < officeArr.length; i++) {

        if(officeArr[i].search("Minister of") != -1) { 
          trueArr.push(true)   
        } 
      }

      console.log(trueArr)
      if(trueArr.includes(true)) {
          return cabinetColor
      } else if(baseColorOption === 0) {
          return partyColors[party(d)]
      } else if(baseColorOption === 1) {
        return "white"
      }
} 

if(highlightOption == 3) {

    if(d.member_offices[0].length != 0) {

      for(let i = 0; i < d.member_offices[0].length; i++) {

      var office = d.member_offices[0][i].office.officeName.showAs

      if(!d.member_offices[0][i].office.dateRange.end) {
          officeArr.push(office)
      } 
  }
}

    for(let i = 0; i < officeArr.length; i++) {

        if(officeArr[i].search("Minister of") != -1 || officeArr[i].search("Minister for") != -1 || officeArr[i].search("Taoiseach") != -1) { 
          trueArr.push(true)   
        } 
      }

      console.log(trueArr)
      if(trueArr.includes(true)) {
          return cabinetColor
      } else if(baseColorOption === 0) {
          return partyColors[party(d)]
      } else if(baseColorOption === 1) {
        return "white"
      }
} 
           
           return partyColors[party(d)]


        } 















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
            .select(".x-axis-bar")
            .attr("transform", "translate(0," + 600 + ")")
            .transition(2000)
            .call(xAxis);

        const yAxis = d3.axisLeft(yScale);

    svg
        .select(".y-axis-bar")
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
                    



                rects.transition()
                    .duration(400)
                    .attr("x", d => xScale(xValue(d)))
                    .attr("y", d => yScale(yValue(d)))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => 600 - yScale(yValue(d)))
                    .attr("fill", color)

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
                            d3.select(this).transition().attr('fill', color);
                        });

                        svg.select('.x-axis-bar').selectAll("text").remove();


        console.log(yScale(yValue(TDData[2])))
    }, [TDData, yOption, highlightOption, baseColorOption, currentWeekIndex])

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
          <MenuItem value={3}>Follower Engagement Rate</MenuItem>
          <MenuItem value={4}>Retweets Per Original Tweet</MenuItem>
          <MenuItem value={5}>Polarity</MenuItem>
          <MenuItem value={6}>Subjectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>          
          <MenuItem value={7}>Written Questions Asked</MenuItem>
          <MenuItem value={8}>Oral Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>Votes recieved in last election</MenuItem>
          <MenuItem disabled>Avg. Poll</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Highlight</InputLabel>
        <Select onChange={onChangeHighlight} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Highlight None</MenuItem>
          <MenuItem value={1}>Highlight Cabinet Ministers</MenuItem>
          <MenuItem value={2}>Highlight Junior Ministers</MenuItem>
          <MenuItem value={3}>Highlight Both</MenuItem>          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Base Color</InputLabel>
        <Select onChange={onChangeBaseColor} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Party Color</MenuItem>
          <MenuItem value={1}>White</MenuItem>       
        </Select>
      </FormControl>
        <div className={"scroll-svg-container"}>
            <svg ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>
            <g id="container-bar" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis-bar"></g>
                <g className="y-axis-bar"></g>
            </g>
            </svg>
        </div>
    </div>
    )
}
