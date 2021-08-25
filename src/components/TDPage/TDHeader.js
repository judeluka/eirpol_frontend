import React from 'react'
import { Avatar, Typography, Grid } from '@material-ui/core'

const TDHeader = () => {

    const tdImg = "https://upload.wikimedia.org/wikipedia/commons/5/52/Miche%C3%A1l_Martin_TD_%28cropped%29.jpg"
    const tdName = "Micháel Martin"

    return (


        <div className="td-header">
            <Grid container direction="column" alignItems="center"><Typography variant="h4">{tdName}</Typography>
            <Avatar variant="" src={tdImg} style={{height: '150px', width: '150px', marginBottom: '20px', marginTop: '10px'}}/>
            <Typography variant="h5">Taoiseach</Typography>
            <Typography variant="h5">Party Leader, FF<span class="party-dot-ff"/></Typography>
            </Grid>
        </div>
    )
}

export default TDHeader
