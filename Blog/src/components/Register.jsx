import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [alertMsg, setAlert] = useState({
    title: '',
    message: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blog-web-tau-taupe.vercel.app/api/authors/register', { name, email, password });
      navigate('/signin');
    } catch (error) {
      setError('Error during registration');
    }
  };
  return (
    <section className="bg-gray-100 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Link to="/" className="mx-auto inline-block max-w-[160px]">
                  <h1 className="text-4xl underline underline-offset-8 font-bold text-primaryColor">Requin</h1>
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  className="mb-4 w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="mb-4 w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className="mb-4 w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor"
                  required
                  minLength={6}
                />
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter Your Bio"
                  className="mb-4 w-full p-3 rounded-md border border-gray-300 focus:ring-primaryColor focus:border-primaryColor"
                  rows="4"
                  required
                />
                <div className="mb-10">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md bg-primaryColor px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                  >
                    Register
                  </button>
                </div>
              </form>
              {alertMsg.message && (
                <p className="text-red-500 mt-4">{alertMsg.message}</p>
              )}
              <p className="text-base text-secondary-color dark:text-dark-7">
                Already have an account?{' '}
                <Link to="/login" className="text-primaryColor hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
