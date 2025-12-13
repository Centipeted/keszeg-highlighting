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

    line: $ => seq(
      $.statement,
      repeat(seq(',', $.statement))
    ),
    
    statement: $ => choice(
      $.variable_definition,
      $.function_definition,
      $.function_close,
      $.unary_assignment,
      $.binary_assignment,
      $.set_array,
      $.get_array,
      //$.unknown
    ),

    variable_definition: $ => seq(
      choice('@', '&'),
      field('name', $.identifier),
      field('type', $.type)
    ),

    function_definition: $ => seq(
      'fun',
      field('name', $.identifier),
      repeat($.parameter)
    ),

    function_close: $ => 'ef',

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

    type: $ => choice('int', 'float', 'byte', 'iarray', 'farray', 'string'),

    comment: $ => token(seq('#', /.*/)),
    unknown: $ => token(prec(-1, /[^\n,]+/)),
  },
});

