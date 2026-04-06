import { useState } from "react";

function ProductCard({ item, navigate }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="product-item position-relative p-3 border rounded">

      <span className="badge bg-success position-absolute m-2">-15%</span>

      <span className="btn-wishlist" style={{ cursor: "pointer" }}>
        ❤️
      </span>

      <figure onClick={() => navigate("/product/1")} style={{ cursor: "pointer" }}>
        <img src={item.img} className="img-fluid" alt="" />
      </figure>

      <h6>{item.name}</h6>
      <span className="qty">1 Unit</span>
      <span className="rating">⭐ 4.5</span>

      <div className="fw-bold mb-2">${item.price}</div>

      <div className="d-flex align-items-center justify-content-between">

        <div className="input-group" style={{ width: "120px" }}>
          <button
            className="btn btn-danger"
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
            className="btn btn-success"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => console.log("add to cart")}
        >
          🛒
        </span>

      </div>
    </div>
  );
}

export default ProductCard;