; Variables
;----------

(identifier) @variable

; Properties
;-----------

(pair
  key: (identifier) @property)

; Function and method definitions
;--------------------------------

(function_declaration
  name: (identifier) @function)

(variable_declaration
  name: (identifier) @variable.definition)

(parameter
  name: (identifier) @variable.parameter)

; Function and method calls
;--------------------------

(call_expression
  function: (identifier) @function.call)

(call_expression
  function: (member_expression
    property: (identifier) @function.method))

; Literals
;---------

[
  (boolean)
  (null)
] @constant.builtin

(comment) @comment

[
  (string)
  (string_interpolation)
] @string

(string_content) @string

(interpolation
  "{" @punctuation.special
  "}" @punctuation.special)

(number) @number

; Operators
;----------

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
;------------

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

; Keywords
;---------

[
  "func"
  "let"
  "global"
  "type"
  "enum"
  "if"
  "else"
  "while"
  "for"
  "in"
  "switch"
  "case"
  "default"
  "match"
  "return"
  "break"
  "continue"
  "throw"
  "try"
  "catch"
  "finally"
  "menu"
  "import"
] @keyword

; Identifiers (fallback)
(identifier) @variable
