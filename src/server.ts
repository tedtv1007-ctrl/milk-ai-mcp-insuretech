import express, { Request, Response } from 'express';
import { maskPII, auditLog } from './security';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

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
    return res.status(400).json({
      error: 'Request body must contain a "text" property of type string.',
    });
  }

  // Log the original action (in a real app, you might log more metadata)
  auditLog('process_request_start', { original_length: text.length });

  // Sanitize the text
  const sanitizedText = maskPII(text);

  // Log the result
  auditLog('process_request_finish', {
    sanitized_length: sanitizedText.length,
  });

  res.status(200).json({
    original: text,
    sanitized: sanitizedText,
  });
});

import { parseReceipt } from './ocr-service';
import { checkPolicyExclusions } from './tools';

// ... (在 app.listen 之前)

/**
 * Exclusion Check Endpoint
 * POST /api/check-exclusions
 */
app.post('/api/check-exclusions', async (req: Request, res: Response) => {
  const { claimDescription, policyId } = req.body;

  if (typeof claimDescription !== 'string') {
    return res.status(400).json({ error: 'Missing claimDescription' });
  }

  const result = await checkPolicyExclusions(claimDescription, policyId || 'default');
  res.status(200).json(result);
});

/**
 * OCR Endpoint
 * POST /api/ocr
 * Body: { "imagePath": "/path/to/image.jpg" } (Optional)
 */
app.post('/api/ocr', async (req: Request, res: Response) => {
  try {
    const { imagePath } = req.body;
    // 呼叫 OCR 服務 (如果沒傳 imagePath，會回傳 Mock)
    const result = await parseReceipt(imagePath);
    res.status(200).json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'OCR failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
