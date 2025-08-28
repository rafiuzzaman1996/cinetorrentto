"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Columns2, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { AddEditDialog } from "@/components/admin/management/data-table/AddEditDialog";
import { FieldConfig } from "./DynamicForm"
import { ZodType } from "zod"

interface DataTableProps<TData, TValue, TSchema extends ZodType> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  caption?: string
  pageIndex: number
  pageSize: number
  rowCount: number
  totalPages: number
  RowsPerPage: Array<number>
  fields: FieldConfig<ZodType>[]
  schema: TSchema
  onSubmit?: (values: TData, mode: "add" | "edit" | "view" | "delete") => void
}


export function SimpleDataTable<TData, TValue, TSchema extends ZodType>({
  columns,
  data,
  caption,
  pageIndex,
  pageSize,
  rowCount,
  totalPages,
  RowsPerPage,
  fields,
  schema,
  onSubmit
}: DataTableProps<TData, TValue, TSchema>) {
  const router = useRouter()
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState({ pageIndex: pageIndex, pageSize })
  // columns.push(actionColumn);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      pagination
    },
    rowCount,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

  })

  return (
    <div>
      {/* TopBar */}
      <div className="flex items-center justify-end gap-2 mb-2">
        {/* <AddEditDialog mode="add" fields={fields} schema={schema} onSubmit={onSubmit} /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" variant="outline" size="sm">
              <Columns2 />
              <span className="inline">Columns</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          {caption && <caption className="mt-4 text-sm text-muted-foreground">{caption}</caption>}
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
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 mt-2">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                router.push(`?page=1&pageSize=${value}`) // reset to page 1
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent side="top">
                {RowsPerPage.map((ps) => (
                  <SelectItem key={ps} value={`${ps}`}>
                    {ps}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {pageIndex} of {totalPages}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => router.push(`?page=1&pageSize=${pageSize}`)}
              disabled={pageIndex <= 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => router.push(`?page=${pageIndex - 1}&pageSize=${pageSize}`)}
              disabled={pageIndex <= 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => router.push(`?page=${pageIndex + 1}&pageSize=${pageSize}`)}
              disabled={pageIndex >= totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => router.push(`?page=${table.getPageCount()}&pageSize=${pageSize}`)}
              disabled={pageIndex >= totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
