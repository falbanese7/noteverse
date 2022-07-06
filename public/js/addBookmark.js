const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="bookmark-title"]').value;
  const URL = document.querySelector('textarea[name="URL"]').value;

  const response = await fetch('/api/bookmark', {
    method: 'POST',
    body: JSON.stringify({ title, URL }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};
document
  .querySelector('.new-bookmark-form')
  .addEventListener('submit', newFormHandler);
