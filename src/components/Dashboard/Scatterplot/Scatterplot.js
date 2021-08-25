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

const Scatterplot = ({data}) => {



    const [TDDataScatter, setTDDataScatter] = useState(data)
    const [oirOralQuestionData, setOirOralQuestionData] = useState(null)
    const [oirWrittenQuestionData, setOirWrittenQuestionData] = useState(null)
    const [partySelect, setPartySelect] = useState(["Sinn Féin", "Fine Gael", "Fianna Fáil", "Labour Party", "Green Party", "Solidarity - People Before Profit", "Aontú", "Social Democrats", "Independent", "Independents 4 Change"])
    const [xOption, setXOption] = useState(0)
    const [yOption, setYOption] = useState(1)
    const [rOption, setROption] = useState(0)
    const [filteredTDData, setFilteredTDData] = useState(null)




 

    const followers = d => d.followerData[2].followers
    const retweets = d => d.retweetData[2].retweets
    const original_tweets = d => d.retweetData[2].original_tweets
    const polarity = d => d.sentimentData[2].polarity
    const subjectivity = d => d.sentimentData[2].subjectivity
    const followersPerRetweet = (d) => {

      var f = d.followerData[2].followers
      var r = d.retweetData[2].retweets 
 
      var test = f / r

      if(test === Infinity ) {

          test = 0
      
  }

  test = test ? test : 0;

  return test
    }
    const retweetsPerOriginalTweet = (d) => {

      var r = d.retweetData[2].retweets 
      var o = d.retweetData[2].original_tweets

      var test = r / o

      if(test === Infinity ) {

          test = 0
      
  }

  test = test ? test : 0;


  return test
}
    
    const optionsFunctions = [followers, retweets, original_tweets, polarity, subjectivity, retweetsPerOriginalTweet, followersPerRetweet]

    const xValue = optionsFunctions[xOption]
    const yValue = optionsFunctions[yOption]
    const rValue = optionsFunctions[rOption]

    useEffect(() => {

        setTDDataScatter(data)
        setFilteredTDData(TDDataScatter)

    }, [])

    useEffect(() => {
        
        
      axios.get('https://api.oireachtas.ie/v1/questions?date_start=2020-01-01&date_end=2022-02-02&limit=2000&qtype=oral').then((response) => {

      setOirOralQuestionData(response.data)
      
    });
    
  }, []);

  useEffect(() => {
        
        
    axios.get('https://api.oireachtas.ie/v1/questions?date_start=2020-01-01&date_end=2022-02-02&limit=2000&qtype=written').then((response) => {

    setOirWrittenQuestionData(response.data)
    
  });
  
}, []);


//   function getTDsFromApiAsync() {
//   return fetch("https://api.oireachtas.ie/v1/members?date_start=1900-01-01&chamber_id=&date_end=2099-01-01&limit=50")
//   .then((response) => response.json())
//   .then((responseJson) => {
//     return responseJson.movies;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }


// console.log(getTDsFromApiAsync())

  const wrapperRef = useRef()
  const svgRef = useRef()

    const options = [

        "Followers", "Retweets", "Original Tweets", "Polarity", "Subjectivity", "Followers Per Retweet", "Retweets Per Original Tweet"
        ]

    const optionsExplanation = [

      "Number of Twitter followers on last check.",
      "Number of retweets received over last week.",
      "Number of original tweets (so excl. retweets) a TD has posted over last week.",
      "Average sentiment of a TD's tweets over the past week, value lies between [-1, 1] with 1 being most positive.",
      "Average subjectivity of a TD's tweets over the past week, value lies between [0, 1] with 1 being most subjective.",
      "Followers divided by Retweets received over the last week.",
      "Retweets divided by Original Tweets over the last week."

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
                

//             }
            
      }


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

      if(!TDDataScatter || !filteredTDData) return null;

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
    



  var k = height / width,
  x0 = [-4.5, 4.5],
  y0 = [-4.5 * k, 4.5 * k],
  x = d3.scaleLinear().domain(x0).range([0, width]),
  y = d3.scaleLinear().domain(y0).range([height, 0]),
  z = d3.scaleOrdinal(d3.schemeCategory10);

 


      const svg = d3.select(svgRef.current)


        const xScale = d3.scaleLinear()
                        .range([0, width])
                        .domain(d3.extent(selectedFilteredTDData, xValue))



        const yScale = d3.scaleLinear()
                        .range([height, 0])
                        .domain(d3.extent(selectedFilteredTDData, yValue))
                        
        const rScale = d3.scaleLinear()
                        .range([6, 20])
                        .domain(d3.extent(selectedFilteredTDData, rValue))

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
                        .data(selectedFilteredTDData)
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
                d3.select(this).transition().attr('fill', partyColor);
            }); 

          console.log(selectedFilteredTDData)

    }, [TDDataScatter, partySelect, filteredTDData, xOption, yOption, rOption, oirWrittenQuestionData, oirOralQuestionData])

    
    if (!TDDataScatter) return null;

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
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Tweets</MenuItem>
          <MenuItem value={2}>Original Retweets</MenuItem>
          <MenuItem value={3}>Polarity</MenuItem>
          <MenuItem value={4}>Subjectivity</MenuItem>
          <MenuItem value={5}>Followers Per Retweet</MenuItem>
          <MenuItem value={6}>Retweets Per Original Tweet</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={7}>Yes Votes</MenuItem>
          <MenuItem disabled value={8}>No Votes</MenuItem>
          <MenuItem disabled value={9}>Abstentions</MenuItem>
          <MenuItem disabled value={10}>Motions</MenuItem>
          <MenuItem disabled value={11}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={12}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={13}>Votes recieved in last election</MenuItem>
          <MenuItem disabled value={14}>Avg. Poll Rating</MenuItem>


        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Original Tweets</MenuItem>
          <MenuItem value={3}>Polarity</MenuItem>
          <MenuItem value={4}>Subjectivity</MenuItem>
          <MenuItem value={5}>Followers Per Retweet</MenuItem>
          <MenuItem value={6}>Retweets Per Original Tweet</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={7}>Yes Votes</MenuItem>
          <MenuItem disabled value={8}>No Votes</MenuItem>
          <MenuItem disabled value={9}>Abstentions</MenuItem>
          <MenuItem disabled value={10}>Motions</MenuItem>
          <MenuItem disabled value={11}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={12}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={13}>Votes recieved in last election</MenuItem>
          <MenuItem disabled value={14}>Avg. Poll Rating</MenuItem>


        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Circle Radius</InputLabel>
        <Select onChange={onChangeR}style={{ color: "white"}} classes={{icon:classes.icon}}defaultValue="" id="grouped-select">
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={0}>Total Followers</MenuItem>
          <MenuItem value={1}>Total Retweets</MenuItem>
          <MenuItem value={2}>Original Tweets</MenuItem>
          <MenuItem value={3}>Polarity</MenuItem>
          <MenuItem value={4}>Subjectivity</MenuItem>
          <MenuItem value={5}>Followers Per Retweet</MenuItem>
          <MenuItem value={6}>Retweets Per Original Tweet</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={7}>Yes Votes</MenuItem>
          <MenuItem disabled value={8}>No Votes</MenuItem>
          <MenuItem disabled value={9}>Abstentions</MenuItem>
          <MenuItem disabled value={10}>Motions</MenuItem>
          <MenuItem disabled value={11}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={12}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem disabled value={13}>Votes recieved in last election</MenuItem>
          <MenuItem disabled value={14}>Avg. Poll Rating</MenuItem>


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
    <div>
