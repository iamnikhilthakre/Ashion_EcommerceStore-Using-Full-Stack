import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src="/images/errorpage.jpg" alt="404 Error" className="img-fluid mb-4 rounded shadow-sm" />
          <h2 className="fw-bold mb-3">Oops! Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn btn-danger px-5 py-2 rounded-pill">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
