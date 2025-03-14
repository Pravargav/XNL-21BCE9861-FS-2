const FitnessTracker = require('../models/FitnessTracker'); // Adjust the path as needed

describe('Fitness Tracking', () => {
  let tracker;

  beforeEach(() => {
    tracker = new FitnessTracker();
  });

  test('should log a workout', () => {
    tracker.logWorkout({ type: 'running', duration: 30, caloriesBurned: 300 });
    expect(tracker.workouts.length).toBe(1);
    expect(tracker.workouts[0].type).toBe('running');
  });

  test('should calculate total calories burned', () => {
    tracker.logWorkout({ type: 'cycling', duration: 45, caloriesBurned: 400 });
    tracker.logWorkout({ type: 'swimming', duration: 60, caloriesBurned: 500 });
    expect(tracker.getTotalCaloriesBurned()).toBe(900);
  });
});
