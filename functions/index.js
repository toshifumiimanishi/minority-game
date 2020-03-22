const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');
const app = express();
const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/assets/'
  }
};
const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject)
    })
  })
}

app.use(handleRequest);
exports.ssrapp = functions.https.onRequest(app);
