import React, { useEffect, useState } from 'react'
import Styles from './NotifModal.module.scss';
import CustomizedModal from '../../../components/modal/Modal';
import { notificationServices } from '../../../services';
import Notifications from "../../../components/notifications/Notifications";
import { Toastify } from '../../../utils';

const NotifModal = ({ handleClose, show, id }) => {
    const [currentData, setCurrentData] = useState({})
    useEffect(() => {
        if (id) {
            getNotification()
        }
    }, [id])

    const getNotification = async () => {
        try {
            const { data, status } = await notificationServices.single(id)
            if (status === 200 && data.success) {
                setCurrentData(data.data)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    return (
        <CustomizedModal
            show={show}
            size="md"
            modalBodyClassName={Styles.body}
        >
            <Notifications type={currentData.status} title={currentData.title} body={currentData.description} close={handleClose} read={currentData.read} />
        </CustomizedModal>
    )
}

export default NotifModal
