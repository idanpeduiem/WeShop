import * as d3 from "d3";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getGraphData } from "../queries";
import FetchingState from "../utils/fetchingState";
import BarChart from "./BarChart";
interface Item {
  count: number;
  description: string;
}
const Graph = () => {
  const { data, isLoading, isError, isSuccess } = useQuery<Item[] | undefined>(
    "graphdata",
    getGraphData
  );
  return (
    <FetchingState
      isError={isError}
      isSuccess={isSuccess}
      isLoading={isLoading}
    >
      <h1>Graph</h1>
      {data && (
        <div>
          <BarChart data={data} />
        </div>
      )}
    </FetchingState>
  );
};

export default Graph;
