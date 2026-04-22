import React from "react";
import { useInformation } from "../context/InformationContext";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const { info } = useInformation();

  return (
    <footer style={{ background: "#f8fafc" }}>
      <div className="container-fluid py-5">
        <div className="row gy-4">
          {/* LOGO + INFO */}
          <div className="col-lg-3 col-md-6">
            {info?.logo && (
              <img src={info.logo} alt="logo" style={{ width: 130 }} />
            )}

            <div className="mt-3 footer-info">
              <p>
                <Phone size={14} /> {info?.sdt}
              </p>
              <p>
                <Mail size={14} /> {info?.email}
              </p>
              <p>
                <MapPin size={14} /> {info?.location}
              </p>
              <p>
                <Clock size={14} /> {info?.openhours}
              </p>
            </div>

            {/* SOCIAL */}
            <div className="d-flex gap-2 mt-3">
              <a className="social-btn fb">
                <FaFacebookF />
              </a>
              <a className="social-btn yt">
                <FaYoutube />
              </a>
              <a className="social-btn ig">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* MENU */}
          <div className="col-md-2 col-6">
            <h6 className="footer-title">Thông tin</h6>
            <ul className="footer-link">
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

          <div className="col-md-2 col-6">
            <h6 className="footer-title">Hỗ trợ</h6>
            <ul className="footer-link">
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

          {/* SUBSCRIBE */}
          <div className="col-lg-3 col-md-6">
            <h6 className="footer-title">Nhận ưu đãi</h6>
            <p className="footer-desc">Đăng ký để nhận khuyến mãi mới nhất</p>

            <div className="d-flex mt-2">
              <input
                className="form-control footer-input"
                placeholder="Nhập email..."
              />
              <button className="footer-btn">Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
