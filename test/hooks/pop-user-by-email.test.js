const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const popUserByEmail = require('../../src/hooks/pop-user-by-email');

describe('\'pop-user-byEmail\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: popUserByEmail()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
