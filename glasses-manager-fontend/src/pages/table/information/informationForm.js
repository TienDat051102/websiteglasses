import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { UPDATE_INFORMATION } from "../../../store/actions";

class InformationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sdt: props.data?.sdt || "",
      logo: props.data?.logo || "",
      email: props.data?.email || "",
      location: props.data?.location || "",
      openhours: this.formatOpenHours(props.data?.openhours),
    };
  }

  // 🔥 convert </br> → xuống dòng
  formatOpenHours = (text) => {
    if (!text) return "";
    return text.replaceAll("</br>", "\n");
  };

  // 🔥 convert ngược khi save
  reverseOpenHours = (text) => {
    return text.replaceAll("\n", "</br>");
  };

  componentDidUpdate(prevProps) {
    // 🔥 chỉ update khi data thay đổi (tránh overwrite khi đang nhập)
    if (
      this.props.data &&
      this.props.data !== prevProps.data
    ) {
      this.setState({
        sdt: this.props.data.sdt || "",
        logo: this.props.data.logo || "",
        email: this.props.data.email || "",
        location: this.props.data.location || "",
        openhours: this.formatOpenHours(this.props.data.openhours),
      });
    }
  }

  handleChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  // 🔥 Upload logo base64 + validate
  handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Chỉ được upload ảnh");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh tối đa 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleSave = async () => {
    const { sdt, logo, email, location, openhours } = this.state;

    // 🔥 validate đầy đủ
    if (!sdt || !logo || !email || !location) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const payload = {
      menu: {
        sdt,
        logo,
        email,
        location,
        openhours: this.reverseOpenHours(openhours),
      },
    };

    await this.props.UPDATE_INFORMATION(payload);
    this.props.onClose();
  };

  render() {
    const { sdt, logo, email, location, openhours } = this.state;

    return (
      <>
        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            className="form-control"
            value={sdt}
            onChange={(e) => this.handleChange(e, "sdt")}
          />
        </div>

        <div className="mb-3">
          <label>Logo</label>
          <input
            type="file"
            className="form-control"
            onChange={this.handleUpload}
          />

          {logo && (
            <img
              src={logo}
              alt="preview"
              style={{
                width: 120,
                marginTop: 10,
                borderRadius: 8,
                border: "1px solid #ddd",
              }}
            />
          )}
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => this.handleChange(e, "email")}
          />
        </div>

        <div className="mb-3">
          <label>Địa chỉ</label>
          <input
            className="form-control"
            value={location}
            onChange={(e) => this.handleChange(e, "location")}
          />
        </div>

        <div className="mb-3">
          <label>Giờ mở cửa</label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="VD:
8:00 AM - 12:00 PM
13:00 PM - 23:00 PM"
            value={openhours}
            onChange={(e) => this.handleChange(e, "openhours")}
          />
        </div>

        <Button onClick={this.handleSave}>
          Lưu
        </Button>
      </>
    );
  }
}

export default connect(null, { UPDATE_INFORMATION })(InformationForm);