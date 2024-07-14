import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material'; // Updated import

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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
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
        label="Awards (comma-separated)"
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Hackathon
      </Button>
    </Box>
  );
};

export default AddHackathonForm;
