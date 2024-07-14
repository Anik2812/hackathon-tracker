import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Box, 
  Chip, 
  AppBar, 
  Toolbar 
} from '@mui/material';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import axios from 'axios';
import AddHackathonForm from './AddHackathonForm';
import HackathonStats from './HackathonStats';

const API_BASE_URL = 'http://localhost:5000';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Dashboard = () => {
  const theme = useTheme();
  const [hackathons, setHackathons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchHackathons();
    }
  }, [navigate]);

  const fetchHackathons = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/api/hackathons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHackathons(res.data);
    } catch (err) {
      console.error('Error fetching hackathons:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleAddHackathon = async (hackathonData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }
      await axios.post(`${API_BASE_URL}/api/hackathons`, hackathonData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHackathons();
      setShowForm(false);
    } catch (err) {
      console.error('Error adding hackathon:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredHackathons = hackathons.filter(hackathon => {
    if (filter === 'won') return hackathon.won;
    if (filter === 'not-won') return !hackathon.won;
    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hackathon Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="lg">
        <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">My Hackathons</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Hackathon'}
          </Button>
        </Box>
        {showForm && <AddHackathonForm onSubmit={handleAddHackathon} />}
        <Box mb={2}>
          <Button onClick={() => setFilter('all')} color={filter === 'all' ? 'primary' : 'inherit'}>All</Button>
          <Button onClick={() => setFilter('won')} color={filter === 'won' ? 'primary' : 'inherit'}>Won</Button>
          <Button onClick={() => setFilter('not-won')} color={filter === 'not-won' ? 'primary' : 'inherit'}>Not Won</Button>
        </Box>
        <HackathonStats />
        <Grid container spacing={4}>
          {filteredHackathons.map((hackathon) => (
            <Grid item key={hackathon._id} xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {hackathon.name}
                  </Typography>
                  <Typography>
                    Project: {hackathon.projectName}
                  </Typography>
                  <Typography>
                    Date: {new Date(hackathon.date).toLocaleDateString()}
                  </Typography>
                  {hackathon.won && (
                    <StyledChip label="Won" color="secondary" />
                  )}
                </StyledCardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/hackathon/${hackathon._id}`}>
                    View Details
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;