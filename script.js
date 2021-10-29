class Clock {
  constructor(titulo) {
    this.titulo = titulo;
  }

  refreshClock() {
    setInterval(this.runClock, 1000);
  }

  runClock() {
    const h = (new Date().getHours() % 12 === 0) ? 12 : new Date().getHours() % 12 - 1;
    const m = new Date().getMinutes() - 1;
    const s = new Date().getSeconds() - 1;
  
    this.hBlock.forEach((e, i) => (i <= h) ? e.classList.add('ativo') : e.classList.remove('ativo') );
    
    this.mBlock.forEach((e, i) => (i <= m) ? e.classList.add('ativo') : e.classList.remove('ativo') );
    
    this.sBlock.forEach((e, i) => (i <= s) ? e.classList.add('ativo') : e.classList.remove('ativo') );
  }
  
  createClock() {
    const relogio = document.querySelector('#relogio');
    const fracTempo = ['horas', 'minutos', 'segundos'];
    let i;

    const h1Clock = document.createElement('h1');
    h1Clock.classList.add('titulo')
    h1Clock.innerText = this.titulo;
    relogio.appendChild(h1Clock);
    
    fracTempo.forEach(event => {
      const newParent = document.createElement('div');
      newParent.classList.add(event);
      relogio.appendChild(newParent);
      if(event === 'horas')  i = 12;
      else if(event === 'minutos')  i = 59;
    
      for (let j = 1; j <= i; j++) {
        const newChild = document.createElement('div');
        newChild.classList.add('block');
        newChild.style = `--i: ${j}`;
        newParent.appendChild(newChild);
      }
    });
    this.hBlock = document.querySelectorAll('.horas .block');
    this.mBlock = document.querySelectorAll('.minutos .block');
    this.sBlock = document.querySelectorAll('.segundos .block');
  }

  onBind() {
    this.createClock = this.createClock.bind(this);
    this.runClock = this.runClock.bind(this);
    this.refreshClock = this.refreshClock.bind(this);
  }

  init() {
    this.onBind();
    this.createClock();
    this.runClock()
    this.refreshClock()
    return this;
  }
}

new Clock('UFO Clock').init();
