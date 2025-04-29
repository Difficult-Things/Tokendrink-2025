import * as React from "react";

import { DataTable } from "./stats/data-table";

import { columns } from "./stats/columns";
import { GenerationScore } from "@/types/data";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { SortingState } from "@tanstack/react-table";
import { Item } from "react-nestable";

const mockData: GenerationScore[] = [
  { colour: "red", beers: 10, sodas: 5, score: 15 },
  { colour: "green", beers: 5, sodas: 10, score: 15 },
  { colour: "blue", beers: 7, sodas: 7, score: 14 },
  { colour: "purple", beers: 8, sodas: 6, score: 14 },
  { colour: "orange", beers: 6, sodas: 8, score: 14 },
  { colour: "gray", beers: 9, sodas: 5, score: 14 },
];

export function Stats(props: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const dataTableRankingUpdate = React.useRef<{ updateRanking: () => Item[] }>(null);

  const sendRankingUpdate = () => {
    if (dataTableRankingUpdate.current) {
      const newRanking = dataTableRankingUpdate.current.updateRanking();
      props.setRanking(newRanking);
    }
  };

  return (
    <div className="flex flex-col m-4 gap-4">
      <h2 className="text-lg font-bold">STATISTICS</h2>

      <div className="flex flex-row items-center">
        <Button variant="outline" className="m-5" onClick={() => sendRankingUpdate()}>
          <ArrowLeft /> <span className="text-sm">Send Ranking</span>
        </Button>

        {props.data == null ? <p>Loading...</p> : <DataTable columns={columns} data={props.data} sorting={sorting} setSorting={setSorting} ref={dataTableRankingUpdate} />}
        {/* {mockData == null ? <p>Loading...</p> :
          <DataTable
            columns={columns}
            data={mockData}
            sorting={sorting}
            setSorting={setSorting}
            ref={dataTableRankingUpdate}
          />} */}

      </div>
    </div>
  );
}
