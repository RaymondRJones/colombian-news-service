import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Container,
  Typography,
  List,
  Link,
  CssBaseline,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import { Box } from '@mui/system';

const CSV_URL = '/colombian_news_info.csv';

function News() {
  const [articles, setArticles] = useState([]);
  const [showPopUp, setPopUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const togglePopUp = () => {
    setPopUp(!showPopUp);
  }

  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleNumber = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = () => {
    fetch('https://qabb6ku1bb.execute-api.us-east-1.amazonaws.com/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        togglePopUp();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      delimiter: '|',
      complete: (results) => {
        const parsedData = results.data.map((row) => ({
          headline: row['Headline'],
          url: row['URL'],
        }));
        const filteredData = parsedData.filter(val => val.headline !== '');
        setArticles(filteredData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  const currentDate = new Date().toLocaleDateString();

  return (
    <Container maxWidth="md">
      <CssBaseline />

      {/* Navigation Bar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Medellin News For Expats
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>

      {/* Description Section */}
      <Box mt={4} mb={2}>
        <Typography variant="h5" component="p" gutterBottom>
          Always stay up to date with Medellin news just like the locals do.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Know when protests, robberies, and other events happen the second they're known.
        </Typography>
      </Box>

      {/* Call to Action Button */}
      <Box mb={4}>
        <Button onClick={togglePopUp} variant="contained" color="secondary" size="large">
          Text / Email Me of Breaking News
        </Button>
      </Box>
      
      {/* Popup Dialog */}
      <Dialog open={showPopUp} onClose={togglePopUp}>
        <DialogTitle>Add Your Email or Phone Number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email or phone number to receive updates about breaking news in Medellin.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="contact"
            label="Your Email"
            type="text"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleEmail}
          />
          <TextField
            autoFocus
            margin="dense"
            id="contact"
            label="Your Number (If you want texts alerts)"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleNumber}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePopUp} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Articles Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Articles from {currentDate}
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea href={article.url} target="_blank" rel="noopener noreferrer">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {article.headline}
                  </Typography>
                </CardContent>

              </CardActionArea>
                <CardActions>
                {/* View Article Button */}
                <Button
                  size="small"
                  color="primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View article
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        </Grid>
        <p> Made by <a href="https://www.linkedin.com/in/therealraymondjones/"> Raymond Jones </a></p>
    </Container>
  );
}

export default News;

