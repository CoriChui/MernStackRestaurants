import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const ConfirmToken = ({ match }) => {

  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const confirmEmail = async () => {
      await axios.put(`/api/v1/auth/confirmemail/${match.params.token}`)
        .then(() => {
          setLoading(false)
          setConfirmed(true)
        })
        .catch(() => {
          setLoading(false)
          setConfirmed(false)
        })
    }
    setLoading(true)
    setTimeout(() => {
      confirmEmail()
    }, 1000)
  }, [setConfirmed, setLoading, match.params.token])

  return (
    <div className="container text-center mt-5">
      {confirmed === true ? <h4 className="text-success">Email confirmed</h4> :
        loading ? <Spinner className="text-dark" animation="border" /> : <h4 className="text-danger">Email could not be confirmed</h4>}
    </div>
  )
}

export default ConfirmToken