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


const PartyConstituencyMap = ({data}) => {


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
    const [justParty, setJustParty] = useState(1)
    const [funcOption, setFuncOption] = useState(0)
    const [colorFunc, setColorFunc] = useState(0)
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

function colorOfPartyWithMajoritySeats(i) {

    var conTDs = storeTDsByConstituency()


    var partiesPresent = conTDs[i][1].map(d => d.TD.party)

    var map = partiesPresent.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    var partyAndValue = [...map.entries()];

    var sortedByMajority = partyAndValue.sort((a,b) => b[1] - a[1])

    if(sortedByMajority[0][1] === sortedByMajority[1][1]) {
        return "lightgrey"
    }

    return partyColors[sortedByMajority[0][0]]
}

// for(let i = 0; i < boundaries.features.length; i++) {

//     var color = colorOfPartyWithMajoritySeats(i)

//     boundaries.features[i].properties.color = color


// }

if(justParty < 10) {

function containsParty(i, party) {

    var conTDs = storeTDsByConstituency()

    var partiesPresent = conTDs[i][1].map(d => d.TD.party)

    var map = partiesPresent.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    var partyAndValue = [...map.entries()];

    var justParty = partyAndValue.map(d => d[0])

    console.log(partyAndValue)

    if(justParty.includes(party)) {

        var tds = conTDs[i][1].map(function(d) {

            if(d.TD.party == party) {
                return d.TD
            }
           




        }).filter(d => d != undefined)




console.log(tds)


        return ["test", tds[0].party, partyColors[party], tds.length]
    } else {
        return ["test","test","lightgrey", 0]
    }

}

for(let i = 0; i < boundaries.features.length; i++) {

    var color = containsParty(i, justPartyArr[justParty])

    boundaries.features[i].properties.color = color


}

} else if (justParty == 10) {

    function colorOfPartyWithMajoritySeats(i) {

    var conTDs = storeTDsByConstituency()

    var partiesPresent = conTDs[i][1].map(d => d.TD.party)

    var map = partiesPresent.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    var partyAndValue = [...map.entries()];

    var sortedByMajority = partyAndValue.sort((a,b) => b[1] - a[1])


    console.log(sortedByMajority[0][1])

    if(sortedByMajority[0][1] === sortedByMajority[1][1]) {
        return ["Split", "Split", "lightgrey", 0]
    }

    return [0, sortedByMajority[0][0], partyColors[sortedByMajority[0][0]], sortedByMajority[0][1]]
}

for(let i = 0; i < boundaries.features.length; i++) {

    var color = colorOfPartyWithMajoritySeats(i)

    boundaries.features[i].properties.color = color

}
}





    const colorValObj = d => d.properties.color

    const heatColorFunc = d3.scaleSequential()
        .interpolator( d3.interpolateRdYlBu)
        .domain([d3.max(boundaries.features, d=>d.properties.color[3]),d3.min(boundaries.features, d=>d.properties.color[3])])





    //colorValObj has party color at [2]. 



    const svg = d3.select(svgRef.current);

    const projection = geoMercator().scale(5300)
    // Center the Map in Colombia
    .center([-7.6, 53.6921])
    .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection)

    svg.selectAll(".in-constituency")
        .data(boundaries.features)
        .join("path")
        .attr("class", "in-constituency")
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



        d3.selectAll(".in-constituency")
            .on('mouseover', function (d, i) {



                    tooltip
                    .html(
                        `<div>${d.properties.CON_SEAT_} </div>
                        <div>Party: ${colorValObj(d)[1]} </div>
                        <div>Members Present: ${colorValObj(d)[3]} </div>
                        </div>`
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
        <Typography variant="h5">Party In...</Typography>         
        <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Party</InputLabel>
              <Select onChange={onChangeJustParty} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <ListSubheader>Party</ListSubheader>
                <MenuItem value={0}>Sinn Féin</MenuItem>
                <MenuItem value={1}>Fine Gael</MenuItem>  
                <MenuItem value={2}>Fianna Fáil</MenuItem>
                <MenuItem value={3}>Labour Party</MenuItem> 
                <MenuItem value={4}>Solidarity - People Before Profit</MenuItem>     
                <MenuItem value={5}>Independent</MenuItem>         
                <MenuItem value={6}>Green Party</MenuItem>  
                <MenuItem value={7}>Social Democrats</MenuItem>  
                <MenuItem value={8}>Aontú</MenuItem>  
                <MenuItem value={9}>Independents 4 Change</MenuItem>
                <MenuItem value={10}>Color of Party With Majority Seats</MenuItem>   
              </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
              <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Color Value</InputLabel>
              <Select onChange={onChangeColorFunc} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
                <ListSubheader>In Constituency...</ListSubheader>
                <MenuItem value={0}>Color by Party</MenuItem>
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

export default PartyConstituencyMap
