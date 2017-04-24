//main.js
var del = document.getElementById('delete');
var syntaxToggle = document.getElementById('syntax-toggle');
syntaxToggle.style.cursor = 'pointer';

/**
 * delet element from database
 */
del.addEventListener('click', () => {

    fetch('inputs', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'input'
        })
    }).then(res => {
        window.location.reload(true);
    })
})

/**
 * toogle the syntax bar
 */
syntaxToggle.addEventListener('click', () => {
    var synTable = $('#syntax-table');
    synTable.toggle();
    if (synTable.is(':visible')) {
        $('.toggle-arrow').text('arrow_drop_up');
    } else {
        $('.toggle-arrow').text('arrow_drop_down');
    }
})

