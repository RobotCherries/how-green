import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import { createConnection } from "typeorm";
import { routes } from './routes/routes';

createConnection().then(() => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: ['http://localhost:8081', 'http://localhost:4200'],
        credentials: true
    }));

    // app.use('/api/auth', authRoutes);
    // app.use('/api/projects', projectRoutes);
    routes(app);

    app.listen(8080, () => {
        console.log('listening to port 8080')
    });
})

