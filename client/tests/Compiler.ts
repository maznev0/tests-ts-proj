import Operation from "./Operation";

export default class Compiler {
  private static operations: Operation[] = [];
  private static data: number[] = [];

  public static pushNumber(number: number): void {
    this.data.push(number);
  }

  public static pushOperation(operation: Operation): void {
    this.operations.push(operation);
  }

  public static execute(): void {
    while (
      this.operations.length > 0 &&
      this.operations[this.operations.length - 1] !== Operation.End
    ) {
      console.log("operations: ", this.operations);
      console.log(this.data);

      this.executeMany(this.operations.pop()!);
    }
  }

  public static peekOperation(): Operation {
    return this.operations[this.operations.length - 1];
  }

  public static executeMany(oper: Operation): void {
    let currentPriority: number = this.getPriority(oper);
    while (
      this.operations.length > 0 &&
      currentPriority < this.getPriority(this.peekOperation())
    ) {
      this.executeOperation(oper);
    }
  }

  private static executeOperation(operation: Operation): void {
    if (operation === Operation.UnaryMinus) {
      this.data.push(-this.data.pop()!);
      // console.log(this.data);
    }
    if (operation === Operation.Add) {
      const b = this.data.pop()!;
      const a = this.data.pop()!;
      this.data.push(a + b);
      // console.log(this.data);
    }

    if (operation === Operation.Substract) {
      const b = this.data.pop()!;
      const a = this.data.pop()!;
      this.data.push(a - b);
      // console.log(this.data);
    }
  }
  public static getPriority(op: Operation): number {
    switch (op) {
      case Operation.UnaryMinus:
        return 400;
      case Operation.Add:
      case Operation.Substract:
        return 100;
      case Operation.End:
        return 0;
      default:
        return 0;
    }
  }
  public static getResult(): number {
    return this.data.pop()!;
  }
}

// import Stack from "./Stack";
// import Operation from "./Operation";

// export default class Compiler {
//   private static operations: Stack<string>;
//   private static data: Stack<string>;

//   constructor() {
//     Compiler.operations = new Stack<string>();
//     Compiler.data = new Stack<string>();
//   }

//   public static pushNumber(number: string): void {
//     Compiler.data.push(number);
//   }

//   public static pushOperation(symbol: string): void {
//     Compiler.operations.push(Compiler.getOperation(symbol));
//   }

//   public static popNumber(): string | undefined {
//     return Compiler.data.pop();
//   }

//   public static popOperation(): string | undefined {
//     return Compiler.operations.pop();
//   }

//   public static getResult(): string | undefined {
//     return Compiler.popNumber();
//   }

//   public static getOperation(symbol: string): string {
//     switch (symbol) {
//       case Operation.Add:
//         return Operation.Add;
//       case Operation.Subtract:
//         return Operation.Subtract;
//       case Operation.Multiply:
//         return Operation.Multiply;
//       case Operation.Divide:
//         return Operation.Divide;
//       default:
//         return Operation.End;
//     }
//   }
// }
