#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prompt = await inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter your project directory name:',
        default: 'lesi-next',
        validate: (input) => !!input.trim() || 'Name cannot be empty',
    },
]);

const targetDir = prompt.projectName.trim();
const sourceDir = path.join(__dirname, 'template');

if (fs.existsSync(targetDir)) {
    console.error(`Directory "${targetDir}" already exists.`);
    process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

const packageJsonPath = path.join(targetDir, 'package.json');

if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkg.name = prompt.projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
}

console.log('Installing dependencies');
try {
    execSync('npm install --legacy-peer-deps', {
        stdio: 'inherit',
        cwd: targetDir,
    });
    console.log(
        `Project created and dependencies installed in "${projectName}"`
    );
    console.log(`cd ${projectName} && npm run dev`);
} catch (err) {
    console.error('Failed to install dependencies');
}
