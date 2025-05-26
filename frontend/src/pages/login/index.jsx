import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../services/authService";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await login(data); // use your service
      console.log("Login success:", result);

      if (result?.token) {
        localStorage.setItem("token", JSON.stringify(result.token));
      }
      navigate("/");
      // Redirect or show success message
    } catch (error) {
      console.error("Login failed:", error);
      // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Username or Email */}
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              id="username"
              type="username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              id="password"
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-gray-600 text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
