/**
 * Computes the factorial of a non-negative integer n (n!).
 *
 * @param n - A non-negative integer (0 ≤ n ≤ 170)
 * @returns The factorial of n
 * @throws {Error} If n is negative, not an integer, or greater than 170 (which would exceed JavaScript's safe number range)
 */
export function factorial(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    if (n > 170) {
        throw new Error('Input must not exceed 170 to avoid numeric overflow');
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
