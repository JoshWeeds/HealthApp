let totalWaterIntake = 0;
let totalCaloriesIntake = 0;

let dailyWaterGoal = 2000; // Daily water goal
let dailyCalorieGoal = 2000; // Daily calorie goal

//Contains ALL data for each day. Previous day is calander[0], last day is calander[calander.length-1]
//For now, populated with sample data. 0 is no goal completed, 1 is 1 goal, 2 is both
//By Task 3, this will be a Goal[] array, Goal object to be implemented later
let calander = [2,1,1,2,0,2,1,1,2,2,2,2,1,0,1,0,1,2,2,1,1];

//Sample data that shows what a user could have eaten in the past week
let pastWeekCalories= [2700, 1900, 2200, 2500, 2400, 2500, 2760];
//Will become dynamic once we incorperate saved data
let pastWeek = calander.slice(0,7)

const quotes = [
    "You miss 100% of the shots you don’t take – Wayne Gretzky",
    "The only way to do great work is to love what you do – Steve Jobs",
    "Life is what happens when you’re busy making other plans – John Lennon",
    "Do not wait for the perfect moment, take the moment and make it perfect.",
    "Success usually comes to those who are too busy to be looking for it."
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function showTab(tabName, element) {
    const tabContent = document.getElementById('tab-content');

    const buttons = document.querySelectorAll('.navbar button');
    buttons.forEach(button => {
        button.classList.remove('active'); 
    });

    element.classList.add('active');

    // Reset tab content style for all tabs
    tabContent.className = 'content'; // Remove any previous specific tab classes

    switch(tabName) {
        case 'home':
            const randomQuote = getRandomQuote();
            tabContent.innerHTML = `
                <div class="progress-container">
                    <h2 id="summary">Summary</h2>
                    <p>Water <progress class="prog-meters" value="95" max="100"> </progress></p>
                    <p>Exercise <progress class="prog-meters" value="35" max="100"> </progress></p> 
                    <p>Calories <progress class="prog-meters" value="75" max="100"> </progress></p>
                </div>
                <div class="community-container">
                    <h2>Community</h2>
                    <div class="community-progress">
                        <div class="friend">
                            <span class="friend-icon">👤</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: 60%;"></div>
                            </div>
                            <button class="ping-button">Ping</button>
                        </div>
                        <div class="friend">
                            <span class="friend-icon">👤</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: 40%;"></div>
                            </div>
                            <button class="ping-button">Ping</button>
                        </div>
                        <div class="friend">
                            <span class="friend-icon">👤</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: 100%;"></div>
                            </div>
                            <span class="status">✔</span>
                        </div>
                    </div>
                    <button class="add-friend-button" onclick="addFriend()">➕ Add a Friend</button>
                </div>
                
                <div class="quote-container">
                    <h2>Quote of the Day</h2>
                    <p class="quote-text">"${randomQuote}"</p>
                </div>
            `;
            break;        
       case 'Profile': // Profile tab with profile picture and form
            tabContent.innerHTML = `
                <div class="profile-section">
                    <div class="profile-picture">
                        <img id="profileImg" src="default-profile.png" alt="Profile Picture" width="150" height="150">
                        <input type="file" id="uploadPicture" accept="image/*" onchange="loadProfilePicture(event)">
                    </div>
                    <div class="user-info">
                        <label for="name">Name:</label>
                        <input type="text" id="name" placeholder="Enter your name">

                        <label for="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email">

                        <label for="heightFeet">Height:</label>
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <input type="number" id="heightFeet" placeholder="Ft" style="width: 50px;">
                            <input type="number" id="heightInches" placeholder="In" style="width: 50px;">
                        </div>

                        <label for="weight">Weight:</label>
                        <input type="number" id="weight" placeholder="Enter your weight">

                        <label for="age">Age:</label>
                        <input type="number" id="age" placeholder="Enter your age">

                        <label for="gender">Gender:</label>
                        <select id="gender">
                            <option value="">Select gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Other">Other</option>
                        </select>

                        <!-- Save Button -->
                        <button class="save-btn" onclick="saveProfile()">Save</button>

                         <!-- BMI Display -->
                        <p id="bmiResult" class="bmi-result"></p>
                    </div>
                </div>
            `;
            break;
            case 'Mind':
                tabContent.innerHTML = `
                    <div class="mindfulness-container">
                        <header class="app-header">
                            <h2>Mindfulness & Sleep Tracker</h2>
                        </header>
            
                        <!-- Sleep Section -->
                        <div class="sleep-section">
                            <h3>Sleep Evaluation</h3>
                            <label for="sleepHours">Hours Slept:</label>
                            <input type="number" id="sleepHours" min="0" max="24" placeholder="Enter hours slept">
            
                            <label for="sleepQuality">Quality of Sleep (1-5):</label>
                            <select id="sleepQuality">
                                <option value="1">1 - Very Poor</option>
                                <option value="2">2 - Poor</option>
                                <option value="3">3 - Average</option>
                                <option value="4">4 - Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
            
                            <button class="evaluate-btn" onclick="evaluateSleep()">Evaluate Sleep</button>
                            <p id="sleepFeedback"></p>
                        </div>
            
                        <!-- Meditation and Yoga Section -->
                        <div class="meditation-yoga-section">
                            <h3>Meditation & Yoga Workouts</h3>
                            <label for="workoutType">Choose a Workout:</label>
                            <select id="workoutType" onchange="showSubExercises()">
                                <option value="">Select a type</option>
                                <option value="meditation">Meditation</option>
                                <option value="yoga">Yoga</option>
                            </select>
            
                            <!-- Container for sub-exercises -->
                            <div id="subExerciseContainer" style="display: none;">
                                <label for="subExercises">Choose an Exercise:</label>
                                <select id="subExercises">
                                    <!-- Options will be populated dynamically -->
                                </select>
                            </div>
            
                            <button class="start-workout-btn" onclick="startWorkout()">Start Workout</button>
                        </div>
            
                        <!-- Journaling Section -->
                        <div class="journaling-section">
                            <h3>Daily Journal</h3>
                            <textarea id="journalEntry" rows="5" placeholder="Write about your day..."></textarea>
                            <button class="save-journal-btn" onclick="saveJournalEntry()">Save Entry</button>
                            <div id="journalEntries"></div>
                        </div>
                    </div>
                `;
                break;
            
        case 'Fitness':
            tabContent.innerHTML = `
        <div class="fitness-container">
            <header class="app-header">
                <h2>Fitness Tracker</h2>
            </header>
            
            <div class="preset-workouts">
                <h3>Preset Workouts</h3>
                <ul id="presetWorkouts">
                    <li data-category="leg" onclick="selectWorkout(event)">Squats</li>
                    <li data-category="abs" onclick="selectWorkout(event)">Curls</li>
                    <li data-category="arm" onclick="selectWorkout(event)">Pushups</li>
                    <li data-category="arm" onclick="selectWorkout(event)">Pullups</li>
                </ul>
                <button class="add-workout-btn" onclick="addCustomWorkout()">Add Custom Workout</button>
            </div>

            <div class="custom-workouts">
                <h3>My Workouts</h3>
                <ul id="customWorkouts"></ul>
            </div>
        </div>
            `;
            break;

            case 'Nutrition':
                tabContent.innerHTML = `
                    <div class="nutrition-container">
                        <header class="app-header">
                            <h2>Nutrition Tracker</h2>
                        </header>
            
                        <div class="input-section">
                            <label for="goal">Goal</label>
                            <select id="goal">
                                    <option value="" disabled selected>Select your goal</option>
                                    <option value="maintain">Maintain Weight</option>
                                    <option value="muscle">Build Muscle</option>
                                    <option value="weight-loss">Lose Weight (Preserve Muscle)</option>
                                    <option value="fat-loss">General Fat Loss</option>
                                    <option value="keto">Keto (Low Carb)</option>
                                    <option value="athlete">High Performance</option>
                            </select>

                            <label for="calories">Calories</label>
                            <input type="number" id="calories" placeholder="Enter calories here">
            
                            <label for="water">Water (ml)</label>
                            <input type="number" id="water" placeholder="Enter water intake">
            
                            <div class="button-group">
                                <button class="add-btn" onclick="addCalories()">Add Calories</button>
                                <button class="add-btn" onclick="addWater()">Add Water</button>
                                <button class="generate-btn" onclick="generateBreakdown()">Generate Breakdown</button>
                                <button class="reset-btn" onclick="resetTracker()">Reset</button>
                            </div>
                        </div>
            
                        <div class="hydration-tracker">
                            <p>Hydration</p>
                            <div class="progress-bar">
                                <div id="waterProgress"></div>
                            </div>
                        </div>

                        <div class="calories-tracker">
                            <p>Calories</p>
                            <div class="progress-bar">
                                <div id="calorieProgress"></div>
                            </div>
                        </div>
            
                        <div class="chart-section">
                            <canvas id="pieChart" width="200" height="200"></canvas>
            
                            <!-- Legend section initially hidden -->
                            <div id="legend" style="display: none;">
                                <p id="carbsDisplay">Carbs: calories</p>
                                <p id="fatsDisplay">Fats: calories</p>
                                <p id="proteinsDisplay">Proteins: calories</p>
                            </div>
                        </div>
                    </div>
                `;
                break;
        case 'MyJourney':

            tabContent.innerHTML = `
                <div class="goal-display" id="dailySummary">
                    <h2>Daily Goals</h2>
                    <hr>
                    <div class="goal">
                        Water: <progress class="prog-meters" value="${totalWaterIntake}" max="${dailyWaterGoal}"></progress> <button class="edit-goal" onclick="changeWaterGoal()"> <b>${dailyWaterGoal}ml</b> </button>
                    </div>
                    <div class="goal">
                        Calories: <progress class="prog-meters" value="${totalCaloriesIntake}" max="${dailyCalorieGoal}"></progress> <button class="edit-goal" onclick="changeCalorieGoal()"> <b>${dailyCalorieGoal}kcal</b> </button> 
                    </div>
                </div>
                </br>
                <div class="goal-display" id="weeklySummary">
                    <h2>Weekly Goals</h2>
                    <hr>
                    <div class="weekly-progress" id="weekly-goals">
                        <div class="day-box" id="day0"></div>
                        <div class="day-box" id="day1"></div>
                        <div class="day-box" id="day2"></div>
                        <div class="day-box" id="day3"></div>
                        <div class="day-box" id="day4"></div>
                        <div class="day-box" id="day5"></div>
                        <div class="day-box" id="day6"></div>
                    </div>
                    
                        <label>
                            <input type="checkbox" id="toggle-weekly-goals"> Display data from previous 7 days?
                         </label>



                </div>
                </br>
                <div class="goal-row">
                    <div class="goal-display" id="MyJourneyBL">
                        <canvas id="weeklyCalChart"></canvas>
                    </div>
                    <div class="goal-display" id="MyJourneyBR">
                        <button class="goal-button" onclick="showTab('Profile', document.querySelector('.navbar button:nth-child(1)'))">
                            View Profile
                        </button>
                    </div>
                </div>
            
            `;

                //Toggles weekly display
                document.getElementById('toggle-weekly-goals').addEventListener('change', function() {
                    var weeklyGoals = document.getElementById('weekly-goals');
                    if (this.checked) {
                        weeklyGoals.style.display = 'flex';
                        updateWeeklyProgress();
                    } else {
                        weeklyGoals.style.display = 'none';
                    }
                });
                createWeeklyCalGraph();
                break;
            default:
                tabContent.innerHTML = '<p>Select a tab to view its content</p>';
        }
    }
    //chang

function createWeeklyCalGraph(){
    const canvas = document.getElementById('weeklyCalChart');
    const ctx = canvas.getContext('2d');
    


    const yAxisMin = 1000;
    const yAxisMax = 4000;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the axes
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, 140);
    ctx.lineTo(290, 140);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    
    // Draw the x-axis labels (days)
    const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    days.forEach((day, index) => {
        ctx.fillText(day, 40 + index * 35, 150);
    });
    
    // Draw the y-axis labels (calories)
    for (let i = yAxisMin; i <= yAxisMax; i += 1000) {
        ctx.fillText(i, 5, 140 - (120 * (i - yAxisMin) / (yAxisMax - yAxisMin)));
    }
    
    // Draw the calorie data line
    ctx.beginPath();
    ctx.moveTo(40, 140 - (120 * (pastWeekCalories[0] - yAxisMin) / (yAxisMax - yAxisMin)));
    pastWeekCalories.forEach((calories, index) => {
        ctx.lineTo(40 + index * 35, 140 - (120 * (calories - yAxisMin) / (yAxisMax - yAxisMin)));
    });
    ctx.strokeStyle = "#00f";
    ctx.stroke();
    
    // Draw the goal line
    ctx.beginPath();
    ctx.moveTo(30, 140 - (120 * (dailyCalorieGoal - yAxisMin) / (yAxisMax - yAxisMin)));
    ctx.lineTo(290, 140 - (120 * (dailyCalorieGoal - yAxisMin) / (yAxisMax - yAxisMin)));
    ctx.strokeStyle = "#f00";
    ctx.setLineDash([5, 5]); // Dotted line
    ctx.stroke();
}

    // Function to add a task in the ToDo tab
    function addTask() {
        const input = document.getElementById('todo-input');
        const taskText = input.value.trim();
    
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
    
        const list = document.getElementById('todo-list');
        const listItem = document.createElement('li');
    
        // Create the task text
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.onclick = function() {
            taskSpan.classList.toggle('crossed');
        };
    
        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function() {
            list.removeChild(listItem);
        };
    
        // Add the task and delete button to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    
        // Clear the input field
        input.value = "";
    }

    //Gets last 7 days from calander, then changes color based on results.
    function updateWeeklyProgress() {
        pastWeek.forEach((value, index) => {
            const box = document.getElementById(`day${index}`);
            if (value === 2) {
                box.classList.add('complete');
            } else if (value === 1) {
                box.classList.add('half-complete');
            }
        });
        
    }


    function changeWaterGoal(){
        const waterInput = prompt("Enter your daily water intake goal:")
        if (isNaN(waterInput) || waterInput <= 0) {
            alert("Invalid Input. Reset to 2000ml (default)");
            return;
        }
        dailyWaterGoal = waterInput;
        showTab('MyJourney', document.querySelector(".navbar button:nth-child(1)"))
    }


    function changeCalorieGoal(){
        const calorieInput = prompt("Enter your daily calorie intake goal:")
        if (isNaN(calorieInput) || calorieInput <= 0) {
            alert("Invalid input. Reset to 2500kcal (default)");
            return;
        }
        dailyCalorieGoal = calorieInput;
        showTab('MyJourney', document.querySelector(".navbar button:nth-child(1)"))
    }

    // Function to add a new friend
    function addFriend() {
        const friendName = prompt("Enter your friend's name:");

        if (!friendName || friendName.trim() === "") {
            alert("Please enter a valid name.");
            return;
        }

        const communityContainer = document.querySelector('.community-container .community-progress');
        const friendDiv = document.createElement('div');
        friendDiv.classList.add('friend');

        // Friend icon
        const friendIcon = document.createElement('span');
        friendIcon.classList.add('friend-icon');
        friendIcon.textContent = "👤";

        // Progress bar
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const progress = document.createElement('div');
        progress.classList.add('progress');
        progress.style.width = "0%"; // Start progress at 0%

        progressBar.appendChild(progress);

        // Ping button
        const pingButton = document.createElement('button');
        pingButton.classList.add('ping-button');
        pingButton.textContent = "Ping";

        // Assemble friend div
        friendDiv.appendChild(friendIcon);
        friendDiv.appendChild(progressBar);
        friendDiv.appendChild(pingButton);

        // Add the new friend to the community section
        communityContainer.appendChild(friendDiv);
    }

    // Functions for fitness
    // Function to handle workout selection and add it to "My Workouts"
    function selectWorkout(event) {
        const workoutName = event.target.textContent;
        const customWorkoutsList = document.getElementById('customWorkouts');
        
        // Check if the workout is already added
        const existingWorkout = Array.from(customWorkoutsList.children).find(
            workout => workout.textContent.includes(workoutName)
        );
        
        if (existingWorkout) {
            alert(`${workoutName} is already in your workout list.`);
            return;
        }

        // Create a new list item for the workout
        const workoutItem = document.createElement('li');
        workoutItem.innerHTML = `
            ${workoutName} - Reps: <input type="number" value="1" min="1" class="reps-input"> 
            ${workoutName} - Sets: <input type="number" value="1" min="1" class="sets-input"> 
        `;

        // Create delete button for each workout
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => {
            customWorkoutsList.removeChild(workoutItem);
        };

        // Append delete button to the workout item and add to the list
        workoutItem.appendChild(deleteButton);
        customWorkoutsList.appendChild(workoutItem);
    }

    // Function to add a custom workout to "My Workouts"
    function addCustomWorkout() {
        const customWorkoutName = prompt("Enter the name of your custom workout:");

        if (customWorkoutName && customWorkoutName.trim() !== "") {
            const customWorkoutsList = document.getElementById('customWorkouts');

            // Create a new list item for the custom workout
            const workoutItem = document.createElement('li');
            workoutItem.innerHTML = `
                ${customWorkoutName} - Reps: <input type="number" value="1" min="1" class="reps-input"> 
                ${customWorkoutName} - Sets: <input type="number" value="1" min="1" class="sets-input"> 
            `;

            // Add delete button for custom workout
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => {
                customWorkoutsList.removeChild(workoutItem);
            };

            // Append delete button to the custom workout item and add to the list
            workoutItem.appendChild(deleteButton);
            customWorkoutsList.appendChild(workoutItem);
        } else {
            alert("Please enter a valid workout name.");
        }
    }
    
    // Automatically load the home tab when the page is loaded
    window.onload = function() {
        const homeButton = document.querySelector(".navbar button:nth-child(1)");
        showTab('home', homeButton);
    };

   function generateBreakdown() {
        const calories = parseFloat(document.getElementById('calories').value);
        const water = parseFloat(document.getElementById('water').value);
        const goal = document.getElementById('goal').value;
    
        if (isNaN(calories) || calories <= 0) {
            alert("Please enter a valid calorie amount.");
            return;
        }

        document.getElementById('pieChart').style.display = 'block';
    
        let carbsPercentage, fatsPercentage, proteinsPercentage;
        switch (goal) {
            case "maintain":
                carbsPercentage = 0.50;
                fatsPercentage = 0.30;
                proteinsPercentage = 0.20;
                break;
            case "muscle":
                carbsPercentage = 0.40;
                fatsPercentage = 0.20;
                proteinsPercentage = 0.40;
                break;
            case "weight-loss":
                carbsPercentage = 0.30;
                fatsPercentage = 0.30;
                proteinsPercentage = 0.40;
                break;
            case "fat-loss":
                carbsPercentage = 0.35;
                fatsPercentage = 0.35;
                proteinsPercentage = 0.30;
                break;
            case "keto":
                carbsPercentage = 0.05;
                fatsPercentage = 0.75;
                proteinsPercentage = 0.20;
                break;
            case "athlete":
                carbsPercentage = 0.60;
                fatsPercentage = 0.20;
                proteinsPercentage = 0.20;
                break;
            default:
                carbsPercentage = 0.50;
                fatsPercentage = 0.30;
                proteinsPercentage = 0.20;
        }
    
        const carbsCalories = calories * carbsPercentage;
        const fatsCalories = calories * fatsPercentage;
        const proteinsCalories = calories * proteinsPercentage;
    
        document.getElementById('carbsDisplay').textContent = `Carbs: ${carbsCalories.toFixed(2)} calories`;
        document.getElementById('fatsDisplay').textContent = `Fats: ${fatsCalories.toFixed(2)} calories`;
        document.getElementById('proteinsDisplay').textContent = `Proteins: ${proteinsCalories.toFixed(2)} calories`;
    
        // Show the legend
        document.getElementById('legend').style.display = 'block';
    
        const ctx = document.getElementById('pieChart').getContext('2d');
        ctx.clearRect(0, 0, 200, 200);
    
        const data = [carbsCalories, fatsCalories, proteinsCalories];
        const colors = ["#49d7d7", "#2b9b9b", "#a0f0ed"]; // New color scheme
        let startAngle = 0;
    
        data.forEach((value, index) => {
            const sliceAngle = (value / calories) * 2 * Math.PI;
            ctx.fillStyle = colors[index];
            ctx.beginPath();
            ctx.moveTo(100, 100);
            ctx.arc(100, 100, 100, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            startAngle += sliceAngle;
        });
    
    }
    function setDailyCalorieGoal(goal) {
        switch (goal) {
            case 'maintain':
                dailyWaterGoal = 2000
                dailyCalorieGoal = 2500;
                break;
            case 'muscle':
                dailyWaterGoal = 2000
                dailyCalorieGoal = 3000;
                break;
            case 'weight-loss':
                dailyWaterGoal = 2100
                dailyCalorieGoal = 2000;
                break;
            case 'fat-loss':
                dailyWaterGoal = 2500
                dailyCalorieGoal = 1800;
                break;
            case 'keto':
                dailyWaterGoal = 1800
                dailyCalorieGoal = 2200;
                break;
            case 'athlete':
                dailyWaterGoal = 2200
                dailyCalorieGoal = 3500;
                break;
            default:
                dailyWaterGoal = 2000
                dailyCalorieGoal = 2500; // Default goal if none is selected
        }
        // Update the calorie progress based on the new daily goal
        updateHydrationProgress(totalWaterIntake)
        updateCalorieProgress(totalCaloriesIntake);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const goalSelect = document.getElementById('goal');
        if (goalSelect) {
            goalSelect.addEventListener('change', (event) => {
                setDailyCalorieGoal(event.target.value);
            });
        }
    
        // Initialize progress bars with saved values
        updateHydrationProgress(totalWaterIntake);
        updateCalorieProgress(totalCaloriesIntake);
    });

    
    function addWater() {
        const waterInput = parseFloat(document.getElementById('water').value);
        if (isNaN(waterInput) || waterInput <= 0) {
            alert("Please enter a valid water intake.");
            return;
        }
    
        // Add new intake to cumulative total
        totalWaterIntake += waterInput;
        
        // Update local storage
        localStorage.setItem('totalWaterIntake', totalWaterIntake);
    
        // Update the progress bar
        updateHydrationProgress(totalWaterIntake);
    
        // Clear the water input field after adding
        document.getElementById('water').value = '';
    }
    
    function updateHydrationProgress(waterIntake) {
        const waterPercentage = Math.min((waterIntake / dailyWaterGoal) * 100, 100);
        const waterProgress = document.getElementById('waterProgress');
        waterProgress.style.width = waterPercentage + '%';
        
    }
    
    // Function to add calorie intake cumulatively
    function addCalories() {
        const calorieInput = parseFloat(document.getElementById('calories').value);
        if (isNaN(calorieInput) || calorieInput <= 0) {
            alert("Please enter a valid calorie amount.");
            return;
        }
    
        // Add new intake to cumulative total
        totalCaloriesIntake += calorieInput;
        updateCalorieProgress(totalCaloriesIntake);
        console.log("Total Calories Intake:", totalCaloriesIntake);
    
        // Clear the calories input field after adding
        document.getElementById('calories').value = '';
    }
    
    // Function to update calorie progress
    function updateCalorieProgress(caloriesIntake) {
        const caloriePercentage = Math.min((caloriesIntake / dailyCalorieGoal) * 100, 100);
        const calorieProgress = document.getElementById('calorieProgress');
        calorieProgress.style.width = caloriePercentage + '%';
    }
    
    
    
