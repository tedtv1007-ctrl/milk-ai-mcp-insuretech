/* eslint-disable no-console */
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OracleInstrumentation } from '@opentelemetry/instrumentation-oracledb';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';

/**
 * OpenTelemetry 初始化設定
 * 這個檔案應該在應用程式的最早期被載入
 */

const sdk = new NodeSDK({
  // 設定 Trace Exporter
  // 在開發階段，我們先輸出到 Console 方便觀察
  // 在生產環境，通常會換成 OTLP Exporter 發送到 Jaeger 或 Prometheus
  traceExporter: new ConsoleSpanExporter(),

  // 設定 Metric Reader
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),

  // 設定 Instrumentations (自動掛鉤)
  instrumentations: [
    // 1. 載入 Node.js 常見的自動掛鉤 (Express, Http, fs 等)
    getNodeAutoInstrumentations(),
    
    // 2. 載入我們的主角：Oracle DB 掛鉤
    new OracleInstrumentation(),
  ],
});

// 啟動 SDK
sdk.start();

console.log('[OpenTelemetry] SDK started successfully');

// 處理優雅關閉
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('[OpenTelemetry] SDK shut down successfully'))
    .catch((error) => console.log('[OpenTelemetry] Error shutting down SDK', error))
    .finally(() => process.exit(0));
});
