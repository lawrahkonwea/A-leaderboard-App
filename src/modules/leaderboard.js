const form = document.querySelector('.input-con');
const refreshBtn = document.getElementById('refresh');
const table = document.getElementById('table');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/NPaptjyQoZR4gTqSeCZi/scores/';

const getScores = async () => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
};

const refresh = () => {
  table.innerHTML = '';
  const gamers = [];
  getScores().then((entry) => {
    Object.entries(entry.result).forEach(([, value]) => {
      gamers.push(JSON.stringify(value));
      const listItems = document.createElement('tr');
      listItems.className = 'listItems';
      listItems.innerHTML = `
                <td>${value.user}</td>
                <td>${value.score}</td>
            `;
      table.appendChild(listItems);
    });
  });
};

const add = async (newScore) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  refresh();
  return data;
};

const create = () => {
  const newScore = {
    user: document.getElementById('username').value,
    score: document.getElementById('userscore').value,
  };
  document.getElementById('username').value = '';
  document.getElementById('userscore').value = '';
  add(newScore);
};

refresh();

refreshBtn.addEventListener('click', () => {
  refresh();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  create();
});
