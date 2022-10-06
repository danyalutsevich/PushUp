import fetch from 'node-fetch';
var requests=0;
setInterval(() => {
    fetch('http://pushup.ddns.net:8008/profile/danyalutsevich')
    .then(res => res.json())
    .then(data => {
        requests++
    console.log(data)})
}, 100)