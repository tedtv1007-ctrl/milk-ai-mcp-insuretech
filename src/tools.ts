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
