import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch('http://localhost:8000/users');
    const users = await response.json();
    const authenticatedUser = users.find(user => user.username === username && user.password === password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const signup = async (newUser) => {
    const userWithArticles = { ...newUser, savedArticles: [] };  // Initialize savedArticles as an empty array
    const response = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userWithArticles)
    });
    const createdUser = await response.json();
    setUser(createdUser);
    localStorage.setItem('user', JSON.stringify(createdUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (updatedUser) => {
    const response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });
    const updatedUserData = await response.json();
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  const saveArticle = async (article) => {
    if (!user.savedArticles) user.savedArticles = []; // Ensure savedArticles is an array
    if (user.savedArticles.some(a => a.url === article.url)) {
      alert('This article is already saved.');
      return;
    }
    const updatedUser = { ...user, savedArticles: [...user.savedArticles, article] };
    const response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    const savedUser = await response.json();
    setUser(savedUser);
    localStorage.setItem('user', JSON.stringify(savedUser));
    alert('Article saved successfully.');
  };

  const deleteArticle = async (articleUrl) => {
    const updatedUser = {
      ...user,
      savedArticles: user.savedArticles.filter(a => a.url !== articleUrl)
    };
    const response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    const savedUser = await response.json();
    setUser(savedUser);
    localStorage.setItem('user', JSON.stringify(savedUser));
    alert('Article deleted successfully.');
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, updateUser, saveArticle, deleteArticle }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
