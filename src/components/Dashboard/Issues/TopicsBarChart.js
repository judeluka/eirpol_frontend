import { Typography } from '@material-ui/core'
import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { FormControl, InputLabel, Select, ListSubheader, MenuItem, makeStyles } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    icon: {
      color: "white"
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }

}));



const TopicsBarChart = ({data}) => {


    const [TDData, setTDData] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(null);
    const [writtenQuestions, setWrittenQuestions] = useState(null);
    const [oralQuestions, setOralQuestions] = useState(null);
    const [mostAskedTopicsByTD, setMostAskedTopicsByTD] = useState(null);
    const [mostAskedTopicsTotal, setMostAskedTopicsTotal] = useState(null);
    const [dataOption, setDataOption] = useState(0);
    const [colorOption, setColorOption] = useState(0)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [height, setHeight] = useState(600)
    const [width, setWidth] = useState(900)
    const [colorMode, setColorMode] = useState("Light Mode")
    const [color, setColor] = useState(null)
    const [fillColor, setFillColor] = useState(null)
    const [backgroundColor, setBackgroundColor] = useState(null)
    const [textColor, setTextColor] = useState(null)

    // const [dataLength, setDataLength] = useState(0)


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
          setWidth(680)
        }
        if(windowDimensions.width < 980 && windowDimensions.width > 800) {
          setHeight(500)
          setWidth(680)
        }
        if(windowDimensions.width < 1080 && windowDimensions.width > 980) {
          setHeight(600)
          setWidth(700)
        }
        if(windowDimensions.width < 1200 && windowDimensions.width > 1080) {
          setHeight(600)
          setWidth(800)
        }
        if(windowDimensions.width > 1200) {
          setHeight(600)
          setWidth(900)
        }
      }, [windowDimensions])
      
      
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


    const tooltipData = ["TD's Who Asked", "Total Questions Asked",]
    const tooltipData1 = ["Topic", "Topic"]

const onChangeDataOption = (event, child) => {
    setDataOption(event.target.value)
    console.log('Data Option:' + event.target.value);
    console.log(child);
  };

  const onChangeColorOption = (event, child) => {
    setColorOption(event.target.value)
    console.log('Color Option:' + event.target.value);
    console.log(child);
  };

    useEffect(() => {


        setTDData(data)

    }, [])


useEffect(() => {

    if(!TDData) return null;

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

    var toOral = TDData.map(d => d.oralQuestions[0].oralQuestions.topic)
    var filteredOral = toOral.filter(d => d != undefined)
    var summedOral = filteredOral.map(d => sumValues(d)).reduce((a, b) => a + b);
    var toWritten = TDData.map(d => d.writtenQuestions[0].writtenQuestions.to)

    //Who didn't ask any questions in period, minus ministers, minus cc and eoghan murphy
    var whoDidnt = TDData.map(function(d){

    if(!d.writtenQuestions[1].writtenQuestions.to && !d.oralQuestions[1].oralQuestions.to && d.member_offices[0].length === 0) {
            return d.name
        }
    }).filter(d => d != undefined && d != "Seán Ó Fearghaíl" && d != "Eoghan Murphy") 

    var filteredWrittenTo = toWritten.filter(d => d != undefined) 
    var summedWritten = filteredWrittenTo.map(d => sumValues(d)).reduce((a, b) => a + b);
    var uniqueKeysTo = Object.keys(filteredWrittenTo.reduce(function(result, obj) {
        return Object.assign(result, obj);
      }, {}))

function topicWrittenByTD() {


    var topicWritten = TDData.map(d => d.writtenQuestions[0].writtenQuestions.topic)
    var filteredWrittenTopic = topicWritten.filter(d => d != undefined) 
    var summedWritten = filteredWrittenTopic.map(d => sumValues(d)).reduce((a, b) => a + b);

    //Topics asked by TDs
    var workingWithAsked = filteredWrittenTopic.map(d => Object.entries(d)).flat()
    var askedByTopicsTDs = workingWithAsked.map(function(d) {
        return d[0]
    })

    const mapAskedTopicsTD= askedByTopicsTDs.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

    var toSortAskedTopicsTD = [...mapAskedTopicsTD.entries()]

    toSortAskedTopicsTD.sort(function(a, b) {
        return  b[1]-a[1]
     })
     if(toSortAskedTopicsTD.length > 25) {
         toSortAskedTopicsTD.length = 25
       }

       return toSortAskedTopicsTD


}

function topicWrittenTotal() {

    var topicWritten = TDData.map(d => d.writtenQuestions[0].writtenQuestions.topic)
    var filteredWrittenTopic = topicWritten.filter(d => d != undefined) 

    //Topics asked by TDs
    var workingWithAsked = filteredWrittenTopic.map(d => Object.entries(d)).flat()
    var askedByTopicsTDs = workingWithAsked.map(function(d) {
        return d
    })

    const mapTotal = askedByTopicsTDs.reduce((acc, e) => acc.set(e[0], (acc.get(e[0]) || 0) + e[1]), new Map())

    var toSortAskedTopicsTD = [...mapTotal.entries()]

    toSortAskedTopicsTD.sort(function(a, b) {
        return  b[1]-a[1]
     })
     if(toSortAskedTopicsTD.length > 25) {
         toSortAskedTopicsTD.length = 25
       }

    return toSortAskedTopicsTD

}

    //Horribly named. Fix
    
    setTotalQuestions(summedOral + summedWritten)
    setOralQuestions(summedOral)
    setWrittenQuestions(summedWritten)

    setMostAskedTopicsByTD(topicWrittenByTD())
    setMostAskedTopicsTotal(topicWrittenTotal())


}, [TDData])


