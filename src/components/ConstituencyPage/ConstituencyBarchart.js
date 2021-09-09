import * as d3 from 'd3'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Typography, Checkbox, FormControlLabel, Switch, Select, MenuItem, ListSubheader, FormControl, InputLabel, makeStyles } from '@material-ui/core'






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
    "Independent": "black",
    "Green Party": "#99CC33",
    "Social Democrats": "#752F8B",
    "Aontú": "#44532A",
    "Independents 4 Change": "grey"}


export const ConstituencyBarchart = ({conTDsData}) => {




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
const numberOfTopics = (d) => {

  if(!d.writtenQuestions[0].writtenQuestions.topic) return 0;

  return Object.keys(d.writtenQuestions[0].writtenQuestions.topic).length  

}
const averageQuestionTowardsTopic = (d) => {

  if(!d.writtenQuestions[0].writtenQuestions.topic) return 0;

  var topics = Object.keys(d.writtenQuestions[0].writtenQuestions.topic).length  

  var totalQuestions = writtenQuestions(d)

  return totalQuestions / topics
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



    const optionsFunctions =

    [ age,
      followers, 
      retweets, 
      originalTweets, 
      followerEngagementRate, 
      retweetsPerOriginalTweet, 
      polarity, 
      subjectivity,

      writtenQuestions, 
      oralQuestions, 
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


    const classes = useStyles();


    const [justConTDs, setJustConTDs] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)
    const [highlightOption, setHighlightOption] = useState(0)
    const [baseColorOption, setBaseColorOption] = useState(0)
    const [yOption, setYOption] = useState(0)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [height, setHeight] = useState(400)
    const [width, setWidth] = useState(600)
    const [colorMode, setColorMode] = useState("Light Mode")
    const [color, setColor] = useState(null)
    const [fillColor, setFillColor] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState(null)
    const [textColor, setTextColor] = useState(null)

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



      if(windowDimensions.width < 500) {
        setHeight(320)
        setWidth(340)
      }
      if(windowDimensions.width < 400 && windowDimensions.width > 360) {
        setHeight(320)
        setWidth(340)
      }
      if(windowDimensions.width < 470 && windowDimensions.width > 400) {
        setHeight(320)
        setWidth(380)
      }
      if(windowDimensions.width < 680 && windowDimensions.width > 470) {
        setHeight(360)
        setWidth(480)
      }
      if(windowDimensions.width < 800 && windowDimensions.width > 600) {
        setHeight(400)
        setWidth(600)
      }
      if(windowDimensions.width < 980 && windowDimensions.width > 800) {
        setHeight(450)
        setWidth(650)
      }
      if(windowDimensions.width < 1080 && windowDimensions.width > 980) {
        setHeight(450)
        setWidth(650)
      }
      if(windowDimensions.width < 1200 && windowDimensions.width > 1080) {
        setHeight(450)
        setWidth(650)
      }
      if(windowDimensions.width > 1200) {
        setHeight(450)
        setWidth(650)
      }
    }, [windowDimensions])

    const margin = {top: 20, right: 20, bottom: 100, left: 50}
    const heightMargin = height - margin.left - margin.right;
    const widthMargin = width - margin.top - margin.bottom;  


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

    setJustConTDs(conTDsData)

}, [])

