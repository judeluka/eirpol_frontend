import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { ConstituencyBarchart } from './ConstituencyBarchart'
import ConstituencyHeader from './ConstituencyHeader'
import ConstituencyMinisterQuestionsBarchart from './ConstituencyMinisterQuestionsBarchart'
import ConstituencyScatterplot from './ConstituencyScatterplot/ConstituencyScatterplot'
import ConstituencyTopicsBarchart from './ConstituencyTopicsBarchart'
import TDLinks from './TDLinks'

const ConstituencyPage = ({data}) => {


const {Constituency} = useParams()

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


const [TDData, setTDData] = useState(null)
const [constituencyName, setConstituencyName] = useState(null)
const [justConstituencyTDs, setJustConstituencyTDs] = useState(null)

useEffect(() => {


    setTDData(data)
    setConstituencyName(Constituency)


    }, [])

useEffect(() => {

if (!TDData) return null;


function justConstituencyTDs() {


 var toBeFiltered = TDData.map(function(d) {

        var name = d.name

        var constituency_uri = d.member_constituency_uri[0]

        
        var indexOfLastSlash = constituency_uri.lastIndexOf('/') + 1
        var conName = constituency_uri.substr(indexOfLastSlash)



        return [name, conName]


    })


    var filtered = toBeFiltered.filter(d => d[1] == Constituency)

    var justTDsNames = filtered.map(d => d[0])


    var justTDsData = TDData.map(function(d) {


    if(justTDsNames.includes(d.name)) {
        return d
    }}).filter(d => d != undefined)


return justTDsData



}

console.log(justConstituencyTDs())



setJustConstituencyTDs(justConstituencyTDs())


}, [TDData])



if(!justConstituencyTDs || !constituencyName || !TDData) return null;

console.log(justConstituencyTDs)

    return (
        <div style={{background: "white", margin: "0px"}}>
        <ConstituencyHeader tds={justConstituencyTDs} data={TDData} name={constituencyName}/>
        <TDLinks conTDsData={justConstituencyTDs}/>
        <ConstituencyBarchart conTDsData={justConstituencyTDs}/>
        <ConstituencyTopicsBarchart conTDsData={justConstituencyTDs}/>
        <ConstituencyMinisterQuestionsBarchart conTDsData={justConstituencyTDs} />
        <ConstituencyScatterplot conTDsData={justConstituencyTDs}/>
        </div>
    )
}

export default ConstituencyPage
