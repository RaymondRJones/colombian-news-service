// News.js

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Container,
  Typography,
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
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles, useTheme } from '@mui/styles';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import MenuIcon from '@mui/icons-material/Menu';

const CSV_URL = '/colombian_news_info.csv';
const MANIZALES_NEWS_CSV = '/manizales_news_info.csv';

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginLeft: 'auto',
  },
  menuButton: {
    marginLeft: 'auto',
    color: '#fff',
  },
  toolbarMargin: theme.mixins.toolbar,
  logo: {
    textDecoration: 'none',
    color: '#fff',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function News() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [articles, setArticles] = useState([]);
  const [manizalesArticles, setManizalesArticles] = useState([]);
  const [showPopUp, setPopUp] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const togglePopUp = () => {
    setPopUp(!showPopUp);
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
      body: JSON.stringify({ email, phone }),
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event, index) => {
    setAnchorEl(null);
    if (typeof index === 'number') {
      setSelectedTab(index);
    }
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
        const filteredData = parsedData.filter((val) => val.headline !== '');
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
        const filteredData = parsedData.filter((val) => val.headline !== '');
        setManizalesArticles(filteredData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  const currentDate = new Date().toLocaleDateString();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="#"
            className={classes.logo}
            sx={{ flexGrow: 1 }}
          >
            Colombian News For Expats
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                className={classes.menuButton}
                onClick={handleMenuOpen}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                keepMounted
              >
                {['Medellin', 'Manizales', 'About', 'Privacy Policy', 'Terms and Conditions'].map(
                  (label, index) => (
                    <MenuItem key={index} onClick={(event) => handleMenuClose(event, index)}>
                      {label}
                    </MenuItem>
                  ),
                )}
              </Menu>
            </>
          ) : (
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              className={classes.tabContainer}
            >
              <Tab label="Medellin" />
              <Tab label="Manizales" />
              <Tab label="About" />
              <Tab label="Privacy Policy" />
              <Tab label="Terms & Conditions" />
            </Tabs>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {selectedTab === 0 && (
          <div>
            <Box mt={4} mb={4} textAlign="center">
              <Typography variant="h4" gutterBottom>
                Stay Informed with Medellin News
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Get the latest updates on events, news, and happenings in Medellin (Sourced from top Colombian news outlets)
              </Typography>
            </Box>

            <Box mb={4} textAlign="center">
              <Button
                onClick={togglePopUp}
                variant="contained"
                color="secondary"
                size="large"
                disableElevation
              >
                Subscribe for Updates
              </Button>
            </Box>

            <Dialog open={showPopUp} onClose={togglePopUp}>
              <DialogTitle>Subscribe for News Updates</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your email or phone number to receive updates about breaking news in
                  Medellin or Manizales.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="contact-email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={handleEmail}
                />
                <TextField
                  margin="dense"
                  id="contact-phone"
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  value={phone}
                  onChange={handleNumber}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={togglePopUp} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>

            <Typography variant="h5" component="h2" gutterBottom>
              Latest Medellin Articles - {currentDate}
            </Typography>
            <Grid container spacing={4}>
              {articles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className={classes.card} elevation={3}>
                    <CardActionArea
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.cardContent}
                    >
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
                        Read More
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
            <Box mt={4} mb={4} textAlign="center">
              <Typography variant="h4" gutterBottom>
                Stay Updated with Manizales News
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Get the latest updates on events, news, and happenings in Manizales.
              </Typography>
            </Box>

            <Typography variant="h5" component="h2" gutterBottom>
              Latest Manizales Articles - {currentDate}
            </Typography>
            <Grid container spacing={4}>
              {manizalesArticles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className={classes.card} elevation={3}>
                    <CardActionArea
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.cardContent}
                    >
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
                        Read More
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
            <Box mt={4} mb={4} textAlign="center">
              <Typography variant="h4" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                We aim to keep digital nomads and expats informed about the latest news in
                Medellin and Manizales. Stay connected with the local happenings and make the most
                of your time here.
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Developed by{' '}
                <Link
                  href="https://www.linkedin.com/in/therealraymondjones/"
                  target="_blank"
                  rel="noopener"
                  color="secondary"
                >
                  Raymond Jones
                </Link>
              </Typography>
            </Box>
          </div>
        )}

        {selectedTab === 3 && <PrivacyPolicy />}

        {selectedTab === 4 && <TermsAndConditions />}
      </Container>
    </React.Fragment>
  );
}

export default News;
