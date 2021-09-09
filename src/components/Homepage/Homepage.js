
import React, {useEffect, useState} from 'react'
import HowToVoteIcon from '@material-ui/icons/HowToVote'
import HowToVoteTwoToneIcon from '@material-ui/icons/HowToVoteTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import TwitterIcon from '@material-ui/icons/Twitter';
import QuestionAnswerTwoTone from '@material-ui/icons/QuestionAnswerTwoTone';
import { Typography, Grid, Accordion, TextField, ListItem, ListItemText } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import './homepage.css'
import { BarChart } from '../Dashboard/BarChart';
import Scatterplot from '../Dashboard/Scatterplot/Scatterplot';
import TDWithConstituencyMap from '../ConstituencyDashboard/TDWithConstituencyMap';
import StreamGraphPolarity from '../Dashboard/StreamGraphPolarity/StreamGraphPolarity';
import TopicsBarChart from '../Dashboard/Issues/TopicsBarChart';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';
import MinisterQuestionsBarChart from '../Dashboard/Issues/MinisterQuestionsBarChart';


const Homepage = ({data}) => {






  


   const constituencies = [
        "Dublin-South-West",
        "Galway-East",
        "Mayo",
        "Kerry",
        "Limerick-City",
        "Cork-South-Central",
        "Dublin-North-West",
        "Dublin-Bay-North",
        "Dublin-Fingal",
        "Waterford",
        "Kildare-South",
        "Cork-East",
        "Cork-South-West",
        "Dublin-South-Central",
        "Kildare-North",
        "Wexford",
        "Dublin-Central",
        "Meath-East",
        "Donegal",
        "Dublin-Bay-South",
        "Louth",
        "Laois-Offaly",
        "Dublin-Rathdown",
        "Clare",
        "Cork-North-West",
        "Meath-West",
        "Sligo-Leitrim",
        "Galway-West",
        "Longford-Westmeath",
        "Cavan-Monaghan",
        "Roscommon-Galway",
        "Tipperary",
        "Limerick-County",
        "Wicklow",
        "Dublin-Mid-West",
        "Cork-North-Central",
        "Dublin-West",
        "Dún-Laoghaire",
        "Carlow-Kilkenny"
    ]

    const TDs = [
        
            "Peadar Tóibín",
            "Micheál Martin",
            "Paul McAuliffe",
            "Darragh O'Brien",
            "Seán Ó Fearghaíl",
            "Norma Foley",
            "John Lahart",
            "James Browne",
            "Mary Butler",
            "Michael McGrath",
            "Anne Rabbitte",
            "Marc MacSharry",
            "Robert Troy",
            "Cathal Crowe",
            "Joe Flaherty",
            "James Lawless",
            "Charlie McConalogue",
            "Jack Chambers",
            "Brendan Smith",
            "Seán Haughey",
            "Willie O'Dea",
            "Christopher O'Sullivan",
            "Jackie Cahill",
            "Dara Calleary",
            "Niall Collins",
            "Barry Cowen",
            "Sean Fleming",
            "Cormac Devlin",
            "Stephen Donnelly",
            "Aindrias Moynihan",
            "Pádraig O'Sullivan",
            "Éamon Ó Cuív",
            "Thomas Byrne",
            "Michael Moynihan",
            "Jim O'Callaghan",
            "James O'Connor",
            "Niamh Smyth",
            "John McGuinness",
            "Jennifer Murnane O'Connor",
            "Colm Brophy",
            "Ciarán Cannon",
            "Richard Bruton",
            "Paul Kehoe",
            "Neale Richmond",
            "Michael Creed",
            "Simon Coveney",
            "Joe McHugh",
            "Kieran O'Donnell",
            "Fergus O'Dowd",
            "Damien English",
            "Frankie Feighan",
            "Eoghan Murphy",
            "Alan Dillon",
            "Helen McEntee",
            "Joe Carey",
            "Simon Harris",
            "Paschal Donohoe",
            "Leo Varadkar",
            "Jennifer Carroll MacNeill",
            "Brendan Griffin",
            "Heather Humphreys",
            "Josepha Madigan",
            "Hildegarde Naughton",
            "Patrick O'Donovan",
            "Peter Burke",
            "Alan Farrell",
            "Martin Heydon",
            "Emer Higgins",
            "David Stanton",
            "Michael Ring",
            "Colm Burke",
            "Bernard Durkan",
            "Charles Flanagan",
            "John Paul Phelan",
            "Brian Leddin",
            "Patrick Costello",
            "Eamon Ryan",
            "Neasa Hourigan",
            "Marc Ó Cathasaigh",
            "Joe O'Brien",
            "Catherine Martin",
            "Steven  Matthews",
            "Roderic O'Gorman",
            "Francis Noel Duffy",
            "Malcolm Noonan",
            "Ossian Smyth",
            "Michael Healy-Rae",
            "Matt Shanahan",
            "Thomas Pringle",
            "Michael Collins",
            "Carol Nolan",
            "Noel Grealish",
            "Marian Harkin",
            "Michael McNamara",
            "Cathal Berry",
            "Michael Fitzmaurice",
            "Michael Lowry",
            "Richard O'Donoghue",
            "Catherine Connolly",
            "Peter Fitzpatrick",
            "Danny Healy-Rae",
            "Seán Canney",
            "Denis Naughten",
            "Verona Murphy",
            "Mattie McGrath",
            "Joan Collins",
            "Aodhán Ó Ríordáin",
            "Seán Sherlock",
            "Brendan Howlin",
            "Alan Kelly",
            "Ged Nash",
            "Ivana Bacik",
            "Duncan Smith",
            "Rose Conway-Walsh",
            "Denise Mitchell",
            "Pat Buckley",
            "Réada Cronin",
            "Mary Lou McDonald",
            "Darren O'Rourke",
            "Imelda Munster",
            "Violet-Anne Wynne",
            "Chris Andrews",
            "David Cullinane",
            "Johnny Guirke",
            "Patricia  Ryan",
            "Matt Carthy",
            "Mairéad Farrell",
            "Brian Stanley",
            "Ruairí Ó Murchú",
            "John Brady",
            "Sorca Clarke",
            "Pádraig Mac Lochlainn",
            "Mark Ward",
            "Donnchadh Ó Laoghaire",
            "Martin Browne",
            "Thomas Gould",
            "Maurice Quinlivan",
            "Claire Kerrane",
            "Paul Donnelly",
            "Louise O'Reilly",
            "Pearse Doherty",
            "Pa Daly",
            "Martin Kenny",
            "Eoin Ó Broin",
            "Aengus Ó Snodaigh",
            "Kathleen Funchion",
            "Pauline  Tully",
            "Seán Crowe",
            "Johnny Mythen",
            "Dessie Ellis",
            "Holly Cairns",
            "Cian O'Callaghan",
            "Catherine Murphy",
            "Jennifer  Whitmore",
            "Gary Gannon",
            "Róisín Shortall",
            "Paul Murphy",
            "Mick Barry",
            "Richard Boyd Barrett",
            "Bríd Smith",
            "Gino Kenny"
        
    ]



    const [TDData, setTDData] = useState(null)
    const [tweetsAnalysed, setTweetsAnalysed] = useState(null)
    const [questionsAnalysed, setQuestionsAnalysed] = useState(null)
    const [topicsAnalysed, setTopicsAnalysed] = useState(null)
    const [divisionsAnalysed, setDivisionsAnalysed] = useState(null)




    useEffect(() => {


    setTDData(data)


    }, [])


    useEffect(() => {

if(!TDData) return null;

    function getAllTweetsAnalysed() {


        var justTDsOnTwitter = TDData.filter(d => d.retweetData[0] != undefined)

        var sumOfAllTweets = justTDsOnTwitter.map(function(d) {

            var countArr = [];

            for(let i = 0; i < d.retweetData.length; i++) {

               var count =  d.retweetData[i].original_tweets

               countArr.push(count)

            }


            return countArr.reduce((a, b) => a + b)

        }).reduce((a, b) => a + b)


        return sumOfAllTweets

        }

        setTweetsAnalysed(getAllTweetsAnalysed)

    function getAllQuestionsAnalysed() {

        var justTDsWhoAsked = TDData.filter(d => d.writtenQuestions != undefined)
        
        const sumValues = obj => Object.values(obj).reduce((a,b) => a + b)

        var sumOfWrittenQuestions = justTDsWhoAsked.map(function(d) {

            var countArr = [];

            for(let i = 0; i < d.writtenQuestions.length; i++) {


                if(d.writtenQuestions[i].writtenQuestions.to != undefined) {
                   var count = sumValues(d.writtenQuestions[i].writtenQuestions.to)
                
                countArr.push(count)
                }
            }
            return countArr

        }).flat().reduce((a, b) => a + b)

        var sumOfOralQuestions = justTDsWhoAsked.map(function(d) {

            var countArr = [];

            for(let i = 0; i < d.oralQuestions.length; i++) {

                if(d.oralQuestions[i].oralQuestions.to != undefined) {
                   var count = sumValues(d.oralQuestions[i].oralQuestions.to)
                
                countArr.push(count)
                }
            }
            return countArr

        }).flat().reduce((a, b) => a + b)


        var totalQuestions = sumOfOralQuestions + sumOfWrittenQuestions

        return totalQuestions

        }

        setQuestionsAnalysed(getAllQuestionsAnalysed())

        function getAllTopicsAnalysed() {


        var justTDsWhoAsked = TDData.filter(d => d.writtenQuestions != undefined)

        var allWrittenTopics = justTDsWhoAsked.map(function(d) {

            var topicArr = []

            for(let i = 0; i < d.writtenQuestions.length; i++) {

            if(d.writtenQuestions[i].writtenQuestions.topic != undefined) {
                var topics = Object.keys(d.writtenQuestions[i].writtenQuestions.topic) 
                topicArr.push(topics)
            }


            }

            return topicArr

        }).flat().flat()

        var allOralTopics = justTDsWhoAsked.map(function(d) {

            var topicArr = []

            for(let i = 0; i < d.oralQuestions.length; i++) {

            if(d.oralQuestions[i].oralQuestions.topic != undefined) {
                var topics = Object.keys(d.oralQuestions[i].oralQuestions.topic) 
                topicArr.push(topics)
            }


            }

            return topicArr

        }).flat().flat()

        var allTopics = allOralTopics.concat(allWrittenTopics)

        var uniqueTopics = [...new Set(allTopics)];

        return uniqueTopics.length

        }

        setTopicsAnalysed(getAllTopicsAnalysed())

        function getDivisionsAnalysed() {

          return TDData[0].voteData[0].totalDivisions

        }

        setDivisionsAnalysed(getDivisionsAnalysed())



    }, [TDData])


    console.log(TDData)





if(!TDData || !tweetsAnalysed || !questionsAnalysed || !topicsAnalysed || !divisionsAnalysed) return null;



    return (


    <div style={{background: "white", margin: 0}}>        

    <div className="hero-container">                 
             <p className="hero-text">
                     <PersonOutlineTwoToneIcon/> 161 TD's
                     <br>
                 </br>
                 <TwitterIcon style={{fill: "#1DA1F2" }}/> {tweetsAnalysed.toLocaleString()} tweets
                 <br>
                 </br>
                 <QuestionAnswerTwoTone/>   {questionsAnalysed.toLocaleString()} Dáil questions, across {topicsAnalysed.toLocaleString()} topics   
                <br>
                 </br>
                <HowToVoteTwoToneIcon/>{divisionsAnalysed} Dáil divisions
                 </p>
                 </div>          
        <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li>@LeoVaradkar</li>
                    <li>@MichealMartinTD</li>
                    <li>@MaryLouMcDonald</li>
                    <li>@EamonRyan</li>
                    <li>@HollyCairnsTD</li>
                    <li>@catherinegalway</li>
                    <li>@SimonHarrisTD</li>
                    <li>@alankellylabour</li>
                    <li>@PearseDoherty</li>
                    <li>@EOBroin</li>
            </ul>   
        </div>
        <div className="about-container">
            <h2>About...</h2>
            <p style={{marginTop: "15px"}}>
            A few months ago I came across <a href="https://www.nipoligraph.co.uk/">NI Poligraph</a>. 
            <br></br> 
            It collects and visualises Twitter, Parliamentary, News, and Polling  data on NI Politicians.
            <br></br> 
            Or as they put it: <b style={{fontWeight: 600, color: "lightblue"}}>what politicians say</b>, <b style={{fontWeight: 600, color: "darkgreen"}}>what they do</b>, <b style={{fontWeight: 600, color: "lightpink"}}>what we think</b>, and <b style={{fontWeight: 600}}>how we vote.</b>
            <br></br> 
            Eirpol is an attempt at applying that same idea to the Dáil.
            <br></br> 
            I've also tried to make this site as interactive as possible.
            <br></br> 
            Some graphs have many different ways they can be viewed. Some are boring. Some are interesting. That's the fun.
            <br></br> 
            Finally, this is very much a work in progress. You can see a roadmap here.
            </p> 
        </div>
        <div className="about-container">
            <h2>A few more things...</h2>
            <p style={{marginTop: "15px"}}>
            Some TD's are 0 years old. Yes. There are some TD's who's DOB is not easily available.
            <br></br> 
            All Twitter Data you see on Barcharts, Scatterplots, or Maps, refers to just the last 7 days since collection. 
            <br></br> 
            All Question Data was collected between 01/07/2021 - 30/07/21.  
            <br></br> 
            Division Data, or voting data, was collected between 01/01/21 - 01/09/21. It also just refers to House divisions.
            <br></br> 
            Comparing data from different periods isn't ideal, but the Dáil is currently in recess.
            <br></br> 
            When they pick back up I'll be able to standardize everything.
            <br></br> 
            Oh, and for the best viewing experience, use a device with a large screen. The bigger the better.
            </p> 
        </div>
        <Scatterplot data={TDData}/>
        <BarChart data={TDData}/>
        <StreamGraphPolarity data={TDData}/>
        <TDWithConstituencyMap data={TDData}/>
        <MinisterQuestionsBarChart data={TDData}/>

        <div className="about-container">

            <Typography variant="h5">Search for a Constituency or TD...</Typography>

            <Grid container justifyContent="center" spacing={2} style={{ paddingLeft: "80px", paddingRight: "80px"}}>

                <Grid item>

        <Autocomplete freeSolo
        id="combo-box-demo"
        onChange={function(event, value) {

            var path = "/Constituencies"

            window.location.href = path + '/' + value

        } }
        options={constituencies}
        getOptionLabel={(option) => option}
        style={{ width: 300, marginTop: "24px" }}
        renderInput={(params) => <TextField {...params} label="Constituency" variant="outlined" />}
        
        />
        </Grid>

        <Grid item >
        <Autocomplete freeSolo
        onChange={function(event, value) {

            var path = "/TDs"

            window.location.href = path + '/' + value

        } }
        id="combo-box-demo"
        options={TDs}
        getOptionLabel={(option) => option}
        style={{ width: 300, marginTop: "24px"  }}
        renderInput={(params) => <TextField {...params} label="TD" variant="outlined" />}
        />
        </Grid>
        </Grid>
        </div>
        <div style={{textAlign: "center"}}>
            <Typography variant="h5">Other charts...</Typography>
            <Grid container >
                <Grid item xs={6} sm={3} >
                       <Typography variant="h6" style={{marginTop: "32px"}}>Scatterplots</Typography>
                    <ListItem button component="a" href="Scatterplots/Constituencies">
                    <ListItemText style={{textAlign: "center"}} primary={"Constituency Scatterplot"} />
                    </ListItem>
                </Grid>
                <Grid item xs={6} sm={3}>
                <Typography variant="h6" style={{marginTop: "32px"}}>Barcharts</Typography>
                    <ListItem style={{textAlign: "center"}} button component="a" href="Barcharts/Topics">
                    <ListItemText primary={"Topic Barchart"}/>
                    </ListItem>
                    <ListItem button component="a" href="">
                    <ListItemText style={{textAlign: "center"}} primary={"Topics Barchart"}/>
                    </ListItem>
                </Grid>
                <Grid item xs={6} sm={3}>
                <Typography variant="h6" style={{marginTop: "32px"}}>Maps</Typography>
                    <ListItem button component="a" href="">
                    <ListItemText style={{textAlign: "center"}} primary={"Party Map"}/>
                    </ListItem>
                    <ListItem button component="a" href="Maps/Total-Average">
                    <ListItemText style={{textAlign: "center"}} primary={"Total and Average Map"}/>
                    </ListItem>
                </Grid>
                <Grid item xs={6} sm={3}>
                <Typography variant="h6" style={{marginTop: "32px"}}>Linecharts</Typography>
                    <ListItem button component="a" href="Linecharts">
                    <ListItemText style={{textAlign: "center"}} primary={"Party Linecharts"}/>
                    </ListItem>
                </Grid>
            </Grid>

        </div>
    </div>
    )
}

export default Homepage
