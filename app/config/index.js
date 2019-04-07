import 'dotenv/config';
import _, {merge} from 'lodash';

const configJson = require('./config.json');
const defaultConfig = configJson.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = configJson[environment];
const config = _.merge(defaultConfig, environmentConfig);

export default config;