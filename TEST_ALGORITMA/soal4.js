const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

function diagonalDifference(matrix) {
    let diagonal1 = 0;
    let diagonal2 = 0;

    for (let i = 0; i < matrix.length; i++) {
        diagonal1 += matrix[i][i]; 
        diagonal2 += matrix[i][matrix.length - 1 - i]; 
    }

    return Math.abs(diagonal1 - diagonal2);
}

console.log(diagonalDifference(matrix));


// diagonal pertama = 1 + 5 + 9 = 15 
// diagonal kedua = 0 + 5 + 7 = 12 

// maka hasilnya adalah 15 - 12 = 3