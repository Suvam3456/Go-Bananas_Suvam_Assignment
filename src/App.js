import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState('');

  const apiKey = 'ua8uk05wDejji3PQvHFFjkEAZnpyaTp8HYmyLuDJref02NiKYQ9Axfd8';

  const fetchPhotos = (query = '') => {
    const url = query ? `https://api.pexels.com/v1/search?query=${query}` : 'https://api.pexels.com/v1/curated';
    axios.get(url, { headers: { Authorization: apiKey } })
      .then(response => setPhotos(response.data.photos))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      fetchPhotos(search);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Photo Gallery</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TextField 
          label="Search Photos" 
          variant="outlined" 
          fullWidth 
          margin="normal" 
          onChange={(e) => setSearch(e.target.value)} 
          onKeyPress={handleSearch}
        />
        <Grid container spacing={4}>
          {photos.map(photo => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt={photo.photographer}
                  height="200"
                  image={photo.src.medium}
                />
                <CardContent>
                  <Typography variant="h6">{photo.photographer}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
