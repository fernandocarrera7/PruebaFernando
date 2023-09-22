
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.swapi`,
  events: [
    {
      http: {
        method: 'post',
        path: 'swapi/people',
        request: {
          
        },
        
      },
    },
  ],
};
