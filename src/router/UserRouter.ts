import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetUsers(req: Request, res: Response): void {
    User.find({})
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
  public GetUser(req: Request, res: Response): void {
    const username: string = req.params.username;
    User.findOne({ username })
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
  public CreateUser(req: Request, res: Response): void {
    const name: string = req.body.name;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = new User({
      name,
      username,
      email,
      password
    });

    user
      .save()
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

  public UpdateUser(req: Request, res: Response): void {
    const username: string = req.params.username;
    User.findOneAndUpdate({ username }, req.body)
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

  public DeleteUser(req: Request, res: Response): void {
    const username: string = req.params.username;
    User.findOneAndRemove({ username })
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

  routes() {
    this.router.get('/', this.GetUsers);
    this.router.post('/', this.CreateUser);
    this.router.get('/:slug', this.GetUser);
    this.router.put('/:slug', this.UpdateUser);
    this.router.delete('/:slug', this.DeleteUser);
  }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;
