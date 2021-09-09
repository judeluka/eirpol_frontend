import React from 'react'
import { useRef, useEffect, useState} from 'react'
import * as d3 from 'd3'
import { chamber } from '../../../Backend/rollCall'
import { axisBottom, axisLeft, svg } from 'd3'
import { current } from '../../../Backend/rollCall'
import { Typography, Checkbox, Select, ListItem, FormControlLabel, FormGroup, Switch } from '@material-ui/core'
import CustomizedHook from './SearchSelectBox'
import GroupedSelect from './GroupedSelectBox'
import './scatterplot.css'
import { MenuItem, ListSubheader, FormControl, InputLabel, makeStyles, List, ListItemText } from '@material-ui/core'
import axios from 'axios'
import { CollectionsBookmarkRounded, FormatAlignCenter, FormatListNumberedRtlOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
        icon: {
          color: "#6553b8"
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
"Independent": "black",
"Green Party": "#99CC33",
"Social Democrats": "#752F8B",
"Aontú": "#44532A",
"Independents 4 Change": "grey"}

const Scatterplot = ({data}) => {



    const [TDDataScatter, setTDDataScatter] = useState(data)
    const [partySelect, setPartySelect] = useState(["Sinn Féin", "Fine Gael", "Fianna Fáil", "Labour Party", "Green Party", "Solidarity - People Before Profit", "Aontú", "Social Democrats", "Independent", "Independents 4 Change"])
    const [colorMode, setColorMode] = useState("Light Mode")
    const [color, setColor] = useState(null)
    const [fillColor, setFillColor] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState(null)
    const [textColor, setTextColor] = useState(null)
    const [xOption, setXOption] = useState(0)
    const [yOption, setYOption] = useState(1)
    const [rOption, setROption] = useState(0)
    const [highlightOption, setHighlightOption] = useState(0)
    const [baseColorOption, setBaseColorOption] = useState(0)
    const [filteredTDData, setFilteredTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [height, setHeight] = useState(620)
    const [width, setWidth] = useState(920)
    const [nodeSize, setNodeSize] = useState({min: 6, max: 20})


    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }

    function useWindowDimensions() {
     
    
      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      return windowDimensions;
    }

    console.log(useWindowDimensions())


    // const followers = d => d.followerData[currentWeekIndex].followers

    const followers = d => {

      if(d.followerData.length == 0) {
        return 0
      } else {
        return d.followerData[currentWeekIndex].followers
      }

    }

    // const retweets = d => d.retweetData[currentWeekIndex].retweets

    const retweets = d => {

      if(d.retweetData.length == 0) {
        return 0
      } else {
        return d.retweetData[currentWeekIndex].retweets
      }

    }


    // const original_tweets = d => d.retweetData[currentWeekIndex].original_tweets

    const original_tweets = d => {

      if(d.retweetData.length == 0) {
        return 0
      } else {
        return d.retweetData[currentWeekIndex].original_tweets
      }

    }

    // const polarity = d => d.sentimentData[currentWeekIndex].polarity

    const polarity = d => {

      if(d.sentimentData == undefined || d.sentimentData.length == 0) {
        return 0
      } else {
        return d.sentimentData[currentWeekIndex].polarity
      }

    }
    // const subjectivity = d => d.sentimentData[currentWeekIndex].subjectivity

    const subjectivity = d => {

      if(d.sentimentData == undefined || d.sentimentData.length == 0) {
        return 0
      } else {
        return d.sentimentData[currentWeekIndex].subjectivity
      }
    }

    const followerEngagementRate = (d) => {

      if(d.followerData.length == 0) {
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


      if(d.followerData.length == 0) {
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

const writtenQuestionsAsked = d => {

  var holder = d.writtenQuestions[0].writtenQuestions.to
  if(!holder) return 0;
  const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

  var sum = sumValues(holder)

  return sum

}

const oralQuestionsAsked = d => {

  var holder = d.oralQuestions[0].oralQuestions.to
  if(!holder) return 0;
  const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

  var sum = sumValues(holder)

  return sum



}

const numberOfTopics = (d) => {

  if(!d.writtenQuestions[0].writtenQuestions.topic) return 0;

  return Object.keys(d.writtenQuestions[0].writtenQuestions.topic).length  

}

const averageQuestionTowardsTopic = (d) => {

  if(!d.writtenQuestions[0].writtenQuestions.topic) return 0;

  var topics = Object.keys(d.writtenQuestions[0].writtenQuestions.topic).length  

  var totalQuestions = writtenQuestionsAsked(d)

  return totalQuestions / topics
}



const absences = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].absences
  }
}
const presences = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].totalVotes
  }
}
const totalYes = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].totalYes
  }
}
const totalNo = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].totalNo
  }
}
const onWinningSide = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].onWinningSide
  }
}
const onLosingSide = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].onLosingSide
  }
}
const yesAndCarried = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].yesAndCarried
  }
}
const yesAndLost = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].yesAndLost
  }
}
const noAndCarried = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].noAndCarried
  }
}
const noAndLost = (d) => {
  if(d.voteData.length === 0) {
    return 0
  } else {
    return d.voteData[0].noAndLost
  }
}
const age = (d) => {

  const getDate = (d) => { 
    
    let together = []
    let apart = d.split('/')
    let day = apart[0]
    let month = apart[1]
    let year = apart[2]
  
    together.push(month, day, year)
    together.toString().replace(",","/").replace(",","/")
    return new Date(together)
  }
    
  if(!d.DOB) {

  function calcAge() {
      var birthday = +Date.now();
      return ~~((Date.now() - birthday) / (31557600000));
    }
    return calcAge()
  }
  

  function calcAge(date) {
    var birthday = +getDate(date);
    return ~~((Date.now() - birthday) / (31557600000));
  }

  return calcAge(d.DOB)
    

}
    
    const optionsFunctions = [
      age,
      followers, 
      retweets, 
      original_tweets,      
      followerEngagementRate, 
      retweetsPerOriginalTweet,  
      polarity, 
      subjectivity,  

      writtenQuestionsAsked, 
      oralQuestionsAsked, 
      numberOfTopics,
      averageQuestionTowardsTopic,


      absences, 
      presences, 
      totalYes, 
      totalNo, 
      onWinningSide, 
      onLosingSide, 
      yesAndCarried, 
      yesAndLost, 
      noAndCarried, 
      noAndLost, 
      
    ]

    const xValue = optionsFunctions[xOption]
    const yValue = optionsFunctions[yOption]
    const rValue = optionsFunctions[rOption]

    useEffect(() => {

        setTDDataScatter(data)
        setFilteredTDData(TDDataScatter
            
      //     .filter(function(d) {
          
      //     if(d.followerData[0] != undefined) {
      //     return d
      //   }
      // }
      // )
      
      )

    }, [])

    useEffect(() => {


console.log(colorMode)

      if(colorMode == "Dark Mode") {
        setFillColor({fill: "white", color: "white"})
        setColor({color: "white"})
        setBackgroundColor("#191C24")
        setTextColor("white")

      }

      if(colorMode == "Light Mode") {
        setFillColor({fill: "black", color: "black"})
        setColor({color: "black"})
        setBackgroundColor("white")
        setTextColor("black")
      }

      

    }, [colorMode])





