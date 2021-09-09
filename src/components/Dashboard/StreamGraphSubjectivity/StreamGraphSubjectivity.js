/** App.js */
import React, {useState, useEffect} from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
import "./styles.css";
import axios from "axios";
import { Typography } from "@material-ui/core";





export default function StreamGraphSubjectivity ({data}) {

  const [selectedItems, setSelectedItems] = useState([]);
  const [TDData, setTDData] = useState(null)
  
  
  
  useEffect(() => {

    setTDData(data.filter(function(d) {
          
      if(d.followerData[0] != undefined) {
      return d
    }
  }
  ))
  setSelectedItems(["Dáil Most Subjective", "Dáil Least Subjective", "Dáil Average"])
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

function getDailMostSubjectiveObj() {


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

  holder.sort((a, b) => b.sentimentData[i].subjectivity - a.sentimentData[i].subjectivity)


  let mostPositive = holder[0].sentimentData[i].subjectivity

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

    this.subjectivity = mostPositiveArr[i]
    this.date = dateArr[i]
    this.change = changeArr[i]
  }
dailMostPositiveObjArr.push(new dailMostPositiveObj)
}

return dailMostPositiveObjArr


}

function getDailLeastSubjectiveObj() {


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

  holder.sort((a, b) =>  a.sentimentData[i].subjectivity - b.sentimentData[i].subjectivity)


  let mostNegative = holder[0].sentimentData[i].subjectivity

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

    this.subjectivity = mostNegativeArr[i]
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

const dailMostSubjectiveDataMap = {
  name: "Dáil Most Subjective",
  color: "green",
  items: getDailMostSubjectiveObj().map((d) => ({ ...d, date: getDate(d)}))
}

const dailLeastSubjectiveDataMap = {
  name: "Dáil Least Subjective",
  color: "orange",
  items: getDailLeastSubjectiveObj().map((d) => ({ ...d, date: getDate(d)}))
}

console.log(dailMeanDataMap)

  const chartData = [
    ...[dailMostSubjectiveDataMap, dailMeanDataMap,  dailLeastSubjectiveDataMap].filter((d) => selectedItems.includes(d.name))
  ];

  


const legendData = [ dailMostSubjectiveDataMap, dailMeanDataMap,  dailLeastSubjectiveDataMap ];


  return (
  <div className="featuredItem" style={{textAlign: "center"}}>
    <Typography variant="h5">Dáil Subjectivity</Typography>
    <p style={{marginTop: 15, marginBottom: 15}}>Subjective sentences generally refer to personal opinion, emotion or judgment whereas objective refers to factual information. Subjectivity also lies between [0,1], with 1 being most subjective.</p>
      <Legend
        data={legendData}
        selectedItems={selectedItems}
        onChange={onChangeSelection}
      />
      <MultilineChart data={chartData} />
      </div>

  );
}

