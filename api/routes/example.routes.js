import express from 'express';
import exampleController from '../controllers/example.controller.js';
import verifyToken from '../middlewares/jwt.token.middleware.js';

const router = express.Router();

router.get('/', verifyToken, exampleController.securedExample);

export default router;