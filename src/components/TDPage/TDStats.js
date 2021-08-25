import React from 'react'
import { Grid, Typography, Avatar } from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import GaugeChart from 'react-gauge-chart'


export const TDFollowerStats = () => {

    const govPos = "Taoiseach"
    const party = "Fianna Fáil"
    const partyLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Fianna_F%C3%A1il_logo_circa_1970s%2C_1980s.png/220px-Fianna_F%C3%A1il_logo_circa_1970s%2C_1980s.png"
    const TDFollowerCount = "567,342"


    return (
       

        <div className="featuredItem">
        
        <span className="featuredTitle" style={{marginLeft: 0}}>Twitter Followers</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#2 in Dáil</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#1 in FF</span>
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">450,042</span>
                <span className="featuredFollowerChange">+4.9% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
    </div>


            
    )
}



export const TDRetweetStats = () => {


    return (

        <div className="featuredItem">
        
        <span className="featuredTitle" style={{marginLeft: 0}}>Retweets this week</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#16 in Dáil</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#4 in FF</span>
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">27</span>
                <span className="featuredFollowerChange">-1.2% <ArrowDownward style={{fill: "red"}}/></span>
        </div>
    </div>
    )
}


export const TDTwitterActivity = () => {




    return (


        <div className="featuredItem">
        
        <span className="featuredTitle" style={{marginLeft: 0}}>Tweets this week</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#16 in Dáil</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#4 in FF</span>
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">17</span>
                <span className="featuredFollowerChange">-22.5% <ArrowDownward style={{fill: "red"}}/></span>
        </div>
    </div>

    )

}

export const TDSentimentGauge = () => {

return (
    <div className="featuredItem">
    <Typography style={{marginBottom: "5px"}} variant="h6">Micheál Martin has a sunny disposition</Typography>
    <p>Micheál ranks 1st  in his party, and 1st overall for positive tweet sentiment. See through <a href="#" style={{color: "lightblue"}}> time</a></p>
    <GaugeChart
    percent={0.15}
    style={{marginTop: "20px"}}
    formatTextValue={value=>value/100}
    />
</div>
)

} 


export const TDConnectivityGauge = () => {


    return (
        <div className="featuredItem">
        <Typography style={{marginBottom: "5px"}} variant="h6">Micheál Martin is not well connected</Typography>
        <p>Micheál ranks 23rd in his party, and 59th overall for connectivty. See through <a href="#" style={{color: "lightblue"}}> time</a></p>
        <GaugeChart 
        percent={0.2}
        style={{marginTop: "20px"}}
        formatTextValue={value=>value/100}
        />
    </div>
    )
}

export const TDLinks = () => {





    return (


    <div className="featuredItem">
        <Typography style={{marginBottom: "5px"}} variant="h6">Micheál Martin is not well connected</Typography>
        <p>Micheál ranks 23rd in his party, and 59th overall for connectivty. See through <a href="#" style={{color: "lightblue"}}> time</a></p>
        <GaugeChart 
        percent={0.2}
        style={{marginTop: "20px"}}
        formatTextValue={value=>value/100}
        />
    </div>




    )
}