const axios = require('axios');
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async 'db:erase'() {
          //get all users
          const { data } = await axios.get(`http://127.0.0.1:4000/users`);
          //delete all users
          data.forEach(async (user) => {
            await axios.delete(`http://127.0.0.1:4000/users/${user.id}`);
          });
          return null;
        },

        async 'db:create:user'(user) {
          const { data } = await axios.post(`http://127.0.0.1:4000/users`, user);
          return data;
        },
      })
    },
  },
});
