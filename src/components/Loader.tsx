"use client";

import styles from "@/styles/loader.module.css";
import { useEffect, useState } from "react";

export default function Loader() {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      const body = document.querySelector("body") as HTMLBodyElement;
      if (body) body.style.overflow = "visible";
      const loaderContainer = document.querySelector(
        "#loaderContainer"
      ) as HTMLDivElement;
      if (loaderContainer) loaderContainer.remove();
    }, 1500);
  });
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
