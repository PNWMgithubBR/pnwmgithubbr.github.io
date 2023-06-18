// ==UserScript==
// @name         TwiDont
// @namespace    Violentmonkey Scripts
// @version      0.1
// @description  Não faça tweets pfv
// @author       TADL
// @match        *://*twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var maxAttempts = 69;
    var currentAttempt = 0;
    var intervalTime = 1000; // Intervalo de 1 segundos entre as tentativas

    var removeTweetButton = function() {
        var tweetButton = document.querySelector('[data-testid="SideNav_NewTweet_Button"]');
        if (tweetButton) {
            var parentElement = tweetButton.parentElement;
            if (parentElement.tagName === 'A') {
                parentElement.remove();
            } else {
                tweetButton.remove();
            }
        } else if (currentAttempt < maxAttempts) {
            currentAttempt++;
            setTimeout(removeTweetButton, intervalTime);
        }
    };

    var removeDiv = function() {
        var divElements = document.querySelectorAll('div.css-1dbjc4n.r-18u37iz.r-1h0z5md');
        divElements.forEach(function(divElement) {
            divElement.remove();
        });
    };

    var removeDiv2 = function() {
        var divElements = document.querySelectorAll('div.css-1dbjc4n.r-18u37iz.r-1w6e6rj');
        divElements.forEach(function(divElement) {
            divElement.remove();
        });
    };

    var removeDiv3 = function() {
        var divElements = document.querySelectorAll('div.css-1dbjc4n.r-yfoy6g.r-1h8ys4a');
        divElements.forEach(function(divElement) {
            divElement.remove();
        });
    };

    setTimeout(removeTweetButton, intervalTime);
    setInterval(removeDiv, intervalTime);
    setInterval(removeDiv2, intervalTime);
    setInterval(removeDiv3, intervalTime);
})();
