const { spawn, execFile } = require('child_process');

const payload = {
  name: 'magic',
  type: 'stdio',
  command: 'npx',
  args: ['-y', '@21st-dev/magic@latest'],
  env: {
    API_KEY: 'e1a9788aa735a7a06110b2ee8c467f4f4d637b4fe2b4949fcb4c668e85eae160'
  }
};

const json = JSON.stringify(payload);
console.log('Registering MCP with payload:', json);

const fs = require('fs');
const path = require('path');

const localBase = process.env.LOCALAPPDATA || '';
const codeExePath = localBase
  ? path.join(localBase, 'Programs', 'Microsoft VS Code', 'Code.exe')
  : null;
const codeCmd = codeExePath && fs.existsSync(codeExePath)
  ? codeExePath
  : (localBase ? path.join(localBase, 'Programs', 'Microsoft VS Code', 'bin', 'code.cmd') : 'code');

let child;
if (/\.cmd$/i.test(codeCmd) || /\\\\bin\\\\code(\\.cmd)?$/i.test(codeCmd)) {
  child = execFile(codeCmd, ['--add-mcp', json], { stdio: 'inherit' });
} else {
  child = spawn(codeCmd, ['--add-mcp', json], { stdio: 'inherit' });
}

child.on('exit', (code) => {
  console.log('code process exited with', code);
});

child.on('error', (err) => {
  console.error('Failed to start `code` process:', err);
});
