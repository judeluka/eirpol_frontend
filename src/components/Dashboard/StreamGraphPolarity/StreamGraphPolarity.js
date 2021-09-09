/** App.js */
import React, {useState, useEffect} from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
import "./styles.css";
import axios from "axios";
import { Typography } from "@material-ui/core";





export default function StreamGraphPolarity ({data}) {

  const [selectedItems, setSelectedItems] = useState([]);
  const [TDData, setTDData] = useState(null)
  
  
  
  useEffect(() => {

    setTDData(data.filter(function(d) {
          
      if(d.followerData[0] != undefined) {
      return d
    }
  }
  ))
  setSelectedItems(["Dáil Most Negative", "Dáil Most Positive", "Dáil Average"])
}, []);



const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  
if (!TDData) return null;


function getDailMeanObj() {


  let justTDsOnTwitter =TDData.filter(function(d) {
              
    if(d.sentimentData != undefined) {
    return d
  }
}
)

let totalPolarityArr = []
let averagePolarityArr = []
let dateArr = []
let changeArr = [0, ]
let dailMeanObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i ++) {

let holder = justTDsOnTwitter.map(d => d.sentimentData[i].polarity)
let total = holder.reduce(function(a, b) {
  return a + b
})

let averagePolarityCount = total / justTDsOnTwitter.length;



averagePolarityArr.push(Number(averagePolarityCount.toFixed(3)))

}
dateArr = justTDsOnTwitter[0].sentimentData.map(d => d.date)


for(let i = 1; i < averagePolarityArr.length; i++) {


  var lastWeek  = averagePolarityArr[i - 1]
  var thisWeek = averagePolarityArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i++) {

  function dailMeanObj() {

    this.polarity = averagePolarityArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
dailMeanObjArr.push(new dailMeanObj)
}

return dailMeanObjArr


}

function getDailMostPositiveObj() {


  let justTDsOnTwitter =TDData.filter(function(d) {
              
    if(d.sentimentData != undefined) {
    return d
  }
}
)


let mostPositiveArr = []
let dateArr = []
let changeArr = [0, ]
let dailMostPositiveObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i ++) {

  var holder = justTDsOnTwitter

  holder.sort((a, b) => b.sentimentData[i].polarity - a.sentimentData[i].polarity)


  let mostPositive = holder[0].sentimentData[i].polarity

  mostPositiveArr.push(Number(mostPositive.toFixed(3)))

}

dateArr = justTDsOnTwitter[0].sentimentData.map(d => d.date)


for(let i = 1; i < mostPositiveArr.length; i++) {


  var lastWeek  = mostPositiveArr[i - 1]
  var thisWeek = mostPositiveArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i++) {

  function dailMostPositiveObj() {

    this.polarity = mostPositiveArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
dailMostPositiveObjArr.push(new dailMostPositiveObj)
}

return dailMostPositiveObjArr


}

function getDailMostNegativeObj() {


  let justTDsOnTwitter = TDData.filter(function(d) {
              
    if(d.sentimentData != undefined) {
    return d
  }
}
)


let mostNegativeArr = []
let dateArr = []
let changeArr = [0, ]
let dailMostNegativeObjArr = []

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i ++) {

  var holder = justTDsOnTwitter

  holder.sort((a, b) =>  a.sentimentData[i].polarity - b.sentimentData[i].polarity)


  let mostNegative = holder[0].sentimentData[i].polarity

  mostNegativeArr.push(Number(mostNegative.toFixed(3)))

}

dateArr = justTDsOnTwitter[0].sentimentData.map(d => d.date)


for(let i = 1; i < mostNegativeArr.length; i++) {


  var lastWeek  = mostNegativeArr[i - 1]
  var thisWeek = mostNegativeArr[i]
  var diff = ((thisWeek - lastWeek) / lastWeek) * 100;
  
  //filter NaN at start

  if(diff !== diff) {changeArr.push(0) } else {
  changeArr.push(diff) 
  }
}

for(let i = 0; i < justTDsOnTwitter[0].sentimentData.length; i++) {

  function dailMostNegativeObj() {

    this.polarity = mostNegativeArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
dailMostNegativeObjArr.push(new dailMostNegativeObj)
}

return dailMostNegativeObjArr


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

const dailMeanDataMap = {
  name: "Dáil Average",
  color: "white",
  items: getDailMeanObj().map((d) => ({ ...d, date: getDate(d)}))
}

const dailMostPositiveDataMap = {
  name: "Dáil Most Positive",
  color: "green",
  items: getDailMostPositiveObj().map((d) => ({ ...d, date: getDate(d)}))
}

const dailMostNegativeDataMap = {
  name: "Dáil Most Negative",
  color: "orange",
  items: getDailMostNegativeObj().map((d) => ({ ...d, date: getDate(d)}))
}


  const chartData = [
    ...[dailMostPositiveDataMap, dailMeanDataMap,  dailMostNegativeDataMap].filter((d) => selectedItems.includes(d.name))
  ];

  


const legendData = [ dailMostPositiveDataMap, dailMeanDataMap,  dailMostNegativeDataMap ];


  return (
  <div className="featuredItem" style={{textAlign: "center", background: "#004D44", padding: "10px"}}>
    <Typography variant="h5" style={{marginTop: "25px"}} >Dáil Sentiment</Typography>
    <p style={{marginTop: 16, marginBottom: 16, marginLeft: "24px", marginRight: "24px", lineHeight: "24px"}}>
      
      
      
      How positive or negative TD's have been on Twitter over the last week. Calculated by feeding their tweets into <a className="textblob-link" href="https://textblob.readthedocs.io/en/dev/">Textblob</a>, which scores polarity (sentiment) between -1 and 1.
      <br></br> 
      So, a TD who uses positive language will score closer to 1.
      <br></br> 
      The graph below displays the range of TD's polarity scores, and the average polarity score, for a given week.        
      </p>
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
      </div>

  );
}

