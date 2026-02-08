# Milk AI MCP InsureTech Server (正體中文)

本專案實作了一個專為保險科技 (InsureTech) 設計的模型情境協定 (Model Context Protocol, MCP) 伺服器，專注於安全的理賠處理、保單分析與可觀測性。

## 🌟 核心功能 (Features)

### 1. 安全與合規 (Security & Compliance)
*   **PII Sanitization**: 自動遮蔽身分證字號、電話、Email 等敏感個資。
*   **Audit Logging**: 結構化的 JSON 稽核日誌，便於整合監控系統。

### 2. 智慧工具 (Intelligent Tools)
*   **OCR 整合**: 整合 `Tesseract.js`，支援理賠收據的文字辨識 (含 Mock 模式)。
*   **Policy Resources**: 提供標準保單範本的唯讀存取 (MCP Resources)。

### 3. 可觀測性 (Observability)
*   **Oracle 監控**: 整合 OpenTelemetry，自動追蹤資料庫操作效能。
*   **Health Check**: 提供 `/health` 端點以監控服務存活狀態。

---

## 🛠️ 安裝與設定 (Installation)

1. **Clone 專案**:
   ```bash
   git clone <repository-url>
   cd milk-ai-mcp-insuretech
   ```

2. **安裝依賴** (使用 yarn):
   ```bash
   yarn install
   ```

## 🚀 如何執行 (Usage)

1. **編譯 TypeScript**:
   ```bash
   yarn run build
   ```

2. **啟動伺服器**:
   ```bash
   yarn start
   ```
   伺服器將啟動於 `http://localhost:3000`，並自動載入 OpenTelemetry 監控。

## 🧪 測試 (Testing)

本專案使用 `Vitest` 進行單元測試。

```bash
yarn test
```

## 📚 API 端點

*   `GET /health`: 系統健康檢查。
*   `POST /api/process`: PII 脫敏處理。
*   `POST /api/ocr`: 上傳圖片路徑進行 OCR 解析。

---
**Powered by OpenClaw & Model Context Protocol**
