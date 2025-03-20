// Load habits from LocalStorage
document.addEventListener("DOMContentLoaded", loadHabits);

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit() {
    let habitInput = document.getElementById("habitInput");
    let habitText = habitInput.value.trim();

    if (habitText === "") {
        alert("Please enter a habit!");
        return;
    }

    let newHabit = {
        id: Date.now(),
        name: habitText,
        streak: 0,
        lastUpdated: null
    };

    habits.push(newHabit);
    saveAndRender();
    habitInput.value = "";
}

function toggleCompletion(id) {
    let habit = habits.find(h => h.id === id);
    let today = new Date().toDateString();

    if (habit.lastUpdated === today) {
        alert("You've already marked this habit for today!");
        return;
    }

    habit.streak++;
    habit.lastUpdated = today;
    saveAndRender();
}

function removeHabit(id) {
    habits = habits.filter(h => h.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
    renderChart();
}

function renderHabits() {
    let habitList = document.getElementById("habitList");
    habitList.innerHTML = "";

    habits.forEach(habit => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${habit.name} (Streak: ${habit.streak})
            <button onclick="toggleCompletion(${habit.id})">✅</button>
            <button onclick="removeHabit(${habit.id})">❌</button>
        `;
        habitList.appendChild(li);
    });
}

function renderChart() {
    let ctx = document.getElementById("streakChart").getContext("2d");
    let chartData = {
        labels: habits.map(h => h.name),
        datasets: [{
            label: "Habit Streaks",
            data: habits.map(h => h.streak),
            backgroundColor: "blue"
        }]
    };

    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: "bar",
        data: chartData
    });
}

function loadHabits() {
    renderHabits();
    renderChart();
}
