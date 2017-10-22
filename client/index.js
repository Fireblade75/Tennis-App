const React = require('react');
const ReactDOM = require('react-dom');

// Require the less file
require('./less/style.less');

let PageComponent;
switch (location.pathname) {
    case '/':   // fall-through
    case '/index.html':
        PageComponent = require('./pages/HomePage');
        break;
    case '/matches.html':
        PageComponent = require('./pages/MatchPage');
        break;
    case '/players.html':
        PageComponent = require('./pages/PlayerPage');
        break;
}

window.React = React;

$(document).ready(function() {
    ReactDOM.render(
        <PageComponent title='Tennis App' />,
        document.getElementById('react-container')
    );
});

