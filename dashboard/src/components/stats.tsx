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

export interface StatsProps {
  data: GenerationScore[] | null;
  setRanking: (ranking: Item[]) => void;
}

export function Stats({ data, setRanking }: StatsProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const dataTableRankingUpdate = React.useRef<{ updateRanking: () => Item[] }>(null);

  const sendRankingUpdate = () => {
    if (dataTableRankingUpdate.current) {
      const newRanking = dataTableRankingUpdate.current.updateRanking();
      setRanking(newRanking);
    }
  };

  return (
    <div className="flex flex-col m-4 gap-4">
      <h2 className="text-lg font-bold">STATISTICS</h2>

      <div className="flex flex-row items-center ">
        <div className="flex flex-col m-5 gap-2 justify-center">
          <Button variant="outline" onClick={() => sendRankingUpdate()}>
            <ArrowLeft /> <span className="text-sm">Send Ranking</span>
          </Button>

          <span className="text-sm text-slate-300">Sends the ranking to control based on the current sorting settings.</span>

        </div>

        {data == null ? <p>Loading...</p> : <DataTable columns={columns} data={data} sorting={sorting} setSorting={setSorting} ref={dataTableRankingUpdate} />}
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
