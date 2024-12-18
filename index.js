let randomNumber, maxRange, attempts, maxAttempts;

let Message = document.getElementById("message");
let startGamebutton = document.getElementById("startGameButton");

const winsound = document.getElementById("winSound");
const tryagainsound = document.getElementById("tryAgainSound");
const gameoversound = document.getElementById("gameoverSound");

let showMessage = (text, success) => {
  Message.textContent = text;
};

let setRange = () => {
  maxRange = parseInt(document.getElementById("range").value);
  randomNumber = Math.floor(Math.random() * maxRange) + 1;
  maxAttempts = Math.ceil(Math.log2(maxRange)) + 3;

  attempts = 0;

  showMessage(
    `guess a number between 1 and ${maxRange}. you have ${maxAttempts}
    attempts left`,
    true
  );

  startGamebutton.style.display = "none";
};

let makeGuess = () => {
  const guess = parseInt(document.getElementById("guessinput").value);
  attempts++;

  if (isNaN(guess) || guess < 1 || guess > maxRange) {
    showMessage(
      `Please enter a valid number between 1 and ${maxRange}.Attempts left: ${
        maxAttempts - attempts
      }`,
      false
    );
    return;
  }

  if (attempts > maxAttempts) {
    gameoversound.play();
    showMessage(
      `Game Over ! You Lose, You 've used all ${maxAttempts}.The number was ${randomNumber}`,
      false
    );
    startGamebutton.style.display = "block";
    return;
  }

  if (guess === randomNumber) {
    winsound.play();
    showMessage(
      `🎉 You guessed it! You Win ! The Number was ${randomNumber}.You used ${attempts} attempts.`,
      true
    );
    startGamebutton.style.display = "block";
    return;
  } else if (guess < randomNumber) {
    tryagainsound.play();
    showMessage(`⬆️ Too low! Attempts left: ${maxAttempts - attempts}`, false);
  } else {
    tryagainsound;
    showMessage(`⬆️ Too high! Attempts left: ${maxAttempts - attempts}`, false);
  }

  if (attempts === maxAttempts && guess !== randomNumber) {
    gameoversound.play();
    showMessage(
      `Game Over ! You 've used all ${maxAttempts} attempts. The number was ${randomNumber}`,
      false
    );
  }
};

let StartGame = () => {
  setRange();
  document.getElementById("guessinput").value = " ";
};

document.getElementById("guessinput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    makeGuess();
    document.getElementById("guessinput").value = " ";
  }
});
