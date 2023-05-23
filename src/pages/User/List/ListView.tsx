import React from "react";
import { CustomTable } from "../../../components/CustomTable/CustomTable";
import { Loader } from "../../../components/Loader/Loader";

export const ListView = ({
  columns,
  data,
  handleUpdate,
  pagination,
  fatchData,
  setLoading,
  setData,
  setPagination,
  loading,
  handleDelete,
}: any) => {
  return (
    <React.Fragment>
      <Loader open={loading} />
      <CustomTable
        columns={columns}
        data={data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        pagination={pagination}
        fatchData={fatchData}
        setLoading={setLoading}
        setData={setData}
        setPagination={setPagination}
      />
    </React.Fragment>
  );
};
