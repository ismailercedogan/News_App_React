'use client';
import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { UserProvider, useUser } from '../components/UserContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import EditProfileForm from '../components/EditProfileForm';
import SavedArticles from '../components/SavedArticles';
import styles from '../styles/user_profile.module.css';

const UserProfileComponent = () => {
    const { user, logout } = useUser();
    const [isLogin, setIsLogin] = useState(true);
    const [editing, setEditing] = useState(false);
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
    };
  
    const toggleEdit = () => {
      setEditing(!editing);
    };
  
    if (!user) {
      return (
        <Container className={styles.main}>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Card className={styles.card}>
                <CardBody>
                  <CardTitle className={styles['card-title']}>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
                  {isLogin ? <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm} />}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  
    return (
      <Container className={styles.main}>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Card className={styles.card}>
              <CardBody>
                {editing ? (
                  <EditProfileForm toggleEdit={toggleEdit} />
                ) : (
                  <>
                    <CardTitle className={styles['card-title']}>{user.username}</CardTitle>
                    <CardText className={styles['card-text']}>Name: {user.name}</CardText>
                    <CardText className={styles['card-text']}>Email: {user.email}</CardText>
                    <CardText className={styles['card-text']}>Phone: {user.phoneNumber}</CardText>
                    <Button onClick={toggleEdit} className={styles.button}>Edit Profile</Button>
                    <Button onClick={logout} className={styles.button}>Logout</Button>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <SavedArticles articles={user.savedArticles} />
          </Col>
        </Row>
        <footer className={styles.footer}>
          <p>2024 İsmail Ercedoğan</p>
        </footer>
      </Container>
    );
  };
  
  const UserProfile = () => (
    <UserProvider>
      <UserProfileComponent />
    </UserProvider>
  );
  
  export default UserProfile;