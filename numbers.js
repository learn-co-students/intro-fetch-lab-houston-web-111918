function fetchNumTrivia(num) {
  return fetch(`http://numbersapi.com/${num}/trivia`)
    .then(res => res.text());
}

function numberOne() {
  const oneFactsDiv = document.querySelector('#one-facts');
  oneFactsDiv.innerHTML = '';

  fetchNumTrivia(1)
    .then(triv => {
      oneFactsDiv.innerHTML = triv
    })

}

function pickANumber() {
  let randomMathFact = document.querySelector('#random-math-fact');
  let pickNumDiv = document.querySelector('#pick-a-number').value;

  if (isNaN(pickNumDiv)) {
    randomMathFact.innerHTML = "please enter a valid number";
  } else {
    fetchNumTrivia(pickNumDiv)
      .then(triv => {
        randomMathFact.innerText = triv
      })
  }
}

function fetchYearFact(year) {
  return fetch(`http://numbersapi.com/${year}/year`)
    .then(res => res.text());
}

function displayYearFact(year) {
  let yearHistoryDiv = document.querySelector('#year-history');

  fetchYearFact(year)
    .then(fact => {
      yearHistoryDiv.innerHTML = fact
    })
}

function setYearFactInterval() {
  let year = new Date().getFullYear();
  displayYearFact(year);
  setInterval(function() {
    year--;
    displayYearFact(year)
  }, 5000)
}

function getAllNumbers() {
  return fetch('http://numbersapi.com/1..100')
    .then(res => res.json())
}

function showAllNumbers() {
  const allTheNumbersDiv = document.querySelector('#all-the-numbers');

  getAllNumbers()
    .then(numbers => {
      let html = '<ul>';
      for (key in numbers) {
        html += `<li>${numbers[key]}</li>`
      }
      html += '</ul>'
      allTheNumbersDiv.innerHTML = html;
    })
    // .then(nums => {
    //   let unorderedList = [];
    //   document.createElement('ul');
    //   nums.forEach(function(e) {
    //     document.createElement('li').push(unorderedList);
    //
    //   })
    // })
}

document.addEventListener('DOMContentLoaded', function() {
  let oneButton = document.querySelector('#number-one');
  oneButton.addEventListener('click', numberOne);
  let numberFormField = document.querySelector('#pick-a-number');
  numberFormField.addEventListener('change', pickANumber);
  setYearFactInterval();
  let allNumsButton = document.querySelector('#all-numbers-button');
  allNumsButton.addEventListener('click', showAllNumbers);
});