const margin = {top: 20, right: 20, bottom: 100, left: 70}

const heightMargin = height - margin.left - margin.right;
const widthMargin = width - margin.top - margin.bottom;  

const svgRef= useRef()

const classes = useStyles();

useEffect(() => {

    if(!mostAskedTopicsByTD || !mostAskedTopicsTotal) return null;


function coloredByPartyWithMostUniqueTDContributionsToTopic(topic) {

function getUniqueTDTopicContributionOfParty(party) {


    // var listToCheck = topicWrittenByTD()

    var justPartyJustQuestion = TDData.filter(d => d.party == party).filter(d => d.writtenQuestions[0].writtenQuestions.topic != undefined)

    var testMostByParty = justPartyJustQuestion.map(d => d.writtenQuestions[0].writtenQuestions.topic)

    var sumTestParty = testMostByParty.map(d => Object.entries(d)).flat()

    var sumTestPartyFlat = sumTestParty.map(function(d) {
        return d[0]
    })

    const mapAskedTopicsTD = sumTestPartyFlat.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())

    var toSortAskedTopicsTD = [...mapAskedTopicsTD.entries()]

    toSortAskedTopicsTD.sort(function(a, b) {
        return  b[1]-a[1]
     })

    return toSortAskedTopicsTD

}

function whichPartyHasMostUniqueContributionsToTopicByTD() {

    const parties = ["Aontú", "Independents", "Green Party", "Labour", "Fianna Fáil", "Fine Gael", "Social Democrats", "People Before Profit", "Independents 4 Change", "Sinn Féin"];

    var holderArr = []

    for(let i = 0; i < parties.length; i++) {

    var holder = getUniqueTDTopicContributionOfParty(parties[i])

    holderArr.push({party: parties[i], holder})

    }

    return holderArr

}

function partyWithMostUniqueTDContributionsToTopic(topic) {

    var partySortedContributions = whichPartyHasMostUniqueContributionsToTopicByTD() 

    var holder = []

    const party = d => d.party

    for(let i = 0; i < partySortedContributions.length; i++) {

        var test = partySortedContributions[i].holder.map(function(d) {
            if(d[0] === topic) {
                return d
            }
        }).filter(d => d != undefined)


        holder.push({party: partySortedContributions[i].party, test})


    }

    var filterEmpty = holder.filter(d => d.test.length != 0)

    var sorted = filterEmpty.sort((a, b) => b.test[0][1] - a.test[0][1])

    var most = sorted[0]

    if(sorted.length > 1) {
        most = sorted[0]
    }

    var arr = [partyColors[party(most)], most.party, most.test[0][1]]


    return arr

}

return partyWithMostUniqueTDContributionsToTopic(topic)

}

function coloredByPartyWithMostContributionsToTopic(topic) { 

function getTotalContributionOfPartyToTopic(party) {


    // var listToCheck = topicWrittenByTD()

    var justPartyJustQuestion = TDData.filter(d => d.party == party).filter(d => d.writtenQuestions[0].writtenQuestions.topic != undefined)

    var testMostByParty = justPartyJustQuestion.map(d => d.writtenQuestions[0].writtenQuestions.topic)

    var sumTestParty = testMostByParty.map(d => Object.entries(d)).flat()

    var sumTestPartyFlat = sumTestParty.map(function(d) {
        return d
    })

    const mapAskedTopicsTD = sumTestPartyFlat.reduce((acc, e) => acc.set(e[0], (acc.get(e[0]) || 0) + e[1]), new Map())

    var toSortAskedTopicsTD = [...mapAskedTopicsTD.entries()]

    toSortAskedTopicsTD.sort(function(a, b) {
        return  b[1]-a[1]
     })

    return toSortAskedTopicsTD

}

function whichPartyHasMostTotalContributionsToTopic() {

    const parties = ["Aontú", "Independents", "Green Party", "Labour", "Fianna Fáil", "Fine Gael", "Social Democrats", "People Before Profit", "Independents 4 Change", "Sinn Féin"];

    var holderArr = []

    for(let i = 0; i < parties.length; i++) {

    var holder = getTotalContributionOfPartyToTopic(parties[i])

    holderArr.push({party: parties[i], holder})

    }

    return holderArr

}

function partyWithMostTotalContributionsToTopic(topic) {

    var partySortedContributions = whichPartyHasMostTotalContributionsToTopic() 

    var holder = []

    const party = d => d.party


    for(let i = 0; i < partySortedContributions.length; i++) {

        var test = partySortedContributions[i].holder.map(function(d) {
            if(d[0] == topic) {
                return d
            }
        }).filter(d => d != undefined)


        holder.push({party: partySortedContributions[i].party, test})


    }

    var filterEmpty = holder.filter(d => d.test.length != 0)

    var sorted = filterEmpty.sort((a, b) => b.test[0][1] - a.test[0][1])

    var most = sorted[0]

    if(sorted.length > 1) {
        most = sorted[0]
    }

    var arr = [partyColors[party(most)], most.party, most.test[0][1]]


    return arr

}

return partyWithMostTotalContributionsToTopic(topic)

}

function coloredByPartyWithTDWhoHasContributedMostToTopic(topic) { 

    function getTDWhoHasContributedMostToTopic(topic) {

        const parties = ["Aontú", "Independents", "Green Party", "Labour", "Fianna Fáil", "Fine Gael", "Social Democrats", "People Before Profit", "Independents 4 Change", "Sinn Féin"];

        const party = d => d[0]
    
        var justQuestionJustTopic = TDData.filter(d => d.writtenQuestions[0].writtenQuestions.topic != undefined).filter(d => d.writtenQuestions[0].writtenQuestions.topic[topic] != undefined)

        var arrToSort = justQuestionJustTopic.map(function(d) {
    
        var amount = d.writtenQuestions[0].writtenQuestions.topic[topic];
        var party = d.party
        var name = d.name
    
          return  [party, amount, name]
    
    
        })
    
        var arrSorted = arrToSort.sort((a,b) => b[1] - a[1])

        var most = arrSorted[0]

        most.unshift(partyColors[party(most)])

        return most

    }

    return getTDWhoHasContributedMostToTopic(topic)
    
    }

console.log(coloredByPartyWithTDWhoHasContributedMostToTopic("Covid-19 Pandemic"))

    const dataOptionArr = [mostAskedTopicsByTD, mostAskedTopicsTotal]

    const colorOptionArr = [coloredByPartyWithMostUniqueTDContributionsToTopic, coloredByPartyWithMostContributionsToTopic, coloredByPartyWithTDWhoHasContributedMostToTopic]

    const xValue = d => d[0]
    const yValue = d => d[1]
    const color = d => colorOptionArr[colorOption](d[0])


    const xScale = d3.scaleBand()
    .domain(dataOptionArr[dataOption].map(xValue))
    .range([0, widthMargin])
    .padding(0.2)

    const svg = d3.select(svgRef.current);

const yScale = d3.scaleLinear()
.domain([0, d3.max(dataOptionArr[dataOption], yValue)])
.range([heightMargin, 0]);



console.log(yValue)

const xAxis = d3.axisBottom(xScale).ticks(dataOptionArr[dataOption].length)

svg
.select(".x-axis-topics-bar")
.attr("transform", "translate(0," + heightMargin + ")")
.transition(2000)
.call(xAxis)
.selectAll("text")  
.attr("font-size", "1px")
.attr("dx", "-.8em")
.attr("dy", ".15em")
.attr("transform", "rotate(-25)");


const yAxis = d3.axisLeft(yScale);

svg
.select(".y-axis-topics-bar")
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


var rects = d3.select("#container-topics")
.selectAll(".bar")
.data(dataOptionArr[dataOption])
.join("rect")
.attr("class", "bar")

rects.transition()
.duration(400)
.attr("x", d => xScale(xValue(d)))
.attr("y", d => yScale(yValue(d)))
.attr("width", xScale.bandwidth())
.attr("height", d => heightMargin - yScale(yValue(d)))
.attr("fill", d=> color(d)[0])


const hoverColor = "#eec42d"






rects
.on('mouseover', function (d, i) {
    
if(color(d).length == 4) {


tooltip
.html(
    `<div>${tooltipData1[dataOption]}: ${d[0]}</div> 
    <div>${tooltipData[dataOption]}: ${d[1].toLocaleString()}</div>
    <div>${color(d)[3]} had ${color(d)[2]} questions</div>
    `
)
    .style('visibility', 'visible');
    d3.select(this).transition().attr('fill', hoverColor);


} else if(colorOption === 0) {

    tooltip
    .html(
        `<div>${tooltipData1[dataOption]}: ${d[0]}</div> 
        <div>${tooltipData[dataOption]}: ${d[1].toLocaleString()}</div>
        <div>${color(d)[2]} ${color(d)[1]} TD's contributed to this topic</div>
        `
    )
        .style('visibility', 'visible');
        d3.select(this).transition().attr('fill', hoverColor);


}


else {


    tooltip
    .html(
        `<div>${tooltipData1[dataOption]}: ${d[0]}</div> 
        <div>${tooltipData[dataOption]}: ${d[1].toLocaleString()}</div>
        <div>${color(d)[1]} had ${color(d)[2]} questions</div>
        `
    )
        .style('visibility', 'visible');
        d3.select(this).transition().attr('fill', hoverColor);
}



})
.on('mousemove', function () {
    tooltip
    .style('top', d3.event.pageY - 10 + 'px')
    .style('left', d3.event.pageX + 10 + 'px');
})
.on('mouseout', function () {
    tooltip.html(``).style('visibility', 'hidden');
    d3.select(this).transition().attr('fill', d => color(d)[0]);
}); 

}, [mostAskedTopicsByTD, mostAskedTopicsTotal, dataOption, colorOption, height, width, colorMode])

