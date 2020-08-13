/* eslint-disable consistent-return */
// Import all dependencies & middleware here
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoError } from 'mongodb';
import HttpStatus from 'http-status-codes';

import { userRouter, artistRouter, trackRouter } from './routers';

// Init an Express App.
const app = express();

// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use all controllers(APIs) here
app.use('/user', userRouter);
app.use('/artist', artistRouter);
app.use('/track', trackRouter);

// eslint-disable-next-line prefer-arrow-callback
app.use(function handleDatabaseError(error, request, response, next) {
  if (error instanceof MongoError) {
    if (error.code === 11000) {
      return response
        .status(HttpStatus.CONFLICT)
        .json({
          httpStatus: HttpStatus.CONFLICT,
          type: 'MongoError',
          message: error.message,
        });
    }
    return response.status(503).json({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      type: 'MongoError',
      message: error.message,
    });
  }
  next(error);
});

// Start Server here
app.listen(8080, () => {
  console.log('Server is running on port 8080!');
  mongoose.connect('mongodb://localhost/mus_recommend').then(() => {
    console.log('Connected to MongoDB at port 27017');
  });
});
