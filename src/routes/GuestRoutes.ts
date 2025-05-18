import { Request, Router, Response } from 'express';

const router = Router();

router.route('/guest')
.get((req: Request, res: Response) => {
  res.send('GET guest')
})
.post((req: Request, res: Response) => {
  res.send('POST guest')
})
.put((req: Request, res: Response) => {
  res.send('PUT guest')
})
.delete((req: Request, res: Response) => {
  res.send('DELETE guest')
})