interface PlayerMarker {
  x: string;
  o: string;
  [key: string]: string;
}

interface Score {
  x: number;
  o: number;
  [key: string]: number;
}

/**
 * Interface beinhaltet alle Funktionen vom Spiel 
 */
interface GameDisplay {
  bindHandler(clickHandler: (tile: HTMLDivElement) => void): void;
  createElement(
    tag: string,
    className?: string,
    dataset?: [string, any]
  ): HTMLElement;
  getElement(selector: string): HTMLElement;
  getAllElements(selector: string): NodeList;
  selectGameMode(
    gameMode: number,
    clickHandler: (tile: HTMLDivElement) => void
  ): void;
  printGameBoard(gameMode: number): void;
  clearGameBoard(): void;
  resetGame(game: () => void): void;
  updateScore(round: number, currentScore: Score, currentPlayer: string): void;
  printWinnerMessage(round: number, winner: string): void;
  clearMessage(): void;
  createTiles(
    gameBox: HTMLElement,
    requiredTileCount: number,
    currentTileCount: number
  ): void;
  destroyTiles(
    gameBox: HTMLElement,
    requiredTileCount: number,
    currentTileCount: number
  ): void;
  playComputer(clickHandler: (tile: HTMLDivElement) => void): void;
  checkWinner(gameMode: number, currentPlayer: string, round: number): boolean;
  startWithDifficulty(clickHandler: (tile: HTMLDivElement) => void): void;
  getCurrentDifficulty(): number | undefined;
  printGameOutcome(score: Score, currentPlayer: string): void;
}

/**
 * Klasse für die Spielelogik
 */
class DOMDisplay implements GameDisplay {



/*Methode löscht die Spielfelder und den Schwierigkeitsgrad */
  clearGameBoard(): void {
    let gameBox = this.getElement(".container__game");
    this.destroyTiles(gameBox);
    this.getAllElements(".difficulty__btn").forEach((btn) =>
      (<HTMLButtonElement>btn).classList.remove("difficulty__btn--click")
    );
  }

  /**
  
   // Aktualisiert den Punktestand bei Gewinn
   *@param round //aktuelle Runde
    @param currentScore //Aktueller Highscore des Spielers 
   * @param currentPlayer //aktueller Spieler 
   */
  updateScore(round: number, currentScore: Score, currentPlayer: string): void {
    const scoreSpanElement = this.getElement(
      `#score-${currentPlayer.toLowerCase()}`
    ) as HTMLSpanElement;
    scoreSpanElement.textContent =
      "" + currentScore[currentPlayer == "Computer" ? "x" : "o"];
    const roundSpanElement = this.getElement(
      `.score-board__round--value`
    ) as HTMLSpanElement;
    roundSpanElement.textContent = "" + ++round;
  }

  /**
   
   // Gewinner Benachrichtigung
   * @param round
   * @param message
   */
  printWinnerMessage(round: number, message: string): void {
    this.getAllElements(".score-board__player").forEach((element) => {
      (<HTMLDivElement>element).classList.add("score-board--hidden");
    });
    const roundWinnerMessageElement = this.getElement(
      ".score-board__player--winner"
    ) as HTMLDivElement;
    roundWinnerMessageElement.classList.remove("score-board--hidden");
    roundWinnerMessageElement.innerHTML = `<p class="score-board__player--score-label">${message}</p>`;
    let gameBox = this.getElement(".container__game");
    setTimeout(() => {
      this.destroyTiles(gameBox);
      this.getAllElements(".score-board__player").forEach((element) => {
        (<HTMLDivElement>element).classList.add("score-board--hidden");
        roundWinnerMessageElement.classList.add("score-board--hidden");
      });
    }, 1000);
  }

  
   /*Methode löscht den aktuellen Punktestand und alle Nachrichten */
  clearMessage(): void {
    this.getAllElements(".score-board__player--score").forEach(
      (element) => (element.textContent = "0")
    );
    const round = this.getElement(".score-board__round--value");
    round.textContent = "1";
    const winnerMessageElement = this.getElement(
      ".score-board__winner"
    ) as HTMLDivElement;
    winnerMessageElement.classList.add("score-board__winner--hidden");
    const scoreBoardElements = this.getAllElements(".score-board__player");
    scoreBoardElements.forEach((element) => {
      (<HTMLDivElement>element).classList.remove("score-board--hidden");
    });
    const roundWinnerMessageElement = this.getElement(
      ".score-board__player--winner"
    ) as HTMLDivElement;
    roundWinnerMessageElement.classList.add("score-board--hidden");
  }

