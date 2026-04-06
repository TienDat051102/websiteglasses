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
      status: this.props.data?.status ?? true,
      category_id: this.props.data?.category_id || "",
      image: this.props.data?.image || null,
    };
  }

  handleInputChange = (e, field) => {
    const value =
      field === "status" ? e.target.value === "true" : e.target.value;
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
    await this.props.UPDATE_MENUITEMS(this.state);

    if (this.props.propMessage === "Success") {
      alert(
        this.props.type === "create"
          ? "Thêm sản phẩm thành công"
          : "Cập nhật sản phẩm thành công"
      );
      this.props.onClose();
    } else {
      alert(this.props.propMessage);
    }
  };

  async componentDidMount() {
    await this.props.GET_ALL_MENUCATEGORIES();
  }

  render() {
    const { name, description, price, status, category_id, image } =
      this.state;

    return (
      <>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label>Tên Sản Phẩm</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => this.handleInputChange(e, "name")}
              />
            </div>

            <div className="mb-3">
              <label>Mô Tả</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => this.handleInputChange(e, "description")}
              />
            </div>

            <div className="mb-3">
              <label>Giá</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => this.handleInputChange(e, "price")}
                min={0}
              />
            </div>

            <div className="mb-3">
              <label>Danh Mục</label>
              <select
                className="form-control"
                value={category_id}
                onChange={(e) =>
                  this.handleInputChange(e, "category_id")
                }
              >
                <option value="">Chọn danh mục</option>
                {this.props.propMenuCateGories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Trạng Thái</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => this.handleInputChange(e, "status")}
              >
                <option value={true}>Đang Bán</option>
                <option value={false}>Ngừng Bán</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Ảnh Sản Phẩm</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={this.handleImageChange}
              />
              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="img-fluid mt-3"
                />
              )}
            </div>

            <Button variant="primary" onClick={this.handleSave}>
              Lưu
            </Button>
          </form>
        </Modal.Body>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemModal);