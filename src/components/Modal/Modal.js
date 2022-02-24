import ReactDom from "react-dom";
import { useEffect, useCallback } from "react";
import { GrClose } from "react-icons/gr";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  const onKeyDown = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const element = (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={onClose}>
        <GrClose />
      </div>
      <div className={styles.modal} onKeyDown={onKeyDown}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  return isOpen
    ? ReactDom.createPortal(element, document.querySelector(".modal-container"))
    : null;
};

export default Modal;
