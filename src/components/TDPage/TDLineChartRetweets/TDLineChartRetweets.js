/** App.js */
import React, {useState, useEffect} from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
import vcit from "./data/VCIT.json";
import portfolio from "./data/portfolio.json";
import schc from "./data/SCHC.json";
import "./styles.css";
import fiannafail from "./data/fiannaFail.json"
import finegael from "./data/finegael.json"
import ind from "./data/ind.json"
import sinnfein from "./data/sinnfein.json"
import labour from "./data/labour.json"
import { chamberStats } from '../../../Backend/metaData';
import axios from "axios";
import { Typography } from "@material-ui/core";
import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";





export default function TDLineChartRetweets ({justThisTDData, justThisTDPartyData, allTDData}) {

  const [selectedItems, setSelectedItems] = useState([]);
  const [thisTDData, setThisTDData] = useState(null)
  const [thisTDPartyData, setThisTDPartyData] = useState(null)
  const [dailData, setDailData] = useState(null)


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

    const tdPartyColors = {

      "Sinn Féin": "#4b9b90",
      "Fine Gael": "#b3ccff",
      "Fianna Fáil": "#9bd39b",
      "Labour Party": "#ff1a1a",
      "Solidarity - People Before Profit": "#b82f29",
      "Independent": "#d9d9d9",
      "Green Party": "#b8db70",
      "Social Democrats": "#a346c0",
      "Aontú": "#84a152",
      "Independents 4 Change": "#a6a6a6"
    }



  useEffect(() => {

    setThisTDData(justThisTDData)
    setThisTDPartyData(justThisTDPartyData)
    setDailData(allTDData)

}, []);

useEffect(() => {

  if(!thisTDData) return null;

  setSelectedItems([thisTDData[0].name, "Dáil Average", "Party Average"])

}, [thisTDData])

const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };



  if(!thisTDData || !justThisTDPartyData || !dailData) return null;

  console.log(thisTDPartyData)


  function getTDObj() {

    let justTDOnTwitter = thisTDData.filter(function(d) {
                
      if(d.retweetData[0] != undefined) {
      return d
    }
  }
  )
  

  let retweetArr = justTDOnTwitter[0].retweetData.map(d => d.retweets);
  let dateArr = justTDOnTwitter[0].retweetData.map(d => d.date);
  let changeArr = [0, ];
  let tdObjArr = [];
  
  
  for(let i = 1; i < retweetArr.length; i++) {
  
  
    var lastWeek  = retweetArr[i - 1]
    var thisWeek = retweetArr[i]
    var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
    
    //filter NaN at start
  
    if(diff !== diff) {changeArr.push(0) } else {
    changeArr.push(diff) 
    }
  }
  
  for(let i = 0; i < justTDOnTwitter[0].retweetData.length; i++) {
  
    function tdObj() {
  
      this.retweets = retweetArr[i]
      this.date = dateArr[i]
      this.change = changeArr[i]
    }
  tdObjArr.push(new tdObj)
  }
  
  return tdObjArr
  
  
}


function getDailObj() {

  let justTDsOnTwitter = dailData.filter(function(d) {
              
    if(d.retweetData[0] != undefined) {
    return d
  }
}
)

let totalRetweetArr = []
let averageRetweetArr = []
let dateArr = []
let changeArr = [0, ]
let dailMeanObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].retweetData.length; i ++) {

let holder = justTDsOnTwitter.map(d => d.retweetData[i].retweets)
let total = holder.reduce(function(a, b) {
  return a + b
})

let averageRetweetCount = total / justTDsOnTwitter.length

averageRetweetArr.push(Number(averageRetweetCount.toFixed()))

}

dateArr = justTDsOnTwitter[0].retweetData.map(d => d.date)


for(let i = 1; i < averageRetweetArr.length; i++) {


  var lastWeek  = averageRetweetArr[i - 1]
  var thisWeek = averageRetweetArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].retweetData.length; i++) {

  function dailMeanObj() {

    this.retweets = averageRetweetArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
dailMeanObjArr.push(new dailMeanObj)
}

return dailMeanObjArr


}

function getPartyObj() {

  console.log(thisTDPartyData)

  let justTDsOnTwitter = thisTDPartyData.filter(function(d) {
              
    if(d.retweetData[0] != undefined) {
    return d
  }
}
)

let averageRetweetArr = []
let dateArr = []
let changeArr = [0, ]
let partyMeanObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].retweetData.length; i ++) {

let holder = justTDsOnTwitter.map(d => d.retweetData[i].retweets)
let total = holder.reduce(function(a, b) {
  return a + b
})

let averageRetweetCount = total / justTDsOnTwitter.length

averageRetweetArr.push(Number(averageRetweetCount.toFixed()))

}

dateArr = justTDsOnTwitter[0].retweetData.map(d => d.date)


for(let i = 1; i < averageRetweetArr.length; i++) {


  var lastWeek  = averageRetweetArr[i - 1]
  var thisWeek = averageRetweetArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].retweetData.length; i++) {

  function partyMeanObj() {

    this.retweets = averageRetweetArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
partyMeanObjArr.push(new partyMeanObj)
}

return partyMeanObjArr


}

console.log(getPartyObj())





const getDate = (d) => { 
    
    let together = []
    let apart = d.date.split('/')
    let day = apart[0]
    let month = apart[1]
    let year = apart[2]

    together.push(month, day, year)
    together.toString().replace(",","/").replace(",","/")
    return new Date(together)
  }

const thisTDDataMap = {
  name: thisTDData[0].name,
  color: tdPartyColors[thisTDData[0].party],
  items: getTDObj().map((d) => ({ ...d, date: getDate(d)}))
};

const dailMeanDataMap = {
  name: "Dáil Average",
  color: "white",
  items: getDailObj().map((d) => ({ ...d, date: getDate(d)}))
}

const partyMeanDataMap = {
  name: "Party Average",
  color: partyColors[thisTDData[0].party],
  items: getPartyObj().map((d) => ({ ...d, date: getDate(d)}))
}

if(!thisTDDataMap) return null;

  const chartData = [
    ...[thisTDDataMap, dailMeanDataMap, partyMeanDataMap].filter((d) => selectedItems.includes(d.name))
  ];

const legendData = [thisTDDataMap, dailMeanDataMap, partyMeanDataMap];


  return (
  <div className="featuredItem" style={{textAlign: "center"}}>
    <Typography variant="h5">Retweets</Typography>
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
      </div>

  );
}

