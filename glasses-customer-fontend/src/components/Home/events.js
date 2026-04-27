import React from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="py-5">
        <div className="container-fluid">
          <div
            className="py-5 my-5 rounded-4"
            style={{
              background: "linear-gradient(135deg, #f8f9fa, #eef2f7)",
            }}
          >
            <div className="container my-5">
              <div className="row align-items-center">
                <div className="col-md-6 p-4">
                  <h2 className="fw-bold">
                    Nhận <span className="text-danger">Giảm 25%</span> đơn đầu
                    tiên
                  </h2>
                  <p className="text-muted">
                    Đăng ký để nhận ưu đãi và cập nhật mẫu kính mới nhất.
                  </p>
                </div>

                <div className="col-md-6 p-4">
                  <form className="bg-white p-4 rounded-4 shadow-sm">
                    <input
                      className="form-control mb-3"
                      placeholder="Tên của bạn"
                    />
                    <input className="form-control mb-3" placeholder="Email" />
                    <button className="btn btn-danger w-100">
                      Nhận ưu đãi
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Blog kính mắt</h3>
            <span className="text-primary" style={{ cursor: "pointer" }}>
              Xem tất cả →
            </span>
          </div>

          <div className="row g-4">
            {[
              {
                img: "https://bazaarvietnam.vn/wp-content/uploads/2021/02/chon-kinh-can-phu-hop-voi-khuon-mat-nu-2.jpg",
                title: "Chọn kính theo khuôn mặt",
                desc: "Giúp bạn đẹp hơn và tự tin hơn.",
              },
              {
                img: "https://hatoeyewear.com/wp-content/uploads/2026/04/seeson-the-athletes-kinh-phong-cach-the-thao-2026-1.jpg-1.jpg",
                title: "Xu hướng kính 2026",
                desc: "Những mẫu hot nhất hiện nay.",
              },
              {
                img: "https://cdn.tgdd.vn/Files/2019/08/12/1186907/huong-dan-cach-bao-quan-mat-kinh-co-gong-bang-go-5.jpg",
                title: "Bảo quản kính đúng cách",
                desc: "Giữ kính luôn như mới.",
              },
            ].map((blog, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: 16, overflow: "hidden" }}
                >
                  <img
                    src={blog.img}
                    style={{ height: 220, objectFit: "cover" }}
                    alt=""
                  />

                  <div className="card-body">
                    <h6 className="fw-bold">{blog.title}</h6>
                    <p className="text-muted small">{blog.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 CTA APP */}
      <section className="py-5">
        <div className="container-fluid">
          <div
            className="rounded-4 p-5"
            style={{
              background: "linear-gradient(135deg, #ffffff, #f1f3f6)",
            }}
          >
            <div className="row align-items-center">
              <div className="col-md-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a"
                  className="img-fluid"
                  style={{ maxHeight: 250 }}
                  alt=""
                />
              </div>

              <div className="col-md-8">
                <h3 className="fw-bold">
                  Mua kính nhanh hơn với website của chúng tôi
                </h3>
                <p className="text-muted">
                  Trải nghiệm mua sắm nhanh chóng, tiện lợi và hiện đại.
                </p>

                <button
                  onClick={() => navigate("/menuitems")}
                  className="btn btn-dark mt-2"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container-fluid">
          <h4 className="fw-bold mb-3">Mọi người đang tìm</h4>

          {[
            "Kính cận",
            "Kính râm",
            "Gọng titan",
            "Kính chống ánh sáng xanh",
            "Lens",
          ].map((item, i) => (
            <button
              key={i}
              className="btn btn-light border me-2 mb-2 rounded-pill"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* 🔥 FEATURES */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row text-center g-4">
            {[
              { title: "Giao nhanh", desc: "2-3 ngày toàn quốc" },
              { title: "Thanh toán", desc: "An toàn 100%" },
              { title: "Chính hãng", desc: "Cam kết chất lượng" },
              { title: "Ưu đãi", desc: "Deal mỗi ngày" },
            ].map((item, i) => (
              <div className="col-md-3" key={i}>
                <div className="p-4 border rounded-4 h-100 shadow-sm">
                  <h6 className="fw-bold">{item.title}</h6>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