  /**
   * Hängt eine Methode an den Event listener der Felder
   * @param clickHandler Der Spieler oder Computer müssen eine Methode auswählen 
   */
  bindHandler(clickHandler: (tile: HTMLDivElement) => void): void {
    this.getAllElements(".tile").forEach((element) => {
      element.addEventListener("click", (event: Event) => {
        const tile = event.target as HTMLDivElement;
        const tileNumber = tile.dataset["tileIndex"];
        const tileOwned = tile.dataset["owned"];
        if (tileOwned || !tileNumber) {
          console.log("tile" + tileNumber + "owned by " + tileOwned);
          return;
        }
        clickHandler(tile);
        this.playComputer(clickHandler);
      });
    });
  }

  /**
   * Methode erstellt ein HTML zum DOM 
   * @param tag tag für dieses Element 
   * @param className Klassen die zu diesem Elemnt hinzugefügt werden müssen 
   * @param dataset Attribute die zu diesem Element hinzugefügt werden müssen 
   * @returns 
   */
  createElement(
    tag: string,
    className?: string,
    dataset?: [string, any]
  ): HTMLElement {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    if (dataset) {
      element.setAttribute(dataset[0], dataset[1]);
    }
    return element;
  }

  /**
   * 
  
   * @param selector
   * @returns HTMLElement reagiert auf das Ausgewählte 
   */
  getElement(selector: string): HTMLElement {
    return <HTMLElement>document.querySelector(selector);
  }

  /**
   * 
   * @param selector 
   * @returns NodeList reagiert auf das Ausgewählte 
   */
  getAllElements(selector: string): NodeList {
    return <NodeList>document.querySelectorAll(selector);
  }

  /**
   * Erstellt Felder innerhalb der gamebox (Spielfeld Box)
   * @param gameBox HTMLElement wird als gamebox verwendet 
   * @param requiredTileCount Nummer an Feldern die erstellt werden müssen
   */
  createTiles(gameBox: HTMLElement, requiredTileCount: number): void {
    for (let i = 0; i < requiredTileCount; i++) {
      const createdTile = this.createElement("div", "tile", [
        "data-tile-index",
        i + 1,
      ]);
      const tileSpan = this.createElement("span", undefined, undefined);
      createdTile.appendChild(tileSpan);
      gameBox.append(createdTile);
    }
  }

  /**
   * Löscht alle Felder in der game Box (Spielfeld Box)
   * @param gameBox HTMLElement - gamebox 
   */
  destroyTiles(gameBox: HTMLElement): void {
    while (gameBox.firstChild) {
      gameBox.removeChild(gameBox.firstChild);
    }
  }

  /**
   * Erstellung des Spieles und dem handler je nachdem welche Schwierigkeitsstufe ausgewählt wurde. 
   * Computer setzt den ersten Zug 
   * @param gameMode 
   * @param clickHandler 
   */
  selectGameMode(
    gameMode: number,
    clickHandler: (tile: HTMLDivElement) => void
  ) {
    this.printGameBoard(gameMode);
    this.bindHandler(clickHandler);
    this.playComputer(clickHandler);
  }

  /**
   * Rendert das Spielfeld 
   * @param gameMode Nummer mit der die Schwierig ermittelt wird 
   */
  printGameBoard(gameMode: number): void {
    let gameBox = this.getElement(".container__game");
    const requiredTileCount = gameMode * gameMode;
    if (gameMode === 3) {
      gameBox.classList.add("container__game-box-3");
      gameBox.classList.remove("container__game-box-4");
      gameBox.classList.remove("container__game-box-5");
    } else if (gameMode === 4) {
      gameBox.classList.add("container__game-box-4");
      gameBox.classList.remove("container__game-box-3");
      gameBox.classList.remove("container__game-box-5");
    } else if (gameMode === 5) {
      gameBox.classList.add("container__game-box-5");
      gameBox.classList.remove("container__game-box-3");
      gameBox.classList.remove("container__game-box-4");
    }

    this.destroyTiles(gameBox);
    this.createTiles(gameBox, requiredTileCount);
  }

  /**
   * Startet das Spiel mit derselben Schwierigkeit 
   * @param clickHandler
   */
  startWithDifficulty(clickHandler: (tile: HTMLDivElement) => void): void {
    const selectedDifficulty = this.getCurrentDifficulty();
    if (selectedDifficulty) {
      const scoreBoardElements = this.getAllElements(".score-board__player");
      scoreBoardElements.forEach((element) => {
        (<HTMLDivElement>element).classList.remove("score-board--hidden");
      });
      const roundElement = this.getElement(
        ".score-board__round"
      ) as HTMLDivElement;
      roundElement.classList.remove("score-board--hidden");
      const roundWinnerMessageElement = this.getElement(
        ".score-board__player--winner"
      ) as HTMLDivElement;
      roundWinnerMessageElement.classList.add("score-board--hidden");
      this.selectGameMode(selectedDifficulty, clickHandler);
    }
  }

