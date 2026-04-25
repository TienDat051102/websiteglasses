import React, { useState } from "react";
import Customer from "../models/customer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.state?.redirect || "/";

  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.phone_number) return "Vui lòng nhập số điện thoại";
    if (!form.password) return "Vui lòng nhập mật khẩu";
    if (tab === "register" && !form.name) return "Vui lòng nhập họ tên";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload =
        tab === "login"
          ? {
              phone_number: form.phone_number,
              password: form.password,
            }
          : form;

      const res =
        tab === "login"
          ? await Customer.loginCustomer(payload)
          : await Customer.createCustomer(payload);

      if (res.error) {
        setError(res.error);
        return;
      }

      if (tab === "login") {
        login(res);

        navigate(redirect, { replace: true });
      } else {
        setTab("login");
      }
    } catch (e) {
      setError("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <div style={styles.tabBox}>
          <div
            onClick={() => setTab("login")}
            style={{
              ...styles.tab,
              borderBottom: tab === "login" ? "2px solid #ee4d2d" : "none",
              color: tab === "login" ? "#ee4d2d" : "#333",
            }}
          >
            Đăng nhập
          </div>

          <div
            onClick={() => setTab("register")}
            style={{
              ...styles.tab,
              borderBottom: tab === "register" ? "2px solid #ee4d2d" : "none",
              color: tab === "register" ? "#ee4d2d" : "#333",
            }}
          >
            Đăng ký
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={{ padding: 20 }}>
          {tab === "register" && (
            <input
              name="name"
              placeholder="Họ tên"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <input
            name="phone_number"
            placeholder="Số điện thoại"
            value={form.phone_number}
            onChange={handleChange}
            style={styles.input}
          />

          {tab === "register" && (
            <input
              name="email"
              placeholder="Email (tuỳ chọn)"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Đang xử lý..."
              : tab === "login"
                ? "Đăng nhập"
                : "Đăng ký"}
          </button>

          <p style={styles.note}>
            Bằng việc tiếp tục, bạn đồng ý với điều khoản sử dụng
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  box: {
    width: 380,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  tabBox: {
    display: "flex",
    borderBottom: "1px solid #eee",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    padding: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  btn: {
    width: "100%",
    padding: 12,
    background: "#ee4d2d",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    marginTop: 10,
  },
  error: {
    background: "#ffe5e5",
    color: "#d10000",
    padding: 10,
    fontSize: 13,
  },
  note: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
  },
};

export default AuthPage;
