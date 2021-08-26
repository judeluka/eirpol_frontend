import React, {useState, useEffect} from 'react'
import { Grid, ListItem, ListItemText, ListItemAvatar, List, Avatar, Typography } from '@material-ui/core'
import { chamber } from '../../Backend/rollCall';
import { toCssValue } from 'jss';
import { Switch } from 'react-router-dom';


const TDList = ({data}) => {


  const [TDData, setTDData] = useState(null)





  useEffect(() => {


    setTDData(data)

  }, [])


  if(!TDData) return null;





    function generate(element) {
        return TDData.map((d) =>

        

        <ListItem button component="a" href="/TDs/michaelmartin">
            <ListItemAvatar>
                <Avatar src={d.img}/>
            </ListItemAvatar>
            <ListItemText primary={d.name}/>
          </ListItem>
          )
      
    }



    return (

<div className="featuredItem">
            <h1>TD List</h1>
    <div>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Avatar with text and icon
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
