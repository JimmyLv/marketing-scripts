const TIMES_TO_DELAY = 2000 // need decrease/increase deps on network.

function publish(nightmare, {username, password}, {meta, content}) {
  nightmare
    .goto('https://gold.xitu.io/')
    .exists('img.avatar') // already login?
    .then(isLogin => {
      console.info('already login?', isLogin)
      if (!isLogin) {
        nightmare
          .click('button.inline.login-button')
          .insert('input[name="emailOrPhone"]', username)
          .insert('input[name="password"]', password)
          .click('button.fullwidth.welcome-large-btn')
          .wait(TIMES_TO_DELAY) // login need some times
      }
      // will redirect to write page directly
      nightmare
        .goto('https://gold.xitu.io/editor/md') // this way will logout, no idea
        // .click('.nav-action.dropdown') // this will new tab
        // .click('li[_v-c254183c]:nth-child(2)')
        .wait('input.title-input')
        .insert('input.title-input', meta.title)
        .insert('textarea.ace_text-input', content)
        .type('textarea.ace_text-input', ' ')
        .click('.release-button')
        // .click('.to-release')
        // .evaluate((content) => {
        //   function sleep(miliseconds) {
        //     const currentTime = new Date().getTime();
        //
        //     while (currentTime + miliseconds >= new Date().getTime()) {
        //     }
        //   }
        //
        //   const editor = ace.edit('editor')
        //   editor.setValue(content, 1)
        //
        //   document.getElementsByClassName("release-button")[0].click()
        //   console.info(document.getElementsByClassName("to-release")[0])
        //   sleep(1000)
        //   document.getElementsByClassName("to-release")[0].click()
        // }, content)
        .wait(TIMES_TO_DELAY) // publish need some times
        .url()
        .end()
        .then(url => console.info(`发布成功 => [${meta.title}](${url})`))
        .catch(err => console.error(err))
    })
}

module.exports = publish
