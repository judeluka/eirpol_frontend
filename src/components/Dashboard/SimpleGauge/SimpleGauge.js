import React, {useState, useEffect} from 'react'
import * as d3 from 'd3'
import GaugeChart from 'react-gauge-chart'
import { Typography } from '@material-ui/core'
import { ArrowUpward } from '@material-ui/icons'


export const DailSentimentGauge = ({data}) => {

    const [TDData, setTDData] = useState(null)
    const [dailPolAvg, setDailPolAvg] = useState(null)


    useEffect(() => {

        setTDData(data)
        console.log(TDData)

    }, [data])


    useEffect(() => {

        if(!TDData) return null;


        const holder = TDData.map(d => d.sentimentData[2].polarity)
        const total = holder.reduce(function(a, b) {
            return a + b
        })

        var avg = total / 154


        setDailPolAvg(avg)

        console.log(avg)
 
     // return d3.descending(a.totalFollowers, b.totalFollowers)
            
                 
        
    

    }, [TDData, dailPolAvg])

    if(!dailPolAvg) return null;


    return (
        <div className="featuredItem">
            <Typography variant="h6">Dáil Sentiment</Typography>
            <p style={{fontSize: 14}}>How positive or negative TD's have been Twitter over the past week. Value lies between [-1, 1] where 1 is most positive.</p>
            <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{dailPolAvg.toLocaleString()}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        </div>
    )
}





export const DailConnectivityGauge = ({data}) => {


    


    const [TDData, setTDData] = useState(null)
    const [dailSubAvg, setDailSubAvg] = useState(null)

    useEffect(() => {

        setTDData(data)
        console.log(TDData)

    }, [data])


    useEffect(() => {

        if(!TDData) return null;

        const holder = TDData.map(d => d.sentimentData[2].subjectivity)
        const total = holder.reduce(function(a, b) {
            return a + b
    })

        var avg = total / 154  
        
        if(!total) return null;

        console.log(avg)


        setDailSubAvg(avg)


    }, [TDData, dailSubAvg])



    if(!TDData || !dailSubAvg) return null;




    return (
        <div className="featuredItem">
            <Typography variant="h6">Dáil Subjectivity</Typography>
            <p style={{fontSize: 14}}>How subjective TD's have been on Twitter over the past week. Unlike sentiment, subjectivity lies between [0, 1] where 1 is most subjective.</p>
            <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{dailSubAvg.toLocaleString()}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        </div>
    )
}




