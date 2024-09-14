// PrivacyPolicy.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          **Last updated:** 2024-09-13
        </Typography>
        <Typography variant="body1" paragraph>
          This Privacy Policy describes how we collect, use, and disclose your personal information when you use our service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect your email address and phone number when you sign up for our email subscriptions to receive news articles.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          Your information is used solely for the purpose of sending you news updates. We store your data securely on DynamoDB, encrypted at rest.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Disclosure of Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not share your personal information with third parties unless required by law.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You can request to unsubscribe from our service at any time by messaging us.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at raymond@raymondjones.dev.
        </Typography>
      </Box>
    </Container>
  );
}

export default PrivacyPolicy;
