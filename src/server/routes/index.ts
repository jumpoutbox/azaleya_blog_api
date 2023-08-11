import { Router } from 'express';
import { StatusCodes} from 'http-status-codes';
import { AuthorController } from '../controllers';
import { getById } from '../controllers/Author/GetById';
import { updateById, updateByIdValidation } from '../controllers/Author/UpdateById';
import { deleteById } from '../controllers/Author/DeleteById';
import { CategoryController } from '../controllers/Category';

const router = Router();

router.get('/', (req, res) => {
      return res.send("Welcome to Our AZALEYA API Blog");
});

router.get("/user", (req, res) => {
  console.log(req.body);

  return res.status(StatusCodes.ACCEPTED).send(req.body);
})

/* Author Router */

router.get('/author/:id', AuthorController.getById, AuthorController.getById);
router.get('/author', AuthorController.getAllValidation, AuthorController.getAll);
router.post('/author', AuthorController.validationBody , AuthorController.create);
router.put('/author/:id', AuthorController.updateByIdValidation, AuthorController.updateById);
router.delete('/author/:id', AuthorController.deleteByIdValidation, AuthorController.deleteById);


/* Category Router */

router.get('/category/:id', CategoryController.getById, CategoryController.getById);
router.get('/category', CategoryController.getAllValidation, CategoryController.getAll);
router.post('/category', CategoryController.validationBody , CategoryController.create);
router.put('/category/:id', CategoryController.updateByIdValidation, CategoryController.updateById);
router.delete('/category/:id', CategoryController.deleteByIdValidation, CategoryController.deleteById);


/* * Router */

interface Home {
    
}

export {router};