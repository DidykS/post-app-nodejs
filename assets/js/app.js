// delete post
document.addEventListener('click', (e) => {
  const id = e.target?.dataset?.id || null
  // if (id) {
  //   fetch(`/posts/${id}`, {
  //     method: 'DELETE',
  //   }).then(() => {
  //     window.location.href = '/posts'
  //   })
  // }
  console.log(id)
})
