import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaDiceD6 } from "react-icons/fa";
import { ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const menus = {
    admin: [
      {
        name: "Booking",
        icon: <FaDiceD6 />,
        path: "/admin/bookings",
        // children: [
        //   { name: "Daftar Booking", path: "/admin/bookings" }
        // ],
      },
      {
        name: "Room",
        icon: <FaDiceD6 />,
        children: [
          { name: "Data Room", path: "/admin/rooms" },
          { name: "Tambah Room", path: "/admin/add-room" },
        ],
      },
    ],
    user: [
      {
        name: "Room",
        path: "/rooms",
        icon: <FaDiceD6 />,
        // children: [
        //   { name: "Daftar Booking", path: "/bookings" },
        //   { name: "Tambah Booking", path: "/add-booking" },
        // ],
      },
      {
        name: "Booking",
        path: "/bookings",
        icon: <FaDiceD6 />,
        children: [
          { name: "Daftar Booking", path: "/bookings" },
          { name: "Tambah Booking", path: "/add-booking" },
        ],
      },
    ],
  };

  const roleMenus = user ? menus[user.role] : [];

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <aside className="w-64 bg-base-100 border-r border-gray-300">
      <div className="flex items-center justify-center text-xl font-bold border-b border-gray-300 h-16">
        <NavLink to="/" end className="text-center">
          Booking App
        </NavLink>
      </div>
      <nav className="p-4 space-y-2">
        {roleMenus.map((menu) =>
          menu.children ? (
            <div key={menu.name}>
              <button
                onClick={() => toggleMenu(menu.name)}
                className="flex items-center justify-between w-full p-2 hover:bg-base-300 rounded cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{menu.icon}</span>
                  <span>{menu.name}</span>
                </div>
                {openMenu === menu.name ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
              {openMenu === menu.name && (
                <div className="ml-6 mt-1 space-y-1">
                  {menu.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `block p-2 rounded text-sm ${
                          isActive
                            ? "bg-primary text-white"
                            : "hover:bg-base-300"
                        }`
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={menu.path}
              to={menu.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <span className="text-lg">{menu.icon}</span>
              <span>{menu.name}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
