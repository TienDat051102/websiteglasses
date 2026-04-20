import React from "react";
import { useInformation } from "../context/InformationContext";
import { useCart } from "../context/CartContext";
import Nav from "./Nav";
import Offcanvas from "bootstrap/js/dist/offcanvas";

import {
  User,
  Search,
  ShoppingCart,
  Menu,
} from "lucide-react";

const Header = () => {
  const { info, loading, error } = useInformation();

  const {
    cart,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
  } = useCart();

  const openCart = () => {
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
      {/* ================= CART ================= */}
      <div className="offcanvas offcanvas-end" id="offcanvasCart">
        <div className="offcanvas-header">
          <h5 className="fw-bold">Giỏ hàng</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p className="text-muted text-center">Giỏ hàng trống</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center mb-3 border-bottom pb-2"
                >
                  <img
                    src={item.image}
                    alt=""
                    width={60}
                    height={60}
                    className="me-2"
                  />

                  <div className="flex-grow-1">
                    <div className="fw-bold">{item.name}</div>
                    <div style={{ fontWeight: 600, color: "rgb(215, 0, 24)", marginTop: "6px", fontSize: "15px" }}>
                      {item.price.toLocaleString()} VND
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-1">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, "dec")}
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, "inc")}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    x
                  </button>
                </div>
              ))}

              <div className="fw-bold text-end">
                Tổng: {totalPrice.toLocaleString()} VND
              </div>

              <button className="btn btn-danger w-100 mt-3">
                Thanh toán
              </button>
            </>
          )}
        </div>
      </div>

      <div className="offcanvas offcanvas-end" id="offcanvasSearch">
        <div className="offcanvas-header">
          <h5 className="fw-bold">Tìm kiếm</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <div className="d-flex gap-2">
            <input
              className="form-control"
              placeholder="Tìm kính, gọng..."
            />
            <button className="btn btn-dark">Tìm</button>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          <div className="row align-items-center py-3">

            {/* LOGO */}
            <div className="col-6 col-lg-3">
              <a href="/" className="text-decoration-none">
                {info?.logo ? (
                  <img src={info.logo} alt="logo" style={{ height: 45 }} />
                ) : (
                  <h4 className="fw-bold m-0">{info?.name}</h4>
                )}
              </a>
            </div>

  
            <div className="col-lg-5 d-none d-lg-block">
              <div className="d-flex border rounded-pill overflow-hidden">
                <input
                  className="form-control border-0 px-3"
                  placeholder="Tìm sản phẩm..."
                />
                <button className="btn btn-danger px-4">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="col-6 col-lg-4 d-flex justify-content-end align-items-center gap-3">

              <span className="text-muted small d-none d-md-block">
                📞 {info?.sdt}
              </span>

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
                className="btn btn-light rounded-circle p-2 position-relative"
                onClick={openCart}
              >
                <ShoppingCart size={18} />

                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger" style={{ fontWeight: 600, color: "rgb(215, 0, 24)", marginTop: "6px", fontSize: "15px" }}>
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        </div>


        <div className="border-top">
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
                  <h5 className="fw-bold">Menu</h5>
                  <button className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body">
                  <Nav />
                </div>
              </div>

            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;