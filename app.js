import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import volleyball from 'volleyball';
import userRoute from './server/route/user';
import mealRoute from './server/route/meal';
import menuRoute from './server/route/menu';
import orderRoute from './server/route/order';

dotenv.config();

const swaggerDocument = require('./swagger.json');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(volleyball);

// api routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', userRoute);
app.use('/api/v1', menuRoute);
app.use('/api/v1', mealRoute);
app.use('/api/v1', orderRoute);

app.use(express.static(path.join(__dirname, '/client')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './client/index.html')));
app.listen(process.env.PORT || '5000', () => {
  console.log('server is running');
});
export default app;
