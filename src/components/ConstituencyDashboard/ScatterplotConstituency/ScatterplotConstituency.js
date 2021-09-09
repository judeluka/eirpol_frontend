import React from 'react'
import { useRef, useEffect, useState} from 'react'
import * as d3 from 'd3'
import { chamber } from '../../../Backend/rollCall'
import { axisBottom, axisLeft, svg } from 'd3'
import { current } from '../../../Backend/rollCall'
import { Typography, Checkbox, Select, ListItem, FormControlLabel, FormGroup } from '@material-ui/core'
import CustomizedHook from './SearchSelectBox'
import GroupedSelect from './GroupedSelectBox'
import './scatterplot.css'
import { MenuItem, ListSubheader, FormControl, InputLabel, makeStyles, List, ListItemText } from '@material-ui/core'
import axios from 'axios'
import { FormatAlignCenter, FormatListNumberedRtlOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
        icon: {
          color: "white"
      },
    
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,   
      }
    
}));


const provinceColors = ["#426ff5", "yellow", "green", "red", "lightblue"]

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

const provinces = [

  [
"Meath East",
"Meath West",
"Longford Westmeath",
"Louth",
"Kildare North",
"Kildare South",
"Laois Offaly",
"Carlow Kilkenny",
"Wicklow", 
"Waterford",
"Wexford"
], 
[
"Donegal",
"Cavan Monaghan"
], 

[
  "Sligo Leitrim",
  "Galway West",
  "Mayo",
  "Roscommon Galway",
  "Galway East"
]
, 

[
  "Kerry",
  "Limerick City",
  "Limerick County",
  "Tipperary",
  "Clare",
  "Cork South West",
  "Cork South Central",
  "Cork North West",
  "Cork North Central",
  "Cork East"
]
, 
[
"Dublin Bay North",
"Dublin Bay South",
"Dublin Central",
"Dublin Fingal",
"Dublin Mid West",
"Dublin North West",
"Dublin Rathdown",
"Dublin South Central",
"Dublin South West",
"Dublin West",
"Dún Laoghaire"
]
]



