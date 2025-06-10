import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);




const logExporter = new OTLPLogExporter({
  url: 'http://localhost:4318/v1/logs',
  timeoutMillis: 15000,
});

const sdk = new NodeSDK({
  serviceName: 'my-service',
  instrumentations: [
    new PinoInstrumentation({
        logHook: (span: any, record: any) => {
            console.log("RECEIVE FROM HOOK")
        }
    }),
  ],
  logRecordProcessors: [new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())],
});
console.log('📊 Instrumentation initialized');
sdk.start();
