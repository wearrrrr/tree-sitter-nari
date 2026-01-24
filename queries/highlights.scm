; Keywords
[
  "func"
  "let"
  "global"
  "if"
  "else"
  "while"
  "for"
  "in"
  "switch"
  "case"
  "default"
  "try"
  "catch"
  "finally"
  "menu"
  "import"
] @keyword

; Control flow keywords
[
  "return"
  "break"
  "continue"
  "throw"
] @keyword.control

; Functions
(function_declaration
  name: (identifier) @function)

(call_expression
  function: (identifier) @function.call)

(call_expression
  function: (member_expression
    property: (identifier) @function.method))

; Variables
(variable_declaration
  name: (identifier) @variable)

(parameter
  name: (identifier) @variable.parameter)

; Properties
(member_expression
  property: (identifier) @property)

(pair
  key: (identifier) @property)

; Operators
[
  "="
  "+"
  "-"
  "*"
  "/"
  "%"
  "**"
  "=="
  "!="
  "<"
  "<="
  ">"
  ">="
  "&&"
  "||"
  "!"
  "@"
  "??"
  "++"
  "--"
] @operator

; Punctuation
[
  "("
  ")"
  "{"
  "}"
  "["
  "]"
] @punctuation.bracket

[
  ","
  ":"
  ";"
] @punctuation.delimiter

[
  "?"
] @punctuation.special

; Literals
(number) @number
(string) @string
(boolean) @boolean
(null) @constant.builtin

; String interpolation
(string_interpolation) @string
(string_content) @string
(interpolation
  "{" @punctuation.special
  "}" @punctuation.special)

; Comments
(comment) @comment

; Identifiers (fallback)
(identifier) @variable
