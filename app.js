import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import volleyball from 'volleyball';
import userRoute from './server/route/user';
import mealRoute from './server/route/meal';
import menuRoute from './server/route/menu';
import orderRoute from './server/route/order';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(volleyball);
app.use('/api/v1', userRoute);
app.use('/api/v1', menuRoute);
app.use('/api/v1', mealRoute);
app.use('/api/v1', orderRoute);

app.get('*', (req, res) => res.json('welcome to the beginning'));
app.listen(process.env.PORT || '5000', () => {
  console.log('server is running');
});
export default app;
