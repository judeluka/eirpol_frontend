import React, {useState, useEffect} from 'react'
import { Grid, Typography, Avatar } from '@material-ui/core'
import { ArrowDownward, ArrowUpward, ContactSupportOutlined } from '@material-ui/icons'
import GaugeChart from 'react-gauge-chart'
import { ascending, descending } from 'd3-array'


export const TDFollowerStats = ({justThisTDData, justThisTDPartyData, allTDData}) => {

    const [thisTDData, setThisTDData] = useState(null)
    const [thisTDParty, setThisTDParty] = useState(null)
    const [dailData, setDailData] = useState(null)
    const [currentWeek, setCurrentWeek] = useState(null)
    const [rankInParty, setRankInParty] = useState(null)
    const [rankInDail, setRankInDail] = useState(null)
    const [change, setChange] = useState(null)
    const [changeSign, setChangeSign] = useState(null)

    useEffect(() => {

    setThisTDData(justThisTDData)
    setThisTDParty(justThisTDPartyData)
    setDailData(allTDData)

    }, [])

    useEffect(() => {

        if(!thisTDData) return null;

        setCurrentWeek(thisTDData[0].followerData.length - 1)

    }, [thisTDData])


    useEffect(() => {

    if(!thisTDParty || !currentWeek || !thisTDData) return null;

    let justTDsOnTwitter = thisTDParty.filter(function(d) {
          
        if(d.followerData[0] != undefined) {
        return d
      }
    }
    )

    justTDsOnTwitter.sort(function(a, b) {
        return descending(a.followerData[currentWeek].followers, b.followerData[currentWeek].followers)
       })

       const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name);

       setRankInParty(index + 1)

    }, [thisTDData, thisTDParty, currentWeek])


    useEffect(() => {

        if(!thisTDData || !dailData || !currentWeek) return null;

        console.log(dailData)

        let justTDsOnTwitter = dailData.filter(function(d) {
          
            if(d.followerData[0] != undefined) {
            return d
          }
        }
        )

        justTDsOnTwitter.sort(function(a, b) {
            return descending(a.followerData[currentWeek].followers, b.followerData[currentWeek].followers)
           })


        const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name)

        setRankInDail(index + 1)

    }, [thisTDData, dailData, currentWeek])


    useEffect(() => {

    if(!thisTDData || !currentWeek) return null;

    function getChange() {

        var thisWeek = currentWeek;
        var lastWeek = currentWeek - 1;
        var thisWeekVal = thisTDData[0].followerData[thisWeek].followers
        var lastWeekVal = thisTDData[0].followerData[lastWeek].followers
        var change = ((thisWeekVal - lastWeekVal) / lastWeekVal) * 100

        return change
    }

    if(getChange() < 0) {
        setChangeSign('-')
    } else {
        setChangeSign('+')
    }

    setChange(getChange())


    }, [currentWeek, thisTDData])




    if(!thisTDData || !currentWeek || !rankInParty || !rankInDail ||!change) return null;


    return (
       

    <div className="featuredItem">
        <span className="featuredTitle" style={{marginLeft: 0}}>Twitter Followers</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span>
            
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{thisTDData[0].followerData[currentWeek].followers.toLocaleString()}</span>
               {changeSign == '+' ? <span className="featuredFollowerChange">{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>} 
        </div>
    </div>


            
    )
}

