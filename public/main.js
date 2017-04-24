//main.js
var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', () => {
    fetch('inputs', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'input', 
            'input': '# Heading1',
            'output': '<h1> Heading1</h1>'
        })
    })
    .then(res => {
            if(res.ok) return res.json();
    })
    .then(data => {
            console.log(data);
            window.location.reload(true);
        })
    })

del.addEventListener('click', ()=> {
  fetch('inputs', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'name': 'Input'
    })
  }).then(res=>{
    window.location.reload(true);      
 })
})