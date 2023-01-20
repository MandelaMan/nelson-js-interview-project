import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../redux";
import profile from "../assets/default.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import bg_img from "../assets/bg_img.jpg";

const User = (props) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const [edit, setEdit] = useState(false);

  const occupations = [
    "Analog Circuit Design manager",
    "Assistant Manager",
    "Computer Systems Analyst II",
    "Accounting Assistant III",
    "Environmental Specialist",
    "Speech Pathologist",
    "Research Associate",
    "Human Resources Assistant III",
    "Registered Nurse",
    "Product Engineer",
    "Notorious Supervillain",
    "Deputy President",
  ];

  const onSubmit = (data) => {
    data.id = props.match.params.id;

    dispatch(updateUser(data));
  };

  const getUser = () => {
    dispatch(fetchUser(props.match.params.id));
  };

  useEffect(() => {
    getUser();

    return () => {
      setEdit(false);
    };

    // eslint-disable-next-line
  }, [props.match.params.id]);

  return user.loading ? (
    <>Loading</>
  ) : user.error ? (
    <>Error trying to get user</>
  ) : (
    <>
      <div className="container">
        <div className="user-card ur-card-hgt">
          {!edit ? (
            <>
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
                <img src={profile} alt="user" />
                <h2>{user.name}</h2>
                <p className="email">{user.email}</p>
                <p className="occ">
                  <strong>{user.occupation}</strong>
                </p>
                <p className="bio">
                  <i>{user.bio}</i>
                </p>
                <div className="btns">
                  <button onClick={() => setEdit(true)}>Edit</button>
                  <Link to="/">Back</Link>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inpt">
                <label>Full Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  ref={register({
                    required: "Full name cannot be empty",
                  })}
                  disabled={user.loading ? true : false}
                />
                <span className="err_msg">
                  {errors.name && errors.name.message}
                </span>
              </div>
              <div className="inpt">
                <label>Email</label>
                <br />
                <input
                  type="text"
                  name="email"
                  defaultValue={user.email}
                  ref={register({
                    required: "Email cannot be empty",
                  })}
                  disabled={user.loading ? true : false}
                />
                <span className="err_msg">
                  {errors.email && errors.email.message}
                </span>
              </div>
              <div className="inpt">
                <label>Occupation</label>
                <br />
                <select
                  name="occupation"
                  defaultValue={user.occupation}
                  ref={register({
                    required: "Occupation cannot be empty",
                  })}
                >
                  <option value={user.occupation}>{user.occupation}</option>
                  {occupations.map((o, i) => (
                    <option key={i} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <span className="err_msg">
                  {errors.occupation && errors.occupation.message}
                </span>
              </div>
              <div className="inpt">
                <label>Bio</label>
                <br />
                <textarea
                  rows="5"
                  name="bio"
                  defaultValue={user.bio}
                  ref={register({
                    required: "Bio cannot be empty",
                  })}
                ></textarea>
                <span className="err_msg">
                  {errors.bio && errors.bio.message}
                </span>
              </div>
              <div className="inpt">
                <input type="submit" value="Update" />
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setEdit(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
