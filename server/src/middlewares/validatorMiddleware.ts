import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

import { handleError } from './responseMiddleware';

const validatorMiddleware = (validations: ValidationChain[]) => async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return next(handleError({
      statusCode: 422,
      message: 'Invalid parameters',
      data: errors.array(),
    }, req, res, next))
  }
};

export default validatorMiddleware;