export const TDRetweetStats = ({justThisTDData, justThisTDPartyData, allTDData}) => {


    const [thisTDData, setThisTDData] = useState(null)
    const [thisTDParty, setThisTDParty] = useState(null)
    const [dailData, setDailData] = useState(null)
    const [currentWeek, setCurrentWeek] = useState(null)
    const [rankInParty, setRankInParty] = useState(null)
    const [rankInDail, setRankInDail] = useState(null)
    const [change, setChange] = useState(null)
    const [changeSign, setChangeSign] = useState(null)



    useEffect(() => {

        setThisTDData(justThisTDData)
        setThisTDParty(justThisTDPartyData)
        setDailData(allTDData)

    }, [])


    useEffect(() => {

        if(!thisTDData) return null;


        setCurrentWeek(thisTDData[0].retweetData.length - 1)

    }, [thisTDData])

    useEffect(() => {

        if(!thisTDParty || !currentWeek || !thisTDData) return null;
    
        let justTDsOnTwitter = thisTDParty.filter(function(d) {
          
            if(d.retweetData[0] != undefined) {
            return d
          }
        }
        )
    
        justTDsOnTwitter.sort(function(a, b) {
            return descending(a.retweetData[currentWeek].retweets, b.retweetData[currentWeek].retweets)
           })
    
           const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name);
    
           setRankInParty(index + 1)
    
        }, [thisTDData, thisTDParty, currentWeek])

        useEffect(() => {

            if(!thisTDData || !dailData || !currentWeek) return null;
    
            console.log(dailData)
    
            const justTDsOnTwitter = dailData.filter(function(d) {
              
                if(d.retweetData[0] != undefined) {
                return d
              }
            }
            )
    
            justTDsOnTwitter.sort(function(a, b) {
                return descending(a.retweetData[currentWeek].retweets, b.retweetData[currentWeek].retweets)
               })
    
    
            const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name)
    
            setRankInDail(index + 1)
    
        }, [thisTDData, dailData, currentWeek])
    
    
        useEffect(() => {
    
        if(!thisTDData || !currentWeek) return null;
    
        function getChange() {
    
            var thisWeek = currentWeek;
            var lastWeek = currentWeek - 1;
            var thisWeekVal = thisTDData[0].retweetData[thisWeek].retweets
            var lastWeekVal = thisTDData[0].retweetData[lastWeek].retweets
            var change = ((thisWeekVal - lastWeekVal) / lastWeekVal) * 100

            if(!change) {
                return change = 0
            } else if (change === Infinity){
                return change = thisWeekVal * 100
            }
            else {
                return change
            }
    
            
        }
    
        if(getChange() < 0) {
            setChangeSign('-')
        } else {
            setChangeSign('+')
        }
    
        setChange(getChange())
    
    
        }, [currentWeek, thisTDData])

        console.log(change)

        if(!thisTDData || !currentWeek || !rankInParty || !rankInDail) return null;


        
    return (

        <div className="featuredItem">
        <span className="featuredTitle" style={{marginLeft: 0}}>Retweets this week</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span>
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{thisTDData[0].retweetData[currentWeek].retweets.toLocaleString()}</span>
            {changeSign == '+' ? <span className="featuredFollowerChange">{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>}
        </div>
    </div>
    )
}

export const TDActivityStats = ({justThisTDData, justThisTDPartyData, allTDData}) => {


    const [thisTDData, setThisTDData] = useState(null)
    const [thisTDParty, setThisTDParty] = useState(null)
    const [dailData, setDailData] = useState(null)
    const [currentWeek, setCurrentWeek] = useState(null)
    const [rankInParty, setRankInParty] = useState(null)
    const [rankInDail, setRankInDail] = useState(null)
    const [change, setChange] = useState(null)
    const [changeSign, setChangeSign] = useState(null)



    useEffect(() => {

        setThisTDData(justThisTDData)
        setThisTDParty(justThisTDPartyData)
        setDailData(allTDData)

    }, [])


    useEffect(() => {

        if(!thisTDData) return null;


        setCurrentWeek(thisTDData[0].retweetData.length - 1)

    }, [thisTDData])

    useEffect(() => {

        if(!thisTDParty || !currentWeek || !thisTDData) return null;
    
        let justTDsOnTwitter = thisTDParty.filter(function(d) {
          
            if(d.retweetData[0] != undefined) {
            return d
          }
        }
        )
    
        justTDsOnTwitter.sort(function(a, b) {
            return descending(a.retweetData[currentWeek].original_tweets, b.retweetData[currentWeek].original_tweets)
           })
    
           const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name);
    
           setRankInParty(index + 1)
    
        }, [thisTDData, thisTDParty, currentWeek])

        useEffect(() => {

            if(!thisTDData || !dailData || !currentWeek) return null;
    
            console.log(dailData)
    
            const justTDsOnTwitter = dailData.filter(function(d) {
              
                if(d.retweetData[0] != undefined) {
                return d
              }
            }
            )
    
            justTDsOnTwitter.sort(function(a, b) {
                return descending(a.retweetData[currentWeek].original_tweets, b.retweetData[currentWeek].original_tweets)
               })
    
    
            const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name)
    
            setRankInDail(index + 1)
    
        }, [thisTDData, dailData, currentWeek])
    
    
        useEffect(() => {
    
        if(!thisTDData || !currentWeek) return null;
    
        function getChange() {
    
            var thisWeek = currentWeek;
            var lastWeek = currentWeek - 1;
            var thisWeekVal = thisTDData[0].retweetData[thisWeek].original_tweets
            var lastWeekVal = thisTDData[0].retweetData[lastWeek].original_tweets
            var change = ((thisWeekVal - lastWeekVal) / lastWeekVal) * 100
    
            return change
        }
    
        if(getChange() < 0) {
            setChangeSign('-')
        } else {
            setChangeSign('+')
        }
    
        setChange(getChange())
    
    
        }, [currentWeek, thisTDData])
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !rankInParty || !rankInDail ||!change) return null;


        
    return (

        <div className="featuredItem">
        <span className="featuredTitle" style={{marginLeft: 0}}>Original Tweets this week</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span>
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers">{thisTDData[0].retweetData[currentWeek].original_tweets.toLocaleString()}</span>
            {changeSign == '+' ? <span className="featuredFollowerChange">{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>}
        </div>
    </div>
    )
}

