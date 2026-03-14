/**
 * Computes the factorial of a non-negative integer n (n!).
 *
 * @param n - A non-negative integer (0 – 170). Values above 170 exceed
 *            JavaScript's Number.MAX_VALUE and will return Infinity.
 * @returns The factorial of n
 * @throws {Error} If n is negative or not an integer
 */
export function factorial(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    if (n > 170) {
        throw new Error('Input must be 170 or less; larger values exceed JavaScript\'s numeric range');
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
