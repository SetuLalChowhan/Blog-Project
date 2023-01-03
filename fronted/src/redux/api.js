import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

//login
export const signIn = (formData) => {
  return API.post("api/v1/login", formData);
};
//Register
export const signUp = (formData) => {
  return API.post("api/v1/register", formData);
};
//create Blog
export const addBlog = (blogData) => {
  return API.post("api/v1/createBlog",blogData);
};
// Blogs
export const getAllBlogs = () => {
  return API.get(`api/v1/blogs`);
};

//search blog
export const getSearchBlogs = (keyword) => {
  return API.get(`api/v1/blogs?keyword=${keyword}`);
};
//blog details
export const getSingleBlog= (id) => {
  return API.get(`api/v1/blog/${id}`);
};

//comment add
export const AddComment= (id,commentObj) => {
  console.log(commentObj)
  return API.put(`api/v1/comment/${id}`,commentObj);
};

//update profile
export const updateMe= (updateProfileData) => {
 
  return API.put(`api/v1/updateMe`,updateProfileData);
};

// My Blogs
export const MyBlogs= () => {
 
  return API.get(`api/v1/myBlogs`);
};

//edit blogs
export const editBlogs= (id, blogData) => {
  console.log(blogData)
 
  return API.put(`api/v1/blog/${id}`, blogData);
};

//Delte Blog
export const DeleteBlog= (id) => {

  return API.delete(`api/v1/blog/${id}`);
};

// all users -- admin

export const allUsers= () => {

  return API.get(`api/v1/allUsers`);
};

//change role --admin
export const changeRole= (id,roleValue) => {

  return API.put(`api/v1/updateRole/${id}`,roleValue);
};
//deleted User
export const deleteUser= (id) => {

  return API.delete(`api/v1/deleteUser/${id}`);
};




