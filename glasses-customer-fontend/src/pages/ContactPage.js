import React, { useState } from "react";
import { useInformation } from "../context/InformationContext";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { info } = useInformation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Gửi liên hệ thành công!");
    console.log(form);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero text-center text-white d-flex align-items-center justify-content-center">
        <div>
          <h1 className="fw-bold">Liên hệ với chúng tôi</h1>
          <p className="mt-2">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <div className="contact-card p-4 shadow-sm rounded-4 h-100">
              <h4 className="mb-3">Thông tin liên hệ</h4>

              <p>
                <Phone size={14} /> <strong>{info?.sdt}</strong>
              </p>
              <p>
                <Mail size={14} /> {info?.email}
              </p>
              <p>
                <MapPin size={14} /> {info?.location}
              </p>

              <hr />

              <h5>Giờ làm việc</h5>
              <p>
                <Clock size={14} /> {info?.openhours}
              </p>

              <iframe
                title="map"
                src="https://www.google.com/maps?q=321+Đại+Lộ+Bình+Dương,+Thủ+Dầu+Một&output=embed"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="col-md-7">
            <div className="contact-card p-4 shadow-sm rounded-4">
              <h4 className="mb-3">Gửi tin nhắn</h4>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Tên của bạn"
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="Nội dung"
                  rows="5"
                  required
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                <button className="btn btn-dark w-100">Gửi liên hệ</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
