import express, { Express, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { logger } from './lib/logger';
import { swaggerSpec } from './lib/swagger';
import { router } from './routes/index';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Morgan for request logging - pipe to winston
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message: string) => logger.info(message.trim()),
    },
}));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', router);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.message, { stack: err.stack });
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

export { app };
