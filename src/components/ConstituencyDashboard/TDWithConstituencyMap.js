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


const TDWithConstituencyMap = ({data}) => {


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
    const [boundaries, setBoundaries] = useState(null)
    const [justParty, setJustParty] = useState(1)
    const [funcOption, setFuncOption] = useState(0)
    const [colorFunc, setColorFunc] = useState(0)
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [height, setHeight] = useState(700)
    const [width, setWidth] = useState(600)
    const [scale, setScale] = useState(5300)
    const [centerLatLong, setCenterLatLong] = useState({lat: -8.4, long: 53.7})


        
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


    useEffect(() => {


        if(windowDimensions.width < 550) {
            setHeight(400)
            setWidth(300)
            setScale(3000)
          }

        if(windowDimensions.width < 600 && windowDimensions.width > 550) {
            setHeight(550)
            setWidth(500)
            setScale(5500)
          }

        if(windowDimensions.width < 750 && windowDimensions.width > 600) {
          setHeight(600)
          setWidth(550)
        }

      }, [windowDimensions])

    const classes = useStyles();


    const justPartyArr = ["Sinn Féin", "Fine Gael", "Fianna Fáil", "Labour Party", "Solidarity - People Before Profit", "Independent", "Green Party","Social Democrats", "Aontú", "Independents 4 Change"]

    const margin = {top: 50, right: 20, bottom: 50, left: 20}
    const heightMargin = height - margin.left - margin.right;
    const widthMargin = width - margin.top - margin.bottom;  
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


    useEffect(() => {

        setTDData(data)

        const clone = JSON.parse(JSON.stringify(con_boundaries))
        setBoundaries(clone)

    }, [])







useEffect(() => {

    if(!boundaries || !TDData) return null;

    const boundariesClone = boundaries;
    
    
    
    

function getMemberConstituency() {


    var tdConstituencyObj = TDData.map(function(d) {


        var indexOfLastSlash = d.member_constituency_uri[0].lastIndexOf('/') + 1;      
        var clean = d.member_constituency_uri[0].substr(indexOfLastSlash).replaceAll('-', ' ');
        return {TD: d, constituencyName: clean}

    })  
    
    return tdConstituencyObj;

}

function getBoundaryConstituency() {
    
    var constituencyObj = boundariesClone.features.map(function(d) {
        
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



// for(let i = 0; i < boundaries.features.length; i++) {

//     var color = colorOfPartyWithMajoritySeats(i)

//     boundaries.features[i].properties.color = color


// }


if(funcOption == 0) {

function colorOfPartyOfTDWithMostFollowers(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.followerData != undefined).filter(d => d.followerData.length != 0)

    console.log(tdsFiltered)

    var mostFollowedSorted = tdsFiltered.sort((a, b) => b.followerData[3].followers - a.followerData[3].followers)

    var mostFollowedTDParty = mostFollowedSorted[0].party

    return [mostFollowedSorted[0].name, mostFollowedSorted[0].party, partyColors[mostFollowedTDParty], mostFollowedSorted[0].followerData[3].followers]

}

for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostFollowers(i)

    boundariesClone.features[i].properties.color = color


}

} else if(funcOption == 1) {
   function colorOfPartyOfTDWithMostRetweets(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

    console.log(tdsFiltered)

    var mostRetweetedSorted = tdsFiltered.sort((a, b) => b.retweetData[3].retweets - a.retweetData[3].retweets)

    var mostRetweetedTDParty = mostRetweetedSorted[0].party

    return [mostRetweetedSorted[0].name, mostRetweetedSorted[0].party, partyColors[mostRetweetedTDParty], mostRetweetedSorted[0].retweetData[3].retweets]

} 

for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostRetweets(i)

    boundariesClone.features[i].properties.color = color


}

} else if(funcOption == 2) {

    function colorOfPartyOfTDWithMostOriginalTweets(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.retweetData != undefined).filter(d => d.retweetData.length != 0)

    console.log(tdsFiltered)

    var mostTweetedSorted = tdsFiltered.sort((a, b) => b.retweetData[3].original_tweets - a.retweetData[3].original_tweets)

    var mostTweetedTDParty = mostTweetedSorted[0].party

    return [mostTweetedSorted[0].name, mostTweetedTDParty, partyColors[mostTweetedTDParty], mostTweetedSorted[0].retweetData[3].original_tweets]

}
for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostOriginalTweets(i)

    boundariesClone.features[i].properties.color = color


}


} else if(funcOption == 3) {
    function colorOfPartyOfTDWithMostQuestions(i) {

    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD).filter(d => d.writtenQuestions != undefined).filter(d => d.writtenQuestions[0].writtenQuestions.to != undefined)

    var mostAskedSorted = tds.sort(function(a,b) {


      var aVal = sumValues(a.writtenQuestions[0].writtenQuestions.to)
      var bVal = sumValues(b.writtenQuestions[0].writtenQuestions.to)

        return bVal - aVal
    })

    var mostCuriousTDParty = mostAskedSorted[0].party

    console.log(tds)

    return [mostAskedSorted[0].name, mostAskedSorted[0].party, partyColors[mostCuriousTDParty], sumValues(mostAskedSorted[0].writtenQuestions[0].writtenQuestions.to)]

}
for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostQuestions(i)

    boundariesClone.features[i].properties.color = color


}
} else if(funcOption == 4) {
    function colorOfPartyOfTDWithMostNegativeSentiment(i) {

        var conTDs = storeTDsByConstituency()
    
        var tds = conTDs[i][1].map(d => d.TD)
    
        var tdsFiltered = tds.filter(d => d.sentimentData != undefined).filter(d => d.sentimentData.length != 0)
    
        console.log(tdsFiltered)
    
        var mostNegativeSorted = tdsFiltered.sort((a, b) =>  a.sentimentData[3].polarity - b.sentimentData[3].polarity)
    
        var mostNegativeTDParty = mostNegativeSorted[0].party
    
        return [mostNegativeSorted[0].name, mostNegativeTDParty, partyColors[mostNegativeTDParty], mostNegativeSorted[0].sentimentData[3].polarity * -1]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {
    
        var color = colorOfPartyOfTDWithMostNegativeSentiment(i)
    
        boundariesClone.features[i].properties.color = color
    
    
    }
} else if(funcOption == 5) {
    function colorOfPartyOfTDWithMostPositiveSentiment(i) {

        var conTDs = storeTDsByConstituency()
    
        var tds = conTDs[i][1].map(d => d.TD)
    
        var tdsFiltered = tds.filter(d => d.sentimentData != undefined).filter(d => d.sentimentData.length != 0)
    
        console.log(tdsFiltered)
    
        var mostPositiveSorted = tdsFiltered.sort((a, b) => b.sentimentData[3].polarity - a.sentimentData[3].polarity)
    
        var mostPositiveTDParty = mostPositiveSorted[0].party
    
        return [mostPositiveSorted[0].name, mostPositiveTDParty, partyColors[mostPositiveTDParty], mostPositiveSorted[0].sentimentData[3].polarity]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {
    
        var color = colorOfPartyOfTDWithMostPositiveSentiment(i)
    
        boundariesClone.features[i].properties.color = color
    
    
    }
} 
else if(funcOption == 6) {

    function colorOfPartyOfTDWithMostAbsences(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

    console.log(tdsFiltered)

    var mostAbsentSorted = tdsFiltered.sort((a, b) => b.voteData[0].absences - a.voteData[0].absences)

    var mostAbsentTDParty = mostAbsentSorted[0].party

    return [mostAbsentSorted[0].name, mostAbsentTDParty, partyColors[mostAbsentTDParty], mostAbsentSorted[0].voteData[0].absences]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostAbsences(i)

    boundariesClone.features[i].properties.color = color
}

} else if(funcOption == 7) {

    function colorOfPartyOfTDWithMostPresences(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

    console.log(tdsFiltered)

    var mostPresentSorted = tdsFiltered.sort((a, b) => b.voteData[0].totalVotes - a.voteData[0].totalVotes)

    var mostPresentTDParty = mostPresentSorted[0].party

    return [mostPresentSorted[0].name, mostPresentTDParty, partyColors[mostPresentTDParty], mostPresentSorted[0].voteData[0].totalVotes]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostPresences(i)

    boundariesClone.features[i].properties.color = color
}

} else if(funcOption == 8) {

    function colorOfPartyOfTDWithMostWins(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

    console.log(tdsFiltered)

    var mostWinsSorted = tdsFiltered.sort((a, b) => b.voteData[0].onWinningSide - a.voteData[0].onWinningSide)

    var mostWinsTDParty = mostWinsSorted[0].party

    return [mostWinsSorted[0].name, mostWinsTDParty, partyColors[mostWinsTDParty], mostWinsSorted[0].voteData[0].onWinningSide]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostWins(i)

    boundariesClone.features[i].properties.color = color
}

} else if(funcOption == 9) {

    function colorOfPartyOfTDWithMostLosses(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

    console.log(tdsFiltered)

    var mostLossesSorted = tdsFiltered.sort((a, b) => b.voteData[0].onLosingSide - a.voteData[0].onLosingSide)

    var mostLossesTDParty = mostLossesSorted[0].party

    return [mostLossesSorted[0].name, mostLossesTDParty, partyColors[mostLossesTDParty], mostLossesSorted[0].voteData[0].onLosingSide]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostLosses(i)

    boundariesClone.features[i].properties.color = color
}

} else if(funcOption == 10) {

    function colorOfPartyOfTDWithMostAbstentions(i) {

    var conTDs = storeTDsByConstituency()

    var tds = conTDs[i][1].map(d => d.TD)

    var tdsFiltered = tds.filter(d => d.voteData != undefined).filter(d => d.voteData.length != 0)

    console.log(tdsFiltered)

    var mostAbstentionsSorted = tdsFiltered.sort((a, b) => b.voteData[0].totalAbstentions - a.voteData[0].totalAbstentions)

    var mostAbstentionsTDParty = mostAbstentionsSorted[0].party

    if(mostAbstentionsSorted[0].voteData[0].totalAbstentions == 0) {
        return ["", "", "lightgrey", 0]
    }

    return [mostAbstentionsSorted[0].name, mostAbstentionsTDParty, partyColors[mostAbstentionsTDParty], mostAbstentionsSorted[0].voteData[0].totalAbstentions]
    }
    for(let i = 0; i < boundariesClone.features.length; i++) {

    var color = colorOfPartyOfTDWithMostAbstentions(i)

    boundariesClone.features[i].properties.color = color
}

}


// function containsParty(i, party) {

//     var conTDs = storeTDsByConstituency()

//     var partiesPresent = conTDs[i][1].map(d => d.TD.party)

//     var map = partiesPresent.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

//     var partyAndValue = [...map.entries()];

//     var justParty = partyAndValue.map(d => d[0])

//     if(justParty.includes(party)) {
//         return partyColors[party]
//     } else {
//         return "lightgrey"
//     }

// }

// for(let i = 0; i < boundaries.features.length; i++) {

//     var color = containsParty(i, justPartyArr[justParty])

//     boundaries.features[i].properties.color = color


// }





    const colorValObj = d => d.properties.color

    const heatColorFunc = d3.scaleSequential()
        .interpolator( d3.interpolateRdYlBu)
        .domain([d3.max(boundariesClone.features, d=>d.properties.color[3]),d3.min(boundariesClone.features, d=>d.properties.color[3])])





    //colorValObj has party color at [2]. 


console.log(con_boundaries)



    const svg = d3.select(svgRef.current);

    const projection = geoMercator().scale(scale)
    // Center the Map on Ireland
    .center([centerLatLong.lat, centerLatLong.long])
    .translate([widthMargin / 2, heightMargin / 2]);

    const pathGenerator = geoPath().projection(projection)

    svg.selectAll(".constituency")
        .data(boundariesClone.features)
        .join("path")
        .attr("class", "constituency")
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

 // .attr("fill",d => colorTest(d)[2])

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

        d3.selectAll(".constituency")
            .on('mouseover', function (d, i) {


                if(funcOption == 0) {

                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Followers: ${colorValObj(d)[3].toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);
    

                } else if(funcOption == 1) {

                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Retweets: ${colorValObj(d)[3].toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                } else if(funcOption == 2) {

                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Original Tweets: ${colorValObj(d)[3].toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);


                } else if(funcOption == 3) {

                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Questions Asked: ${colorValObj(d)[3].toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);


                } else if (funcOption == 4) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3] * -1).toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                } else if (funcOption == 5) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3]).toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                } else if (funcOption == 7) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3]).toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                }
                else if (funcOption == 8) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3]).toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                }
                else if (funcOption == 9) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3]).toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                } else if (funcOption == 10) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3]).toLocaleString()} </div></div>`
                    )
                        .style('visibility', 'visible');
                        d3.select(this).transition().attr('fill', hoverColor);

                }
                else if (funcOption == 11) {
                    
                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>TD: ${colorValObj(d)[0]} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Polarity: ${(colorValObj(d)[3]).toLocaleString()} </div></div>`
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

}, [boundaries, TDData, justParty, funcOption, colorFunc, width, height, scale, centerLatLong])

