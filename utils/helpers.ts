// Random data generators

export const randomString = (length = 8): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

export const randomEmail = (): string =>
  `qa.test.${randomString(6)}@demo.com`;

export const randomPrice = (min = 1, max = 999): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

// Date helpers 

export const todayAsString = (): string =>
  new Date().toISOString().split('T')[0];

// Validation helpers

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPrice = (price: number): boolean =>
  typeof price === 'number' && price > 0;

// Wait helper
// Use sparingly — prefer Playwright's built-in waitFor methods

export const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// API response helpers 

export const assertHasKeys = (obj: object, keys: string[]): void => {
  keys.forEach(key => {
    if (!(key in obj)) {
      throw new Error(`Missing key "${key}" in response: ${JSON.stringify(obj)}`);
    }
  });
};