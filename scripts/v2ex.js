const TIMES_TO_DELAY = 1500 // need decrease/increase deps on network.

function publish(nightmare, { username, password }, { meta, content }) {
  nightmare
    .goto('https://www.v2ex.com/')
    .exists('img.avatar') // already login?
    .then(isLogin => {
      console.info('already login?', isLogin)
      if (!isLogin) {
        nightmare
          .goto('https://www.v2ex.com/signin')
          .insert('[placeholder="用户名或电子邮箱地址"]', username)
          .insert('[type="password"]', password)
          .click('[type="submit"]')
          .wait(TIMES_TO_DELAY) // login need some times
      }
      nightmare
        .goto('https://www.v2ex.com/new')
        .wait('#topic_title')
        .insert('#topic_title', meta.title)
        .evaluate((content) => {
          const textArea = document.getElementById('editor')
          const editor = CodeMirror.fromTextArea(textArea)
          editor.getDoc().setValue(content)
          
          $('button.super.normal.button').click()
        }, content)
        .wait(TIMES_TO_DELAY) // publish need some times
        .url()
        .end()
        .then(url => console.info(`发布成功 => [${meta.title}](${url})`))
        .catch(err => console.error(err))
    })
}

// update article need find a.note-link.title text() === article.meta.title

// eg: $( "a:contains('Hello World')" )

module.exports = publish
