import React, {useState, useEffect} from 'react'

const ConstituencyHeader = ({tds, data, name}) => {


    const [TDData, setTDData] = useState(null)
    const [TDsInConstituency, setTDsInConstituency] = useState(null)
    const [constituencyName, setConstituencyName] = useState(null)
    const [thisConstituencyData, setThisConstituencyData] = useState(null)


useEffect(() => {

setTDData(data)
setConstituencyName(name)
setTDsInConstituency(tds)

}, [data, tds])


if(!TDData || !TDsInConstituency || !constituencyName) return null

    return (

        <div className="td-header" style={{background: "white",color: "black"}}>
            <h1>{constituencyName}</h1>
        </div>
    )
}

export default ConstituencyHeader
