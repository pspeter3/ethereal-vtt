/**
 * Position with x, y coordinates.
 */
export type Position = readonly [x: number, y: number];
/**
 * Line between two positions.
 */
export type Line = readonly [src: Position, dst: Position];
/**
 * Path defined by a sequence of positions.
 */
export type Path = ReadonlyArray<Position>;

/**
 * Calculate the distance between two positions using alternating diagonals.
 * @param src The source position.
 * @param dst The destination position.
 */
export function distance([sx, sy]: Position, [dx, dy]: Position): number {
    const [x, y] = [Math.abs(sx - dx), Math.abs(sy - dy)];
    const max = Math.max(x, y);
    const min = Math.min(x, y);
    return max - min + Math.floor(1.5 * min);
}

/**
 * Calculate the distance between two positions using Euclidean distance.
 * @param src The source position.
 * @param dst The destination position.
 */
export function euclidean([sx, sy]: Position, [dx, dy]: Position): number {
    return Math.sqrt(Math.pow(dx - sx, 2) + Math.pow(dy - sy, 2));
}

/**
 * Measure the length of a path using alternating diagonals.
 * @param path The path to measure.
 */
export function measure(path: Path): number {
    return path.reduce((sum, position, index) => {
        if (index === 0) {
            return sum;
        }
        return sum + distance(path[index - 1], position);
    }, 0);
}
