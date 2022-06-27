import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context';
import Styles from './Tabs.module.scss'
function CustomizedTabs({ listStyles, styles, data = [], handleSetTitle = () => false, disabledTab, activeData }) {
    const [step, setStep] = useState(0);
    // const [active, setActive] = useState();
    let parent, movingTab, tab;
    const { theme } = useTheme()
    useEffect(() => {
        movingTab = document.getElementById('movingTab');
        parent = document.getElementById('parent');
        if (step) {
            tab = document.getElementById(`tab${step}`)
        } else {
            tab = document.getElementById(`tab0`)

        }
        let tabWidth = tab.offsetWidth;
        let tabHeight = tab.offsetHeight;
        let tabTop = tab.offsetTop;
        let tabLeft = tab.offsetLeft;

        movingTab.style.width = `${tabWidth}px`;
        movingTab.style.height = `${tabHeight}px`;
        movingTab.style.top = `${tabTop}px`;
        movingTab.style.left = `${tabLeft}px`;

    }, [step])

    useEffect(() => {
        handleSetTitle(data[0]);

    }, [])
    useEffect(() => {
        if (activeData) {
            data.map((item, index) => {
                if (item === activeData) {
                    setStep(index)
                }
            })
        }
    }, [activeData])

    const handleClickTab = (index, item) => {
        if (disabledTab !== item) {
            setStep(index)
            handleSetTitle(item)
        }
    }
    return (
        <div className={Styles.container} >
            <ul className={`${Styles.tabContainer} w-100 d-flex ${styles}`} id="parent">
                {data.map((item, index) => {
                    return (
                        <li key={index} id={`tab${index}`}
                            className={`${disabledTab === item ? "cursor-disable" : ""} pointer ${listStyles || ""}`}
                            onClick={() => handleClickTab(index, item)}
                        >
                            <span className="px-3 py-2">{item}</span>
                        </li>
                    )
                })}
                <li id="movingTab" className={`${Styles.movingTab} ${Styles[theme]} bg-white m-0`}></li>
            </ul>
        </div>
    )
}

export default CustomizedTabs
