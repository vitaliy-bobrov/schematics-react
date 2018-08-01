import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as ComponentOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const defaultOptions: ComponentOptions = {
  name: 'test',
  path: '/bar',
  styleext: 'css',
  spec: true,
  flat: true,
  propTypes: false,
  stateful: false,
  ts: false
};

describe('component', () => {
  it('requires required name option', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);

    expect(() => runner.runSchematic('component', {}, Tree.empty())).toThrow();
  });

  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions}, Tree.empty());

    expect(tree.files.length).toEqual(3);
    expect(tree.files.sort()).toEqual(['/bar/Test.css', '/bar/Test.js', '/bar/Test.test.js']);

    const componentContent = tree.readContent('/bar/Test.js');

    expect(componentContent).toMatch(/class Test extends Component/);
    expect(componentContent).toMatch(/export default Test/);
  });

  it('creates scss file', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, styleext: 'scss'}, Tree.empty());

    expect(tree.files.find(path => path.includes('css'))).toEqual('/bar/Test.scss');
  });

  it('omits test file creation', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, spec: false}, Tree.empty());

    expect(tree.files.length).toEqual(2);
    expect(tree.files.sort()).toEqual(['/bar/Test.css', '/bar/Test.js']);
  });

  it('creates subfoler', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, flat: false}, Tree.empty());

    expect(tree.files.length).toEqual(3);
    expect(tree.files.sort()).toEqual(['/bar/Test/Test.css', '/bar/Test/Test.js', '/bar/Test/Test.test.js']);
  });

  it('creates propTypes', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, propTypes: true}, Tree.empty());
    const componentContent = tree.readContent('/bar/Test.js');

    expect(componentContent).toMatch(/import PropTypes from \'prop-types\'/);
    expect(componentContent).toMatch(/Test\.propTypes/);
  });

  it('adds state', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, stateful: true}, Tree.empty());
    const componentContent = tree.readContent('/bar/Test.js');

    expect(componentContent).toMatch(/const initialState = {/);
    expect(componentContent).toMatch(/this\.state = initialState/);
  });

  it('uses TypeScript', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, ts: true}, Tree.empty());

    expect(tree.files.length).toEqual(3);
    expect(tree.files.sort()).toEqual(['/bar/Test.css', '/bar/Test.test.ts', '/bar/Test.tsx']);

    const componentContent = tree.readContent('/bar/Test.tsx');

    expect(componentContent).toMatch(/type Props/);
    expect(componentContent).toMatch(/class Test extends Component<Props>/);
  });

  it('adds TypeScript state', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('component', {...defaultOptions, ts: true, stateful: true}, Tree.empty());

    const componentContent = tree.readContent('/bar/Test.tsx');

    expect(componentContent).toMatch(/type State = Readonly<typeof initialState>/);
    expect(componentContent).toMatch(/class Test extends Component<Props, State>/);
    expect(componentContent).toMatch(/readonly state = initialState/);
  });
});
