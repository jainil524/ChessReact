export default function boardStateParser(boardState: String):String[][] {
    // parse the board state string into an array of strings
    // each string represents a row on the board and is separated by a '/'
    const board: Array<String> = boardState.split("/");
    let parsedBoard: Array<Array<String>> = [];

    // loop through each row and replace the numbers with empty spaces
    board.forEach((row) => {
        // create a new row to store the parsed row and at the end push it to the parsedBoard
        let newrow: Array<String> = [];

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

