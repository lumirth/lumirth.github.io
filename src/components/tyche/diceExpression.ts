// diceExpression.ts
class DiceExpression {
  expression: string;
  history: string[];

  constructor(expression: string) {
    this.expression = expression;
    this.history = [];
  }

  _evaluateRoll(match: RegExpExecArray): string {
    const count = match[1] ? parseInt(match[1]) : 1;
    const faces = parseInt(match[2]);
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * faces) + 1);
    const result = rolls.reduce((acc, curr) => acc + curr, 0);
    this.history.push(`${count}d${faces} => ${rolls} = ${result}`);
    return String(result);
  }

  _rollDice(expr: string): string {
    console.log("Rolling dice in expression:", expr);
    const regex = /(\d*)d(\d+)/g;
    let rolledExpr = expr;
    let match = regex.exec(rolledExpr);

    while (match) {
      console.log("Match found:", match);
      const replacement = this._evaluateRoll(match);
      rolledExpr = rolledExpr.slice(0, match.index) + replacement + rolledExpr.slice(match.index + match[0].length);
      this.history.push(`${expr} => ${rolledExpr}`);
      regex.lastIndex = 0; // Reset lastIndex property of the regex
      match = regex.exec(rolledExpr);
    }

    console.log("Final rolled expression:", rolledExpr);
    return rolledExpr;
  }

  _calculateParentheses(expr: string): string {
    console.log("Calculating parentheses in expression:", expr);
    let innermostParentheses = /\([^()]+\)/.exec(expr);

    while (innermostParentheses) {
      console.log("Innermost parentheses found:", innermostParentheses);
      const [matched, index] = [innermostParentheses[0], innermostParentheses.index];
      const innerExpr = matched.slice(1, -1);
      const rolledInnerExpr = this._rollDice(innerExpr);
      const result = eval(rolledInnerExpr);
      expr = expr.slice(0, index) + String(result) + expr.slice(index + matched.length);
      this.history.push(`${expr.slice(0, index)}(${innerExpr})${expr.slice(index + matched.length)} => ${expr}`);
      innermostParentheses = /\([^()]+\)/.exec(expr);
    }

    console.log("Final expression after calculating parentheses:", expr);
    return expr;
  }


  evaluate(): [string, string] {
    try {
      const sanitizedExpr = this.expression.replace(/ /g, '');
      this.history.push(`Initial expression: ${sanitizedExpr}`);
      const expandedExpr = this._calculateParentheses(sanitizedExpr);
      this.history.push(`Expression with roll substituted: ${expandedExpr}`);
      const rolledExpr = this._rollDice(expandedExpr);
      this.history.push(`Expression before roll substitution: ${this.expression}`);
      this.history.push(`Expression with roll substitution: ${rolledExpr}`);
      const result = eval(rolledExpr);
      this.history.push(`Final result: ${result}`);
      return [String(result), this.history.join('\n')];
    } catch (e) {
      console.error("Error:", e);
      throw new Error(`Invalid dice expression: ${e.message}`);
    }
  }
}

export function evaluateDiceExpression(expression: string): [string, string] {
  const diceExpression = new DiceExpression(expression);
  return diceExpression.evaluate();
}
