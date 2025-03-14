const HealthAnalytics = require('../models/HealthAnalytics'); // Adjust the path as needed

describe('Health Analytics', () => {
  let analytics;

  beforeEach(() => {
    analytics = new HealthAnalytics();
  });

  test('should calculate BMI', () => {
    const bmi = analytics.calculateBMI(70, 175); // weight in kg, height in cm
    expect(bmi).toBeCloseTo(22.86, 2); // BMI = weight (kg) / (height (m) * height (m))
  });

  test('should analyze sleep patterns', () => {
    analytics.logSleep({ date: '2023-10-01', duration: 7.5, quality: 'good' });
    analytics.logSleep({ date: '2023-10-02', duration: 6, quality: 'poor' });
    const analysis = analytics.analyzeSleep();
    expect(analysis.averageDuration).toBe(6.75);
    expect(analysis.qualitySummary.good).toBe(1);
    expect(analysis.qualitySummary.poor).toBe(1);
  });
});
