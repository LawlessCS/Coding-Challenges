let board =[
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let players = ["X", "O"];

let currentPlayer;

let available = [];

function setup() {
    createCanvas(400, 400);
    frameRate(1);

    currentPlayer = random(players);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            available.push([i, j]);
        }
    }

}

function nextTurn() {
    let index = floor(random(available.length));
    let spot = available.splice(index, 1)[0];

    let i = spot[0];
    let j = spot[1];

    board[i][j] = currentPlayer;
    
    currentPlayer = (currentPlayer == players[0]) ? players[1] : players[0];
}

function equals3(a, b, c) {
    return (a == b && b == c && a != "");
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[i][0];
        }
    }

    // diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    if(winner == null && available.length == 0) {
        return "TIE";
    } else {
        return winner;
    }
}

function draw() {
    background(220);

    let w = width / 3;
    let h = height / 3;

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[j][i];

            strokeWeight(4);

            if(spot == players[1]) {
                noFill();
                ellipse(x, y, w / 2);
            } else if(spot == players[0]) {
                let xSize = w / 4;
                line(x - xSize, y - xSize, x + xSize, y + xSize);
                line(x + xSize, y - xSize, x - xSize, y + xSize);
            }
        }
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        console.log(result);
        createP(result).style("color", "#53").style("font-size", "32pt");
    } else {
        nextTurn();
    }
}