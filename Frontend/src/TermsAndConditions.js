// TermsAndConditions.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function TermsAndConditions() {
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h4" component="h2" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          **Last updated:** [Date]
        </Typography>

        <Typography variant="body1" paragraph>
          Please read these terms and conditions carefully before using our service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using our service, you agree to be bound by these terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Service Description
        </Typography>
        <Typography variant="body1" paragraph>
          We provide news updates to digital nomads via email subscriptions.
        </Typography>

        <Typography variant="h6" gutterBottom>
          User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to provide accurate information and to use the service lawfully.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We may terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms and Conditions, please contact us at [Your Contact Information].
        </Typography>
      </Box>
    </Container>
  );
}

export default TermsAndConditions;
