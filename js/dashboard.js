
function initializeWeeklyChart() {
    const ctx = document.getElementById('weeklyProgressChart').getContext('2d');
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Calories Burned',
            data: [300, 450, 200, 600, 400, 350, 500],
            borderColor: '#4CAF50',
            tension: 0.1
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Load user's stats
function loadUserStats() {
    // In a real app, these would come from an API
    document.getElementById('caloriesBurned').textContent = '450';
    document.getElementById('workoutTime').textContent = '45 min';
    document.getElementById('steps').textContent = '8,500';
}

// Load recent workouts
function loadRecentWorkouts() {
    const workouts = [
        { name: 'Morning Run', duration: '30 min', calories: 300 },
        { name: 'Weight Training', duration: '45 min', calories: 250 },
        { name: 'Yoga Session', duration: '60 min', calories: 200 }
    ];

    const workoutList = document.getElementById('recentWorkouts');
    workoutList.innerHTML = workouts.map(workout => `
        <div class="workout-item">
            <h4>${workout.name}</h4>
            <p>Duration: ${workout.duration}</p>
            <p>Calories: ${workout.calories}</p>
        </div>
    `).join('');
}

function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('fitness_goals')) || [];
    const goalsList = document.getElementById('goalsList');
    goalsList.innerHTML = goals.map(goal => `
        <div class="goal-item">
            <h4>${goal.type}</h4>
            <p>Target: ${goal.target}</p>
            <p>Deadline: ${new Date(goal.deadline).toLocaleDateString()}</p>
        </div>
    `).join('');
}


const modal = document.getElementById('goalModal');
const addGoalBtn = document.getElementById('addGoalBtn');
const closeModal = document.getElementById('closeModal');
const goalForm = document.getElementById('goalForm');

addGoalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

goalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newGoal = {
        type: document.getElementById('goalType').value,
        target: document.getElementById('goalTarget').value,
        deadline: document.getElementById('goalDeadline').value
    };

    const goals = JSON.parse(localStorage.getItem('fitness_goals')) || [];
    goals.push(newGoal);
    localStorage.setItem('fitness_goals', JSON.stringify(goals));

    loadGoals();
    modal.classList.add('hidden');
    goalForm.reset();
});


document.addEventListener('DOMContentLoaded', () => {
    initializeWeeklyChart();
    loadUserStats();
    loadRecentWorkouts();
    loadGoals();
});