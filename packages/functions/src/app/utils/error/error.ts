export class HttpException extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

export const badRequestException = (
  message = "400 Bad Request"
): HttpException => new HttpException(400, message);

export const forbiddenException = (message = "403 Forbidden"): HttpException =>
  new HttpException(403, message);

export const notFoundException = (message = "404 Not Found"): HttpException =>
  new HttpException(404, message);
