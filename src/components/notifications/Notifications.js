import React, { useState } from 'react';
import { RiCloseLine, RiCheckboxCircleFill, RiInformationFill, RiErrorWarningFill, RiCloseCircleFill, BsCheck, BsCheckAll } from 'react-icons/all';
import Styles from './Notifications.module.scss';


const Notifications = ({ theme, type, title, body, className, close, read }) => {
    const [progressBar, setProgressBar] = useState(false)
    return (
        <div className={`${Styles.notifications} 
          ${Styles[type]}
          ${className}
          ${Styles[theme]}
          ${progressBar ? Styles.progressBar : ""}
          d-flex align-items-center justify-content-between p-3`}
            onClick={() => setProgressBar(true)}
        >
            <div className="d-flex align-items-center">
                <span className={Styles.icon}>
                    {type === "success" ?
                        <RiCheckboxCircleFill size="25" />
                        :
                        type === "warning" ?
                            <RiErrorWarningFill size="25" />
                            :
                            type === "error" ?
                                <RiCloseCircleFill size="25" />
                                :
                                <RiInformationFill size="25" />
                    }
                </span>
                <div className="d-flex flex-column pr-3">
                    <h3 className={`${Styles.title} mb-2 yekan-Bold`}>
                        <span className="is-size-6 text-gray-blue">{title}</span>
                        <span className="mr-2">
                            {read ?
                                <BsCheckAll size="20" />
                                :
                                <BsCheck size="20" className="text-gainsboro" />
                            }
                        </span>
                    </h3>
                    <p className="is-size-7 mb-0 text-gray-blue">{body}</p>
                </div>
            </div>
            <div className="text-gray-blue pointer pr-3" onClick={close}><RiCloseLine size="20" /></div>
            {/* <div className={Styles.progressbar}></div> */}
        </div>
    )
}

export default Notifications
