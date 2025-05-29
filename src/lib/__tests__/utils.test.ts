
import { cn } from '../utils';

describe('utils', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      const result = cn('text-white', 'bg-blue-500');
      expect(result).toBe('text-white bg-blue-500');
    });

    it('handles conditional classes', () => {
      const result = cn('text-white', false && 'hidden', 'bg-blue-500');
      expect(result).toBe('text-white bg-blue-500');
    });

    it('handles undefined and null values', () => {
      const result = cn('text-white', undefined, null, 'bg-blue-500');
      expect(result).toBe('text-white bg-blue-500');
    });

    it('merges conflicting tailwind classes', () => {
      const result = cn('text-white text-black');
      expect(result).toContain('text-black');
    });
  });
});
