import { Grid, Paper } from "@mui/material";
import { CreateOrUpdateController } from "./CreateOrUpdate/CreateOrUpdateController";
import { ListController } from "./List/ListController";
import { useState } from "react";

export const User = () => {
  const [data, setData] = useState<any>([]);

  const updateData = (item: any, type: Number) => {
    if (item) {
      let newData = [...data];
      if (type === 0) {
        newData.push(item);
        setData(newData);
      } else {
        setData((prevState: any) =>
          type === 1
            ? prevState.map((d: any) => {
                if (d.id === item.id) {
                  d = item;
                }
                return d;
              })
            : prevState.filter((d: any) => {
                if (d.id !== item.id) {
                  return d;
                }
              })
        );
      }
    }
  };

  return (
    <div>
      <Grid
        container
        marginTop="2rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid xs={10} item={true}>
          <Paper
            elevation={2}
            sx={{
              padding: "2rem",
            }}
          >
            <h3 className="center">User Management</h3>
            <CreateOrUpdateController updateData={updateData} />
            <ListController
              data={data}
              setData={setData}
              updateData={updateData}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
