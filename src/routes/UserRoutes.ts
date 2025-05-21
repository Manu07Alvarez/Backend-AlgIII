import { Request , Router, Response } from 'express';

const router = Router()

/**router.use((req: Request, res: Response, next: NextFunction) => {
  const respon = veryfylogin
  if (res.status(201) === respon){
    res.send(veryfylogin)
  }
  next()
}) **/

router.get('/', (req: Request, res: Response) => {
  res.send('GET users')
})

router.route('/:id')
.get((req: Request, res: Response) => {
  const { id } = req.params
  
  res.send(`GET user with id: ${id}`)
})
export default router