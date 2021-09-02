import { Typography } from '@material-ui/core'
import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { FormControl, InputLabel, Select, ListSubheader, MenuItem, makeStyles } from '@material-ui/core'
import TopicsBarChart from './TopicsBarChart';
import MinisterQuestionsBarChart from './MinisterQuestionsBarChart';



const useStyles = makeStyles((theme) => ({
    icon: {
      color: "white"
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }

}));



const Issues = ({data}) => {


    const [TDData, setTDData] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(null);
    const [writtenQuestions, setWrittenQuestions] = useState(null);
    const [oralQuestions, setOralQuestions] = useState(null);
    const [mostAskedTopicsByTD, setMostAskedTopicsByTD] = useState(null);
    const [mostAskedTopicsTotal, setMostAskedTopicsTotal] = useState(null);
    const [mostAskedToByTD, setMostAskedToByTD] = useState(null);
    const [mostAskedToTotal, setMostAskedToTotal] = useState(null);
    const [dataOption, setDataOption] = useState(2);



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


    const tooltipData = ["TD's Who Asked", "Total Questions Asked", "TD's Who Asked", "Total Questions Asked"]
    const tooltipData1 = ["Topic", "Topic", "To", "To"]

const onChangeDataOption = (event, child) => {
    setDataOption(event.target.value)
    console.log('Data Option:' + event.target.value);
    console.log(child);
  };

//   const onChangeDataLength = (event, child) => {
//     setDataLength(event.target.value)
//     console.log('Data Length:' + event.target.value);
//     console.log(child);
//   };




    useEffect(() => {


        setTDData(data)

    }, [])


useEffect(() => {

    if(!TDData) return null;


    var tdsNoQuestion = TDData.map(function(d) {

        if(!d.writtenQuestions[1].writtenQuestions.topic && !d.oralQuestions[1].oralQuestions.topic) {
            return true
        } else {
            return false
        }
    })
    
    console.log(tdsNoQuestion)

    console.log(TDData[0].writtenQuestions[0].writtenQuestions.topic)

    console.log(TDData[0].writtenQuestions[0].writtenQuestions.to)

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

console.log(uniqueKeysTo)

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

function toWrittenByTD() {



    var topicWritten = TDData.map(d => d.writtenQuestions[0].writtenQuestions.to)
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

function toWrittenTotal() {



    var topicWritten = TDData.map(d => d.writtenQuestions[0].writtenQuestions.to)
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

console.log(topicWrittenByTD())
console.log(topicWrittenTotal())


    //Horribly named. Fix
    
    setTotalQuestions(summedOral + summedWritten)
    setOralQuestions(summedOral)
    setWrittenQuestions(summedWritten)

    setMostAskedTopicsByTD(topicWrittenByTD())
    setMostAskedTopicsTotal(topicWrittenTotal())
    setMostAskedToByTD(toWrittenByTD())
    setMostAskedToTotal(toWrittenTotal())


}, [TDData])


const margin = {top: 20, right: 20, bottom: 120, left: 70}

const height = 600
const width = 900

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

    const party = d => d.party

    return partyColors[party(most)]

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
        most = sorted[1]
    }

    const party = d => d.party

    return partyColors[party(most)]

}

return partyWithMostTotalContributionsToTopic(topic)

}

function coloredByPartyWithMostUniqueTDContributionsToMinister(minister) {

    function getUniqueTDMinisterContributionOfParty(party) {
    
    
        // var listToCheck = topicWrittenByTD()
    
        var justPartyJustQuestion = TDData.filter(d => d.party == party).filter(d => d.writtenQuestions[0].writtenQuestions.to != undefined)
    
        var testMostByParty = justPartyJustQuestion.map(d => d.writtenQuestions[0].writtenQuestions.to)
    
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
    
    function whichPartyHasMostUniqueContributionsToMinisterByTD() {
    
        const parties = ["Aontú", "Independents", "Green Party", "Labour", "Fianna Fáil", "Fine Gael", "Social Democrats", "People Before Profit", "Independents 4 Change", "Sinn Féin"];
    
        var holderArr = []
    
        for(let i = 0; i < parties.length; i++) {
    
        var holder = getUniqueTDMinisterContributionOfParty(parties[i])
    
        holderArr.push({party: parties[i], holder})
    
        }
    
        return holderArr
    
    }
    
    function partyWithMostUniqueTDContributionsToMinister(minister) {
    
        var partySortedContributions = whichPartyHasMostUniqueContributionsToMinisterByTD() 
    
        var holder = []
    
    
        for(let i = 0; i < partySortedContributions.length; i++) {
    
            var test = partySortedContributions[i].holder.map(function(d) {
                if(d[0] === minister) {
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
    
        const party = d => d.party
    
        return partyColors[party(most)]
    
    }
    
    // return partyWithMostUniqueTDContributionsToMinister(minister)

    return partyWithMostUniqueTDContributionsToMinister(minister)
    
    }


    console.log(coloredByPartyWithMostUniqueTDContributionsToMinister("Taoiseach"))








    const dataOptionArr = [mostAskedTopicsByTD, mostAskedTopicsTotal, mostAskedToByTD, mostAskedToTotal]

    console.log(dataOptionArr[dataOption])

    const xValue = d => d[0]
    const yValue = d => d[1]
    const color = d => coloredByPartyWithMostUniqueTDContributionsToMinister(d[0])


    const xScale = d3.scaleBand()
    .domain(dataOptionArr[dataOption].map(xValue))
    .range([0, width])
    .padding(0.2)

    const svg = d3.select(svgRef.current);

const yScale = d3.scaleLinear()
.domain([0, d3.max(dataOptionArr[dataOption], yValue)])
.range([height, 0]);



console.log(yValue)

const xAxis = d3.axisBottom(xScale).ticks(dataOptionArr[dataOption].length)

svg
.select(".x-axis-issues-bar")
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
.select(".y-axis-issues-bar")
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
.attr("height", d => 600 - yScale(yValue(d)))
.attr("fill", color)


const hoverColor = "#eec42d"


rects
.on('mouseover', function (d, i) {
tooltip
.html(
    `<div>${tooltipData1[dataOption]}: ${d[0]}</div> <div>${tooltipData[dataOption]}: ${d[1].toLocaleString()}</div>`
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






}, [mostAskedTopicsByTD, mostAskedTopicsTotal, mostAskedToByTD, mostAskedToTotal, dataOption])

if(!TDData || !totalQuestions ||!oralQuestions || !writtenQuestions || !mostAskedTopicsByTD || !mostAskedTopicsTotal ||!mostAskedToByTD ||!mostAskedToTotal) return null;

    return (
        <div className="featuredItem" style={{textAlign: "center"}}>
            <Typography variant="h5">Questions Asked</Typography>


            <p>Between 01/07/21 and 30/07/01:</p> 

            <ul>
                <li>
                {writtenQuestions.toLocaleString()} written, and {oralQuestions.toLocaleString()} oral questions were asked.
                </li>
                <li>

                </li>
                </ul>

    <TopicsBarChart data={TDData}/>
    <MinisterQuestionsBarChart data={TDData}/>

        </div>
        

    )
}

export default Issues
