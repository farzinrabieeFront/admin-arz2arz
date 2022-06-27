import { useEffect, useState } from "react";
import Styles from "./SideBarItem.module.scss";
import { Link, useLocation } from "react-router-dom";
import { BiChevronLeft, BiChevronDown } from "react-icons/all";
import { CSSTransition } from "react-transition-group";
export default function SideBarItem(
  { active,
    theme,
    title,
    url,
    icon: Icon,
    subItem = []
  }) {
  const { pathname } = useLocation();
  const [showSubItems, setShowSubItems] = useState(false);

  useEffect(() => {
    if(pathname.includes(url)){
      
    }else{
      setShowSubItems(false)
    }
    
  },[pathname])
  return (
    <li className={`${Styles.item} mb-2`}>
      <div
        className={`${Styles.sideMenu} ${Styles[theme]} ${pathname.includes(url) && Styles.active}
        ${subItem.length && showSubItems && pathname.includes(url) ? "mb-2" : ""}
        nav-link py-2 d-flex yekan-Medium is-size-6 col-12`}
        onClick={() => setShowSubItems((prev) => !prev)}
      >
        <span className={`${Styles.icons} bg-white p-2 center-content shadow border-radius-md`}>{Icon}</span>
        {
          subItem.length ?
            <span className="pointer d-flex align-items-center justify-content-between py-2 px-2 w-100">
              {title}
              <span className={`${showSubItems ? Styles.rotate : null}`}>
                <BiChevronLeft className="mr-2" size="20" />
              </span>
            </span>
            :
            <Link className="d-block py-2 px-2 w-100" to={url}>
              {title}
            </Link>
        }
      </div>

      {
        subItem.length ?
          <div className={`${Styles.subItem} ${showSubItems ? Styles.block : Styles.none}`}>
            {subItem.map((item) => (
              <div
                key={item.title}
                className={`${Styles.sideMenu}  
                ${Styles[theme]}
                ${pathname === item.url && Styles.active}
                yekan-Medium py-2 col-12 pl-0 pointer`}
              >
                <Link className="nav-link-sub d-block is-size-6  w-100" to={item.url}>
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          :
          null
      }
    </li>
  );
}









// <li
//       className={`${Styles.sideMenu} nav-link py-2 mb-2 yekan-Medium is-size-6 col-12
//       ${active ? Styles.active : ""} `}
//     >
//       {!subItem.length ? (
//         <div
//           className={`${Styles.itemSide}  w-100 d-flex pointer align-items-center`}
//         >
//           <span className={`${Styles.icons} p-2 center-content shadow border-radius-md`}>{Icon}</span>
//           <Link className="d-block py-2 px-2 w-100" to={url}>
//             {title}
//           </Link>
//         </div>
//       ) : (
//         <div className="w-100 d-flex flex-column">
//           <div className="d-flex pointer align-items-center">
//             <span className={`${Styles.icons} p-2 center-content shadow border-radius-md`}>{Icon}</span>
//             <div
//               className="d-flex justify-content-between py-2 px-2 w-100"
//               onClick={() => setShowSubItems((prev) => !prev)}
//             >
//               {title}
//               <span>
//                 {
//                   showSubItems ?
//                     <BiChevronDown className="mr-2" size="20" />
//                     :
//                     <BiChevronLeft className="mr-2" size="20" />
//                 }
//               </span>
//             </div>
//           </div>
//           <ul className={`${Styles.subItem} pt-2`} hidden={!showSubItems}>
//             {subItem.map((item) => (
//               <li
//                 key={item.title}
//                 className={`${Styles.sideMenu}  
//                 ${pathname === item.url && Styles.active}
//                 yekan-Medium py-2 col-12 pl-0 pointer`}
//               >
//                 <div
//                   className={`${Styles.itemSide} ${Styles[theme]} w-100 d-flex justify-content-start pointer align-items-center`}
//                 >
//                   <Link className="nav-link-sub d-block is-size-6 px-2 w-100" to={item.url}>
//                     {item.title}
//                   </Link>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </li>