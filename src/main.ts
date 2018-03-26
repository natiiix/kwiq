import { Interpreter } from "./interpreter";
import { keyCodes } from "./keyCodes";

const elemCode: HTMLTextAreaElement = document.getElementById("code") as HTMLTextAreaElement;
const elemConsole: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
const elemSaveButton: HTMLElement = document.getElementById("buttonSave");

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

function appendConsole(text: string): void {
    if (elemConsole.value.length) {
        elemConsole.value += "\n" + text;
    } else {
        elemConsole.value = text;
    }

    elemConsole.scrollTop = elemConsole.scrollHeight;
}

function interpretAsync(code: string, cbLog: (text: string) => void): void {
    (new Promise((resolve: () => void, reject: () => void): void => {
        appendConsole("Interpreting...");

        try {
            (new Interpreter()).interpret(code, cbLog);
            resolve();
        } catch {
            reject();
        }
    }))
        .then(() => cbLog("Done!"))
        .catch(() => cbLog("Error!"));
}

elemCode.addEventListener("keydown", (e: KeyboardEvent): void => {
    if (hasKeyCode(e, keyCodes.F5)) {
        e.preventDefault();

        if (!isKeyDown(keyCodes.F5)) {
            interpretAsync(elemCode.value, appendConsole);
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
});