function resetTracker() {
    // Clear input fields
    document.getElementById('calories').value = '';
    document.getElementById('water').value = '';
    document.getElementById('goal').value = '';

    // Hide the canvas and clear the chart
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = 'none';

    // Hide the legend
    document.getElementById('legend').style.display = 'none';

    // Reset the hydration progress bar
    document.getElementById('waterProgress').style.width = '0%';

    document.getElementById('calorieProgress').style.width = '0%';
    // Clear legend text
    document.getElementById('carbsDisplay').textContent = 'Carbs: calories';
    document.getElementById('fatsDisplay').textContent = 'Fats: calories';
    document.getElementById('proteinsDisplay').textContent = 'Proteins: calories';
}

function evaluateSleep() {
    const hours = parseFloat(document.getElementById('sleepHours').value);
    const quality = parseInt(document.getElementById('sleepQuality').value);

    let feedback = "";

    if (isNaN(hours) || hours <= 0) {
        feedback = "Please enter valid hours slept.";
    } else {
        if (quality >= 4 && hours < 7) {
            feedback = "You have good sleep quality, but you should aim to sleep more for optimal health.";
        } else if (quality >= 4 && hours >= 7) {
            feedback = "Great job! You have both good sleep quality and sufficient sleep duration.";
        } else if (quality <= 2 && hours < 7) {
            feedback = "Your sleep quality and duration are both poor. Consider making changes to your routine for better rest.";
        } else if (quality <= 2 && hours >= 7) {
            feedback = "You have sufficient sleep duration, but the quality is poor. Try relaxation techniques or reduce screen time before bed.";
        } else if (quality == 3 && hours < 7) {
            feedback = "Your sleep quality is average and your hours are low. Aim to increase your sleep time and create a consistent bedtime routine.";
        } else if (quality == 3 && hours >= 7) {
            feedback = "Your sleep is of average quality, but you are getting enough hours. Consider small adjustments to improve sleep quality.";
        } else if (quality >= 4 && hours >= 9) {
            feedback = "You have excellent sleep quality and duration. Make sure you're not oversleeping, as it can lead to grogginess.";
        } else if (quality <= 2 && hours > 9) {
            feedback = "You're sleeping a lot, but the quality is poor. This could be a sign of underlying issues like sleep disorders. Consider consulting a doctor.";
        } else {
            feedback = "Great job! Keep up the good sleep habits.";
        }
    }

    document.getElementById('sleepFeedback').textContent = feedback;
}


