import { exists } from 'node:fs/promises';
import { isAbsolute, join, normalize, relative } from 'node:path';
import readline from 'node:readline/promises';

import { sleep } from 'bun';
import chalk from 'chalk';

// eslint-disable-next-line no-restricted-imports
import { version } from '../../package.json';
import { createNewProject } from './createNewProject';

console.log('\nNick.js', version);

type Step = {
  getDefaultValue: () => string;
  getPrompt: () => string;
  transform: (answer: string) => string;
  validate: (answer: string) => Promise<boolean>;
  value: string;
};

function log(message: string) {
  console.log(message);
}

function logError(message: string) {
  console.error(chalk.red(message));
}

async function wizard() {
  let currentStepIndex = 0;

  const steps: Step[] = [
    {
      getDefaultValue: () => '',
      getPrompt: () => 'What is the name of the project?',
      transform: (answer: string) => answer.trim(),
      validate: async (answer) => {
        if (!answer) {
          logError("Project name can't be blank.");
          return false;
        }

        return true;
      },
      value: '',
    },
    {
      getDefaultValue: () => join(process.cwd(), steps[0]!.value),
      getPrompt: () =>
        `Where would you like to create the project? ${chalk.gray(
          `Default: ./${steps[0]!.value}`,
        )}`,
      transform: (path: string) =>
        isAbsolute(path) ? path : normalize(join(process.cwd(), path)),
      validate: async (path) => {
        if (await exists(path)) {
          logError(`${path} already exists. Please choose another location.`);
          return false;
        }

        return true;
      },
      value: '',
    },
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (currentStepIndex < steps.length) {
    const currentStep = steps[currentStepIndex]!;
    const rawAnswer = await rl.question(
      chalk.bold(`\n${currentStep.getPrompt()}\n`),
    );
    const value = currentStep.transform(
      (rawAnswer || currentStep.getDefaultValue()).trim(),
    );

    if (await currentStep.validate(value)) {
      currentStep.value = value;
      currentStepIndex += 1;
    }
  }

  rl.close();

  await sleep(10);

  const getStepValue = (stepIndex: number) => {
    const step = steps[stepIndex]!;
    return step.value;
  };

  const projectName = getStepValue(0);
  const projectDir = getStepValue(1);

  await createNewProject({ projectName, projectDir });

  const relativeProjectDir = join(
    '.',
    normalize(relative(process.cwd(), projectDir)),
  );

  log(`
${chalk.green.bold(`Successfully created new project at ${projectDir}`)}

Before we can get started, we'll need to setup a few environment variables.

${chalk.bold('Database')}
- Login or sign up for an account at PlanetScale: https://auth.planetscale.com/sign-up
- Create a new database
- Select Kysely as the language / framework
- Click "Create password" at the bottom of the page
- Copy the ${chalk.yellow('DATABASE_HOST')}, ${chalk.yellow(
    'DATABASE_USERNAME',
  )}, and ${chalk.yellow(
    'DATABASE_PASSWORD',
  )} variables to ${relativeProjectDir}/.env.local

${chalk.bold('Github Oauth')}
- Go to https://github.com/settings/applications/new
- Fill out the form with the project information, and set the "Authorization callback URL" to "http://localhost:3000/api/auth/callback/github"
- Create the application
- Set the client id as the value for ${chalk.yellow(
    'GITHUB_CLIENT_ID',
  )} in ${relativeProjectDir}/.env.local
- Generate a new client secret and set it as the value for ${chalk.yellow(
    'GITHUB_SECRET',
  )} in ${relativeProjectDir}/.env.local

Finally we're ready to install dependencies, migrate the database, and start the server.${chalk.yellow(`
  cd ${relativeProjectDir}
  bun install
  bun migrate:to-latest
  bun dev`)}
`);
}

export { wizard };
