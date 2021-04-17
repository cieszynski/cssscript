/* drawer */
"use strict"
var drawer;

addEventListener('load', function (e) {
    const STATE_HOME = 0;
    const STATE_DRAWER = 1;
    const style = document.styleSheets[0];

    style.insertRule(`@media (max-width: 699px) {
        [data-type=drawer] {
            position: fixed;
            top: 0;
            left: -256px;
            width: 256px;
            height: 100%;
            z-index: 200;
            transition: left .5s;
            border-right: 16px solid transparent;
            box-sizing: content-box;
        }

        [data-type=drawer]:focus {
            left: 0;
        }

        [data-type=drawer]:focus~* {
            pointer-events: none;
        }

        /* scrim */
        [data-type=drawer]::before {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            content: " ";
            pointer-events: none;
            transition: background-color .3s;
            background-color: rgba(0, 0, 0, 0);
            z-index: -1;
        }

        [data-type=drawer]:focus::before {
            background-color: rgba(0, 0, 0, .5);
        }

        /* hamburger */
        [data-type=drawer]::after {
            position: fixed;
            top: 16px;
            left: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 24px;
            font: 24px material;
            content: "\\e5d2";
            z-index: -1;
            transition: transform .5s;
        }
    }`);
        style.insertRule(`@media (min-width: 700px) {
        body {
            display: flex;
            flex-direction: row;
        }

        [data-type=drawer] {
            width: 256px;
            height: 100%;
        }
    }`);

    drawer = document.querySelector('[data-type=drawer]');
    drawer.tabIndex = -1;
    drawer.addEventListener('focus', function (e) {
        history.pushState(STATE_DRAWER, "");
    });
    drawer.addEventListener('blur', function (e) {
        if (history.state !== STATE_HOME) {
            history.back();
        }
    });
    drawer.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (drawer.point) {
            if ((e.changedTouches[0].clientX - drawer.point.clientX) < 0) this.blur();
            if ((e.changedTouches[0].clientX - drawer.point.clientX) > 0) this.focus();
        }
        drawer.point = e.changedTouches[0];
    });
    addEventListener('popstate', (function (e) {
        this.blur();
    }).bind(drawer))
    history.replaceState(STATE_HOME, "");
});