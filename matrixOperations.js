const MatrixOps = {
    transpose: function(matrix) {
        if (typeof matrix === 'number') return matrix;
        const rows = matrix.length;
        const cols = matrix[0].length;
        return Array(cols).fill().map((_, c) => 
            Array(rows).fill().map((_, r) => matrix[r][c])
        );
    },
    determinant: function(matrix) {
        if (typeof matrix === 'number') return matrix;
        const rows = matrix.length;
        const cols = matrix[0].length;
        if (rows !== cols) throw new Error('Matrix must be square for determinant');
        if (rows === 1) return matrix[0][0];
        if (rows === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        if (rows === 3) {
            const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
            const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
            const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];
            return a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g);
        }
        throw new Error('Determinant for matrices larger than 3x3 not implemented');
    },
    inverse: function(matrix) {
        if (typeof matrix === 'number') return matrix === 0 ? NaN : 1 / matrix;
        const rows = matrix.length;
        const cols = matrix[0].length;
        if (rows !== cols) throw new Error('Matrix must be square for inverse');
        if (rows === 1) return [[1 / matrix[0][0]]];
        if (rows === 2) {
            const det = MatrixOps.determinant(matrix);
            if (det === 0) throw new Error('Matrix is not invertible');
            const invDet = 1 / det;
            return [
                [matrix[1][1] * invDet, -matrix[0][1] * invDet],
                [-matrix[1][0] * invDet, matrix[0][0] * invDet]
            ];
        }
        if (rows === 3) {
            const det = MatrixOps.determinant(matrix);
            if (det === 0) throw new Error('Matrix is not invertible');
            const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
            const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
            const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];
            const adj = [
                [e*i - f*h, c*h - b*i, b*f - c*e],
                [f*g - d*i, a*i - c*g, c*d - a*f],
                [d*h - e*g, b*g - a*h, a*e - b*d]
            ];
            const invDet = 1 / det;
            return adj.map(row => row.map(val => val * invDet));
        }
        throw new Error('Inverse for matrices larger than 3x3 not implemented');
    }
};