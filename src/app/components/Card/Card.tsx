import makeClass from "clsx";
import styles from "./Card.module.css";
import { useState } from "react";

export function Card() {
  const [data, setData] = useState({
    pointerX: 0.25,
    pointerY: 0.25,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width, height, top } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const pointerX = x / width;
    const y = e.clientY - top;
    const pointerY = y / height;
    setData({ pointerX, pointerY });
  };

  return (
    <div
      // data-rarity="rare holo cosmos"
      data-rarity="rare shiny"
      // data-subtypes="supporter"
      className={makeClass(styles.card)}
      onMouseMove={handleMouseMove}
      style={
        {
          "--pointer-x": `${data.pointerX * 100}%`,
          "--pointer-y": `${data.pointerY * 100}%`,
          "--pointer-from-left": data.pointerX,
          "--pointer-from-top": data.pointerY,
          "--background-x": `${data.pointerX * 100}%`,
          "--background-y": `${data.pointerX * 100}%`,
        } as React.CSSProperties
      }
    >
      <div className={styles.card__translater}>
        <div className={styles.card__rotator}>
          <img
            className={styles.card__back}
            src="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
            alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
            loading="lazy"
            width="660"
            height="921"
            style={{ opacity: 0 }}
          />
          <div className={styles.card__front}>
            <img
              src="https://images.pokemontcg.io/swsh12pt5/160_hires.png"
              alt="Front design of the Pikachu Pokemon Card, with the stats and info around the edge"
              loading="lazy"
              width="660"
              height="921"
              style={{ opacity: 0 }}
            />
            <div className={styles.card__shine} />
            <div className={styles.card__glare} />
          </div>
        </div>
      </div>
    </div>
  );
}
