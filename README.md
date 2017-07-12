# Ink-checkbox-list [![Build Status](https://travis-ci.org/MaxMEllon/ink-checkbox-list.svg?branch=master)](https://travis-ci.org/MaxMEllon/ink-checkbox-list) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Checkbox list component for [Ink](https://github.com/vadimdemedes/ink)

Demo
---

![Demo Image](./.github/demo.gif)

Install
---

```
$ npm install ink-checkbox-list
```

Key bindings
---

| key | action |
|---|---|
| `<Space>` | toggle check/uncheck |
| `<Enter>` | submit item list |
| `<Up>` | move to up a cursor |
| `<Down>` | move to down a cursor |

Usage
---

```js
const { h, mount } = require('ink')
const { List, ListItem } = require('ink-checkbox-list')

let component

const unmount = mount(
  h(List, {
    ref: (co) => (component = co),
    onDeside: () => {
      console.log(component.getCheckedItem())
      process.exit(0)
    }
  }, [
    h(ListItem, {}, 'aaaa'),
    h(ListItem, {}, 'aaaa'),
    h(ListItem, {}, 'aaaa'),
    h(ListItem, {}, 'aaaa'),
    h(ListItem, {}, 'aaaa')
  ])
);
```

> when using jsx

```js
const { h, mount } = require('ink')
const { List, ListItem } = require('ink-checkbox-list')

let component

const unmount = mount(
  <List
    ref={co => component}
    onDeside: () => {
      console.log(component.getCheckedItem())
      process.exit(0)
    }
  >
    <ListItem>aaaa</ListItem>
    <ListItem>aaaa</ListItem>
    <ListItem>aaaa</ListItem>
    <ListItem>aaaa</ListItem>
  </List>
);
```

**Note**:

Use this snippet to enable `keypress` events:

```js
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
```

## Props

### checkedChar

Type: `string`

Default: `☒`

This character is used checked component.

### nocheckedChar

Type: `string`

Default: `☐`

This character is used unchecked component.

### cursorChar

Type: `string`

Default: `❯`

This character is used current cursor line.

### onChange

Type: `Function`

Function to call when user `check`. (<kbd>Space</kbd>)

### onSubmit

Type: `Function`

Function to call when user `submit`. (<kbd>Enter</kbd>)

LICENSE
---

MIT © 2017 MaxMellon
