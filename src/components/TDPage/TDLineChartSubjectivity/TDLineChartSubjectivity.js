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





export default function TDLineChartSubjectivity ({justThisTDData, justThisTDPartyData, allTDData}) {

  const [selectedItems, setSelectedItems] = useState([]);
  const [thisTDData, setThisTDData] = useState(null)
  const [thisTDPartyData, setThisTDPartyData] = useState(null)
  const [dailData, setDailData] = useState(null)


  useEffect(() => {

    setThisTDData(justThisTDData)
    setThisTDPartyData(justThisTDPartyData)
    setDailData(allTDData)

}, []);

useEffect(() => {

  if(!thisTDData) return null;

  setSelectedItems([thisTDData.name])

}, [thisTDData])

const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  if(!thisTDData) return null;


  function getTDObj() {

    let justTDOnTwitter = thisTDData.filter(function(d) {
                
      if(d.sentimentData[0] != undefined) {
      return d
    }
  }
  )
  

  let subjectivityArr = justTDOnTwitter[0].sentimentData.map(d => d.subjectivity);
  let dateArr = justTDOnTwitter[0].sentimentData.map(d => d.date);
  let changeArr = [0, ];
  let tdObjArr = [];
  
  
  for(let i = 1; i < subjectivityArr.length; i++) {
  
  
    var lastWeek  = subjectivityArr[i - 1]
    var thisWeek = subjectivityArr[i]
    var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
    
    //filter NaN at start
  
    if(diff !== diff) {changeArr.push(0) } else {
    changeArr.push(diff) 
    }
  }
  
  for(let i = 0; i < justTDOnTwitter[0].sentimentData.length; i++) {
  
    function tdObj() {
  
      this.subjectivity = subjectivityArr[i]
      this.date = dateArr[i]
      this.change = changeArr[i]
    }
  tdObjArr.push(new tdObj)
  }
  
  return tdObjArr
  
  
}

function getDailObj() {

  console.log(dailData)

  let justTDsOnTwitter = dailData.filter(function(d) {
              
    if(d.sentimentData != undefined) {
    return d
  }
}
)

let totalSubjectivityArr = []
let averageSubjectivityArr = []
let dateArr = []
let changeArr = [0, ]
let dailMeanObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i ++) {

let holder = justTDsOnTwitter.map(d => d.sentimentData[i].subjectivity)
let total = holder.reduce(function(a, b) {
  return a + b
})

let averageSubjectivityCount = total / justTDsOnTwitter.length;



averageSubjectivityArr.push(Number(averageSubjectivityCount.toFixed(3)))

}
dateArr = justTDsOnTwitter[0].sentimentData.map(d => d.date)


for(let i = 1; i < averageSubjectivityArr.length; i++) {


  var lastWeek  = averageSubjectivityArr[i - 1]
  var thisWeek = averageSubjectivityArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i++) {

  function dailMeanObj() {

    this.subjectivity = averageSubjectivityArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
dailMeanObjArr.push(new dailMeanObj)
}

return dailMeanObjArr


}

function getPartyObj() {

  let justTDsOnTwitter = thisTDPartyData.filter(function(d) {
              
    if(d.sentimentData != undefined) {
    return d
  }
}
)

let averageSubjectivityArr = []
let dateArr = []
let changeArr = [0, ]
let partyMeanObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i ++) {

let holder = justTDsOnTwitter.map(d => d.sentimentData[i].subjectivity)
let total = holder.reduce(function(a, b) {
  return a + b
})

let averageSubjectivityCount = total / justTDsOnTwitter.length

averageSubjectivityArr.push(Number(averageSubjectivityCount.toFixed(3)))

}

dateArr = justTDsOnTwitter[0].sentimentData.map(d => d.date)


for(let i = 1; i < averageSubjectivityArr.length; i++) {


  var lastWeek  = averageSubjectivityArr[i - 1]
  var thisWeek = averageSubjectivityArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i++) {

  function partyMeanObj() {

    this.subjectivity = averageSubjectivityArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
partyMeanObjArr.push(new partyMeanObj)
}

return partyMeanObjArr


}


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
  color: "#6699FF",
  items: getTDObj().map((d) => ({ ...d, date: getDate(d)}))
};

const dailMeanDataMap = {
  name: "Dáil Average",
  color: "white",
  items: getDailObj().map((d) => ({ ...d, date: getDate(d)}))
}

const partyMeanDataMap = {
  name: thisTDData[0].party,
  color: "green",
  items: getPartyObj().map((d) => ({ ...d, date: getDate(d)}))
}

if(!thisTDDataMap) return null;

  const chartData = [
    ...[thisTDDataMap, dailMeanDataMap, partyMeanDataMap].filter((d) => selectedItems.includes(d.name))
  ];

const legendData = [thisTDDataMap, dailMeanDataMap, partyMeanDataMap];


  return (
  <div className="featuredItem" style={{textAlign: "center"}}>
    <Typography variant="h5">Subjectivity</Typography>
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
      </div>

  );
}

