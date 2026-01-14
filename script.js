function createMatrixGrid(matrix) {
    const container = document.getElementById(`matrix${matrix}`);
    const existingInputs = container.getElementsByClassName('matrix-input');
    const values = {};
    Array.from(existingInputs).forEach(input => {
        const row = input.dataset.row;
        const col = input.dataset.col;
        values[`${row}-${col}`] = input.value;
    });
    
    const rows = Math.max(1, parseInt(document.getElementById(`rows${matrix}`).value) || 1);
    const cols = Math.max(1, parseInt(document.getElementById(`cols${matrix}`).value) || 1);
    
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.className = 'matrix-input';
            input.type = 'number';
            input.dataset.row = i;
            input.dataset.col = j;
            const key = `${i}-${j}`;
            if (values[key]) {
                input.value = values[key];
            }
            container.appendChild(input);
        }
    }
}

function getMatrixValues(matrixId) {
    const container = document.getElementById(matrixId);
    const inputs = container.getElementsByClassName('matrix-input');
    const rows = Math.max(...Array.from(inputs).map(i => +i.dataset.row)) + 1;
    const cols = Math.max(...Array.from(inputs).map(i => +i.dataset.col)) + 1;
    
    const matrix = Array(rows).fill().map(() => Array(cols).fill(0));
    Array.from(inputs).forEach(input => {
        const row = +input.dataset.row;
        const col = +input.dataset.col;
        matrix[row][col] = parseFloat(input.value) || 0;
    });
    
    return rows === 1 && cols === 1 ? matrix[0][0] : matrix;
}

function formatResult(result) {
    if (typeof result === 'number') {
        return document.createTextNode(result.toFixed(2));
    }
    
    const table = document.createElement('table');
    table.className = 'matrix-table';
    result.forEach(row => {
        const tr = table.insertRow();
        row.forEach(val => {
            const td = tr.insertCell();
            td.textContent = typeof val === 'number' ? val.toFixed(2) : val;
        });
    });
    return table;
}

function calculate() {
    try {
        const operation = document.getElementById('operation').value;
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        
        const a = getMatrixValues('matrixA');
        
        let result;
        switch(operation) {
            case 'transpose': result = MatrixOps.transpose(a); break;
            case 'determinant': result = MatrixOps.determinant(a); break;
            case 'inverse': result = MatrixOps.inverse(a); break;
            default: throw new Error('Invalid operation');
        }
        
        resultDiv.appendChild(formatResult(result));
    } catch (error) {
        document.getElementById('result').innerHTML = 
            `<div class="error">Error: ${error.message}</div>`;
    }
}

function clearAll() {
    document.querySelectorAll('.matrix-input').forEach(input => input.value = '');
    document.getElementById('result').innerHTML = '';
}

