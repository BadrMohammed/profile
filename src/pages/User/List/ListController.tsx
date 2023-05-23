import { ListView } from "./ListView";
import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../../../services/UsersService";
import { CreateOrUpdateController } from "../CreateOrUpdate/CreateOrUpdateController";
import { Model } from "../../../components/Model/Model";
import { IUserForm } from "../../../core/interfaces/IUserForm";
import { confirm } from "../../../components/Confirm/Confirm";
import { CustomAlert } from "../../../components/Alert/CustomAlert";
export const ListController = ({ data, setData, updateData }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<IUserForm | null>(null);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [status, setStatus] = useState<any>({
    type: undefined,
    message: null,
  });

  useEffect(() => {
    fetchUsers(setData, setPagination, setLoading, 1);
  }, []);

  const handleUpdate = (_e: any, id: any, index: any) => {
    let item: any = data.find((d: any) => d.id === id);
    if (item) {
      let newForm: IUserForm = {
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        // password: item.password,
        phoneNumber: item.phoneNumber,
        jobType: item.jobType,
        // terms: true,
      };
      setUserForm(newForm);
      setOpen(true);
    }
  };

  const handleDelete = (_e: any, id: any, index: any) => {
    let item: any = data.find((d: any) => d.id === id);

    function onDelete() {
      deleteUser(item.id, setStatus, setOpenToast, updateData);
    }

    confirm(onDelete);
  };

  const mapData = () => {
    let newData: any = [];
    if (data.length > 0) {
      data.reverse().map((d: any) => {
        return newData.push({
          id: d.id,
          fullName: d.fullName,
          email: d.email,
          phoneNumber: d.phoneNumber,
          jobType: d.jobType,
          created_at: new Date(d.createdAt).toLocaleString(),
          edit: "edit",
          delete: "delete",
        });
      });
    }
    return newData;
  };
  const columns = [
    {
      id: "id",
      label: "Id",
    },

    {
      id: "fullName",
      label: "Full Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
    },
    { id: "jobType", label: "Job Type" },
    {
      id: "created_at",
      label: "CreatedAt",
    },
    {
      id: "edit",
      label: "Edit",
    },
    {
      id: "delete",
      label: "Remove",
    },
  ];

  return (
    <React.Fragment>
      <CustomAlert
        open={openToast}
        setOpen={setOpenToast}
        type={status.type}
        message={status.message}
      />
      <Model title="Edit user" open={open} setOpen={setOpen} hideSave>
        <CreateOrUpdateController
          updateData={updateData}
          userForm={userForm}
          setModelOpen={setOpen}
          setUserForm={setUserForm}
        />
      </Model>
      <ListView
        columns={columns}
        data={mapData()}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        pagination={pagination}
        loading={loading}
        fatchData={fetchUsers}
        setLoading={setLoading}
        setData={setData}
        setPagination={setPagination}
      />
    </React.Fragment>
  );
};
