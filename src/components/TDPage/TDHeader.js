import React, {useState, useEffect} from 'react'
import { Avatar, Typography, Grid } from '@material-ui/core'

const TDHeader = ({justThisTDData}) => {


    const [thisTDData, setThisTDData] = useState(null)
    const [name, setName] = useState(null)
    const [member_uri, set_member_uri] = useState(null)
    const [constituency, setConstituency] = useState(null)
    const [office, setOffice] = useState(null)
    const [imgLink, setImgLink] = useState(null)
    const [partyDot, setPartyDot] = useState(null)

    const partyDotAbrevArr = [
        "ff", "fg", "grn", "soc-dem", "ind", "pbp", "I4C", "sf", "aon", "lab"
    ]

    const partDotFullNameArr = ["Fianna Fáil", "Fine Gael", "Green Party", "Social Democrats", "Independent", "Solidarity - People Before Profit", "Independents 4 Change", "Sinn Féin", "Aontú", "Labour Party"]



    useEffect(() => {

        setThisTDData(justThisTDData[0])

    }, [])

    useEffect(() => {

        if(!thisTDData) return null;

         console.log(thisTDData)


       const TDName = thisTDData.name;

        setName(TDName)

    }, [thisTDData])

    useEffect(() => {

        if(!thisTDData) return null;

       const member_uri = thisTDData.member_uri[0];

        set_member_uri(member_uri)

    }, [thisTDData])

    useEffect(() => {

        if(!thisTDData) return null;

       const party = thisTDData.party;

       const index = partDotFullNameArr.indexOf(party)

       const partyDot = partyDotAbrevArr[index]

        setPartyDot(partyDot)

    }, [thisTDData])


    useEffect(() => {

        if(!thisTDData) return null;

        var indexOfLastSlash = thisTDData.member_constituency_uri[0].lastIndexOf('/') + 1
        var justName = thisTDData.member_constituency_uri[0].substr(indexOfLastSlash)


        setConstituency(justName)

    }, [thisTDData])


    useEffect(() => {

        if(!thisTDData) return null;

        var officeArr = [];

        console.log(thisTDData)
if(thisTDData.member_offices[0].length != 0) {


        for(let i = 0; i < thisTDData.member_offices[0].length; i++) {

        var office = thisTDData.member_offices[0][i].office.officeName.showAs

        if(!thisTDData.member_offices[0][i].office.dateRange.end) {
            officeArr.push(office)
        } 
    }

    setOffice(officeArr)
        } else {
            setOffice([])
        }



    }, [thisTDData])



    if(!thisTDData || !name || !partyDot || !constituency || !office) return null;
    console.log(office)
    return (


        <div className="td-header">
            <Grid container direction="column" alignItems="center"><Typography variant="h4">{name}</Typography>
            <Avatar variant="" src={member_uri + "/image/large"} style={{height: '150px', width: '150px', marginBottom: '20px', marginTop: '10px'}}/>
            <Typography variant="h5">{thisTDData.party}<span class={"party-dot-" + partyDot}/></Typography>
            <Typography variant="h5">{constituency}</Typography>
            <Typography variant="h5">{office.toString().replaceAll(',', ' & ')}</Typography>
            </Grid>
        </div>
    )
}

export default TDHeader
