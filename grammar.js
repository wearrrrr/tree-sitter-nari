module.exports = grammar({
  name: 'nari',

  conflicts: $ => [
    [$.block_statement, $.object_literal],
  ],

  extras: $ => [
    /\s/,
    $.comment,
  ],

  word: $ => $.identifier,

  reserved: {
    global: $ => [
      'break',
      'case',
      'catch',
      'continue',
      'default',
      'else',
      'finally',
      'for',
      'func',
      'global',
      'if',
      'import',
      'in',
      'let',
      'menu',
      'return',
      'switch',
      'throw',
      'try',
      'while',
    ],
  },

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.function_declaration,
      $.variable_declaration,
      $.expression_statement,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.for_each_statement,
      $.switch_statement,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.throw_statement,
      $.try_catch_statement,
      $.block_statement,
      $.menu_statement,
      $.import_statement,
    ),

    // Comments
    comment: $ => token(prec(-10, seq('//', /.*/))),

    // Function declaration
    function_declaration: $ => seq(
      'func',
      field('name', $.identifier),
      field('parameters', $.parameter_list),
      field('body', $.block_statement),
    ),

    parameter_list: $ => seq(
      '(',
      optional(seq(
        $.parameter,
        repeat(seq(',', $.parameter)),
        optional(','),
      )),
      ')',
    ),

    parameter: $ => seq(
      optional('...'),
      field('name', $.identifier),
      optional(seq('=', field('default', $._expression))),
    ),

    // Variable declaration
    variable_declaration: $ => seq(
      choice('let', 'global'),
      field('name', $.identifier),
      optional(seq('=', field('value', $._expression))),
    ),

    // Import statement
    import_statement: $ => seq(
      'import',
      field('path', $.string),
    ),

    // Block statement
    block_statement: $ => seq(
      '{',
      repeat($._statement),
      '}',
    ),

    // Expression statement
    expression_statement: $ => seq(
      $._expression,
      optional(';'),
    ),

    // If statement
    if_statement: $ => prec.right(seq(
      'if',
      '(',
      field('condition', $._expression),
      ')',
      field('consequence', $._statement),
      optional(seq('else', field('alternative', $._statement))),
    )),

    // While statement
    while_statement: $ => seq(
      'while',
      '(',
      field('condition', $._expression),
      ')',
      field('body', $._statement),
    ),

    // For statement
    for_statement: $ => seq(
      'for',
      '(',
      field('initializer', optional(choice($.variable_declaration, $._expression))),
      ';',
      field('condition', optional($._expression)),
      ';',
      field('increment', optional($._expression)),
      ')',
      field('body', $._statement),
    ),

    // For-each statement
    for_each_statement: $ => seq(
      'for',
      '(',
      field('variable', $.identifier),
      'in',
      field('iterable', $._expression),
      ')',
      field('body', $._statement),
    ),

    // Switch statement
    switch_statement: $ => seq(
      'switch',
      '(',
      field('value', $._expression),
      ')',
      '{',
      repeat($.switch_case),
      optional($.switch_default),
      '}',
    ),

    switch_case: $ => seq(
      'case',
      field('value', $._expression),
      ':',
      repeat($._statement),
    ),

    switch_default: $ => seq(
      'default',
      ':',
      repeat($._statement),
    ),

    // Menu statement
    menu_statement: $ => seq(
      'menu',
      '{',
      repeat($.menu_option),
      '}',
    ),

    menu_option: $ => seq(
      field('text', $.string),
      field('body', $.block_statement),
    ),

    // Try-catch statement
    try_catch_statement: $ => seq(
      'try',
      field('body', $.block_statement),
      optional(seq(
        'catch',
        optional(seq('(', field('parameter', $.identifier), ')')),
        field('handler', $.block_statement),
      )),
      optional(seq('finally', field('finalizer', $.block_statement))),
    ),

    // Return statement
    return_statement: $ => prec.right(seq(
      'return',
      optional(field('value', $._expression)),
    )),

    // Break statement
    break_statement: $ => seq('break'),

    // Continue statement
    continue_statement: $ => seq('continue'),

    // Throw statement
    throw_statement: $ => prec.right(seq(
      'throw',
      optional(field('value', $._expression)),
    )),

    // Expressions
    _expression: $ => choice(
      $.assignment_expression,
      $.binary_expression,
      $.unary_expression,
      $.update_expression,
      $.ternary_expression,
      $.call_expression,
      $.member_expression,
      $.subscript_expression,
      $.function_expression,
      $.array_literal,
      $.object_literal,
      $.string_interpolation,
      $.parenthesized_expression,
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.null,
    ),

    // Assignment
    assignment_expression: $ => prec.right(1, seq(
      field('left', choice($.identifier, $.member_expression, $.subscript_expression)),
      '=',
      field('right', $._expression),
    )),

    // Binary expressions
    binary_expression: $ => choice(
      ...[
        ['||', 2],
        ['&&', 3],
        ['??', 4],
        ['==', 5],
        ['!=', 5],
        ['<', 6],
        ['<=', 6],
        ['>', 6],
        ['>=', 6],
        ['@', 7],
        ['+', 8],
        ['-', 8],
        ['*', 9],
        ['/', 9],
        ['%', 9],
        ['**', 10],
      ].map(([operator, precedence]) =>
        prec.left(precedence, seq(
          field('left', $._expression),
          field('operator', operator),
          field('right', $._expression),
        )),
      ),
    ),

    // Unary expressions
    unary_expression: $ => prec(11, seq(
      field('operator', choice('!', '-', '++')),
      field('argument', $._expression),
    )),

    // Update expressions (postfix)
    update_expression: $ => prec.left(12, seq(
      field('argument', $._expression),
      field('operator', choice('++', '--')),
    )),

    // Ternary expression
    ternary_expression: $ => prec.right(1, seq(
      field('condition', $._expression),
      '?',
      field('consequence', $._expression),
      ':',
      field('alternative', $._expression),
    )),

    // Call expression
    call_expression: $ => prec(13, seq(
      field('function', $._expression),
      field('arguments', $.argument_list),
    )),

    argument_list: $ => seq(
      '(',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(','),
      )),
      ')',
    ),

    // Member expression
    member_expression: $ => prec(14, seq(
      field('object', $._expression),
      '.',
      field('property', $.identifier),
    )),

    // Subscript expression
    subscript_expression: $ => prec(14, seq(
      field('object', $._expression),
      '[',
      field('index', $._expression),
      ']',
    )),

    // Function expression
    function_expression: $ => seq(
      'func',
      field('parameters', $.parameter_list),
      field('body', $.block_statement),
    ),

    // Array literal
    array_literal: $ => seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(','),
      )),
      ']',
    ),

    // Object literal
    object_literal: $ => seq(
      '{',
      optional(seq(
        $.pair,
        repeat(seq(',', $.pair)),
        optional(','),
      )),
      '}',
    ),

    pair: $ => seq(
      field('key', choice($.identifier, $.string)),
      ':',
      field('value', $._expression),
    ),

    // String interpolation
    string_interpolation: $ => seq(
      '`',
      repeat(choice(
        $.string_content,
        $.interpolation,
      )),
      '`',
    ),

    string_content: $ => token(prec(-1, /[^`{]+/)),

    interpolation: $ => seq(
      '{',
      $._expression,
      '}',
    ),

    // Parenthesized expression
    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')',
    ),

    // Primitives
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: $ => {
      const decimal = /[0-9]+/;
      const float = seq(decimal, '.', decimal);
      return token(choice(float, decimal));
    },

    string: $ => token(choice(
      seq('"', repeat(choice(/[^"\\]/, /\\./)), '"'),
      seq("'", repeat(choice(/[^'\\]/, /\\./)), "'"),
    )),

    boolean: $ => choice('true', 'false'),

    null: $ => 'null',
  },
});
