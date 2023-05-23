import Pagination from "@mui/material/Pagination";
import "./CustomPagination.css";
export const CustomPagination = ({
  pagination,
  fatchData,
  setData,
  setLoading,
  setPagination,
}: any) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    if (+newPage !== +pagination?.current_page) {
      fatchData(setData, setPagination, setLoading, newPage);
    }
  };

  return (
    <div className="paginate center">
      <Pagination
        showLastButton={true}
        showFirstButton={true}
        onChange={handleChangePage}
        count={+pagination?.totalPages}
        variant="outlined"
        color="primary"
        shape="rounded"
        page={+pagination?.currentPage}
      />
    </div>
  );
};
