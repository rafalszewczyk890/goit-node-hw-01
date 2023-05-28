// const readline = require("readline");
// const fs = require("fs");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on("close", (cmd) => {
//   console.log(`You have written: ${cmd}`);
// });

// rl.question("Skad pochodzisz?", (answer) => {
//   if (answer === "Mielec") {
//     console.log(`O super, ja też pochodzę z Mielca`);
//   } else {
//     console.log(`Nie znam miasta ${answer}`);
//   }

//   const a = "http";
//   const b = "://";
//   const d = "www";

//   const table = [a, b, d];

//   const result = table.join(table);

//   console.log(result);
//   rl.close();
// });

const readline = require("readline");
const fs = require("fs").promises;

const { program } = require("commander");
require("colors");

program.option(
  "-f, --file [type]",
  "name of the file to record results",
  "base.txt"
);

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Enter a number!".bgRed);
    return false;
  }

  if (value < 1 || value > 10) {
    console.log("Wrong range!".bgRed);
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Result was saved in file ${logFile}`.green);
  } catch {
    console.log(`Something went wrong`);
  }
};

const game = () => {
  rl.question("Enter a number from 1 to 10: ".bgYellow, async (answer) => {
    const number = Number.parseInt(answer, 10);
    if (!isValid(number)) {
      game();
      return;
    }

    count += 1;
    if (number === mind) {
      console.log(
        `Congratulations, you have found the number ${mind}. Number of trials: ${count}`
          .green
      );
      await log(
        `${new Date().toLocaleDateString()}: Congratulations. You have found the number ${mind}. Number of trials: ${count}`
      );
      rl.close();
      return;
    }
    console.log("You did not guess the number, try again".red);
    game();
  });
};

game();
