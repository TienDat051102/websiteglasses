import React, { useState, useNavigate, useEffect } from "react";
import { User, ShoppingBag, Eye, LogOut } from "lucide-react";
import AddressSelector from "./AddressSelector";
import Customer from "../models/customer";
import Order from "../models/order";

const ProfilePage = () => {
  const [tab, setTab] = useState("profile");

  const [customer, setCustomer] = useState(() =>
    JSON.parse(localStorage.getItem("customer") || "{}"),
  );

  return (
    <div style={styles.wrapper}>
      <div className="container py-4">
        <div style={styles.layout}>
          <Sidebar tab={tab} setTab={setTab} customer={customer} />

          <div style={styles.content}>
            {tab === "profile" && (
              <ProfileTab customer={customer} setCustomer={setCustomer} />
            )}
            {tab === "orders" && <OrdersTab />}
            {tab === "eye" && <EyeTab />}
            {tab === "logout" && <LogoutTab setCustomer={setCustomer} />}
          </div>
        </div>
      </div>
    </div>
  );
};
const Sidebar = ({ tab, setTab, customer }) => {
  const handleLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("customer_token");
    window.location.href = "/";
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.userBox}>
        <img
          src={
            customer?.avatar
              ? `${process.env.REACT_APP_API_URL}${customer.avatar}`
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          style={styles.avatarSmall}
        />
        <div>
          <div style={{ fontWeight: 600 }}>{customer?.name}</div>
          <div style={{ fontSize: 12, color: "#888" }}>
            {customer?.phone_number}
          </div>
        </div>
      </div>

      <MenuItem
        icon={<User size={16} />}
        text="Hồ sơ"
        active={tab === "profile"}
        onClick={() => setTab("profile")}
      />

      <MenuItem
        icon={<ShoppingBag size={16} />}
        text="Đơn hàng"
        active={tab === "orders"}
        onClick={() => setTab("orders")}
      />

      <MenuItem
        icon={<Eye size={16} />}
        text="Lịch sử đo mắt"
        active={tab === "eye"}
        onClick={() => setTab("eye")}
      />

      <MenuItem
        icon={<ShoppingBag size={16} />}
        text="Quay lại trang chủ"
        active={false}
        onClick={() => (window.location.href = "/")}
      />

      <MenuItem
        icon={<LogOut size={16} />}
        text="Đăng xuất tài khoản"
        active={tab === "logout"}
        onClick={handleLogout}
      />
    </div>
  );
};
const MenuItem = ({ icon, text, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.menuItem,
      background: active ? "#fff1ee" : "transparent",
      color: active ? "#ee4d2d" : "#333",
    }}
  >
    {icon}
    {text}
  </div>
);

const ProfileTab = ({ customer, setCustomer }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState(customer);
  const [avatar, setAvatar] = useState(
    customer?.avatar ? `${API_URL}${customer.avatar}` : null,
  );
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // sync khi customer đổi
  useEffect(() => {
    setForm(customer);
    setAvatar(customer?.avatar ? `${API_URL}${customer.avatar}` : null);
  }, [customer]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setAvatar(URL.createObjectURL(f));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!form.name) return alert("Vui lòng nhập tên");
      if (!form.phone_delivery) return alert("Nhập SĐT");

      let avatarBase64 = form.avatar;

      if (file) {
        avatarBase64 = await toBase64(file);
      }

      const payload = {
        name: form.name,
        email: form.email,
        phone_delivery: form.phone_delivery,
        address: form.address || {},
        avatar: avatarBase64,
      };

      const res = await Customer.updateCustomer(payload);

      if (res.error) return alert(res.error);

      setCustomer(res.data);
      localStorage.setItem("customer", JSON.stringify(res.data));

      setFile(null);

      alert("Cập nhật thành công");
    } catch (e) {
      console.log(e);
      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h5 style={{ marginBottom: 20 }}>Hồ sơ của tôi</h5>

      <div style={styles.profileGrid}>
        {/* AVATAR */}
        <div style={{ textAlign: "center" }}>
          <label style={{ cursor: "pointer" }}>
            <img
              src={
                avatar
                  ? avatar
                  : form.avatar
                    ? `${API_URL}${form.avatar}`
                    : "https://via.placeholder.com/120"
              }
              style={styles.avatarBig}
            />
            <input type="file" hidden onChange={handleFile} />
          </label>
          <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
            Click để đổi ảnh
          </div>
        </div>

        <div style={styles.form}>
          <Input
            label="Họ và tên"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <AddressSelector
            value={form.address}
            onChange={(addr) => setForm({ ...form, address: addr })}
          />

          <Input
            label="SĐT nhận hàng"
            value={form.phone_delivery}
            onChange={(v) => setForm({ ...form, phone_delivery: v })}
          />

          <button style={styles.button} onClick={handleSave} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, value, onChange }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={styles.input}
    />
  </div>
);

