import express, { Express } from "express";
import { dbConnection } from "../database/config";
import cors from "cors";
import authRoutes from "../routes/auth";
import ordersRoutes from "../routes/orders";
import issueRoutes from "../routes/issues";
export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;
  issuePath: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.ordersPath = "/orders";
    this.issuePath = "/issues";
    this.conectarDB();
    this.middlewares();
    this.routes();
  }
  async conectarDB(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.ordersPath, ordersRoutes);
    this.app.use(this.issuePath, issueRoutes);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
