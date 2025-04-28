"use client"

import { ColumnDef, SortDirection } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "../ui/button"
import { GenerationScore } from "@/types/data"

export const columns: ColumnDef<GenerationScore>[] = [
    {
        accessorKey: "colour",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Generation

                    {getSortingArrow(column.getIsSorted())}
                </Button>
            )
        }
    },
    {
        accessorKey: "beers",
        header: ({ column }) => {
            return (
                <Button

                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Beers
                    {getSortingArrow(column.getIsSorted())}
                </Button>
            )
        },
    },
    {
        accessorKey: "sodas",
        header: ({ column }) => {
            return (
                <Button

                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sodas
                    {getSortingArrow(column.getIsSorted())}
                </Button>
            )
        },
    },
    {
        accessorKey: "score",
        header: ({ column }) => {
            return (
                <Button

                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Score
                    {getSortingArrow(column.getIsSorted())}
                </Button>
            )
        }
        ,
    },
]

const getSortingArrow = (sortType: false | SortDirection) => {
    switch (sortType) {
        case "asc":
            return <ArrowUp className="ml-2 h-4 w-4" />
        case "desc":
            return <ArrowDown className="ml-2 h-4 w-4" />
        default:
            return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
}