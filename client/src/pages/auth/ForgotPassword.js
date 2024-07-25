import React, { useState,useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";


import { auth } from "../../firebase";
import { toast } from "react-toastify";

const ForgotPassword = ({history}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


      const { user } = useSelector((state) => ({ ...state }));

  //   redirect user to home page if they are logged in. See App.js for alternative way
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [history, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_PASSWORD_RESET_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await sendPasswordResetEmail(auth, email, config);
      setEmail("");
      setLoading(false);
      toast.success("Check your email for password reset link");
    } catch (err) {
      console.log("Forgot password error", err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  //   const loginForm = () => (
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <input
  //           type="email"
  //           className="form-control"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           autoFocus
  //           placeholder="Enter email"
  //         />
  //       </div>
  //       <div className="form-group">
  //         <input
  //           type="password"
  //           className="form-control mt-2"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           placeholder="Enter password"
  //         />
  //       </div>
  //       <Button
  //         onClick={handleSubmit}
  //         type="primary"
  //         className="mb-2 mt-2"
  //         block
  //         shape="round"
  //         icon={<MailOutlined />}
  //         size="large"
  //         disabled={!email || password.length < 6}
  //       >
  //         Login with Email/Password
  //       </Button>
  //     </form>
  //   );

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          autoFocus
          required
        />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
