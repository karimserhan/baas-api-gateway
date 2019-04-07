function authenticate(req, res, next) {
    console.log("intercepted")
    next()
}

export default {
    authenticate
}