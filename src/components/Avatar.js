import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  console.log("Avatar src:", src);

  return (
    <span>
      <img
        className={styles.Avatar}
        src={src || "/default-profile.png"}
        height={height}
        width={height}
        alt="avatar"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-profile.png";
        }}
      />
      {text}
    </span>
  );
};

export default Avatar;