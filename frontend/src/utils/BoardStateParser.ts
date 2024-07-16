export function boardStateDecoder(boardState: string): string[][] {
    // parse the board state string into an array of strings
    // each string represents a row on the board and is separated by a '/'
    const board: Array<string> = boardState.split("/");
    let parsedBoard: Array<Array<string>> = [];

    // loop through each row and replace the numbers with empty spaces
    board.forEach((row) => {
        // create a new row to store the parsed row and at the end push it to the parsedBoard
        let newrow: Array<string> = [];

        for (let i = 0; i < row.length; i++) {
            // get the current character in the row
            let currentchar = row.charAt(i);

            // if the character is a number, replace it with that many empty spaces and push it to the newrow
            if (currentchar.match(/[0-9]/)) {
                let numSpaces = parseInt(currentchar);
                let spaces = Array(numSpaces).fill("");
                newrow.push(...spaces);
            }

            // if the character is not a number, push it to the newrow
            else {
                newrow.push(currentchar);
            }
        }

        // push the newrow to the parsedBoard array
        parsedBoard.push(newrow);
    });
    return parsedBoard;
}

export function boardStateEncoder(boardState: string[][]): string {
    // encode the board state array into a string
    let encodedBoard: string = "";

    // loop through each row in the board state array
    boardState.forEach((row) => {
        let i = 0;
        let rowString = "";

        // loop through each cell in the row
        row.forEach((cell) => {
            // if the cell is an empty string, increment the counter
            if (cell === "") {
                i++;
            }
            // if the cell is not an empty string
            else {
                // if the counter is greater than 0, add the counter to the row string
                if (i > 0) {
                    rowString += i;
                    i = 0;
                }
                // add the cell to the row string
                rowString += cell;
            }
        });

        // if the counter is greater than 0, add the counter to the row string
        if (i > 0) {
            rowString += i;
        }

        // add the row string to the encoded board string
        encodedBoard += rowString + "/";
    });

    // remove the last '/' from the encoded board string
    encodedBoard = encodedBoard.slice(0, -1);

    return encodedBoard;
}