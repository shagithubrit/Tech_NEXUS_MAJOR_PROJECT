import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailLink } from "firebase/auth";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();

  useEffect(() => {
    setEmail(localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
       const result = await signInWithEmailLink(
         auth,
         email,
         window.location.href
       );
       console.log("RESULT--->", result);
      if (result.user.emailVerified) {
        // remove email from localStorage
        localStorage.removeItem("emailForRegistration");

      //   // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

      //   // redux store
      //   const res = await createOrUpdateUser(idTokenResult.token);

        // dispatch({
        //   type: "LOGGED_IN_USER",
        //   payload: {
        //     name: res.data.name,
        //     email: res.data.email,
        //     token: idTokenResult.token,
        //     role: res.data.role,
        //     _id: res.data._id,
          // },
        // });

      history.push("/");
    }
  }
    catch (err) {
      console.log("Register complete error", err);
      toast.error(err.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control mt-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter your password"
      />
      <button type="submit" className="btn btn-raised mt-2">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