<FormGroup style={{display: "inline-block",
    verticalAlign: "top"}}>
    <FormControlLabel
        control={
    <Checkbox
          defaultChecked="true"
          name="checkedB"
          style={{color: '#326760'}}
          value={"Sinn Féin"}
          onChange={handleChange}
          />
        }
        label="Sinn Féin"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: '#6699FF'}}
            value={"Fine Gael"}
            onChange={handleChange}
          />
        }
        label="Fine Gael"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#66BB66"}}
            value={"Fianna Fáil"}
            onChange={handleChange}
          />
        }
        label="Fianna Fáil"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#CC0000"}}
            value={"Labour Party"}
            onChange={handleChange}
          />
        }
        label="Labour"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "white"}}
            value={"Independent"}
            onChange={handleChange}
          />
        }
        label="Independent"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#8E2420"}}
            value={"Solidarity - People Before Profit"}
            onChange={handleChange}
          />
        }
        label="PBP"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#752F8B"}}
            value={"Social Democrats"}
            onChange={handleChange}
          />
        }
        label="Soc Dems"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#99CC33"}}
            value={"Green Party"}
            onChange={handleChange}
          />
        }
        label="Green Party"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "#44532A"}}
            value={"Aontú"}
            onChange={handleChange}
          />
        }
        label="Aontú"
        />
            <FormControlLabel
        control={
    <Checkbox
            defaultChecked="true"
            name="checkedB"
            style={{color: "grey"}}
            value={"Independents 4 Change"}
            onChange={handleChange}
          />
        }
        label="Independents 4 Change"
        />
             
        </FormGroup>
        </div>

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
export default Scatterplot
