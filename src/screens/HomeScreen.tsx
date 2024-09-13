import React, { useState } from 'react';
import './HomeScreen.css'; // Import the CSS file

const HomeScreen: React.FC = () => {
  const [gender, setGender] = useState<string>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('metric'); // 'metric' for kg/cm, 'imperial' for lbs/inches
  const [bmi, setBmi] = useState<number | null>(null);
  const [theme, setTheme] = useState<string>('light'); // 'light' or 'dark'

  const calculateBMI = () => {
    if (weight && height) {
      let bmiValue: number;
      if (unit === 'metric') {
        const heightInMeters = height / 100;
        bmiValue = weight / (heightInMeters * heightInMeters);
      } else {
        bmiValue = (weight * 703) / (height * height);
      }
      setBmi(bmiValue);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    calculateBMI();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}`}>
      <div className={`header ${theme}`}>
        <h1>Fitness App</h1>
        <button className={`theme-toggle ${theme}`} onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Night' : 'Light'} Mode
        </button>
      </div>
      <form onSubmit={handleSubmit} className={`form ${theme}`}>
        <div className="form-group">
          <label>
            Gender:
            <select className={theme} value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Weight ({unit === 'metric' ? 'kg' : 'lbs'}):
            <input
              className={theme}
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Height ({unit === 'metric' ? 'cm' : 'inches'}):
            <input
              className={theme}
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Unit:
            <select className={theme} value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, inches)</option>
            </select>
          </label>
        </div>
        <button type="submit" className={`submit-button ${theme}`}>Submit</button>
      </form>
      {bmi !== null && (
        <div className={`bmi-result ${theme}`}>
          <h2>Your BMI: {bmi.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;