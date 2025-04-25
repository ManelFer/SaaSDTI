import { Router } from 'express';
import ordensRoutes from './ordens.routes.js';
import setoresRoutes from './setores.routes.js';

const router = Router();

router.use('/ordens', ordensRoutes);
router.use('/setores', setoresRoutes);

export default router;