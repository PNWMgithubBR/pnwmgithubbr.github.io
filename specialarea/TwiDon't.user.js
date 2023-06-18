// ==UserScript==
// @name         TwiDon't
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Não faça tweets pfv
// @author       TADL
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função para remover a div
    function removerDiv() {
        var elements = document.querySelectorAll('a[data-testid="SideNav_NewTweet_Button"]');
        if (elements.length > 0) {
            elements.forEach(function(element) {
                var parentDiv = element.closest('div');
                if (parentDiv) {
                    parentDiv.parentNode.removeChild(parentDiv);
                }
            });
        }
    }

    // Chama a função para remover a div após a página carregar
    window.addEventListener('load', removerDiv);
})();