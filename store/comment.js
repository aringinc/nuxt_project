/* eslint-disable no-empty-pattern */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
/* eslint-disable no-console */

// import { addView } from '../server/controllers/post.controller';

/* eslint-disable no-underscore-dangle */
export const actions = {
  async create({ commit }, data) {
    try {
      return await this.$axios.$post('/api/comment', data);
    } catch (e) {
      commit('setError', e, { root: true });
      throw e;
    }
  },
};
