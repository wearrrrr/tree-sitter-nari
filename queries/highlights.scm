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

; Literals
(number) @number
(string) @string
(boolean) @boolean
(null) @constant.builtin

; Comments
(comment) @comment

; Identifiers (fallback)
(identifier) @variable

; Identifiers (fallback)
(identifier) @variable
