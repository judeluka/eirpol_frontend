import { Grid, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import './footer.css'
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    myClassName: {
      backgroundColor: "white",
      marginBottom: "5px",
      position: "relative",
      "&:hover": {
        backgroundColor: "#ffdd40"
      }
    }
  }));


const Footer = () => {

    const classes = useStyles()


    return (

<div id="footer" style={{textAlign: "center", background: "#004D44", position: "absolute", width: "100%", height: "100px", alignItems: "center", display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
  paddingTop: "40px",
  paddingBottom: "50px"}}>
    <Grid container justifyContent="center" alignItems="center" style={{height: "height"}}>
        <Grid xs={12}>
            <div style={{textAlign: "center"}}>
    <IconButton className={classes.myClassName} style={{color: "#004D44"}} aria-label="https://github.com/judeluka/eirpol" onClick={() => window.open('https://github.com/judeluka/eirpol')}>
    <GitHubIcon style={{fontSize: "50px"}}></GitHubIcon>  
    </IconButton>
    </div>
    </Grid>
    <Grid >
<div style={{textAlign: "center"}}>
<Typography style={{color: "white"}}>jude-luka</Typography>
    </div>
    </Grid>
    </Grid>
</div>    

    )
}

export default Footer
