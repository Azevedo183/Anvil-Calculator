function displayCombination(combination) {
  var result = "";
  for (var action in combination) {
    if (combination.hasOwnProperty(action) && combination[action] > 0) {
      result += combination[action] + ' x ' + action + '<br>';
    }
  }

  Swal.fire({
    title: 'Combinação de ações',
    html: result,
    icon: 'success',
    position: 'center',
    showConfirmButton: true,
    allowOutsideClick: false,
  });
}

document.getElementById('calculateButton').addEventListener('click', calculateCombination);
updateImage({ target: document.getElementById('action1') });
updateImage({ target: document.getElementById('action2') });
updateImage({ target: document.getElementById('action3') });
document.getElementById('action1').addEventListener('change', updateImage);
document.getElementById('action2').addEventListener('change', updateImage);
document.getElementById('action3').addEventListener('change', updateImage);

function calculateCombination() {
  var action1 = parseInt(document.getElementById('action1').value);
  var action2 = parseInt(document.getElementById('action2').value);
  var action3 = parseInt(document.getElementById('action3').value);

  var totalPoints = action1 + action2 + action3;
  var points = parseInt(document.getElementById('points').value) + totalPoints;

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

    var count = Math.floor(points / actionValue);
    combination[action] = count;
    points -= count * actionValue;
  }

  if (points === 0) {
    displayCombination(combination);
  } else {
    Swal.fire({
      title: 'No actions possible',
      text: "You have to insert the necessary points!",
      icon: 'error',
      position: 'center',
      footer: '<a href="https://www.curseforge.com/minecraft/texture-packs/tfc-anvil-helper">How can I find out the points?</a>',
      showConfirmButton: true,
      allowOutsideClick: false,
    });
    //document.getElementById('result').innerHTML = "Não há combinação de ações para atingir o valor " + points;
  }
}

function updateImage(event) {
  var selectedAction = event.target.value;
  var imageElementId = event.target.id + "Image";
  var imagePath = getImagePath(selectedAction); 

  document.getElementById(imageElementId).src = imagePath;
}

function getImagePath(action) {
  var actionImageMap = {
      '-3': './res/hit_light.png',
      '-5': './res/hard_hit.png',
      '-6': './res/medium_hit.png',
      '-15': './res/draw.png',
      '2': './res/punch.png',
      '7': './res/bend.png',
      '13': './res/upset.png',
      '16': './res/shrink.png',
  };

  return actionImageMap[action];
}