import { jwtDecode } from "jwt-decode";

// src/AuthService.js
class AuthService {
  login(token) {
    const decoded = jwtDecode(token);
    const currentDate = Date.now();
    console.log(token);
    localStorage.setItem("name", decoded.name);
    localStorage.setItem("expire", currentDate + 2 * 60 * 60 * 1000);
  }
  registerAndLogin(data) {
    const currentDate = Date.now();
    localStorage.setItem("name", data.name);
    localStorage.setItem("expire", currentDate + 2 * 60 * 60 * 1000);
  }

  logout() {
    localStorage.removeItem("jwt_token");
  }

  isLoggedIn() {
    const token = localStorage.getItem("jwt_token");
    // 這裡可以添加更多的 token 驗證邏輯，比如 token 是否過期
    return !!token;
  }

  getToken() {
    return localStorage.getItem("jwt_token");
  }
}

export default new AuthService();
