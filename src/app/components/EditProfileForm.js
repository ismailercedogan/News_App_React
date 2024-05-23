import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useUser } from './UserContext';
import styles from '../styles/form.module.css';

const EditProfileForm = ({ toggleEdit }) => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({ username: '', name: '', email: '', phoneNumber: '', password: '' });

  useEffect(() => {
    setFormData({ username: user.username, name: user.name, email: user.email, phoneNumber: user.phoneNumber });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/users');
    const users = await response.json();

    const emailExists = users.some(u => u.email === formData.email && u.id !== user.id);
    const phoneNumberExists = users.some(u => u.phoneNumber === formData.phoneNumber && u.id !== user.id);
    const usernameExists = users.some(u => u.username === formData.username && u.id !== user.id);

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
    if (formData.password!==user.password) {
        alert('Password is wrong.');
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

    try {
      await updateUser(formData);
      toggleEdit();
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
        <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} />
      </FormGroup>
      <Button type="submit" className={styles.button}>Save</Button>
      <Button type="button" onClick={toggleEdit} className={styles.toggleButton}>Cancel</Button>
    </Form>
  );
};

export default EditProfileForm;
