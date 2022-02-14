let p1Name, p1Cor, p2Name, p2Cor, hits1, hits2, gameBoardContainer, p1Turn;
hits1 = 0;
hits2 = 0;

var board1 = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0));
var board2 = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0));



function click1() {
    p1Name = document.getElementById("box1").value;
    var cor = document.getElementById("box2").value;
    if (validCors(cor, true) == true) {
        p1Cor = cor;
    }
    else {
        document.getElementById("corError").style.display = "block";
        return;
    }
    var vc = validCors(cor, true);
    //document.getElementById("player1").innerHTML = p1Name;
    //document.getElementById("p1Name").innerHTML = vc;
    document.getElementById("p2Info").style.display = "block";
    var remove = document.getElementById("p1Info")
    remove.parentElement.removeChild(remove);
}

function click2() {
    p2Name = document.getElementById("box3").value;
    cor = document.getElementById("box4").value;
    //document.getElementById("player2").innerHTML = p2Name;
    //document.getElementById("cors2").innerHTML = p2Cor;

    if (validCors(cor, false) == true) {
        p2Cor = cor;
    }
    else {
        document.getElementById("corError").style.display = "block";
        return;
    }
    var vc = validCors(cor, false);


    document.getElementById("p1Confirm").style.display = "block";
    var remove = document.getElementById("p2Info")
    remove.parentElement.removeChild(remove);
    var confirmP1 = `Click OK to begin ${p1Name}'s turn.`;
    p1Turn = true;
    document.getElementById("p1ConText").innerHTML = confirmP1;
}

function displayGrid1() {

    console.log(board1);
    document.getElementById("p1Confirm").style.display = "none";
    document.getElementById("gameboard1").style.display = "block";


    var rows = 10;
    var cols = 10;
    var squareSize = 50;

    gameBoardContainer = document.getElementById("gameboard1");

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {

            var square = document.createElement("div");
            gameBoardContainer.appendChild(square);

            square.id = 's' + j + i;

            var topPosition = j * squareSize;
            var leftPosition = i * squareSize;

            square.style.top = topPosition + 'px';
            square.style.left = leftPosition + 'px';

            if (p1Turn) {
                document.getElementById("yourBoard").style.display = "block";
                var p1Board = `${p1Name}'s board`;
                document.getElementById("yourBoard").innerHTML = p1Board;
                var p2Board = `${p2Name}'s board`;
                document.getElementById("oppBoard").innerHTML = p2Board;
                document.getElementById("oppBoard").style.display = "block";
                if (board1[j][i] == 1) {
                    square.style.background = 'slategray';
                }
                if (board1[j][i] == 2) {
                    square.style.background = 'red';
                }
                if (board1[j][i] == 3) {
                    square.style.background = 'white';
                }
            }
            else {
                console.log(p1Turn);
                document.getElementById("yourBoard").style.display = "block";
                var p1Board = `${p2Name}'s board`;
                document.getElementById("yourBoard").innerHTML = p1Board;
                var p2Board = `${p1Name}'s board`;
                document.getElementById("oppBoard").innerHTML = p2Board;
                document.getElementById("oppBoard").style.display = "block";
                if (board2[j][i] == 1) {
                    square.style.background = 'slategrey';
                }
                if (board2[j][i] == 2) {
                    square.style.background = 'red';
                }
                if (board2[j][i] == 3) {
                    square.style.background = 'white';
                }
            }
        }
    }
}

function displayGrid2() {

    console.log(board2);
    document.getElementById("p2Confirm").style.display = "none";
    document.getElementById("gameboard2").style.display = "block";


    var rows = 10;
    var cols = 10;
    var squareSize = 50;

    gameBoardContainer = document.getElementById("gameboard2");

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {

            var square = document.createElement("div");
            gameBoardContainer.appendChild(square);

            square.id = 's' + j + i;

            var topPosition = j * squareSize;
            var leftPosition = i * squareSize;

            square.style.top = topPosition + 'px';
            square.style.left = leftPosition + 'px';

            if (!p1Turn) {
                if (board1[j][i] == 2) {
                    square.style.background = 'red';
                }
                if (board1[j][i] == 3) {
                    square.style.background = 'white';
                }
            }
            else {
                if (board2[j][i] == 2) {
                    square.style.background = 'red';
                }
                if (board2[j][i] == 3) {
                    square.style.background = 'white';
                }
            }

        }
    }
}

