import {Component} from 'react'
import './index.css'
import {v4 as uuidV4} from 'uuid'
import PasswordsDisplay from '../PasswordsDisplay'

class PasswordManager extends Component {
  state = {
    isPasswordShowing: false,
    website: '',
    username: '',
    password: '',
    passwordsList: [],
  }

  websiteInput = event => this.setState({website: event.target.value})

  usernameInput = event => this.setState({username: event.target.value})

  passwordInput = event => this.setState({password: event.target.value})

  addPassword = event => {
    event.preventDefault()
    const {website, password, username} = this.state
    const newElement = {id: uuidV4(), website, username, password}

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newElement],
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
  }

  removeItem = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  searchPasswords = event => {
    const searchValue = event.target.value
    const {searchInput, passwordsList} = this.state
    if (searchValue.trim() === '') {
      this.setState({searchInput: '', passwordsList})
    } else {
      const filteredList = passwordsList.filter(eachPass =>
        eachPass.website.toLowerCase().includes(searchValue),
      )
      this.setState({searchInput: searchValue, passwordsList: filteredList})
    }
  }

  showPass = event => {
    const isChecked = event.target.checked

    this.setState({isPasswordShowing: isChecked})
  }

  passwordContainer = () => {
    const {isPasswordShowing, passwordsList, searchInput} = this.state
    const noOfPass = passwordsList.length
    const imgUrl =
      noOfPass > 0
        ? ''
        : 'https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'

    const showImg = noOfPass === 0

    return (
      <div className="password-container">
        <div className="search-and-heading">
          <div className="no-of-pass">
            <h1 className="pass">Your passwords </h1>
            <p> {noOfPass}</p>
          </div>
          <div className="search-bar">
            <input
              onChange={this.searchPasswords}
              type="search"
              className="search-input-field"
            />
          </div>
        </div>
        <hr />
        <div className="check">
          <label htmlFor="myCheckbox">Show Passwords</label>
          <input type="checkbox" id="myCheckbox" onChange={this.showPass} />
        </div>
        <div className="passwords">
          {showImg ? (
            <>
              <img className="password-img" src={imgUrl} alt="no passwords" />
              <p>No Passwords</p>
            </>
          ) : (
            <ul className="passwords-list">
              {passwordsList.map(eachPass => (
                <PasswordsDisplay
                  removeItem={this.removeItem}
                  showPass={isPasswordShowing}
                  key={eachPass.id}
                  details={eachPass}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {
      isPasswordShowing,
      website,
      username,
      password,
      passwordsList,
    } = this.state

    console.log(passwordsList)

    return (
      <>
        <div className="app-container">
          <div className="top-container">
            <div className="app-logo-container">
              <img
                className="app-logo"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
                alt="app logo"
              />
            </div>
            <div className="forms-container">
              <form onSubmit={this.addPassword} className="add-form">
                <h1>Add New Password</h1>
                <input
                  value={website}
                  onChange={this.websiteInput}
                  className="input-field"
                  type="text"
                  placeholder="Enter Website"
                />
                <input
                  value={username}
                  onChange={this.usernameInput}
                  className="input-field"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter Username"
                />
                <input
                  value={password}
                  onChange={this.passwordInput}
                  className="input-field"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter Password"
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
              <div className="img-container">
                <img
                  className="manager-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                  alt="password manager"
                />
              </div>
            </div>
          </div>
          {this.passwordContainer()}
        </div>
      </>
    )
  }
}

export default PasswordManager
