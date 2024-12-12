const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve the "videos" folder statically
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// Serve the "index.html" file on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API to get a list of videos
app.get('/api/videos', (req, res) => {
  const videoDir = path.join(__dirname, 'videos');

  fs.readdir(videoDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan folder' });
    }

    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    res.json(videoFiles);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
