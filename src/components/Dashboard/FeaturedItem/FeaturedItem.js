import React, { useEffect, useState } from 'react'
import { Avatar, Grid, useForkRef, Typography } from '@material-ui/core'
import {ArrowDownward, ArrowUpward, ContactlessOutlined, LocalConvenienceStoreOutlined, SettingsPhoneTwoTone} from '@material-ui/icons'
import './featureditem.css'
import * as d3 from 'd3'
import { BarChart } from '../BarChart'


export const MostFollowedTD = ({data}) => {



    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)

    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))

    }, [])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])

    
    
    if(!TDData || !currentWeekIndex) return null;

    const leo = TDData.filter(d => d.name === 'Leo Varadkar')[0]


    return (
    <div className="featuredItem">
        <span className="featuredSub">Most Followed TD</span>
        <Grid container xs={12} alignItems="center">
        <Grid item>
        <Avatar  src="https://www.finegael.ie/app/uploads/2016/09/leo_varadkar_thumbnail.jpg"/>
        </Grid>
        <Grid item >
        <span className="featuredTitle">Leo Varadkar</span><span class="party-dot-fg"/>
        </Grid>
        </Grid>
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{leo.followerData[currentWeekIndex].followers.toLocaleString()}</span>
                <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        
    </div>
    )
}


export const MostFollowedParty = ({data}) => {



    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)


    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))
        console.log(TDData)

    }, [data])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])

    

    if(!TDData || !currentWeekIndex) return null;
    const justFG = TDData.filter(d => d.party !== 'Fine Gael').map(d => d.followerData[currentWeekIndex].followers).reduce(function(a, b) {return a + b})
    
    console.log(justFG)

    return(


        <div className="featuredItem">
            <span className="featuredSub">Most Followed Party</span>
        <Grid container xs={12} alignItems="center">
        <Grid item>
        <Avatar  src="https://www.finegael.ie/app/themes/finegael/dist/images/FG-Logo-white-text-col-star.png"/>
        </Grid>
        <Grid item >
        <span className="featuredTitle">Fine Gael</span><span class="party-dot-fg"/>
        </Grid>
        </Grid>


        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{justFG.toLocaleString()}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        
    </div>




)
}

export const MostRetweetedTD = ({data}) => {


    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)


    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))

    }, [data])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])


    if(!TDData || !currentWeekIndex) return null;

    const mostRetweetsTD = TDData.sort(function(a, b) {

        return   d3.descending(a.retweetData[currentWeekIndex].retweets, b.retweetData[currentWeekIndex].retweets)

       })


    return (


        <div className="featuredItem">
            <span className="featuredSub">Most Retweets this week</span>
        <Grid container xs={12} alignItems="center">
        <Grid item>
        <Avatar  src={mostRetweetsTD[0].member_uri[0] + "/image/large"}/>
        </Grid>
        <Grid item >
        <span className="featuredTitle">{mostRetweetsTD[0].name}</span><span class="party-dot-sf"/>
        </Grid>
        </Grid>


        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{mostRetweetsTD[0].retweetData[currentWeekIndex].retweets}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        
    </div>

    )

}

export const MostActiveTD = ({data}) => {


    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)


    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))

    }, [data])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])


    if(!TDData || !currentWeekIndex) return null;
    const mostRetweetsTD = TDData.sort(function(a, b) {

        return   d3.descending(a.retweetData[currentWeekIndex].original_tweets, b.retweetData[currentWeekIndex].original_tweets)

       })

    return (


        <div className="featuredItem">
            <span className="featuredSub">Most Active this week (Original Tweets)</span>
        <Grid container xs={12} alignItems="center">
        <Grid item>
        <Avatar  src={mostRetweetsTD[0].member_uri[0] + "/image/large"}/>
        </Grid>
        <Grid item >
        <span className="featuredTitle">{mostRetweetsTD[0].name}</span><span class="party-dot-fg"/>
        </Grid>
        </Grid>


        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{mostRetweetsTD[0].retweetData[currentWeekIndex].original_tweets}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        
    </div>

    )

}

export const MostNegativeTD = ({data}) => {



    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)


    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))
        console.log(TDData)

    }, [data])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])


    

    if(!TDData || !currentWeekIndex) return null;

    const mostNegativeTD = TDData.sort(function(a, b) {

        return   d3.ascending(a.sentimentData[currentWeekIndex].polarity, b.sentimentData[currentWeekIndex].polarity)

       })



    return(


        <div className="featuredItem">
            <span className="featuredSub">Most Negative TD this Week</span>
        <Grid container xs={12} alignItems="center">
        <Grid item>
        <Avatar  src={mostNegativeTD[0].member_uri[0] + "/image/large"}/>
        </Grid>
        <Grid item >
        <span className="featuredTitle">{mostNegativeTD[0].name}</span><span class="party-dot-sf"/>
        </Grid>
        </Grid>


        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{mostNegativeTD[0].sentimentData[currentWeekIndex].polarity.toLocaleString()}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        
    </div>




)
}

