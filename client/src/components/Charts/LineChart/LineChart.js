import React, { useEffect } from "react";
import * as d3 from "d3";

import "./index.css";

// TODO : make the graph responsive
// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js

// TODO : check the useEffect() hook to see

// TODO : what if we want more than 1 line chart at the same time?? will the useEffect() hook remove other line charts as well?

const LineChart = (props) => {
  const { rawPostData, height, width } = props;
  console.log(rawPostData);

  const data = rawPostData; // is this ok? will it rerender on state change?
  /* data should be an array of objects, where every object refers to the job search stats(only job count for now) of 1 day! */
  /* The logic of filtering useful data from all the posts is handled inside the LineChart component! */

  const svg = d3
    .select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .append("g");

  const drawChart = () => {
    var margin = { top: 10, right: 30, bottom: 30, left: 30 };

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "white");

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
    if (d3.select("#container").selectAll("svg").size() > 1)
      d3.select("#container").select("svg").remove();
    // to fix the bug that everytime when data changes, a new graph is appended while the old one isn't removed(so there is more than 1 graph shown)
    drawChart();
  }, [data]);

  return <div id="container" />;
};

export default LineChart;
