# Milk AI MCP InsureTech Server

本專案實作了一個專為保險科技 (InsureTech) 設計的模型情境協定 (Model Context Protocol, MCP) 伺服器，專注於安全的理賠處理和保單分析。

## 核心功能 (開發藍圖)

1. **個資過濾層 (PII Sanitization Layer)**: 確保敏感資料在發送到公用大型語言模型 (LLM) 前被妥善遮蔽。
2. **保單驗證工具**: 根據標準保險條款進行自動化檢查。
3. **理賠驗證**: 整合光學字元辨識 (OCR) 並進行初步風險評估。

## 安全第一

本專案為需要嚴格資料外洩防護 (DLP) 的金融環境所設計。

---

## 安裝與設定 (Installation & Setup)

1. **Clone 專案**:

   ```bash
   git clone <repository-url>
   cd milk-ai-mcp-insuretech
   ```

2. **安裝依賴套件**:
   ```bash
   npm install
   ```

## 如何執行 (How to Run)

1. **編譯 TypeScript 程式碼**:

   ```bash
   npm run build
   ```

2. **啟動伺服器**:
   ```bash
   npm start
   ```
   伺服器將會啟動在 `http://localhost:3000`。

## API 端點

### 健康檢查

- **URL**: `/`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**: `Milk AI MCP InsureTech Server is running.`

### 文字處理

- **URL**: `/api/process`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "text": "這是我的身分證 A123456789 和手機 0987654321。"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "original": "這是我的身分證 A123456789 和手機 0987654321。",
      "sanitized": "這是我的身分證  [ID_MASKED]  和手機  [PHONE_MASKED]  。"
    }
    ```
