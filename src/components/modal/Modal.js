import React from "react";
import { Modal } from "react-bootstrap";

const CustomizedModal = ({
  size = "md",
  header: Header,
  children,
  footer: Footer,
  handleClose,
  show=false,
  className='',
  modalBodyClassName,
  ...rest
  
}) => {
  return (
    <Modal
      {...rest}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      className={`${className} p-0`}
      backdrop="static"
    >
      {Header ? (
        <Modal.Header closeButton>
          <Modal.Title className="w-100" id="contained-modal-title-vcenter">
            <Header />
          </Modal.Title>
        </Modal.Header>
      ) : null}
      <Modal.Body className={`${modalBodyClassName} p-4`}>{children}</Modal.Body>
      {Footer ? (
        <Modal.Footer>
          <Footer />
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};
export default CustomizedModal;
