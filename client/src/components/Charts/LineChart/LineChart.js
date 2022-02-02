import React, { useEffect } from "react";
import * as d3 from "d3";

import "./index.css";

// TODO : make the graph responsive
// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js

const LineChart = (props) => {
  const { data, height, width } = props;

  const drawChart = () => {
    // TO CHANGE
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 30 };

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("height", height)
      .attr("width", width)
      .append("g");
    // .attr("transform", `translate(${margin.left},${margin.top})`);
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "silver");
    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (data) => data.date),
        d3.max(data, (data) => data.date),
      ])
      .range([0, width]);
    // This specifies where(and what value) the x-axis starts and ends. It should be based the date of the job application stats(x-axis)
    // count refers to the total number of job applications sent per day
    // d3.min and d3.max return the max and min value in an array!(it is basically an iterator) The second argument is an accessor to retrieve the specific property
    // to compare...
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15));

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (data) => data.value)]);

    svg
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.count))
      .curve(d3.curveMonotoneX);
    // d.date and d. count?
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f6c3d0")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);
  };

  useEffect(() => {
    drawChart();
  }, [data]);

  return <div id="container" />;
};

export default LineChart;
