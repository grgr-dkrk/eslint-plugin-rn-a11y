# Contributing Guide

## Code of Conduct

⚠️ If the Issue or PR contains content that does not comply with the Code of Conduct, we may remove it.

[CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md)

## Open Issues

[Issues](https://github.com/grgr-dkrk/eslint-plugin-rn-a11y/issues)

## Pull Request Process

Follow the rules of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.
If the commit does not change the contents of the module itself, please write the `chore` prefix.

WIP

### Install

```sh
yarn
```

### Add | Edit Rules

TBD

### Fix Type Definitions

This project supports TypeScript, but `jsx-ast-utils` and `ast-types-flow` are incompatible with some types in this project, so we using other definitions.
Please see in [./packages/interfaces/types/modules](./src/types/modules/).
