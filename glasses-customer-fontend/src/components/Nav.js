import React, { useEffect, useState } from "react";
import NavMenu from "../models/navmenu";

const Nav = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const data = await NavMenu.getNavmenu();
        setInfo(data.customerData);
      } catch (e) {
        console.error(e);
      }
    };
    fetchInformation();
  }, []);

  return (
    <ul className="navbar-nav d-flex gap-3">

      {info.map((item, index) => (
        <li
          key={index}
          className={`nav-item ${item.navmenuitems ? "dropdown" : ""}`}
        >

          {/* ===== MAIN MENU ===== */}
          {!item.navmenuitems ? (
            <a
              href={item.path}
              className={`nav-link ${item.active ? "active" : ""}`}
            >
              {item.title}
            </a>
          ) : (
            <>
              <a
                href={item.path || "#"}
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {item.title}
              </a>

              {/* ===== SUB MENU ===== */}
              <ul className="dropdown-menu">

                {item.navmenuitems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.path}
                      className="dropdown-item"
                    >
                      {subItem.title}
                    </a>
                  </li>
                ))}

              </ul>
            </>
          )}
        </li>
      ))}

    </ul>
  );
};

export default Nav;