import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { verifyToken } from '../middlewares/index.js'

const router = Router()

router.post('/signup', authController.signupController)
router.post('/signin', authController.signinController)
router.post('/verifymail', authController.verifyController)
router.post('/register', verifyToken, authController.registerController)
router.post('/googlelogin', authController.googleLoginController)
router.post('/microsoftlogin', authController.microsoftLoginController)

router.post('/resendmail', authController.resendMailController)



export default router;