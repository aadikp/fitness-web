
function loadUserProfile() {
    const profile = JSON.parse(localStorage.getItem('user_profile')) || {};
    
    document.getElementById('fullName').value = profile.fullName || '';
    document.getElementById('age').value = profile.age || '';
    document.getElementById('weight').value = profile.weight || '';
    document.getElementById('height').value = profile.height || '';
    document.getElementById('fitnessLevel').value = profile.fitnessLevel || 'beginner';
}


function loadFitnessGoals() {
    const goals = JSON.parse(localStorage.getItem('user_goals')) || {};
    
    document.getElementById('primaryGoal').value = goals.primaryGoal || 'weight-loss';
    document.getElementById('weeklyWorkouts').value = goals.weeklyWorkouts || '3';
    document.getElementById('dailyCalories').value = goals.dailyCalories || '2000';
}


function loadPreferences() {
    const preferences = JSON.parse(localStorage.getItem('user_preferences')) || {};
    
    document.getElementById('theme').value = preferences.theme || 'light';
    document.getElementById('notifications').checked = preferences.notifications || false;
    
   
    document.body.className = preferences.theme || 'light';
}


document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const profile = {
        fullName: document.getElementById('fullName').value,
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        fitnessLevel: document.getElementById('fitnessLevel').value
    };
    
    localStorage.setItem('user_profile', JSON.stringify(profile));
    alert('Profile updated successfully!');
});


document.getElementById('goalsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const goals = {
        primaryGoal: document.getElementById('primaryGoal').value,
        weeklyWorkouts: document.getElementById('weeklyWorkouts').value,
        dailyCalories: document.getElementById('dailyCalories').value
    };
    
    localStorage.setItem('user_goals', JSON.stringify(goals));
    alert('Fitness goals updated successfully!');
});

document.getElementById('preferencesForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const preferences = {
        theme: document.getElementById('theme').value,
        notifications: document.getElementById('notifications').checked
    };
    
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
    

    document.body.className = preferences.theme;
    alert('Preferences saved successfully!');
});


function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; 
    
    if (weight && height) {
        const bmi = weight / (height * height);
        return bmi.toFixed(1);
    }
    return null;
}

['weight', 'height'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
        const bmi = calculateBMI();
        if (bmi) {
            const bmiCategory = getBMICategory(bmi);
            document.querySelector('.bmi-display').textContent = `BMI: ${bmi} (${bmiCategory})`;
        }
    });
});

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}


document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    loadFitnessGoals();
    loadPreferences();
});