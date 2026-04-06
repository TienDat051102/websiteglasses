import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable from "../../../components/datatable";
import { connect } from "react-redux";
import { GET_NAVMENU, DELETE_NAVMENU } from "../../../store/actions";
import NavMenuForm from "./navmenuform";

const mapStateToProps = (state) => {
  return {
    propNavMenu: state.navmenuReducer.navmenu,
    propNavMenuCount: state.navmenuReducer.navmenuCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GET_NAVMENU: (payload) => dispatch(GET_NAVMENU(payload)),
    DELETE_NAVMENU: (id) => dispatch(DELETE_NAVMENU(id)),
  };
};

const columns = [
  { header: "Tiêu đề", accessor: "title" },
  { header: "Đường dẫn", accessor: "path" },
  { header: "Loại", accessor: "static" },
  { header: "Hiển thị", accessor: "is_visible" },
];

class NavMenu extends Component {
  state = {
    data: [],
    pageSize: 5,
    currentPage: 0,
    totalRec: 0,
    showForm: false,
    formType: null,
    selectedItem: null,
  };

  initData = async () => {
    let { currentPage, pageSize } = this.state;
    let skip = currentPage * pageSize;

    await this.props.GET_NAVMENU({skip: skip, limit: pageSize });

    const edited = (this.props.propNavMenu || []).map((item) => ({
      ...item,
      is_visible: item.is_visible ? "Hiển thị" : "Ẩn",
    }));
    console.log("test so luong", this.props.propNavMenuCount);

    this.setState({
      data: edited,
      totalRec: this.props.propNavMenuCount,
    });
  };

  async componentDidMount() {
    await this.initData();
  }

handlePageClick = async(selectedPage)=>{
    let {pageSize} = this.state;
    let skip = selectedPage * pageSize;
    await this.props.GET_NAVMENU({skip: skip,limit: pageSize});
    const editedData = this.props.propNavMenu.map(item => {
      return {
        ...item,
        valid_from: new Date(item.valid_from).toLocaleDateString(), 
        valid_to: new Date(item.valid_to).toLocaleDateString(),     
        is_active: item.is_active ? 'Hoạt Động' : 'Không Hoạt Động',
      };
    });
    this.setState({
      data: editedData,
      totalRec: this.props.propNavMenuCount,
    })
  }

  handleActionClick = (action, row) => {
    if (action === "delete") {
      if (window.confirm("Xóa menu này?")) {
        this.props.DELETE_NAVMENU({ id: row.id });
        this.initData();
      }
    } else if (action === "edit") {
      this.setState({ showForm: true, formType: "edit", selectedItem: row });
    } else {
      this.setState({ showForm: true, formType: "create", selectedItem: null });
    }
  };

  handleCloseForm = () => {
    this.setState({ showForm: false });
    this.initData();
  };

  render() {
    let { showForm, formType, selectedItem } = this.state;

    return (
      <>
         <main id="main" className="main">
          <div className="pagetitle">
            <h1>Quản Lý Menu</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active">Quản Lý Menu</li>
              </ol>
            </nav>
          </div>
          <section class="section">
      <div class="row">
        <div class="col-lg-12">
       <div class="card">
            <div class="card-body">
              <h5 class="card-title">Quản lý Thanh công cụ</h5>
              <Button onClick={()=>this.handleActionClick()}>Tạo</Button>

          <DataTable
            columns={columns}
            data={this.state.data}
            count={this.state.totalRec}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onActionClick={this.handleActionClick}
            onHandlePageClick={this.handlePageClick}
          />
                     </div>
          </div>

        </div>
      </div>
    </section>
        </main>

        <Modal show={showForm} onHide={this.handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>
              {formType === "create" ? "Tạo Menu" : "Sửa Menu"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <NavMenuForm
              type={formType}
              data={selectedItem}
              onClose={this.handleCloseForm}
            />
          </Modal.Body>
        </Modal>
        
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);