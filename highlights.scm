(comment) @comment

(variable_definition
  name: (identifier) @variable
  type: (type) @type.builtin)

(variable_definition
  ["@" "&"] @operator)

(function_definition
  name: (identifier) @function)

(function_definition
  "fun" @keyword.function)

(function_close) @keyword.function

(ref_parameter
  "&" @operator
  name: (identifier) @variable.parameter
  type: (type) @type.builtin)

(val_parameter
  "@" @operator
  name: (identifier) @variable.parameter
  type: (type) @type.builtin)

(unary_assignment
  target: (identifier) @variable
  value: (value) @number)

(unary_assignment
  target: (identifier) @variable
  value: (identifier) @variable)

(unary_assignment
  ["=" "+=" "-=" "*=" "/=" "%="] @operator)

(binary_assignment
  target: (identifier) @variable)

(binary_assignment
  lhs: (identifier) @variable)

(binary_assignment
  rhs: (identifier) @variable)

(binary_assignment
  lhs: (value) @number)

(binary_assignment
  rhs: (value) @number)

(binary_assignment
  ["=" "+" "-" "*" "/" "%"] @operator)

(set_array
  name: (identifier) @variable)

(set_array
  index: (identifier) @variable)

(set_array
  value: (identifier) @variable)

(set_array
  index: (value) @number)

(set_array
  value: (value) @number)

(set_array
  [":" "<-"] @operator)

(get_array
  name: (identifier) @variable)

(get_array
  index: (identifier) @variable)

(get_array
  index: (value) @number)

(get_array
  [":" "<-"] @operator)