export const TDSentimentGauge = ({data}) => {


    const [thisTDData, setThisTDData] = useState(null)


    useEffect(() => {

        setThisTDData(data)



    }, [data])


    if(!thisTDData) return null;

    console.log(thisTDData.name)




return (
    <div className="featuredItem">
    <Typography style={{marginBottom: "5px"}} variant="h6">{thisTDData.name} has a sunny disposition</Typography>
    <p>Micheál ranks 1st  in his party, and 1st overall for positive tweet sentiment. See through <a href="#" style={{color: "lightblue"}}> time</a></p>
    <GaugeChart
    percent={0.15}
    style={{marginTop: "20px"}}
    formatTextValue={value=>value/100}
    />
</div>
)

} 

export const TDInterests = ({justThisTDData, justThisTDPartyData, allTDData}) => {


    const [thisTDData, setThisTDData] = useState(null)
    const [topics, setTopics] = useState(null)
    const [thisTDParty, setThisTDParty] = useState(null)
    const [dailData, setDailData] = useState(null)
    const [currentWeek, setCurrentWeek] = useState(null)
    const [rankInParty, setRankInParty] = useState(null)
    const [rankInDail, setRankInDail] = useState(null)
    const [change, setChange] = useState(null)
    const [changeSign, setChangeSign] = useState(null)



    useEffect(() => {

        setThisTDData(justThisTDData)
        setThisTDParty(justThisTDPartyData)
        setDailData(allTDData)

    }, [])


    useEffect(() => {

        if(!thisTDData) return null;
        setCurrentWeek(thisTDData[0].retweetData.length - 1)

    }, [thisTDData])
    
        useEffect(() => {
    
        if(!thisTDData) return null;

        if(!thisTDData[0].writtenQuestions[0].writtenQuestions.topic) return null;

        var topicInterestedIn = thisTDData[0].writtenQuestions[0].writtenQuestions.topic

        var toSort = Object.entries(topicInterestedIn)

        console.log(toSort)


        toSort.sort(function(a, b) {
           return  b[1]-a[1]
        })

        if(toSort.length > 5) {
          toSort.length = 5  
        }

        console.log(toSort)

        

        for(let i = 0; i < toSort.length; i++) {
            if(toSort[i].length == 2) {
            toSort[i].length = 1
            }
        }


        setTopics(toSort.toString().replaceAll(',', ', '))

        console.log(thisTDData)

        console.log(topicInterestedIn)

        
    
    
        }, [currentWeek, thisTDData])
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !topics) return null;


        
    return (

        <div className="featuredItem">
        <span className="featuredTitle" style={{marginLeft: 0}}>Topics most interested in...</span>
            {/* <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span> */}
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers" style={{fontSize: 16}}>{topics}</span>
        </div>
    </div>
    )
}

export const TDQuestionsAskedTo = ({justThisTDData, justThisTDPartyData, allTDData}) => {


    const [thisTDData, setThisTDData] = useState(null)
    const [to, setTo] = useState(null)
    const [thisTDParty, setThisTDParty] = useState(null)
    const [dailData, setDailData] = useState(null)
    const [currentWeek, setCurrentWeek] = useState(null)
    const [rankInParty, setRankInParty] = useState(null)
    const [rankInDail, setRankInDail] = useState(null)
    const [change, setChange] = useState(null)
    const [changeSign, setChangeSign] = useState(null)



    useEffect(() => {

        setThisTDData(justThisTDData)
        setThisTDParty(justThisTDPartyData)
        setDailData(allTDData)

    }, [])


    useEffect(() => {

        if(!thisTDData) return null;
        setCurrentWeek(thisTDData[0].retweetData.length - 1)

    }, [thisTDData])
    
        useEffect(() => {
    
        if(!thisTDData) return null;

        if(!thisTDData[0].writtenQuestions[0].writtenQuestions.to) return null;

        var usuallyAsks = thisTDData[0].writtenQuestions[0].writtenQuestions.to

        var toSort = Object.entries(usuallyAsks)


        toSort.sort(function(a, b) {
           return  b[1]-a[1]
        })

        if(toSort.length > 5) {
            toSort.length = 5  
          }

        for(let i = 0; i < toSort.length; i++) {
            if(toSort[i].length == 2) {
                toSort[i].length = 1
            }
            
        }

        setTo(toSort.toString().replaceAll(',', ', '))
    
        }, [currentWeek, thisTDData])
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !to) return null;
        
    return (

        <div className="featuredItem">
        <span className="featuredTitle" style={{marginLeft: 0}}>Usually has questions towards...</span>
            {/* <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span> */}
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers" style={{fontSize: 16}}>{to}</span>
        </div>
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