useEffect(() => {

  if(!TDDataScatter) return null;

  setCurrentWeekIndex(TDDataScatter[0].followerData.length - 1)

}, [TDDataScatter])


  const svgRef = useRef()

    const options = [

      "Age", 
      "Followers", 
      "Retweets", 
      "Original Tweets", 
      "Followers Per Retweet", 
      "Retweets Per Original Tweet", 
      "Avg. Polarity", 
      "Avg. Subjectivity", 
  
      "Written Questions Asked", 
      "Oral Questions Asked",
      "No. of Topics TD had Questions for",
      "Avg. Questions TD had towards Topic",
  
  
      "Absences",
      "Presences",
      "Votes Yes",
      "Votes No",
      "Times on Winning Side",
      "Times on Losing Side",
      "Yes and Carried",
      "Yes and Lost",
      "No and Carried",
      "No and Lost"
  
        ]

    const optionsExplanation = [

      "Number of Twitter followers on last check.",
      "Number of retweets received over last week.",
      "Number of original tweets (so excl. retweets) a TD has posted over last week.",
      "Average sentiment of a TD's tweets over the past week, value lies between [-1, 1] with 1 being most positive.",
      "Average subjectivity of a TD's tweets over the past week, value lies between [0, 1] with 1 being most subjective.",
      "Followers divided by Retweets received over the last week.",
      "Retweets divided by Original Tweets over the last week.",
      "Written Questions asked between 01/08/21 - 30/08/21.",
      "Oral Questions asked between 01/08/21 - 30/08/21."

    ]   
    

    const classes = useStyles();

    const handleChange = (event) => {

          const holder = partySelect

          const tester = event.target.value

            if(partySelect.includes(tester)) {

              for(let i = 0; i < holder.length; i++) {
                if(holder[i] === tester) {
                  holder.splice(i, 1)
                  setPartySelect(holder)            
                }
              }
            } else {
              holder.push(tester)
              setPartySelect(holder)
            }


              const selected = TDDataScatter;
              const inbetween = selected;


            const test = inbetween.filter(d => partySelect.includes(d.party))
                     
          
            setFilteredTDData(test)

            console.log(TDDataScatter)
            
      }


    const onChangeColorMode = (event, child) => {

      if(child == true) {

      setColorMode("Dark Mode")
      } 
      if(child == false) {
        setColorMode("Light Mode")
      }
      
      console.log('color mode:' + event.target.value);
      console.log(child);
};

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

