/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
require('dotenv').config();

const TEXT_GREEN = '\x1b[32m';
const TEXT_YELLOW = '\x1b[33m';
const TEXT_BLUE = '\x1b[34m';
const TEXT_WHITE = '\x1b[37m';
const BACKGROUND_RED = '\x1b[41m';
const RESET = '\x1b[0m';

const projectId = process.env.SUPABASE_PROJECT_ID;
const outputPath = './src/schema/database.ts';

if (!projectId) {
  console.error(
    `${BACKGROUND_RED}${TEXT_WHITE}SUPABASE_PROJECT_ID is missing in .env file.${RESET}\n`
  );
  process.exit(1);
}

console.log(
  `${TEXT_BLUE}Generating Supabase types for project: ${projectId}${RESET}\n`
);

try {
  execSync(
    `npx supabase gen types typescript --project-id ${projectId} > ${outputPath}`,
    {
      stdio: 'inherit',
    }
  );
  console.log(
    `${TEXT_GREEN}Supabase types generated successfully!\nThe types can be found here:${RESET} ${TEXT_YELLOW}${outputPath}\n${RESET}`
  );
} catch (error) {
  console.error(
    `${BACKGROUND_RED}${TEXT_WHITE}  Error generating Supabase types:`,
    error.message,
    ` ${RESET}\n`
  );
  process.exit(1);
}
