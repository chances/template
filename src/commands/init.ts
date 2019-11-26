import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'

const mkdirp = util.promisify(require('mkdirp'))

const currentWorkingDir = process.cwd()
const defaultRepoName = path.basename(currentWorkingDir)

export default class Init extends Command {
  static description = 'initialize a project folder'

  static examples = [
    '$ template init',
    '$ template init --user johndoe',
    '$ template init --github johndoe/cool-app cool-app',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    user: flags.string({char: 'u', description: 'GitHub user for which to initialize or update a repo'}),
    repo: flags.string({
      char: 'r',
      description: 'GitHub repo name to initialize or update',
      default: defaultRepoName
    }),
    github: flags.string({char: 'g', description: 'GitHub user and repo name to initialize or update, supersedes both user and repo options'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f', description: 'overwrite existing files'}),
  }

  static args = [{
    name: 'folder',
    description: 'project destination folder, defaults to current working directory',
    hidden: false,
    default: currentWorkingDir
  }]

  async run() {
    // https://oclif.io/docs/prompting#inquirer
    const {args, flags} = this.parse(Init)

    let {user, repo} = parseGitHubRepoName(flags)
    const responses = await inquirer.prompt([{
      name: 'user',
      message: 'Enter your GitHub username:',
      type: 'input',
      default: user,
      when: !user,
      validate: input => !!input && !isIllegalGitHubFlag(input)
    }])
    user = responses.user

    const projectPath = path.isAbsolute(args.folder)
      ? args.folder
      : path.join(currentWorkingDir, args.folder)
    this.log(`Project path: ${projectPath}`)
    if (!fs.existsSync(projectPath)) {
      mkdirp(projectPath)
    }

    const gitHubRepo = `${user}/${repo}`
    process.env.GITHUB_USERNAME = user
    process.env.PROJECT_NAME = process.env.GITHUB_REPO_NAME = repo

    this.log(`Initializing project ${repo} and pushing to ${gitHubRepo} on GitHub…`)
    // TODO: Copy template files
    if (args.folder && flags.force) {
      this.log(`you input --force and --folder: ${args.folder}`)
    }
  }
}

const gitHubFlagMatch = RegExp(/.*[A-Za-z0-9]\/[A-Za-z0-9].*/)
const gitHubFlagIllegalChars = '/'
function parseGitHubRepoName(flags: {user: string | undefined, repo: string | undefined, github: string | undefined}): {user: string | undefined, repo: string | undefined} {
  let { user, repo } = flags
  // Try to parse given GitHub repo names
  if (flags.github && gitHubFlagMatch.test(flags.github)) {
    const parts = flags.github.split('/')
    if (parts.length === 1) return { user, repo: flags.github }
    // Both parts included and they don't include "illegal" characters
    if (parts.length === 2 && !isIllegalGitHubFlag(parts[0]) && !isIllegalGitHubFlag(parts[1])) {
      return {
        user: parts[0],
        repo: parts[1]
      }
    }
  }

  // Else, try to use constituent flags
  if (isIllegalGitHubFlag(user)) {
    user = undefined
  }
  if (isIllegalGitHubFlag(repo)) {
    repo = undefined
  }

  return { user, repo }
}

function isIllegalGitHubFlag(flag: string | undefined) {
  return gitHubFlagIllegalChars.split('').some(illegalChar => (flag || '').includes(illegalChar))
  // return includesCharacters(gitHubFlagIllegalChars, flag || '')
}