const onChangeHighlight = (event, child) => {
  setHighlightOption(event.target.value)
  console.log('highlight:' + event.target.value);
  console.log(child);
};

const onChangeBaseColor = (event, child) => {
  setBaseColorOption(event.target.value)
  console.log('base color:' + event.target.value);
  console.log(child);
};

    const margin = {top: 20, right: 20, bottom: 100, left: 50}  
    const heightMargin = height - margin.left - margin.right;
    const widthMargin = width - margin.top - margin.bottom;        
    
useEffect(() => {

  if(windowDimensions.width < 500) {
    setHeight(360)
    setWidth(380)
    setNodeSize({min: 4, max: 12})
  }

  if(windowDimensions.width < 600 && windowDimensions.width > 500) {
    setHeight(400)
    setWidth(500)
    setNodeSize({min: 6, max: 20})
  }

  if(windowDimensions.width < 820 && windowDimensions.width > 600) {
    setHeight(500)
    setWidth(600)
  }
  if(windowDimensions.width > 820) {
    setHeight(620)
    setWidth(820)
  }



}, [windowDimensions])

    useEffect(() => {

      if(!TDDataScatter || !filteredTDData) return null;

      if(colorMode == "Dark Mode") {
        partyColors.Independent = "white"
      }
      if(colorMode == "Light Mode") {
        partyColors.Independent = "black"
      }

      console.log(TDDataScatter)
      console.log(filteredTDData)

      



    // const selectedFiltered = () => {

    //   const selected = filteredTDData;

    //     for(let i = 0; i < selected.length; i++) {

    //       if(partySelect.includes(selected[i].party) === false) {
    //         selected.splice([i], 1)
    //       }
    //     }

    //     return selected

    // }

    // console.log(selectedFiltered())

    const selectedFilteredTDData = filteredTDData;

    console.log(selectedFilteredTDData)
    

console.log(selectedFilteredTDData.map(function(d) {

  if(d.followerData.length == 0) {
    return 0
  } else {
    return d.followerData[0].followers
  }
  
}))

  // var k = height / width,
  // x0 = [-4.5, 4.5],
  // y0 = [-4.5 * k, 4.5 * k],
  // x = d3.scaleLinear().domain(x0).range([0, width]),
  // y = d3.scaleLinear().domain(y0).range([height, 0]),
  // z = d3.scaleOrdinal(d3.schemeCategory10);

 


      const svg = d3.select(svgRef.current)


        const xScale = d3.scaleLinear()
                        .range([0, widthMargin])
                        .domain(d3.extent(selectedFilteredTDData, xValue))



        const yScale = d3.scaleLinear()
                        .range([heightMargin, 0])
                        .domain(d3.extent(selectedFilteredTDData, yValue))
                        
        const rScale = d3.scaleLinear()
                        .range([nodeSize.min, nodeSize.max])
                        .domain(d3.extent(selectedFilteredTDData, rValue))

        const party = d => d.party
        const name = d => d.name
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
              return "lightblue"
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
          return "lightblue"
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
          return "lightblue"
        }
  } 

  if(highlightOption == 4) {
    if(d.gender == "Female") {
      return cabinetColor
    } else if(baseColorOption === 0) {
      return partyColors[party(d)]
  } else if(baseColorOption === 1) {
    return "lightblue"
  }
  }
             
             return partyColors[party(d)]
  
  
          } 

        const xAxis = axisBottom(xScale).tickFormat(d3.format(".2s"));        
        
        svg.select(".x-axis")
            .attr("transform", "translate(0," + heightMargin + ")")
            .transition()
            .duration(500)
            .call(xAxis)
            
        const yAxis = axisLeft(yScale).tickFormat(d3.format(".2s"));

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
       
        var circles = d3.select("#container")
                        .selectAll(".node")
                        .data(selectedFilteredTDData)
                        .join("circle")
                        .attr("class", "node")
                        
                        .attr('fill-opacity', 0.75)
                        .attr("name", name)

            circles.transition()
                    .duration(500)
                    .attr("cx", d => xScale(xValue(d)))
                    .attr("cy", d => yScale(yValue(d)))
                    .attr("r", d => rScale(rValue(d)))
                    .attr("fill", color)

                    
            circles.on('mouseover', function (d, i) {
            tooltip
            .html(
                `<div>TD: ${d.name}</div><div>Party: ${d.party}</div><div>x: ${options[xOption]}: ${xValue(d).toLocaleString()}</div><div>y: ${options[yOption]}: ${yValue(d).toLocaleString()}</div><div>r: ${options[rOption]}: ${rValue(d).toLocaleString()}</div>`
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

          console.log(selectedFilteredTDData)

    }, [TDDataScatter, partySelect, filteredTDData, xOption, yOption, rOption, highlightOption, baseColorOption, colorMode, height, width, nodeSize])

    
    if (!TDDataScatter) return null;

    return (

        <div className={"featuredItem"} style={{textAlign: "center", margin: "10px", padding: "10px", background: backgroundColor, color: textColor}}>
        <Typography style={{marginBottom: 20}} align="center" variant="h5">Interactive Scatter Plot</Typography>
        <FormControlLabel
        control={<Switch value={true} onChange={onChangeColorMode}/>}
        label="Dark Mode"
      />
        
        
            <div>

                <div>
                <div>
<FormGroup style={{display: "inline-block",
    verticalAlign: "top"}}>
    <FormControlLabel
        control={
    <Checkbox
          defaultChecked="true"
          name="checkedB"
          style={{color: '#326760', transform: "scale(0.85)"}}
          value={"Sinn Féin"}
          onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>SF</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: '#6699FF', transform: "scale(0.85)"}}
            value={"Fine Gael"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>FG</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#66BB66", transform: "scale(0.85)"}}
            value={"Fianna Fáil"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>FF</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#CC0000", transform: "scale(0.85)"}}
            value={"Labour Party"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>LAB</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={color}
            style={{transform: "scale(0.85)"}}
            value={"Independent"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>IND</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#8E2420", transform: "scale(0.85)"}}
            value={"Solidarity - People Before Profit"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>PBP</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#752F8B", transform: "scale(0.85)"}}
            value={"Social Democrats"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>SocDems</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#99CC33", transform: "scale(0.85)"}}
            value={"Green Party"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>GRN</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#44532A", transform: "scale(0.85)"}}
            value={"Aontú"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>AON</span>}
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "grey", transform: "scale(0.85)"}}
            value={"Independents 4 Change"}
            onChange={handleChange}
          />
        }
        label={<span style={{ fontSize: '16px'}}>IND 4 Change</span>}
        />
             
        </FormGroup>
        </div>
                    
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">X-Value</InputLabel>
        <Select onChange={onChangeX} style={color} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
        <ListSubheader value={0}>General</ListSubheader>
          <MenuItem value={0}>Age</MenuItem>
        <ListSubheader value={1}>Twitter Data, last 7 days</ListSubheader>
          <MenuItem value={1}>Followers</MenuItem>
          <MenuItem value={2}>Retweets</MenuItem>
          <MenuItem value={3}>Original Tweets</MenuItem>
          <MenuItem value={4}>Follower Per Retweet</MenuItem>
          <MenuItem value={5}>Retweets Per Original Tweet</MenuItem>
          <MenuItem value={6}>Avg. Polarity</MenuItem>
          <MenuItem value={7}>Avg. Subjectivity</MenuItem>
          <ListSubheader value={8}>Dáil Questions, 01 July - 01 Sept</ListSubheader>
          <MenuItem value={8}>Written Questions Asked</MenuItem>
          <MenuItem value={9}>Oral Questions Asked</MenuItem>
          <MenuItem value={10}>No. of Topics TD had Questions for</MenuItem>
          <MenuItem value={11}>Avg. Questions TD had towards Topic</MenuItem>
          <ListSubheader value={12}>Dáil Divisions, 01 Jan - 01 Sept</ListSubheader>  
          <MenuItem value={12}>Divisions Absent</MenuItem>
          <MenuItem value={13}>Divisions Present</MenuItem>
          <MenuItem value={14}>No. of votes Yes</MenuItem>
          <MenuItem value={15}>No. of votes No</MenuItem>
          <MenuItem value={16}>Times on Winning Side of Division</MenuItem>
          <MenuItem value={17}>Times on Losing Side of Division</MenuItem>
          <MenuItem value={18}>Yes and Divison Carried</MenuItem>
          <MenuItem value={19}>Yes and Division Lost</MenuItem>
          <MenuItem value={20}>No and Division Carried</MenuItem>
          <MenuItem value={21}>No and Division Lost</MenuItem>
          <MenuItem disabled >News Mentions</MenuItem>
          <MenuItem disabled >Votes recieved in last election</MenuItem>
          <MenuItem disabled >Avg. Poll Rating</MenuItem>


        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={color} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
        <ListSubheader value={0}>General</ListSubheader>
          <MenuItem value={0}>Age</MenuItem>
        <ListSubheader value={1}>Twitter Data, last 7 days</ListSubheader>
          <MenuItem value={1}>Followers</MenuItem>
          <MenuItem value={2}>Retweets</MenuItem>
          <MenuItem value={3}>Original Tweets</MenuItem>
          <MenuItem value={4}>Follower Per Retweet</MenuItem>
          <MenuItem value={5}>Retweets Per Original Tweet</MenuItem>
          <MenuItem value={6}>Avg. Polarity</MenuItem>
          <MenuItem value={7}>Avg. Subjectivity</MenuItem>
          <ListSubheader value={8}>Dáil Questions, 01 July - 01 Sept</ListSubheader>
          <MenuItem value={8}>Written Questions Asked</MenuItem>
          <MenuItem value={9}>Oral Questions Asked</MenuItem>
          <MenuItem value={10}>No. of Topics TD had Questions for</MenuItem>
          <MenuItem value={11}>Avg. Questions TD had towards Topic</MenuItem>
          <ListSubheader value={12}>Dáil Divisions, 01 Jan - 01 Sept</ListSubheader>  
          <MenuItem value={12}>Divisions Absent</MenuItem>
          <MenuItem value={13}>Divisions Present</MenuItem>
          <MenuItem value={14}>No. of votes Yes</MenuItem>
          <MenuItem value={15}>No. of votes No</MenuItem>
          <MenuItem value={16}>Times on Winning Side of Division</MenuItem>
          <MenuItem value={17}>Times on Losing Side of Division</MenuItem>
          <MenuItem value={18}>Yes and Divison Carried</MenuItem>
          <MenuItem value={19}>Yes and Division Lost</MenuItem>
          <MenuItem value={20}>No and Division Carried</MenuItem>
          <MenuItem value={21}>No and Division Lost</MenuItem>
          <MenuItem disabled >News Mentions</MenuItem>
          <MenuItem disabled >Votes recieved in last election</MenuItem>
          <MenuItem disabled >Avg. Poll Rating</MenuItem>


        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">Circle Radius</InputLabel>
        <Select onChange={onChangeR}style={color} classes={{icon:classes.icon}}defaultValue="" id="grouped-select">
        <ListSubheader value={0}>General</ListSubheader>
          <MenuItem value={0}>Age</MenuItem>
        <ListSubheader value={1}>Twitter Data, last 7 days</ListSubheader>
          <MenuItem value={1}>Followers</MenuItem>
          <MenuItem value={2}>Retweets</MenuItem>
          <MenuItem value={3}>Original Tweets</MenuItem>
          <MenuItem value={4}>Follower Per Retweet</MenuItem>
          <MenuItem value={5}>Retweets Per Original Tweet</MenuItem>
          <MenuItem value={6}>Avg. Polarity</MenuItem>
          <MenuItem value={7}>Avg. Subjectivity</MenuItem>
          <ListSubheader value={8}>Dáil Questions, 01 July - 01 Sept</ListSubheader>
          <MenuItem value={8}>Written Questions Asked</MenuItem>
          <MenuItem value={9}>Oral Questions Asked</MenuItem>
          <MenuItem value={10}>No. of Topics TD had Questions for</MenuItem>
          <MenuItem value={11}>Avg. Questions TD had towards Topic</MenuItem>
          <ListSubheader value={12}>Dáil Divisions, 01 Jan - 01 Sept</ListSubheader>  
          <MenuItem value={12}>Divisions Absent</MenuItem>
          <MenuItem value={13}>Divisions Present</MenuItem>
          <MenuItem value={14}>No. of votes Yes</MenuItem>
          <MenuItem value={15}>No. of votes No</MenuItem>
          <MenuItem value={16}>Times on Winning Side of Division</MenuItem>
          <MenuItem value={17}>Times on Losing Side of Division</MenuItem>
          <MenuItem value={18}>Yes and Divison Carried</MenuItem>
          <MenuItem value={19}>Yes and Division Lost</MenuItem>
          <MenuItem value={20}>No and Division Carried</MenuItem>
          <MenuItem value={21}>No and Division Lost</MenuItem>
          <MenuItem disabled >News Mentions</MenuItem>
          <MenuItem disabled >Votes recieved in last election</MenuItem>
          <MenuItem disabled >Avg. Poll Rating</MenuItem>



        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">Highlight Option</InputLabel>
        <Select onChange={onChangeHighlight} style={color} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <MenuItem value={0}>Highlight None</MenuItem>
          <MenuItem value={1}>Highlight Cabinet Ministers</MenuItem>
          <MenuItem value={2}>Highlight Junior Ministers</MenuItem>
          <MenuItem value={3}>Highlight Both</MenuItem> 
          <MenuItem value={4}>Highlight Women</MenuItem>          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">Base Color</InputLabel>
        <Select onChange={onChangeBaseColor} style={color} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <MenuItem value={0}>Party Color</MenuItem>
          <MenuItem value={1}>White</MenuItem>     
        </Select>
      </FormControl>
    </div>
    {/* <List style={{display: "inline-block"}}>
      <ListItem >
        <ListItemText primary={"x: " + optionsExplanation[xOption] + " (25/08/21)"}/>
          </ListItem>
          <ListItem>
            <ListItemText primary={"y: " + optionsExplanation[yOption] + " (25/08/21)"}/>
             </ListItem>
             <ListItem>
            <ListItemText primary={"r: " + optionsExplanation[rOption] + " (25/08/21)"}/>
            </ListItem>
            
    </List> */}
            </div>
        <div className={"scroll-svg-container"}>
        <svg id={"scatterplot-svg"}ref={svgRef} height={heightMargin + margin.top + margin.bottom} width={widthMargin + margin.left + margin.right}>
            <g id="container" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <g className="x-axis" style={color}></g>
            <g className="y-axis" style={color}></g>
            </g>
            </svg>
          </div>
        </div>
    )
}
export default Scatterplot
