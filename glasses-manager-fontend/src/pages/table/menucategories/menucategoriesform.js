import React, { Component } from "react";
import { Button } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { UPDATE_MENUCATEGORIES } from "../../../store/actions";

const mapStateToProps = (state) => {
  return {
    propMessage: state.menucategoriesReducer.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_MENUCATEGORIES: (payload) =>
      dispatch(UPDATE_MENUCATEGORIES(payload)),
  };
};
class MenuCategoriesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data?.name || "",
      icon: this.props.data?.icon || "",
      status: this.props.data?.status || false,
    };
  }

 handleInputChange = (e, field) => {
    let value = e.target.value;

    if (field === "status") value = value === "true";

    if (["status"].includes(field)) {
      value = value === "" ? "" : Number(value);
    }

    this.setState({ [field]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, icon, status } = this.state;
    const { type } = this.props;
    if (type === "create") {
      const payload = {
        name: name,
        icon: icon,
        status: status,
      };
      await this.props.UPDATE_MENUCATEGORIES(payload);
    } else {
      const payload = {
        id: this.props.data.id,
        name: name,
        icon: icon,
        status: status,
      };
      await this.props.UPDATE_MENUCATEGORIES(payload);
    }
    this.props.onClose();
  };
    handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ icon: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    const { name, icon, status } = this.state;
    const { data, type, onClose } = this.props;
    return (
      <div className="overlay">
        <div className="form-container">
          <form>
            <div className="form-group">
              <label>Tên danh mục:</label>
              <input
  
                value={name}
                onChange={(e) => this.handleInputChange(e, "name")}
                className="form-control"
                placeholder="Nhập tên danh mục"
              />
            </div>
            <div className="form-group">
              <label>Biểu tượng:</label>
              <input
                  type="file"
                  className="form-control"
                  onChange={this.handleImageChange}
                />
                {icon && (
                  <img
                    src={icon}
                    alt=""
                    className="mt-2"
                    style={{ maxHeight: 120 }}
                  />
                )}
            </div>
            <div className="form-group">
              <label>Trạng Thái:</label>
              <select
                value={status}
                onChange={(e) => this.handleInputChange(e, "status")}
                className="form-control"
              >
                  <option value={true}>Hoạt động</option>
                  <option value={false}>Không hoạt động</option>
              </select>
            </div>


          
            <br />
            <div className="button-group">
              <Button type="submit" color="success" onClick={this.handleSubmit}>
                {this.props.data ? "Lưu" : "Thêm"}
              </Button>
              <Button
                style={{ marginLeft: "15px" }}
                type="button"
                color="danger"
                onClick={onClose}
              >
                Hủy
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategoriesForm);
