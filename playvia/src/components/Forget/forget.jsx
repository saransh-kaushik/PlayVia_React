import { useState } from "react";
import { Link } from "react-router-dom";
import "./forget.css";
import backgroundImage from "../../assets/loginBG.jpg"; // ✅ Import the image

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    alert("Password reset link sent!");
  };

  return (
    <div 
      className="forget-container" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`, // ✅ Set background dynamically
        backgroundSize: "cover", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}    >
      <div className="forget-box">
        <h2>Forget password</h2>
        <form onSubmit={handleReset}>
          <div>
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Request to reset link</button>
        </form>
        <div className="back-link">
          <Link to="/">Back To Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
