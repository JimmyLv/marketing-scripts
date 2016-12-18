const TIMES_TO_DELAY = 2000 // need decrease/increase deps on network.

function publish(nightmare, {username, password}, {meta, content}) {
  nightmare
    .goto('http://write.blog.csdn.net/postlist')
    .exists('img.curr-icon-img') // already login?
    .then(isLogin => {
      console.info('already login?', isLogin)
      if (!isLogin) {
        nightmare
          // .insert('input#username', username)
          .insert('input#password', password)
          .click('input.logging')
          .wait(TIMES_TO_DELAY) // login need some times
      }
      // will redirect to write page directly
      nightmare
        .goto('http://write.blog.csdn.net/mdeditor')
        .wait('a.btn.btn-success.file-title-navbar')
        .insert('.file-title-navbar', meta.title)
        .insert('.editor-content', content)
        .wait(TIMES_TO_DELAY) // save need some times
        .click('.btn-blog-publish') // 发表博客
        .wait('a#csdn-tags-blog-button')
        .click('a#csdn-tags-blog-button') // 下一步
        .wait('select#input-blog-type')
        .select('select#input-blog-type', 'original')
        .click('div#tags-con-categories')
        .wait('span.label.label-default.set_tag_key')
        .click('span.label.label-default.set_tag_key')
        .select('select#input-blog-channel', '14')
        .click('a#csdn-post-blog-button')
        .wait(TIMES_TO_DELAY) // publish need some times
        .wait('a.btn.btn-danger')
        .click('a.btn.btn-danger') // go to new post url
        .url()
        .end()
        .then(url => console.info(`发布成功 => [${meta.title}](${url})`))
        .catch(err => console.error(err))
    })
}

module.exports = publish
