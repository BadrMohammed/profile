import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const Model = ({
  open,
  setOpen,
  title,
  children,
  handleSave,
  hideSave = false,
}: any) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children && children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!hideSave && <Button onClick={handleSave}>Save</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
};
