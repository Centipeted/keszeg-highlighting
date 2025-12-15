module.exports = grammar({
  name: 'keszeg',

  extras: $ => [
    /[ \t\r\f]+/,
    $.comment,
  ],

  rules: {
    source_file: $ => seq(
      repeat(seq(optional($.line), '\n')),
      optional($.line)
    ),

    line: $ => choice(
      $._block_statement,
      seq(
        $.statement,
        repeat(seq(',', $.statement))
      )
    ),

    _block_statement: $ => choice(
      $.function_definition,
      $.if_statement,
      $.while_statement
    ),

    statement: $ => choice(
      $.variable_definition,
      $.function_call,
      $.function_return,
      $.unary_assignment,
      $.binary_assignment,
      $.set_array,
      $.get_array,
      $.array_size,
      $.clear_array,
      $.cat,
      $.print,
      $.input,
      $.clear,
      $.save,
      $.load,
      $.random,
      $.sleep,
      $.exec,
      $.unknown
    ),

    variable_definition: $ => seq(
      choice('@', '&'),
      field('name', $.identifier),
      field('type', $.type)
    ),

    function_header: $ => seq(
      'fun',
      field('name', $.identifier),
      repeat($.parameter)
    ),

    function_definition: $ => seq(
      $.function_header,
      '\n',
      repeat(seq(optional($.line), '\n')),
      $.function_close
    ),

    function_close: $ => 'ef',

    function_return: $ => seq(
      'return',
      optional(field('value', choice($.identifier, $.value)))
    ),

    function_call: $ => seq(
      optional(seq(
        field('target', $.identifier),
        '<-'
      )),
      'call',
      field('name', $.identifier),
      repeat(choice(
        field('value', $.identifier),
        field('value', $.value)
      ))
    ),
    
    if_header: $ => seq(
      'if',
      field('lhs', choice($.identifier, $.value)),
      choice('=', '!=', '<', '>', '<=', '>='),
      field('rhs', choice($.identifier, $.value))
    ),

    if_statement: $ => seq(
      $.if_header,
      '\n',
      repeat(seq(optional($.line), '\n')),
      $.end_block
    ),

    while_header: $ => seq(
      'while',
      field('lhs', choice($.identifier, $.value)),
      choice('=', '!=', '<', '>', '<=', '>='),
      field('rhs', choice($.identifier, $.value))
    ),

    while_statement: $ => seq(
      $.while_header,
      '\n',
      repeat(seq(optional($.line), '\n')),
      $.end_block
    ),

    end_block: $ => 'end',

    unary_assignment: $ => seq(
      field('target', $.identifier),
      choice('=', '+=', '-=', '*=', '/=', '%='),
      field('value', choice(
        $.identifier,
        $.value
      ))
    ),

    binary_assignment: $ => seq(
      field('target', $.identifier),
      '=',
      field('lhs', choice(
        $.identifier,
        $.value
      )),
      choice('+', '-', '*', '/', '%'),
      field('rhs', choice(
        $.identifier,
        $.value
      ))
    ),

    set_array: $ => seq(
      field('name', $.identifier),
      ':',
      field('index', choice(
        $.identifier,
        $.value
      )),
      '<-',
      field('value', choice(
        $.identifier,
        $.value
      ))
    ),

    get_array: $ => seq(
      field('name', $.identifier),
      '<-',
      field('name', $.identifier),
      ':',
      field('index', choice(
        $.identifier,
        $.value
      ))
    ),

    array_size: $ => seq(
      field('target', $.identifier),
      'sizeof',
      field('name', $.identifier)
    ),

    clear_array: $ => seq(
      'free',
      field('name', $.identifier)
    ),

    cat: $ => seq(
      'cat',
      field('target', $.identifier),
      choice(
        seq('const', optional(field('value', $.string))),
        seq('string', field('value', $.identifier))
      )
    ),

    print: $ => seq(
      choice('print', 'println'),
      choice(
        seq('$', field('value', $.identifier)),
        seq('ascii', field('value', $.identifier)),
        seq('string', field('value', $.identifier)),
        seq('const', field('value', $.string))
      )
    ),
    
    input: $ => seq(
      'input',
      choice(
        seq('$', field('value', $.identifier)),
        seq('ascii', field('value', $.identifier)),
        seq('string', field('value', $.identifier)),
      )
    ),

    clear: $ => 'clear',

    save: $ => seq(
      'save',
      field('type', $.type),
      field('value', $.identifier),
      field('path', $.string)
    ),

    load: $ => seq(
      'load',
      field('type', $.type),
      field('target', $.identifier),
      field('path', $.string)
    ),

    random: $ => seq(
      'random',
      field('target', $.identifier),
      field('value', $.value)
    ),

    sleep: $ => seq(
      'sleep',
      field('value', $.value)
    ),

    exec: $ => seq(
      'exec',
      choice(
        seq('const', field('value', $.string)),
        seq('string', field('name', $.identifier))
      )
    ),

    parameter: $ => choice(
      $.ref_parameter,
      $.val_parameter,
    ),

    ref_parameter: $ => seq(
      '&',
      field('name', $.identifier),
      field('type', $.type)
    ),

    val_parameter: $ => seq(
      '@',
      field('name', $.identifier),
      field('type', $.type)
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    value: $ => /(?:[0-9]+\.[0-9]+(?:f)?|[0-9]+(?:b|f)?)/,

    escape_sequence: $ => token(prec(2, /\\[ntsch]/)),
    string_fragment: $ => token(prec(1, /[^\\,#\n]+/)),

    string: $ => seq(
      repeat1(choice(
        $.escape_sequence,
        $.string_fragment
      ))
    ),

    type: $ => choice('int', 'float', 'byte', 'iarray', 'farray', 'string'),

    comment: $ => token(seq('#', /.*/)),
    unknown: $ => token(prec(-10, /[^\n,]+/)),
  },
});
