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
  Tabs,
  Tab,
} from '@mui/material';
import { Box } from '@mui/system';

const CSV_URL = '/colombian_news_info.csv';
const MANIZALES_NEWS_CSV = '/manizales_news_info.csv'; // Update this path

function News() {
  const [articles, setArticles] = useState([]);
  const [manizalesArticles, setManizalesArticles] = useState([]);
  const [showPopUp, setPopUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const togglePopUp = () => {
    setPopUp(!showPopUp);
  };

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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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
    Papa.parse(MANIZALES_NEWS_CSV, {
      download: true,
      header: true,
      delimiter: '|',
      complete: (results) => {
        const parsedData = results.data.map((row) => ({
          headline: row['Headline'],
          url: row['URL'],
        }));
        const filteredData = parsedData.filter(val => val.headline !== '');
        setManizalesArticles(filteredData);
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
            Colombian News For Expats
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Medellin" />
            <Tab label="Manizales" />
            <Tab label="About" />
          </Tabs>
        </Toolbar>
      </AppBar>

      {selectedTab === 0 && (
        <div>
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
            Medellin Articles from {currentDate}
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
        </div>
      )}

      {selectedTab === 1 && (
        <div>
          {/* Manizales Content */}
          <Box mt={4} mb={2}>
            <Typography variant="h5" component="p" gutterBottom>
              Stay updated with Manizales news just like the locals do.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Know when events happen the second they're known.
            </Typography>
          </Box>

          {/* Articles Section */}
          <Typography variant="h4" component="h2" gutterBottom>
            Manizales Articles from {currentDate}
          </Typography>
          <Grid container spacing={3}>
            {manizalesArticles.map((article, index) => (
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
        </div>
      )}

      {selectedTab === 2 && (
        <div>
          {/* About Content */}
          <Box mt={4} mb={2}>
            <Typography variant="h4" component="h2" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Made by{' '}
              <Link href="https://www.linkedin.com/in/therealraymondjones/" target="_blank">
                Raymond Jones
              </Link>
            </Typography>
          </Box>
        </div>
      )}
    </Container>
  );
}

export default News;
