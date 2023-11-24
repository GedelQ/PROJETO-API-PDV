import express from 'express';
import cRoute1 from '../controllers/cRoute1.js';

const route1 = express();

route1.get("/route1", cRoute1.cRoute1);

export default route1;