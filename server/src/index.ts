import dotenv from 'dotenv';
import http from 'http';
import app from './config/express.config';
import { AppDataSource } from './config/pg_db.config';

dotenv.config();

const PORT = Number(process.env.PORT) || 9004;
const server = http.createServer(app);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
      console.log("Press CTRL+C to stop the server");
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });