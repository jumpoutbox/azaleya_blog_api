import { Router } from 'express';
import { StatusCodes} from 'http-status-codes';

const router = Router();

router.get('/', (req, res) => {
      return res.send("Welcome to Our AZALEYA API Blog");
});

router.post("/postagem", (req, res) => {
  console.log(req.body);

  return res.status(StatusCodes.ACCEPTED).send(req.body);
})

interface Home {
    
}

export {router};