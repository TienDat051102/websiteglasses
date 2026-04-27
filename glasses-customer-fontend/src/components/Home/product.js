import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { useCart } from "../../context/CartContext";
import MenuItems from "../../models/menuitems";

const ProductTabs = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const navigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MenuItems.getmenuitemsfeatured();
        const safeData = Array.isArray(data) ? data : [];
        console.log("Fetched products:", safeData);
        setProducts(safeData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between border-bottom my-5">
              <h3>Sản phẩm nổi bật</h3>
            </div>
          </div>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {products.map((item) => (
            <div className="col mb-4" key={item.id}>
              <ProductCard
                item={{
                  ...item,
                  img: item.image,
                }}
                navigate={navigate}
                addToCart={() => addToCart(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
