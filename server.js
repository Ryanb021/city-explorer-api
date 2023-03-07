'use strict';

console.log ('I am Batman!');


const express = require('express');

require('dotenv').config();


const app = express();

const PORT = process.env.PORT || 3002;


//LISTEN, needs server started, tarhets express method that it takes in 2 arguments, needs a port value and a callback function


app.listen(PORT, () => console.log(`listening on ${PORT}`));
