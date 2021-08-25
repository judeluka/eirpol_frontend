import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { options } from './AxisUtils/AxisUtils';

const useStyles = makeStyles((theme) => ({

    icon: {
      color: "white"
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  }

}));

export default function GroupedSelect() {

  
  const classes = useStyles();

  const onChangeX = (event, child) => {
    console.log('x:' + event.target.value);
    console.log(child);
  };

  const onChangeY = (event, child) => {
    console.log('y:' + event.target.value);
    console.log(child);
  };




  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">X-Value</InputLabel>
        <Select  onChange={onChangeX} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Total Retweets</MenuItem>
          <MenuItem value={3}>Avg. Sentimenmt</MenuItem>
          <MenuItem value={4}>Activty</MenuItem>
          <MenuItem value={5}>Connectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={6}>Yes Votes</MenuItem>
          <MenuItem value={7}>No Votes</MenuItem>
          <MenuItem value={8}>Motions Tabled</MenuItem>
          <MenuItem value={9}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem value={10}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem value={11}>Votes in last election</MenuItem>
          <MenuItem value={12}>Opinion polls</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Y-Value</InputLabel>
        <Select onChange={onChangeY} style={{ color: "white"}} classes={{icon:classes.icon}} defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Total Retweets</MenuItem>
          <MenuItem value={3}>Avg. Sentimenmt</MenuItem>
          <MenuItem value={4}>Activty</MenuItem>
          <MenuItem value={5}>Connectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={6}>Yes Votes</MenuItem>
          <MenuItem value={7}>No Votes</MenuItem>
          <MenuItem value={8}>Motions Tabled</MenuItem>
          <MenuItem value={9}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem value={10}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem value={11}>Votes in last election</MenuItem>
          <MenuItem value={12}>Opinion polls</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel style={{fill: "white", color: "white"}} htmlFor="grouped-select">Circle Radius</InputLabel>
        <Select style={{ color: "white"}} classes={{icon:classes.icon}}defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Twitter Data</ListSubheader>
          <MenuItem value={1}>Total Followers</MenuItem>
          <MenuItem value={2}>Total Retweets</MenuItem>
          <MenuItem value={3}>Avg. Sentimenmt</MenuItem>
          <MenuItem value={4}>Activty</MenuItem>
          <MenuItem value={5}>Connectivity</MenuItem>
          <ListSubheader>Parliamentary Data (Coming Soon)</ListSubheader>
          <MenuItem value={6}>Yes Votes</MenuItem>
          <MenuItem value={7}>No Votes</MenuItem>
          <MenuItem value={8}>Motions Tabled</MenuItem>
          <MenuItem value={9}>Questions Asked</MenuItem>
          <ListSubheader>News Data (Coming Soon)</ListSubheader>
          <MenuItem value={10}>News Mentions</MenuItem>
          <ListSubheader>Electoral Data (Coming Soon)</ListSubheader>
          <MenuItem value={11}>Votes in last election</MenuItem>
          <MenuItem value={12}>Opinion polls</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}