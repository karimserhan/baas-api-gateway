import Joi from 'joi'

// Defines default validation routine to be used for APIs:
//      Unknown keys are not allowed
//      On error return 422 response with error object
function Validator() {}

Validator.prototype.validate = function(data, schema, response, successCallback) {
    Joi.validate(data, schema, { allowUnknown: false }, (err, value) => {
        if (err) {
            return response.status(422).send({
                error: err
            });
        } else {
            // call successCallback with validated data
            successCallback(value);
        }
    });
}

export default Validator;