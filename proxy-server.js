import express from 'express';
import axios from 'axios';
import https from 'https';
import cors from "cors";

const app = express();
const PORT = 8000; // You can choose any available port

const corsOptions = {
    origin: '*',
  };
  
  app.use(cors(corsOptions));

// Define a route for the proxy
app.get('/proxy', async (req, res) => {
  try {
    const externalResponse = await axios.get('http://header.safaricombeats.co.ke/',{
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
            // requestCert: false,
            // agent: false,
         
        })
    });
    
    // Modify headers or enrich data as needed
    
    res.status(200).send(externalResponse.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send('Proxy error');
  }
});

// Start the proxy server
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
