import { IMonarchLanguage, IMonarchState } from './monarchTypes'
import Token from './token'

class Monarch {
  private readonly _ml: IMonarchLanguage
  private readonly stack: IMonarchState[] = []

  constructor(ml: IMonarchLanguage) {
    this._ml = ml

    const { tokenizer } = this._ml
    this.stack.push({ name: Object.keys(tokenizer)[0] })
  }

  tokenize(text: string) {
    const state = this.stack[this.stack.length - 1].name
    const { tokenizer } = this._ml
    const re = new RegExp(tokenizer[state].map(rule => `(${rule[0].source})`).join('|'), 'g')
    const tokenList = []

    for (let m = re.exec(text); m !== null; m = re.exec(text)) {
      for (let i = 1; i < m.length; i++) {
        if (m[i]) {
          const type = tokenizer[state][i - 1][1]
          tokenList.push(new Token(m.index, m[i], type))
        }
      }
    }

    return tokenList
  }
}

export default Monarch