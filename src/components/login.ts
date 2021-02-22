import axios from 'axios';
import View from '../utils/View';
import footer from './footer';
import header from './header';

class Login extends View {
  constructor() {
    super();
    this.setTitle('login');
  }

  // eslint-disable-next-line class-methods-use-this
  async getHtml(): Promise<string> {
    return `${header()}<div class="auth-page">
    <div class="container page">
      <div class="row">
  
        <div class="col-md-6 offset-md-3 col-xs-12 login-container">
          <h1 class="text-xs-center">Sign in</h1>

          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>
  
          <form>
            <fieldset class="form-group">
              <input class="form-control form-control-lg login-input-email" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg login-input-pw" type="password" placeholder="Password">
            </fieldset>
            <button type="button" class="btn btn-lg btn-primary pull-xs-right login-btn">
              Sign up
            </button>
          </form>
        </div>
  
      </div>
    </div>
  </div>${footer()}`;
  }

  eventBinding(): void {
    const $inputEmail = document.querySelector('.login-input-email') as HTMLInputElement;
    const $inputPassword = document.querySelector('.login-input-pw') as HTMLInputElement;
    const $loginBtn = document.querySelector('.login-btn') as HTMLButtonElement;
    const $loginContainer = document.querySelector('.login-container') as HTMLDivElement;
    const $errorMessages = document.createElement('ul') as HTMLUListElement;

    $loginContainer.insertBefore($errorMessages, $loginContainer.lastElementChild);
    $errorMessages.classList.add('error-messages');

    $loginBtn.addEventListener('click', async () => {
      try {
        const response = await axios.post('https://conduit.productionready.io/api/users/login', {
          user:{
            email: $inputEmail.value,
            password: $inputPassword.value
          }
        });
        const token: string = response.data.user.token;

        localStorage.setItem('JWT', token);

        $errorMessages.innerHTML = '';
        $inputEmail.value = '';
        $inputPassword.value = '';
      } catch (err) {
        const errorObj = err.response.data.errors;
        const errorName = Object.keys(errorObj).join('');
        const errorMessage = Object.values(errorObj).join('');
        
        $errorMessages.innerHTML = `<li>${errorName} ${errorMessage}</li>`;
      }
    });
  }
}

export default Login;
