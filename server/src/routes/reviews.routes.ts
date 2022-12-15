import { Router } from 'express'
import { checkJwt } from '../utils/checkJwt'

const router = Router()

router.get('/reviews', (req, res) => {
 res.status(200).json({ message: 'reviews' })
})

router.get('/protected', checkJwt, (req, res) => {
 res.status(200).json({ message: 'Protected message' })
})

export default router