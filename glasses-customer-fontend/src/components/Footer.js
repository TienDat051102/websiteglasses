import React from "react";
import { useInformation } from "../context/InformationContext";

const Footer = () => {
  const { info, loading, error } = useInformation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <br />
      <footer className="py-5">
        <div className="container-fluid">
          <div className="row">
            {/* LOGO + INFO */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-menu">
                {/* ✅ LOGO từ API */}
                {info?.logo && (
                  <img src={info.logo} alt="logo" style={{ width: 120 }} />
                )}

                {/* ✅ THÔNG TIN */}
                <div className="mt-3">
                  <p>
                    <b>SĐT:</b> {info?.sdt}
                  </p>
                  <p>
                    <b>Email:</b> {info?.email}
                  </p>
                  <p>
                    <b>Địa chỉ:</b> {info?.location}
                  </p>
                  <p>
                    <b>Giờ mở cửa:</b> {info?.openhours}
                  </p>
                </div>

                <div className="social-links mt-3">
                  <ul className="d-flex list-unstyled gap-2">
                    <li>
                      <a href="#" className="btn btn-outline-light">
                        FB
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn btn-outline-light">
                        TW
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn btn-outline-light">
                        YT
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* MENU 1 */}
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5>Thông tin</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Giới thiệu</a>
                  </li>
                  <li>
                    <a href="#">Liên hệ</a>
                  </li>
                  <li>
                    <a href="#">Chính sách</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* MENU 2 */}
            <div className="col-md-2 col-sm-6">
              <div className="footer-menu">
                <h5>Hỗ trợ</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Đổi trả</a>
                  </li>
                  <li>
                    <a href="#">Vận chuyển</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* SUBSCRIBE */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-menu">
                <h5>Nhận tin</h5>
                <p>Nhận ưu đãi mới nhất từ shop kính</p>

                <form className="d-flex">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                  />
                  <button className="btn btn-dark">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTTOM */}
    </>
  );
};

export default Footer;
