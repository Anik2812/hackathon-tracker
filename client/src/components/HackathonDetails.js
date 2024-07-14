import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Chip } from '@mui/material';
import axios from 'axios';

const HackathonDetails = () => {
  const [hackathon, setHackathon] = useState(null);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    fetchHackathonDetails();
  }, [id]);

  const fetchHackathonDetails = async () => {
    try {
      const res = await axios.get(`/api/hackathons/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setHackathon(res.data);
    } catch (err) {
      console.error('Error fetching hackathon details:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/hackathons/${id}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      history.push('/dashboard');
    } catch (err) {
      console.error('Error deleting hackathon:', err);
    }
  };

  if (!hackathon) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          {hackathon.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Project: {hackathon.projectName}
        </Typography>
        <Typography gutterBottom>
          Date: {new Date(hackathon.date).toLocaleDateString()}
        </Typography>
        <Typography gutterBottom>
          Description: {hackathon.projectDescription}
        </Typography>
        <Typography gutterBottom>
          Team Members: {hackathon.teamMembers.join(', ')}
        </Typography>
        <Typography gutterBottom>
          Awards: {hackathon.awards.join(', ')}
        </Typography>
        {hackathon.repositoryLink && (
          <Typography gutterBottom>
            Repository: <a href={hackathon.repositoryLink} target="_blank" rel="noopener noreferrer">{hackathon.repositoryLink}</a>
          </Typography>
        )}
        {hackathon.demoLink && (
          <Typography gutterBottom>
            Demo: <a href={hackathon.demoLink} target="_blank" rel="noopener noreferrer">{hackathon.demoLink}</a>
          </Typography>
        )}
        {hackathon.won && (
          <Chip label="Won" color="secondary" />
        )}
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => history.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
            Delete Hackathon
          </Button>
          </Box>
      </Box>
    </Container>
  );
};

export default HackathonDetails;