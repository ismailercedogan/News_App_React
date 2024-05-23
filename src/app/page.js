'use client';
import React, { useState, useEffect } from 'react';
import NewsArticle from './components/NewsArticle';
import { Container, Row, Col, Button } from 'reactstrap';
import { UserProvider, useUser } from './components/UserContext';
import styles from './page.module.css';

const HomeContent = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const { user, saveArticle } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/articles');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  const handleSaveArticle = (article) => {
    saveArticle(article);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Container className={styles.main}>
        <Row>
          <Col>
            <h2>Latest News</h2>
            {newsData.map((article, index) => (
              <div key={index} className={styles.article}>
                <NewsArticle {...article} />
                {user && (
                  <Button onClick={() => handleSaveArticle(article)} className={styles.saveButton}>
                    Save
                  </Button>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Home = () => (
  <UserProvider>
    <HomeContent />
  </UserProvider>
);

export default Home;
