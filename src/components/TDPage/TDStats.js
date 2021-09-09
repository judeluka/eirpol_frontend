import React, {useState, useEffect} from 'react'
import { Grid, Typography, Avatar } from '@material-ui/core'
import { ArrowDownward, ArrowUpward, ContactSupportOutlined } from '@material-ui/icons'
import GaugeChart from 'react-gauge-chart'
import { ascending, descending } from 'd3-array'
import { ifStatement } from '@babel/types'


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
        

    <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Twitter Followers</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInParty} in party</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInDail} in Dáil</span>
            
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers" style={{color: "black"}}>{thisTDData[0].followerData[currentWeek].followers.toLocaleString()}</span>
               {changeSign == '+' ? <span className="featuredFollowerChange" style={{color: "black"}}>{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>} 
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

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Retweets this week</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInParty} in party</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInDail} in Dáil</span>
        <div className="featuredFollowerContainer" style={{color: "black"}}>
            <span className="featuredFollowers" style={{color: "black"}}>{thisTDData[0].retweetData[currentWeek].retweets.toLocaleString()}</span>
            {changeSign == '+' ? <span className="featuredFollowerChange" style={{color: "black"}}>{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>}
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
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !rankInParty || !rankInDail) return null;


        
    return (

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Original Tweets this week</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInParty} in party</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInDail} in Dáil</span>
        <div className="featuredFollowerContainer" style={{color: "black"}}>
            <span className="featuredFollowers" style={{color: "black"}}>{thisTDData[0].retweetData[currentWeek].original_tweets.toLocaleString()}</span>
            {changeSign == '+' ? <span className="featuredFollowerChange" >{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>}
        </div>
    </div>
    )
}

export const TDPolarityStats = ({justThisTDData, justThisTDPartyData, allTDData}) => {


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


        setCurrentWeek(thisTDData[0].sentimentData.length - 1)

    }, [thisTDData])

    useEffect(() => {

        if(!thisTDParty || !currentWeek || !thisTDData) return null;
    
        let justTDsOnTwitter = thisTDParty.filter(function(d) {
          
            if(d.sentimentData != undefined) {
            return d
          }
        }
        )
    
        justTDsOnTwitter.sort(function(a, b) {
            return ascending(a.sentimentData[currentWeek].polarity, b.sentimentData[currentWeek].polarity)
           })
    
           const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name);
    
           setRankInParty(index + 1)
    
        }, [thisTDData, thisTDParty, currentWeek])

        useEffect(() => {

            if(!thisTDData || !dailData || !currentWeek) return null;
    
            console.log(dailData)
    
            const justTDsOnTwitter = dailData.filter(function(d) {
              
                if(d.sentimentData != undefined) {
                return d
              }
            }
            )
    
            justTDsOnTwitter.sort(function(a, b) {
                return ascending(a.sentimentData[currentWeek].polarity, b.sentimentData[currentWeek].polarity)
               })
    
    
            const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name)
    
            setRankInDail(index + 1)
    
        }, [thisTDData, dailData, currentWeek])
    
    
        useEffect(() => {
    
        if(!thisTDData || !currentWeek) return null;
    
        function getChange() {
    
            var thisWeek = currentWeek;
            var lastWeek = currentWeek - 1;
            var thisWeekVal = thisTDData[0].sentimentData[thisWeek].polarity
            var lastWeekVal = thisTDData[0].sentimentData[lastWeek].polarity
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

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Sentiment over last week</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInParty} most negative in party</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInDail} in Dáil</span>
        <div className="featuredFollowerContainer" style={{color: "black"}}>
            <span className="featuredFollowers" style={{color: "black"}}>{thisTDData[0].sentimentData[currentWeek].polarity.toLocaleString()}</span>
            {changeSign == '+' ? <span className="featuredFollowerChange" style={{color: "black"}}>{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>}
        </div>
    </div>
    )
}

