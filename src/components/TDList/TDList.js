import React, {useState, useEffect} from 'react'
import { Grid, ListItem, ListItemText, ListItemAvatar, List, Avatar, Typography } from '@material-ui/core'
import { chamber } from '../../Backend/rollCall';
import { toCssValue } from 'jss';
import { Switch } from 'react-router-dom';


const TDList = ({data}) => {


  const [TDData, setTDData] = useState(null)

  useEffect(() => {


    setTDData(data.sort((a,b) => a.party.localeCompare(b.party)))

  }, [])


  if(!TDData) return null;


  console.log(TDData.sort(d => d.party))





    function generate(element) {


        return TDData.map(function(d) {


        const partyDotAbrevArr = [
            "ff", "fg", "grn", "soc-dem", "ind", "pbp", "I4C", "sf", "aon", "lab"
        ]
    
        const partDotFullNameArr = ["Fianna Fáil", "Fine Gael", "Green Party", "Social Democrats", "Independent", "Solidarity - People Before Profit", "Independents 4 Change", "Sinn Féin", "Aontú", "Labour Party"]


        const party = d.party;

        const index = partDotFullNameArr.indexOf(party)
 
        const partyDot = partyDotAbrevArr[index]

        const officeArr = []

        if(d.member_offices[0].length != 0) {

          for(let i = 0; i < d.member_offices[0].length; i++) {
  
          var office = d.member_offices[0][i].office.officeName.showAs
  
          if(!d.member_offices[0][i].office.dateRange.end) {
              officeArr.push(office)
          } 
      }
    }

    let baseColor = "#191C24"
    let cabinetColor = "#223566"
    let backgroundColor;
    let trueArr = [];

    let cabinet = "Cabinet Minister";
    let nameTitle = d.name;


    for(let i = 0; i < officeArr.length; i++) {

      if(officeArr[i].search("Minister for") != -1) {

        trueArr.push(true)

      } 
    }

    if(trueArr.includes(true)) {
      backgroundColor = cabinetColor
      nameTitle = nameTitle.concat(', ' + cabinet)
    } else {
      backgroundColor = baseColor
    }

    console.log(officeArr)
    console.log(trueArr)

        return (<div>
        <ListItem style={{background: backgroundColor}} button component="a" href={"/TDs/" + d.name.replace(' ', '-')}>
             <span title={d.party} class={"party-dot-" + partyDot} style={{marginRight: 10}}/><ListItemAvatar>
            <Avatar src={d.member_uri[0] + "/image/large"}/>
            </ListItemAvatar>
            <ListItemText primary={nameTitle}/>
          </ListItem></div>
        )
    }
    )
  }


    return (

<div className="featuredItem">
            <h1>TD List</h1>
    <div>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            
          </Typography>
          <div className>
            <List>
              {generate(

              )}
            </List>
          </div>
        </Grid>
    </div>

</div>
    )
}

export default TDList
