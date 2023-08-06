import { Router } from 'express';
import { StatusCodes} from 'http-status-codes';
import { UserController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
      return res.send("Welcome to Our AZALEYA API Blog");
});

router.get("/user", (req, res) => {
  console.log(req.body);

  return res.status(StatusCodes.ACCEPTED).send(req.body);
})

/* User Router */

router.post('/user', UserController.validationBody , UserController.create);

/* * Router */

interface Home {
    
}

export {router};