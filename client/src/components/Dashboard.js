import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, Box, Chip, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AddHackathonForm from './AddHackathonForm';
import HackathonStats from './HackathonStats';

const useStyles = styled((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  appBar: {
    marginBottom: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [hackathons, setHackathons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const res = await axios.get('/api/hackathons', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setHackathons(res.data);
    } catch (err) {
      console.error('Error fetching hackathons:', err);
    }
  };

  const handleAddHackathon = async (hackathonData) => {
    try {
      await axios.post('/api/hackathons', hackathonData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchHackathons();
      setShowForm(false);
    } catch (err) {
      console.error('Error adding hackathon:', err);
    }
  };

  const filteredHackathons = hackathons.filter(hackathon => {
    if (filter === 'won') return hackathon.won;
    if (filter === 'not-won') return !hackathon.won;
    return true;
  });

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hackathon Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" onClick={() => localStorage.clear()} component={Link} to="/">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">My Hackathons</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Hackathon'}
          </Button>
        </Box>
        {showForm && <AddHackathonForm onSubmit={handleAddHackathon} />}
        <Box mb={2}>
          <Button onClick={() => setFilter('all')} color={filter === 'all' ? 'primary' : 'default'}>All</Button>
          <Button onClick={() => setFilter('won')} color={filter === 'won' ? 'primary' : 'default'}>Won</Button>
          <Button onClick={() => setFilter('not-won')} color={filter === 'not-won' ? 'primary' : 'default'}>Not Won</Button>
        </Box>
        <HackathonStats />
        <Grid container spacing={4}>
          {filteredHackathons.map((hackathon) => (
            <Grid item key={hackathon._id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
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
                    <Chip label="Won" color="secondary" className={classes.chip} />
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/hackathon/${hackathon._id}`}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
