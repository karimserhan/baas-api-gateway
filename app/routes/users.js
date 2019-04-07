import { Router } from 'express';

const router = Router();

/// NOTE: dummy for now

router.get('/:userId', (req, res) => {
    return res.send(`Received a GET request for user ${req.params.userId}`);
});

export default router;