function listAnalytics(urls) {
  const tbodyDOM = document.querySelector('tbody');

  for (let value in urls) {
    const id = urls[value];

    const html = `
    <tr class="bg-white">
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">${value}</td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
      <a href="./url/${id.shortId}">localhost:8000/url/${id.shortId}</a>
      </td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
      ${id.redirectURL}
      </td>
      <td class="p-3 text-sm text-gray-700 whitespace-nowrap flex justify-center">
      ${id.totalCLicks}
      </td>
    </tr>
    `;

    tbodyDOM.innerHTML += html;
  }
}

async function getAnalytics() {
  const response = await fetch('./url/analytics/');

  if (response.status === 401) {
    // Redirect to login page or show login modal
    window.location.href = '/login';
  }

  const result = await response.json();
  listAnalytics(result);
}

document.addEventListener('DOMContentLoaded', getAnalytics);