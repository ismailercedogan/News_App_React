'use client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import styles from '../styles/page.module.css';

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/matches');
      const data = await response.json();
      setMatches(data);
    };
    fetchData();
  }, []);

  return (
    <Container className={styles.main}>
      <Row>
        <Col>
          <h2 className={styles.heading}>Match Schedule</h2>
        </Col>
      </Row>
      <Row>
        {matches.map((match, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className={styles.card}>
              <div className={styles['card-img-container']}>
                <img src={match.logo} alt={`${match.opponent} logo`} />
              </div>
              <CardBody>
                <CardTitle className={styles['card-title']}>{match.opponent}</CardTitle>
                <CardSubtitle className={styles['card-subtitle']}>{match.date} at {match.time}</CardSubtitle>
                <CardText className={styles['card-text']}>Venue: {match.venue}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <footer className={styles.footer}>
        <p>2024 İsmail Ercedoğan</p>
      </footer>
    </Container>
  );
};

export default MatchSchedule;
