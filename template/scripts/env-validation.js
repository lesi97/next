'use server';
import { z } from 'zod';

const missingMessage = 'Variable missing';
const envSchema = z.object({
  SUPABASE_PROJECT_ID: z
    .string({ required_error: missingMessage })
    .min(1, { message: missingMessage }),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string({ required_error: missingMessage })
    .min(1, { message: missingMessage }),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string({ required_error: missingMessage })
    .min(1, { message: missingMessage }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string({ required_error: missingMessage })
    .min(1, { message: missingMessage }),
  VERCEL_URL: z
    .string({ required_error: missingMessage })
    .min(1, { message: missingMessage }),
});

const ansiText = {
  BLACK: '\x1b[30m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  MAGENTA: '\x1b[35m',
  WHITE: '\x1b[37m',
};

const ansiBg = {
  BLACK: '\x1b[40m',
  RED: '\x1b[41m',
  GREEN: '\x1b[42m',
  YELLOW: '\x1b[43m',
  BLUE: '\x1b[44m',
  MAGENTA: '\x1b[45m',
  CYAN: '\x1b[46m',
  WHITE: '\x1b[47m',
};

const RESET = '\x1b[0m';

const divider1 = `${ansiText.RED}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\${RESET}`;
const divider2 = `${ansiText.RED}//////////////////////////////////////////////////////${RESET}`;

function customLog(str, type) {
  switch (type) {
    case 'error':
      return console.error(`\n ${ansiBg.RED}${ansiText.WHITE} ${str} ${RESET}`);
    case 'warning':
      return console.warn(`${ansiText.YELLOW} ${str} ${RESET}`);
    case 'info':
      return console.log(`${ansiText.BLUE} ${str} ${RESET}`);
    default:
      return console.log(`${str}`);
  }
}

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  customLog(divider1);
  customLog('Env validation Error', 'error');
  for (const issue of parsed.error.issues) {
    customLog(`• ${issue.message} - ${issue.path.join('.')}`, 'warning');
  }
  customLog('\n Check your .env file against envSchema and try again\n');
  customLog(`${divider2}\n\n`);
  process.exit(1);
}

export default parsed;
