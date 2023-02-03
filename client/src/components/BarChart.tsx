import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  description: string;
  count: any;
}

interface Props {
  data: DataItem[];
}

const BarChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current!);
    const xScale = d3
      .scaleBand<string>()
      .domain(data.map((item) => item.description))
      .range([0, 300])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (item) => item.count)])
      .range([200, 0]);

    const xAxis: any = d3.axisBottom(xScale);
    const yAxis: any = d3.axisLeft(yScale);

    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", (item) => 50 + xScale(item.description)!)
      .attr("y", (item) => 50 + yScale(item.count))
      .attr("width", xScale.bandwidth())
      .attr("height", (item) => 200 - yScale(item.count));
  }, [data]);

  return (
    <svg ref={svgRef} width={500} height={300}>
      <g className="x-axis" transform="translate(50,250)" />
      <g className="y-axis" transform="translate(50,50)" />
    </svg>
  );
};

export default BarChart;
