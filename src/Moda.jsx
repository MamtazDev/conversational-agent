import  { useState } from 'react';

const ModalExample = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    alert("dsd")
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent closing modal if clicked inside the modal
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Open Modal {isModalOpen ? "DIha" : "abir"} </button>

      {isModalOpen ? "DIha" : "abir"}
      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={handleModalClick}>
            <h2>Modal Content</h2>
            <p>This is the modal content.</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalExample;