  /**
   * Methode setzt das Spiel zurück 
   * @param reset 
   */
  resetGame(reset: () => void): void {
    const resetButton = this.getElement(".container__new-game--btn");
    resetButton.addEventListener("click", (event: Event) => {
      reset();
    });
  }

  /**
   * Mthode ermittelt ob der Computer ein Feld auswählen soll 
   * @param clickHandler 
   * @returns
   */
  playComputer(clickHandler: (tile: HTMLDivElement) => void): void {
    const playableTile = this.getPlayableTile();
    if (!playableTile) return;

    clickHandler(playableTile);
  }

  /**
   * Erkennt die Felder die noch nicht belegt wurden 
   * @returns Nicht besetzte Felder als  HTMLDivElement oder undefined.
   */
  getPlayableTile(): HTMLDivElement | undefined {
    const tiles = this.getAllElements(".tile");
    let currentTile;
    for (let i = 0; i < tiles.length; i++) {
      currentTile = tiles[i] as HTMLDivElement;
      if (!currentTile || currentTile.dataset["owned"]) {
        continue;
      } else {
        break;
      }
    }
    return currentTile;
  }

  /**
   * Checkt wer gewonnen hat nach der Boardsize 
   * @param gameMode je nachdem welche Spielfeld größe ausgewählt wurde 
   * @param currentPlayer aktueller Spieler 
   * @param round aktuelle Runde 
   * @returns
   */
  checkWinner(gameMode: number, currentPlayer: string, round: number): boolean {
    const game3Wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const game4Wins = [
      [0, 1, 2, 3],
      [3, 4, 5, 6],
      [6, 7, 8, 9],
      [10, 11, 12, 13],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 8, 9],
    ];

    const game5Wins = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [5, 10, 15, 20, 25],
      [5, 10, 15, 20, 25],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    let gameWin: number[][] = [];

    if (gameMode === 3) {
      gameWin = game3Wins;
    } else if (gameMode === 4) {
      gameWin = game4Wins;
    } else if (gameMode === 5) {
      gameWin = game5Wins;
    }

    const tiles = this.getAllElements(".tile");
    const xTiles: number[] = [];
    const oTiles: number[] = [];

    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i] as HTMLDivElement;
      const tileOwner = tile.dataset["owned"];
      const tileIndex = tile.dataset["tileIndex"];
      if ("X" === tileOwner && tileIndex) {
        xTiles.push(+tileIndex - 1);
      } else if ("O" === tileOwner && tileIndex) {
        oTiles.push(+tileIndex - 1);
      }
    }

    for (let i = 0; i < gameWin.length; i++) {
      const arr = gameWin[i];
      let xWinner = true;
      let oWinner = true;
      for (let i = 0; i < arr.length; i++) {
        if (xTiles.includes(arr[i])) {
          xWinner = xWinner && true;
          oWinner = false;
        } else {
          xWinner = false;
        }
        if (oTiles.includes(arr[i])) {
          xWinner = false;
          oWinner = oWinner && true;
        } else {
          oWinner = false;
        }
      }
      if (xWinner || oWinner) {
        console.log(`Winner is ${currentPlayer}`);
        this.printWinnerMessage(
          round,
          `Round ${round} won by ${currentPlayer}`
        );
        return true;
      }
    }
    return false;
  }

  /**
   * Methode entfernt die Spielschwierigkeit von der dynamischen Klasse 
   * @returns 
   */
  getCurrentDifficulty(): number | undefined {
    const selectedDifficultyBtn = this.getElement(
      ".difficulty__btn--click"
    ) as HTMLButtonElement;
    if (
      selectedDifficultyBtn &&
      selectedDifficultyBtn.dataset &&
      selectedDifficultyBtn.dataset.difficulty
    ) {
      const selectedDifficulty = +selectedDifficultyBtn?.dataset?.difficulty;
      return selectedDifficulty;
    }
    return undefined;
  }

  printGameOutcome(score: Score, currentPlayer: string): void {
    const winnerMessageElement = this.getElement(
      ".score-board__winner"
    ) as HTMLDivElement;
    winnerMessageElement.classList.remove("score-board__winner--hidden");
    const scoreBoardElements = this.getAllElements(".score-board__player");
    scoreBoardElements.forEach((element) => {
      (<HTMLDivElement>element).classList.add("score-board--hidden");
    });
    const roundElement = this.getElement(
      ".score-board__round"
    ) as HTMLDivElement;
    roundElement.classList.add("score-board--hidden");
    if (score.o === score.x) {
      winnerMessageElement.innerHTML = `<p class="score-board__winner-label">Game Tied</p>`;
    } else if (score.o > score.x) {
      winnerMessageElement.innerHTML = `<p class="score-board__winner-label">Game won by Player</p>`;
    } else {
      winnerMessageElement.innerHTML = `<p class="score-board__winner-label">Game won by Computer</p>`;
    }
  }
}

