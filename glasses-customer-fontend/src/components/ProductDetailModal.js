import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function ProductDetailModal({ show, handleClose, item, addToCart }) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  if (!item) return null;

  const images = [
    item.image,
    ...(item.images || []).map((img) => img.image_url),
  ];
  console.log("ProductDetailModal images:", images);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }
    alert("Đã thêm vào giỏ hàng thành công!");
    onclick = handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="xl">
      <div
        style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            cursor: "pointer",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        <Modal.Body style={{ padding: 0 }}>
          <div className="row g-0">
            <div className="col-md-5 p-4" style={{ background: "#fafafa" }}>
              <div
                style={{
                  width: "100%",
                  height: 400,
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}${images[activeImage]}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "0.4s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              <div className="d-flex gap-2 mt-3">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`${process.env.REACT_APP_API_URL}${img}`}
                    onClick={() => setActiveImage(index)}
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      border:
                        activeImage === index
                          ? "2px solid #ee4d2d"
                          : "1px solid #ddd",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="col-md-7 p-4">
              <h4 style={{ fontWeight: 600, marginBottom: 10 }}>{item.name}</h4>

              <div
                style={{
                  background: "#fafafa",
                  padding: "15px",
                  borderRadius: 8,
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    fontSize: 26,
                    color: "#ee4d2d",
                    fontWeight: 700,
                  }}
                >
                  {Number(item.price).toLocaleString()}đ
                </span>
              </div>

              <div style={{ marginBottom: 15 }}>
                <b>Mô tả:</b>
                <p style={{ color: "#555", fontSize: 14 }}>
                  {item.description || "Chưa có mô tả sản phẩm"}
                </p>
              </div>

              <div className="d-flex align-items-center gap-3 mb-4">
                <span>Số lượng:</span>

                <div className="d-flex">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  >
                    -
                  </button>

                  <input
                    value={qty}
                    readOnly
                    className="form-control text-center"
                    style={{ width: 60 }}
                  />

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQty(qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="d-flex gap-3">
                <button
                  onClick={handleAdd}
                  style={{
                    flex: 1,
                    border: "1px solid #ee4d2d",
                    color: "#ee4d2d",
                    background: "#fff",
                    padding: "12px",
                    borderRadius: 8,
                    fontWeight: 600,
                  }}
                >
                  <FaShoppingCart /> Thêm vào giỏ
                </button>

                <button
                  style={{
                    flex: 1,
                    background: "#ee4d2d",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: 8,
                    fontWeight: 600,
                  }}
                >
                  Mua ngay
                </button>
              </div>

              <div style={{ marginTop: 20, fontSize: 13, color: "#777" }}>
                ✔ Cam kết hàng chính hãng
                <br />
                ✔ Đổi trả trong 7 ngày
                <br />✔ Giao hàng nhanh toàn quốc
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default ProductDetailModal;
