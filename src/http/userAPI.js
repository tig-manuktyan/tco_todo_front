import { $authHost, $host } from "./index";

const registration = async (formData) => {
  const { data } = await $host.post("/register", {
    email: formData.email,
    password: formData.password,
  });
  return data;
};

const login = async (formData) => {
  const { data } = await $host.post("/login", {
    email: formData.email,
    password: formData.password,
  });
  return data;
};

const createTodo = async (formData) => {
  const response = await $authHost.post("/create", formData);
  return response;
};

const deleteTodo = async (formData) => {
  const { data } = await $authHost.delete("/delete", { data: formData });
  return data;
};

const getTodos = async () => {
  const { data } = await $authHost.get("/get");
  return data;
};

export { login, createTodo, deleteTodo, getTodos, registration };
