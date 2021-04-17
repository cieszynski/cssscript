/* bottomsheet */
"use strict"

var bottomsheet;
addEventListener('load', function (e) {
    const STATE_HOME = 0;
    const STATE_SHEET = 1;
    const style = document.styleSheets[0];

    style.insertRule(`
    @media (max-width: 699px) {
        body {
            display: flex;
            flex-direction: column-reverse;
        }

        [data-type=bottom-sheet] {
            background-color: white;
            transition: height .5s;
            flex-shrink: 0;
            height: 56px;
            position: relative;
            padding: 16px 0 0 0;
        }

        [data-type=bottom-sheet] {
            background-color: white;
            transition: height .5s;
            flex-shrink: 0;
            height: 56px;
            position: relative;
            padding: 16px 0 0 0;
        }

        /* scrim */
        [data-type=bottom-sheet]::before {
            content: " ";
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0);
            transition: background-color .5s;
            z-index: -1;
        }

        /* scrim */
        [data-type=bottom-sheet]:focus::before {
            background-color: rgba(0, 0, 0, .5);
        }

        [data-type=bottom-sheet]:focus~main {
            z-index: -1;
        }

        [data-type=bottom-sheet]::after {
            font: 20px material;
            content: "\\e5ce";
            position: absolute;
            text-align: center;
            display: block;
            height: 16px;
            width: 100%;
            top: 0px;
        }

        [data-type=bottom-sheet]:focus::after {
            content: "\\e5cf";
        }


        [data-type=bottom-sheet]:focus {
            border-top: 4px solid rgba(0, 0, 0, .25);
            background-clip: padding-box;
        }
    }`);
    style.insertRule(`
    @media (max-width: 699px) and (orientation: landscape) {
        [data-type=bottom-sheet]:focus {
            height: 80vh;
        }
    }`);
    style.insertRule(`
    @media (max-width: 699px) and (orientation: portrait) {
        [data-type=bottom-sheet]:focus {
            height: 50vh;
        }
    }`);
    style.insertRule(`
    @media (min-width: 700px) {
        body {
            display: flex;
            flex-direction: row-reverse;
        }

        [data-type=bottom-sheet] {
            height: 100%;
            width: 256px;
        }
    }`);

    bottomsheet = document.querySelector('[data-type=bottom-sheet]');
    bottomsheet.tabIndex = -1;
    bottomsheet.addEventListener('focus', function (e) {
        history.pushState(STATE_SHEET, "");
    });
    bottomsheet.addEventListener('blur', function (e) {
        if (history.state !== STATE_HOME) {
            history.back();
        }
    });
    bottomsheet.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (this.point) {
            if ((e.changedTouches[0].clientY - this.point.clientY) > 0) this.blur();
            if ((e.changedTouches[0].clientY - this.point.clientY) < 0) this.focus();
        }
        this.point = e.changedTouches[0];
    });
    addEventListener('popstate', (function (e) {
        this.blur();
    }).bind(bottomsheet))
    history.replaceState(STATE_HOME, "");
});