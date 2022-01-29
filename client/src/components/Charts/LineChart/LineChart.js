import React, {useEffect} from 'react'
import * as d3 from 'd3'

import './index.css'

const LineChart = (props) => {
    const { data, width, height } = props;
    
    const drawChart = () => {
        // TO CHANGE
    }

    useEffect(() => {
      drawChart();
    }, [data]);
    
    
    return <div id="container" />;
  }
  
  export default LineChart;