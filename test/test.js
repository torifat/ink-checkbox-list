import test from 'ava';
import {
  h,
  render as build,
  renderToString,
  mount,
  Text,
} from 'ink';
import { List, ListItem } from '../lib/index';

const render = tree => renderToString(build(tree))

test('no item', t => {
  t.is(render(<List/>), '');
});

test('blank child in list item', t => {
  t.is(render(<ListItem/>), '\n');
});

test('render simple case', t => {
  t.is(render(<ListItem>sample</ListItem>), 'sample\n');
});

test('render rich child component', t => {
  t.is(render(<ListItem><Text>s</Text></ListItem>), 's\n');
});