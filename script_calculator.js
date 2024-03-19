document.getElementById('calculateButton').addEventListener('click', pointsCalculator);

function pointsCalculator() {
    var hit_light_value = parseInt(document.getElementById('hit_light').value);
    var hard_hit_value = parseInt(document.getElementById('hard_hit').value);
    var medium_hit_value = parseInt(document.getElementById('medium_hit').value);
    var draw_value = parseInt(document.getElementById('draw').value);
    var punch_value = parseInt(document.getElementById('punch').value);
    var bend_value = parseInt(document.getElementById('bend').value);
    var upset_value = parseInt(document.getElementById('upset').value);
    var shrink_value = parseInt(document.getElementById('shrink').value);

    if (isNaN(hit_light_value) || isNaN(hard_hit_value) || isNaN(medium_hit_value) ||
        isNaN(draw_value) || isNaN(punch_value) || isNaN(bend_value) ||
        isNaN(upset_value) || isNaN(shrink_value)) {
        Swal.fire({
            title: 'Error',
            text: 'Please enter valid numbers in all input fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

    var totalPoints = (-3 * hit_light_value) + (-5 * hard_hit_value) +
        (-6 * medium_hit_value) + (-15 * draw_value) + (2 * punch_value) +
        (7 * bend_value) + (13 * upset_value) + (16 * shrink_value);

    Swal.fire({
        title: 'Total Points',
        text: 'The total points is: ' + totalPoints,
        icon: 'success',
        confirmButtonText: 'OK'
    });
};

