import React from 'react'
import { Grid, ListItem, ListItemText, ListItemAvatar, List, Avatar, Typography } from '@material-ui/core'
import { chamber } from '../../Backend/rollCall';
import { toCssValue } from 'jss';


const TDList = () => {


    function generate(element) {
        return chamber.map((value) =>
        <ListItem>
            <ListItemAvatar>
                <Avatar src={value.img}/>
            </ListItemAvatar>
            <ListItemText primary={value.name}/>
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
