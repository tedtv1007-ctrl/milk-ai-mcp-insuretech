import express, { Request, Response } from 'express';
import { maskPII, auditLog } from './security';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Milk AI MCP InsureTech Server is running.');
});

/**
 * Main processing endpoint
 * Expects a JSON body with a "text" property
 * e.g., { "text": "這是我的身分證 A123456789 和手機 0987654321。" }
 */
app.post('/api/process', (req: Request, res: Response) => {
  const { text } = req.body;

  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Request body must contain a "text" property of type string.' });
  }

  // Log the original action (in a real app, you might log more metadata)
  auditLog('process_request_start', { original_length: text.length });

  // Sanitize the text
  const sanitizedText = maskPII(text);

  // Log the result
  auditLog('process_request_finish', { sanitized_length: sanitizedText.length });

  res.status(200).json({
    original: text,
    sanitized: sanitizedText,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
