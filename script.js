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
  var actionValues = {
    'HIT LIGHT': -3,
    'HARD HIT': -5,
    'MEDIUM HIT': -6,
    'DRAW': -15,
    'PUNCH': 2,
    'BEND': 7,
    'UPSET': 13,
    'SHRINK': 16
  };

  var totalPoints = 0;
  var selectedActions = [];

  // Obter os valores das ações selecionadas e somá-los
  for (var i = 1; i <= 3; i++) {
    var actionId = 'action' + i;
    var selectedAction = document.getElementById(actionId).value;
    selectedActions.push(selectedAction);
    totalPoints += actionValues[selectedAction];
  }

  var targetValue = parseInt(document.getElementById('points').value);
  var combination = findCombination(totalPoints, targetValue);

  if (combination) {
    displayCombination(combination);
  } else {
    document.getElementById('result').innerHTML = "Não há combinação de ações para atingir o valor " + targetValue;
  }
}

function findCombination(totalPoints, targetValue) {
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

  var sortedActions = Object.keys(availableActions).sort(function(a, b) {
    return availableActions[b] - availableActions[a];
  });

  for (var i = 0; i < sortedActions.length; i++) {
    var action = sortedActions[i];
    var actionValue = availableActions[action];

    var count = Math.floor(targetValue / actionValue);
    combination[action] = count;
    targetValue -= count * actionValue;
  }

  return targetValue === 0 ? combination : null;
}
