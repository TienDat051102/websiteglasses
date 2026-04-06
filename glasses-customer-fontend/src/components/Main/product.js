import React, { useEffect, useState } from "react";
import MenuCategories from "../../models/menucategories";

const ProductTabs = () => {
  const [info, setInfo] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const data = await MenuCategories.getmenucateandmenuitems();
        setInfo(data);
        setFilteredMenuItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInformation();
  }, []);

  // 👉 giữ nguyên logic của bạn
  const handleCategoryClick = (categoryId) => {
    const filteredItems = info
      .map((category) => {
        if (category.id === categoryId) {
          return category;
        }
        return { ...category, menuitems: [] };
      })
      .filter((category) => category.menuitems.length > 0);

    setActiveCategoryId(categoryId);
    setFilteredMenuItems(filteredItems);
  };

  const handleCategoryClickAll = () => {
    setFilteredMenuItems(info);
    setActiveCategoryId(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="py-5">
      <div className="container-fluid">

        <div className="row">
          <div className="col-md-12">

            {/* HEADER */}
            <div className="d-flex justify-content-between border-bottom my-5">
              <h3>Trending Products</h3>

              <div className="nav nav-tabs">

                {/* ALL */}
                <button
                  className={`nav-link text-uppercase fs-6 ${
                    activeCategoryId === null ? "active" : ""
                  }`}
                  onClick={handleCategoryClickAll}
                >
                  All
                </button>

                {/* CATEGORY */}
                {info.map((category) => (
                  <button
                    key={category.id}
                    className={`nav-link text-uppercase fs-6 ${
                      activeCategoryId === category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </button>
                ))}

              </div>
            </div>

            {/* PRODUCTS */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

              {filteredMenuItems.map((category) =>
                Array.isArray(category.menuitems) &&
                category.menuitems.length > 0 ? (
                  category.menuitems.map((item) => (
                    <div className="col" key={item.id}>
                      <div className="product-item position-relative">

                        <span className="badge bg-success position-absolute m-3">
                          -10%
                        </span>

                        <figure>
                          <img
                            src={item.image}
                            className="tab-image img-fluid"
                            alt={item.name}
                          />
                        </figure>

                        <h6>{item.name}</h6>

                        <span className="price">{item.price}đ</span>

                        <div className="d-flex align-items-center justify-content-between mt-2">

                          <input
                            type="number"
                            defaultValue="1"
                            className="form-control w-50"
                          />

                          <button className="btn btn-dark">
                            Add
                          </button>

                        </div>

                      </div>
                    </div>
                  ))
                ) : null
              )}

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;