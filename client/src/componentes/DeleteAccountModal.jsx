import React from "react";

export const DeleteAccountModal = ({ deletemodal, setDeleteModal }) => {
  return (
    <div
      className="delete-modal-container"
      style={deletemodal ? { top: "40%" } : { top: "-20rem" }}
    >
      <h3>Sind Sie sicher, dass Sie Ihr Konto löschen wollen?</h3>
      <button className="ja-btn">Ja</button>
      <button className="nein-btn" onClick={() => setDeleteModal(false)}>
        Nein
      </button>
    </div>
  );
};
