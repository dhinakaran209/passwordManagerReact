import './index.css'

const PasswordsDisplay = props => {
  const {details, showPass, removeItem} = props
  const {website, id, username, password} = details

  const deleteItem = () => {
    removeItem(id)
  }
  const passwordEle = showPass ? (
    <p className="items">{password}</p>
  ) : (
    <img
      className="stars-img"
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )
  return (
    <li className="password-item">
      <p className="dp">{website[0].toUpperCase()}</p>
      <div className="pass">
        <p className="items website">{website}</p>
        <p className="items username">{username}</p>
        {passwordEle}
      </div>
      <button
        onClick={deleteItem}
        data-testid="delete"
        className="delete"
        type="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default PasswordsDisplay
