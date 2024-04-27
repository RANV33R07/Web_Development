fetch(`https://randomuser.me/api/`)
.then(raw => raw.json())
.then(readable => console.log(readable.results[0].location))