import React, { useState, useEffect } from 'react';
import { Avatar, Button, Container, Typography, Box, TextField, CircularProgress, Fade, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  margin: 'auto',
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[3],
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const Profile = () => {
  const [user, setUser] = useState({ username: '', profileImage: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(res.data);
      setUsername(res.data.username);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
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
      setUploading(true);
      const res = await axios.post('/api/user/upload-image', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(res.data);
      setUploading(false);
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  const handleUsernameChange = async () => {
    try {
      const res = await axios.put('/api/user/update-username', { username }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(res.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Box alignSelf="flex-start" mb={2}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <StyledAvatar src={user.profileImage} />
        <Box display="flex" alignItems="center" mb={2}>
          {editMode ? (
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography variant="h4">{user.username}</Typography>
          )}
          <IconButton onClick={() => setEditMode(!editMode)} size="small" sx={{ ml: 1 }}>
            <EditIcon />
          </IconButton>
        </Box>
        {editMode && (
          <Button variant="contained" color="primary" onClick={handleUsernameChange} sx={{ mb: 2 }}>
            Save Username
          </Button>
        )}
        <HiddenInput
          accept="image/*"
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
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload Image'}
          </Button>
        </Box>
        <Fade in={!!file}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {file?.name}
          </Typography>
        </Fade>
      </Box>
    </Container>
  );
};

export default Profile;