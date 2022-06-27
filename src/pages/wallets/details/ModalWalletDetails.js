import React from 'react'
import CustomizedModal from "../../../components/modal/Modal";

export default function ModalWalletDetails() {
    return (
        <>
            <CustomizedModal show={detail} >
                <div className="mb-3 text-adrkBlue yekan-Bold border-bottom pb-3 mb-3">
                    <span className="d-flex align-items-center"><IoWalletOutline size="20" className="ml-2 text-lightBlue" /> اطلاعات ولت</span>
                </div>
                <div className="row">
                    <div className="col-12 mb-3 d-flex align-items-center">
                        email
                    </div>
                    <div className="col-12 mb-3">
                        mobile
                    </div>

                </div>
                <div className="border-top pt-3 text-left">
                    <CustomizedButton variant="lightRed" className="btn"
                        onClick={() => setDetail(false)}
                    >تایید</CustomizedButton>
                </div>
            </CustomizedModal>
        </>
    )
}
