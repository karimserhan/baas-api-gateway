import cors from 'cors';
import config from 'app/config'

// Set up allowed cross origin domains, as defined in config
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || config.whitelistedDomains.findIndex(item => origin.toLowerCase() === item.toLowerCase()) !== -1) {
      callback(null, true)
    } 
    else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const corsConfig = cors(corsOptions);

export default {
    corsConfig
}