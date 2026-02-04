/**
 * Security Layer for InsureTech MCP
 * Focus: PII Data Masking (DLP Compliance)
 */

export const maskPII = (text: string): string => {
  // 1. Mask Taiwan National ID (regex)
  let result = text.replace(/[A-Z][12]\d{8}/g, " [ID_MASKED] ");
  
  // 2. Mask Phone Numbers
  result = result.replace(/09\d{8}/g, " [PHONE_MASKED] ");
  
  // 3. Mask Emails
  result = result.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, " [EMAIL_MASKED] ");

  return result;
};

export const auditLog = (action: string, metadata: any) => {
  console.log(`[AUDIT] ${new Date().toISOString()} - Action: ${action}`, metadata);
};
