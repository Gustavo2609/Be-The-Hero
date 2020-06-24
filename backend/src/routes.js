const express = require('express');

const ongscontrol = require('./control/ong_control');
const IncCont = require('./control/inc_control');
const ProfileCont = require('./control/ProfileControl');
const sessions = require('./control/sessionCon');

const routes = express.Router();


routes.post('/sessions', sessions.create);


routes.get('/ongs', ongscontrol.index) 
routes.post('/ongs', ongscontrol.create);
  
routes.get('/profile', ProfileCont.index);

routes.get('/incidents', IncCont.index);
routes.post('/incidents', IncCont.create);
routes.delete('/incidents/:id', IncCont.delete);

module.exports = routes;