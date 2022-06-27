import { useEffect, useRef, useState } from "react";
import Styles from './FileButton.module.scss';

import uploadPoster from "../../../assets/images/uploadPoster.png";
import uploadList from "../../../assets/images/uploadList.png";
import uploadVideo from "../../../assets/images/uploadVideo.png";
import { RiDeleteBin6Line } from "react-icons/all";
import { useTheme } from "../../../context";

const CustomizedFileButton = ({
  children,
  iconSrc,
  title,
  poster,
  video,
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
  const {theme} = useTheme()
  useEffect(() => {
    if (imageSrc) {
      setDataUrl(imageSrc)
    }
  }, [imageSrc])
  useEffect(() => {
    // console.log(dataUrl);
    // console.log(imageSrc);
  }, [dataUrl])
  return (
    <>
      {data || dataUrl ?
        <div className={`${Styles.uploadImage} ${Styles[theme]} ${Styles.uploaded}`}>
          {
            dataUrl ?
              <img src={dataUrl} alt="" />
              :
              <img src={URL.createObjectURL(data)} alt="" />
          }
          {!disableDelete ?
            <span
              className={`${Styles.button} pointer bg-lightRed rounded-pill px-2 py-1 is-size-6 text-white`}
              onClick={() => {
                if (dataUrl) {
                  setDataUrl()
                } else {
                  handleDeleteFiles(data)
                }
              }}
            >
              <RiDeleteBin6Line className="ml-1" />
              <span>حذف</span>
            </span>
            :
            null
          }
          <span className={`${Styles.label} text-blue-medium is-size-5 yekan-ExtraBold `}>
            {title}
          </span>
        </div>
        :
        <div className={`${Styles.uploadImage} ${Styles[theme]} ${Styles.uploadMore} ${errorMassage ? Styles.uploadError : null}  pointer`}>
          <input type="file" name={name} className={Styles.input}
            onChange={handleSetFiles}
          />
          <div className="col-12 px-2 text-center align-items-center d-flex justify-content-center">
            <img src={iconSrc} alt="" />

          </div>
          <div className="col-12 px-2 mt-2">
            <p className={`${errorMassage ? "text-danger " : "text-blue-medium "} is-size-5 yekan-ExtraBold mb-0 text-center`}>
              {
                errorMassage ?
                  <>
                    افزودن {title} الزامی میباشد
                  </>
                  :
                  <>
                    {title}
                  </>
              }
            </p>
          </div>
        </div>
      }
    </>
  );
};
export default CustomizedFileButton;
