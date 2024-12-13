import Compiler from "./Compiler";
import Operation from "./Operation";

export default class Parser {
  private expression: string = "";
  private curIndex: number = 0;

  public parse(expression: string): boolean {
    this.expression = expression;
    this.curIndex = 0;
    try {
      const result = this.parseExpression();
      if (this.isNotEnd()) {
        return false;
      }
      return result;
    } catch {
      return false;
    }
  }

  private parseExpression(): boolean {
    this.skipSpaces();

    this.parseUnary();

    // Если операнд отсутствует, выражение некорректно
    if (!this.parseOperand()) {
      return false;
    }

    // Парсим цепочку бинарных операций
    while (this.parseBinary()) {
      this.skipSpaces();
      if (!this.parseOperand()) {
        return false;
      }
    }

    Compiler.execute();
    return true;
  }

  private parseOperand(): boolean {
    const number = this.parseNumber();
    if (number !== null) {
      Compiler.pushNumber(number);
      return true;
    }
    return false;
  }

  public parseUnary(): void {
    this.skipSpaces();

    if (this.isNotEnd() && this.getCurrentChar() === "-") {
      Compiler.pushOperation(Operation.UnaryMinus);
      this.curIndex++;
    }
  }

  private parseBinary(): boolean {
    this.skipSpaces();
    const currentChar = this.getCurrentChar();

    if (currentChar === "+") {
      Compiler.pushOperation(Operation.Add);
      this.curIndex++;
      return true;
    }

    if (currentChar === "-") {
      Compiler.pushOperation(Operation.Substract);
      this.curIndex++;
      return true;
    }

    return false;
  }

  private parseNumber(): number | null {
    this.skipSpaces();
    let start = this.curIndex;

    while (this.isNotEnd() && this.isDigit(this.getCurrentChar())) {
      this.curIndex++;
    }

    if (start < this.curIndex) {
      return parseInt(this.expression.slice(start, this.curIndex), 10);
    }

    return null;
  }

  private skipSpaces(): void {
    while (this.isNotEnd() && this.getCurrentChar() === " ") {
      this.curIndex++;
    }
  }

  private isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  private isNotEnd(): boolean {
    return this.curIndex < this.expression.length;
  }

  private getCurrentChar(): string {
    return this.expression[this.curIndex];
  }
}

// import Symbol from "./Symbol";

// export default class Parser {
//   static expression: string;
//   static curIndex: number;
//   // private static result: {} | null = null;

//   constructor(expression: string) {
//     Parser.expression = expression;
//     Parser.curIndex = 0;
//   }

//   private static skip(): void {
//     while (Parser.isNotEnd() && Parser.isSymbol(Parser.getCurrentChar())) {
//       Parser.curIndex++;
//     }
//   }

//   public static isSymbol(s: string): boolean {
//     switch (s) {
//       case Symbol.Space:
//       case Symbol.Tab:
//       case Symbol.NewLine:
//       case Symbol.CarriageReturn:
//       case Symbol.FormFeed:
//         return true;
//       default:
//         return false;
//     }
//   }

//   private static isNotEnd(): boolean {
//     return Parser.curIndex < Parser.expression.length;
//   }

//   public static getCurrentChar(): string {
//     return Parser.expression[Parser.curIndex];
//   }
// }
