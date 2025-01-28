import React from "react";

const Login = () => {
  return (
    <div className="flex h-screen bg-green-100  ">
        <div className="w-3xl max-h-px-100 mt-25 bg-cover bg-center flex justify-center items-center ml-10 -mr-60" style={{ backgroundImage: "url('/Images/farmer-login.png')" }}>
        
        </div>
      <div className="w-1/2 flex flex-col justify-center items-center mr-36">
        <h2 className="text-6xl font-bold mb-10">Login</h2>
        <form className="w-3/4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number *"
              className="w-full p-2 bg-white rounded-lg focus:ring-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password *"
              className="w-full p-2 bg-white rounded-lg focus:ring-2"
            />
          </div>
          <div className="text-center text-2xl mb-2">or</div>

  
          <div className="mb-4">
            <button
              type="button"
              className="flex items-center justify-center w-full bg-white-500 text-black  text-xl rounded-xl font-bold hover:bg-white -mr-1">
              Sign in
              <img src="/Images/google.png" className="h-10 object-cover w-28 -ml-2" alt="" />
            </button>
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded-xl font-bold hover:bg-green-600">
            Login
          </button>
         

          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-500">
              Signup
            </a>
          </p>
        </form>
      </div>

      
    </div>
  );
};

export default Login;
