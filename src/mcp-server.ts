import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import * as fs from 'fs';
import * as path from 'path';

// 建立 MCP Server 實例
const mcp = new McpServer({
  name: 'Milk AI InsureTech MCP',
  version: '1.0.0',
});

// 定義資源目錄
const TEMPLATE_DIR = path.join(__dirname, '../resources/templates');

// 註冊資源：列出所有範本
// URI 模式: insuretech://templates/{filename}
mcp.resource(
  'policy-template',
  new ResourceTemplate('insuretech://templates/{filename}', { list: undefined }),
  async (uri, { filename }) => {
    // 確保 filename 是字串
    if (typeof filename !== 'string') {
      throw new Error('Invalid filename type');
    }

    // 安全檢查：防止 Directory Traversal
    if (filename.includes('..') || filename.includes('/')) {
      throw new Error('Invalid filename');
    }

    const filePath = path.join(TEMPLATE_DIR, filename);

    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      return {
        contents: [
          {
            uri: uri.href,
            text: content,
          },
        ],
      };
    } catch (error) {
      throw new Error(`Template not found: ${filename}`);
    }
  }
);

/**
 * 啟動 MCP Server (使用 Stdio 傳輸，這是 CLI 工具的標準)
 * 如果要整合到 Express，我們會用 SSETransport
 */
export const startMcpServer = async () => {
  const transport = new StdioServerTransport();
  await mcp.connect(transport);
  console.error('MCP Server started on Stdio'); // 使用 stderr 避免干擾 stdout
};

// 如果直接執行此檔案
if (require.main === module) {
  startMcpServer();
}
