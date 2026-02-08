import { maskPII } from './security';

/**
 * 產險 MCP 工具集
 */

interface PolicyAnalysisResult {
  riskPoints: string[];
  deductible: number;
  coverageLimit: number;
}

/**
 * 分析保單條款 (Mock 實作)
 * @param terms 原始條款文字
 */
export const analyzePolicyTerms = async (
  terms: string
): Promise<PolicyAnalysisResult> => {
  // 進行安全脫敏
  maskPII(terms);

  // 模擬分析邏輯 (未來可對接 LLM)
  return {
    riskPoints: ['涉及不保事項：故意行為', '高風險區域承保限制'],
    deductible: 2000,
    coverageLimit: 1000000,
  };
};

/**
 * 理賠初步試算
 * @param lossAmount 損失金額
 * @param policy 包含限額與自負額的保單物件
 */
export const calculateClaim = (
  lossAmount: number,
  policy: { limit: number; deductible: number }
): number => {
  if (lossAmount <= policy.deductible) return 0;
  const claimable = lossAmount - policy.deductible;
  return Math.min(claimable, policy.limit);
};

interface ExclusionCheckResult {
  isSafe: boolean;
  riskScore: number; // 0-100
  matchedExclusions: string[];
  sanitizedClaim: string;
}

/**
 * 檢查理賠是否涉及不保事項
 * @param claimDescription 理賠事故描述
 * @param policyId 保單範本 ID
 */
export const checkPolicyExclusions = async (
  claimDescription: string,
  _policyId: string
): Promise<ExclusionCheckResult> => {
  // 1. 安全脫敏
  const sanitizedClaim = maskPII(claimDescription);

  // 2. 模擬 RAG：定義常見不保事項關鍵字
  const commonExclusions = [
    { keyword: '酒駕', term: '被保險人因飲酒駕車' },
    { keyword: '吸毒', term: '被保險人吸食毒品' },
    { keyword: '故意', term: '被保險人故意行為' },
    { keyword: '無照', term: '無駕駛執照駕車' },
    { keyword: '犯罪', term: '被保險人因犯罪行為' },
  ];

  // 3. 比對邏輯
  const matched = commonExclusions.filter((ex) =>
    sanitizedClaim.includes(ex.keyword)
  );

  const riskScore = matched.length > 0 ? 100 : 0;

  return {
    isSafe: matched.length === 0,
    riskScore,
    matchedExclusions: matched.map((m) => m.term),
    sanitizedClaim,
  };
};
