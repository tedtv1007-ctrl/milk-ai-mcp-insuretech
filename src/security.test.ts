import { describe, it, expect } from 'vitest';
import { maskPII } from './security';

describe('Security Module - PII Masking', () => {
  it('should mask Taiwan National ID', () => {
    const input = 'My ID is A123456789.';
    const expected = 'My ID is  [ID_MASKED] .';
    expect(maskPII(input)).toBe(expected);
  });

  it('should mask mobile phone numbers', () => {
    const input = 'Call me at 0912345678.';
    const expected = 'Call me at  [PHONE_MASKED] .';
    expect(maskPII(input)).toBe(expected);
  });

  it('should mask email addresses', () => {
    const input = 'Contact: test.user@example.com';
    const expected = 'Contact:  [EMAIL_MASKED] ';
    expect(maskPII(input)).toBe(expected);
  });

  it('should handle multiple PIIs in one string', () => {
    const input = 'User A123456789 has phone 0987654321';
    const expected = 'User  [ID_MASKED]  has phone  [PHONE_MASKED] ';
    expect(maskPII(input)).toBe(expected);
  });

  it('should not alter safe text', () => {
    const input = 'This is a safe message.';
    expect(maskPII(input)).toBe(input);
  });
});
