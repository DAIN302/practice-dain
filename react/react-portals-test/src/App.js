import logo from "./logo.svg";
import "./App.css";
import Modal from "./Modal";
import { useState } from "react";

const modalWrapperStyle = {
  position: "relative",
  zIndex: 1,
};

const higherIndexWrapperStype = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "blue",
  padding: "10px",
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div style={modalWrapperStyle} onClick={() => console.log("clicked")}>
        <button onClick={() => setIsModalOpen(true)}>모달열기</button>
        {/* 모달 */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          모달 내용
        </Modal>
      </div>
      <div style={higherIndexWrapperStype}>Z-index2</div>
    </div>
  );
}

export default App;
