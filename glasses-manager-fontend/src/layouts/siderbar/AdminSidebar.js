import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GET_NAVMENU_SIDEBAR } from "../../store/actions/navmenu.action";

const AdminSidebar = ({ navmenuSidebar, GET_NAVMENU_SIDEBAR }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role?.toLowerCase() || "";


  useEffect(() => {
    GET_NAVMENU_SIDEBAR();
  }, []);

  const roleAdmin = Array.isArray(navmenuSidebar)
    ? navmenuSidebar.filter((item) =>
        item.static?.toLowerCase().includes(role)
      )
    : [];

  console.log("navmenuSidebar:", navmenuSidebar);
  console.log("roleAdmin:", roleAdmin);

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav">
        {roleAdmin.length > 0 ? (
          roleAdmin.map((item) => (
            <li key={item.id} className="nav-item">
              <Link className="nav-link collapsed" to={item.path}>
                <i className={item.icon || "bi bi-grid"}></i>
                <span>{item.title}</span>
              </Link>
            </li>
          ))
        ) : (
          <li className="nav-item">
            <span>Không có menu</span>
          </li>
        )}
      </ul>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  navmenuSidebar: state.navmenuReducer?.navmenuSidebar || [],
});

const mapDispatchToProps = (dispatch) => ({
  GET_NAVMENU_SIDEBAR: () => dispatch(GET_NAVMENU_SIDEBAR()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSidebar);