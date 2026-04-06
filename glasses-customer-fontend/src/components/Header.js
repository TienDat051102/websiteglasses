// src/components/Header.js
import React from "react";
import { useInformation } from "../context/InformationContext";
import Nav from "./Nav";

const Header = () => {
  const { info, loading, error } = useInformation();

  if (loading) return null;
  if (error) return <div>Error</div>;

  return (
    <>
      {/* ================= CART ================= */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasCart">
        <div className="offcanvas-header">
          <h5>Giỏ hàng</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-group mb-3">
            <li className="list-group-item text-center">
              Giỏ hàng trống
            </li>
          </ul>

          <button className="btn btn-primary w-100">
            Thanh toán
          </button>
        </div>
      </div>

      {/* ================= SEARCH OFFCANVAS ================= */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasSearch">
        <div className="offcanvas-header">
          <h5>Tìm kiếm</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <form className="d-flex">
            <input
              className="form-control"
              placeholder="Tìm sản phẩm..."
            />
            <button className="btn btn-dark">Tìm</button>
          </form>
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header>
        <div className="container-fluid">
          <div className="row py-3 border-bottom align-items-center">

            {/* LOGO */}
            <div className="col-6 col-lg-3">
              <a href="/" className="text-decoration-none">
                {info?.logo ? (
                  <img src={info.logo} alt="logo" style={{ maxHeight: "50px" }} />
                ) : (
                  <h4>{info?.name}</h4>
                )}
              </a>
            </div>

            {/* SEARCH BAR (DESKTOP) */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="bg-light p-2 rounded-4 d-flex">

                <input
                  type="text"
                  className="form-control border-0 bg-transparent"
                  placeholder="Tìm sản phẩm..."
                />

                <button className="btn btn-dark">
                  Search
                </button>

              </div>
            </div>

            {/* RIGHT */}
            <div className="col-6 col-lg-4 d-flex justify-content-end align-items-center gap-3">

              {/* PHONE */}
              <span className="text-muted d-none d-md-block">
                {info?.sdt}
              </span>

              {/* USER */}
              <button className="bg-light border-0 p-2 rounded-circle">
                <i className="bi bi-person"></i>
              </button>

              {/* SEARCH MOBILE */}
              <button
                className="bg-light border-0 p-2 rounded-circle d-lg-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
              >
                <i className="bi bi-search"></i>
              </button>

              {/* CART */}
              <button
                className="bg-light border-0 p-2 rounded-circle position-relative"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
              >
                <i className="bi bi-cart"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                  0
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* ================= MENU ================= */}
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg">

            <button
              className="navbar-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
              <div className="offcanvas-header">
                <h5>Menu</h5>
                <button className="btn-close" data-bs-dismiss="offcanvas"></button>
              </div>

              <div className="offcanvas-body">
                <Nav />
              </div>
            </div>

          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;