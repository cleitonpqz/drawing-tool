import Head from "next/head";
import Canvas from "@/components/canvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Adding meta tags for SEO and better accessibility */}
      <Head>
        <title>Drawing App</title>
        <meta
          name="description"
          content="A simple web-based drawing app built with Next.js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        {/* Title and app header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Drawing App</h1>
          <p className={styles.description}>
            A simple and fun way to draw online. Start creating your art!
          </p>
        </header>

        {/* Add a container for the canvas with responsive design */}
        <section className={styles.canvasContainer}>
          <Canvas />
        </section>

        {/* Add a footer for app information or links */}
        <footer className={styles.footer}>
          <p>
            Created by{" "}
            <a href="https://www.linkedin.com/in/cleitonpqz" target="blank">
              Cleiton Queiroz
            </a>{" "}
            &bull;{" "}
            <a href="https://github.com/cleitonpqz/drawing-tool" target="blank">
              GitHub repo
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
