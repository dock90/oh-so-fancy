const client = require('./client');

module.exports = {
  async exportPathMap(defaultPathMap) {
    const paths = await client
      .fetch('*[_type == "post" && defined(slug)].slug.current')
      .then(data =>
        data.reduce(
          (acc, slug) => ({
            '/': { page: '/' },
            ...acc,
            [`/thoughts/${slug}`]: { page: 'Thoughts/Post', query: { slug } },
          }),
          defaultPathMap
        )
      )
      .catch(console.error);
    return paths;
  },
};