const ScatterplotConstituency = ({data}) => {



    const [TDData, setTDData] = useState(null)
    // const [provinceSelect, setProvinceSelect] = useState(["Leinster", "Munster", "Connacht", "Ulster", "Dublin"])
    const [filteredTDData, setFilteredTDData] = useState(null)
    const [xOption, setXOption] = useState(0)
    const [yOption, setYOption] = useState(1)
    const [rOption, setROption] = useState(0)
    


 
    const noOfSeats = (d) => {

      return d.TDs.length

    } 
    const totalFollowers = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.followerData != undefined).filter(d => d.followerData.length != 0)

      var followersOfEach = justTDsOnTwitter.map(d => d.followerData[3].followers)

      var total = followersOfEach.reduce((a, b) => a+ b)

      return total

    } 
    const averageFollowers = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.followerData != undefined).filter(d => d.followerData.length != 0)

      var followersOfEach = justTDsOnTwitter.map(d => d.followerData[3].followers)

      var total = followersOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const totalRetweets = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

      var retweetsOfEach = justTDsOnTwitter.map(d => d.retweetData[3].retweets)

      var total = retweetsOfEach.reduce((a, b) => a+ b)

      return total


    }
    const averageRetweets = (d) => {

    var justTDsOnTwitter = d.TDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

    var retweetsOfEach = justTDsOnTwitter.map(d => d.retweetData[3].retweets)

    var total = retweetsOfEach.reduce((a, b) => a + b)

    var average = total / d.TDs.length


    return average
    }  
    const totalOriginalTweets = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)
  
      var retweetsOfEach = justTDsOnTwitter.map(d => d.retweetData[3].original_tweets)
  
      var total = retweetsOfEach.reduce((a, b) => a + b)
  
      return total
    }
    const averageOriginalTweets = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)
  
      var retweetsOfEach = justTDsOnTwitter.map(d => d.retweetData[3].original_tweets)
  
      var total = retweetsOfEach.reduce((a, b) => a + b)
  
      return total
    }
    const constituencyFollowerRetweetRatio = (d) => {

      var ratio = totalRetweets(d) / totalFollowers(d)

      return ratio
    }
    const averageFollowerRetweetRatio = (d) => {

      var ratio = averageRetweets(d) / averageFollowers(d)

      return ratio
    }
    const constituencyRetweetOriginalTweetsRatio = (d) => {

      var ratio = totalRetweets(d) / totalOriginalTweets(d)

      return ratio
    }
    const averageRetweetOriginalTweetsRatio = (d) => {

      var ratio = averageRetweets(d) / averageOriginalTweets(d)

      return ratio
    }
    const averagePolarity = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.sentimentData != undefined).filter(d => d.sentimentData.length != 0)

      var polarityOfEach = justTDsOnTwitter.map(d => d.sentimentData[3].polarity)

      var total = polarityOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const averageSubjectivity = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.sentimentData != undefined).filter(d => d.sentimentData.length != 0)

      var subjectivityOfEach = justTDsOnTwitter.map(d => d.sentimentData[3].subjectivity)

      var total = subjectivityOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const totalAbsences = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].absences)

      var total = absencesOfEach.reduce((a, b) => a + b)

      return total

    }
    const averageAbsences = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].absences)

      var total = absencesOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const totalPresences = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].totalVotes)

      var total = absencesOfEach.reduce((a, b) => a + b)

      return total

    }
    const averagePresences = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].totalVotes)

      var total = absencesOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const totalTimesOnWinningSide = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].onWinningSide)

      var total = absencesOfEach.reduce((a, b) => a + b)

      return total

    }
    const totalTimesOnLosingSide = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].onLosingSide)

      var total = absencesOfEach.reduce((a, b) => a + b)

      return total

    }    
    const averageTimesOnWinningSide = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].onWinningSide)

      var total = absencesOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const averageTimesOnLosingSide = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

      var absencesOfEach = justTDsOnTwitter.map(d => d.voteData[0].onLosingSide)

      var total = absencesOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }
    const totalQuestionsAsked = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.writtenQuestions != undefined).filter(d => d.writtenQuestions[0].writtenQuestions.to != undefined)

      const sumValues = obj => Object.values(obj).reduce((a, b) => a + b)

      var questionsOfEach = justTDsOnTwitter.map(d => sumValues(d.writtenQuestions[0].writtenQuestions.to))

      var total = questionsOfEach.reduce((a, b) => a + b)

      return total

    }
    const averageQuestionsAsked = (d) => {

      var justTDsOnTwitter = d.TDs.filter(d => d.writtenQuestions != undefined).filter(d => d.writtenQuestions[0].writtenQuestions.to != undefined)

      const sumValues = obj => Object.values(obj).reduce((a, b) => a + b)

      var questionsOfEach = justTDsOnTwitter.map(d => sumValues(d.writtenQuestions[0].writtenQuestions.to))

      var total = questionsOfEach.reduce((a, b) => a + b)

      var average = total / d.TDs.length

      return average

    }


    

    
    const optionsFunctions = [
      noOfSeats,
      totalFollowers, 
      averageFollowers, 
      totalRetweets, 
      averageRetweets, 
      totalOriginalTweets, 
      averageOriginalTweets, 
      constituencyFollowerRetweetRatio, 
      averageFollowerRetweetRatio,
      constituencyRetweetOriginalTweetsRatio,
      averageRetweetOriginalTweetsRatio,
      averagePolarity,
      averageSubjectivity,
      totalAbsences,
      averageAbsences,
      totalPresences,
      averagePresences,
      totalTimesOnWinningSide,
      totalTimesOnLosingSide,
      averageTimesOnWinningSide,
      averageTimesOnLosingSide,
      totalQuestionsAsked,
      averageQuestionsAsked
    ]



    const xValue = optionsFunctions[xOption]
    const yValue = optionsFunctions[yOption]
    const rValue = optionsFunctions[rOption]

    useEffect(() => {

        setTDData(data)

    }, [])

  const wrapperRef = useRef()
  const svgRef = useRef()

    const options = [

        "Followers", "Retweets", "Original Tweets", "Polarity", "Subjectivity", "Follower Engagement Rate", "Retweets Per Original Tweet", "Avg. Original Tweets (Activity)", "Avg. Followers", "Avg. Retweets", "TDs on Twitter"
        ]

    const optionsExplanation = [

      "Total Followers of party.",
      "Total Retweets received by party over last week.",
      "Number of original tweets (so excl. retweets) a TD has posted over last week.",
      "Average sentiment of a TD's tweets over the past week, value lies between [-1, 1] with 1 being most positive.",
      "Average subjectivity of a TD's tweets over the past week, value lies between [0, 1] with 1 being most subjective.",
      "Total Followers divided by Total Retweets received over the last week.",
      "Total Retweets divided by Total Original Tweets over the last week.",
      "How many Original Tweets the average TD posts in a week.",
      "How many followers the average TD has.",
      "How many retweets the average TD gets in a week.",
      "How many TDs a party has on Twitter."

    ]


  
    const classes = useStyles();