/**
 * Main class startet das Tic-tac-toe
 */
class TicTacToe {
  display: GameDisplay;
  score: Score;
  players: PlayerMarker;
  currentPlayer: string;
  round: number;
  winner: boolean;

  constructor(display: GameDisplay) {
    this.display = display;
    this.score = { x: 0, o: 0 };
    this.players = { x: "Computer", o: "Player" };
    this.currentPlayer = this.players.x;
    this.round = 1;
    this.winner = false;
  }

  /**
   * Spieler klickt auf ein Feld oder der Computer wählt ein Feld, methode entscheidet was dann passiert(Methode checkt den Gewinner, startet ein neues Spiel).
   * @param tile HTMLDivElement Feld Element 
   */
  clickTile = (tile: HTMLDivElement) => {
    if (this.winner) {
      return;
    }

    tile.dataset["owned"] = this.currentPlayer == "Computer" ? "X" : "O";
    tile.innerHTML = `<span>${
      this.currentPlayer == "Computer" ? "X" : "O"
    }</span>`;
    this.winner = this.checkWinner(this.round, this.currentPlayer);
    if (!this.winner) {
      this.switchPlayer();
    } else {
      this.round += 1;
      if (this.round > (this.display.getCurrentDifficulty() ?? 0)) {
        this.increaseScore();
        this.display.updateScore(--this.round, this.score, this.currentPlayer);
        this.display.printGameOutcome(this.score, this.currentPlayer);
        setTimeout(() => {
          this.resetGame();
        }, 2000);
      } else {
        this.increaseScore();
        this.display.updateScore(--this.round, this.score, this.currentPlayer);
        this.players = { x: "Computer", o: "Player" };
        this.currentPlayer = this.players.x;
        setTimeout(() => {
          this.winner = false;
          this.round += 1;
          this.display.startWithDifficulty(this.clickTile);
        }, 2000);
      }
    }
  };

  /**
   * Errechnet Punktestand des Spielers 
   */
  increaseScore = (): void => {
    this.score[this.currentPlayer == "Computer" ? "x" : "o"] += 1;
  };

  /**
   * Switched den Spieler wenn Spiel bei letztem Zug nicht gewonnen wurde.
   */
  switchPlayer = (): void => {
    this.currentPlayer =
      this.currentPlayer === this.players.x ? this.players.o : this.players.x;
  };

  /**
   * Setzt die momentane ausgewählte Schwierigkeit zurück 
   * @returns 
   */
  getCurrentDifficulty = (): number => {
    return this.display.getCurrentDifficulty() ?? 0;
  };

  /**
   * Setzt das Spiel, Punktestand und das Spielfeld zurück
   */
  resetGame = (): void => {
    this.display.clearGameBoard();
    this.display.clearMessage();
    this.players = { x: "Computer", o: "Player" };
    this.currentPlayer = this.players.x;
    this.score = { x: 0, o: 0 };
    this.winner = false;
    this.round = 1;
  };

  /**
   * Ermittelt den Gewinner 
   * @param round aktuelle Runde
   * @param currentPlayer aktueller Spieler
   * @returns true wenn der Spieler für diese Runde gewonnen hat 
   */
  checkWinner = (round: number, currentPlayer: string): boolean => {
    return this.display.checkWinner(
      this.display.getCurrentDifficulty() ?? 0,
      currentPlayer,
      round
    );
  };

  /**
   * Wählt den Schwierigkeitesgrad vom Spiel aus
   * @param clickHandler 
   */
  selectDifficulty(clickHandler: (tile: HTMLDivElement) => void): void {
    const difficulty = <HTMLElement>this.display.getElement(".difficulty");
    difficulty.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLButtonElement;
      if (
        target.classList.contains("difficulty__btn") &&
        target.dataset?.difficulty
      ) {
        const selectedDifficulty = +target.dataset.difficulty;
        this.display
          .getAllElements(".difficulty__btn")
          .forEach((btn) =>
            (<HTMLButtonElement>btn).classList.remove("difficulty__btn--click")
          );
        target.classList.add("difficulty__btn--click");
        this.display.clearMessage();
        this.players = { x: "Computer", o: "Player" };
        this.currentPlayer = this.players.x;
        this.score = { x: 0, o: 0 };
        this.winner = false;
        this.round = 1;
        this.display.selectGameMode(selectedDifficulty, clickHandler);
      }
    });
  }

  /**
   * Löscht alle vorherigen DOM manipulationen und startet ein neues Spiel 
   */
  startGame(): void {
    this.resetGame();
    this.selectDifficulty(this.clickTile);
    this.display.resetGame(this.resetGame);
  }
}

const ticTacToe = new TicTacToe(new DOMDisplay());
ticTacToe.startGame();
