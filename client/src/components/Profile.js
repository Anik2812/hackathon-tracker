import React, { useState, useEffect } from 'react';
import { Avatar, Button, Container, Typography, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const useStyles = styled((theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ username: '', profileImage: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await axios.post('/api/user/upload-image', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Avatar src={user.profileImage} className={classes.avatar} />
        <Typography variant="h4" gutterBottom>
          {user.username}
        </Typography>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Choose Image
          </Button>
        </label>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={handleUpload}>
            Upload Image
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;