// Exercise descriptions with detailed steps
const exerciseDescriptions = {
    "guided-meditation": {
        title: "Guided Meditation",
        steps: [
            "1. Find a quiet, comfortable place to sit or lie down.",
            "2. Close your eyes and take a few deep breaths.",
            "3. Follow the guide’s voice and visualization prompts.",
            "4. Stay focused on your breathing and gently bring your mind back if it wanders.",
            "5. Continue for 10-15 minutes or until the guided session ends."
        ]
    },
    "breathing-exercises": {
        title: "Breathing Exercises",
        steps: [
            "1. Sit in a comfortable chair or lie down on a mat.",
            "2. Close your eyes and relax your body.",
            "3. Inhale deeply through your nose for a count of 4.",
            "4. Hold your breath for a count of 4.",
            "5. Exhale slowly through your mouth for a count of 4.",
            "6. Repeat this cycle for 5-10 minutes."
        ]
    },
    "body-scan": {
        title: "Body Scan",
        steps: [
            "1. Lie down on your back or sit in a comfortable position.",
            "2. Close your eyes and take a few deep breaths.",
            "3. Bring your attention to your feet and notice any sensations.",
            "4. Slowly move your focus up your body: calves, thighs, abdomen, chest, arms, neck, and head.",
            "5. Spend 10-15 seconds on each area and notice any tension or relaxation.",
            "6. Continue until you reach the top of your head, then take a deep breath and open your eyes."
        ]
    },
    "loving-kindness": {
        title: "Loving Kindness",
        steps: [
            "1. Sit in a comfortable position and close your eyes.",
            "2. Take a few deep breaths and bring your awareness to your heart.",
            "3. Silently repeat phrases like: 'May I be happy. May I be healthy. May I be safe.'",
            "4. Extend these phrases to loved ones, friends, and even people you may have conflict with.",
            "5. Spend a few minutes on each group and feel the warmth of kindness.",
            "6. End the session by focusing on sending love to the entire world."
        ]
    },
    "sun-salutation": {
        title: "Sun Salutation",
        steps: [
            "1. Stand at the front of your mat with feet together and hands in prayer position.",
            "2. Inhale and raise your arms overhead, arching slightly back.",
            "3. Exhale and fold forward, touching your toes or the mat.",
            "4. Inhale and lift your torso halfway with a flat back.",
            "5. Exhale and step back into a plank position.",
            "6. Lower into a chaturanga or push-up position.",
            "7. Inhale and move into upward-facing dog or cobra pose.",
            "8. Exhale and lift into downward-facing dog.",
            "9. Hold for a few breaths, then step forward and repeat from the beginning."
        ]
    },
    "tree-pose": {
        title: "Tree Pose",
        steps: [
            "1. Stand tall with your feet together and hands by your sides.",
            "2. Shift your weight to your left foot and lift your right foot off the ground.",
            "3. Place the sole of your right foot against your inner left thigh or calf (avoid the knee).",
            "4. Bring your palms together in a prayer position at your chest or raise your arms overhead.",
            "5. Hold the pose for 30 seconds to 1 minute while maintaining balance.",
            "6. Repeat on the other side."
        ]
    },
    "childs-pose": {
        title: "Child's Pose",
        steps: [
            "1. Kneel on the mat with your big toes touching and knees spread apart.",
            "2. Sit back on your heels and stretch your arms forward.",
            "3. Lower your torso down between your thighs and rest your forehead on the mat.",
            "4. Relax your shoulders and let your arms stay extended or by your sides.",
            "5. Hold for 1-2 minutes while breathing deeply."
        ]
    },
    "warrior-ii": {
        title: "Warrior II",
        steps: [
            "1. Stand in a wide stance with feet about 3-4 feet apart.",
            "2. Turn your right foot out 90 degrees and your left foot slightly in.",
            "3. Extend your arms parallel to the floor, palms down.",
            "4. Bend your right knee so that it is directly over your ankle.",
            "5. Gaze over your right hand and hold the pose for 30-60 seconds.",
            "6. Straighten your right leg, turn to the left side, and repeat."
        ]
    }
};

