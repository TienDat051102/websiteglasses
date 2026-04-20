import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UPDATE_NAVMENU } from "../../../store/actions";

class NavMenuForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data?.id || null,
      title: props.data?.title || "",
      path: props.data?.path || "",
      static: props.data?.static || "customer",
      is_visible: props.data?.is_visible ?? true,
    };
  }

  handleChange = (e, field) => {
    const value =
      field === "is_visible" ? e.target.value === "true" : e.target.value;

    this.setState({ [field]: value });
  };

  handleSave = async () => {
   let payload = { ...this.state };
  if (!payload.id) {
    delete payload.id; 
  } else {
    payload.id = Number(payload.id);
  }
  await this.props.UPDATE_NAVMENU(payload);
  alert(this.props.data ? "Sửa thành công!" : "Thêm thành công!");
  this.props.onClose();
  };

  render() {
    const { title, path, static: type, is_visible } = this.state;

    return (
      <>
        <div className="mb-3">
          <label>Tiêu đề</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => this.handleChange(e, "title")}
          />
        </div>

        <div className="mb-3">
          <label>Path</label>
          <input
            className="form-control"
            value={path}
            onChange={(e) => this.handleChange(e, "path")}
          />
        </div>

        <div className="mb-3">
          <label>Loại</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => this.handleChange(e, "static")}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Hiển thị</label>
          <select
            className="form-control"
            value={is_visible.toString()}
            onChange={(e) => this.handleChange(e, "is_visible")}
          >
            <option value="true">Hiển thị</option>
            <option value="false">Ẩn</option>
          </select>
        </div>

        <Button onClick={this.handleSave}>Lưu</Button>
      </>
    );
  }
}

export default connect(null, { UPDATE_NAVMENU })(NavMenuForm);