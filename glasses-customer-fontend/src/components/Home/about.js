import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MenuCategories from "../../models/menucategories";

const About = () => {
  const [menucategories, setMenucategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MenuCategories.getMenuCategoriesCustomer();
        const safeData = Array.isArray(data) ? data : [];
        setMenucategories(safeData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-5 overflow-hidden">
      <div className="container-fluid">
        {/* HEADER */}
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">
              <h2 className="section-title">Bộ Sưu Tập Kính Mắt</h2>

              <div className="d-flex align-items-center">
                <span
                  className="btn-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/products")}
                >
                  Xem tất cả →
                </span>

                <div className="swiper-buttons">
                  <button className="swiper-prev btn btn-dark">❮</button>
                  <button className="swiper-next btn btn-dark">❯</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={5}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {menucategories.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="nav-link category-item text-center"
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API_URL}${item.icon}`}
                      alt={item.name}
                      className="img-fluid"
                      style={{ height: 80, objectFit: "contain" }}
                    />
                    <h3 className="category-title mt-2">{item.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
