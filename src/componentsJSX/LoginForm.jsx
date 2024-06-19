import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Auth_JWT from "../../Auth_JWT";

const LoginForm = ({ show, onClose }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    reg: {
      Name: "",
      Email: "",
      Password: "",
    },
    sign: {
      Email: "",
      Password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const handleChangeForm = (e, regOrSign) => {
    const { name, value } = e.target;
    regOrSign == "reg"
      ? setForm({
          ...form,
          reg: {
            ...form.reg,
            [name]: value,
          },
        })
      : setForm({
          ...form,
          sign: {
            ...form.sign,
            [name]: value,
          },
        });
  };
  // console.log("formformform", form);
  const containerRef = React.useRef(null);

  const handleRegisterClick = () => {
    containerRef.current.classList.add("active");
  };

  const handleLoginClick = () => {
    containerRef.current.classList.remove("active");
  };

  if (!show) {
    return null;
  }
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // 定義要發送的 GET 請求的 URL
    // https://localhost:7095/LogIn/pwdcheck/?email=shaw@gmail.com&password=Aa111111
    const url = "https://localhost:7095/LogIn/pwdcheck";

    // 定義查詢參數
    const params = {
      email: form.sign.Email,
      password: form.sign.Password,
    };

    // 發送 GET 請求並傳遞查詢參數
    axios
      .post(
        `https://localhost:7095/LogIn/pwdcheck/?email=${form.sign.Email}&password=${form.sign.Password}`
      )
      .then((response) => {
        Auth_JWT.login(response.data.token);
        // 處理成功的響應
        console.log(response.data);
        setLoading(false);
        onClose(); //關閉視窗
        setOpen(true); //提醒成功
        window.location.reload();
      })
      .catch((error) => {
        // 處理錯誤
        console.error("發送請求時發生錯誤：", error);
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    // 定義要發送的 GET 請求的 URL
    // https://localhost:7095/LogIn/register
    const url = "https://localhost:7095/LogIn/register";

    // 定義查詢參數
    const params = {
      name: form.reg.Name,
      email: form.reg.Email,
      password: form.reg.Password,
    };

    // 發送 GET 請求並傳遞查詢參數
    axios
      .post(
        // url,
        // { param: params }
        `https://localhost:7095/LogIn/register/?Username=${form.reg.Name}&Email=${form.reg.Email}&Password=${form.reg.Password}`
      )
      .then((response) => {
        // 處理成功的響應
        Auth_JWT.registerAndLogin({ name: form.reg.Name });
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        // 處理錯誤
        console.error("發送請求時發生錯誤：", error);
      });
  };
  const handleSignUp_WithGoogle = (data) => {
    // 定義要發送的 GET 請求的 URL

    // 發送 GET 請求並傳遞查詢參數
    axios
      .post(
        // url,
        // { param: params }
        `https://localhost:7095/LogIn/register/?Username=${data.name}&Email=${data.email}&Password=A_12345678a`
      )
      .then((response) => {
        // 處理成功的響應
        window.location.reload();
        console.log(response.data);
      })
      .catch((error) => {
        // 處理錯誤
        console.error("發送請求時發生錯誤：", error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("loading", loading);
  return (
    <div className="login-form">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="container" id="container" ref={containerRef}>
        <div className="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>

              {/* <a href="#" className="icon"> */}
              {/* <i className="fab fa-facebook-f"></i>
              <i className="fa fa-facebook-official" aria-hidden="true"></i> */}
              {/* <i class="fa-brands fa-facebook"></i> */}
              {/* </a> */}
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>或使用電子郵件註冊</span>
            <input
              type="text"
              placeholder="Name"
              value={form.reg.Name}
              name="Name"
              onChange={(e) => handleChangeForm(e, "reg")}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.reg.Email}
              name="Email"
              onChange={(e) => handleChangeForm(e, "reg")}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.reg.Password}
              name="Password"
              onChange={(e) => handleChangeForm(e, "reg")}
            />
            <button onClick={(e) => handleSignUp(e, "reg")}>註冊</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>登入 </h1>
            <div className="social-icons">
              <GoogleOAuthProvider clientId="191234775662-mda3goonrsk2g68bu3dknkpkgrh34431.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    // setUser(jwtDecode(credentialResponse.credential));
                    Auth_JWT.login(credentialResponse.credential);
                    handleSignUp_WithGoogle(
                      jwtDecode(credentialResponse.credential)
                    );
                    onClose();
                    // window.location.reload();
                    // console.log(
                    //   "jwtDecode(credentialResponse.credential)",
                    //   jwtDecode(credentialResponse.credential)
                    // );
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  cookiePolicy={"single_host_origin"}
                  type="icon"
                  shape="circle"
                />
              </GoogleOAuthProvider>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>或使用其他方式登入</span>
            <input
              type="email"
              placeholder="Email"
              value={form.sign.Email}
              name="Email"
              onChange={(e) => handleChangeForm(e, "sign")}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.sign.Password}
              name="Password"
              onChange={(e) => handleChangeForm(e, "sign")}
            />
            <a href="#">忘記密碼?</a>
            <button onClick={(e) => handleLogin(e, "sign")}>
              {loading ? "登入中" : "登入"}
            </button>
            {/* <button onClick={(e) => handleLogin(e)}>Sign In</button> */}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>歡迎回來!</h1>
              <p>輸入您的個人詳細信息以使用網站的所有功能</p>
              <button className="hidden" id="login" onClick={handleLoginClick}>
                登入
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>歡迎回來!</h1>
              {/* Hello, Friend! */}
              <p>填寫您的個人詳細信息註冊以使用本網站的所有內容</p>
              {/* Register with your personal details to use all of the site's
                features */}
              <button
                className="hidden"
                id="register"
                onClick={handleRegisterClick}
              >
                註冊
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            成功登入
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default LoginForm;
