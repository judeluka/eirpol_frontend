import React, {useEffect, useState} from 'react'
import PartyConstituencyMap from './PartyConstituencyMap'
import ScatterplotConstituency from './ScatterplotConstituency/ScatterplotConstituency'
import TDWithConstituencyMap from './TDWithConstituencyMap'
import TotalAndAverageConstituencyMap from './TotalAndAverageConstituencyMap'




const ConstituencyDashboard = ({data}) => {

    const [TDData, setTDData] = useState(null)

    useEffect(() => {


        setTDData(data)

    }, [])


    if(!TDData) return null;

    return (
        <div>
            <TDWithConstituencyMap data={TDData}/>
            <PartyConstituencyMap data={TDData}/>
            <TotalAndAverageConstituencyMap data={TDData}/>
            <ScatterplotConstituency data={TDData} />
        </div>
    )
}

export default ConstituencyDashboard
