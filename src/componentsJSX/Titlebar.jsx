import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Titlebar.css";
import logo from "../assets/Logo.png"; // 確保你有一個 logo.png 文件在對應的路徑
import LoginForm from "./LoginForm"; // 引入 LoginForm 組件
import { colors } from "@mui/material";

const Titlebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false); // 添加狀態來控制模態框顯示
  const [isLogin, setLoginin] = useState("");
  const navigate = useNavigate();

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      const queries = searchQuery
        .split(",")
        .map((query) => query.trim())
        .join("&query=");
      navigate(`/search?query=${queries}`);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //expire  username
    const loginExpire = localStorage.getItem("expire");
    const loginUsername = localStorage.getItem("name");
    const now = Date.now();
    loginExpire > now ? setLoginin(loginUsername) : setLoginin("");
    console.log("loginExpireloginExpire", loginExpire, loginUsername);
  }, []);

  return (
    <div className="titlebar-container">
      <div className="titlebar">
        <div className="titlebar-left">
          <img src={logo} alt="Logo" className="logo" />
          <Link to="/" className="company-name">
            LOOKDAY
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <div className="titlebar-right">
          <Link to="/contact">
            <button className="titlebar-button">客服中心</button>
          </Link>
          <Link to="/cart">
            <button className="titlebar-button">購物車</button>
          </Link>
          <Link to="/favorite">
            <button className="titlebar-button">收藏</button>
          </Link>
          <Link to="/register">
            <button className="titlebar-button">最近逛過</button>
          </Link>
          {isLogin ? (
            <span style={{ color: "blue" }}>{isLogin}</span>
          ) : (
            <button className="titlebar-button" onClick={handleOpenModal}>
              登入
            </button>
          )}
        </div>
      </div>
      <LoginForm show={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default Titlebar;
