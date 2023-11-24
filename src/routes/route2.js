import express from 'express';
import cRoute2 from '../controllers/cRoute2.js';

const route2 = express();

route2.get("/route2", cRoute2.cRoute2);

export default route2;