useEffect(() => {

    if(!justConTDs) return null;
    setCurrentWeekIndex(justConTDs[0].followerData.length - 1)

}, [justConTDs])

    useEffect(() => {

    if(!justConTDs || !currentWeekIndex) return null;


    if(colorMode == "Dark Mode") {
      partyColors.Independent = "white"
    }
    if(colorMode == "Light Mode") {
      partyColors.Independent = "black"
    }

      function testAge() {

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

        var DOBs = justConTDs.map(d => d.DOB)

        var properDate = DOBs.map(function(d) {
          
        if(!d) {

        function calcAge() {
            var birthday = +Date.now();
            return ~~((Date.now() - birthday) / (31557600000));
          }
          return calcAge()
        }
        

        function calcAge(d) {
          var birthday = +getDate(d);
          return ~~((Date.now() - birthday) / (31557600000));
        }

        return calcAge(d)
          
          
        })

        return properDate
      }


      console.log(testAge())











  console.log(justConTDs.map(d => [d.gender, d.name]))

        const justConTDsHolderBar = justConTDs;

        justConTDsHolderBar.sort(function(a, b) {
         return   d3.ascending(a.party, b.party)
        })

        console.log(justConTDsHolderBar)

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


        const svg = d3.select(svgRef.current);


        const xScale = d3.scaleBand()
                            .domain(justConTDsHolderBar.map(xValue))
                            .range([0, widthMargin])
                            .padding(0.2)


                           


        const yScale = d3.scaleLinear()
                        .domain([0, d3.max(justConTDsHolderBar, yValue)])
                        .range([heightMargin, 0]);



                        console.log(yValue)

        const xAxis = d3.axisBottom(xScale)

        svg
            .select(".x-axis-con-barchart")
            .attr("transform", "translate(0," + heightMargin + ")")
            .transition(2000)
            .call(xAxis)


        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));

    svg
        .select(".y-axis-con-barchart")
        .attr("transform", "translate(0,0)")
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


        var rects = d3.select("#container-con-barchart")
                    .selectAll(".bar")
                    .data(justConTDsHolderBar)
                    .join("rect")
                    .attr("class", "bar")
                    



                rects.transition()
                    .duration(400)
                    .attr("x", d => xScale(xValue(d)))
                    .attr("y", d => yScale(yValue(d)))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => heightMargin - yScale(yValue(d)))
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



        console.log(yScale(yValue(justConTDs[2])))
    }, [justConTDs, colorMode, yOption, highlightOption, baseColorOption, currentWeekIndex, height, width])

    return (
    <div className={"featuredItem"} style={{textAlign: "center", padding: "10px", margin: "10px", background: backgroundColor, textAlign: "center"}}>
            
      <Typography style={color} variant="h5">Interactive Barchart</Typography>
          <div><FormControlLabel style={color}
      control={<Switch value={true} onChange={onChangeColorMode}/>}
      label="Dark Mode"
    /></div>
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={color} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
        <ListSubheader value={0}>General</ListSubheader>
        <MenuItem value={0}>Age</MenuItem>
          <ListSubheader value={1}>Twitter Data, last 7 days</ListSubheader>
          <MenuItem value={1}>Followers</MenuItem>
          <MenuItem value={2}>Retweets</MenuItem>
          <MenuItem value={3}>Original Tweets</MenuItem>          
          <MenuItem value={4}>Followers Per Retweet</MenuItem>
          <MenuItem value={5}>Retweets Per Original Tweet</MenuItem>
          <MenuItem value={6}>Avg. Tweet Polarity</MenuItem>
          <MenuItem value={7}>Avg. Tweet Subjectivity</MenuItem>
          <ListSubheader value={8}>Dáil Questions, 01 July - 01 Sept</ListSubheader>          
          <MenuItem value={8}>Written Questions Asked</MenuItem>
          <MenuItem value={9}>Oral Questions Asked</MenuItem>          
          <MenuItem value={10}>No. of Topics TD had Questions for</MenuItem>
          <MenuItem value={11}>Avg. Questions TD had towards Topic</MenuItem>
          <ListSubheader value={12}>Dáil Divisions, 01 Jan - 01 Sept </ListSubheader>  
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
          <MenuItem disabled>News Mentions</MenuItem>
          <MenuItem disabled>Votes recieved in last election</MenuItem>
          <MenuItem disabled>Avg. Poll</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={fillColor} htmlFor="grouped-select">Highlight</InputLabel>
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
          <MenuItem value={1}>Lightblue</MenuItem>       
        </Select>
      </FormControl>
        <div className={"scroll-svg-container"} style={{marginTop: "16px"}}>
            <svg ref={svgRef} height={heightMargin + margin.top + margin.bottom} width={widthMargin + margin.left + margin.right}>
            <g id="container-con-barchart" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis-con-barchart" style={color}></g>
                <g className="y-axis-con-barchart" style={color}></g>
            </g>
            </svg>
        </div>
    </div>
    )
}
