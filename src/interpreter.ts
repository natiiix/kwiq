export class Interpreter {
    public interpret(code: string, cbLog: (text: string) => void): void {
        let n: number = 0;
        code.split("\n").forEach((line: string) => cbLog((n++).toString() + " | " + line));
    }
}
