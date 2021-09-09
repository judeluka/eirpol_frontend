import React, {useRef, useEffect, useState} from 'react'
import * as d3 from 'd3'
import con_boundaries from './boundary.geo.json'
import { geoMercator, geoPath } from 'd3'
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


const TotalAndAverageConstituencyMap = ({data}) => {


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


    const [TDData, setTDData] = useState(null)
    const [justParty, setJustParty] = useState(0)
    const [funcOption, setFuncOption] = useState(0)
    const [colorFunc, setColorFunc] = useState(1)
    const [boundaries, setBoundaries] = useState(null)


    const classes = useStyles();


    const justPartyArr = ["Sinn Féin", "Fine Gael", "Fianna Fáil", "Labour Party", "Solidarity - People Before Profit", "Independent", "Green Party","Social Democrats", "Aontú", "Independents 4 Change"]

    const margin = {top: 50, right: 20, bottom: 50, left: 20}
    const height = 700
    const width = 600
    const svgRef = useRef()

    const onChangeFuncOption = (event, child) => {
        setFuncOption(event.target.value)
        console.log('Func Option:' + event.target.value);
        console.log(child);
      };

      
    const onChangeColorFunc = (event, child) => {
        setColorFunc(event.target.value)
        console.log('Func Option:' + event.target.value);
        console.log(child);
      };

      const onChangeJustParty = (event, child) => {
        setJustParty(event.target.value)
        console.log('Just Party:' + event.target.value);
        console.log(child);
      };


    useEffect(() => {

        setTDData(data)

    }, [])


useEffect(() => {
    
const clone = JSON.parse(JSON.stringify(con_boundaries))
setBoundaries(clone)


}, [])




useEffect(() => {

    if(!boundaries || !TDData) return null;
    
    
    
    

function getMemberConstituency() {


    var tdConstituencyObj = TDData.map(function(d) {


        var indexOfLastSlash = d.member_constituency_uri[0].lastIndexOf('/') + 1;      
        var clean = d.member_constituency_uri[0].substr(indexOfLastSlash).replaceAll('-', ' ');
        return {TD: d, constituencyName: clean}

    })  
    
    return tdConstituencyObj;

}

function getBoundaryConstituency() {
    
    var constituencyObj = boundaries.features.map(function(d) {
        
        var constituencyNameVar = d.properties.CON_SEAT_.replaceAll(/[^A-Zú]/gi, ' ').replace(/\s*$/,'');
        var constituencyCodeVar = d.properties.OBJECTID_1;

        return {constituencyCode: constituencyCodeVar, constituencyName: constituencyNameVar};

});

    return constituencyObj;
}

function storeTDsByConstituency() {



    var members = getMemberConstituency()
    var boundaries = getBoundaryConstituency()


    var arr = boundaries.map(function(d) {


        var tdArr = []


        for(let i = 0; i < members.length; i++) {

            if(d.constituencyName === "Dun Laoghaire" && members[i].constituencyName === "Dún Laoghaire") {

                tdArr.push(members[i])

            }

            if(d.constituencyName === members[i].constituencyName) {
                tdArr.push(members[i])
            }
        }

        return [d.constituencyName, tdArr]
    })

return arr


}

//Functions to store as state:
// function colorOfPartyWithMajoritySeats(i) {

//     var conTDs = storeTDsByConstituency()

//     var partiesPresent = conTDs[i][1].map(d => d.TD.party)

//     var map = partiesPresent.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

//     var partyAndValue = [...map.entries()];

//     var sortedByMajority = partyAndValue.sort((a,b) => b[1] - a[1])


//     console.log(sortedByMajority[0][1])

//     if(sortedByMajority[0][1] === sortedByMajority[1][1]) {
//         return ["Split", "Split", "lightgrey", 0]
//     }

//     return [0, sortedByMajority[0][0], partyColors[sortedByMajority[0][0]], sortedByMajority[0][1]]
// }

// for(let i = 0; i < boundaries.features.length; i++) {

//     var color = colorOfPartyWithMajoritySeats(i)

//     boundaries.features[i].properties.color = color


// }


if(funcOption == 0) {
function mostSeats(i) {

    var conTDs = storeTDsByConstituency()

    var partiesPresent = conTDs[i][1].map(d => d.TD.party)


    return [0, "grey", "grey", conTDs[i][1].length]
}

for(let i = 0; i < boundaries.features.length; i++) {

    var color = mostSeats(i)

    boundaries.features[i].properties.color = color


}


} else if (funcOption == 1) {
    function womenPresent(i) {

        var conTDs = storeTDsByConstituency()

        var justWomen = conTDs[i][1].map(function(d) {


        if(d.TD.gender == "Female") {
            return d.TD
        }

        }).filter(d => d != undefined)

        console.log(justWomen)

        return [0, "grey", "grey", justWomen.length]


    }

    for(let i = 0; i < boundaries.features.length; i++) {

        var color = womenPresent(i)
    
        boundaries.features[i].properties.color = color
      
    }


} else if (funcOption == 2) {
   function averagePolarity(i) {

        var conTDs = storeTDsByConstituency()

        var justTDs = conTDs[i][1].map(d => d.TD)

        var justTDsOnTwitter = justTDs.filter(d => d.sentimentData != undefined) 

        var averagePolarity = justTDsOnTwitter.map(d => d.sentimentData[3].polarity).reduce((a, b) => a + b) / justTDsOnTwitter.length



        return [0, "grey", "grey", averagePolarity * -1]
    
}

for(let i = 0; i < boundaries.features.length; i++) {

    var color = averagePolarity(i)

    boundaries.features[i].properties.color = color
  
}

} else if (funcOption == 3) {
    function averageSubjectivity (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)
 
         var justTDsOnTwitter = justTDs.filter(d => d.sentimentData != undefined) 
 
         var averageSubjectivity = justTDsOnTwitter.map(d => d.sentimentData[3].subjectivity).reduce((a, b) => a + b) / justTDsOnTwitter.length
 
 
         return [0, "grey", "grey", averageSubjectivity * -1]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = averageSubjectivity(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 4) {
    function averageFollowers (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)
 
         var justTDsOnTwitter = justTDs.filter(d => d.followerData != undefined).filter(d => d.followerData.length != 0)

 
         var averageFollowers = justTDsOnTwitter.map(d => d.followerData[3].followers).reduce((a, b) => a + b) / justTDsOnTwitter.length

         console.log(averageFollowers)
 
 
         return [0, "grey", "grey", averageFollowers]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = averageFollowers(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 5) {
    function averageRetweets (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)
 
         var justTDsOnTwitter = justTDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

         var averageRetweets = justTDsOnTwitter.map(d => d.retweetData[3].retweets).reduce((a, b) => a + b) / justTDsOnTwitter.length
 
 
         return [0, "grey", "grey", averageRetweets]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = averageRetweets(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 6) {
    function averageOriginalTweets (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)
 
         var justTDsOnTwitter = justTDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

         var averageOriginalTweets = justTDsOnTwitter.map(d => d.retweetData[3].original_tweets).reduce((a, b) => a + b) / justTDsOnTwitter.length
 
 
         return [0, "grey", "grey", averageOriginalTweets]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = averageOriginalTweets(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 7) {
    function totalRetweetsPerOriginalTweet (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)
 
         var justTDsOnTwitter = justTDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

         var totalTweets = justTDsOnTwitter.map(d => d.retweetData[3].original_tweets).reduce((a, b) => a + b)

         var totalRetweets = justTDsOnTwitter.map(d => d.retweetData[3].retweets).reduce((a, b) => a + b)

         var totalRetweetsPerOriginalTweet = totalRetweets / totalTweets
 
 
         return [0, "grey", "grey", totalRetweetsPerOriginalTweet]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalRetweetsPerOriginalTweet(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 8) {

    function totalRetweetsPerFollower (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)
 
         var justTDsOnTwitter = justTDs.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0).filter(d => d.followerData != undefined).filter(d => d.followerData.length != 0)

         var totalFollowers = justTDsOnTwitter.map(d => d.followerData[3].followers).reduce((a, b) => a + b)

         var totalRetweets = justTDsOnTwitter.map(d => d.retweetData[3].retweets).reduce((a, b) => a + b)

         var totalRetweetsPerFollower = totalRetweets / totalFollowers
 
 
         return [0, "grey", "grey", totalRetweetsPerFollower]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalRetweetsPerFollower(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 9) {
    function totalWrittenQuestionsAsked (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

        var totalWrittenQuestions = justTDs.map(function(d) {


            if(d.writtenQuestions[0].writtenQuestions.to != undefined) {
                return sumValues(d.writtenQuestions[0].writtenQuestions.to)
            }

            return 0

        }).reduce((a,b) => a + b)


        console.log(totalWrittenQuestions)

 
 
         return [0, "grey", "grey", totalWrittenQuestions]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalWrittenQuestionsAsked(i)
 
     boundaries.features[i].properties.color = color
   
 }
} else if (funcOption == 10) {

    function totalOralQuestionsAsked (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

        var totalOralQuestions = justTDs.map(function(d) {


            if(d.oralQuestions[0].oralQuestions.to != undefined) {
                return sumValues(d.oralQuestions[0].oralQuestions.to)
            }

            return 0

        }).reduce((a,b) => a + b)

        //  var justTDsOnTwitter = justTDs.filter(d => d.oralQuestions != undefined).filter(d => d.oralQuestions[0].oralQuestions.to != undefined)

        //  var totalOralQuestions = sumValues(justTDsOnTwitter.map(d => sumValues(d.oralQuestions[0].oralQuestions.to)))

        console.log(totalOralQuestions)

 
 
         return [0, "grey", "grey", totalOralQuestions]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalOralQuestionsAsked(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 11) {

    function totalQuestionsAsked (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        const sumValues = obj => Object.values(obj).reduce((a,b) => a + b) 

        var totalOralQuestions = justTDs.map(function(d) {

            if(d.oralQuestions[0].oralQuestions.to != undefined) {
                return sumValues(d.oralQuestions[0].oralQuestions.to)
            }

            return 0

        }).reduce((a,b) => a + b)


        var totalWrittenQuestions = justTDs.map(function(d) {


            if(d.writtenQuestions[0].writtenQuestions.to != undefined) {
                return sumValues(d.writtenQuestions[0].writtenQuestions.to)
            }

            return 0

        }).reduce((a,b) => a + b)


        var totalQuestions = totalOralQuestions + totalWrittenQuestions

        //  var justTDsOnTwitter = justTDs.filter(d => d.oralQuestions != undefined).filter(d => d.oralQuestions[0].oralQuestions.to != undefined)

        //  var totalOralQuestions = sumValues(justTDsOnTwitter.map(d => sumValues(d.oralQuestions[0].oralQuestions.to)))

 
 
         return [0, "grey", "grey", totalQuestions]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalQuestionsAsked(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 12) {

    function totalTimesOnWinningSide (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        var totalTimesOnWinningSide = justTDs.map(function(d) {

            return d.voteData[0].onWinningSide

        }).reduce((a,b) => a + b)

         return [0, "grey", "grey", totalTimesOnWinningSide]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalTimesOnWinningSide(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 13) {

    function totalTimesOnLosingSide (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        var totalTimesOnLosingSide = justTDs.map(function(d) {

            return d.voteData[0].onLosingSide

        }).reduce((a,b) => a + b)

         return [0, "grey", "grey", totalTimesOnLosingSide]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = totalTimesOnLosingSide(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 14) {

    function averageTimesOnWinningSide (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        var averageTimesOnWinningSide = justTDs.map(function(d) {

            return d.voteData[0].onWinningSide

        }).reduce((a,b) => a + b) / justTDs.length




         return [0, "grey", "grey", averageTimesOnWinningSide]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = averageTimesOnWinningSide(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
} else if (funcOption == 15) {

    function averageTimesOnLosingSide (i) {
 
         var conTDs = storeTDsByConstituency()
 
         var justTDs = conTDs[i][1].map(d => d.TD)

        var averageTimesOnLosingSide = justTDs.map(function(d) {

            return d.voteData[0].onLosingSide

        }).reduce((a,b) => a + b) / justTDs.length




         return [0, "grey", "grey", averageTimesOnLosingSide]
     
 }
 
 for(let i = 0; i < boundaries.features.length; i++) {
 
     var color = averageTimesOnLosingSide(i)
 
     boundaries.features[i].properties.color = color
   
 }
 
}





    const colorValObj = d => d.properties.color

    const heatColorFunc = d3.scaleSequential()
        .interpolator( d3.interpolateRdYlBu)
        .domain([d3.max(boundaries.features, d=>d.properties.color[3]),d3.min(boundaries.features, d=>d.properties.color[3])])

console.log(boundaries)

    //colorValObj has party color at [2]. 


    const svg = d3.select(svgRef.current);

    const projection = geoMercator().scale(5300)
    // Center the Map in Colombia
    .center([-7.6, 53.6921])
    .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection)

    svg.selectAll(".total-avg-constituency")
        .data(boundaries.features)
        .join("path")
        .attr("class", "total-avg-constituency")
        .transition()
        .duration(400)
        .attr("fill", function(d) {

            if(colorFunc == 0) {
               return colorValObj(d)[2] 
            } else if (colorFunc == 1) {
                return heatColorFunc(d.properties.color[3])
            }
        })
        .style("stroke", "darkgreen")
        .style("stroke-width", "0.5px")
        .attr("d", feature => pathGenerator(feature))


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


        d3.selectAll(".total-avg-constituency")
            .on('mouseover', function (d, i) {

            if(funcOption == 0) {


            tooltip
                .html(
                    `<div>${d.properties.CON_SEAT_} </div>
                    <div>Party with Majority: ${colorValObj(d)[1]} </div>
                    <div>Seats They Hold: ${colorValObj(d)[3]}</div>`
                )
                    .style('visibility', 'visible');
                    d3.select(this).transition().attr('fill', hoverColor);
            }

            if(funcOption == 1) {


                tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party with Majority: ${colorValObj(d)[1]} </div>
                        <div>Seats They Hold: ${colorValObj(d)[3]}</div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
            }
            if(funcOption == 2) {

                tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party with Majority: ${colorValObj(d)[1]} </div>
                        <div>Average Polarity: ${(colorValObj(d)[3] * -1).toLocaleString()}</div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
            }

            if(funcOption == 3) {

                tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party with Majority: ${colorValObj(d)[1]} </div>
                        <div>Average Subjectivity: ${(colorValObj(d)[3] * -1).toLocaleString()}</div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
            } 
            if(funcOption == 4) {

                tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party with Majority: ${colorValObj(d)[1]} </div>
                        <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
            }
            if(funcOption == 5) {

                tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party with Majority: ${colorValObj(d)[1]} </div>
                        <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
            }
            if(funcOption == 6) {

                tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party with Majority: ${colorValObj(d)[1]} </div>
                        <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 7) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 8) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 9) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 10) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 12) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 13) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 14) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 15) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 16) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 17) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
                        )
                            .style('visibility', 'visible');
                            d3.select(this).transition().attr('fill', hoverColor);
                }
                if(funcOption == 18) {

                    tooltip
                        .html(
                            `<div>${d.properties.CON_SEAT_} </div>
                            <div>Party with Majority: ${colorValObj(d)[1]} </div>
                            <div>Average Subjectivity: ${(colorValObj(d)[3]).toLocaleString()}</div>`
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
                    d3.select(this).transition()        .attr("fill", function(d) {
       
                        if(colorFunc == 0) {
                            return colorValObj(d)[2] 
                         } else if (colorFunc == 1) {
                             return heatColorFunc(d.properties.color[3])
                         }
            
                    });
                });

}, [boundaries, TDData, justParty, funcOption, colorFunc])

if(!TDData) return null;

    return (
        <div className="featuredItem" style={{textAlign: "center"}}>   
        <Typography variant="h5">Meta Data</Typography>         
        <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Party</InputLabel>
              <Select onChange={onChangeFuncOption} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <ListSubheader>Data</ListSubheader>
                <MenuItem value={0}>Number of Seats</MenuItem>
                <MenuItem value={1}>Women in Constituency</MenuItem>  
                <MenuItem value={2}>Average Polarity</MenuItem>
                <MenuItem value={3}>Average Subjectivity</MenuItem> 
                <MenuItem value={4}>Average Followers</MenuItem> 
                <MenuItem value={5}>Average Retweets</MenuItem>     
                <MenuItem value={6}>Average Original Tweets</MenuItem>         
                <MenuItem value={7}>Total Retweet to Original Tweet Ratio</MenuItem>  
                <MenuItem value={8}>Total Follower to Retweet Ratio</MenuItem>  
                <MenuItem value={9}>Total Written Questions Asked</MenuItem>  
                <MenuItem value={10}>Total Oral Questions Asked</MenuItem>  
                <MenuItem value={11}>Total Questions Asked</MenuItem> 
                <MenuItem value={12}>Total Times On Winning Side</MenuItem> 
                <MenuItem value={13}>Total Times On Losing Side</MenuItem> 
                <MenuItem value={14}>Average Times On Winning Side</MenuItem> 
                <MenuItem value={15}>Average Times On Losing Side</MenuItem> 
                {/* <MenuItem value={4}>Solidarity - People Before Profit</MenuItem>
                <MenuItem value={5}>Independent</MenuItem>       
                <MenuItem value={6}>Green Party</MenuItem>
                <MenuItem value={7}>Social Democrats</MenuItem>
                <MenuItem value={8}>Aontú</MenuItem>
                <MenuItem value={9}>Independents 4 Change</MenuItem>               */}
              </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Color Value</InputLabel>
              <Select onChange={onChangeColorFunc} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <ListSubheader>In Constituency...</ListSubheader>
                <MenuItem value={1}>Heatmap</MenuItem>  
              </Select>
        </FormControl>
        {/* <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Color Value</InputLabel>
              <Select onChange={onChangeColorFunc} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <ListSubheader>In Constituency...</ListSubheader>
                <MenuItem value={0}>Color by Party</MenuItem>
                <MenuItem value={1}>Heatmap</MenuItem>  
              </Select>
        </FormControl> */}
            <div className={"scroll-svg-container"}>
            <svg ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}></svg>
        </div>
        </div>

    )
}

export default TotalAndAverageConstituencyMap
