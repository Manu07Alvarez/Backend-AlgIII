import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK, tracing } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

//FIXME: Configuraciones adicionales
const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'yourServiceName',
    [ATTR_SERVICE_VERSION]: '1.0',
  }),
  traceExporter: new ConsoleSpanExporter(),
  spanProcessors: [new tracing.SimpleSpanProcessor(new tracing.ConsoleSpanExporter())],
  logRecordProcessors: [
    new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
  ],
  instrumentations: [
    new ExpressInstrumentation(),
    new HttpInstrumentation(),
    new PinoInstrumentation({
      enabled: true,
      logKeys: {
        traceId: 'TraceId',
        spanId: 'SpanId',
        traceFlags: 'TraceFlags',
      },
      logHook: (span, record) => {
        record['traceId'] = span.spanContext().traceId;
        record['spanId'] = span.spanContext().spanId;
      },
      disableLogCorrelation: false,
    }),
    
  ],
  contextManager: new AsyncLocalStorageContextManager(),
});
console.log('📊 Instrumentation initialized');
sdk.start();
