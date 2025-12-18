let schedule = JSON.parse(localStorage.getItem('schedule')) || [];
const scheduleListEl = document.getElementById('scheduleList');

function renderSchedule() {
  scheduleListEl.innerHTML = '';
  schedule.forEach((event, i) => {
    const li = document.createElement('li');
    li.textContent = `${event.time} - ${event.name}`;

    const del = document.createElement('button');
    del.textContent = '❌';
    del.style.marginLeft = '10px';
    del.onclick = () => {
      schedule.splice(i, 1);
      localStorage.setItem('schedule', JSON.stringify(schedule));
      renderSchedule();
    };

    li.appendChild(del);
    scheduleListEl.appendChild(li);
  });
}

document.getElementById('addEventBtn').addEventListener('click', () => {
  const name = document.getElementById('eventInput').value.trim();
  const time = document.getElementById('timeInput').value;
  if (!name || !time) return;

  schedule.push({ name, time });
  localStorage.setItem('schedule', JSON.stringify(schedule));

  document.getElementById('eventInput').value = '';
  document.getElementById('timeInput').value = '';
  renderSchedule();
});

renderSchedule();
