const express = require('express');
const router = express.Router();
const serverHealthManager = require('../managers/healthCheckManager.js');

router.get(
  '/',
  serverHealthManager.serverStatus,
);

module.exports = router;
