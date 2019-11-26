import {expect, test} from '@oclif/test'

describe('init', () => {
  test
  .stdout()
  .command(['init'])
  .it('runs init', ctx => {
    expect(ctx.stdout).to.contain('init world')
  })

  test
  .stdout()
  .command(['init', '--name', 'jeff'])
  .it('runs init --name jeff', ctx => {
    expect(ctx.stdout).to.contain('init jeff')
  })
})
