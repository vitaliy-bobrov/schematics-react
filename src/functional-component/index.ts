import { strings } from '@angular-devkit/core';
import { apply, filter, mergeWith, move, noop, Rule, template, url } from '@angular-devkit/schematics';

import { parseName } from '../utility/parse-name';
import { validateName } from '../utility/validation';
import { Schema as FnComponentOptions } from './schema';

export function functionalComponent(options: FnComponentOptions): Rule {
  if (options.path === undefined) {
    options.path = '/src/';
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name;
  options.path = parsedPath.path;

  validateName(options.name);

  const templateSource = apply(url('./files'), [
    options.noSpec ? filter(path => !path.endsWith('.test.__jsext__')) : noop(),
    template({
      ...strings,
      'if-flat': (s: string) => options.subfolder ? s : '',
      jsext: !!options.ts ? 'ts' : 'js',
      jsxext: !!options.ts ? 'tsx' : 'js',
      ...options,
    }),
    move(parsedPath.path),
  ]);

  return mergeWith(templateSource);
}
