import "./Confirm.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert";

export const confirm = (handleConfirm: any) => {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          {/* <h1>Are you sure</h1> */}
          <p>Are you sure you want to delete this item?</p>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              handleConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      );
    },
  });
};
