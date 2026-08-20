import {
  type ExceptionFilter,
  Catch,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (!isHttpException) {
      const logger = new Logger(AllExceptionsFilter.name);

      logger.error(
        `Unhandled server error: ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : exception,
      );
    }

    const exceptionResponse = isHttpException ? exception.getResponse() : null;

    const errorMessage =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? // biome-ignore lint/suspicious/noExplicitAny: <>
          (exceptionResponse as any).message ||
          JSON.stringify(exceptionResponse)
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    response.status(status).json({
      success: false,
      statusCode: status,
      error: errorMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
