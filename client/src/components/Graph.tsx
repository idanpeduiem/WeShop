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
      <h2>Graph of total stock</h2>
      <hr></hr>
      <h4>grouped by category:</h4>
      {data && (
        <div>
          <BarChart data={data} />
        </div>
      )}
    </FetchingState>
  );
};

export default Graph;
