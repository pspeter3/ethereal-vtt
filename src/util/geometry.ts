/**
 * Vector in x,y space.
 */
export type Vector = readonly [number, number];

/**
 * Calculate the distance between two vectors using alternating diagonals.
 * @param src The source vector
 * @param dst The destination vector
 */
export function distance([sx, sy]: Vector, [dx, dy]: Vector): number {
    const [x, y] = [Math.abs(sx - dx), Math.abs(sy - dy)];
    const max = Math.max(x, y);
    const min = Math.min(x, y);
    return max - min + Math.floor(1.5 * min);
}
