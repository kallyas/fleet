import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../util/validations";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [appError, setAppError] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const handleLogin = async (data) => {
    setAppError(null);
    try {
      const { token, user } = await login(data).unwrap();
      dispatch(setCredentials({ token, user }));
      navigate("/dashboard");
    } catch (err) {
      if (parseInt(err.status) !== err.status) {
        setAppError("Network Error");
      } else {
        setAppError(err?.data?.message || err?.data?.non_field_errors[0]);
      }
    }
  };

  const { errors } = formState;
  return (
    <main>
      <section className="content-main mt-80 mb-80">
        <div className="card mx-auto card-login">
          <div className="card-body">
            <h4 className="card-title mb-4">Sign in</h4>
            {appError && (
              <div className="alert alert-danger" role="alert">
                {appError}
              </div>
            )}
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <input
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="Username or email"
                  type="text"
                  {...register("username")}
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100">
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
