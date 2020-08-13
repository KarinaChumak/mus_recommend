import express from 'express';
import sha256 from 'sha256';
import { User } from '../database/models';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  User.find({}, (err, result) => {
    res.status(200).json(
      {
        data: result,
      },
    );
  });
})
  .post('/', (req, res) => {
    const { email, password } = req.body;
    const userData = {
      email,
      hashedPassword: sha256(password),
    };
    const newUser = new User(userData);
    newUser
      .save()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(() => {
        res.status(400).send('Unable to save data to db');
      });
  });

export default userRouter;
