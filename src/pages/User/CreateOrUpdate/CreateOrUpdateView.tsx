import React, { useEffect, useState } from "react";
import { IUserForm } from "../../../core/interfaces/IUserForm";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Mobile } from "../../../components/Mobile/Mobile";
import { CustomAlert } from "../../../components/Alert/CustomAlert";
import { Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { Model } from "../../../components/Model/Model";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
interface ICreateOrUpdate {
  open: boolean;
  setOpen: Function;
  status: any;
  userForm?: IUserForm | null;
  control: any;
  handleSave: any;
  formOptions: any;
  getMessage: any;
  loading: boolean;
  setUserForm?: any;
}
export const CreateOrUpdateView: React.FC<ICreateOrUpdate> = ({
  open,
  setOpen,
  status,
  userForm,
  control,
  formOptions,
  handleSave,
  getMessage,
  loading = false,
  setUserForm,
}) => {
  const [openTerms, setOpenTerms] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (userForm?.id) {
        setUserForm(null);
      }
    };
  }, []);
  return (
    <div>
      <Model
        title="Terms & Conditions"
        open={openTerms}
        setOpen={setOpenTerms}
        hideSave
      >
        <div>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
          laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla
          sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl
          consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </div>
      </Model>
      <form onSubmit={handleSave}>
        <div>
          <Grid
            container
            marginTop="1rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid xs={12} item={true}>
              <CustomAlert
                open={getMessage() ? true : false || open}
                setOpen={setOpen}
                type={getMessage() ? "error" : status.type}
                message={getMessage() || status.message}
              />
            </Grid>
            {formOptions.map((formControl: any, index: any) => {
              return (
                <Grid
                  xl={5}
                  lg={5}
                  md={5}
                  sm={12}
                  xs={12}
                  key={index}
                  marginTop="2rem"
                  marginX="1rem"
                  item={true}
                >
                  <Controller
                    name={formControl.name}
                    control={control}
                    render={({ field: { onChange, value } }) =>
                      formControl.type === "phone" ? (
                        <Mobile
                          formControl={formControl}
                          onChange={onChange}
                          value={value}
                        />
                      ) : (
                        <React.Fragment>
                          <TextField
                            select={formControl.type === "select"}
                            label={formControl.label}
                            inputProps={{
                              autoComplete: "new-password",
                            }}
                            key={formControl.name}
                            name={formControl.name}
                            type={formControl.type}
                            //   size="small"
                            sx={{ width: "100%" }}
                            onChange={onChange}
                            value={value}
                            InputProps={{
                              endAdornment: formControl.resetField ? (
                                <ClearIcon
                                  onClick={formControl.resetField}
                                  sx={{
                                    visibility: value ? "visible" : "hidden",
                                    cursor: "pointer",
                                    marginInlineEnd: "1rem",
                                  }}
                                />
                              ) : null,
                            }}
                          >
                            {formControl.options
                              ? formControl.options.map((option: any) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))
                              : null}
                          </TextField>
                        </React.Fragment>
                      )
                    }
                  />
                </Grid>
              );
            })}
            {!userForm?.id ? (
              <Grid xs={12} marginTop="1rem" item={true}>
                <Controller
                  name="terms"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <div className="terms_condition">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                      />
                      <p className="terms_condition_text">
                        I accept the
                        <a className="link" onClick={() => setOpenTerms(true)}>
                          Terms and Conditions
                        </a>
                      </p>
                    </div>
                  )}
                />
              </Grid>
            ) : null}

            <Grid
              xs={12}
              marginTop="1rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              item={true}
            >
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{ marginBlock: "2rem" }}
              >
                {loading ? <CircularProgress size={20} color="info" /> : "Save"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};
