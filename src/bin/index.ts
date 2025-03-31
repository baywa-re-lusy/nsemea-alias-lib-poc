#! /usr/bin/env node
import { program } from 'commander';
import { replaceAlias } from '..';

const { version } = require('../../package.json');

program
  .name('nsemea-alias')
  .version(version);