//     const handleChange = (event) => {

//           const holder = partySelect

//           const tester = event.target.value

//             if(partySelect.includes(tester)) {

//               for(let i = 0; i < holder.length; i++) {
//                 if(holder[i] === tester) {
//                   holder.splice(i, 1)
//                   setPartySelect(holder)            
//                 }
//               }
//             } else {
//               holder.push(tester)
//               setPartySelect(holder)
//             }

//             const selected = TDDataScatter;
//             const inbetween = selected;

//             const test = inbetween.filter(d => partySelect.includes(d.party))         
          
//             setFilteredTDData(test)

//             console.log(TDDataScatter)
                

// //             }
            
//       }

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

    const margin = {top: 20, right: 20, bottom: 20, left: 50}
    
    const height = 620 - margin.left - margin.right;
    const width = 820 - margin.top - margin.bottom;        

    useEffect(() => {

      if(!TDData) return null;


    function storeTDsByConstituency() {


      var TDConstituencyObj = TDData.map(function(d) {
  
  
          var indexOfLastSlash = d.member_constituency_uri[0].lastIndexOf('/') + 1;      
          var clean = d.member_constituency_uri[0].substr(indexOfLastSlash).replaceAll('-', ' ');
          return {TD: d, constituencyName: clean}
  
      })  

      var constituenciesArr = TDConstituencyObj.map(d => d.constituencyName)

      let unique = [...new Set(constituenciesArr)]


      console.log(unique)

      var TDSSortedIntoCon = []


      for(let i = 0; i < unique.length; i++) {

        var holder = [];

        var provinceColor = undefined

        for(let j = 0; j < TDConstituencyObj.length; j++) {

          if(TDConstituencyObj[j].constituencyName == unique[i]) {
            for(let k = 0; k < provinces.length; k++) {
              if(provinces[k].includes(TDConstituencyObj[j].constituencyName)) {
                provinceColor = provinceColors[k]
              }
              

            }
            holder.push(TDConstituencyObj[j].TD)
          }
          
        }
       
      TDSSortedIntoCon.push({constituency: unique[i], TDs: holder, provinceColor: provinceColor})


      }


      
      return TDSSortedIntoCon
  
  }


  console.log(storeTDsByConstituency())


  const TDsStoredByConstituency = storeTDsByConstituency()

      const svg = d3.select(svgRef.current)

      const xScale = d3.scaleLinear()
                      .range([0, width])
                      .domain(d3.extent(TDsStoredByConstituency, xValue))


      const yScale = d3.scaleLinear()
                      .range([height, 0])
                      .domain(d3.extent(TDsStoredByConstituency, yValue))
                      
      const rScale = d3.scaleLinear()
                      .range([5, 20])
                      .domain(d3.extent(TDsStoredByConstituency, rValue))

      const provinceColor = d => d.provinceColor
      const name = d => d.name


      const xAxis = axisBottom(xScale);        
        
        svg.select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .transition()
            .duration(500)
            .call(xAxis)


        const yAxis = axisLeft(yScale);

        svg.select(".y-axis")
        .attr("transform", "translate(0, 0)")
            .transition()
            .duration(500)
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

            const hoverColor = "#eec42d"
       
        var circles = d3.select("#container-scatter-party")
                        .selectAll(".node")
                        .data(TDsStoredByConstituency)
                        .join("circle")
                        .attr("class", "node")
                        .attr("fill", provinceColor)
                        .attr('fill-opacity', 0.75)
                        .attr("name", name)

            circles.transition()
                    .duration(500)
                    .attr("cx", d => xScale(xValue(d)))
                    .attr("cy", d => yScale(yValue(d)))
                    .attr("r", d => rScale(rValue(d)))

            circles.on('mouseover', function (d, i) {
            tooltip
            .html(
                `<div>Constituency: ${d.constituency}</div><div>x: ${xValue(d).toLocaleString()}: </div><div>y: : ${yValue(d).toLocaleString()}</div><div>r: ${rValue(d)}: </div>`
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
                d3.select(this).transition().attr('fill', provinceColor);
            }); 


    }, [TDData, xOption, yOption, rOption])

    
    if (!TDData) return null;

    return (

        <div className={"featuredItem"} style={{textAlign: "center", margin: "10px", padding: "10px"}}>
        <Typography style={{marginBottom: 20}} align="center" variant="h5">Interactive Scatter Plot</Typography>
        
            <div>
                {/* <CustomizedHook/> */}
                <div>

                    
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">X-Value</InputLabel>
        <Select onChange={onChangeX} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
        <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>No. Of Seats</MenuItem>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Avg. Followers</MenuItem>
          <MenuItem value={3}>Total Retweets</MenuItem>
          <MenuItem value={4}>Avg. Retweets</MenuItem>
          <MenuItem value={5}>Total Original Tweets</MenuItem>
          <MenuItem value={6}>Avg. Original Tweets</MenuItem>
          <MenuItem value={7}>Constituency Follower to Retweet Ratio</MenuItem>
          <MenuItem value={8}>Avg. Follower to Retweet Ratio</MenuItem>
          <MenuItem value={9}>Constituency Retweet to Original Tweet Ratio</MenuItem>
          <MenuItem value={10}>Avg. Retweet to Original Tweet Ratio</MenuItem>
          <MenuItem value={11}>Avg. Polarity</MenuItem>
          <MenuItem value={12}>Avg. Subjectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={13}>Total Absences</MenuItem>
          <MenuItem value={14}>Avg. Absences</MenuItem>
          <MenuItem value={15}>Total Presences</MenuItem>
          <MenuItem value={16}>Avg. Presences</MenuItem>
          <MenuItem value={17}>Total Times On Winning Side</MenuItem>
          <MenuItem value={18}>Total Times On Losing Side</MenuItem>
          <MenuItem value={19}>Avg. Times On Winning Side</MenuItem>
          <MenuItem value={20}>Avg. Times On Winning Side</MenuItem>
          <MenuItem value={21}>Total Questions Asked</MenuItem>
          <MenuItem value={22}>Avg. Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>Votes recieved in last election</MenuItem>
          <MenuItem disabled>Avg. Poll Rating</MenuItem>

        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>No. Of Seats</MenuItem>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Avg. Followers</MenuItem>
          <MenuItem value={3}>Total Retweets</MenuItem>
          <MenuItem value={4}>Avg. Retweets</MenuItem>
          <MenuItem value={5}>Total Original Tweets</MenuItem>
          <MenuItem value={6}>Avg. Original Tweets</MenuItem>
          <MenuItem value={7}>Constituency Follower to Retweet Ratio</MenuItem>
          <MenuItem value={8}>Avg. Follower to Retweet Ratio</MenuItem>
          <MenuItem value={9}>Constituency Retweet to Original Tweet Ratio</MenuItem>
          <MenuItem value={10}>Avg. Retweet to Original Tweet Ratio</MenuItem>
          <MenuItem value={11}>Avg. Polarity</MenuItem>
          <MenuItem value={12}>Avg. Subjectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={13}>Total Absences</MenuItem>
          <MenuItem value={14}>Avg. Absences</MenuItem>
          <MenuItem value={15}>Total Presences</MenuItem>
          <MenuItem value={16}>Avg. Presences</MenuItem>
          <MenuItem value={17}>Total Times On Winning Side</MenuItem>
          <MenuItem value={18}>Total Times On Losing Side</MenuItem>
          <MenuItem value={19}>Avg. Times On Winning Side</MenuItem>
          <MenuItem value={20}>Avg. Times On Winning Side</MenuItem>
          <MenuItem value={21}>Total Questions Asked</MenuItem>
          <MenuItem value={22}>Avg. Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>Votes recieved in last election</MenuItem>
          <MenuItem disabled>Avg. Poll Rating</MenuItem>

        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Circle Radius</InputLabel>
        <Select onChange={onChangeR}style={{ color: "white"}} classes={{icon:classes.icon}}defaultValue="" id="grouped-select">
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>No. Of Seats</MenuItem>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Avg. Followers</MenuItem>
          <MenuItem value={3}>Total Retweets</MenuItem>
          <MenuItem value={4}>Avg. Retweets</MenuItem>
          <MenuItem value={5}>Total Original Tweets</MenuItem>
          <MenuItem value={6}>Avg. Original Tweets</MenuItem>
          <MenuItem value={7}>Constituency Follower to Retweet Ratio</MenuItem>
          <MenuItem value={8}>Avg. Follower to Retweet Ratio</MenuItem>
          <MenuItem value={9}>Constituency Retweet to Original Tweet Ratio</MenuItem>
          <MenuItem value={10}>Avg. Retweet to Original Tweet Ratio</MenuItem>
          <MenuItem value={11}>Avg. Polarity</MenuItem>
          <MenuItem value={12}>Avg. Subjectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={13}>Total Absences</MenuItem>
          <MenuItem value={14}>Avg. Absences</MenuItem>
          <MenuItem value={15}>Total Presences</MenuItem>
          <MenuItem value={16}>Avg. Presences</MenuItem>
          <MenuItem value={17}>Total Times On Winning Side</MenuItem>
          <MenuItem value={18}>Total Times On Losing Side</MenuItem>
          <MenuItem value={19}>Avg. Times On Winning Side</MenuItem>
          <MenuItem value={20}>Avg. Times On Winning Side</MenuItem>
          <MenuItem value={21}>Total Questions Asked</MenuItem>
          <MenuItem value={22}>Avg. Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled>Votes recieved in last election</MenuItem>
          <MenuItem disabled>Avg. Poll Rating</MenuItem>

        </Select>
      </FormControl>
    </div>
    <List style={{display: "inline-block"}}>
      <ListItem >
        <ListItemText primary={"x: " + optionsExplanation[xOption] + " (25/08/21)"}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"y: " + optionsExplanation[yOption] + " (25/08/21)"}/>
             </ListItem>
             <ListItem>
            <ListItemText primary={"r: " + optionsExplanation[rOption] + " (25/08/21)"}/>
            </ListItem>
            
    </List>

    <div>    <FormGroup style={{display: "inline-block",
    verticalAlign: "top"}}>
    <FormControlLabel
        control={
    <Checkbox
          defaultChecked="true"
          name="checkedB"
          style={{color: "#426ff5"}}
          value={"Sinn Féin"}
          // onChange={handleChange}
          />
        }
        label="Leinster"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: 'lightblue'}}
            value={"Fine Gael"}
            // onChange={handleChange}
          />
        }
        label="Dublin"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "red"}}
            value={"Fianna Fáil"}
            // onChange={handleChange}
          />
        }
        label="Munster"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "green"}}
            value={"Labour Party"}
            // onChange={handleChange}
          />
        }
        label="Connacht"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "yellow"}}
            value={"Independent"}
            // onChange={handleChange}
          />
        }
        label="Ulster"
        />
        </FormGroup>
        </div>

            </div>
        <div className={"scroll-svg-container"}>
        <svg id={"scatterplot-svg"}ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>
            <g id="container-scatter-party" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <g className="x-axis"></g>
            <g className="y-axis"></g>
            </g>
            </svg>
          </div>
        </div>
    )
}
export default ScatterplotConstituency
