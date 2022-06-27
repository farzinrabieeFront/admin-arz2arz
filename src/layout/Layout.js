import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Styles from "./Layout.module.scss";
import { useSelector, useDispatch } from 'react-redux'
//components
import Sidebar from "./sidebar/Sidebar";
import { RiUser2Fill, CgProfile, BiLogOutCircle, IoIosMoon, IoIosSunny, RiMenu3Fill, IoNotifications } from "react-icons/all";
import { useAuth, useTheme, useTitle } from "../context";
import { Dropdown, DropdownButton } from "react-bootstrap";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import useWindowDimensions from "../components/windowDimension/useWindowDimensions ";

const LayoutPanel = ({ children }) => {
  let ref = useRef(null);
  const { signOut } = useAuth()
  const { theme, toggleTheme } = useTheme();
  const { title } = useTitle();
  const user = useSelector(state => state.user)
  const { height, width } = useWindowDimensions();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpenMobileMenu(false);
  }, [pathname]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenMobileMenu(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }, []);

  return (
    <>
      <div id="main" className={`${Styles.main} ${Styles[theme]} d-flex align-items-stretch`}>
        <div ref={ref} className={`${Styles.sidebar} ${openMobileMenu ? Styles.openMobileMenu : ""} p-2`} style={{ height: height }}>
          {/* <SimpleBar forceVisible="y" style={{ maxHeight: height }}> */}
          <Sidebar openMobileMenu={openMobileMenu} closeMobileMenu={setOpenMobileMenu} />
          {/* </SimpleBar> */}
        </div>
        <div id="content" className={`${Styles.content}`}>
          <div className={`${Styles.navbar} ${Styles[theme]} p-3 d-flex align-items-center justify-content-between`}>
            <div className="d-flex align-items-center">
              <span className={`${Styles.mobileBtn} ml-3`}
                onClick={() => setOpenMobileMenu(true)}>
                <RiMenu3Fill size="30" />
              </span>
              <div className={`${Styles.navigation} d-flex flex-column`}>
                <div className="mb-0">
                  <Link to="/profile" className="text-white yekan-Light is-size-7">داشبورد</Link>
                  <span className="text-white yekan-Light is-size-7 mx-2">/</span>
                  <span className="text-white yekan-Light is-size-7">{title}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex flex-row-reverse align-items-start">
              <span
                  className={`${Styles.notif} mr-3 text-white is-size-6 d-flex border-right pr-3 pointer`}
                >
                  <span className={`${Styles.count} FaNum is-size-8`}>2</span>
                  <IoNotifications size="20" />
                </span>
                <span
                  className="mr-3 text-white is-size-6 d-flex border-right pr-3 pointer"
                  onClick={toggleTheme}
                  title={`${theme} mood`}
                >
                  {theme === "light" ? <IoIosMoon size="20" /> : <IoIosSunny size="20" />}
                </span>
                
                <span className="d-flex flex-row-reverse is-size-6">
                  <RiUser2Fill size="20" className="mr-1" />
                  <DropdownButton
                    className="header-dropdown admin-dropdown pointer"
                    id="dropdown-item-button"
                    variant="light"
                    title={`${user.email?.slice(0, 4)}***${user.email?.slice(-10)}`}
                  >
                    <Dropdown.Item
                      as="button"
                      className="is-size-6 mb-0 yekan-Bold justify-content-start"
                    >
                      <Link to="/profile/">
                        <CgProfile className="ml-1" size="18" />
                        پروفایل کاربری
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      className="is-size-6 mb-0 yekan-Bold justify-content-start"
                      onClick={() => signOut()}
                    >
                      <BiLogOutCircle className="ml-1" size="18" />
                      خروج
                    </Dropdown.Item>
                  </DropdownButton>
                </span>
              </div>
            </div>
          </div>
          <div className="pl-3 pr-3 pr-xl-0 pb-4 pb-md-3">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPanel;
