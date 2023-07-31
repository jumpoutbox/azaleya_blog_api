import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
      return res.send("Welcome to Our AZALEYA API Blog");
});

interface Home {
    
}

export {router};