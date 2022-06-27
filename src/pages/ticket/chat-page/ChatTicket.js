import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Styles from "./ChatTicketPage.module.scss";
import { ImAttachment, MdSend, IoMdClose } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
import DateConvert from '../../../utils/date'
//components 
import CustomizedTextarea from "../../../components/form/text-area/Textarea";
import { ticketServices } from "../../../services";
import { useTheme, useTitle } from "../../../context";
import useWindowDimensions from "../../../components/windowDimension/useWindowDimensions ";
import { ticketValidator } from "../../../utils/validators";
import { Toastify } from "../../../utils";
import TicketSidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";


export default function ChatTicketPage() {
  document.title = "ارز تو ارز | پاسخ به تیکت";
  const { id } = useParams();
  const history = useHistory();
  const { theme } = useTheme();
  const { height } = useWindowDimensions()
  const { setTitle } = useTitle();
  const [ticketMessage, setTicketMessage] = useState({});
  const [userInfo, setUserInfo] = useState(false);
  const [uploadedImage, setUploadedImage] = useState([]);

  const gotoBottom = () => {
    // let element = document.getElementById("scroll-box");
    // element.scrollTop = element.scrollHeight;
  }

  useEffect(() => {
    setTitle("پاسخ به تیکت");
  }, [])

  useEffect(() => {
    if (id) {
      getTicketMessage(id)
    }
  }, [])

  useEffect(() => {
    setTitle("پاسخ به تیکت");
  }, [])

  const handleRemoveImg = (id) => {
    let listImg = uploadedImage.filter((item, index) => index !== id);
    setUploadedImage(listImg);

  }

  // create ticketMessage 
  const createTicketMessage = async (vals) => {
    let formData = new FormData();

    uploadedImage.forEach((image) => {
      formData.append(`images`, image)
    });

    for (let key in vals) {
      formData.append(key, vals[key])
    }
    formData.append("ticket", id)
    // formData.append("customer", "61488fa5595fb23988d26e3d")

    try {
      const { data, status } = await ticketServices.create(formData)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getTicketMessage(id)
        setUploadedImage([])

      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  // get ticketMessage 
  const getTicketMessage = async (id) => {
    try {
      const { data, status } = await ticketServices.detail(id)
      if (status === 200 && data.success) {
        setTicketMessage(data.data);
        gotoBottom()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // get ticketMessage 


  return (
    <div className="mt-4 p-0 p-md-4 mb-5 mb-sm-0 bg-white border-radius-lg card-shadow">
      <div className={`${Styles.container} ${Styles[theme]} d-flex flex-wrap`}>
        <div className={Styles.side}>
          <TicketSidebar refresh={()=> getTicketMessage(id)} ticketData={ticketMessage} />
        </div>
        <div className={Styles.chat}>
          <div className={Styles.respHeader}>
            <MobileHeader ticketData={ticketMessage} />
          </div>
          <div className={`${Styles.box} p-2 h-100`}>
            <div className={Styles.body} style={{ height: height - 160 }}>


              <div className={`${ticketMessage?.role === "admin" ? Styles.admin : Styles.user} d-flex w-100 mb-3`}>
                <div className={`${Styles.message} p-3`}>
                  <p className="mb-2 is-size-7 line-height-normal">
                    {ticketMessage?.description}
                  </p>
                  {
                    ticketMessage?.images?.map((img, index) => {
                      return <img key={index} className="mb-3" src={`http://194.5.192.82:4000/api/v1/admin/ticketImages/${img.imageUrl}`} />
                    })
                  }
                  <p className={`text-left mb-0 is-size-7 `}>
                    {DateConvert.getTime(ticketMessage?.createdAt)}
                    <span className="mx-1 text-gainsboro">|</span>
                    {DateConvert.toShamsiDate(ticketMessage?.createdAt, { month: "short" })}
                  </p>
                </div>
              </div>

              {
                ticketMessage.messages?.map((item, index) => {
                  return (
                    <div key={index} className={`${item.role === "admin" ? Styles.admin : Styles.user} d-flex w-100 mb-3`}>
                      <div className={`${Styles.message} p-3`}>
                        <p className="mb-2 is-size-7 line-height-normal">
                          {item.message}
                        </p>
                        {
                          item.images.map((img, index) => {
                            return <img key={index} className="mb-3" src={`http://194.5.192.82:4000/api/v1/admin/ticketImages/${img.imageUrl}`} />
                          })
                        }
                        <p className={`text-left mb-0 is-size-7 `}>
                          {DateConvert.getTime(item.createdAt)}
                          <span className="mx-1 text-gainsboro">|</span>
                          {DateConvert.toShamsiDate(item.createdAt, { month: "short" })}
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className={Styles.footer}>

              <div className={`${Styles.previewUpload} ${uploadedImage.length ? Styles.show : null}`}>


                <div className={`${Styles.uploadedFiles} px-3 d-flex align-items-center`}>
                  {
                    uploadedImage.map((item, index) => {
                      return (
                        <div className={`${Styles.uploadedBox} `} key={index}>
                          <img src={URL.createObjectURL(item)} />
                          <span onClick={() => handleRemoveImg(index)} className={Styles.delete}><IoMdClose /></span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className={`${Styles.formTicket} pt-3`}>
                <Formik
                  initialValues={{ message: "" }}
                  onSubmit={(values, actions) => {
                    createTicketMessage(values)
                    actions.resetForm();
                  }}
                  validationSchema={ticketValidator.chat}
                >
                  {({ isValid, dirty }) => (
                    <Form className="d-flex justify-content-between align-items-center">
                      <div className={`${Styles.area} px-3`}>

                        <FastField
                          maxRows="3"
                          placeholder="پیغام خود را وارد کنید"
                          rows="1"
                          className="p-3"
                          // onChange={(e) => setMessageValue(e.target.value)}
                          name="message"
                          as={CustomizedTextarea}
                        />

                      </div>
                      <div className={`${Styles.icon} px-3 d-flex align-items-center justify-content-end`}>
                        <div className={`${Styles.attachFile} ${Styles.btns}`}>
                          <input type="file" name="images" className={`${Styles.input} pointer `}
                            onChange={(e) => { setUploadedImage(prev => ([...prev, e.target.files[0]])) }
                            }
                          />
                          <ImAttachment size="30" className="ml-5 pointer" title="افزودن عکس" />
                        </div>

                        <button type="submit" className={`${Styles.btns} ${Styles.submitBtn}`} ><MdSend size="30" className={`${Styles.rotate} pointer`} title="ارسال" /></button>

                      </div>
                    </Form>
                  )}
                </Formik>
              </div>


            </div>
          </div>

        </div>
      </div>
    </div >
  );
}
