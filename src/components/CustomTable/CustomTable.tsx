import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import { Box, Typography } from "@mui/material";
import { CustomPagination } from "../CustomPagination/CustomPagination";
import { FiEdit, FiTrash } from "react-icons/fi";
import { BsEyeFill } from "react-icons/bs";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis =
    array && array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  columns,
}: any) {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell: any) => (
          <TableCell
            align="center"
            key={headCell?.id}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
            <Typography
              component="p"
              sx={{ fontWeight: "bold", color: "#000" }}
            >
              {headCell.label}
            </Typography>
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const CustomTable = ({
  columns,
  data,
  handleView,
  handleUpdate,
  handleDelete,
  pagination,
  fatchData,
  setLoading,
  setData,
  setPagination,
}: any) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<any>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n: any) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isSelected = (name: any) => selected.indexOf(name) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <TableContainer>
      <Table aria-labelledby="tableTitle" size="medium">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          columns={columns}
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={data?.length}
        />
        <TableBody>
          {stableSort(data, getComparator(order, orderBy)).map((row, index) => {
            const labelId = row.id;
            const isItemSelected = isSelected(row.id);

            return (
              <TableRow
                hover
                tabIndex={-1}
                key={labelId}
                role="checkbox"
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                {Object.values(columns).map((item: any, i) => {
                  if (row[item.id] === "edit") {
                    return (
                      <TableCell align="center" padding="normal" key={i}>
                        <div
                          className="center"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          {handleUpdate ? (
                            <FiEdit
                              className="primaryColor primary-icon"
                              size={18}
                              onClick={(e: any) =>
                                handleUpdate(e, row.id, index)
                              }
                            />
                          ) : null}

                          {handleView ? (
                            <BsEyeFill
                              className="primaryColor primary-icon"
                              size={18}
                              onClick={(e: any) => handleView(e, row)}
                            />
                          ) : null}
                        </div>
                      </TableCell>
                    );
                  } else if (row[item.id] === "delete") {
                    return (
                      <TableCell align="center" padding="normal" key={i}>
                        <div
                          className="center"
                          style={{ justifyContent: "space-evenly" }}
                        >
                          {handleDelete ? (
                            <FiTrash
                              className="primaryColor primary-icon"
                              color="Red"
                              size={18}
                              onClick={(e: any) =>
                                handleDelete(e, row.id, index)
                              }
                            />
                          ) : null}
                        </div>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={i}
                        align="center"
                        // padding='normal'
                      >
                        {row[item.id]}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {pagination && Object.values(pagination).length > 0 ? (
        <CustomPagination
          pagination={pagination}
          fatchData={fatchData}
          setLoading={setLoading}
          setData={setData}
          setPagination={setPagination}
        />
      ) : null}
    </TableContainer>
  );
};
