import React, {useEffect} from 'react'
import * as d3 from 'd3'

import './styles.css'

const LineChart = (props) => {
    const { data, width, height } = props;
    
    const drawChart = () => {
        // TODO
    }

    useEffect(() => {
      drawChart();
    }, [data]);
    
    
    return <div id="container" />;
  }
  
  export default LineChart;