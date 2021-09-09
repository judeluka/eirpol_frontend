import { Grid, Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const TDLinks = ({conTDsData}) => {


    const [conTDs, setConTDs] = useState(null)


    useEffect(() => {


        setConTDs(conTDsData)

    }, [])


    if(!conTDs) return null;

    console.log(conTDs)

        function generate(element) {

            return conTDs.map(function(d) {

                const partyDotAbrevArr = [
                    "ff", "fg", "grn", "soc-dem", "ind", "pbp", "I4C", "sf", "aon", "lab"
                ]
            
                const partDotFullNameArr = ["Fianna Fáil", "Fine Gael", "Green Party", "Social Democrats", "Independent", "Solidarity - People Before Profit", "Independents 4 Change", "Sinn Féin", "Aontú", "Labour Party"]
                
                const party = d.party;

                const index = partDotFullNameArr.indexOf(party)
         
                const partyDot = partyDotAbrevArr[index]

return (
    <Grid item>


   
    <ListItem button component="a" href={"/TDs/" + d.name.replace(' ', '-')}>
    <span title={d.party} class={"party-dot-" + partyDot} style={{marginRight: 10}}/>
    <ListItemAvatar>
   <Avatar src={d.member_uri[0] + "/image/large"} style={{height: 100, width: 100, marginRight: 20}}/>
   </ListItemAvatar>
   <ListItemText primary={d.name} />
 </ListItem>
</Grid>
) 

})
}

        return (

            <div className="featuredItem" style={{background: "white", color: "black"}} >
            <Grid container xs={12} style={{justifyContent: "center"}} >
            {generate(

            )}
            </Grid>
</div>

        )

}

export default TDLinks
