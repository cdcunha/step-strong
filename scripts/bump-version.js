const fs = require('fs');
const path = require('path');

// Only run in Vercel's build environment
if (process.env.VERCEL === '1') {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Parse current version
    const [major, minor, patch] = packageJson.version.split('.').map(Number);
    
    // Increment patch version
    const newVersion = `${major}.${minor}.${patch + 1}`;
    
    // Update package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`Bumped version to: ${newVersion}`);
  } catch (error) {
    console.error('Error bumping version:', error);
    process.exit(1);
  }
}
