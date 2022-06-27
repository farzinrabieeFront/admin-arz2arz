import { useEffect, useRef, useState } from "react";
import Styles from './CustomizedUploadIcon.module.scss';

import uploadPoster from "../../../assets/images/uploadPoster.png";
import uploadList from "../../../assets/images/uploadList.png";
import uploadVideo from "../../../assets/images/uploadVideo.png";
import { RiDeleteBin6Line } from "react-icons/all";
import { useTheme } from "../../../context";

const CustomizedUploadIcon = ({
    children,
    icon: Icon,
    className,
    name,
    data,
    imageSrc,
    disableDelete,
    handleSetFiles = () => false,
    handleDeleteFiles = () => false,
    errorMassage,
    image,
    ...rest
}) => {
    const [dataUrl, setDataUrl] = useState();
    const { theme } = useTheme()
    useEffect(() => {
        if (imageSrc) {
            setDataUrl(imageSrc)
        }
    }, [imageSrc])

    return (
        <>
            {data || dataUrl ?
                <div className={`${Styles.uploadImage} ${className || ""} ${Styles[theme]} ${Styles.uploaded}`}>
                    {
                        dataUrl ?
                            <img src={dataUrl} alt="" />
                            :
                            <img src={URL.createObjectURL(data)} alt="" />
                    }
                    {!disableDelete ?
                        <span
                            className={`${Styles.button} pointer text-white center-content `}
                            onClick={() => {
                                if (dataUrl) {
                                    setDataUrl()
                                } else {
                                    handleDeleteFiles(data)
                                }
                            }}
                        >
                            <RiDeleteBin6Line size="32" />

                        </span>
                        :
                        null
                    }

                </div>
                :
                <div className={`${Styles.uploadImage} ${className || ""} ${Styles[theme]} ${Styles.uploadMore} ${errorMassage ? Styles.uploadError : null}  pointer`}>
                    <input type="file" name={name} className={Styles.input}
                        onChange={handleSetFiles}
                    />
                    <div className="col-12 px-2 text-center align-items-center d-flex justify-content-center">
                        {Icon}

                    </div>

                </div>
            }
        </>
    );
};
export default CustomizedUploadIcon;

