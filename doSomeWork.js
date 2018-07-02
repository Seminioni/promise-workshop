// Promise It Won’t Hurt
// ───────────────────────
//  Do some work
//  Exercise 13 of 13


// # Let's do several operations against "remote" machines

// Sending and fetching data from computers/processes other than your
// application is an increasingly common task in the world of Node.js
// and the browser.  Many times, you will need to gather data from
// several sources, perform operations on it, and send some data back out.

// ## Task

// Let's talk to two remote processes over HTTP being run by your friend
// and mine, "localhost".

//   * Port 7000: Faux session cache (Redis or some such thing)
//   * Port 7001: Faux database (MongoDB, LevelDB, Postgres, etc)

// As in the previous lesson, use the q-io module to create promises
// as wrappers for HTTP responses.  Hint: You will probably need more
// than one promise…

//   * Send an HTTP GET request to the session cache on port 7000.  A stringwill be returned to you representing a user ID.
//   * Grab that ID from the session response and send an HTTP GET request toyour database on port 7001 to the url `localhost:7001/<id>`.
//   * If successfully done, your database will return a user object.`console.log` it to win many nerd-points.

const qhttp = require('q-io/http');
const BufferStream = require("q-io/buffer-stream");

qhttp.request({
    method: 'GET',
    url: 'http://localhost:7000'
  })
  .then(r => r.body.read())
  .then(buffer => {
    const id = buffer.toString('utf-8')

    return qhttp.request({
      method: 'GET',
      url: `http://localhost:7001/${id}`
    })
  })
  .then(r => r.body.read())
  .then(buffer => {
    const data = JSON.parse(buffer.toString('utf-8'))
    console.log(data)
  })


// Solution...

// var qhttp = require('q-io/http');

//     qhttp.read("http://localhost:7000/")
//     .then(function (id) {
//       return qhttp.read("http://localhost:7001/" + id);
//     })
//     .then(function (json) {
//       console.log(JSON.parse(json));
//     })
//     .then(null, console.error)
//     .done();
