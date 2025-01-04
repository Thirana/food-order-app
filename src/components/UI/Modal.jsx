import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  // to access the dialog inside the useEffect(), we need a ref for dialog
  const dialog = useRef();

  //whenever 'open' prop changes, we need to close or open the modal
  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    // we do not have logic to deal with when the open is false
    // therefore, we use cleanup function (runs every time when open dependency changes) (when this effect going to run again)
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
