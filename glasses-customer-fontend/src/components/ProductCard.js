import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaEye,
} from "react-icons/fa";
import ProductDetailModal from "./ProductDetailModal";

function ProductCard({ item, navigate }) {
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  const rating = 4.5;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= rating) {
        return <FaStar key={i} color="#f59e0b" />;
      } else if (i + 0.5 <= rating) {
        return <FaStarHalfAlt key={i} color="#f59e0b" />;
      } else {
        return <FaRegStar key={i} color="#ccc" />;
      }
    });
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }
    alert(`Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="product-item card h-100 border-0 shadow-sm position-relative">
        <span className="badge bg-danger position-absolute m-2">-15%</span>

        <div
          onClick={() => setShowModal(true)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#fff",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#59b67c";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#000";
          }}
        >
          <FaEye size={14} />
        </div>

        <div
          onClick={() => navigate(`/product/${item.id}`)}
          style={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            cursor: "pointer",
          }}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}${item.image}`}
            alt={item.name}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="card-body text-center">
          <h6
            style={{
              minHeight: 40,
              fontSize: 14,
              fontWeight: 500,
              color: "#222",
              marginBottom: 6,
            }}
          >
            {item.name}
          </h6>

          <div style={{ fontSize: 12, color: "#888" }}>1 sản phẩm</div>

          <div className="rating-box">
            <div className="stars">{renderStars(rating)}</div>
            <span className="rating-number">({rating})</span>
          </div>

          <div
            style={{
              fontWeight: 600,
              color: "#d70018",
              marginTop: 6,
              fontSize: 15,
            }}
          >
            {Number(item.price).toLocaleString()}đ
          </div>
        </div>

        {/* ACTION */}
        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
          <div className="input-group" style={{ width: "110px" }}>
            <button
              className="btn btn-outline-danger"
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
              -
            </button>

            <input
              type="text"
              className="form-control text-center"
              value={qty}
              readOnly
            />

            <button
              className="btn btn-outline-success"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              border: "1px solid #ddd",
              background: "#fff",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#000";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#000";
            }}
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
      <ProductDetailModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        item={item}
        addToCart={addToCart}
      />
    </>
  );
}

export default ProductCard;
