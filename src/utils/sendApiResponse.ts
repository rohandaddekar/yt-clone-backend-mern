import { Response } from "express";

/**
 * Interface for sendApiResponse
 */
interface ISendApiResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: unknown;
  errors?: unknown;
}

/**
 * Utility function to send api response
 * @param res Express response object
 * @param options Response options (success, message, data, meta, errors, statusCode)
 * @returns Express Response with formatted JSON
 */

const sendApiResponse = (
  res: Response,
  {
    statusCode = 200,
    success = true,
    message = "Success",
    data = null,
    errors = null,
  }: ISendApiResponse
) => {
  // BUILD RESPONSE OBJECT
  const response: ISendApiResponse = {
    success,
    message,
  };

  // ADD OPTIONAL PROPERTIES
  if (data) response.data = data;
  if (errors) response.errors = errors;

  // SEND RESPONSE
  return res.status(statusCode).json(response);
};

export default sendApiResponse;
