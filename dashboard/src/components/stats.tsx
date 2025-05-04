import * as React from "react";

import { DataTable } from "./stats/data-table";

import { columns } from "./stats/columns";
import { GenerationScore } from "@/types/data";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { SortingState } from "@tanstack/react-table";
import { Item } from "react-nestable";

const mockData: GenerationScore[] = [
  { gen: "red", beer: 10, soda: 5, score: 15 },
  { gen: "green", beer: 5, soda: 10, score: 15 },
  { gen: "blue", beer: 7, soda: 7, score: 14 },
  { gen: "purple", beer: 8, soda: 6, score: 14 },
  { gen: "orange", beer: 6, soda: 8, score: 14 },
  { gen: "gray", beer: 9, soda: 5, score: 14 },
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
