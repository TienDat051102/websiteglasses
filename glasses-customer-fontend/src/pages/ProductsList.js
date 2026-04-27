import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import MenuItems from "../models/menuitems";
import MenuCategories from "../models/menucategories";

const ITEMS_PER_PAGE = 15;

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;

      const payload = {
        skip,
        limit: ITEMS_PER_PAGE,
        search,
      };

      if (category !== "all") {
        payload.category = Number(category);
      }

      // 🔥 SORT ĐẨY LÊN BACKEND
      if (sort !== "default") {
        payload.order = sort;
      }

      console.log("payload gửi đi:", payload);

      const res = await MenuItems.getALlMenuItems(payload);

      setProducts(res.data || []);
      setTotal(res.count || 0);
    } catch (e) {
      console.error("Lỗi load sản phẩm:", e);
    } finally {
      setLoading(false);
    }
  };

  // LOAD CATEGORY
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await MenuCategories.getMenuCategoriesCustomer();
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Lỗi load category:", e);
      }
    };

    fetchCategories();
  }, []);

  // LOAD PRODUCT
  useEffect(() => {
    fetchProducts();
  }, [currentPage, search, category, sort]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (loading) return <p>Đang tải sản phẩm...</p>;

  return (
    <div className="shop-page container-fluid">
      <div className="breadcrumb">
        <span>Trang chủ</span>
        <span className="mx-2">›</span>
        <span className="active">Sản phẩm</span>
      </div>

      <h2 className="shop-title">Tất cả sản phẩm</h2>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-box">
            <h5>Tìm kiếm</h5>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(searchInput);
                  setCurrentPage(1);
                }
              }}
            />
          </div>

          {/* CATEGORY */}
          <div className="filter-box">
            <h5>Danh mục</h5>

            <div className="category-list">
              <div
                className={`category-item ${category === "all" ? "active" : ""}`}
                onClick={() => {
                  setCategory("all");
                  setCurrentPage(1);
                }}
              >
                Tất cả
              </div>

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`category-item ${
                    category === cat.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setCategory(Number(cat.id));
                    setCurrentPage(1);
                  }}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          </div>

          <div className="filter-box">
            <h5>Sắp xếp</h5>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="default">Mặc định</option>
              <option value="price_asc">Giá thấp → cao</option>
              <option value="price_desc">Giá cao → thấp</option>
            </select>
          </div>
        </aside>

        <main className="shop-content">
          <div className="product-grid">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          <div className="pagination mt-4 d-flex justify-content-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-outline-secondary"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn ${
                  currentPage === i + 1 ? "btn-dark" : "btn-outline-secondary"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline-secondary"
            >
              →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllProductsPage;
