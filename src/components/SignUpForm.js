import { useState } from 'react';
import { signUp } from '../utilities/users-service';

function SignUpForm({ setUser }) {
  // state for controlling inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
  });
  // this are both in state, password, and confirm; we want to make sure the values match; if they match, line c72 button no longer disabled
  const disable = formData.password !== formData.confirm;

  // Default behavior is to refresh; we're conditionally rendering components, not refreshing. If formData is not equal to formPassword...
  // e.preventDefault() prevents page from refreshing - control what happens when form is submitted
  // ! refreshing would cause loss of state - want to avoid in SPA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      // data to be send to the backend to create a new user
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      // returns a token with the user info; calling signUp function
      const user = await signUp(userData); // user Service
      setUser(user);
    } catch (error) {
      console.log(error);
      setFormData({ ...formData, error: 'Sign-up failed. Try again.' });
    }
  };
  // handleChange, to update state; in React we can have uncontrolled (no state) or controlled
  // keep previous data and use name of field that event is firing from to target matching data property
  // typed value is then applied to matching data property
  const handleChange = (evt) => {
    // We next need to spread; a new object w/ the data that's in state at the moment; w/o it you lose the data!!
    setFormData({
      // When you use spread, it's kind of like using an array
      ...formData,
      [evt.target.name]: evt.target.value,
      error: '',
    });
  };

  return (
    <div>
      <div className="form-container">
        {/* If autoComplete is 'on' the browser will look at user's previous data */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>

      <p className="error-message">{formData.error}</p>
    </div>
  );
}

export default SignUpForm;
