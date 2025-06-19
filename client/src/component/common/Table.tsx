import { formatInTimeZone } from "date-fns-tz";
import React, { useState } from "react";

interface Column {
  key: string;
  label: string;
  type?: string; // Optional type for formatting
}

interface CommonTableProps<T = Record<string, unknown>> {
  columns: Column[];
  data: T[];
  pageSize?: number;
}

const CommonTable = <T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 5,
}: CommonTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="mt-4">
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs uppercase border-gray-300 border-b-2  ">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className="px-6 py-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center px-6 py-4">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`
                      border-gray-300 border-b`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {col.type === "date"
                        ? formatInTimeZone(row[col.key] as string, "UTC", "MMM dd, yyyy")
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 gap-2 text-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-blue-800 text-white disabled:bg-gray-400"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-800 text-white"
                  : "bg-blue-100 text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-blue-800 text-white disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CommonTable;
