import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="An image showing max"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I&apos;m Max</h1>
      <p>
        I blog about web development - especially full stack development topics
        like React, Node, Express, MongoDB, SQL, Redis, Authentication etc
      </p>
    </section>
  );
}

export default Hero;
