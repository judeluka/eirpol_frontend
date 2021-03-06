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

    "Followers", "Retweets", "Original Tweets", "TDs", "Average Followers", "Follower Engagement Rate", "Retweets per Original Tweet", "Written Questions Asked", "Oral Questions Asked", "Average Written Questions Asked by TD", "Average Oral Questions Asked by TD"
    
    ]

    const followers = d => d.totalFollows
    const retweets = d => d.totalRetweets
    const originalTweets = d => d.totalOriginalTweets
    const TDAmount = d => d.TDAmount
    const TDFollowerAvg = d => d.followersToTDs
    const followerEngagementRate = d => d.followerEngagementRate
    const retweetsToOriginalTweetsFunc = d => d.retweetsToOriginalTweets
    const writtenQuestionsAsked = d => d.writtenQuestionsAsked
    const oralQuestionsAsked = d => d.oralQuestionsAsked
    const writtenQuestionsAskedAverage = d=> d.writtenQuestionsAskedAverage
    const oralQuestionsAskedAverage = d=> d.oralQuestionsAskedAverage
    const totalAbsences = d => d.totalAbsences
    const totalPresences = d => d.totalPresences
    const averageAbsences = d => d.averageAbsences
    const averagePresences = d => d.averagePresences
    const totalTimesOnWinningSide = d => d.totalTimesOnWinningSide
    const totalTimesOnLosingSide = d => d.totalTimesOnLosingSide
    const averageTDTimeOnWinningSide = d => d.averageTDTimeOnWinningSide
    const averageTDTimeOnLosingSide = d => d.averageTDTimeOnLosingSide


    const optionsFunctions = 
    
    [ followers, retweets, originalTweets, TDAmount, TDFollowerAvg, followerEngagementRate, retweetsToOriginalTweetsFunc,  writtenQuestionsAsked, oralQuestionsAsked, writtenQuestionsAskedAverage, oralQuestionsAskedAverage, totalAbsences, totalPresences, averageAbsences, averagePresences, totalTimesOnWinningSide, totalTimesOnLosingSide, averageTDTimeOnWinningSide, averageTDTimeOnLosingSide]


    const classes = useStyles();

    
    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)
    const [xOption, setXOption] = useState(1)
    const [yOption, setYOption] = useState(0)
    const [secOption, setSecOption] = useState(1)


    const margin = {top: 20, right: 20, bottom: 100, left: 60}

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

    setTDData(data.filter(function(d) {
          
        if(d.followerData[0] != undefined) {
        return d
      }
    }
    ))

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



       function followerEngagementRateFunc(i) {

        var a = TDData.map(function(d) {
            if(parties[i] === d.party) {
                return d
            }
        }).filter(function(x) {
                    return x !== undefined
                })

        var follows = a.map(d => d.followerData[currentWeekIndex].followers).reduce(function(a, b) {return a + b})
        var retweets = a.map(d => d.retweetData[currentWeekIndex].retweets).reduce(function(a, b) {return a + b})
        var ratio = retweets / follows

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

       function writtenQuestionsAsked(i) {

        var a = TDData.map(function(d) {
            if(parties[i] === d.party) {
                return d
            }
        }).filter(function(x) {
                    return x !== undefined
                })


               var b = a.map(function(d) {

                var holder = d.writtenQuestions[0].writtenQuestions.to
                if(!holder) return 0;
                const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 
              
                var sum = sumValues(holder)
              
                return sum
                }).reduce(function(a,b) {return a + b})


                return b


       }

       function oralQuestionsAsked(i) {

        var a = TDData.map(function(d) {
            if(parties[i] === d.party) {
                return d
            }
        }).filter(function(x) {
                    return x !== undefined
                })


               var b = a.map(function(d) {

                var holder = d.oralQuestions[0].oralQuestions.to
                if(!holder) return 0;
                const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 
              
                var sum = sumValues(holder)
              
                return sum
                }).reduce(function(a,b) {return a + b})


                return b


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
            this.followerEngagementRate = followerEngagementRateFunc(i)
            this.retweetsToOriginalTweets = retweetsToOriginalTweetsFunc(i)
            this.writtenQuestionsAsked = writtenQuestionsAsked(i)
            this.oralQuestionsAsked = oralQuestionsAsked(i)
            this.writtenQuestionsAskedAverage = writtenQuestionsAsked(i) / this.TDs.length;
            this.oralQuestionsAskedAverage = oralQuestionsAsked(i) / this.TDs.length
            this.totalAbsences = this.TDs.map(d => d.voteData[0].absences).reduce(function(a, b) {return a + b})
            this.totalPresences = this.TDs.map(d => d.voteData[0].totalVotes).reduce(function(a, b) {return a + b})
            this.averageAbsences = this.TDs.map(d => d.voteData[0].absences).reduce(function(a, b) {return a + b}) / this.TDs.length
            this.averagePresences = this.TDs.map(d => d.voteData[0].totalVotes).reduce(function(a, b) {return a + b}) / this.TDs.length
            this.totalTimesOnWinningSide = this.TDs.map(d => d.voteData[0].onWinningSide).reduce(function(a, b) {return a + b})
            this.totalTimesOnLosingSide = this.TDs.map(d => d.voteData[0].onLosingSide).reduce(function(a, b) {return a + b})
            this.averageTDTimeOnWinningSide = this.TDs.map(d => d.voteData[0].onWinningSide).reduce(function(a, b) {return a + b}) / this.TDs.length
            this.averageTDTimeOnLosingSide = this.TDs.map(d => d.voteData[0].onLosingSide).reduce(function(a, b) {return a + b}) / this.TDs.length
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
            .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");

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
          <MenuItem value={5}>Follower Engagement Rate </MenuItem>       
          <MenuItem value={6}>Retweets per Original Tweet</MenuItem>     
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={7}>Written Questions Asked</MenuItem> 
          <MenuItem value={8}>Oral Questions Asked</MenuItem> 
          <MenuItem value={9}>Average Written Questions Asked by TD</MenuItem> 
          <MenuItem value={10}>Average Oral Questions Asked by TD</MenuItem>
          <MenuItem value={11}>Total Vote Absences</MenuItem> 
          <MenuItem value={12}>Total Vote Presences</MenuItem>  
          <MenuItem value={13}>Average Vote Absences</MenuItem> 
          <MenuItem value={14}>Average Vote Presences</MenuItem>  
          <MenuItem value={15}>Total Times On Winning Side</MenuItem> 
          <MenuItem value={16}>Total Times On Losing Side</MenuItem> 
          <MenuItem value={17}>Average Times On Winning Side</MenuItem> 
          <MenuItem value={18}>Average Times On Losing Side</MenuItem> 
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
          <MenuItem value={7}>Written Questions Asked</MenuItem> 
          <MenuItem value={8}>Oral Questions Asked</MenuItem> 
          <MenuItem value={9}>Average Written Questions Asked by TD</MenuItem> 
          <MenuItem value={10}>Average Oral Questions Asked by TD</MenuItem>
          <MenuItem value={11}>Total Absences</MenuItem>  
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
