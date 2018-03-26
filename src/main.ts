import { keyCodes } from "./keyCodes";

const elemCode: HTMLTextAreaElement = document.getElementById("code") as HTMLTextAreaElement;
const elemConsole: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
const elemSaveButton: HTMLElement = document.getElementById("buttonSave");

function compile(code: string): string {
    return "Hello World!\n" + code;
}

const keyStates: { [id: number]: boolean } = {};

function isKeyDown(keyCode: number): boolean {
    const keyState: undefined | boolean = keyStates[keyCode];
    return typeof keyState !== undefined && keyState;
}

function getKeyCode(e: KeyboardEvent): number {
    return e.which || e.keyCode;
}

function hasKeyCode(e: KeyboardEvent, keyCode: number): boolean {
    return getKeyCode(e) === keyCode;
}

elemCode.addEventListener("keydown", (e: KeyboardEvent): void => {
    if (hasKeyCode(e, keyCodes.F5)) {
        e.preventDefault();

        if (!isKeyDown(keyCodes.F5)) {
            elemConsole.innerHTML = compile(elemCode.value);
            elemConsole.scrollTop = elemConsole.scrollHeight;
            console.log("Compiled!");
        }
    } else if (hasKeyCode(e, keyCodes.KEY_S)) {
        if (e.ctrlKey) {
            e.preventDefault();

            if (!isKeyDown(keyCodes.KEY_S)) {
                elemSaveButton.click();
            }
        }
    } else if (hasKeyCode(e, keyCodes.TAB)) {
        e.preventDefault();

        const tabValue: string = "    ";

        const oldValue: string = elemCode.value;
        const start: number = elemCode.selectionStart;
        const end: number = elemCode.selectionEnd;

        elemCode.value = oldValue.substring(0, start) + tabValue + oldValue.substring(end, oldValue.length);
        elemCode.selectionEnd = elemCode.selectionStart = start + tabValue.length;
    }

    keyStates[getKeyCode(e)] = true;
});

elemCode.addEventListener("keyup", (e: KeyboardEvent): void => {
    if (hasKeyCode(e, keyCodes.F5)) {
        e.preventDefault();
    }

    keyStates[getKeyCode(e)] = false;
});

elemSaveButton.addEventListener("click", (e: MouseEvent) => {
    elemSaveButton.setAttribute("href", "data:;charset=utf-8," + encodeURIComponent(elemCode.value));
    elemSaveButton.setAttribute("target", "_blank");
});
