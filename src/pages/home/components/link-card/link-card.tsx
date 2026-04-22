import { Link } from '@tanstack/react-router';
import { Card, Typography } from 'antd';

import styles from '@/pages/home/components/link-card/link-card.module.css';

interface LinkCardProps {
  title: string;
  image: string;
  href: string;
}

const LinkCard = ({ title, image, href }: LinkCardProps) => (
  <Card
    className={styles.card}
    hoverable
    cover={<img src={image} alt={title} className={styles.image} />}
  >
    <Typography.Title className={styles.title} level={5}>
      {title}
    </Typography.Title>
    <Link to={href} className={styles.link} aria-label={`Open ${title}`} />
  </Card>
);

export default LinkCard;
