'use strict'

const stylelint = require('stylelint')
const test = require('ava')
const config = require('../')

const validCss = (
`.selector-1 {
  display: block;
  padding: 10px;
}
`)

const invalidCss = (
`a {
  color: #333333;
  top: .2em;
}
`)

test('extends standard', t => {
  t.is(config.extends, 'stylelint-config-standard', 'Extends standard')
})

test('no warning for valid css', t => {
  return stylelint.lint({
    code: validCss,
    config: config
  })
  .then((data) => {
    const { errored, results } = data
    const { warnings } = results[0]
    t.falsy(errored, "no errored")
    t.is(warnings.length, 0, "flags no warnings")
  })
})

test('warning with invalid css', t => {
  return stylelint.lint({
    code: invalidCss,
    config: config
  })
  .then((data) => {
    const { errored, results } = data
    const { warnings } = results[0]
     t.truthy(errored, "errored")
     t.is(warnings.length, 3, "flags three warning")
     t.is(warnings[0].text, "Expected \"top\" to come before \"color\" (declaration-block-properties-order)", "correct warning text")
  })
})
