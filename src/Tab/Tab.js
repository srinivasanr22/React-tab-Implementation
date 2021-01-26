import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Tab.css";

function Tab(props) {
  const [showModal, updateModal] = useState(false);
  const {
    tab,
    index,
    activeTab,
    setActiveTab,
    removeAddedTab,
    handleDrag,
    handleDrop
  } = props;

  /**
   * function will hide the modal & remove the selected tab.
   * @param {Boolean} tobeRemoved - If flag is true invoke
   * delete function to its parent component.
   */
  const handleSubmit = tobeRemoved => {
    tobeRemoved && removeAddedTab(index);
    toggleModal();
  };

  /**
   * This function will show / hide the modal.
   * @param {boolean} state - to represent the next state for modal.
   */
  const toggleModal = (state = false) => {
    updateModal(state);
  };

  return (
    <>
      <div
        draggable={true}
        className={`tab ${activeTab === index ? "active" : ""}`}
        id={tab.id}
        onDragOver={ev => ev.preventDefault()}
        onDragStart={handleDrag}
        onDrop={handleDrop}
        onClick={() => {
          setActiveTab(index);
        }}
      >
        {tab.tabName}
        {index > 2 ? (
          <span className="close-icon">
            <AiFillCloseCircle onClick={() => toggleModal(true)} />
          </span>
        ) : (
          ""
        )}
      </div>
      <Modal show={showModal} handleClose={e => toggleModal(false)}>
        <div className="title">Delete Confirmation:</div>
        <span className="info-text">
          {`Are you sure ? do you want to remove this tab "${tab.tabName}"`}
        </span>
        <div className="btn-group">
          <button
            className="btn primary"
            onClick={() => handleSubmit(true)}
            type="submit"
          >
            Yes
          </button>
          <button
            className="btn"
            onClick={() => handleSubmit(false)}
            type="button"
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Tab;
