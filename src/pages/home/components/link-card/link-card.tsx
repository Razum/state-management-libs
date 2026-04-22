import { Link } from '@tanstack/react-router';
import { Badge, Card, Typography } from 'antd';

import styles from '@/pages/home/components/link-card/link-card.module.css';

type LinkCardStatus = 'implemented' | 'coming-soon';

interface LinkCardProps {
  title: string;
  image: string;
  href: string;
  description?: string;
  status?: LinkCardStatus;
}

const STATUS_LABEL: Record<LinkCardStatus, string> = {
  implemented: 'Ready',
  'coming-soon': 'Coming soon'
};

const LinkCard = ({ title, image, href, description, status = 'implemented' }: LinkCardProps) => {
  const isComingSoon = status === 'coming-soon';

  return (
    <Badge.Ribbon text={STATUS_LABEL[status]} color={isComingSoon ? 'default' : 'geekblue'}>
      <Card
        className={`${styles.card} ${isComingSoon ? styles.cardMuted : ''}`}
        hoverable={!isComingSoon}
        cover={
          <div className={styles.cover}>
            <img src={image} alt={title} className={styles.image} />
          </div>
        }
      >
        <Typography.Title className={styles.title} level={5}>
          {title}
        </Typography.Title>
        {description && (
          <Typography.Paragraph className={styles.description} type="secondary">
            {description}
          </Typography.Paragraph>
        )}
        {!isComingSoon && <Link to={href} className={styles.link} aria-label={`Open ${title}`} />}
      </Card>
    </Badge.Ribbon>
  );
};

export default LinkCard;
