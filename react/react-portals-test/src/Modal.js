import React from "react";
import ReactDOM from "react-dom";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "50px",
  zindex: 1000,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  rigth: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zindex: 1000,
};

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  //   return (
  //     <>
  //       <div style={overlayStyle} />
  //       <div style={modalStyle}>
  //         <button onClick={onClose}>모달닫기</button>
  //         {children}
  //       </div>
  //     </>
  //   );
  return ReactDOM.createPortal(
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        <button onClick={onClose}>모달닫기</button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
