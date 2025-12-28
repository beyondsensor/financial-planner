import 'dotenv/config';
import { app } from './app';
import { logger } from './lib/logger';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Backend server is running on http://localhost:${PORT}`);
    logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
