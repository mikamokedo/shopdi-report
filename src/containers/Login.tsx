import React, { useState } from "react";
import LayoutWrapLogin from "../components/LayoutWrapLogin";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Login.scss";


interface LoginProps{
  onSuccess:() => void;
}
const validationSchema = yup.object({
  userName: yup.string().required("Bạn quên nhập tài khoản"),
  password: yup.string().required("Bạn quên nhập mật khẩu"),
});
const Login:React.FC<LoginProps> = ({onSuccess}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit:  (values) => {
      setError(false);
      setIsLoading(true);
        if(values.userName !== "BaocaoTMDT" || values.password !== "shopdi.com.vn"){
          setError(true);
          setIsLoading(false);
        }
        else{
          setTimeout(() =>{
            onSuccess()
          },1000)
        }
    },
  });

  return (
    <div>
      <LayoutWrapLogin>
        <div className="title">Đăng nhập</div>
        <div className="login-wrap" style={{ minHeight: "200px" }}>

          <div className="mb-3">
          <input
              name="userName"
              placeholder="Tên đăng nhập"
              className="input-short"
              onChange={formik.handleChange}
            />

          </div>
          {formik.touched.userName && Boolean(formik.errors.userName) && (
              <div className="text-red mt-2 font-size13">
                {formik.errors.userName}
              </div>
            )}
          <div className="mb-3 mt-3">
            <input
              name="password"
              placeholder="Mật khẩu"
              className="input-short"
              onChange={formik.handleChange}
              type="password"
            />
          </div>
          {formik.touched.password && Boolean(formik.errors.password) && (
            <div className="text-red mt-2 font-size13">
              {formik.errors.password}
            </div>
          )}
        </div>
        {error && (
            <div className="text-red mt-3 font-size13">
              Sai thông tin đăng nhập
            </div>
          )}
        <div
          className={`d-flex ${
            error ? "justify-content-between" : "justify-content-end"
          }`}
        >


          <button
            type="button"
            className="button-login"
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý" : "Đăng nhập"}
          </button>
        </div>
      </LayoutWrapLogin>
    </div>
  );
};

export default Login;
