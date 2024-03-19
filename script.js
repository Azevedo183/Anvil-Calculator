function displayCombination(combination) {
  var result = "Combinação de ações para atingir o valor: <br>";
  for (var action in combination) {
    if (combination.hasOwnProperty(action) && combination[action] > 0) {
      result += combination[action] + ' x ' + action + '<br>';
    }
  }
  document.getElementById('result').innerHTML = result;
}

document.getElementById('calculateButton').addEventListener('click', calculateCombination);

function calculateCombination() {
  var points = parseInt(document.getElementById('points').value);

  var availableActions = {
    'HIT LIGHT': -3,
    'HARD HIT': -5,
    'MEDIUM HIT': -6,
    'DRAW': -15,
    'PUNCH': 2,
    'BEND': 7,
    'UPSET': 13,
    'SHRINK': 16
  };

  var combination = {};

  // Ordenar as ações disponíveis pelos seus valores para começar com as ações que têm o maior impacto
  var sortedActions = Object.keys(availableActions).sort(function(a, b) {
    return availableActions[b] - availableActions[a];
  });

  for (var i = 0; i < sortedActions.length; i++) {
    var action = sortedActions[i];
    var actionValue = availableActions[action];

    var count = Math.floor(points / actionValue);
    combination[action] = count;
    points -= count * actionValue;
  }

  if (points === 0) {
    displayCombination(combination);
  } else {
    document.getElementById('result').innerHTML = "Não há combinação de ações para atingir o valor " + points;
  }
}

