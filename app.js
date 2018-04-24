import express from "express";
const app = express();
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
import route from './server/route/route.js';
import volleyball from 'volleyball';
app.use(volleyball);
app.use("/api/v1", route);

app.get('*', (req, res) => {
 return res.json("welcome to the beginning")
});
app.listen(process.env.PORT || '5000', (err) => {
  console.log("server is running");
});
export default app;