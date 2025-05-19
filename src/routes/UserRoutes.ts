import { Request ,Router, Response, NextFunction } from 'express';

const router = Router()

/**router.use((req: Request, res: Response, next: NextFunction) => {
  const respon = veryfylogin
  if (res.status(201) === respon){
    res.send(veryfylogin)
  }
  next()
}) **/

router.route('/:id')
.get((req: Request, res: Response) => {
  const { id } = req.params
  
  res.send(`GET user with id: ${id}`)
})
export default router