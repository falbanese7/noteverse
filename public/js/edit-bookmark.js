const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document
    .querySelector('input[name="bookmark-title"]')
    .value.trim();
  const URL = document.querySelector('input[name="URL"]').value.trim();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/bookmark/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ bookmark_id: id, title, URL }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};
document
  .querySelector('.edit-bookmark-form')
  .addEventListener('submit', editFormHandler);
