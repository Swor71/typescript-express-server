import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

class PostRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetPosts(req: Request, res: Response): void {
    Post.find({})
      .then(data => {
        const status = res.statusCode;
        res.json({
          status,
          data
        });
      })
      .catch(err => {
        const status = res.statusCode;
        res.json({
          status,
          err
        });
      });
  }
  public GetPost(req: Request, res: Response): void {}
  public CreatePosts(req: Request, res: Response): void {}
  public UpdatePosts(req: Request, res: Response): void {}
  public DeletePosts(req: Request, res: Response): void {}

  routes() {
    this.router.get('/', this.GetPosts);
  }
}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
