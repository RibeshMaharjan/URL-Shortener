function listUrl(urls) {
  const tbodyDOM = document.querySelector('tbody');

  const html = urls.map(url => {
    return `
    <tr class="bg-white">
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${url.id}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
      <a href="./url/${url.shortId}">localhost:8000/url/${url.shortId}</a>
      </td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
      ${url.redirectURL}
      </td>
    </tr>
    `;
  }).join('');

  tbodyDOM.innerHTML += html;
}

async function getAllShortURL() {
  const response = await fetch('/url');

  if (response.status === 401) {
    // Redirect to login page or show login modal
    window.location.href = '/login';
  }

  const urls = await response.json();
  listUrl(urls);
}

function loadNewUrl(newUrl) {
  const tbodyDOM = document.querySelector('tbody');

  const html = `
    <tr class="bg-white">
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${newUrl.id}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
      <a href="./url/${newUrl.shortId}">localhost:8000/url/${newUrl.shortId}</a>
      </td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
      ${newUrl.redirectUrl}
      </td>
    </tr>
  `;

  tbodyDOM.innerHTML += html;
}

async function handleUrlForm(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const newUrl = {};

  formData.forEach((value, key) => {
    newUrl[key] = value;
  })

  const response = await fetch('http://localhost:8000/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUrl)
  });

  if (response.status === 401) {
    // Redirect to login page or show login modal
    window.location.href = '/login';
  }

  const url = await response.json();

  loadNewUrl(url);
}

document.addEventListener('DOMContentLoaded', getAllShortURL);

const urlForm = document.getElementById('url-form');
urlForm.addEventListener('submit', handleUrlForm);