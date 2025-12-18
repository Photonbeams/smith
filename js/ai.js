let memory = JSON.parse(localStorage.getItem('aiMemory')) || [];

function tinyAI(input) {
  const text = input.trim().toLowerCase();
  const memoryMatch = memory.find(m => m.input === text);
  if (memoryMatch) return memoryMatch.output;

  const defaultResponses = {
    "hi": "Hello! How are you?",
    "hello": "Hello! How are you?"
  };

  if (defaultResponses[text]) return defaultResponses[text];

  const newResponse = prompt(
    `I don't know how to respond to "${input}". What should I say?`
  );

  if (newResponse) {
    memory.push({ input: text, output: newResponse });
    localStorage.setItem('aiMemory', JSON.stringify(memory));
    return newResponse;
  }

  return "I don't know what to say!";
}

const inputEl = document.getElementById('userInput');
const outputEl = document.getElementById('output');

document.getElementById('sendBtn').addEventListener('click', () => {
  const text = inputEl.value;
  if (!text.trim()) return;

  const response = tinyAI(text);
  outputEl.textContent = response;
  inputEl.value = "";
});
