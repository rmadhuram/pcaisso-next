import styles from "./deleteButton.module.scss";
import { useState } from "react";

export default function DeleteButton({
  deleted,
  callback,
}: {
  deleted: boolean | undefined;
  callback: (deleted: boolean) => Promise<void>;
}) {
  const [deletedState, setDeletedState] = useState(deleted ?? false);
  return (
    <div
      className={styles["delete-btn"]}
      onClick={() => {
        setDeletedState(!deletedState);
        callback(!deletedState);
      }}
    >
      {deletedState ? (
        <i className="fa-solid fa-trash-can"></i>
      ) : (
        <p>DELETED</p>
      )}
    </div>
  );
}
