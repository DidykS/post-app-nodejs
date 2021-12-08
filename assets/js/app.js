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

// text-overflow
const strings = document.querySelectorAll('#description')
strings.forEach((item) => {
  if (item.innerHTML.length > 500) {
    item.innerHTML =
      item.innerHTML.substring(9, item.innerHTML.length - 250) + '...'
  }
})
