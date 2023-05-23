import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { Snackbar } from "@mui/material";

export const CustomAlert = ({ open, setOpen, type, message }: any) => {
  return (
    <Box sx={{ width: "100%" }}>
      {type === "error" ? (
        <Collapse in={open}>
          <Alert
            severity={type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {/* <CloseIcon fontSize="inherit" /> */}
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {message && message}
          </Alert>
        </Collapse>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