export const TDSubjectivityStats = ({justThisTDData, justThisTDPartyData, allTDData}) => {


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


        setCurrentWeek(thisTDData[0].sentimentData.length - 1)

    }, [thisTDData])

    useEffect(() => {

        if(!thisTDParty || !currentWeek || !thisTDData) return null;
    
        let justTDsOnTwitter = thisTDParty.filter(function(d) {
          
            if(d.sentimentData != undefined) {
            return d
          }
        }
        )
    
        justTDsOnTwitter.sort(function(a, b) {
            return descending(a.sentimentData[currentWeek].subjectivity, b.sentimentData[currentWeek].subjectivity)
           })
    
           const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name);
    
           setRankInParty(index + 1)
    
        }, [thisTDData, thisTDParty, currentWeek])

        useEffect(() => {

            if(!thisTDData || !dailData || !currentWeek) return null;
    
            console.log(dailData)
    
            const justTDsOnTwitter = dailData.filter(function(d) {
              
                if(d.sentimentData != undefined) {
                return d
              }
            }
            )
    
            justTDsOnTwitter.sort(function(a, b) {
                return descending(a.sentimentData[currentWeek].subjectivity, b.sentimentData[currentWeek].subjectivity)
               })
    
    
            const index = justTDsOnTwitter.map(d => d.name).indexOf(thisTDData[0].name)
    
            setRankInDail(index + 1)
    
        }, [thisTDData, dailData, currentWeek])
    
    
        useEffect(() => {
    
        if(!thisTDData || !currentWeek) return null;
    
        function getChange() {
    
            var thisWeek = currentWeek;
            var lastWeek = currentWeek - 1;
            var thisWeekVal = thisTDData[0].sentimentData[thisWeek].subjectivity
            var lastWeekVal = thisTDData[0].sentimentData[lastWeek].subjectivity
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

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Subjectivity over last week</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInParty} in party</span>
            <span className="featuredSub" style={{marginLeft: '10px', color: "black"}}>#{rankInDail} in Dáil</span>
        <div className="featuredFollowerContainer" style={{color: "black"}}>
            <span className="featuredFollowers" style={{color: "black"}}>{thisTDData[0].sentimentData[currentWeek].subjectivity.toLocaleString()}</span>
            {changeSign == '+' ? <span className="featuredFollowerChange" style={{color: "black"}}>{changeSign}{change.toLocaleString()}% <ArrowUpward style={{fill: "green"}}/></span> : <span className="featuredFollowerChange">{change.toLocaleString()}% <ArrowDownward style={{fill: "red"}}/></span>}
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

        if(toSort.length > 3) {
          toSort.length = 3 
        }

        console.log(toSort)

        

        for(let i = 0; i < toSort.length; i++) {
            if(toSort[i].length == 2) {
            toSort[i].length = 1
            }
        }


        setTopics(toSort)

        console.log(thisTDData)

        console.log(topicInterestedIn)

        
    
    
        }, [currentWeek, thisTDData])
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !topics) return null;

  
    return (

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Topics most interested in...</span>
            {/* <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span> */}
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers" style={{fontSize: 24, color: "black"}}> 
            <span style={{fontSize: "24px"}}>{topics[0]}</span><span style={{fontSize: "20px", opacity: 0.7}}> {topics[1]}</span><span style={{fontSize: "16px", opacity: 0.7}}> {topics[2]}</span>
                
                </span>
        </div>
    </div>
    )
}

export const TDQuestionsTowardsTopic = ({justThisTDData, justThisTDPartyData, allTDData}) => {


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

        if(toSort.length > 3) {
          toSort.length = 3 
        }

        console.log(toSort)

        

        for(let i = 0; i < toSort.length; i++) {
            if(toSort[i].length == 2) {
            toSort[i].length = 1
            }
        }


        setTopics(toSort)

        console.log(thisTDData)

        console.log(topicInterestedIn)

        
    
    
        }, [currentWeek, thisTDData])


        useEffect(() => {

            if(!thisTDParty || !topics || !thisTDData || !dailData) return null

            const topic = topics[0]

            function getWrittenTopicInterestRankInParty() {

                var test = thisTDParty.map(function(d) {

                    if(d.writtenQuestions[0].writtenQuestions.topic == undefined) {
                        return [d.name, 0]
                    }

                    if(d.writtenQuestions[0].writtenQuestions.topic[topic]) {

                        return [d.name, d.writtenQuestions[0].writtenQuestions.topic[topic]]
                    }

                    if(!d.writtenQuestions[0].writtenQuestions.topic[topic]) {
                        return [d.name, 0]
                    }

                })

                return test





            }

            console.log(getWrittenTopicInterestRankInParty())



        }, [topics, thisTDParty])
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !topics) return null;

  
    return (

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Topics most interested in...</span>
            {/* <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span> */}
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers" style={{fontSize: 24, color: "black"}}> 
            <span style={{fontSize: "24px"}}>{topics[0]}</span><span style={{fontSize: "20px", opacity: 0.7}}> {topics[1]}</span><span style={{fontSize: "16px", opacity: 0.7}}> {topics[2]}</span>
                
                </span>
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

        if(toSort.length > 3) {
            toSort.length = 3  
          }

        for(let i = 0; i < toSort.length; i++) {
            if(toSort[i].length == 2) {
                toSort[i].length = 1
            }
            
        }

        setTo(toSort)
    
        }, [currentWeek, thisTDData])
        
        console.log(currentWeek)

        if(!thisTDData || !currentWeek || !to) return null;
        
    return (

        <div className="featuredItem" style={{background: "white", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"}}>>
        <span className="featuredTitle" style={{marginLeft: 0, color: "black"}}>Usually has questions towards...</span>
            {/* <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInParty} in {thisTDData[0].party}</span>
            <span className="featuredSub" style={{marginLeft: '10px'}}>#{rankInDail} in Dáil</span> */}
        <div className="featuredFollowerContainer">
            <span className="featuredFollowers" style={{fontSize: 24, color: "black", marginLeft: "10px"}}>
                
                
                <span style={{fontSize: "24px"}}>{to[0]}</span><span style={{fontSize: "20px", opacity: 0.7}}> {to[1]}</span><span style={{fontSize: "16px", opacity: 0.7}}> {to[2]}</span>
                </span>
        </div>
    </div>
    )
}

