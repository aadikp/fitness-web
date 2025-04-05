
const exerciseTemplate = `
    <div class="exercise-item">
        <div class="form-group">
            <label>Exercise Name</label>
            <input type="text" class="exercise-name" required>
        </div>
        <div class="form-group">
            <label>Sets</label>
            <input type="number" class="exercise-sets" min="1" required>
        </div>
        <div class="form-group">
            <label>Reps</label>
            <input type="number" class="exercise-reps" min="1" required>
        </div>
        <button type="button" class="btn secondary remove-exercise">Remove</button>
    </div>
`;

document.getElementById('addExercise').addEventListener('click', () => {
    const exerciseList = document.getElementById('exerciseList');
    const exerciseDiv = document.createElement('div');
    exerciseDiv.innerHTML = exerciseTemplate;
    exerciseList.appendChild(exerciseDiv);


    exerciseDiv.querySelector('.remove-exercise').addEventListener('click', () => {
        exerciseDiv.remove();
    });
});


document.getElementById('workoutPlanForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const plan = {
        name: document.getElementById('planName').value,
        type: document.getElementById('workoutType').value,
        exercises: Array.from(document.querySelectorAll('.exercise-item')).map(item => ({
            name: item.querySelector('.exercise-name').value,
            sets: item.querySelector('.exercise-sets').value,
            reps: item.querySelector('.exercise-reps').value
        }))
    };


    const plans = JSON.parse(localStorage.getItem('workout_plans')) || [];
    plans.push(plan);
    localStorage.setItem('workout_plans', JSON.stringify(plans));

    loadWorkoutPlans();
    e.target.reset();
    document.getElementById('exerciseList').innerHTML = '';
});


function loadWorkoutPlans() {
    const plans = JSON.parse(localStorage.getItem('workout_plans')) || [];
    const plansContainer = document.getElementById('savedPlans');
    
    plansContainer.innerHTML = plans.map(plan => `
        <div class="workout-plan">
            <h4>${plan.name}</h4>
            <p>Type: ${plan.type}</p>
            <div class="exercises">
                ${plan.exercises.map(exercise => `
                    <div class="exercise">
                        <p>${exercise.name}: ${exercise.sets} sets × ${exercise.reps} reps</p>
                    </div>
                `).join('')}
            </div>
            <button class="btn primary schedule-workout" data-plan="${plan.name}">Schedule</button>
        </div>
    `).join('');

    document.querySelectorAll('.schedule-workout').forEach(button => {
        button.addEventListener('click', () => scheduleWorkout(button.dataset.plan));
    });
}


function scheduleWorkout(planName) {
    const schedule = JSON.parse(localStorage.getItem('weekly_schedule')) || {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!schedule[today]) {
        schedule[today] = [];
    }
    schedule[today].push(planName);
    localStorage.setItem('weekly_schedule', JSON.stringify(schedule));
    
    loadWeeklySchedule();
}


function loadWeeklySchedule() {
    const schedule = JSON.parse(localStorage.getItem('weekly_schedule')) || {};
    const scheduleContainer = document.getElementById('weeklySchedule');
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    
    scheduleContainer.innerHTML = days.map(day => {
        const date = new Date(today);
        date.setDate(today.getDate() + days.indexOf(day) - today.getDay());
        const dateStr = date.toISOString().split('T')[0];
        
        return `
            <div class="schedule-day">
                <h4>${day}</h4>
                <div class="scheduled-workouts">
                    ${(schedule[dateStr] || []).map(workout => `
                        <div class="scheduled-workout">${workout}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Initialize planner
document.addEventListener('DOMContentLoaded', () => {
    loadWorkoutPlans();
    loadWeeklySchedule();
});