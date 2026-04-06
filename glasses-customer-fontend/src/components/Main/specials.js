import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../ProductCard";

const Specials = () => {
   const navigate = (path) => {
  window.location.href = path;
};

   const bestproducts = [
    { img: "/images/thumb-tomatoes.png", name: "Sunstar Juice", price: 18 },
    { img: "/images/thumb-tomatoketchup.png", name: "Tomato Ketchup", price: 20 },
    { img: "/images/thumb-bananas.png", name: "Fresh Banana", price: 15 },
    { img: "/images/thumb-bananas.png", name: "Organic Banana", price: 22 },
    { img: "/images/thumb-tomatoes.png", name: "Tomato Fresh", price: 19 },
  ];
  return (
     <section className="py-5 overflow-hidden">
      <div className="container-fluid">

        {/* HEADER */}
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between my-5">

              <h2 className="section-title">Best selling products</h2>

              <div className="d-flex align-items-center">
                <span
                  className="btn-link text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/products")}
                >
                  View All →
                </span>

                <div className="swiper-buttons">
                  <button className="product-prev btn btn-primary">❮</button>
                  <button className="product-next btn btn-primary">❯</button>
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
              slidesPerView={4}
              navigation={{
                nextEl: ".product-next",
                prevEl: ".product-prev",
              }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {bestproducts.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard item={item} navigate={navigate} />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>

      </div>
    </section>

  );
};

export default Specials;