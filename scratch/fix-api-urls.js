const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'mcq-practice', 'src');

const replacementUrlFunction = `  const getApiUrl = (path: string) => {
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '[::1]' ||
                    hostname.startsWith('192.168.');
    if (isLocal && window.location.port !== '3000') {
      return \`http://localhost:3000\${path}\`;
    }
    if (hostname.endsWith('.web.app') || hostname.endsWith('.firebaseapp.com')) {
      return \`https://study-ai-olive.vercel.app\${path}\`;
    }
    return path;
  };`;

// Regex pattern to match various local declarations of getApiUrl
const getApiUrlRegex = /const\s+getApiUrl\s*=\s*\([^)]*\)\s*=>\s*\{[\s\S]*?return\s*[`"'][\s\S]*?;?\s*\};/g;

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (getApiUrlRegex.test(content)) {
        console.log(`Updating getApiUrl in: ${path.relative(srcDir, fullPath)}`);
        content = content.replace(getApiUrlRegex, replacementUrlFunction);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

console.log('Scanning src directory for getApiUrl helper...');
processDirectory(srcDir);
console.log('Scan completed.');
