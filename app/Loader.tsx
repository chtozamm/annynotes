"use client";

import styles from "./loader.module.css";
import { useEffect, useState } from "react";

export default function Loader() {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      const body = document.querySelector("body");
      if (body) body.style.overflow = "visible";
      const appTitle = document.querySelector(".app-title");
      if (appTitle) {
        appTitle.classList.remove("app-title");
      }
      const loaderContainer = document.querySelector("#loaderContainer");
      if (loaderContainer) loaderContainer.remove();
    }, 1000);
  }, []);
  return (
    <div
      id="loaderContainer"
      className={animation ? styles.containerAnimation : styles.container}
    >
      <h1 className={animation ? styles.headerAnimation : styles.header}>
        Annynotes
      </h1>
    </div>
  );
}
