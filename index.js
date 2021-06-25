const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 3000

const app = express()

app.use(cors())


app.get('/', (req, res) => {
    let { turno, estado } = req.query
    console.log(turno, estado)
    res.send(reversi(turno, estado));

})



var heuristic = [
    [120, -20, 20, 5, 5, 20, -20, 120],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [20, - 5, 15, 3, 3, 15, -5, 20],
    [5, -5, 3, 3, 3, 3, -5, 5],
    [5, -5, 3, 3, 3, 3, -5, 5],
    [20, - 5, 15, 3, 3, 15, -5, 20],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [120, -20, 20, 5, 5, 20, -20, 120],
]

function reversi(turn, board_state) {
    let board = fillBoard(board_state)
    console.table(board)
    let p_moves = posibleMoves(turn, board)
    if (p_moves.length < 1)
        return ''

    let moves = []
    p_moves.forEach(move => {
        moves.push([move[0], move[1], heuristic[move[0]][move[1]]])
    });

    const ids = moves.map(o => o[0] + '' + o[1])
    filtrado = moves.filter((value, index) =>
        !ids.includes(value[0] + '' + value[1], index + 1)
    )
    moves = filtrado
    moves.sort(function (a, b) { return (a[2] > b[2]) ? -1 : ((b[2] > a[2]) ? 1 : 0); });
    console.table(moves)

    // MINIMAX 1



    moves.forEach((move, index) => {
        new_board = [...board]
        new_board[move[0]][move[1]] = turn
        let new_move = minimax(turn = '1' ? '0' : '1', new_board)
        move[2] = move[2] + new_move[2]
    })

    moves.sort(function (a, b) { return (a[2] > b[2]) ? -1 : ((b[2] > a[2]) ? 1 : 0); });
    console.table(moves)




    console.log(`${moves[0][0]}${moves[0][1]}`)
    return `${moves[0][0]}${moves[0][1]}`
}

function minimax(turn, board) {
    //console.log('MINIMAX ' + turn)
    //board = fillBoard(board_state)
    //console.table(board)
    let p_moves = posibleMoves(turn, board)
    if (p_moves.length < 1)
        return [-1, -1, 0]

    let moves = []

    p_moves.forEach(move => {
        moves.push([move[0], move[1], heuristic[move[0]][move[1]]])
    });

    if (moves.length < 1) return [-1, -1, 0]

    const ids = moves.map(o => o[0] + '' + o[1])

    filtrado = moves.filter((value, index) =>
        !ids.includes(value[0] + '' + value[1], index + 1)
    )

    moves = filtrado

    moves.sort(function (a, b) { return (a[2] > b[2]) ? -1 : ((b[2] > a[2]) ? 1 : 0); });
    //console.table(moves)
    //console.log('MINIMAX CHOOSE ' + moves[0])
    return moves[0]
}


function fillBoard(board_state) {
    let new_board = []
    let items = board_state.split('')
    for (i = 0; i < 8; i++) {
        let row = []
        for (j = 0; j < 8; j++) {
            row.push(items[(i * 8) + j])
        }
        new_board.push(row)
    }
    return new_board;
}

