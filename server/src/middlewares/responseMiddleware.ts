import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';


export interface IErrorResponse {
  status?: string;

  statusCode: number;

  message: string;

  data?: any;
}

export class ErrorHandler implements IErrorResponse {
  status: string;
  statusCode: number | null = null;
  message: string;
  data: any;

  constructor(statusCode: number, data: string | Omit<IErrorResponse, 'statusCode'>) {
    this.statusCode = statusCode;

    if (typeof data === 'string') {
      this.message = data;
    }

    if (typeof data === 'object') {
      this.message = data.message;
      this.data = data.data;
    }
  }
}

export const logError = (response: IErrorResponse, routeName: string): void => {
  console.log(
    chalk.red(
      `${chalk.white.bgRed.bold(` ${response.statusCode} `)} ${
        response.message
      } on ${routeName}`,
    ),
  );
};

export const handleError = (
  err: IErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const { statusCode: statusCodeFromErr, message, data } = err;

  const statusCode = statusCodeFromErr || 500;

  const response = {
    status: 'error',
    statusCode,
    message,
    data,
  };

  logError(response, req.originalUrl);

  return res.status(statusCode).json(response);
};
