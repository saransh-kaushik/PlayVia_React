import { useState } from "react";
import "./css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login button clicked!");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('')" }}>
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-600 p-2 rounded text-white font-bold hover:bg-red-700">
            Sign in
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-400">Forgot password?</a>
          <p className="mt-2">New to PlaVia? <a href="#" className="text-blue-400">Sign up now</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
