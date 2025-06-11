/* eslint-disable @typescript-eslint/no-unused-vars */
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SimpleLogRecordProcessor, ConsoleLogRecordExporter } from '@opentelemetry/sdk-logs';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

//FIXME: Configuraciones adicionales
const sdk = new NodeSDK({
  serviceName: 'pino-instrumentation',
  instrumentations: [
    new PinoInstrumentation({
    logHook: (span, record, level) => {
        console.log('🎯 PINO LOG INTERCEPTED:', {
          level,
          msg: record.msg,
          spanId: span?.spanContext()?.spanId,
          traceId: span?.spanContext()?.traceId
        });
      },
            // Configuraciones adicionales
      enabled: true,
      // Opcional: filtrar por nivel de log
    }),
  ],
  logRecordProcessors: [
    new SimpleLogRecordProcessor(new ConsoleLogRecordExporter())
  ],
});
console.log('📊 Instrumentation initialized');
sdk.start();
