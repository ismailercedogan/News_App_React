import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useUser } from './UserContext';
import styles from '../styles/form.module.css';

const LoginForm = ({ toggleForm }) => {
  const { login } = useUser();
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData.username, loginData.password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <FormGroup className={styles.formGroup}>
        <Label for="username" className={styles.label}>Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          value={loginData.username}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </FormGroup>
      <FormGroup className={styles.formGroup}>
        <Label for="password" className={styles.label}>Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={loginData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </FormGroup>
      <Button type="submit" className={styles.button}>Login</Button>
      <Button type="button" onClick={toggleForm} className={styles.toggleButton}>Sign Up</Button>
    </Form>
  );
};

export default LoginForm;
