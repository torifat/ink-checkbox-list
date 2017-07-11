const { h, Text, Component } = require('ink')
const readline = require('readline')
const stdin = process.stdin

class List extends Component {
  constructor (props) {
    super(props)
    this.props.children = this.props.children || []
    this.props.checkedChar = this.props.checkedChar || '⦿'
    this.props.nocheckedChar = this.props.nocheckedChar || '○'
    this.props.cursorChar = this.props.cursorChar || '>'
    this.state = {
      cursor: 0,
      checked: []
    }
    readline.emitKeypressEvents(process.stdin)
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')
    this.handleKeyEvent = this.handleKeyEvent.bind(this)
  }

  getCheckedItem () {
    return this.state.checked
  }

  moveUp () {
    const { cursor } = this.state
    if (cursor - 1 < 0) return
    this.setState({ cursor: cursor - 1 })
  }

  moveDown () {
    const { cursor } = this.state
    const { length } = this.props.children
    if (cursor + 1 >= length) return
    this.setState({ cursor: cursor + 1 })
  }

  toggleCurrentCursol () {
    const { checked, cursor } = this.state
    if (checked.includes(cursor)) {
      const i = checked.indexOf(cursor)
      checked.splice(i, 1)
      this.setState({ checked: checked })
    } else {
      checked.push(this.state.cursor)
      this.setState({ checked: checked })
    }
  }

  deside () {
    this.setState({ cursor: -1 })
    setTimeout(() => {
      stdin.removeListener('data', this.handleKeyEvent)
      if (this.props.onDeside) this.props.onDeside()
    }, 50)
  }

  handleKeyEvent (key) {
    switch (key) {
      case '\u001b\u005b\u0041': {
        this.moveUp()
        break
      }
      case '\u001b\u005b\u0042': {
        this.moveDown()
        break
      }
      case '\u001b\u005b\u0043':
      case '\u001b\u005b\u0044':
      case '\u0020': case '\ucaa0': {
        this.toggleCurrentCursol()
        break
      }
      case '\u000d': {
        this.deside()
        break
      }
    }
  }

  componentDidMount () {
    stdin.on('data', this.handleKeyEvent)
  }

  componentWillUnMount () {
    stdin.removeListener('data', this.handleKeyEvent)
  }

  renderCheckbox (index) {
    const { checkedChar, nocheckedChar } = this.props
    const { checked } = this.state
    if (checked.includes(index)) {
      return h(Text, { green: true }, ` ${checkedChar}  `)
    } else {
      return h(Text, { green: true }, ` ${nocheckedChar}  `)
    }
  }

  render (props) {
    const { cursor } = this.state
    const { cursorChar } = props
    return (
      h('div', {},
        props.children.map((co, i) => (
          cursor === i
          ? h('div', {}, [
            h('span', {}, `${cursorChar} `),
            this.renderCheckbox(i),
            co
          ])
          : h('div', {}, [
            h('span', {}, ' '.repeat(cursorChar.length + 1)),
            this.renderCheckbox(i),
            co
          ])
        ))
      )
    )
  }
}

module.exports = List
