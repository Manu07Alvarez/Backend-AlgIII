
/* eslint-disable @typescript-eslint/no-unused-vars */
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { NetInstrumentation } from '@opentelemetry/instrumentation-net';
//FIXME: Configuraciones adicionales
const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'yourServiceName',
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
  traceExporter: new ConsoleSpanExporter(),
  logRecordProcessors: [new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())],
  instrumentations: [
    new ExpressInstrumentation(),
    //new HttpInstrumentation(),
    new WinstonInstrumentation(),
    new NetInstrumentation(),
  ],
});

console.log('📊 Instrumentation initialized');
sdk.start();
