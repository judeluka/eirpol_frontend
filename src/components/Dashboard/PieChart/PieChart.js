import React, {useEffect, useState, useRef} from 'react'
import * as d3 from 'd3'
import axios from 'axios'

const PieChart = ({data}) => {

    const margin = {top: 20, right: 20, bottom: 20, left: 60}

    const height = 400
    const width = 420

    const svgRef= useRef()

    const [TDData, setTDData] = useState(null)
    const [oirLossData, setOirLossData] = useState(null)
    const [oirCarriedData, setOirCarriedData] = useState(null)
    
    useEffect(() => {

        setTDData(data)
        axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Lost').then((response) => {
    
            setOirLossData(response.data)
            
          });
    
    }, [])    
    
    useEffect(() => {
            
            
            axios.get('https://api.oireachtas.ie/v1/divisions?chamber_type=house&chamber_id=&chamber=dail&date_start=2020-01-01&date_end=2099-1-1&limit=200&outcome=Carried').then((response) => {
    
            setOirCarriedData(response.data)
            
          });

        }, [])


    useEffect(() => {

        if(!TDData || !oirLossData || !oirCarriedData) return null






    }, [TDData, oirLossData, oirCarriedData])











    return (
        <div className="featuredItem">
            <svg ref={svgRef} height={height + margin.top + margin.bottom} width={width + margin.left + margin.right}>

            </svg>
        </div>
    )
}

export default PieChart
