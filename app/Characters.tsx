import Image from "next/image";
import styles from "./posts.module.css";
import Link from "next/link";

export default function Characters({ name }: { name: string }) {
  return (
    <Link
      href={
        name.includes("Jack Sparrow")
          ? `/Captain_Jack_Sparrow`
          : `/${name.replaceAll(" ", "_")}`
      }
      className={styles.senderName}
    >
      {name === "stranger" ? "left by a stranger" : `from ` + name}
      {name === "Jar Jar" && (
        <Image
          src={"/profile/jar-jar.png"}
          width={20}
          height={20}
          alt="Jar Jar"
          className={styles.profilePicture}
        />
      )}
      {name === "Darth Vader" && (
        <Image
          src={"/profile/darth-vader.png"}
          width={20}
          height={20}
          alt="Darth Vader"
          className={styles.profilePicture}
        />
      )}
      {name === "Geralt of Rivia" && (
        <Image
          src={"/profile/geralt.png"}
          width={20}
          height={20}
          alt="Geralt of Rivia"
          className={styles.profilePicture}
        />
      )}
      {name === "Town's Guard" && (
        <Image
          src={"/profile/guard.png"}
          width={20}
          height={20}
          alt="Guard from Skyrim"
          className={styles.profilePicture}
        />
      )}

      {name === "Obi-Wan Kenobi" && (
        <Image
          src={"/profile/obi.png"}
          width={20}
          height={20}
          alt="Obi-Wan Kenobi"
          className={styles.profilePicture}
        />
      )}
      {name === "Anakin Skywalker" && (
        <Image
          src={"/profile/anakin.png"}
          width={20}
          height={20}
          alt="Anakin Skywalker"
          className={styles.profilePicture}
        />
      )}

      {name === "Bilbo Baggins" && (
        <Image
          src={"/profile/bilbo-baggins.png"}
          width={20}
          height={20}
          alt="Bilbo Baggins"
          className={styles.profilePicture}
        />
      )}
      {name === "Indiana Jones" && (
        <Image
          src={"/profile/indiana-jones.png"}
          width={20}
          height={20}
          alt="Indiana Jones"
          className={styles.profilePicture}
        />
      )}
      {name === "Gollum" && (
        <Image
          src={"/profile/gollum.png"}
          width={20}
          height={20}
          alt="Gollum"
          className={styles.profilePicture}
        />
      )}
      {name === "Samwise Gamgee" && (
        <Image
          src={"/profile/sam.png"}
          width={20}
          height={20}
          alt="Samwise Gamgee"
          className={styles.profilePicture}
        />
      )}
      {name === "Frodo Baggins" && (
        <Image
          src={"/profile/frodo.png"}
          width={20}
          height={20}
          alt="Frodo Baggins"
          className={styles.profilePicture}
        />
      )}
      {name.includes("Jack Sparrow") && (
        <Image
          src={"/profile/jack-sparrow.png"}
          width={20}
          height={20}
          alt="Captain Jack Sparrow"
          className={styles.profilePicture}
        />
      )}
      {name === "Sherry" && (
        <Image
          src={"/profile/sherry.png"}
          width={20}
          height={20}
          alt="Sherry"
          className={styles.profilePicture}
        />
      )}
      {name === "Morton" && (
        <Image
          src={"/profile/morton-1.png"}
          width={20}
          height={20}
          alt="Morton"
          className={styles.profilePicture}
        />
      )}
    </Link>
  );
}
