import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { jobType } from "../../../options/jobType";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationSchema } from "./ValidateForm";
import { addOrEditUser } from "../../../services/UsersService";
import { CreateOrUpdateView } from "./CreateOrUpdateView";

export const CreateOrUpdateController: React.FC<any> = ({
  userForm,
  updateData,
  setModelOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<any>({
    type: undefined,
    message: null,
  });
  const newValidationSchema = validationSchema(userForm?.id ? true : false);
  type ValidationSchema = z.infer<typeof newValidationSchema>;
  const {
    handleSubmit,
    control,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: userForm || {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "20",
      jobType: "",
      // terms: false,
    },
    mode: "onChange",
    resolver: zodResolver(newValidationSchema),
  });
  const fullName = watch("fullName");
  console.log(fullName);
  const handleSave: SubmitHandler<ValidationSchema> = (data: any) => {
    let formValues = { ...data };
    if (userForm?.id) {
      formValues.id = userForm?.id;
    }
    delete formValues.terms;
    addOrEditUser(
      formValues,
      reset,
      setLoading,
      setStatus,
      setOpen,
      updateData,
      setModelOpen
    );
  };

  const getMessage = () => {
    if (errors) {
      if (Object.values(errors)?.length) {
        let newErrors = Object.values(errors);
        return (
          <div>
            {newErrors.map((error: any, index: any) => {
              return <p key={index}>{error.message}</p>;
            })}
          </div>
        );
      }
    }
    return "";
  };

  const formOptions = [
    {
      type: "text",
      name: "fullName",
      label: "Full Name",
    },
    {
      type: "email",
      name: "email",
      label: "Email",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
    },
    {
      type: "phone",
      name: "phoneNumber",
      label: "Phone Number",
    },
    {
      type: "select",
      name: "jobType",
      options: jobType,
      label: "Job Type",
      resetField: () => resetField("jobType"),
    },
  ];

  return (
    <div>
      <CreateOrUpdateView
        control={control}
        formOptions={formOptions}
        handleSave={handleSubmit(handleSave)}
        open={open}
        setOpen={setOpen}
        status={status}
        getMessage={getMessage}
        loading={loading}
      />
    </div>
  );
};