if(!TDData) return null;

    return (

        <div className="featuredItem" style={{textAlign: "center", background: "white"}}>   
        <Typography style={{color: "black"}} variant="h5">TD With Most... </Typography>         
        <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "black", color: "black"}} htmlFor="grouped-select">Data Value</InputLabel>
              <Select onChange={onChangeFuncOption} style={{ color: "black"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <MenuItem value={0}>TD With Most Followers</MenuItem>
                <MenuItem value={1}>TD With Most Retweets</MenuItem>  
                <MenuItem value={2}>TD Most Active On Twitter</MenuItem>
                <MenuItem value={3}>TD With Most Questions</MenuItem> 
                <MenuItem value={4}>TD With Most Negative Sentiment</MenuItem>     
                <MenuItem value={5}>TD With Most Positive Sentiment</MenuItem>         
                <MenuItem value={6}>TD with Most Absences</MenuItem> 
                <MenuItem value={7}>TD with Most Presences</MenuItem>
                <MenuItem value={8}>TD with Most Wins</MenuItem>    
                <MenuItem value={9}>TD with Most Losses</MenuItem>
                <MenuItem value={10}>TD with Abstentions</MenuItem>    

                {/* <MenuItem value={4}>Solidarity - People Before Profit</MenuItem>
                <MenuItem value={5}>Independent</MenuItem>       
                <MenuItem value={6}>Green Party</MenuItem>
                <MenuItem value={7}>Social Democrats</MenuItem>
                <MenuItem value={8}>Aontú</MenuItem>
                <MenuItem value={9}>Independents 4 Change</MenuItem>               */}
              </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "black", color: "black"}} htmlFor="grouped-select">Color Value</InputLabel>
              <Select onChange={onChangeColorFunc} style={{ color: "black"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <ListSubheader>In Constituency...</ListSubheader>
                <MenuItem value={0}>Color by Party</MenuItem>
                <MenuItem value={1}>Heatmap</MenuItem>  
              </Select>
        </FormControl>
            <div className={"scroll-svg-container"} style={{marginTop: "16px"}}>
            <svg ref={svgRef} height={heightMargin + margin.top + margin.bottom} width={widthMargin + margin.left + margin.right}></svg>
        </div>
        </div>

    )
}

export default TDWithConstituencyMap
