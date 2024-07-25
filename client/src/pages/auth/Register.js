import React, { useState , useEffect } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const Register = ({history}) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ENV--->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, config);
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );
      localStorage.setItem("emailForRegistration", email);
      setEmail("");
    } catch (error) {
      console.error("Error sending email link:", error);
      toast.error(error.message);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter email"
      />
      <button type="submit" className="btn btn-raised mt-2">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
