const TIMES_TO_DELAY = 3000 // need decrease/increase deps on network.

function publish(nightmare, { username, password }, { meta, content }) {
  nightmare
    .goto('https://www.v2ex.com/')
    .exists('.user.avatar') // already login?
    .then(isLogin => {
      console.info('already login?', isLogin)
      if (!isLogin) {
        nightmare
          .goto('https://www.v2ex.com/')
          .insert('[name="username"]', username)
          .insert('[name="password"]', password)
          .click('[type="submit"]')
      }
      nightmare
        .wait('a.btn.btn-large.btn-success')
        .click('a.btn.btn-large.btn-success')
        .wait('a.new-note-link')
        .click('a.new-note-link')
        .wait(TIMES_TO_DELAY) // waiting to create new note otherwise will override original article
        .wait('#note_title')
        .insert('#note_title', meta.title)
        .insert('textarea.text.mousetrap', content)
        .wait(TIMES_TO_DELAY) // publish button will hidden when saving draft
        .wait('#publish-button')
        .click('#publish-button')
        .wait(TIMES_TO_DELAY * 2) // publish process need some times
        .evaluate(() => {
          const success = $('h3:contains("文章发布成功")')[0]
          if (success) {
            const title = $('.text-info')[0]
            console.info('文章发布成功', title)
            return `[${title.text}](${title.href})`
          }
          throw new Error('文章发布异常...')
        })
        .end()
        .then(title => console.info(`发布成功 => ${title}`))
        .catch(err => console.error(err))
    })
}

// update article need find a.note-link.title text() === article.meta.title

// eg: $( "a:contains('Hello World')" )

module.exports = publish
