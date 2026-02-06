/**
 * 產險 MCP 安全層
 * 重點：PII 資料遮蔽 (符合 DLP 規範)
 */

export const maskPII = (text: string): string => {
  // 1. 遮蔽台灣身分證字號 (Regex)
  let result = text.replace(/[A-Z][12]\d{8}/g, ' [ID_MASKED] ');

  // 2. 遮蔽電話號碼
  result = result.replace(/09\d{8}/g, ' [PHONE_MASKED] ');

  // 3. 遮蔽電子郵件
  result = result.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    ' [EMAIL_MASKED] '
  );

  return result;
};

export const auditLog = (action: string, metadata: Record<string, unknown>) => {
  console.log(
    `[稽核日誌] ${new Date().toISOString()} - 動作: ${action}`,
    metadata
  );
};
