const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');

// Read and parse package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Parse current version
const [major, minor, patch] = packageJson.version.split('.').map(Number);

// Increment patch version
const newVersion = `${major}.${minor}.${patch + 1}`;

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

// Also update the version in a Vercel environment variable file
if (process.env.VERCEL === '1') {
  const vercelEnvPath = path.join(process.cwd(), '.vercel', '.env.production.local');
  try {
    let envContent = '';
    
    // Read existing .env file if it exists
    if (fs.existsSync(vercelEnvPath)) {
      envContent = fs.readFileSync(vercelEnvPath, 'utf8');
    }
    
    // Update or add the version
    if (envContent.includes('NEXT_PUBLIC_APP_VERSION=')) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_APP_VERSION=.*/,
        `NEXT_PUBLIC_APP_VERSION=${newVersion}`
      );
    } else {
      envContent += `\nNEXT_PUBLIC_APP_VERSION=${newVersion}\n`;
    }
    
    // Ensure the directory exists
    fs.mkdirSync(path.dirname(vercelEnvPath), { recursive: true });
    
    // Write the updated content back
    fs.writeFileSync(vercelEnvPath, envContent.trim() + '\n');
  } catch (error) {
    console.error('Error updating Vercel env file:', error);
  }
}

console.log(`Bumped version to: ${newVersion}`);