if(!TDData || !totalQuestions ||!oralQuestions || !writtenQuestions || !mostAskedTopicsByTD || !mostAskedTopicsTotal) return null;

    return (
        <div className="featuredItem" style={{textAlign: "center"}}>
                        <Typography variant="h5">Topics</Typography>
                        <p style={{marginTop: 10, marginBottom: 10}}>Showing top 25 out of 590.</p>

        <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Data-Value</InputLabel>
        <Select onChange={onChangeDataOption} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Data Value</ListSubheader>
          <MenuItem value={0}>Topics Asked By Most Unique TDs</MenuItem>
          <MenuItem value={1}>Topics Asked Most Overall</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Color-Value</InputLabel>
        <Select onChange={onChangeColorOption} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Color Data</ListSubheader>
          <MenuItem value={0}>Party with most unique TD Contributions</MenuItem>
          <MenuItem value={1}>Party with most total questions</MenuItem>
          <MenuItem value={2}>TD with most questions</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Data Amount</InputLabel>
        <Select onChange={onChangeDataLength} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Top 20</MenuItem>
          <MenuItem value={1}>Show All</MenuItem>
        </Select>
      </FormControl> */}
            <div className={"scroll-svg-container"}>
            <svg ref={svgRef} height={heightMargin + margin.top + margin.bottom} width={widthMargin + margin.left + margin.right}>
            <g id="container-topics" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
                <g className="x-axis-topics-bar"></g>
                <g className="y-axis-topics-bar"></g>
            </g>
            </svg>
        </div> 
        </div>
    )
}

export default TopicsBarChart