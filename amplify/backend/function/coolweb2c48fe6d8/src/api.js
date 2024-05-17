import { createUserStores } from './graphql/mutations.js';

import { executeRequest } from './helpers.js';

export const addUserStore = async (input) => {
  const user = await executeRequest(
    {
      query: createUserStores,
      name: 'createUserStores',
    },
    {
      input,
    }
  );
  return user;
};
