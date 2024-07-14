const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  projectName: { type: String, required: true },
  projectDescription: { type: String },
  teamMembers: [String],
  awards: [String],
  repositoryLink: String,
  demoLink: String,
  won: { type: Boolean, default: false },
});

module.exports = mongoose.model('Hackathon', hackathonSchema);