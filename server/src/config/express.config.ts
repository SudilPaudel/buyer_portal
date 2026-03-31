import express, { Request, Response,NextFunction, Application } from "express";
import cors from "cors";
import Joi from "joi";
import helmet from "helmet";
import mainRouter from "./routing.config";
import morgan from "morgan";
import { errorMiddleware } from "../middlewares/eerror.middleware";

const app: Application = express();

//Preventing from unethical users
app.use(helmet());

//Allowing cross-origin requests
app.use(cors());

//Logging HTTP requests
app.use(morgan("dev"));

//Parsing incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

//health check endpoint
router.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Pong!' });
});

app.use(router);
app.use('/api', mainRouter);

//404 error Handeller
app.use(errorMiddleware);
export default app;