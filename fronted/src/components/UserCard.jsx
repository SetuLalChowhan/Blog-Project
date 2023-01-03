import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roleChange,userDelete } from "../redux/features/authSlice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const UserCard = ({ id, name, image, userRole,email  }) => {

    const {error} = useSelector((state)=>({...state.auth}))
  const dispatch = useDispatch();
  const [role,setRole] = useState('user')

  const handleChange =(e)=>{
    setRole(e.target.value)

  }

  useEffect(()=>{
    error && toast.error(error)
  },[error])

  const handleSubmit = (e) =>{
    e.preventDefault()
    const roleValue ={
        role
    }
    dispatch(roleChange({id,roleValue}))


  }
 

  return (
    <div className=" flex md:flex-row flex-col justify-between shadow-md   w-full mb-3">
      <div className=" flex  gap-5">
        <img className="w-40 object-fill" src={image} alt="image" />
        <div className="flex flex-col mt-10 lg:mt-8">
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-sm">{userRole }</p>
          <p className="text-lg font-semibold">{email }</p>
        </div>
      </div>
      <div className="  flex-col mt-4 md:mt-0 md:mb-0 mb-2 flex lg:flex-row justify-center md:items-center gap-3 mr-4">
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="role">Choose a Role:</label>
            <select name="role" id="role" value={role} onChange={handleChange}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <button className="text-md p-0 w-20 rounded-md" >submit</button>
          </form>
        </div>

        <button
          className="text-md p-0 w-20 bg-red-700 rounded-md"
          onClick={() => {
            dispatch(userDelete({ id,toast }));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
