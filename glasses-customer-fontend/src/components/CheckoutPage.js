import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddressSelector from "./AddressSelector";
import Order from "../models/order";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, totalPrice: cartTotal, clearCart, removeItem } = useCart();
  const { customer } = useAuth();

  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;

  const items = buyNowItem ? [buyNowItem] : cart;

  const productTotal = buyNowItem
    ? buyNowItem.price * buyNowItem.quantity
    : cartTotal;

  const shippingFee = 30000;
  const total = productTotal + shippingFee;

  const [form, setForm] = useState({
    name: customer?.name || "",
    phone: customer?.phone_delivery || customer?.phone_number || "",
    address: customer?.address || {},
    note: "",
    payment: "cod",
  });

  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!form.name || !form.phone) {
      alert("Vui lòng nhập thông tin nhận hàng!");
      return;
    }

    if (!form.address || !form.address.province) {
      alert("Vui lòng chọn địa chỉ giao hàng!");
      return;
    }

    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.id,
          price: Number(item.price),
          quantity: item.quantity,
        })),

        shipping_address: form.address || {},
        phone: form.phone,
        note: form.note,
        payment_method: form.payment,
      };
      console.log("payload", payload);

      const res = await Order.createOrder(payload);

      console.log("ORDER SUCCESS:", res);

      alert("Đặt hàng thành công!");

      if (!buyNowItem) {
        clearCart();
      }

      navigate("/");
    } catch (err) {
      alert("❌ Đặt hàng thất bại!");
    }
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      <div className="container py-4">
        <h4 className="fw-bold mb-4">Thanh toán</h4>

        <div className="row g-3">
          {/* LEFT */}
          <div className="col-lg-8">
            {/* INFO */}
            <div className="card border-0 shadow-sm p-3 mb-3">
              <h6 className="fw-bold mb-3">Thông tin đặt hàng</h6>

              <label className="mb-1">Tên người nhận</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-control mb-2"
              />

              <label className="mb-1">Số điện thoại</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="form-control mb-2"
              />

              <AddressSelector
                value={form.address}
                onChange={(addr) => setForm({ ...form, address: addr })}
              />

              <label className="mb-1 mt-3">Ghi chú</label>
              <textarea
                className="form-control"
                rows={2}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            {/* PAYMENT */}
            <div className="card border-0 shadow-sm p-3 mb-3">
              <h6 className="fw-bold mb-3">Thanh toán</h6>

              {[
                { id: "cod", label: "💵 COD" },
                { id: "bank", label: "🏦 Bank" },
                { id: "momo", label: "📱 MoMo" },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setForm({ ...form, payment: p.id })}
                  style={{
                    padding: 10,
                    border:
                      form.payment === p.id
                        ? "2px solid #ee4d2d"
                        : "1px solid #ddd",
                    borderRadius: 8,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                >
                  {p.label}
                </div>
              ))}
            </div>

            {/* PRODUCTS */}
            <div className="card border-0 shadow-sm p-3">
              <h6 className="fw-bold mb-3">Sản phẩm</h6>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center mb-3 border-bottom pb-2"
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}${item.image}`}
                    width={70}
                    height={70}
                    style={{ objectFit: "cover", borderRadius: 6 }}
                  />

                  <div className="ms-3 flex-grow-1">
                    <div className="fw-bold">{item.name}</div>
                    <div className="text-muted small">x{item.quantity}</div>
                  </div>

                  <div style={{ color: "#ee4d2d", fontWeight: 700 }}>
                    {(item.price * item.quantity).toLocaleString()}đ
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-3">
              <h6 className="fw-bold mb-3">Tổng thanh toán</h6>

              <div className="d-flex justify-content-between">
                <span>Tạm tính</span>
                <span>{productTotal.toLocaleString()}đ</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Ship</span>
                <span>{shippingFee.toLocaleString()}đ</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Tổng</span>
                <span style={{ color: "#ee4d2d" }}>
                  {total.toLocaleString()}đ
                </span>
              </div>

              <button
                onClick={handleOrder}
                className="w-100 mt-3"
                style={{
                  background: "#ee4d2d",
                  color: "#fff",
                  border: "none",
                  padding: 12,
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
