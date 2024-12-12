const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve videos statically from the "videos" folder
app.use('/videos', express.static(path.join(__dirname, 'videos')));

// API to get a list of videos in the "videos" folder
app.get('/api/videos', (req, res) => {
  const videoDir = path.join(__dirname, 'videos');

  fs.readdir(videoDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan folder' });
    }

    // Filter only .mp4 files (you can add more extensions if needed)
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    res.json(videoFiles);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
