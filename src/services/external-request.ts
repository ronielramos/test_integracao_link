import request, { Options } from 'request'

export const executar = (
  options: Options
): Promise<{ body: unknown; response: unknown }> =>
  new Promise((resolve, reject) =>
    request(options, (error: Error, response, body) =>
      error ? reject(error) : resolve({ body, response })
    )
  )
