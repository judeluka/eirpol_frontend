import React from 'react'
import { useRef, useEffect, useState} from 'react'
import * as d3 from 'd3'
import { chamber } from '../../../Backend/rollCall'
import { axisBottom, axisLeft, svg } from 'd3'
import { current } from '../../../Backend/rollCall'
import { Typography, Checkbox, Select, ListItem } from '@material-ui/core'
import CustomizedHook from './SearchSelectBox'
import GroupedSelect from './GroupedSelectBox'
import './scatterplot.css'
import { MenuItem, ListSubheader, FormControl, InputLabel, makeStyles, List, ListItemText } from '@material-ui/core'
import axios from 'axios'

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
"Aontú": "#44532A"}

const ScatterplotZoom = ({data}) => {




    const [TDData, setTDData] = useState(null)
    const [xOption, setXOption] = useState(0)
    const [yOption, setYOption] = useState(1)
    const [rOption, setROption] = useState(0)

    const followers = d => d.followerData[0].followers
    const retweets = d => d.retweetData[0].retweets
    const sentiment = d => d.retweetData[0].original_tweets
    
    const optionsFunctions = [followers, retweets, sentiment]

    const xValue = optionsFunctions[xOption]
    const yValue = optionsFunctions[yOption]
    const rValue = optionsFunctions[rOption]

    useEffect(() => {

        setTDData(data)
        console.log(TDData)

    }, [data])


  function getTDsFromApiAsync() {
  return fetch("https://api.oireachtas.ie/v1/members?date_start=1900-01-01&chamber_id=&date_end=2099-01-01&limit=50")
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.movies;
  })
  .catch((error) => {
    console.error(error);
  });
}


console.log(getTDsFromApiAsync())

  const wrapperRef = useRef()
  const svgRef = useRef()

    const options = [

        "Followers", "Retweets", "Sentiment"
        ]


    
    

    const classes = useStyles();


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

      console.log(TDData)

      if(!TDData) return null;
      



    const filteredTDData = TDData.filter( function(d) {
          
      if(d.followerData[0] != undefined) {
      return d
    }
  }
  )


          console.log(filteredTDData)

      const svg = d3.select(svgRef.current)

      function zoomed({transform}) {
        const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
        circles.attr("transform", transform).attr("stroke-width", 5 / transform(height/width));
        svg.select('x-axis').call(xAxis, zx);
        svg.select('y-axis').call(yAxis, zy);
      }

    const zoom = d3.zoom()
      .scaleExtent([0.5, 32])
      .on("zoom", zoomed);

    svg.select('container').call(zoom).call(zoom.transform, d3.zoomIdentity);




        const xScale = d3.scaleLinear()
                        .range([0, width])
                        .domain(d3.extent(filteredTDData, xValue))



        const yScale = d3.scaleLinear()
                        .range([height, 0])
                        .domain(d3.extent(filteredTDData, yValue))
                        
        const rScale = d3.scaleLinear()
                        .range([2, 15])
                        .domain(d3.extent(filteredTDData, rValue))

        const party = d => d.party
        const partyColor = d => partyColors[party(d)]
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
       
        var circles = d3.select("#container")
                        .selectAll(".node")
                        .data(filteredTDData)
                        .join("circle")
                        .attr("class", "node")
                        .attr("fill", partyColor)
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
                `<div>TD: ${d.name}</div><div>Party: ${d.party}</div><div>x: ${options[xOption]}: ${xValue(d)}</div><div>y: ${options[yOption]}: ${yValue(d)}</div><div>r: ${options[rOption]}: ${rValue(d)}</div>`
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
        <Select  onChange={onChangeX} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Avg. Sentiment</MenuItem>
          <MenuItem value={3}>Activity</MenuItem>
          <MenuItem value={4}>Connectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={5}>Yes Votes</MenuItem>
          <MenuItem value={6}>No Votes</MenuItem>
          <MenuItem value={7}>Motions Tabled</MenuItem>
          <MenuItem value={8}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem value={9}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem value={10}>Votes recieved in last election</MenuItem>
          <MenuItem value={11}>Avg. Poll Rating</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Avg. Sentiment</MenuItem>
          <MenuItem value={3}>Activity</MenuItem>
          <MenuItem value={4}>Connectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={5}>Yes Votes</MenuItem>
          <MenuItem value={6}>No Votes</MenuItem>
          <MenuItem value={7}>Motions Tabled</MenuItem>
          <MenuItem value={8}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem value={9}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem value={10}>Votes recieved in last election</MenuItem>
          <MenuItem value={11}>Avg. Poll</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Circle Radius</InputLabel>
        <Select onChange={onChangeR}style={{ color: "white"}} classes={{icon:classes.icon}}defaultValue="" id="grouped-select">
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Total Retweets</MenuItem>
          <MenuItem value={3}>Avg. Sentiment</MenuItem>
          <MenuItem value={4}>Activity</MenuItem>
          <MenuItem value={5}>Connectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={6}>Yes Votes</MenuItem>
          <MenuItem value={7}>No Votes</MenuItem>
          <MenuItem value={8}>Motions Tabled</MenuItem>
          <MenuItem value={9}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem value={10}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem value={11}>Votes recieved in last election</MenuItem>
          <MenuItem value={12}>Avg. Poll Rating</MenuItem>

        </Select>
      </FormControl>
    </div>
    <List style={{display: "inline-block"}}>
      <ListItem >
        <ListItemText primary="x: Number of Twitter followers a TD has on last check (29/03/02)"/>
          </ListItem>
          <ListItem>
            <ListItemText primary="y: Number of retweets a TD has received since tracking began (29/03/02)"/>
             </ListItem>
             <ListItem>
            <ListItemText primary="r: A TD's average tweet sentiment over the latest 7-day-period"/>
            </ListItem>
            
    </List>
            </div>
        <div className={"scroll-svg-container"}>
        <svg id={"scatterplot-svg"}ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>
            <g id="container" transform={'translate(' + margin.left + ',' + margin.top + ')'}>
            <g className="x-axis"></g>
            <g className="y-axis"></g>
            </g>
            </svg>
          </div>
        </div>
    )
}
export default ScatterplotZoom
