# Template

Bootstrap new GitHub projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/template.svg)](https://npmjs.org/package/template)
[![Codecov](https://codecov.io/gh/chances/template/branch/master/graph/badge.svg)](https://codecov.io/gh/chances/template)
[![Downloads/week](https://img.shields.io/npm/dw/template.svg)](https://npmjs.org/package/template)
[![License](https://img.shields.io/npm/l/template.svg)](https://github.com/chances/template/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g template
$ template COMMAND
running command...
$ template (-v|--version|version)
template/0.1.0 darwin-x64 node-v12.8.1
$ template --help [COMMAND]
USAGE
  $ template COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`template hello [FILE]`](#template-hello-file)
* [`template help [COMMAND]`](#template-help-command)

## `template hello [FILE]`

describe the command here

```
USAGE
  $ template hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ template hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/chances/template/blob/v0.1.0/src/commands/hello.ts)_

## `template help [COMMAND]`

display help for template

```
USAGE
  $ template help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_
<!-- commandsstop -->
