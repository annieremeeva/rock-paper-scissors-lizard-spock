let score = Number(JSON.parse(localStorage.getItem('score'))) || 0;
const scoreCount = document.querySelector('.score-count');  

scoreCount.innerHTML = score;
document.querySelectorAll('.js-game-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const {type} = button.dataset;
      document.querySelector('.game-wrapper').style.display = 'none';
      document.querySelector('.result-wrapper').innerHTML = `
        <div class="you-picked">
        <figure class="you-picked-figure">
          <label class="you-picked-label">You picked</label>
          <button class="you-picked-button ${type}-button-big action-circle-big">
            <img class="action-icon-big" src="./images/icon-${type}.svg">
          </button>
        </figure>
      </div>
      <div class="js-result result">
      </div>
      <div class="house-picked">
        <figure class="house-picked-figure">
          <label class="house-picked-label">House picked</label>
          <button class="js-house-picked-button house-picked-button waiting-circle"></button>
        </figure>
      </div>
      `
      setTimeout(() => {
        const computerType = getRandomMove();
        const housePickedButton = document.querySelector('.js-house-picked-button');
        housePickedButton.classList.remove('waiting-circle');
        housePickedButton.classList.add('action-circle-big');
        housePickedButton.classList.add(`${computerType}-button-big`);
        housePickedButton.innerHTML = `<img class="action-icon-big" src="./images/icon-${computerType}.svg">`
        setTimeout(() => {
          const result = getResult(type, computerType);
        document.querySelector('.js-result').innerHTML = `
          <label class="result-label">${result}</label>
          <button class="js-play-again-button play-again-button">
            Play again
          </button>
        `
        updateScore(result);
        document.querySelector('.js-play-again-button')
          .addEventListener('click', () => {
            document.querySelector('.game-wrapper').style.display = 'grid';
            document.querySelector('.result-wrapper').innerHTML = '';
          })
        }, 1000);
      }, 1000);
    })
  })

function getRandomMove() {
  const randomNumber = Math.random();
  let type;
  if (randomNumber < 1/5) {
    type = 'rock';
  } else if (randomNumber >= 1/5 && randomNumber < 2/5) {
    type = 'paper';
  } else if (randomNumber >= 2/5 && randomNumber < 3/5) {
    type = 'scissors';
  } else if (randomNumber >= 3/5 && randomNumber < 4/5) {
    type = 'lizard';
  } else if (randomNumber > 4/5) {
    type = 'spock';
  }
  return type; 
}

function getResult(type, computerType) {
  if (type === computerType) {
    return 'Draw'
  } else if (type === 'rock' && (computerType === 'scissors' || computerType === 'lizard')) {
    return 'You win';
  } else if (type === 'paper' && (computerType === 'rock' || computerType === 'spock')) {
    return 'You win';
  } else if (type === 'scissors' && (computerType === 'paper' || computerType === 'lizard')) {
    return 'You win';
  } else if (type === 'lizard' && (computerType === 'paper' || computerType === 'spock')) {
    return 'You win';
  } else if (type === 'spock' && (computerType === 'rock' || computerType === 'scissors')) {
    return 'You win';
  } else {
    return 'You lose';
  }
}

function updateScore(result) {
  switch (result) {
    case 'You win':
      score++;
      break;
    case 'You lose':
      score--;
      break;
    case 'Draw':
      break;
  }

  scoreCount.innerHTML = score;
  localStorage.setItem('score', JSON.stringify(score));
  
}

const resetScoreButton = document.querySelector('.js-reset-score-button');

resetScoreButton.addEventListener('click', () => {
  score = 0;
  scoreCount.innerHTML = score;
  localStorage.removeItem('score');
});

const rulesButton = document.querySelector('.js-rules-button');
const rules = document.querySelector('.js-rules-dialog');
const closeRules = document.querySelector('.js-close-rules-button');

rulesButton.addEventListener('click', () => {
  rules.style.display = 'flex';
});

closeRules.addEventListener('click', () => {
  rules.style.display = 'none';
})
