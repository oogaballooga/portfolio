'use client';

import { useEffect, useState } from 'react';
import styles from './FloatingImageCard.module.css';

interface FloatingImageCardProps {
  images: string[];
  interval?: number;
}

export default function FloatingImageCard({
  images,
  interval = 5000,
}: { images: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [front, setFront] = useState(images[0]);
  const [back, setBack] = useState(images[1]);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);

      setTimeout(() => {
        setFront(back);
        const nextIndex = (currentIndex + 2) % images.length;
        setBack(images[nextIndex]);
        setCurrentIndex((i) => (i + 1) % images.length);
        setFlipping(false);
      }, 1000); // must match CSS transition
    }, interval);

    return () => clearInterval(id);
  }, [currentIndex, back, images, interval]);

  return (
    <div className={styles.scene}>
      <div className={styles.floatWrapper}>
        <div className={`${styles.card} ${flipping ? styles.flipped : ''}`}>
          <div className={styles.face}>
            <img src={front} className={styles.image} />
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            <img src={back} className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
}
