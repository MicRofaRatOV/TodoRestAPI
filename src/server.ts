import express from "express";
import bodyParser from "body-parser";
import todoRoutes from './routes/todoRoutes';


const app = express();
const PORT = 5823;


app.use(bodyParser.json());
app.use('/todo', todoRoutes);


app.listen(PORT, () => {
  console.log(`Todo Rest server started on port: ${PORT}`);
});
