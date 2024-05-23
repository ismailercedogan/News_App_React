import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useUser } from './UserContext';
import styles from '../styles/saved_articles.module.css';

const SavedArticles = ({ articles }) => {
  const { deleteArticle } = useUser();

  const handleDelete = (articleUrl) => {
    deleteArticle(articleUrl);
  };

  if (!articles || articles.length === 0) {
    return <p>No saved articles</p>;
  }

  return (
    <div className={styles.savedArticles}>
      {articles.map((article, index) => (
        <Card key={index} className={styles.articleCard}>
          <CardBody>
            <CardTitle tag="h5">{article.title}</CardTitle>
            <CardText>{article.excerpt}</CardText>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            <Button color="danger" onClick={() => handleDelete(article.url)} className={styles.deleteButton}>Delete</Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SavedArticles;
