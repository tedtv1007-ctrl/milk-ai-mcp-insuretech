import { describe, it, expect } from 'vitest';
import { checkPolicyExclusions, calculateClaim } from './tools';

describe('Tools Module - Exclusion Check', () => {
  it('should detect high risk for drunk driving', async () => {
    const claim = '駕駛人陳大明因為酒駕發生碰撞';
    const result = await checkPolicyExclusions(claim, 'policy-001');
    
    expect(result.isSafe).toBe(false);
    expect(result.riskScore).toBe(100);
    expect(result.matchedExclusions).toContain('被保險人因飲酒駕車');
  });

  it('should sanitize PII in claim description', async () => {
    const claim = '身分證 A123456789 涉及故意破壞';
    const result = await checkPolicyExclusions(claim, 'policy-001');
    
    expect(result.sanitizedClaim).toContain('[ID_MASKED]');
    expect(result.matchedExclusions).toContain('被保險人故意行為');
  });

  it('should return safe for normal accidents', async () => {
    const claim = '停紅燈時被後車追撞';
    const result = await checkPolicyExclusions(claim, 'policy-001');
    
    expect(result.isSafe).toBe(true);
    expect(result.riskScore).toBe(0);
    expect(result.matchedExclusions).toHaveLength(0);
  });
});

describe('Tools Module - Claim Calculation', () => {
  it('should return 0 if loss is below deductible', () => {
    const result = calculateClaim(1000, { limit: 50000, deductible: 2000 });
    expect(result).toBe(0);
  });

  it('should subtract deductible', () => {
    const result = calculateClaim(5000, { limit: 50000, deductible: 2000 });
    expect(result).toBe(3000);
  });

  it('should cap at limit', () => {
    const result = calculateClaim(100000, { limit: 50000, deductible: 2000 });
    expect(result).toBe(50000);
  });
});
