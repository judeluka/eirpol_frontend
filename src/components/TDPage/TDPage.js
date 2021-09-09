import React, {useState, useEffect} from 'react'
import TDHeader from './TDHeader'
import {TDActivityStats, TDConnectivityGauge, TDFollowerStats, TDInterests, TDPolarityStats, TDQuestionsAskedTo, TDQuestionsTowardsTopic, TDRetweetStats, TDSentimentGauge, TDSubjectivityStats, TDTwitterActivity } from './TDStats'
import { Avatar, Grid, Typography } from '@material-ui/core'
import './tdpage.css'
import { useParams } from 'react-router'
import { TrendingDownRounded } from '@material-ui/icons'
import TDLineChartFollowers from './TDLineChartFollowers/TDLineChartFollowers'
import TDLineChartRetweets from './TDLineChartRetweets/TDLineChartRetweets'
import TDLineChartActivity from './TDLineChartActivity/TDLineChartActivity'
import TDLineChartPolarity from './TDLineChartPolarity/TDLineChartPolarity'
import TDLineChartSubjectivity from './TDLineChartSubjectivity/TDLineChartSubjectivity'
import { TDTopicBarchart } from './TDTopicBarchart'

const TDPage = ({data}) => {


    const [TDData, setTDData] = useState(null)
    const [thisTDData, setThisTDData] = useState(null)
    const [thisTDPartyData, setThisTDPartyData] = useState(null)


    const {TD} = useParams()

    useEffect(() => {

        setTDData(data)

    }, [])

    console.log(TD)


    useEffect(() => {

        if(!TDData) return null;

        function getThisTDName() {

        let tdName = TD

        return tdName.replace('-', ' ') 
        
        }

        const name = getThisTDName()

        const thisTDObj = TDData.filter(d => name === d.name)

        
        setThisTDData(thisTDObj)

    }, [TDData])


useEffect(() => {


if(!thisTDData) return null;


let tdParty = thisTDData[0].party

let just = TDData.filter(d => d.party == tdParty)

setThisTDPartyData(just)

}, [TDData, thisTDData])


    if(!thisTDData || !thisTDPartyData || !TDData) return null;

    console.log(thisTDData)


    return (

        <div style={{background: "white"}}>
        <Grid container xs={12}>               
        <Grid item xs={12}>
                <TDHeader justThisTDData={thisTDData}/>
            </Grid>    
        
            <Grid item xs={12} sm={6}>
                <TDInterests justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData} />
            </Grid>            
            {/* <Grid item xs={12} sm={6}>
                <TDQuestionsTowardsTopic justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData} />
            </Grid>    */}
            <Grid item xs={12} sm={6}>
                <TDQuestionsAskedTo justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData} />
            </Grid>  
            <Grid item xs={12} >
                <TDTopicBarchart justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData} />
            </Grid>  
            
            <Grid item xs={12} sm={6}>
                <TDPolarityStats justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>            
            <Grid item xs={12} sm={6}>
                <TDSubjectivityStats justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>            
            <Grid item xs={12}>
                <TDLineChartPolarity justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>              
            <Grid item xs={12} sm={4}>
                <TDFollowerStats justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TDRetweetStats justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TDActivityStats justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData} />
            </Grid>    
              
            <Grid item xs={12}>
                <TDLineChartFollowers justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>
            <Grid item xs={12}>
                <TDLineChartRetweets justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>
            <Grid item xs={12}>
                <TDLineChartActivity justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>

            <Grid item xs={12}>
                <TDLineChartSubjectivity justThisTDData={thisTDData} justThisTDPartyData={thisTDPartyData}  allTDData={TDData}/>
            </Grid>   
        </Grid>
        </div>
    )
}

export default TDPage
