import httpService from "./http-service";

const fetchUsers = (
  setData: Function,
  setPagination: Function,
  setLoading: Function,
  page: Number
) => {
  setLoading(true);
  httpService
    .get(`/user/get?page=${page}`)
    .then((res) => {
      if (res.status === 200 && res.data.data) {
        res.data.data?.length && setData(res.data.data);
        res.data.pagination && setPagination(res.data.pagination);
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    })
    .finally();
};

const addOrEditUser = (
  form: any,
  reset: Function,
  setLoading: Function,
  setStatus: Function,
  setOpen: Function,
  updateData: Function,
  setModelOpen: Function
) => {
  setLoading(true);
  let url = form.id ? `user/update` : "/user/create";

  let Request = form.id ? httpService.put : httpService.post;

  Request(url, form)
    .then((res) => {
      if (res.status === 200 && res.data.data) {
        if (form?.id) {
          reset();
        }
        updateData(res.data.data, !form?.id ? 0 : 1);
        setStatus({
          status: "success",
          message: res.data.message,
        });
      }
      setLoading(false);
      setOpen(true);
      let id = setTimeout(() => {
        if (form?.id) {
          setModelOpen(false);
          clearTimeout(id);
        }
      }, 2000);
    })
    .catch(({ response }: any) => {
      setOpen(true);
      setStatus({
        type: "error",
        message: response?.data?.message,
      });
      setLoading(false);
    });
};

const deleteUser = (
  id: any,
  setStatus: Function,
  setOpen: Function,
  updateData: Function
) => {
  httpService
    .delete(`user/delete/${id}`)
    .then((res) => {
      if (res.status === 200) {
        updateData({ id }, 2);
        setStatus({
          status: "success",
          message: res.data.message,
        });
      }
      setOpen(true);
    })
    .catch(({ response }: any) => {
      setOpen(true);
      setStatus({
        type: "error",
        message: response?.data?.message,
      });
    });
};

export { fetchUsers, addOrEditUser, deleteUser };
