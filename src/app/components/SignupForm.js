import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useUser } from './UserContext';
import styles from '../styles/form.module.css';

const SignupForm = ({ toggleForm }) => {
  const { signup } = useUser();
  const [formData, setFormData] = useState({ username: '', name: '', email: '', phoneNumber: '', password: '',confirmpassword: '',});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/users');
    const users = await response.json();

    const emailExists = users.some(user => user.email === formData.email);
    const phoneNumberExists = users.some(user => user.phoneNumber === formData.phoneNumber);
    const usernameExists = users.some(user => user.username === formData.username);
    if (emailExists) {
      alert('Email already in use.');
      return;
    }
    if (phoneNumberExists) {
      alert('Phone number already in use.');
      return;
    }
    if (usernameExists) {
      alert('Username already in use.');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    if (formData.phoneNumber.length !== 10) {
      alert('Phone number must be 10 digits.');
      return;
    }
    if (formData.username.length < 6) {
      alert('Username must be at least 6 characters.');
      return;
    }
    if(formData.password !== formData.confirmpassword){ 
        alert('Passwords do not match');
        return;
    }

    try {
      await signup(formData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <FormGroup className={styles.formGroup}>
        <Label for="username" className={styles.label}>Username</Label>
        <Input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className={styles.input} required />
      </FormGroup>
      <FormGroup className={styles.formGroup}>
        <Label for="name" className={styles.label}>Name</Label>
        <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={styles.input} required />
      </FormGroup>
      <FormGroup className={styles.formGroup}>
        <Label for="email" className={styles.label}>Email</Label>
        <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={styles.input} required />
      </FormGroup>
      <FormGroup className={styles.formGroup}>
        <Label for="phoneNumber" className={styles.label}>Phone Number</Label>
        <Input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={styles.input} required />
      </FormGroup>
      <FormGroup className={styles.formGroup}>
        <Label for="password" className={styles.label}>Password</Label>
        <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} required />
      </FormGroup>
      <FormGroup>
        <Label for="confirmpassword" className={styles.label}>Confirm Password</Label>
        <Input type="password" name="confirmpassword" id="confirmpassword" value={formData.confirmpassword} onChange={handleChange} className={styles.input} required />
      </FormGroup>
      <Button type="submit" className={styles.button}>Sign Up</Button>
      <Button type="button" onClick={toggleForm} className={styles.toggleButton}>Login</Button>
    </Form>
  );
};

export default SignupForm;
