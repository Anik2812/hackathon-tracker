import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Switch } from '@mui/material';

const AddHackathonForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    projectName: '',
    projectDescription: '',
    teamMembers: '',
    awards: '',
    repositoryLink: '',
    demoLink: '',
    won: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      date: '',
      projectName: '',
      projectDescription: '',
      teamMembers: '',
      awards: '',
      repositoryLink: '',
      demoLink: '',
      won: false,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <FormControlLabel
        control={
          <Switch
            checked={formData.won}
            onChange={handleChange}
            name="won"
            color="primary"
          />
        }
        label="Won the Hackathon"
      />
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Hackathon Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="date"
        label="Date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="projectName"
        label="Project Name"
        value={formData.projectName}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="projectDescription"
        label="Project Description"
        multiline
        rows={4}
        value={formData.projectDescription}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="teamMembers"
        label="Team Members (comma-separated)"
        value={formData.teamMembers}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="awards"
        label="Awards"
        value={formData.awards}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="repositoryLink"
        label="Repository Link"
        value={formData.repositoryLink}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        name="demoLink"
        label="Demo Link"
        value={formData.demoLink}
        onChange={handleChange}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Add Hackathon
        </Button>
      </Box>
    </Box>
  );
};

export default AddHackathonForm;
