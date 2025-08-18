class LoginView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.attempts = 0;
  }

  connectedCallback() {
    this.question = this.getAttribute('question') || 'Masukkan jawabanmu';
    this.hint = this.getAttribute('hint') || 'Ini petunjuknya';
    this.variant = this.getAttribute('variant') || 'a';
    this.hintLimit = parseInt(this.getAttribute('hint-limit')) || 3;
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          --bg-color: #ffe6e9;
          --card-bg: #fffaf7;
          --accent: #e87ca4;
          --focus: #d6336c;
          --text-color: #333;
          display: block;
          min-height: 100vh;
          color: var(--text-color);
          font-family: Arial, sans-serif;
          background: var(--bg-color);
        }
        :host([variant="b"]) {
          --bg-color: #f3e8ff;
          --card-bg: #fcfaff;
          --accent: #b794f6;
          --focus: #7c3aed;
        }
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('./assets/poster.svg') center/cover no-repeat;
          filter: blur(8px);
          z-index: -1;
        }
        .logo {
          position: fixed;
          top: 1rem;
          left: 1rem;
          width: 80px;
          height: auto;
        }
        .card {
          background: var(--card-bg);
          padding: 2rem 1.5rem;
          margin: 0 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          max-width: 320px;
          width: 100%;
        }
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        input:focus,
        button:focus,
        .hint-btn:focus {
          outline: 2px solid var(--focus);
          outline-offset: 2px;
        }
        button {
          width: 100%;
          margin-top: 1rem;
          padding: 0.6rem;
          border: none;
          border-radius: 4px;
          background: var(--accent);
          color: #fff;
          font-size: 1rem;
        }
        .hint-btn {
          margin-top: 0.75rem;
          background: none;
          border: none;
          color: var(--accent);
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: underline;
        }
        .hint {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--accent);
        }
      </style>
      <div class="background" aria-hidden="true"></div>
      <img src="./assets/logo.svg" alt="Logo" class="logo" />
      <div class="wrapper">
        <div class="card">
          <form>
            <label for="answer">${this.question}</label>
            <input id="answer" type="text" required />
            <button type="submit">Masuk</button>
          </form>
          <button type="button" class="hint-btn">Butuh petunjuk?</button>
          <div class="hint" hidden>${this.hint}</div>
        </div>
      </div>
    `;
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const form = this.shadowRoot.querySelector('form');
    const hintBtn = this.shadowRoot.querySelector('.hint-btn');
    const hintEl = this.shadowRoot.querySelector('.hint');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.attempts++;
    });

    hintBtn.addEventListener('click', () => {
      if (this.attempts >= this.hintLimit) {
        hintEl.hidden = false;
      }
    });
  }
}

customElements.define('login-view', LoginView);
export default LoginView;
