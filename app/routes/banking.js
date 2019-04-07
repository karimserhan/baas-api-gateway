import { Router } from 'express';
import Joi from 'joi'
import Validator from 'app/util/validation'

const router = Router();
const validator = new Validator();

/// NOTE: skeleton routes for now

router.get('/getAvailableBanks', (req, res) => {
    console.log('getAvailableBanks called');
    
    return res.status(200).send({
        banks: [ "SGBL", "Audi" ]
    });
});

router.post('/authenticateToBank', (req, res) => {
    console.log('authenticateToBank called');

    // Validate incoming data. Note: bankAuthData must be validated by specific connector
    const schema = Joi.object().keys({
        bankId: Joi.number().integer().required(),
        bankAuthData: Joi.any().required()
    });

    validator.validate(req.body, schema, res, (validatedData) => {
        // TODO: do something with validatedData
        return res.status(200).send({
            token: "heresyourtoken"
        });
    });
});

export default router;