import classes from "./hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          // nie musze podawac /public poniewa image zaczyna od root lvl
          src="/images/site/ziomeczek.jpg"
          alt="An image showing bob"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Bob</h1>
      <p>I blog about spiritual awakening</p>
    </section>
  );
}
