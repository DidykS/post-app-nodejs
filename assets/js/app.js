// delete post
document.addEventListener('click', (e) => {
  const id = e.target?.dataset?.id || null

  if (id) {
    fetch(`/posts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      window.location.href = '/posts'
    })
  }
})

// text-overflow, Clamp.js
var truncate = document.querySelectorAll('#description')
truncate.forEach((item) => {
  $clamp(item, {
    clamp: 4,
    useNativeClamp: false,
  })
})
