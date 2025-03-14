const User = require('../models/User'); // Adjust the path as needed

describe('User Management', () => {
  let user;

  beforeEach(() => {
    user = new User({ name: 'John Doe', age: 30, weight: 70, height: 175 });
  });

  test('should create a new user', () => {
    expect(user.name).toBe('John Doe');
    expect(user.age).toBe(30);
    expect(user.weight).toBe(70);
    expect(user.height).toBe(175);
  });

  test('should update user details', () => {
    user.update({ age: 31, weight: 71 });
    expect(user.age).toBe(31);
    expect(user.weight).toBe(71);
  });

  test('should delete a user', () => {
    user.delete();
    expect(user.isDeleted).toBe(true);
  });
});
