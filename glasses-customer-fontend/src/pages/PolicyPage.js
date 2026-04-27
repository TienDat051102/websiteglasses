import React from "react";

const PolicyPage = () => {
  return (
    <div className="policy-page">
      {/* HERO */}
      <div className="policy-hero d-flex align-items-center justify-content-center text-center text-white">
        <div>
          <h1 className="fw-bold">Chính sách minh bạch</h1>
          <p className="mt-3">Cam kết rõ ràng – mua sắm an tâm tuyệt đối</p>
        </div>
      </div>

      <div className="container py-5">
        {/* INTRO */}
        <div className="text-center mb-5">
          <h2>Chúng tôi đặt trải nghiệm khách hàng lên hàng đầu</h2>
          <p className="text-muted mt-3">
            Mỗi sản phẩm kính không chỉ là một món hàng, mà còn là sự đầu tư cho
            thị lực và phong cách của bạn. Vì vậy, chúng tôi xây dựng chính sách
            rõ ràng – minh bạch – dễ hiểu.
          </p>
        </div>

        {/* RETURN */}
        <div className="policy-card mb-4 p-4 rounded-4 shadow-sm">
          <h4>🔄 Đổi trả dễ dàng trong 7 ngày</h4>
          <p className="text-muted">
            Nếu sản phẩm có lỗi từ nhà sản xuất, bạn hoàn toàn có thể đổi trả
            nhanh chóng.
          </p>

          <ul className="mt-3">
            <li>
              Áp dụng trong vòng <strong>7 ngày</strong> từ khi nhận hàng
            </li>
            <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng</li>
            <li>Còn đầy đủ hộp và phụ kiện</li>
          </ul>
        </div>

        {/* WARRANTY */}
        <div className="policy-card mb-4 p-4 rounded-4 shadow-sm">
          <h4>🛠 Bảo hành tận tâm lên đến 6 tháng</h4>
          <p className="text-muted">
            Chúng tôi luôn đồng hành cùng bạn trong suốt quá trình sử dụng sản
            phẩm.
          </p>

          <ul className="mt-3">
            <li>
              Bảo hành gọng kính trong <strong>6 tháng</strong>
            </li>
            <li>Hỗ trợ sửa chữa lỗi kỹ thuật miễn phí</li>
            <li>Hỗ trợ điều chỉnh kính phù hợp với khuôn mặt</li>
          </ul>
        </div>

        {/* PROCESS */}
        <div className="policy-card mb-4 p-4 rounded-4 shadow-sm">
          <h4>📦 Quy trình xử lý nhanh chóng</h4>

          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="step-box">
                <h5>1. Liên hệ</h5>
                <p>Gửi thông tin qua hotline hoặc email</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-box">
                <h5>2. Gửi sản phẩm</h5>
                <p>Đóng gói và gửi về cửa hàng</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="step-box">
                <h5>3. Xử lý</h5>
                <p>Kiểm tra & phản hồi trong 24-48h</p>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST */}
        <div className="policy-highlight text-center p-5 rounded-4">
          <h3>💎 Cam kết từ chúng tôi</h3>
          <p className="mt-3">
            100% sản phẩm chính hãng – tư vấn tận tâm – hỗ trợ trọn đời.
            <br />
            Mua kính không chỉ là mua sản phẩm, mà là đầu tư cho chính bạn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
