import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as FnComponentOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');
const defaultOptions: FnComponentOptions = {
  name: 'test',
  path: '/bar',
  styleext: 'css',
  noSpec: false,
  subfolder: false,
  propTypes: false,
  ts: false
};

describe('functional-component', () => {
  it('requires required name option', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);

    expect(() => runner.runSchematic('functional-component', {}, Tree.empty())).toThrow();
  });

  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('functional-component', {...defaultOptions}, Tree.empty());

    expect(tree.files.length).toEqual(3);
    expect(tree.files.sort()).toEqual(['/bar/Test.css', '/bar/Test.js', '/bar/Test.test.js']);

    const componentContent = tree.readContent('/bar/Test.js');

    expect(componentContent).toMatch(/const Test = \({ myProp, children }\)/);
    expect(componentContent).toMatch(/export default Test/);
  });

  it('creates scss file', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('functional-component', {...defaultOptions, styleext: 'scss'}, Tree.empty());

    expect(tree.files.find(path => path.includes('css'))).toEqual('/bar/Test.scss');
  });

  it('omits test file creation', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('functional-component', {...defaultOptions, noSpec: true}, Tree.empty());

    expect(tree.files.length).toEqual(2);
    expect(tree.files.sort()).toEqual(['/bar/Test.css', '/bar/Test.js']);
  });

  it('creates subfoler', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('functional-component', {...defaultOptions, subfolder: true}, Tree.empty());

    expect(tree.files.length).toEqual(3);
    expect(tree.files.sort()).toEqual(['/bar/Test/Test.css', '/bar/Test/Test.js', '/bar/Test/Test.test.js']);
  });

  it('creates propTypes', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('functional-component', {...defaultOptions, propTypes: true}, Tree.empty());
    const componentContent = tree.readContent('/bar/Test.js');

    expect(componentContent).toMatch(/import PropTypes from \'prop-types\'/);
    expect(componentContent).toMatch(/Test\.propTypes/);
  });

  it('uses TypeScript', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('functional-component', {...defaultOptions, ts: true}, Tree.empty());

    expect(tree.files.length).toEqual(3);
    expect(tree.files.sort()).toEqual(['/bar/Test.css', '/bar/Test.test.ts', '/bar/Test.tsx']);

    const componentContent = tree.readContent('/bar/Test.tsx');

    expect(componentContent).toMatch(/type Props/);
    expect(componentContent).toMatch(/import React, { SFC } from \'react\'/);
    expect(componentContent).toMatch(/const Test: SFC<Props> = \({ myProp, children }\)/);
  });
});
