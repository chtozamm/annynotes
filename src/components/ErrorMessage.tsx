import styles from "@/styles/error.module.css"

export default function ErrorMessage() {
  return (
    <div className={styles.container}>
      <p>
        Sorry, something went wrong on the server...
        <br />
        <br />
        Try to reload this page or come back later ✨
      </p>
    </div>
  )
}
