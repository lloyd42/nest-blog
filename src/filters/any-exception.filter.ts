import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'src/utils/log4js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log('错误：', exception);

    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: exception.statusCode ?? 500,
            message:
              exception.code === 'ENOENT'
                ? 'Not Found'
                : 'Internal server error',
          };
    const { statusCode, message } = exceptionResponse;

    const logFormat = `
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${statusCode}
    Response: ${exception.toString()}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;

    // 根据状态码，进行日志类型区分
    if (statusCode >= 500) {
      Logger.error(logFormat);
    } else if (statusCode >= 400) {
      Logger.warn(logFormat);
    } else {
      Logger.access(logFormat);
      Logger.log(logFormat);
    }

    // Logger.error(exceptionResponse);

    response.status(statusCode).json({
      code: statusCode,
      msg: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
