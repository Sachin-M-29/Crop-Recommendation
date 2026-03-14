/**
 * Computes the factorial of a non-negative integer.
 * factorial(0) = 1
 * factorial(n) = n * factorial(n - 1)  for n > 0
 *
 * @param n - A non-negative integer
 * @returns The factorial of n
 * @throws {Error} When n is negative, not an integer, or greater than 170
 */
export function factorial(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    if (n > 170) {
        throw new Error('Input must be 170 or less (factorial(171) overflows Number.MAX_VALUE)');
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
