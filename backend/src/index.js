const expres = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = expres();
app.use(cors());

app.use(expres.json());

app.use(routes);

app.listen(3333);
///migration CLI



