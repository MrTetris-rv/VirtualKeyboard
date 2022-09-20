import {
    keyboardKeys,
    engKeys,
    engKeysUpperCase,
    engKeysShift,
    rusKeys,
    rusKeysUpperCase,
    rusKeysShift
} from './keyboard.js';

window.onload = function () {
    const textarea = `<div class="textarea" >
    <textarea id="text" name="name" rows="8" readonly cols="80">
    </textarea></div>`;
    const keyboard = '<div id="keyboard"></div>';
    const languageP = '<p class="language">eng</p>';
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', keyboard);
    body.insertAdjacentHTML('afterbegin', languageP);
    body.insertAdjacentHTML('afterbegin', textarea);
    const language = document.querySelector('.language');
    const button = '<input type="button" class="alwaysshift" value="^">';
    const info = '<p class="info">switch language shift+alt , win </p>';
    body.insertAdjacentHTML("beforeend", info);
    let initKeyboad = () => {
        let keysLang;
        let i = 0;
        let keyValue = '';
        let llang = localStorage.getItem('Lang');
        if (llang == "ru") {
            keysLang = rusKeys;
            language.textContent = "rus";
        } else {
            keysLang = engKeys;
            language.textContent = "eng";
        }
        keyboardKeys.forEach((el) => {
            keyValue += `<div class="key-def" data=` + el + `>${keysLang[i]}</div>`;
            i++;
        });
        document.getElementById('keyboard').innerHTML = keyValue;
    };
    initKeyboad();

    const shiftButton = document.querySelector('div[data="16"]');
    shiftButton.insertAdjacentHTML("afterend", button);

    let element;
    let CapsLockbool = true;

    document.addEventListener('keydown', (event) => {
        if (event.code == "Tab") {
            event.preventDefault();
        }
        if (event.code == "ShiftRight") {
            element = document.querySelector('div[data="228"]');
        } else if (event.code == "ControlRight") {
            element = document.querySelector('div[data="1337"]');
        } else if (event.code == "AltRight") {
            element = document.querySelector('div[data="888"]');
        } else {
            element = document.querySelector('div[data="' + `${event.keyCode}` + '"]');
        }
        if (element) {
            element.classList.toggle('active');
        }

        switch (event.key) {
            case 'AltGraph':
                break;
            case 'Enter':
                document.getElementById('text').value += '\n';
                break;
            case 'Tab':
                document.getElementById('text').focus();
                document.getElementById('text').value += '\t';
                break;
            case 'Meta':
                document.getElementById('text').value += '';
                break;
            case 'Control':
                document.getElementById('text').value += '';
                break;
            case 'Alt':
                document.getElementById('text').value += '';
                break;
            case 'ArrowDown':
                document.getElementById('text').value += '↓';
                break;
            case 'ArrowUp':
                document.getElementById('text').value += '↑';
                break;
            case 'ArrowLeft':
                document.getElementById('text').value += '←';
                break;
            case 'ArrowRight':
                document.getElementById('text').value += '→';
                break;
            case 'CapsLock':
                if (CapsLockbool) {
                    CapsLock();
                    element.classList.toggle('activeShift');
                    CapsLockbool = false;
                }
                break;
            case 'Backspace':
                backSpace();
                break;
            case 'Shift':
                Shift();
                break;
            default:
                if (element) {
                    document.getElementById('text').value += element.innerHTML;
                }
                break;
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.code == "ShiftRight") {
            element = document.querySelector('div[data="228"]');
        } else if (event.code == "ControlRight") {

            element = document.querySelector('div[data="1337"]');
        } else if (event.code == "AltRight") {
            element = document.querySelector('div[data="888"]');
        } else {
            element = document.querySelector('div[data="' + `${event.keyCode}` + '"]');
        }

        switch (event.key) {
            case 'Alt':
                element.classList.remove('active');
                document.getElementById('text').value += '';
                break;
            case 'ArrowDown':
                element.classList.remove('active');
                document.getElementById('text').value += '';
                break;
            case 'ArrowUp':
                element.classList.remove('active');
                document.getElementById('text').value += '';
                break;
            case 'ArrowLeft':
                element.classList.remove('active');
                document.getElementById('text').value += '';
                break;
            case 'ArrowRight':
                element.classList.remove('active');
                document.getElementById('text').value += '';
                break;
            case 'Backspace':
                element.classList.remove('active');
                break;
            case 'CapsLock':
                element.classList.remove('active');
                CapsLockbool = true;
                break;
            case 'Tab':
                element.classList.remove('active');
                break;
            case 'Shift':
                Shift();
                element.classList.remove('active');
                break;
            default:
                if (element) {
                    element.classList.remove('active');
                }
                break;
        }
    });

    let eventTarget = document.querySelector('div[data="81"]');

    document.addEventListener('mousedown', (event) => {
        eventTarget = event.target;
        if (event.target.classList.value == "alwaysshift" ||
            event.target.classList.value == "alwaysshift activeShift") {
            Shift();
            event.target.classList.toggle('activeShift');
        }

        if (event.target.classList.value == "key-def" ||
            event.target.classList.value == "key-def activeShift") {
            event.target.classList.add('active');
            switch (event.target.innerHTML) {
                case 'Enter':
                    document.getElementById('text').value += '\n';
                    break;
                case 'Win':
                    break;
                case 'Tab':
                    document.getElementById('text').value += '\t';
                    break;
                case 'Meta':
                    document.getElementById('text').value += '';
                    break;
                case 'Ctrl':
                    document.getElementById('text').value += '';
                    break;
                case 'Alt':
                    document.getElementById('text').value += '';
                    break;
                case 'Backspace':
                    backSpace();
                    break;
                case 'Shift':
                    Shift();
                    break;
                case 'Caps Lock':
                    event.target.classList.toggle('activeShift');
                    CapsLock();
                    break;
                default:
                    document.getElementById('text').value += (event.target.innerHTML);
                    break;
            }
        }

    });

    document.addEventListener('mouseup', () => {
        switch (eventTarget.innerHTML) {
            case 'Shift':
                Shift();
                break;
            default:
                break;
        }
        eventTarget.classList.remove('active');
    });

    function backSpace() {
        document.getElementById('text').value = document.getElementById('text').value.slice(0, -1);
    }

    function CapsLock() {
        const word = document.querySelector('div[data="65"]').innerHTML;
        switch (word) {
            case "A":
                keysContent(engKeys);
                break;
            case "a":
                keysContent(engKeysUpperCase);
                break;
            case "Ф":
                keysContent(rusKeys);
                break;
            case "ф":
                keysContent(rusKeysUpperCase);
                break;
            default:
                break;
        }
    }

    function Shift() {
        let word = document.querySelector('div[data="81"]').innerHTML;
        switch (word) {
            case "q":
                keysContent(engKeysShift);
                break;
            case "Q":
                keysContent(engKeys);
                break;

            case "й":
                keysContent(rusKeysShift);
                break;

            case "Й":
                keysContent(rusKeys);
                break;

            default:
                break;
        }
    }

    const keys = document.querySelectorAll('#keyboard div');
    const keysContent = (langKeys) => {
        let i = 0;
        if (langKeys == engKeysUpperCase || langKeys == engKeysShift || langKeys == engKeys) {
            localStorage.setItem('Lang', "eng");
        } else {
            localStorage.setItem('Lang', "ru");
        }
        keys.forEach((el) => {
            el.innerText = langKeys[i];
            i++;
        });
    };

    document.addEventListener('keydown', (event) => {

        if ((event.key == "Shift" && event.altKey) || (event.key == "Alt" && event.shiftKey)) {
            let word = document.querySelector('div[data="81"]').innerHTML;
            switch (word) {
                case "q":
                    language.textContent = "rus";
                    keysContent(rusKeys);
                    break;
                case "Q":
                    language.textContent = "rus";
                    keysContent(rusKeysUpperCase);
                    break;
                case "й":
                    language.textContent = "eng";
                    keysContent(engKeys);
                    break;
                case "Й":
                    language.textContent = "eng";
                    keysContent(engKeysUpperCase);
                    break;
                default:
                    break;
            }
        }
    });
    document.addEventListener('mouseup', (event) => {
        if (event.target.innerHTML == "Win") {
            let word = document.querySelector('div[data="81"]').innerHTML;
            switch (word) {
                case "q":
                    language.textContent = "rus";
                    keysContent(rusKeys);
                    break;
                case "Q":
                    language.textContent = "rus";
                    keysContent(rusKeysUpperCase);
                    break;
                case "й":
                    language.textContent = "eng";
                    keysContent(engKeys);
                    break;
                case "Й":
                    language.textContent = "eng";
                    keysContent(engKeysUpperCase);
                    break;
                default:
                    break;
            }
        }
    });

};