// Function to start the workout and show the description with steps
function startWorkout() {
    const subExercise = document.getElementById('subExercises').value;

    if (subExercise && exerciseDescriptions[subExercise]) {
        const exercise = exerciseDescriptions[subExercise];
        let message = `${exercise.title}:\n\n${exercise.steps.join('\n')}`;
        alert(message);
    } else {
        alert("Please select a valid exercise to get started.");
    }
}


function showSubExercises() {
    const workoutType = document.getElementById('workoutType').value;
    const subExerciseContainer = document.getElementById('subExerciseContainer');
    const subExercisesSelect = document.getElementById('subExercises');
    subExercisesSelect.innerHTML = ''; // Clear existing options

    if (workoutType === 'meditation') {
        // Populate with meditation exercises
        const meditationExercises = ['Guided Meditation', 'Breathing Exercises', 'Body Scan', 'Loving Kindness'];
        meditationExercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.toLowerCase().replace(/ /g, '-');
            option.textContent = exercise;
            subExercisesSelect.appendChild(option);
        });
        subExerciseContainer.style.display = 'block';
    } else if (workoutType === 'yoga') {
        // Populate with yoga exercises
        const yogaExercises = ['Sun Salutation', 'Tree Pose', 'Child\'s Pose', 'Warrior II'];
        yogaExercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.toLowerCase().replace(/ /g, '-');
            option.textContent = exercise;
            subExercisesSelect.appendChild(option);
        });
        subExerciseContainer.style.display = 'block';
    } else {
        // Hide sub-exercises if no valid type is selected
        subExerciseContainer.style.display = 'none';
    }
}

