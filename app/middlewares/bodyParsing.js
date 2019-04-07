import express from 'express';

export default {
    jsonParser: express.json(),
    encodedUrlParser: express.urlencoded({ extended: true })
}