import React from "react";
import { useInformation } from "../context/InformationContext";
import { useCart } from "../context/CartContext";
import Nav from "./Nav";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import {
  Minus,
  Plus,
  Trash2,
  User,
  Search,
  ShoppingCart,
  Menu,
  Phone,
  MapPin,
} from "lucide-react";

const Header = () => {
  const { info, loading, error } = useInformation();

  const { cart, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();

  const openCart = () => {
    console.log("click cart");
    const el = document.getElementById("offcanvasCart");
    if (!el) return;

    const offcanvas = Offcanvas.getOrCreateInstance(el);
    offcanvas.show();
  };

  const openSearch = () => {
    const el = document.getElementById("offcanvasSearch");
    if (!el) return;

    const offcanvas = Offcanvas.getOrCreateInstance(el);
    offcanvas.show();
  };

  if (loading) return null;
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="offcanvas offcanvas-end" id="offcanvasCart">
        <div className="offcanvas-header">
          <h5 className="fw-bold">Giỏ hàng</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div
          className="offcanvas-body p-0 d-flex flex-column"
          style={{ height: "100%" }}
        >
          {/* LIST */}
          <div style={{ flex: 1, overflowY: "auto", padding: 15 }}>
            {cart.length === 0 ? (
              <p className="text-muted text-center mt-5">Giỏ hàng trống</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex mb-3 p-2"
                  style={{
                    borderRadius: 10,
                    background: "#fafafa",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}${item.image}`}
                    width={70}
                    height={70}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />

                  <div className="flex-grow-1 ms-2">
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: "18px",
                      }}
                    >
                      {item.name}
                    </div>

                    <div
                      style={{
                        color: "#ee4d2d",
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      {item.price.toLocaleString()}đ
                    </div>

                    <div className="d-flex align-items-center mt-2 gap-2">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #ddd",
                          borderRadius: 8,
                          overflow: "hidden",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, "dec")}
                          style={{
                            width: 32,
                            height: 32,
                            border: "none",
                            background: "#f9f9f9",
                          }}
                        >
                          <Minus size={14} />
                        </button>

                        <div style={{ width: 40, textAlign: "center" }}>
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => updateQuantity(item.id, "inc")}
                          style={{
                            width: 32,
                            height: 32,
                            border: "none",
                            background: "#f9f9f9",
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#999",
                      padding: 6,
                      borderRadius: 6,
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#ee4d2d";
                      e.currentTarget.style.background = "#ffece8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#999";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div
              style={{
                borderTop: "1px solid #eee",
                padding: 15,
                background: "#fff",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <span>Tổng tiền</span>
                <span style={{ color: "#ee4d2d", fontWeight: 700 }}>
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>

              <button
                className="w-100"
                style={{
                  background: "#ee4d2d",
                  color: "#fff",
                  border: "none",
                  padding: "10px 0",
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                Thanh toán
              </button>
            </div>
          )}
        </div>
      </div>

      <header className="sticky-top">
        <div
          style={{
            background: "#ee4d2d",
            color: "#fff",
            fontSize: 13,
            padding: "5px 0",
          }}
        >
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* LEFT */}
            <div style={{ fontWeight: 500 }}>🔥 Sale sốc mỗi ngày</div>

            {/* RIGHT */}
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-1">
                <Phone size={14} />
                <span>{info?.sdt}</span>
              </div>

              <div
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(255,255,255,0.5)",
                }}
              />

              <div className="d-flex align-items-center gap-1">
                <MapPin size={14} />
                <span>{info?.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm">
          <div className="container-fluid">
            <div className="row align-items-center py-3">
              {/* LOGO */}
              <div className="col-6 col-lg-2">
                <a href="/" className="text-decoration-none">
                  {info?.logo ? (
                    <img src={info.logo} alt="logo" style={{ height: 45 }} />
                  ) : (
                    <h4 className="fw-bold m-0 text-danger">{info?.name}</h4>
                  )}
                </a>
              </div>

              {/* SEARCH */}
              <div className="col-lg-6 d-none d-lg-block">
                <div
                  className="d-flex"
                  style={{
                    border: "2px solid #ee4d2d",
                    borderRadius: 50,
                    overflow: "hidden",
                  }}
                >
                  <input
                    className="form-control border-0 px-3"
                    placeholder="Tìm kính thời trang, gọng kính..."
                  />
                  <button
                    className="btn"
                    style={{
                      background: "#ee4d2d",
                      color: "#fff",
                      padding: "0 20px",
                    }}
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>

              <div className="col-6 col-lg-4 d-flex justify-content-end align-items-center gap-3">
                <button className="btn btn-light rounded-circle p-2">
                  <User size={18} />
                </button>

                <button
                  className="btn btn-light rounded-circle p-2 d-lg-none"
                  onClick={openSearch}
                >
                  <Search size={18} />
                </button>

                <button
                  className="btn position-relative"
                  onClick={openCart}
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "50%",
                    padding: 10,
                  }}
                >
                  <ShoppingCart size={18} />

                  <span
                    className="position-absolute top-0 start-100 translate-middle badge bg-danger"
                    style={{
                      fontWeight: 600,
                      color: "rgb(215, 0, 24)",
                      marginTop: "6px",
                      fontSize: "15px",
                    }}
                  >
                    {totalItems}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-top">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg">
              <button
                className="navbar-toggler"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
              >
                <Menu size={22} />
              </button>

              <div className="offcanvas offcanvas-start" id="offcanvasNavbar">
                <div className="offcanvas-header">
                  <h5 className="fw-bold">Danh mục</h5>
                  <button
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                  ></button>
                </div>

                <div className="offcanvas-body d-lg-none">
                  <Nav />
                </div>
              </div>

              <div className="d-none d-lg-block w-100">
                <Nav />
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