function validCors(input, oneOrTwo) {
    let sub1, sub2, c1, boardCurr;

    //Test which board to populate
    if (oneOrTwo) {
        boardCurr = board1;
    }
    else {
        boardCurr = board2;
    }

    var diffShips = input.split(';');

    for (i = 0; i < diffShips.length - 1; i++) {

        sub1 = diffShips[i].substring(2, 3);
        sub2 = diffShips[i].substring(5, 6);

        if (sub1 !== sub2 || sub1 === null || sub2 === null) {

            sub1 = diffShips[i].substring(3, 4);
            sub2 = diffShips[i].substring(6, 7);
            if (sub1 !== sub2) {
                return false;
            }
            else {

                for (j = diffShips[i].substring(2, 3).charCodeAt(0) - 65; j < diffShips[i].substring(2, 3).charCodeAt(0) - 65 + (5 - i); j++) {
                    boardCurr[j][sub1 - 1] = 1;
                }
            }
        }
        else {
            c1 = sub1.charCodeAt(0) - 65;

            for (j = diffShips[i].substring(3, 4); j < (6 - i); j++) {
                boardCurr[c1][j - 1] = 1;
            }
        }
    }
    return true;
}

window.onload = function () {
    if (p1Turn == true) {
        gameBoardContainer = document.getElementById("gameboard1");
    }
    else {
        gameBoardContainer = document.getElementById("gameboard2");
    }
    if (gameBoardContainer) {
        gameBoardContainer.addEventListener("click", fire);

    }
}

function fire(e) {
    let boardCurr;
    if (p1Turn == true) {
        boardCurr = board2;
    }
    else {
        boardCurr = board1;
    }

    if (e.target !== e.currentTarget) {

        var row = e.target.id.substring(1, 2);
        var col = e.target.id.substring(2, 3);

        if (boardCurr[row][col] == 0) {
            e.target.style.backgroundColor == 'white';
            boardCurr[row][col] = 3;
            document.getElementById("missZ").style.display = "block";
        }
        else if (boardCurr[row][col] == 1) {
            e.target.style.backgroundColor == 'red';
            boardCurr[row][col] = 2;
            if(p1Turn)
                hits1 = hits1 + 2;
            else{
                hits2 = hits2 + 2;
            }
            if (hits1 >= 24) {
                document.getElementById("victory").style.display = "block";
                document.getElementById("win").innerHTML = `${p1Name} wins! `;
                document.getElementById("score").innerHTML = `Score: ${p1Name}: ${hits1} - ${p2Name}: ${hits2}`;
                console.log("w");
            }
            if (hits2 >= 24){
                document.getElementById("vicotry").style.display = "block";
                document.getElementById("win").innerHTML = `${p2Name} wins! `;
                document.getElementById("score").innerHTML = `Score: ${p2Name}: ${hits2} - ${p1Name}: ${hits1}`;
            }
            document.getElementById("hitZ").style.display = "block";
        }
        else if (boardCurr[row][col] > 1) {
            return;
        }
    }

    if (p1Turn == true) {
        board2 = boardCurr;
    }
    else {
        board1 = boardCurr;
    }

    gameBoardContainer.removeEventListener("click", fire);
    p1Turn = !p1Turn;
}

function click3() {
    document.getElementById("hitZ").style.display = "none";
    document.getElementById("missZ").style.display = "none";
    document.getElementById("p2Confirm").style.display = "block";
    if (!p1Turn) {
        var confirmP2 = `Click OK to begin ${p2Name}'s turn.`;
    }
    else {
        var confirmP2 = `Click OK to begin ${p1Name}'s turn.`;
    }
    document.getElementById("p2ConText").innerHTML = confirmP2;
    document.getElementById("gameboard1").style.display = "none";
    document.getElementById("gameboard2").style.display = "none";
    document.getElementById("yourBoard").style.display = "none";
    document.getElementById("oppBoard").style.display = "none";
}

function reload(){
    location.reload();
}