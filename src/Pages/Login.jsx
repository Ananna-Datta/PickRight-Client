import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../Provider/AuthProvider";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
// import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Login = () => {
  const { loginuser, setLoading, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success("Google Sign-In successful!");
        // alert("Google Sign-In successful!");
        console.log(result);
        Swal.fire({
            title: 'Success!',
            text: 'Login successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        navigate("/");
      })
      .catch((err) => {
        setError((prev) => ({
          ...prev,
          google: err.message || "Google Sign-In failed.",
        }));
        toast.error("Google Sign-In failed.");
      })
      .finally(() => setLoading(false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginuser(email, password)
      .then(() => {
        toast.success("Login successful!");
        Swal.fire({
          title: 'Success!',
          text: 'Login successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
        navigate("/");
      })
      .catch((err) => {
        setError((prev) => ({
          ...prev,
          login: err.message || "Login failed. Please try again.",
        }));
        toast.error("Login failed. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center mx-auto border max-w-fit">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
        <h2 className="text-3xl m-3 font-semibold text-center">
          Login to your account
        </h2>

        {/* Google Sign-In Button */}
        <button
          className="border p-2 m-2 bg-slate-500 text-yellow-50"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
        {error.google && (
          <p className="text-sm text-red-500 mt-1">{error.google}</p>
        )}

        <div className="divider">OR</div>

        {/* Email/Password Login Form */}
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <Link
                to="/forgot-password"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          {error.login && (
            <p className="text-sm text-red-500 mt-1">{error.login}</p>
          )}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        {/* Redirect to Signup */}
        <div className="mt-4 text-center">
          <h1>
            Don't have an account?{" "}
            <Link to="/signup">
              <u>Signup</u>
            </Link>
          </h1>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Login;