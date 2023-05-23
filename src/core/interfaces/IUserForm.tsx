export interface IUserForm {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  jobType: IJobType;
  terms?: boolean;
}

export enum IJobType {
  IT = "IT",
  Marketing = "Marketing",
  BusinessDevelopment = "Business Development",
}
