import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { GET_ALL_MENUCATEGORIES } from "../../../store/actions";
import { UPDATE_MENUITEMS } from "../../../store/actions/menuitems.action";

const mapStateToProps = (state) => {
  return {
    propMenuCateGories: state.menucategoriesReducer.menuCateGories || [],
    propMessage: state.menuitemsReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_ALL_MENUCATEGORIES: (payload) =>
      dispatch(GET_ALL_MENUCATEGORIES(payload)),
    UPDATE_MENUITEMS: (payload) => dispatch(UPDATE_MENUITEMS(payload)),
  };
};

class MenuItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data?.id || null,
      name: this.props.data?.name || "",
      description: this.props.data?.description || "",
      price: this.props.data?.price || "",
      import_price: this.props.data?.import_price || "",
      stock: this.props.data?.stock || 0,
      brand: this.props.data?.brand || "",
      type: this.props.data?.type || "",
      status: this.props.data?.status ?? true,
      category_id: this.props.data?.category_id || "",
      image: this.props.data?.image || null,
      is_featured: this.props.data?.is_featured || false,
    };
  }

  componentDidMount() {
    this.props.GET_ALL_MENUCATEGORIES();
  }

  handleInputChange = (e, field) => {
    let value = e.target.value;

    if (field === "status") value = value === "true";

    if (["price", "import_price", "stock", "category_id"].includes(field)) {
      value = value === "" ? "" : Number(value);
    }

    this.setState({ [field]: value });
  };

  handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  handleSave = async () => {
    const { name, price, category_id } = this.state;

    if (!name) return alert("Thiếu tên sản phẩm");
    if (!price) return alert("Thiếu giá");
    if (!category_id) return alert("Chọn danh mục");

    await this.props.UPDATE_MENUITEMS(this.state);

    if (this.props.propMessage === "Success") {
      alert(
        this.props.type === "create"
          ? "Thêm thành công"
          : "Cập nhật thành công"
      );
      this.props.onClose();
    } else {
      alert(this.props.propMessage);
      this.props.onClose();
    }
  };

  render() {
    const {
      name,
      description,
      price,
      import_price,
      stock,
      brand,
      type,
      status,
      category_id,
      image,
      is_featured,
    } = this.state;

    return (
      <>
        <Modal.Body>
          <div className="row">

            <div className="col-md-6">

              <div className="mb-3">
                <label>Tên</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => this.handleInputChange(e, "name")}
                />
              </div>

              <div className="mb-3">
                <label>Mô tả</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) =>
                    this.handleInputChange(e, "description")
                  }
                />
              </div>

              <div className="mb-3">
                <label>Giá bán</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) =>
                    this.handleInputChange(e, "price")
                  }
                />
              </div>

              <div className="mb-3">
                <label>Giá nhập</label>
                <input
                  type="number"
                  className="form-control"
                  value={import_price}
                  onChange={(e) =>
                    this.handleInputChange(e, "import_price")
                  }
                />
              </div>

              <div className="mb-3">
                <label>Tồn kho</label>
                <input
                  type="number"
                  className="form-control"
                  value={stock}
                  onChange={(e) =>
                    this.handleInputChange(e, "stock")
                  }
                />
              </div>

            </div>

            <div className="col-md-6">

              <div className="mb-3">
                <label>Danh mục</label>
                <select
                  className="form-control"
                  value={category_id}
                  onChange={(e) =>
                    this.handleInputChange(e, "category_id")
                  }
                >
                  <option value="">Chọn</option>
                  {this.props.propMenuCateGories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Thương hiệu</label>
                <input
                  className="form-control"
                  value={brand}
                  onChange={(e) =>
                    this.handleInputChange(e, "brand")
                  }
                />
              </div>

              <div className="mb-3">
                <label>Sản phẩm nổi bật</label>
                <select
                  className="form-control"
                  value={is_featured}
                  onChange={(e) =>
                    this.handleInputChange(e, "is_featured")
                  }
                >
                  <option value={true}>Có</option>
                  <option value={false}>Không</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Loại kính</label>
                <input
                  className="form-control"
                  value={type}
                  onChange={(e) =>
                    this.handleInputChange(e, "type")
                  }
                />
              </div>

              <div className="mb-3">
                <label>Trạng thái</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) =>
                    this.handleInputChange(e, "status")
                  }
                >
                  <option value={true}>Đang bán</option>
                  <option value={false}>Ngừng</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Ảnh</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={this.handleImageChange}
                />
                {image && (
                  <img
                    src={image}
                    alt=""
                    className="mt-2"
                    style={{ maxHeight: 120 }}
                  />
                )}
              </div>

            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemModal);