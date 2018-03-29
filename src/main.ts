import * as ace from "brace";
import "brace/ext/beautify";
import "brace/ext/chromevox";
import "brace/ext/elastic_tabstops_lite";
import "brace/ext/emmet";
import "brace/ext/error_marker";
import "brace/ext/keybinding_menu";
import "brace/ext/language_tools";
import "brace/ext/linking";
import "brace/ext/modelist";
import "brace/ext/old_ie";
import "brace/ext/searchbox";
import "brace/ext/settings_menu";
import "brace/ext/spellcheck";
import "brace/ext/split";
import "brace/ext/static_highlight";
import "brace/ext/statusbar";
import "brace/ext/textarea";
import "brace/ext/themelist";
import "brace/ext/whitespace";
import "brace/mode/text";
import "brace/snippets/text";
import "brace/theme/monokai";

import { Interpreter } from "./Interpreter";
import { KeyCode } from "./KeyCode";

const elemCode: HTMLElement = document.getElementById("code") as HTMLElement;
const elemConsole: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;
const elemBtnSave: HTMLElement = document.getElementById("btnSave");
const elemBtnRun: HTMLElement = document.getElementById("btnRun");

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

function hasModifiers(
    e: KeyboardEvent,
    shift: boolean = false,
    ctrl: boolean = false,
    alt: boolean = false,
    meta: boolean = false): boolean {
    return e.shiftKey === shift && e.ctrlKey === ctrl && e.altKey === alt && e.metaKey === meta;
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

function run(): void {
    interpretAsync(getCode(), appendConsole);
}

document.addEventListener("keydown", (e: KeyboardEvent): void => {
    if (hasKeyCode(e, KeyCode.F5) && hasModifiers(e)) {
        e.preventDefault();

        if (!isKeyDown(KeyCode.F5)) {
            run();
        }
    } else if (hasKeyCode(e, KeyCode.KEY_S) && hasModifiers(e, false, true)) {
        if (e.ctrlKey) {
            e.preventDefault();

            if (!isKeyDown(KeyCode.KEY_S)) {
                elemBtnSave.click();
            }
        }
    }

    keyStates[getKeyCode(e)] = true;
});

document.addEventListener("keyup", (e: KeyboardEvent): void => {
    if (hasKeyCode(e, KeyCode.F5)) {
        e.preventDefault();
    }

    keyStates[getKeyCode(e)] = false;
});

elemBtnSave.addEventListener("click", (e: MouseEvent) => {
    elemBtnSave.setAttribute("href", "data:;charset=utf-8," + encodeURIComponent(getCode()));
});

elemBtnRun.addEventListener("click", (e: MouseEvent) => {
    run();
});

const editor: ace.Editor = ace.edit(elemCode);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/text");

editor.$blockScrolling = Infinity;

editor.setOptions({
    animatedScroll: false,
    autoScrollEditorIntoView: undefined,
    behavioursEnabled: true,
    // copyWithEmptySelection: true, // Implemented in ACE 1.3.0 (brace has ACE version 1.2.9)
    cursorStyle: "ace",
    displayIndentGuides: true,
    dragDelay: 0,
    dragEnabled: true,
    enableBasicAutocompletion: true,
    enableBlockSelect: true,
    enableEmmet: true,
    enableLiveAutocompletion: true,
    enableMultiselect: true,
    enableSnippets: true,
    fadeFoldWidgets: false,
    firstLineNumber: 1,
    fixedWidthGutter: undefined,
    foldStyle: "markbegin",
    fontFamily: undefined,
    fontSize: 14,
    hScrollBarAlwaysVisible: false,
    hasCssTransforms: undefined,
    highlightActiveLine: true,
    highlightGutterLine: true,
    highlightSelectedWord: true,
    indentedSoftWrap: true,
    keyboardHandler: null,
    maxLines: undefined,
    mergeUndoDeltas: true,
    minLines: undefined,
    newLineMode: "auto",
    overwrite: false,
    printMargin: false,
    printMarginColumn: 80,
    readOnly: false,
    scrollPastEnd: 0,
    scrollSpeed: 2,
    selectionStyle: "line",
    showFoldWidgets: true,
    showGutter: true,
    showInvisibles: false,
    showLineNumbers: true,
    showPrintMargin: false,
    spellcheck: true,
    tabSize: 4,
    tooltipFollowsMouse: true,
    useElasticTabstops: false,
    useIncrementalSearch: undefined,
    useSoftTabs: true,
    useWorker: true,
    vScrollBarAlwaysVisible: false,
    wrap: "off",
    wrapBehavioursEnabled: true,
});

function getCode(): string {
    return editor.getValue();
}

function setCode(code: string): void {
    editor.setValue(code);
}