//////////////////////////////////////////////////
// ORDERS TAB
//////////////////////////////////////////////////
const OrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await Order.getMyOrders();
        setOrders(res.data || res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusMap = {
    pending: { label: "Chờ xác nhận", color: "#f59e0b" },
    confirmed: { label: "Đã xác nhận", color: "#3b82f6" },
    shipping: { label: "Đang giao", color: "#a855f7" },
    completed: { label: "Hoàn thành", color: "#22c55e" },
    canceled: { label: "Đã huỷ", color: "#ef4444" },
  };

  return (
    <div style={styles.wrapper}>
      <h4 style={styles.title}>Đơn hàng của tôi</h4>

      {loading ? (
        <div style={styles.loading}>Đang tải đơn hàng...</div>
      ) : orders.length === 0 ? (
        <div style={styles.empty}>Bạn chưa có đơn hàng nào</div>
      ) : (
        orders.map((order) => {
          const status = statusMap[order.status] || {};

          return (
            <div key={order.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={styles.orderCode}>
                    #{order.order_code || order.id}
                  </div>
                  <div style={styles.date}>
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </div>
                </div>

                <div
                  style={{
                    ...styles.status,
                    backgroundColor: status.color + "20",
                    color: status.color,
                  }}
                >
                  {status.label}
                </div>
              </div>

              <div style={styles.productList}>
                {order.orderItems?.length > 0 ? (
                  order.orderItems.map((item) => (
                    <div key={item.id} style={styles.productItem}>
                      <div style={styles.productInfo}>
                        <div style={styles.productName}>
                          Sản phẩm #{item.productId}
                        </div>
                        <div style={styles.qty}>x{item.quantity}</div>
                      </div>

                      <div style={styles.price}>
                        {Number(item.price * item.quantity).toLocaleString()}đ
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 13, color: "#999" }}>
                    Không có sản phẩm
                  </div>
                )}
              </div>

              <div style={styles.footer}>
                <div style={styles.phone}></div>

                <div style={styles.total}>
                  Tổng:{" "}
                  <span style={{ color: "#ee4d2d", fontWeight: 700 }}>
                    {Number(order.totalPrice).toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const EyeTab = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEyeExams = async () => {
      try {
        const res = await Customer.getMyEyeExams();
        setData(res);
      } catch (err) {
        console.log("Load eye exams error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEyeExams();
  }, []);

  return (
    <div style={styles.card}>
      <h5 style={{ fontWeight: 700, marginBottom: 15 }}>👁️ Lịch sử đo mắt</h5>

      {loading ? (
        <div style={{ padding: 20, color: "#888" }}>Đang tải...</div>
      ) : data.length === 0 ? (
        <div style={styles.emptyBox}>
          <div style={{ fontSize: 40 }}>👓</div>
          <p style={{ marginTop: 10, color: "#888" }}>Chưa có lịch sử đo mắt</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((item) => (
            <div key={item.id} style={styles.eyeItem}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>
                  #{item.id} • {item.source || "shop"}
                </div>

                <div style={{ fontSize: 13, color: "#666" }}>
                  👁️ Trái: {item.left_eye_degree}°
                  {item.astigmatism_left
                    ? ` | loạn ${item.astigmatism_left}`
                    : ""}
                </div>

                <div style={{ fontSize: 13, color: "#666" }}>
                  👁️ Phải: {item.right_eye_degree}°
                  {item.astigmatism_right
                    ? ` | loạn ${item.astigmatism_right}`
                    : ""}
                </div>

                {item.pupil_distance && (
                  <div style={{ fontSize: 13, color: "#666" }}>
                    👤 PD: {item.pupil_distance}
                  </div>
                )}

                {item.note && (
                  <div style={{ fontSize: 12, color: "#999", marginTop: 5 }}>
                    📝 {item.note}
                  </div>
                )}
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#999" }}>
                  {new Date(item.created_at).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const LogoutTab = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");

    navigate("/");
  }, []);

  return null;
};

const styles = {
  wrapper: { background: "#f5f5f5", minHeight: "100vh" },

  layout: {
    display: "flex",
    gap: 20,
  },

  sidebar: {
    width: 250,
    background: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  userBox: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },

  menuItem: {
    display: "flex",
    gap: 10,
    padding: 10,
    borderRadius: 8,
    cursor: "pointer",
  },

  content: {
    flex: 1,
  },

  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  profileGrid: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: 20,
  },

  avatarBig: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: 13,
    marginBottom: 4,
    color: "#555",
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  button: {
    marginTop: 10,
    background: "#ee4d2d",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    border: "none",
    fontWeight: 600,
  },
  emptyBox: {
    textAlign: "center",
    padding: 30,
    color: "#999",
  },

  eyeItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 10,
    background: "#fafafa",
  },
  wrapper: {
    background: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
  },

  title: {
    fontWeight: 700,
    marginBottom: 15,
  },

  card: {
    background: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    paddingBottom: 10,
    marginBottom: 10,
  },

  orderCode: {
    fontWeight: 700,
  },

  date: {
    fontSize: 12,
    color: "#888",
  },

  status: {
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },

  productList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  productItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
  },

  productInfo: {
    display: "flex",
    gap: 8,
  },

  productName: {
    fontWeight: 500,
  },

  qty: {
    color: "#888",
  },

  price: {
    fontWeight: 600,
  },

  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
  },

  phone: {
    color: "#666",
  },

  total: {
    fontWeight: 600,
  },

  loading: {
    padding: 20,
  },

  empty: {
    padding: 20,
    color: "#888",
  },
};

export default ProfilePage;