function saveJournalEntry() {
    const journalEntry = document.getElementById('journalEntry').value.trim();
    if (journalEntry === "") {
        alert("Please write something in the journal.");
        return;
    }

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString('en-US', {
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const journalEntries = document.getElementById('journalEntries');
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('journal-entry');
    entryDiv.innerHTML = `<strong>${formattedDateTime}</strong><br>${journalEntry}`;

    journalEntries.appendChild(entryDiv);

    document.getElementById('journalEntry').value = "";
}

function loadProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImg').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
function saveProfile() {
    // Get user inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const heightFeet = parseInt(document.getElementById('heightFeet').value);
    const heightInches = parseInt(document.getElementById('heightInches').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    // Check if all fields are filled out
    if (!name || !email || isNaN(heightFeet) || isNaN(heightInches) || isNaN(weight) || !age || !gender) {
        alert("Please fill out all fields.");
        return;
    }

    // Convert height to centimeters
    const heightInCm = convertHeightToCm(heightFeet, heightInches);

    // Calculate BMI
    const bmi = calculateBMI(heightInCm, weight);

    // Display BMI result
    const bmiResult = document.getElementById('bmiResult');
    bmiResult.textContent = `Your BMI is ${bmi.toFixed(2)}.`;

    // Save the profile data as needed
    console.log("Profile saved:", { name, email, heightFeet, heightInches, heightInCm, weight, age, gender, bmi });
}

function convertHeightToCm(feet, inches) {
    // Convert feet and inches to centimeters
    const totalInches = (feet * 12) + inches;
    return totalInches * 2.54;
}

function calculateBMI(heightCm, weight) {
    // Convert height from cm to meters
    const heightInMeters = heightCm / 100;
    return weight / (heightInMeters * heightInMeters);
}


