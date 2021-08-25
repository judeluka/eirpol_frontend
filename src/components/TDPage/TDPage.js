import React from 'react'
import TDHeader from './TDHeader'
import {TDConnectivityGauge, TDFollowerStats, TDRetweetStats, TDSentimentGauge, TDTwitterActivity } from './TDStats'
import { Avatar, Grid } from '@material-ui/core'
import './tdpage.css'

const TDPage = () => {
    return (


        <Grid container xs={12}>               
        <Grid item xs={12}>
                <TDHeader/>
            </Grid>         
        <Grid item xs={12}>
                <TDSentimentGauge/>
            </Grid>
            <Grid item xs={12}>
                <TDConnectivityGauge/>
            </Grid>


            <Grid item xs={12}>
            <TDFollowerStats/>
            </Grid>
            <Grid item xs={12}>
                <TDRetweetStats/>
            </Grid>
            <Grid item xs={12}>
                <TDTwitterActivity/>
            </Grid>

        </Grid>
    )
}

export default TDPage
