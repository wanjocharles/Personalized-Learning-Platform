document.addEventListener('DOMContentLoaded', () => {
  const goalsForm = document.getElementById('goals-form');
  const goalsList = document.getElementById('goals-list');
  const activeGoalsCount = document.getElementById('active-goals-count');
  const completedGoalsCount = document.getElementById('completed-goals-count');
  const progressBar = document.getElementById('progress-bar');
  const dashboardProgress = document.getElementById('dashboard-progress'); // Dashboard progress element
  const progressBarContainer = document.getElementById('progress-bar-container');
  let totalGoals = 0;
  let completedGoals = 0;

  // Add a new goal
  goalsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const goalTitle = document.getElementById('goal-title').value;
    const goalDeadline = document.getElementById('goal-deadline').value;

    // Create a new goal item
    const goalItem = document.createElement('li');
    goalItem.classList.add('goal-item');
    
    const goalCheckbox = document.createElement('input');
    goalCheckbox.type = 'checkbox';
    goalCheckbox.classList.add('goal-checkbox');
    
    const goalText = document.createElement('span');
    goalText.textContent = `${goalTitle} - Deadline: ${goalDeadline}`;

    // Append checkbox and goal text to the list item
    goalItem.appendChild(goalCheckbox);
    goalItem.appendChild(goalText);

    // Append the goal item to the list
    goalsList.appendChild(goalItem);

    // Reset form fields
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-deadline').value = '';

    // Increment the total number of goals
    totalGoals++;
    activeGoalsCount.textContent = `${totalGoals} Goals`;

    updateProgress();
  });

  // Update progress bar and completed goals count when checkbox changes
  goalsList.addEventListener('change', (event) => {
    if (event.target && event.target.matches('.goal-checkbox')) {
      // Update completed goals count based on checkbox status
      if (event.target.checked) {
        completedGoals++;
      } else {
        completedGoals--;
      }

      // Update the completed goals count display
      completedGoalsCount.textContent = `${completedGoals} Goals`;

      // Update progress bar and dashboard progress
      updateProgress();
    }
  });

  // Function to update the progress bar and dashboard progress
  function updateProgress() {
    // Calculate the progress percentage based on the completed goals
    const progress = (completedGoals / totalGoals) * 100;
    const progressPercentage = Math.min(progress, 100); // Ensure it doesn't exceed 100%

    // Update the progress bar width and text
    progressBar.textContent = `${progressPercentage.toFixed(0)}%`;
    progressBar.style.width = `${progressPercentage}%`;

    // Update dashboard progress
    dashboardProgress.textContent = `${progressPercentage.toFixed(0)}% Completed`;
  }

  // Select/Deselect all buttons
  document.getElementById('select-all').addEventListener('click', () => {
    const allCheckboxes = document.querySelectorAll('.goal-checkbox');
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });

    // Update counts after selecting all
    completedGoals = totalGoals;
    completedGoalsCount.textContent = `${completedGoals} Goals`;
    updateProgress();
  });

  document.getElementById('deselect-all').addEventListener('click', () => {
    const allCheckboxes = document.querySelectorAll('.goal-checkbox');
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Update counts after deselecting all
    completedGoals = 0;
    completedGoalsCount.textContent = `${completedGoals} Goals`;
    updateProgress();
  });
});
