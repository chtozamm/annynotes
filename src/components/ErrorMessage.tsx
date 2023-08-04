import styles from "@/styles/error.module.css";

export default function ErrorMessage() {
  return (
    <div className={styles.container}>
      <p>
        Looks like something went wrong on the server.
        <br />
        Can't get any notes to show.
      </p>
    </div>
  );
}
