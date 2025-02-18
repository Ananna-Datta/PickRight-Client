import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "./../Provider/AuthProvider"
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Signup = () => {
  const { createNewUser, setUser, setLoading } = useContext(AuthContext);
  const navigation = useNavigate();
  const [error, setError] = useState({});

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  // Validate password
  if (!passwordRegex.test(password)) {
    setError((prev) => ({
      ...prev,
      register: "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
    }));
    toast.error("Invalid password format.");
    return; // Exit early if validation fails
  }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        form.reset();
        toast.success("Google Sign-In successful!");
        Swal.fire({
          title: 'Success!',
          text: 'Sign in successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
        navigation("/");
      })
      .catch((err) => {
        setError((prev) => ({
          ...prev,
          register: err.message || "Registration failed. Please try again.",
        }));
        toast.error("Google Sign-In failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center mx-auto border max-w-xl py-14">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-4xl p-5">SignUp form</h1>
        <form onSubmit={handleSignup} className="card-body">
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>

          {/* Photo Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="url"
              placeholder="Photo URL"
              name="photo"
              className="input input-bordered"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Error Message */}
          {error.register && <p className="text-red-500">{error.register}</p>}

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>

          {/* Redirect to Login */}
          <div>
            <h1>
              Already have an account?{" "}
              <Link to="/login">
                <u>Login</u>
              </Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;