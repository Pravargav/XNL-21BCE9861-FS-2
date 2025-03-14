const User = require('../models/User');
const FitnessTracker = require('../models/FitnessTracker');

describe('Integration Tests', () => {
  let user;
  let tracker;

  beforeEach(() => {
    user = new User({ name: 'Jane Doe', age: 25, weight: 60, height: 165 });
    tracker = new FitnessTracker();
  });

  test('should log workouts for a user', () => {
    tracker.logWorkout({ type: 'yoga', duration: 60, caloriesBurned: 200 });
    user.addWorkout(tracker.workouts[0]);
    expect(user.workouts.length).toBe(1);
    expect(user.workouts[0].type).toBe('yoga');
  });
});
