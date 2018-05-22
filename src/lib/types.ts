export interface Node {
  type: string
  loc?: SourceLocation
}

export interface SourceLocation {
  source?: string
  start: Position
  end: Position
}

export interface Position {
  line: number // >= 0
  column: number // >= 0
}

export interface Token extends Node {
  value: string
}

export type RuleTerm = string

export type Rule = Array<RuleTerm>

export type Rules = Array<Rule>

export type RuleMap = Map<string, Rules>

export type Production = [string, Array<RuleTerm>]

export type Firsts = Map<string, Set<RuleTerm>>

export type Follows = Map<string, Set<RuleTerm>>

export type SymbolTable = Map<string, string>

export const epsilon = 'ε'