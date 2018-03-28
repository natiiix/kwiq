import { Interpreter } from "./Interpreter";
import { KeyCode } from "./KeyCode";

const elemCode: HTMLTextAreaElement = document.getElementById("code") as HTMLTextAreaElement;
const elemConsole: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
const elemSaveButton: HTMLElement = document.getElementById("btnSave");

const keyStates: { [id: number]: boolean } = {};
let interpreterReady: boolean = true;

function isKeyDown(key: number): boolean {
    const keyState: undefined | boolean = keyStates[key];
    return typeof keyState !== undefined && keyState;
}

function getKeyCode(e: KeyboardEvent): number {
    return e.which || e.keyCode;
}

function hasKeyCode(e: KeyboardEvent, key: number): boolean {
    return getKeyCode(e) === key;
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
    if (!interpreterReady) {
        alert("Interpreter is currently busy!");
        return;
    }

    const interpretation: Promise<void> = new Promise((resolve: () => void, reject: (err: Error) => void): void => {
        appendConsole("Interpreting...");
        interpreterReady = false;

        try {
            (new Interpreter()).interpret(code, cbLog);
            resolve();
        } catch (err) {
            reject(err);
        }
    });

    interpretation
        .then(() => {
            cbLog("Done!");
            interpreterReady = true;
        })
        .catch((err: Error) => {
            cbLog(`Error: ${err.name}\nMessage: ${err.message}\nStack Trace: ${err.stack}`);
            interpreterReady = true;
        });
}

elemCode.addEventListener("keydown", (e: KeyboardEvent): void => {
    if (hasKeyCode(e, KeyCode.F5)) {
        e.preventDefault();

        if (!isKeyDown(KeyCode.F5)) {
            interpretAsync(elemCode.value, appendConsole);
        }
    } else if (hasKeyCode(e, KeyCode.KEY_S)) {
        if (e.ctrlKey) {
            e.preventDefault();

            if (!isKeyDown(KeyCode.KEY_S)) {
                elemSaveButton.click();
            }
        }
    } else if (hasKeyCode(e, KeyCode.TAB)) {
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
    if (hasKeyCode(e, KeyCode.F5)) {
        e.preventDefault();
    }

    keyStates[getKeyCode(e)] = false;
});

elemSaveButton.addEventListener("click", (e: MouseEvent) => {
    elemSaveButton.setAttribute("href", "data:;charset=utf-8," + encodeURIComponent(elemCode.value));
});
