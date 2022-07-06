const tagFormHandler = async (event) => {
  event.preventDefault();

  const tag_name = document
    .querySelector('textarea[name="tag-body"]')
    .value.trim();

  if (tag_name) {
    const response = await fetch('/api/tag', {
      method: 'POST',
      body: JSON.stringify({ tag_name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector('.new-tag-form')
  .addEventListener('submit', tagFormHandler);
