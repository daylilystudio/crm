// you can see more info at https://github.com/tschaub/gh-pages
const ghPages = require('gh-pages')

const options = {
  branch: 'gh-pages',
  repo: 'https://github.com/daylilystudio/crm.git' // project github repo
}
const callback = err => {
  if (err) console.error(err)
  else console.log('publish success')
}

/**
 * This task pushes to the `master` branch of the configured `repo`.
 */
ghPages.publish('dist', options, callback)
