const TIMES_TO_DELAY = 2000 // need decrease/increase deps on network.

function publish(nightmare, {username, password}, {meta, content}) {
  nightmare
    .goto('https://my.oschina.net/JimmyLv/blog')
    .exists('.btn-green') // already login?
    .then(isLogin => {
      console.info('already login?', isLogin)
      if (!isLogin) {
        nightmare
          .click('.user-info>a:nth-child(1)')
          .insert('input#userMail', username)
          .insert('input#userPassword', password)
          .click('button.btn-login')
          .wait(TIMES_TO_DELAY) // login need some times
      }
      // will redirect to write page directly
      nightmare
        .goto('https://my.oschina.net/JimmyLv/blog/edit')
        .wait('input#title')
        .insert('input#title', meta.title)
        .insert('textarea#mdeditor', content)
        .click('.select-box')
        .click('[data-value="428612"]') // category='前端开发'
        .click('button.btn-save')
        .wait(TIMES_TO_DELAY) // publish need some times
        .url()
        .end()
        .then(url => console.info(`发布成功 => [${meta.title}](${url})`))
        .catch(err => console.error(err))
    })
}

module.exports = publish
