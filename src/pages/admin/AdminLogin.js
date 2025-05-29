import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../redux/actions/authActions';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginAdmin({ email, password }));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="text-center mb-4">
              <h2 className="h3 fw-bold text-dark">Connexion Admin</h2>
            </div>

            <div className="card shadow-sm">
              <div className="card-body p-4 p-sm-5">
                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 1 .9.995l-.375 2.25a.454.454 0 0 1-.45.375H8a.454.454 0 0 1-.45-.375L7.125 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Adresse email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn btn-danger ${loading ? 'disabled' : ''}`}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Connexion...
                        </>
                      ) : (
                        'Se connecter'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;