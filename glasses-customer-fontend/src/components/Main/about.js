import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const About = () => {
    const navigate = (path) => {
  window.location.href = path;
};
      const categories = [
    { img: "/images/icon-vegetables-broccoli.png", name: "Fruits & Veges" },
    { img: "/images/icon-bread-baguette.png", name: "Breads & Sweets" },
    { img: "/images/icon-soft-drinks-bottle.png", name: "Soft Drinks" },
    { img: "/images/icon-wine-glass-bottle.png", name: "Wine" },
    { img: "/images/icon-animal-products-drumsticks.png", name: "Meat" },
    { img: "/images/icon-bread-herb-flour.png", name: "Bakery" },
    { img: "/images/icon-vegetables-broccoli.png", name: "Veges" },
  ];
  return (
    <section className="py-5 overflow-hidden">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">

              <h2 className="section-title">Category</h2>

              <div className="d-flex align-items-center">
                <span
                  className="btn-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/products")}
                >
                  View All Categories →
                </span>

                <div className="swiper-buttons">
                  <button className="swiper-prev btn btn-yellow">❮</button>
                  <button className="swiper-next btn btn-yellow">❯</button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SWIPER */}
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
              {categories.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="nav-link category-item text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/products")}
                  >
                    <img src={item.img} alt="" className="img-fluid" />
                    <h3 className="category-title">{item.name}</h3>
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
