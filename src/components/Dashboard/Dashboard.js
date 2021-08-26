import React, { useEffect, useState } from 'react'
import {Grid} from '@material-ui/core'
import {MostFollowedTD, MostFollowedParty, MostRetweetedTD, DailTotal, MostNegativeTD, MostActiveTD, MostPositiveTD } from './FeaturedItem/FeaturedItem'
import SimpleLineChart from './SimpleLineChart/SimpleLineChart'
import SimplePieChart from './SimplePieChart/SimplePieChart'
import {DailSentimentGauge, DailConnectivityGauge} from './SimpleGauge/SimpleGauge'
import MultilineAppV3PartyFollowers from './MultilineChartV3PartyFollowers/MultilineAppV3PartyFollowers'
import PartyFollowersGraph from './PartyFollowersGraph/PartyFollowersGraph'
import Scatterplot from './Scatterplot/Scatterplot'
import { PartyBarchart } from './PartyBarchart/PartyBarchart'
import Test from '../Test/Test'
import ForceGraph from './ForceGraph/ForceGraph'
import axios from 'axios'
import ScatterplotZoom from './ScatterplotZoom/ScatterplotZoom'
import { BarChart } from './BarChart.js'
import ScatterplotParty from './ScatterplotParty/ScatterplotParty'
import { VoteBarchart } from './VoteBarchart/VoteBarchart'
import LineChart from '../LineChart/LineChart'
import GroupedBarChart from './GroupedBarChart/GroupedBarChart'
import GroupedBarChartTest from './GroupedBarChartTest/GroupedBarChartTest'
import { Typography } from '@material-ui/core'
import PieChart from './PieChart/PieChart'
import MultilineAppV3PartyRetweets from './MultilineChartV3PartyRetweets/MultilineAppV3PartyRetweets'
import MultilineAppV3PartyPolarity from './MultilineChartV3PartyPolarity/MultilineAppV3PartyPolarity'
import MultilineAppV3PartySubjectivity from './MultilineChartV3PartySubjectivity/MultilineAppV3PartySubjectivity'
import ComingSoon from './ComingSoon'
import Welcome from './Welcome/Welcome'



const Dashboard = () => {

    const [TDData, setTDData] = useState(null)
    const [oirData, setOirData] = useState(null)


    React.useEffect(() => {
        axios.get('https://eirpol.herokuapp.com/api').then((response) => {
          setTDData(response.data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ));
          
        });

        // axios.get('https://api.oireachtas.ie/v1/members?date_start=2020-01-01&chamber_id=&date_end=2099-01-01&limit=50').then((response) => {

        //     setOirData(response.data)
            
        //   });
        
        
      }, []);
    

      if (!TDData) return null;

        console.log(TDData)

    return (
        

        <Grid container xs={12} spacing={0}>         

            <Grid item xs={12} sm={12}>
                <Welcome data={TDData[0].followerData}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <MostFollowedTD data={TDData}/>
            </Grid>

            <Grid item xs={12} sm={4}>
                <MostFollowedParty data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <MostRetweetedTD data={TDData}/>
            </Grid>    

            <Grid item xs={12} sm={4}>
                <MostPositiveTD data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <MostNegativeTD data={TDData}/>
            </Grid>    
            <Grid item xs={12} sm={4}>
                <MostActiveTD data={TDData}/>
            </Grid>       

            <Grid item xs={12} sm={6}>
            <DailSentimentGauge data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <DailConnectivityGauge data={TDData}/>
            </Grid>        
            <Grid item xs={12} sm={12}>
                <DailTotal data={TDData}/>
            </Grid>  
            <Grid item xs={12} sm={12}>
                <Scatterplot data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <PartyBarchart data={TDData}/>
            </Grid>
            {/* <Grid item xs={12} sm={12}>
                <ForceGraph/>
            </Grid> */}
            <Grid item xs={12} sm={12}>
                <ScatterplotParty data={TDData}/>
            </Grid>

            <Grid item xs={12} sm={12}>
                <MultilineAppV3PartyFollowers data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MultilineAppV3PartyRetweets data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MultilineAppV3PartyPolarity data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={12}>
                <MultilineAppV3PartySubjectivity data={TDData}/>
            </Grid>            
            {/* <Grid item xs={12} sm={6}>
                <VoteBarchart data={TDData}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <LineChart data={TDData}/>
            </Grid> */}
            <Grid item xs={12} sm={12}>
                <ComingSoon/>
            </Grid>




        </Grid>

    )
}

export default Dashboard
