import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const WhyUs = () => {
   const navigate = (path) => {
  window.location.href = path;
};

   const brands = [
    { img: "/images/product-thumb-11.jpg", name: "Amber Jar", title: "Honey best nectar you wish to get" },
    { img: "/images/product-thumb-12.jpg", name: "Amber Jar", title: "Organic honey premium" },
    { img: "/images/product-thumb-13.jpg", name: "Amber Jar", title: "Pure forest honey" },
    { img: "/images/product-thumb-14.jpg", name: "Amber Jar", title: "Natural bee honey" },
    { img: "/images/product-thumb-11.jpg", name: "Amber Jar", title: "Wild honey" },
    { img: "/images/product-thumb-12.jpg", name: "Amber Jar", title: "Healthy honey" },
  ];
  return (
    <section className="py-5 overflow-hidden">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">

              <h2 className="section-title">Newly Arrived Brands</h2>

              <div className="d-flex align-items-center">
                <span
                  className="btn-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/products")}
                >
                  View All →
                </span>

                <div className="swiper-buttons">
                  <button className="brand-prev btn btn-yellow">❮</button>
                  <button className="brand-next btn btn-yellow">❯</button>
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
              slidesPerView={3}
              navigation={{
                nextEl: ".brand-next",
                prevEl: ".brand-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {brands.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="card mb-3 p-3 rounded-4 shadow border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/products")}
                  >
                    <div className="row g-0">

                      <div className="col-md-4">
                        <img
                          src={item.img}
                          className="img-fluid rounded"
                          alt=""
                        />
                      </div>

                      <div className="col-md-8">
                        <div className="card-body py-0">
                          <p className="text-muted mb-0">{item.name}</p>
                          <h5 className="card-title">{item.title}</h5>
                        </div>
                      </div>

                    </div>
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

export default WhyUs;
