import React from 'react'
import { useEffect, useState } from "react"
import MultilineAppV3PartyFollowers from '../Dashboard/MultilineChartV3PartyFollowers/MultilineAppV3PartyFollowers'
import MultilineAppV3PartyPolarity from '../Dashboard/MultilineChartV3PartyPolarity/MultilineAppV3PartyPolarity'
import MultilineAppV3PartyRetweets from '../Dashboard/MultilineChartV3PartyRetweets/MultilineAppV3PartyRetweets'


const LinechartPage = ({data}) => {


    const [TDData, setTDData] = useState(null)


    useEffect(() => {

        setTDData(data)

    }, [data])


    if(!TDData) return null;



    return (
        <div>
            <MultilineAppV3PartyFollowers data={TDData}/>
            <MultilineAppV3PartyRetweets data={TDData}/>
            <MultilineAppV3PartyPolarity data={TDData}/>    
        </div>
    )
}

export default LinechartPage
