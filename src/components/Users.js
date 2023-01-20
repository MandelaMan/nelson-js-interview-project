import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux";
import user from "../assets/default.png";
import bg_img from "../assets/bg_img.jpg";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.user.users);

  const dispatch = useDispatch();

  const getAllUsers = () => {
    dispatch(fetchUsers());
  };

  useEffect(() => {
    getAllUsers();

    return () => {};

    // eslint-disable-next-line
  }, []);

  return user.loading ? (
    <>Loading.. Please wait</>
  ) : user.error ? (
    <>Error trying to get users</>
  ) : (
    <div className="container">
      {users.map((u, i) => (
        <div className="user-card urs-card-hgt">
          <div
            className="bg-img"
            style={{
              backgroundImage: `url(${bg_img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="details">
            <img src={user} alt="user" />
            <h2>{u.name}</h2>
            <p className="email">{u.email}</p>
            <p className="occ">
              <strong>{u.occupation}</strong>
            </p>
            <Link to={`/user/${u.id}`}>View Profile</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
