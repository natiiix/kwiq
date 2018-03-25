const F5_KEY: number = 116;

const elemCode: HTMLTextAreaElement = document.getElementById("code") as HTMLTextAreaElement;
const elemConsole: HTMLTextAreaElement = document.getElementById("console") as HTMLTextAreaElement;

function compile(code: string): string {
    return "Hello World!\n" + code;
}

let f5Down: boolean = false;

elemCode.addEventListener("keydown", (e: KeyboardEvent): void => {
    if ((e.which || e.keyCode) === F5_KEY) {
        e.preventDefault();

        if (!f5Down) {
            f5Down = true;
            elemConsole.innerHTML = compile(elemCode.value);
            elemConsole.scrollTop = elemConsole.scrollHeight;
            console.log("Compiled!");
        }
    }
});

elemCode.addEventListener("keyup", (e: KeyboardEvent): void => {
    if ((e.which || e.keyCode) === F5_KEY) {
        e.preventDefault();
        f5Down = false;
    }
});
