let goals = JSON.parse(localStorage.getItem('goals')) || [];
let jessicaGoals = JSON.parse(localStorage.getItem('jessicaGoals')) || [];
let stacyGoals = JSON.parse(localStorage.getItem('stacyGoals')) || [];

const goalListEl = document.getElementById('goalList');

function renderGoals(list, showBack = false) {
  goalListEl.innerHTML = '';

  if(showBack) {
    const backBtn = document.createElement('button');
    backBtn.textContent = '⬅ Back';
    backBtn.onclick = () => renderGoals(goals);
    backBtn.style.marginBottom = '10px';
    goalListEl.appendChild(backBtn);
  }

  list.forEach((goal, i) => {
    const li = document.createElement('li');
    li.textContent = goal;

    const del = document.createElement('button');
    del.textContent = '❌';
    del.style.marginLeft = '10px';
    del.onclick = () => {
      list.splice(i,1);
      localStorage.setItem('goals', JSON.stringify(goals));
      localStorage.setItem('jessicaGoals', JSON.stringify(jessicaGoals));
      localStorage.setItem('stacyGoals', JSON.stringify(stacyGoals));
      renderGoals(list, showBack);
    };

    li.appendChild(del);
    goalListEl.appendChild(li);
  });
}

// Assign to agent
function assignGoalToAgent(goal, agentList, agentName) {
  agentList.push(goal);
  localStorage.setItem(agentName, JSON.stringify(agentList));
  alert(`Assigned "${goal}" to ${agentName}`);
}

// Event listeners
document.getElementById('addGoalBtn').addEventListener('click', () => {
  const val = document.getElementById('goalInput').value.trim();
  if(!val) return;

  goals.push(val);
  localStorage.setItem('goals', JSON.stringify(goals));
  document.getElementById('goalInput').value = '';
  renderGoals(goals);
});

document.getElementById('jessicaBtn').addEventListener('click', () => renderGoals(jessicaGoals, true));
document.getElementById('stacyBtn').addEventListener('click', () => renderGoals(stacyGoals, true));

// Initial render
renderGoals(goals);