export const MostPositiveTD = ({data}) => {



    const [TDData, setTDData] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)


    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))
        console.log(TDData)

    }, [data])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])

    

    if(!TDData || !currentWeekIndex) return null;

    const mostPositiveTD = TDData.sort(function(a, b) {

        return   d3.descending(a.sentimentData[currentWeekIndex].polarity, b.sentimentData[currentWeekIndex].polarity)

       })



    return(


        <div className="featuredItem">
            <span className="featuredSub">Most Positive TD this Week</span>
        <Grid container xs={12} alignItems="center">
        <Grid item>
        <Avatar  src={mostPositiveTD[0].member_uri[0] + "/image/large"}/>
        </Grid>
        <Grid item >
        <span className="featuredTitle">{mostPositiveTD[0].name}</span><span class="party-dot-ff"/>
        </Grid>
        </Grid>


        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{mostPositiveTD[0].sentimentData[currentWeekIndex].polarity.toLocaleString()}</span>
            <span className="featuredFollowerChange">+100% <ArrowUpward style={{fill: "green"}}/></span>
        </div>
        
    </div>




)
}

export const DailTotal = ({data}) => {

    const [TDData, setTDData] = useState(null)
    const [total, setTotal] = useState(null)
    const [tenTot, setTenTot] = useState(null)
    const [percTopTot, setPercTopTot] = useState(null)
    const [avg, setAvg] = useState(null)
    const [currentWeekIndex, setCurrentWeekIndex] = useState(null)

    useEffect(() => {

        setTDData(data.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        ))
        console.log(TDData)

    }, [data])

    useEffect(() => {

        if(!TDData) return null;

        setCurrentWeekIndex(TDData[0].followerData.length - 1)

    }, [TDData])

    

    useEffect(() => {

        if(!TDData || !currentWeekIndex) return null;


        const holder = TDData.map(d => d.followerData[currentWeekIndex].followers)
        const total = holder.reduce(function(a, b) {
            return a + b
        })

        setTotal(total)   
        
        const TDDataHolder = TDData;

        const topFive = TDDataHolder.sort(function (a, b) {


            return d3.descending(a.followerData[currentWeekIndex].followers, b.followerData[currentWeekIndex].followers)



        })




        

        const testtf = topFive.map(d => d.followerData[currentWeekIndex].followers)


        testtf.length = 10


        const tenTott = testtf.reduce(function(a,b) {

            return a + b

        })

        setTenTot(tenTott)


        setPercTopTot(tenTott / total)

        setAvg(Math.round(total / TDData.length))


        console.log(percTopTot)
        

    }, [TDData, currentWeekIndex])



    console.log(TDData)


    
    if(!TDData || !total || !currentWeekIndex) return null;


    
    

    return (


        <div className="featuredItem" >
        <Grid container xs={12} alignItems="center" style={{justifyContent: "center"}}>
        <Grid item >
        <Avatar  src="https://img2.thejournal.ie/inline/2163335/original/?width=630&version=2163335"/>
        </Grid>
        <Grid item >
        <Typography variant="h6" style={{justifyContent: "center", marginLeft: 10}}>Dáil Eireann</Typography>
        </Grid>
        </Grid>

        <div className="featuredFollowerContainer" style={{justifyContent: "center"}}>
            <span style={{fontSize: 14}}>Of the <span style={{fontWeight: "bold"}}>161</span> TDs in the Dáil, <span style={{fontWeight: "bold"}}>{TDData.length}</span> have Twitter.</span>
        </div>
        
        <div className="featuredFollowerContainer" style={{justifyContent: "center"}}>
            <span style={{fontSize: 14}}>They have a combined following of <span style={{fontWeight: "bold"}}>{total.toLocaleString()}</span>.</span>
        </div>

     
        <div className="featuredFollowerContainer" style={{justifyContent: "center"}}>
            <span style={{fontSize: 14}}>The 10 most followed TDs account for <span style={{fontWeight: "bold"}}>{tenTot.toLocaleString()}</span>, or <span style={{fontWeight: "bold"}}>{percTopTot.toLocaleString("en", {style: "percent"})} </span>of the total.</span>
        </div>        
        <div className="featuredFollowerContainer" style={{justifyContent: "center"}}>
            <span style={{fontSize: 14}}>The average TD has just <span style={{fontWeight: "bold"}}>{avg.toLocaleString()}</span>.</span>
        </div>   
        <BarChart data={TDData}/>
    </div>







    )

}



