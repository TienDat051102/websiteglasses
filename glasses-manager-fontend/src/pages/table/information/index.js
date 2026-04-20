import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { GET_INFORMATION } from "../../../store/actions";
import InformationForm from "./informationForm";

const mapStateToProps = (state) => ({
  info: state.informationReducer?.data || null,
});

const mapDispatchToProps = (dispatch) => ({
  GET_INFORMATION: () => dispatch(GET_INFORMATION()),
});

class InformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  async componentDidMount() {
    await this.props.GET_INFORMATION();
  }

  handleOpenForm = () => {
    this.setState({ showForm: true });
  };

  handleCloseForm = async () => {
    this.setState({ showForm: false });
    await this.props.GET_INFORMATION();
  };

  render() {
    const { showForm } = this.state;
    const { info } = this.props;

    return (
      <>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Thông tin cửa hàng</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active">
                  Thông tin cửa hàng
                </li>
              </ol>
            </nav>
          </div>

          <section className="section">
            <div className="row">
              <div className="col-lg-12">

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Thông tin cửa hàng</h5>

                    {/* LOGO */}
                    <div className="mb-3">
                      <b>Logo:</b><br />
                      {info?.logo ? (
                        <img
                          src={info.logo}
                          alt="logo"
                          style={{ width: 150, borderRadius: 8 }}
                        />
                      ) : (
                        <span>Chưa có logo</span>
                      )}
                    </div>

                    <p><b>SĐT:</b> {info?.sdt || "Chưa có"}</p>
                    <p><b>Email:</b> {info?.email || "Chưa có"}</p>
                    <p><b>Địa chỉ:</b> {info?.location || "Chưa có"}</p>

                    <p>
                      <b>Giờ mở cửa:</b><br />
                      <span style={{ whiteSpace: "pre-line" }}>
                        {info?.openhours
                          ? info.openhours.replaceAll("</br>", "\n")
                          : "Chưa có"}
                      </span>
                    </p>

                    <Button onClick={this.handleOpenForm}>
                      Chỉnh sửa
                    </Button>

                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>

        {/* MODAL */}
        <Modal show={showForm} onHide={this.handleCloseForm}>
          <Modal.Header>
            <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InformationForm
              data={info}
              onClose={this.handleCloseForm}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformationPage);