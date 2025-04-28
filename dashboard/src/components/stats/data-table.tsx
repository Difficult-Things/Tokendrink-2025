"use client"

import * as React from "react"

import {
  ColumnDef,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Item } from "react-nestable"
import { GenerationColour } from "@/types/data"
import { colourToGenerationIndex } from "@/lib/utils"

type Handle = {
  updateRanking: () => Item[]
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
}

// Use React.forwardRef to handle the ref
export const DataTable = React.forwardRef<Handle, DataTableProps<any, any>>(
  ({ columns, data, sorting, setSorting }, ref) => {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting,
      },
    })

    const updateRanking = () => {
      const sortedData = table.getSortedRowModel().rows.map(row => row.original)
      const newRanking: Item[] = sortedData.map((item, index) => {
        // @ts-ignore
        const itemColour = item.colour as GenerationColour
        return { text: itemColour, id: colourToGenerationIndex(itemColour) + 1 }
      })
      return newRanking
    }

    // Use React.useImperativeHandle to expose the updateRanking function
    React.useImperativeHandle(ref, () => ({
      updateRanking,
    }))

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
)

DataTable.displayName = "DataTable" // Add a display name for debugging