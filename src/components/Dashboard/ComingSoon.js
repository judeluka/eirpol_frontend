import { Typography } from '@material-ui/core'
import React from 'react'
import { Grid } from '@material-ui/core'

const ComingSoon = () => {




    return (
        <Grid container xs={12} sm={12} justifyContent="space-around">
            <Grid item >
        <div className="featuredItem" style={{display: "inline-block", justifyContent: "center", fontSize: "20px", padding: "50px", paddingLeft: "100px", paddingRight: "100px"}}>
            <div>
            <Typography variant="h5" style={{marginBottom: "20px"}}>Coming Soon</Typography>
            <ul style={{fontSize: "18px"}}>
            <li style={{listStyleType: "circle", marginBottom: "5px"}}>
            <p>Network Graph</p>
            </li>
            <li style={{listStyleType: "circle", marginBottom: "5px"}}>
            <p>Parliamentary Data</p>
            </li>
            <li style={{listStyleType: "circle", marginBottom: "5px"}}>
            <p>Electoral Data</p>
            </li>
            <li style={{listStyleType: "circle", marginBottom: "5px"}}>
            <p>Standalone TD pages</p>
            </li>
            <li style={{listStyleType: "circle", marginBottom: "5px"}}>
            <p>API</p>
            </li>
            </ul>
            </div>
        </div>
        </Grid>
        </Grid>
    )
}

export default ComingSoon
