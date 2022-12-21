/**
 * This script can be injected into an HTML page so that the refresh token flow
 * can happen as early as possible.
 *
 * If instead we wait until the React app (SPA) loads to start the flow,
 * we risk the client browsing the page or making requests with expired tokens.
 *
 * With this minified payload, we create a refresh token request before or while the app loads.
 * In `@myorg/core`, it is added to the `index.html` template.
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

function refreshTokenOnLoadScript() {
  function decodeToken(token) {
    const atob = window.atob;

    // https://github.com/auth0/jwt-decode/blob/master/lib/base64_url_decode.js
    function b64DecodeUnicode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw new Error('Invalid');
      }

      try {
        return decodeURIComponent(
          atob(str).replace(/(.)/g, function (m, p) {
            var code = p.charCodeAt(0).toString(16).toUpperCase();
            if (code.length < 2) {
              code = '0' + code;
            }
            return '%' + code;
          })
        );
      } catch (err) {
        return atob(output);
      }
    }

    return JSON.parse(b64DecodeUnicode(token.split('.')[1]));
  }

  function csrfToken() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; csrf_refresh_token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  try {
    const fetch = window.fetch;
    const token = window.localStorage.getItem('access_token');
    if (!token) return;
    const decodedToken = decodeToken(token);
    const currentTime = Date.now();
    const expirationTime = new Date(decodedToken.exp * 1000);
    const buffer = 60 * 1000;
    if (expirationTime - currentTime < buffer) {
      fetch(`/auth/refresh`, {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': csrfToken() }
      })
        .then(response => response.json())
        .then(data => {
          data.access_token &&
            window.localStorage.setItem('access_token', data.access_token);
        });
    }
  } catch (error) {}
}

let code = `(${String(refreshTokenOnLoadScript)})()`;
code = minify(code).code;

console.log(code);

fs.writeFileSync(
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'core/public/static/js/refreshTokenOnLoadScript.js'
  ),
  `/* eslint-disable */ /* prettier-ignore */ ${code}`,
  { flag: 'w' },
  () => {}
);
