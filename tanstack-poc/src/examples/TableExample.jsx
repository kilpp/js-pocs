import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

const data = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com', city: 'Los Angeles' },
  { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', city: 'Chicago' },
  { id: 4, name: 'Alice Williams', age: 23, email: 'alice@example.com', city: 'Houston' },
  { id: 5, name: 'Charlie Brown', age: 31, email: 'charlie@example.com', city: 'Phoenix' },
  { id: 6, name: 'Diana Prince', age: 29, email: 'diana@example.com', city: 'Philadelphia' },
  { id: 7, name: 'Eve Davis', age: 37, email: 'eve@example.com', city: 'San Antonio' },
  { id: 8, name: 'Frank Miller', age: 42, email: 'frank@example.com', city: 'San Diego' },
]

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
]

function TableExample() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <h2>TanStack Table</h2>
      <p>Headless table with sorting, filtering, and pagination</p>

      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={filtering}
          onChange={e => setFiltering(e.target.value)}
          placeholder="Search all columns..."
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={thStyle}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'desc'
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} style={trStyle}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={tdStyle}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} style={buttonStyle}>
          {'<<'}
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} style={buttonStyle}>
          {'<'}
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} style={buttonStyle}>
          {'>'}
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} style={buttonStyle}>
          {'>>'}
        </button>
      </div>
    </div>
  )
}

const tableStyle = {
  borderCollapse: 'collapse',
  margin: '0 auto',
  fontSize: '0.9rem',
  minWidth: '600px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
}

const thStyle = {
  backgroundColor: '#009879',
  color: '#ffffff',
  textAlign: 'left',
  padding: '12px 15px',
  cursor: 'pointer',
  userSelect: 'none',
}

const tdStyle = {
  padding: '12px 15px',
  borderBottom: '1px solid #dddddd',
}

const trStyle = {
  borderBottom: '1px solid #dddddd',
}

const buttonStyle = {
  padding: '0.25rem 0.5rem',
  fontSize: '0.9rem',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#f0f0f0',
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  }
}

export default TableExample
