const posts = [{
    title: 'Post 1',
    date: new Date(),
    views: 11,
    comments: [1, 2],
    _id: '1'
  },
  {
    title: 'Post 2',
    date: new Date(),
    views: 22,
    comments: [1, 2, 3],
    _id: '2'
  },
  {
    title: 'Post 3',
    date: new Date(),
    views: 33,
    comments: [1],
    _id: '3'
  }
]

export const actions = {
  async fetchAdminItems({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts)
      }, 500)
    })
  },
  async remove({}, id) {
    console.log('deleted', id);
  },
  async update({}, formData) {
    console.log('updated ', formData);
  },
  async create({
    commit
  }, {
    title,
    text,
    image
  }) {
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('text', text);
      fd.append('image', image, image.name);
      console.log('FormData', title, text, image.name);
      console.log('FormData', fd);
      return await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    } catch (e) {
      commit('setError', e, {
        root: true
      })
      throw e
    }

  },
  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(posts.find(p => p._id === id))
      }, 500)
    })
  }
}
