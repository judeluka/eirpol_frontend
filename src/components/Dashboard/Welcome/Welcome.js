import React from 'react'
import { Typography } from '@material-ui/core'
import './welcome.css'


const Welcome = () => {


    return (
        <>
        <div className="featuredItem">
            <Typography variant="h5">What is this site for?</Typography>
            <p style={{marginBottom: "20px"}}>Visualising Irish Politics through:</p>
            <ul>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>TD Twitter Data</li>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>Oireachtas Data (soon)</li> 
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>News/Polling Data (soon)</li>
                <li style={{listStyleType: "circle",marginLeft: "20px",marginBottom: "5px"}}>Electoral Data (soon)</li> 
                </ul>
                <p style={{marginTop: "15px"}}>Or more succintly, through: <b style={{fontWeight: 600, color: "lightblue"}}>what TD's say</b>, <b style={{fontWeight: 600, color: "darkgreen"}}>what TD's do</b>, <b style={{fontWeight: 600, color: "lightpink"}}>what we think</b>, and <b style={{fontWeight: 600}}>how we vote.</b></p>
                
            
</div><div className="featuredItem">
<Typography variant="h5">Twitter Data</Typography>
            <p style={{marginBottom: "5px", marginTop: "15px"}}>Every week, each TD has the following metrics recorded:</p>
                <ul>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>Followers</li>
                </ul>
                <p style={{marginBottom: "5px"}} >And for the last seven days:</p>
                <ul>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>Retweets</li>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>Original Tweets posted</li> 
                <li style={{listStyleType: "circle",marginLeft: "20px",marginBottom: "5px"}}>Tweet subjectivity average</li> 
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>Tweet polarity average</li> 
                </ul>
                <p style={{marginBottom: "5px", marginTop: "15px"}}>To learn how polarity and subjectivity is calculated, click <a href="https://textblob.readthedocs.io/en/dev/">here</a>.</p>            
                <p style={{marginTop: "20px"}}>Questions to ask:</p>
            <ul>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>"Which party is most followed?"</li>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>"Is their a correlation between a TD's subjectivity or polarity, and the Party they are in?"</li>
                <li style={{listStyleType: "circle", marginLeft: "20px", marginBottom: "5px"}}>"Are subjective or polarising TD's more or less engaging?"</li>
                </ul>
                <p style={{marginTop: "15px"}}>Collections run every Tuesday since <b style={{fontWeight: 600}}>25/08/21</b>. Last Collection <b style={{fontWeight: 600}}>25/08/21</b>.
                </p>
        </div>
        </>
    )
}

export default Welcome
