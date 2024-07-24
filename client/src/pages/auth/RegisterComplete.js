import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = (props) => {
  //props history
  const { history } = props;

  // const {user}= useSelector((state) => ({...state}));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForRegistration");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          //remove user email from local storage
          window.localStorage.removeItem("emailForRegistration");

          let user = auth.currentUser;
          await updatePassword(user, password)
            .then(() => {
              console.log("password changed successfull");
            })
            .catch((err) => {
              console.log(err);
            });
          //get user id token
          const idTokenResult = await user.getIdTokenResult();
          //redux store
          console.log(idTokenResult);
          createOrUpdateUser(idTokenResult.token)
            .then((res) => {
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            })
            .catch((err) => console.log(err));
          //redirect
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  };

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Complete Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
