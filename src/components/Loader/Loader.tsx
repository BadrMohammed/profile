import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export const Loader = ({ open }: any) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
