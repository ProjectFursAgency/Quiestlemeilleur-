const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestIp.mw());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

const voteSchema = new mongoose.Schema({
  tiktoker: String,
  ip: String
});

const Vote = mongoose.model('Vote', voteSchema);

// Vote endpoint
app.post('/vote', async (req, res) => {
  const { tiktoker } = req.body;
  const ip = req.clientIp;

  const alreadyVoted = await Vote.findOne({ ip });
  if (alreadyVoted) return res.status(403).send('Already voted!');

  const vote = new Vote({ tiktoker, ip });
  await vote.save();
  res.send('Vote saved!');
});

// Get vote counts
app.get('/votes', async (req, res) => {
  const votes = await Vote.aggregate([
    { $group: { _id: "$tiktoker", count: { $sum: 1 } } }
  ]);
  res.json(votes);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
