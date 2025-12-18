let goals = JSON.parse(localStorage.getItem('goals')) || [];
const goalListEl = document.getElementById('goalList');

function renderGoals() {
  goalListEl.innerHTML = '';
  goals.forEach((goal, i) => {
    const li = document.createElement('li');
    li.textContent = goal;

    const del = document.createElement('button');
    del.textContent = '❌';
    del.style.marginLeft = '10px';
    del.onclick = () => {
      goals.splice(i, 1);
      localStorage.setItem('goals', JSON.stringify(goals));
      renderGoals();
    };

    li.appendChild(del);
    goalListEl.appendChild(li);
  });
}

document.getElementById('addGoalBtn').addEventListener('click', () => {
  const val = document.getElementById('goalInput').value.trim();
  if (!val) return;

  goals.push(val);
  localStorage.setItem('goals', JSON.stringify(goals));
  document.getElementById('goalInput').value = '';
  renderGoals();
});

renderGoals();
