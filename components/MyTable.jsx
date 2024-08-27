import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getExpandedRowModel,  // Import getExpandedRowModel
} from '@tanstack/react-table';

const MyTable = ({ data, columns, callback, darkMode = false, searchBar = true }) => {
  console.log("MyTable called ... ", { data });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),  
    getExpandedRowModel: getExpandedRowModel(),  // Include expanded rows functionality
  });

  // Handle row click
  const handleRowClick = (row) => {
    if (callback) {
      callback(row.original);
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                onClick={() => header.column.getToggleSortingHandler()}
                style={{
                  position: 'sticky',
                  top: searchBar ? 53 : 0,
                  borderBottom: darkMode ? '2px solid #1a1a1a' : '2px solid #e2e8f0',
                  background: darkMode ? '#4a5568' : '#cbd5e0',
                  color: darkMode ? '#e2e8f0' : '#4a5568',
                  fontWeight: '600',
                  textAlign: 'left',
                  padding: '10px',
                  zIndex: 5,
                  cursor: 'pointer',
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() ? (header.column.getIsSorted() === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <React.Fragment key={row.id}>
            <tr
              key={row.id}
              style={{ 
                background: darkMode ? '#1a1a1a' : '#f7fafc'
              }}
              onClick={() => handleRowClick(row)}
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  style={{
                    padding: '10px',
                    borderBottom: darkMode ? '2px solid #000000' : '1px solid #e2e8f0',
                    color: darkMode ? '#cbd5e0' : '#2d3748',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                <td colSpan={columns.length} style={{ paddingLeft: '20px', background: darkMode ? '#222' : '#fff' }}>
                  {/* Render the expanded content here */}
                  <App json={{ path: row.original.path, json: row.original.json }} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;