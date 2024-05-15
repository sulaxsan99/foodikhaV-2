import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "../../styles/styles";

const Login = () => {
  const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(
        `${server}/user/login-user`,
        values,
        { withCredentials: true }
      );
      toast.success("Login Success!");
      navigate("/");
      window.location.reload(true);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .test(
        'uppercase',
        'Password must contain at least one uppercase letter',
        value => /[A-Z]/.test(value)
      )
      .test(
        'lowercase',
        'Password must contain at least one lowercase letter',
        value => /[a-z]/.test(value)
      )
      .test(
        'number',
        'Password must contain at least one number',
        value => /\d/.test(value)
      )
      // .test(
      //   'specialCharacter',
      //   'Password must contain at least one special character',
      //   value => /[!@#$%^&*(),.?":{}|<>]/.test(value)
      // ),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#3F1B11]">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    className="appearance-none block w-full px-3 py-2 border border-[#3F1B11] rounded-md shadow-sm placeholder-[#3F1B11] focus:outline-none focus:ring-[#3F1B11] focus:border-[#3F1B11] sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      type={visible ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      className="appearance-none block w-full px-3 py-2 border border-[#3F1B11] rounded-md shadow-sm placeholder-[#3F1B11] focus:outline-none focus:ring-[#3F1B11] focus:border-[#3F1B11] sm:text-sm"
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className={`${styles.noramlFlex} justify-between`}>
                  <div className={`${styles.noramlFlex}`}>
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="h-4 w-4 text-[#3F1B11] focus:ring-[#3F1B11] border-[#3F1B11] rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900 "
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="forgot-password"
                      className="font-medium text-[#3F1B11] hover:text-[#3F1B11]"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#3F1B11] hover:bg-[#3F1B11]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                <div className={`${styles.noramlFlex} w-full`}>
                  <h4>Not have any account?</h4>
                  <Link to="/signup" className="text-[#3F1B11] pl-2">
                    Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
