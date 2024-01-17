import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export const BuildWith: FC = () => {
  return (
    <div className={styles.BuildWith}>
      <span>Built with</span>
      <Image src="/PythLogo.png" height={60} width={180} alt="Pyth Logo" />
    </div>
  );
};