function posibleMoves(turn, board_state) {
    let current_board = board_state
    let moves = []
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            // // console.log(`Evaluando [${i},${j}] {${current_board[i][j]}} TURNO ${turn}`)
            if (current_board[i][j] == '2') {
                // Ignorar vacios
            } else if (current_board[i][j] == turn) {
                // Ficha del turno actual
                // Buscar movimientos NORTE

                let possible_move, possible_move_2 = -1;
                for (x = i - 1; x > 0; x--) {
                    //// console.log(`NORTE - Evaluando [${x},${j}] {${current_board[x][j]}} TURNO ${turn}`)
                    if ((current_board[x][j] == turn) || (current_board[x][j] == '2')) {
                        // Ignorar fichas del mismo color a la par, o espacios vacios
                        break
                    } else {
                        possible_move = x;
                        // // console.log(`ENEMIGO EN [${possible_move},${j}]`)

                    }
                }
                if ((possible_move - 1 >= 0) && (current_board[possible_move - 1][j] == '2') && possible_move != -1) {
                    moves.push([possible_move - 1, j])
                    // console.log("Movimiento agregado NORTE ", [possible_move - 1, j])
                }


                // Buscar movimientos SUR

                possible_move = -1
                for (x = i + 1; x < 8; x++) {
                    // // console.log(`SUR - Evaluando [${x},${j}] {${current_board[x][j]}} TURNO ${turn}`)
                    if ((current_board[x][j] == turn) || (current_board[x][j] == '2')) {
                        // Ignorar fichas del mismo color a la par, o espacios vacios
                        break
                    } else {
                        possible_move = x;
                        //// console.log(`ENEMIGO EN [${possible_move},${j}]`)

                    }
                }
                if ((possible_move + 1 < 8) && (current_board[possible_move + 1][j] == '2') && possible_move != -1) {
                    moves.push([possible_move + 1, j])
                    // console.log("Movimiento agregado SUR ", [possible_move + 1, j])
                }


                // Buscar movimientos ESTE (DERECHA)

                possible_move = -1
                for (x = j + 1; x < 8; x++) {
                    //// console.log(`ESTE - Evaluando [${i},${x}] {${current_board[i][x]}} TURNO ${turn}`)
                    if ((current_board[i][x] == turn) || (current_board[i][x] == '2')) {
                        // Ignorar fichas del mismo color a la par, o espacios vacios
                        break
                    } else {
                        possible_move = x;
                        // // console.log(`ENEMIGO EN [${i},${possible_move}]`)

                    }
                }
                if ((possible_move + 1 < 8) && (current_board[i][possible_move + 1] == '2') && possible_move != -1) {
                    // // console.log('POSIBLE MOVIMIENTO EN ' + [i, possible_move + 1])
                    moves.push([i, possible_move + 1])
                    // console.log("Movimiento agregado ESTE ", [i, possible_move + 1])
                }


                // Buscar movimientos OESTE (IZQUIERDA)

                possible_move = -1
                for (x = j - 1; x > 0; x--) {
                    //// console.log(`OESTE - Evaluando [${i},${x}] {${current_board[i][x]}} TURNO ${turn}`)
                    if ((current_board[i][x] == turn) || (current_board[i][x] == '2')) {
                        // Ignorar fichas del mismo color a la par, o espacios vacios
                        break
                    } else {
                        possible_move = x;
                        //// console.log(`ENEMIGO EN [${i},${possible_move}]`)

                    }
                }
                if ((possible_move - 1 >= 0) && (current_board[i][possible_move - 1] == '2') && possible_move != -1) {
                    moves.push([i, possible_move - 1])
                    // console.log("Movimiento agregado OESTE ", [i, possible_move - 1])
                }


                // Buscar movimientos NOR-ESTE (ARRIBA IZQUIERDA)

                possible_move = -1;
                possible_move_2 = -1;
                loop1:
                for (let x = i - 1; x > 0; x--) {
                    for (let y = j + 1; y < 8; y++) {
                        // console.log(`NOR-ESTE - Evaluando [${x},${y}] {${current_board[x][y]}} TURNO ${turn} DESDE ${i},${j}`)
                        if ((current_board[x][y] == turn) || (current_board[x][y] == '2')) {
                            // Ignorar fichas del mismo color a la par, o espacios vacios
                            break loop1
                        } else {
                            possible_move = x;
                            possible_move_2 = y;
                            if (x > 1 && y < 7)
                                x--
                            else
                                break loop1
                            // // console.log(`ENEMIGO EN [${possible_move},${possible_move_2}]`)

                        }
                    }
                }

                if ((possible_move - 1 >= 0) && (current_board[possible_move - 1][possible_move_2 + 1] == '2') && possible_move != -1 && possible_move_2 + 1 < 8 && possible_move_2 != -1) {
                    moves.push([possible_move - 1, possible_move_2 + 1])
                    // console.log("Movimiento agregado NOR ESTE ", [possible_move - 1, possible_move_2 + 1])
                }


                // Buscar movimientos SUR-ESTE (ABAJO DERECHA)

                possible_move = -1;
                possible_move_2 = -1;
                loop2:
                for (let x = i + 1; x < 8; x++) {
                    for (let y = j + 1; y < 8; y++) {
                        // console.log(`SUR-ESTE - Evaluando [${x},${y}] {${current_board[x][y]}} TURNO ${turn} DESDE ${i},${j}`)
                        if ((current_board[x][y] == turn)) {
                            // Ignorar fichas del mismo color a la par, o espacios vacios
                            break loop2
                        } else if (current_board[x][y] == '2') {
                            break loop2

                        } else {
                            possible_move = x;
                            possible_move_2 = y;
                            // console.log(`ENEMIGO EN [${possible_move},${possible_move_2}]`)
                            if (x < 7 && y < 7)
                                x++
                            else
                                break loop2

                        }
                    }
                }

                if ((possible_move + 1 < 8) && (current_board[possible_move + 1][possible_move_2 + 1] == '2') && possible_move != -1 && (possible_move_2 + 1 < 8) && possible_move_2 != -1) {
                    moves.push([possible_move + 1, possible_move_2 + 1])
                    // console.log("Movimiento agregado SUR ESTE ", [possible_move + 1, possible_move_2 + 1])
                }


                // Buscar movimientos NOR-OESTE (ARRIBA IZQUIERDA)

                possible_move = -1;
                possible_move_2 = -1;
                loop3:
                for (let x = i + 1; x < 8; x++) {
                    for (let y = j - 1; y > 0; y--) {
                        //// console.log(`NOR-OESTE - Evaluando [${x},${y}] {${current_board[x][y]}} TURNO ${turn}`)
                        if ((current_board[x][y] == turn)) {
                            // Ignorar fichas del mismo color a la par, o espacios vacios
                            break loop3
                        } else if (current_board[x][y] == '2') {
                            break loop3

                        } else {
                            possible_move = x;
                            possible_move_2 = y;
                            //// console.log(`ENEMIGO EN [${possible_move},${possible_move_2}]`)
                            if (x < 7 && y > 1)
                                x++
                            else
                                break loop3

                        }
                    }
                }

                if ((possible_move + 1 < 8) && (current_board[possible_move + 1][possible_move_2 - 1] == '2') && possible_move != -1 && (possible_move_2 - 1 >= 0) && possible_move_2 != -1) {
                    moves.push([possible_move + 1, possible_move_2 - 1])
                    // console.log("Movimiento agregado NOR OESTE ", [possible_move + 1, possible_move_2 - 1])
                }

                // Buscar movimientos SUR-OESTE (ABAJO IZQUIERDA)

                possible_move = -1;
                possible_move_2 = -1;
                loop4:
                for (let x = i - 1; x > 0; x--) {
                    for (let y = j - 1; y > 0; y--) {
                        // console.log(`SUR-OESTE - Evaluando [${x},${y}] {${current_board[x][y]}} TURNO ${turn}  DESDE ${i},${j}`)
                        if ((current_board[x][y] == turn)) {
                            // Ignorar fichas del mismo color a la par, o espacios vacios
                            break loop4
                        } else if (current_board[x][y] == '2') {
                            break loop4

                        } else {
                            possible_move = x;
                            possible_move_2 = y;
                            // console.log(`ENEMIGO EN [${possible_move},${possible_move_2}]`)
                            if (x > 1 && y > 1)
                                x--
                            else
                                break loop4

                        }
                    }
                }

                if ((possible_move - 1 >= 0) && (current_board[possible_move - 1][possible_move_2 - 1] == '2') && possible_move != -1 && (possible_move_2 - 1 >= 0) && possible_move_2 != -1) {
                    moves.push([possible_move - 1, possible_move_2 - 1])
                    // console.log("Movimiento agregado SUR OESTE ", [possible_move - 1, possible_move_2 - 1])
                }


            }
        }
    }
    return moves
}



app.listen(port, () => {
    console.log(`Servidor  http://localhost:${port}`)
})