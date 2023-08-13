import { Router } from 'express';
import { StatusCodes} from 'http-status-codes';
import { AuthorController } from '../controllers';
import { CategoryController } from '../controllers/Category';
import { CommentsController } from '../controllers/Comments';
import { PostsController } from '../controllers/Posts';

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

/* Comments Router */

router.get('/commentary/:id', CommentsController.getById, CommentsController.getById);
router.get('/commentary', CommentsController.getAllValidation, CommentsController.getAll);
router.post('/commentary', CommentsController.validationBody , CommentsController.create);
router.put('/commentary/:id', CommentsController.updateByIdValidation, CommentsController.updateById);
router.delete('/commentary/:id', CommentsController.deleteByIdValidation, CommentsController.deleteById);

/* Comments Router */

router.get('/posts/:id', PostsController.getById, PostsController.getById);
router.get('/posts', PostsController.getAllValidation, PostsController.getAll);
router.post('/posts', PostsController.validationBody , PostsController.create);
router.put('/posts/:id', PostsController.updateByIdValidation, PostsController.updateById);
router.delete('/posts/:id', PostsController.deleteByIdValidation, PostsController.deleteById);


/* * Router */

interface Home {
    
}

export {router};