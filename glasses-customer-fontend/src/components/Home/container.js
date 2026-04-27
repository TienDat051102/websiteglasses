import React from "react";
import { useNavigate } from "react-router-dom";

const Container = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* 🔥 HERO BANNER */}
      <section
        className="py-3"
        style={{
          backgroundImage:
            "url('https://saigonplaza.com.vn/uploads/products/2018/12/kinhmatnamhanoibmw730.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="banner-blocks">
                {/* MAIN SLIDER */}
                <div className="banner-ad large bg-light block-1">
                  <div className="swiper main-swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories my-3">
                              Thời trang 2026
                            </div>
                            <h3 className="display-4">Kính Mắt Cao Cấp</h3>
                            <p>
                              Khám phá bộ sưu tập kính mắt thời trang mới nhất.
                            </p>
                            <a
                              onClick={() => navigate("/menuitems")}
                              className="btn btn-dark btn-lg mt-3"
                            >
                              Mua ngay
                            </a>
                          </div>

                          <div className="img-wrapper col-md-5">
                            <img
                              src="https://saigonplaza.com.vn/uploads/products/2018/09/matkinhuytintaisaigonguccigg5005.jpg"
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>

                      {/* SLIDE 2 */}
                      <div className="swiper-slide">
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories mb-3">
                              Ưu đãi đặc biệt
                            </div>
                            <h3 className="banner-title">Giảm giá đến 30%</h3>
                            <p>
                              Dành cho học sinh - sinh viên, đo mắt miễn phí.
                            </p>
                            <a href="#" className="btn btn-outline-dark">
                              Xem ngay
                            </a>
                          </div>

                          <div className="img-wrapper col-md-5">
                            <img
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>

                      {/* SLIDE 3 */}
                      <div className="swiper-slide">
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories mb-3">
                              Hàng chính hãng
                            </div>
                            <h3 className="banner-title">
                              Rayban - Gucci - Dior
                            </h3>
                            <p>Cam kết chính hãng 100%, bảo hành đầy đủ.</p>
                            <a href="#" className="btn btn-outline-dark">
                              Khám phá
                            </a>
                          </div>

                          <div className="img-wrapper col-md-5">
                            <img
                              src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="swiper-pagination"></div>
                  </div>
                </div>

                {/* BANNER NHỎ 1 */}
                <div
                  className="banner-ad bg-info-subtle block-2"
                  style={{
                    backgroundImage:
                      "url('https://bizweb.dktcdn.net/100/487/604/products/o1cn017tex7t2itxtycl7nn2212827-5d518a16-d7f8-4f1b-a49a-ae15afeafd54.jpg?v=1688739819667')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right bottom",
                    backgroundSize: "contain",
                  }}
                >
                  <div className="row banner-content p-5">
                    <div className="content-wrapper col-md-7">
                      <div className="categories mb-3">Sale 20%</div>
                      <h3 className="banner-title">Kính Râm Thời Trang</h3>
                      <a
                        onClick={() => navigate("/menuitems")}
                        className="nav-link"
                      >
                        Mua ngay →
                      </a>
                    </div>
                  </div>
                </div>

                {/* BANNER NHỎ 2 */}
                <div
                  className="banner-ad bg-danger-subtle block-3"
                  style={{
                    backgroundImage:
                      "url('https://kinhhaitrieu.com/wp-content/uploads/2024/04/gong-kinh-can-chinh-hang-banner.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right bottom",
                    backgroundSize: "contain",
                  }}
                >
                  <div className="row banner-content p-5">
                    <div className="content-wrapper col-md-7">
                      <div className="categories mb-3">Hot</div>
                      <h3 className="item-title">Gọng Kính Cao Cấp</h3>
                      <a href="#" className="nav-link">
                        Xem ngay →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 2 BANNER DƯỚI */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            {/* LEFT */}
            <div className="col-md-6">
              <div
                className="banner-ad bg-light mb-3"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1589571894960-20bbe2828d0a')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "contain",
                }}
              >
                <div className="banner-content p-5">
                  <div className="fs-3 fw-bold">Giảm 25%</div>
                  <h3>Kính Cận Cao Cấp</h3>
                  <p>Thiết kế hiện đại, phù hợp mọi khuôn mặt.</p>
                  <a
                    onClick={() => navigate("/menuitems")}
                    className="btn btn-dark"
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-md-6">
              <div
                className="banner-ad bg-light"
                style={{
                  backgroundImage:
                    "url('https://matkinhtitan.com/wp-content/uploads/2022/09/kinh-han-quoc-gia-mem-ban-chay-nhat-1.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right bottom",
                  backgroundSize: "contain",
                }}
              >
                <div className="banner-content p-5">
                  <div className="fs-3 fw-bold">Trending</div>
                  <h3>Kính Râm Hàn Quốc</h3>
                  <p>Phong cách trẻ trung, cá tính.</p>
                  <a href="#" className="btn btn-dark">
                    Khám phá
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Container;
