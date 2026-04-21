import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { GET_ALL_MENUCATEGORIES } from "../../../store/actions";
import { UPDATE_MENUITEMS } from "../../../store/actions/menuitems.action";

const mapStateToProps = (state) => ({
  propMenuCateGories: state.menucategoriesReducer.menuCateGories || [],
});

const mapDispatchToProps = (dispatch) => ({
  GET_ALL_MENUCATEGORIES: () => dispatch(GET_ALL_MENUCATEGORIES()),
  UPDATE_MENUITEMS: (payload) => dispatch(UPDATE_MENUITEMS(payload)),
});

class MenuItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data?.id || null,
      name: props.data?.name || "",
      price: props.data?.price || "",
      stock: props.data?.stock || 0,
      brand: props.data?.brand || "",
      type: props.data?.type || "",
      category_id: props.data?.category_id || "",
      status: props.data?.status || false,

      short_description: props.data?.description || "",
      detail_description: props.data?.details?.[0]?.description || "",

      thumbnail: props.data?.image || null,

      images: props.data?.images || [],

      newImagesDetails: [],

      deletedImageIds: [],
    };
  }

  componentDidMount() {
    this.props.GET_ALL_MENUCATEGORIES();
  }

  handleInputChange = (e, field) => {
    let value = e.target.value;
    if (["price", "stock", "category_id"].includes(field)) {
      value = value === "" ? "" : Number(value);
    }
    this.setState({ [field]: value });
  };

  handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleMultiImages = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          }),
      ),
    ).then((imgs) => {
      this.setState((prev) => ({
        newImagesDetails: prev.newImagesDetails.concat(imgs),
      }));
    });

    e.target.value = null;
  };

  removeDetailImage = (img) => {
    if (typeof img === "string" && img.startsWith("data:")) {
      this.setState((prev) => ({
        newImagesDetails: prev.newImagesDetails.filter((i) => i !== img),
      }));
      return;
    }

    this.setState((prev) => ({
      deletedImageIds: [...prev.deletedImageIds, img.id],
      images: prev.images.filter((i) => i.id !== img.id),
    }));
  };

  handleSave = async () => {
    const payload = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      stock: this.state.stock,
      brand: this.state.brand,
      type: this.state.type,
      category_id: this.state.category_id,
      description: this.state.short_description,
      status: this.state.status,
      details: [
        {
          description: this.state.detail_description,
        },
      ],
      image: this.state.thumbnail,
      deletedImageIds: this.state.deletedImageIds,
      newImagesDetails: this.state.newImagesDetails,
    };

    await this.props.UPDATE_MENUITEMS(payload);
    alert("Lưu thành công");
    this.props.onClose();
  };

  getImageSrc = (img) => {
    if (!img) return "";

    if (typeof img === "string" && img.startsWith("data:")) {
      return img;
    }

    if (typeof img === "string") {
      return `${process.env.REACT_APP_API_URL}${img}`;
    }

    return `${process.env.REACT_APP_API_URL}${img.image_url}`;
  };

  render() {
    return (
      <Modal show onHide={this.props.onClose} size="xl">
        <Modal.Header closeButton>
          {this.props.type === "create" ? "Tạo Sản Phẩm" : "Chỉnh Sửa Sản Phẩm"}
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div
              className="col-md-6"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <div className="form-group">
                <label>Tên sản phẩm:</label>
                <input
                  className="form-control mb-2"
                  placeholder="Tên sản phẩm"
                  value={this.state.name}
                  onChange={(e) => this.handleInputChange(e, "name")}
                />
              </div>
              <div className="form-group">
                <label>Giá bán:</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Giá"
                  value={this.state.price}
                  onChange={(e) => this.handleInputChange(e, "price")}
                />
              </div>
              <div className="form-group">
                <label>Tồn kho:</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Tồn kho"
                  value={this.state.stock}
                  onChange={(e) => this.handleInputChange(e, "stock")}
                />
              </div>
              <div className="form-group">
                <label>Thương hiệu:</label>

                <input
                  className="form-control mb-2"
                  placeholder="Thương hiệu"
                  value={this.state.brand}
                  onChange={(e) => this.handleInputChange(e, "brand")}
                />
              </div>
              <div className="form-group">
                <label>Loại sản phẩm:</label>
                <input
                  className="form-control mb-2"
                  placeholder="Loại kính"
                  value={this.state.type}
                  onChange={(e) => this.handleInputChange(e, "type")}
                />
              </div>
              <div className="form-group">
                <label>Danh mục sản phẩm:</label>
                <select
                  className="form-control mb-3"
                  value={this.state.category_id}
                  onChange={(e) => this.handleInputChange(e, "category_id")}
                >
                  <option value="">Danh mục</option>
                  {this.props.propMenuCateGories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  className="form-control mb-3"
                  value={this.state.status}
                  onChange={(e) => this.handleInputChange(e, "status")}
                >
                  <option value="">Trạng thái</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mô tả ngắn:</label>
                <input
                  className="form-control"
                  value={this.state.short_description}
                  onChange={(e) =>
                    this.handleInputChange(e, "short_description")
                  }
                />
              </div>
            </div>

            <div
              className="col-md-6"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <div className="form-group">
                <label>Ảnh đại diện</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={this.handleThumbnail}
                />

                {this.state.thumbnail && (
                  <img
                    src={this.getImageSrc(this.state.thumbnail)}
                    alt=""
                    style={{ width: 120, marginTop: 10 }}
                  />
                )}
              </div>
              <div className="form-group">
                <label>Ảnh chi tiết</label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  onChange={this.handleMultiImages}
                />
              </div>

              <div className="d-flex flex-wrap gap-2 mt-2">
                {[...this.state.images, ...this.state.newImagesDetails].map(
                  (img, index) => (
                    <div
                      key={typeof img === "string" ? img : img.id}
                      style={{ position: "relative" }}
                    >
                      <img
                        src={this.getImageSrc(img)}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                        }}
                      />

                      <button
                        onClick={() => this.removeDetailImage(img)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "red",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: 20,
                          height: 20,
                        }}
                      >
                        x
                      </button>
                    </div>
                  ),
                )}
              </div>

              <div className="form-group mt-3">
                <label>Mô tả chi tiết sản phẩm:</label>
                <textarea
                  rows={5}
                  className="form-control"
                  value={this.state.detail_description}
                  onChange={(e) =>
                    this.handleInputChange(e, "detail_description")
                  }
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onClose}>Đóng</Button>
          <Button variant="primary" onClick={this.handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemModal);
