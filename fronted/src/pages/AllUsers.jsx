import React, { useEffect } from "react";
import { Container } from "@mui/system";
import Loading from "../components/Loading";
import { getAllUsers } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import UserCard from "../components/UserCard";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  console.log(users?.length);

  return (
    <Container className="mt-6">
      <h1 className="text-center text-3xl font-semibold">All Users</h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {users?.length >= 0 ? (
            <div>
              {users.map((user, index) => (
                <UserCard
                  key={index}
                  name={user.name}
                  image={user.image}
                  userRole={user.role}
                  id={user._id}
                  email={user.email}
                />
              ))}
            </div>
          ) : (
            "YOoy have no Users"
          )}
        </div>
      )}
    </Container>
  );
};

export default AllUsers;
