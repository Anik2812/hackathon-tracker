import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

ChartJS.register(ArcElement, Tooltip, Legend);

const HackathonStats = () => {
  const [stats, setStats] = useState({ total: 0, won: 0 });
  const chartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchStats();
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/api/hackathons/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching hackathon stats:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const data = {
    labels: ['Won', 'Not Won'],
    datasets: [
      {
        data: [stats.won, stats.total - stats.won],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Hackathon Statistics
      </Typography>
      <Typography>
        Total Hackathons: {stats.total}
      </Typography>
      <Typography>
        Won Hackathons: {stats.won}
      </Typography>
      <Box width={300} height={300} margin="auto">
        <Pie ref={chartRef} data={data} options={options} />
      </Box>
    </Box>
  );
};

export default HackathonStats;