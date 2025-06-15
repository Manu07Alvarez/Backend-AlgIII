
/* eslint-disable @typescript-eslint/no-unused-vars */
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { SimpleLogRecordProcessor, ConsoleLogRecordExporter, NoopLogRecordProcessor } from '@opentelemetry/sdk-logs';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { NetInstrumentation } from '@opentelemetry/instrumentation-net';


let exportLogs;
try {
  await fetch('http://localhost:4318');
  exportLogs = new SimpleLogRecordProcessor(new OTLPLogExporter());
}catch (error: unknown){
  exportLogs = new NoopLogRecordProcessor();
  if (error instanceof Error) {
    console.log("no se encontro conexion para OTL");
  }
}

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'yourServiceName',
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
  traceExporter: new ConsoleSpanExporter(),
  
  logRecordProcessors: [exportLogs],
  instrumentations: [
    new ExpressInstrumentation(),
    //new HttpInstrumentation(),
    new WinstonInstrumentation(),
    new NetInstrumentation(),
  ],
});

console.log('📊 Instrumentation initialized');
sdk.start();
