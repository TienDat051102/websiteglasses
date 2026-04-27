import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      {/* HERO */}
      <div className="about-hero d-flex align-items-center">
        <div className="container text-white">
          <h1 className="fw-bold">Chúng tôi không chỉ bán kính</h1>
          <p className="mt-3 col-md-6">
            Chúng tôi giúp bạn nhìn rõ hơn, tự tin hơn và thể hiện phong cách
            riêng của mình.
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* STORY */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h2>Câu chuyện bắt đầu từ nhu cầu thực tế</h2>
            <p className="text-muted mt-3">
              Chúng tôi nhận ra rằng một chiếc kính không chỉ để nhìn rõ, mà còn
              là một phần của phong cách sống. Vì vậy, chúng tôi xây dựng cửa
              hàng này để mang đến những sản phẩm vừa chất lượng vừa thời trang.
            </p>

            <p className="text-muted">
              Từ những ngày đầu, chúng tôi luôn đặt khách hàng làm trung tâm —
              từ tư vấn, đo mắt cho đến trải nghiệm sử dụng lâu dài.
            </p>
          </div>

          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1577803645773-f96470509666"
              alt=""
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <h2 className="fw-bold">1000+</h2>
            <p className="text-muted">Khách hàng tin tưởng</p>
          </div>

          <div className="col-md-4">
            <h2 className="fw-bold">500+</h2>
            <p className="text-muted">Mẫu kính đa dạng</p>
          </div>

          <div className="col-md-4">
            <h2 className="fw-bold">5★</h2>
            <p className="text-muted">Đánh giá trung bình</p>
          </div>
        </div>

        {/* VALUES */}
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="value-card">
              <h5>🎯 Chất lượng</h5>
              <p>Chúng tôi chỉ chọn những sản phẩm tốt nhất</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="value-card">
              <h5>💬 Tận tâm</h5>
              <p>Tư vấn kỹ lưỡng, phù hợp từng khách hàng</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="value-card">
              <h5>💰 Giá hợp lý</h5>
              <p>Chất lượng cao với mức giá phù hợp</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta text-center p-5 rounded-4">
          <h3>Sẵn sàng tìm chiếc kính phù hợp với bạn?</h3>
          <p className="mt-3">
            Khám phá bộ sưu tập kính mới nhất của chúng tôi ngay hôm nay.
          </p>
          <button
            onClick={() => navigate(`/menuitems`)}
            className="btn btn-dark mt-3 px-4"
          >
            Xem sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
