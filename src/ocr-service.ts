import { createWorker } from 'tesseract.js';

interface ReceiptData {
  merchantName?: string;
  date?: string;
  totalAmount?: number;
  rawText: string;
}

/**
 * OCR 服務：解析收據內容
 */
export const parseReceipt = async (imagePath?: string): Promise<ReceiptData> => {
  // 1. Mock 模式：如果沒有提供路徑，回傳假資料
  if (!imagePath) {
    console.log('[OCR] No image path provided, returning Mock data.');
    return {
      merchantName: '測試診所',
      date: '2026-02-07',
      totalAmount: 1500,
      rawText: '測試診所 收據\n日期: 2026-02-07\n金額: 1500元\n科別: 內科',
    };
  }

  // 2. 真實 OCR 模式 (使用 Tesseract.js)
  console.log(`[OCR] Processing image: ${imagePath}`);
  
  try {
    const worker = await createWorker('chi_tra'); // 使用繁體中文
    const ret = await worker.recognize(imagePath);
    const text = ret.data.text;
    await worker.terminate();

    // 這裡可以加入簡單的 Regex 來提取金額 (簡易實作)
    const amountMatch = text.match(/(\d+)(?:元|圓)/);
    const amount = amountMatch ? parseInt(amountMatch[1], 10) : undefined;

    return {
      rawText: text,
      totalAmount: amount,
    };
  } catch (error) {
    console.error('[OCR] Recognition failed:', error);
    throw new Error('OCR processing failed');
  }
};
