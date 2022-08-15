import express from 'express';
import PromocionRouter from './anuncio';
import TiposRouter from './tipos';
import EmailRouter from './email';

const app = express();

app.use(PromocionRouter);
app.use(TiposRouter);
app.use(EmailRouter);

module.exports = app;