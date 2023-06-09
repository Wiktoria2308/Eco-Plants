import { useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const SortableTable = ({ columns, data, filterField }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = useMemo(() => {
    if (filterField) {
      return data.filter((item) =>
        item[filterField].toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }, [data, filterField, searchTerm]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData }, useSortBy);

  return (
    <div>
      {filterField ? (
        <div className="search-bar-table">
          <input
            type="text"
            placeholder={`Search by ${filterField}...`}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      ) : null}
      <Table className="sortable-table" hover responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown className="sort-icon-down" />
                      ) : (
                        <FaSortUp className="sort-icon-up" />
                      )
                    ) : (
                      <FaSort className="sort-icon-default" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="align-middle" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default SortableTable;
