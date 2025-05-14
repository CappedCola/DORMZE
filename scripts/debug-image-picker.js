/**
 * Debug Image Picker Script
 * This script helps diagnose issues with the expo-image-picker module
 * 
 * Run with: node scripts/debug-image-picker.js
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Log with color
function log(message, color = colors.white) {
  console.log(`${color}${message}${colors.reset}`);
}

// Check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

log('============================================', colors.cyan);
log('IMAGE PICKER DEBUGGING UTILITY', colors.cyan);
log('============================================', colors.cyan);

// 1. Check if expo-image-picker is installed
log('\n1. Checking if expo-image-picker is installed...', colors.yellow);
const packageJsonPath = path.join(process.cwd(), 'package.json');

if (fileExists(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  if (dependencies['expo-image-picker']) {
    log(`✅ expo-image-picker is installed (version ${dependencies['expo-image-picker']})`, colors.green);
  } else {
    log('❌ expo-image-picker is NOT installed in package.json!', colors.red);
    log('   Run: npx expo install expo-image-picker', colors.yellow);
  }
} else {
  log('❌ Cannot find package.json!', colors.red);
}

// 2. Check eas.json configuration
log('\n2. Checking EAS build configuration...', colors.yellow);
const easJsonPath = path.join(process.cwd(), 'eas.json');

if (fileExists(easJsonPath)) {
  const easJson = JSON.parse(fs.readFileSync(easJsonPath, 'utf8'));
  const devConfig = easJson.build?.development;
  
  if (devConfig) {
    log('Development build configuration found:', colors.green);
    
    if (devConfig.extends === 'production') {
      log('✅ extends: "production" is set correctly', colors.green);
    } else {
      log('❌ Missing "extends": "production" in development build config', colors.red);
    }
    
    if (devConfig.prebuildCommand?.includes('expo-modules-autolinking')) {
      log('✅ prebuildCommand includes expo-modules-autolinking', colors.green);
    } else {
      log('❌ Missing prebuildCommand for autolinking in development build config', colors.red);
    }
  } else {
    log('❌ No development build configuration found in eas.json!', colors.red);
  }
} else {
  log('❌ Cannot find eas.json!', colors.red);
}

// 3. Check for implementation in the codebase
log('\n3. Searching for ImagePicker usage in the codebase...', colors.yellow);

try {
  // Use grep to find ImagePicker references in the codebase
  const grepCmd = process.platform === 'win32'
    ? 'findstr /s "ImagePicker" app/*.tsx'
    : 'grep -r "ImagePicker" --include="*.tsx" --include="*.js" app/';
  
  const result = child_process.execSync(grepCmd, { encoding: 'utf8' });
  log('ImagePicker references found in the codebase:', colors.green);
  
  const lines = result.split('\n').filter(line => line.trim()).slice(0, 5);
  lines.forEach(line => console.log(`   ${line.trim()}`));
  
  if (lines.length > 5) {
    log(`   ... and ${result.split('\n').filter(line => line.trim()).length - 5} more references`, colors.yellow);
  }
} catch (error) {
  log('❌ No ImagePicker references found or error searching the codebase', colors.red);
}

// 4. Provide recommendations
log('\n4. Recommendations:', colors.magenta);

log('• Ensure you\'re using a development build that includes the expo-image-picker module', colors.white);
log('• Start your app with: npx expo start (without --no-dev --minify flags)', colors.white);
log('• Add detailed console.logs to track permission states and errors', colors.white);
log('• Check app logs for permission-related errors', colors.white);
log('• If your module test shows ImagePicker is available but still crashes when used:', colors.white);
log('  - The issue might be with permissions or the specific method implementation', colors.white);
log('  - Make sure to handle all potential errors and edge cases in your code', colors.white);

log('\n============================================', colors.cyan);
log('DEBUGGING COMPLETE', colors.cyan);
log('============================================', colors.cyan); 