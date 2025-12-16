(comment) @comment

(string
  (escape_sequence) @string.escape)

(string
  (string_fragment) @string)

(variable_definition
  name: (identifier) @variable
  type: (type) @type.builtin)

(variable_definition
  ["@" "&"] @operator)

(function_header
  name: (identifier) @function)

(function_header
  "fun" @keyword.function)

(function_close) @keyword.function

(function_return
  "return" @keyword.return)

(function_return
  value: (identifier) @variable)

(function_return
  value: (value) @number)

(function_call
  "call" @keyword.function
  name: (identifier) @function.call)

(function_call
  target: (identifier) @variable
  "<-" @operator)

(function_call
  value: (identifier) @variable)

(function_call
  value: (value) @number)

(ref_parameter
  "&" @operator
  name: (identifier) @variable.parameter
  type: (type) @type.builtin)

(val_parameter
  "@" @operator
  name: (identifier) @variable.parameter
  type: (type) @type.builtin)

(if_header
  "if" @keyword.conditional
  ["=" "!=" "<" ">" "<=" ">="] @operator)

(if_header
  lhs: (identifier) @variable)

(if_header
  rhs: (identifier) @variable)

(if_header
  lhs: (value) @number)

(if_header
  rhs: (value) @number)

(while_header
  "while" @keyword.repeat
  ["=" "!=" "<" ">" "<=" ">="] @operator)

(while_header
  lhs: (identifier) @variable)

(while_header
  rhs: (identifier) @variable)

(while_header
  lhs: (value) @number)

(while_header
  rhs: (value) @number)

(end_block) @keyword.control

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

(array_size
  target: (identifier) @variable
  "sizeof" @keyword
  name: (identifier) @variable)

(clear_array
  "free" @keyword
  name: (identifier) @variable)

(cat
  "cat" @keyword
  target: (identifier) @variable)

(cat
  "const" @keyword.operator)

(cat
  "string" @keyword.operator
  value: (identifier) @variable)

(print
  ["print" "println"] @keyword
  ["$" "ascii" "string" "const"] @keyword.operator)

(print
  value: (identifier) @variable)

(input
  "input" @keyword
  ["$" "ascii" "string"] @keyword.operator
  value: (identifier) @variable)

(clear) @keyword

(save
  "save" @keyword
  type: (type) @type.builtin
  value: (identifier) @variable)

((save
  path: (string) @string.special.path)
  (#set! "priority" 110))

(load
  "load" @keyword
  type: (type) @type.builtin
  target: (identifier) @variable)

((load
  path: (string) @string.special.path)
  (#set! "priority" 110))

(random
  "random" @keyword
  target: (identifier) @variable
  value: (value) @number)

(sleep
  "sleep" @keyword
  value: (value) @number)

(exec
  "exec" @keyword)

(exec
  "const" @keyword.operator)

(exec
  "string" @keyword.operator
  name: (identifier) @variable)
