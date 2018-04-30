(function () {
  const model = {
    currentCat: null,
    allCats: [
      { name: 'Chewie', pic: 'img/chewie.jpg', clickCount: 0 },
      { name: 'Licky', pic: 'img/licky.jpg', clickCount: 0 },
      { name: 'Noble', pic: 'img/noble.jpeg', clickCount: 0 },
      { name: 'Kitty', pic: 'img/kitty.jpg', clickCount: 0 },
      { name: 'Shiny', pic: 'img/shiny.jpeg', clickCount: 0 },
      { name: 'Shy', pic: 'img/shy.jpeg', clickCount: 0 },
      { name: 'Wild', pic: 'img/wild.jpg', clickCount: 0 },
      { name: 'Cool', pic: 'img/cool.jpg', clickCount: 0 },
      { name: 'Flying', pic: 'img/flying.jpg', clickCount: 0 },
      { name: 'Hazy', pic: 'img/hazy.jpeg', clickCount: 0 },

    ]
  };

  const octopus = {
    init() {
      catListView.init();
      currentCatView.init();
      adminView.init();
    },

    getAllCats() {
      return model.allCats;
    },

    getCurrentCat() {
      return model.currentCat;
    },

    incrementCounter(targetCat) {
      targetCat.clickCount++;
      currentCatView.render();
    },

    setCurrentCat(targetCat) {
      model.currentCat = targetCat;
      currentCatView.render();
    },

    setNewCat(cat) {
      model.allCats.push(cat);
      catListView.init();
    }

  };

  const catListView = {
    init() {
      this.allCatsPos = document.querySelector('#all-cats');
      this.render();
    },

    render() {
      // If there are previously rendered items remove them
      if (this.allCatsPos.html !== '')
        this.allCatsPos.innerHTML = '';

      const allCatsData = octopus.getAllCats();

      // Create an event handler for divs
      const divHandler = e => {
        for (let i = 0; i < allCatsData.length; i++) {
          if (e.target.textContent === allCatsData[i].name) {
            octopus.setCurrentCat(allCatsData[i]);
            break;
          }
        }
      };

      // Create divs for each data
      const fragment = document.createDocumentFragment();
      allCatsData.forEach(cat => {
        const div = document.createElement('div');
        div.classList.add('each-cat');
        div.textContent = cat.name;
        div.addEventListener('click', divHandler);
        fragment.appendChild(div);
      });

      // Lastly append items to the container
      this.allCatsPos.appendChild(fragment);


    }
  };

  const currentCatView = {
    init() {
      this.currentCatPic = document
        .querySelector('#current-cat-pic');
      this.currentCounter = document
        .querySelector('#current-counter');
      this.currentName = document
        .querySelector('#current-name');
      this.allCatsData = octopus
        .getAllCats();

      document.querySelector('img').addEventListener('click', e => {
        for (let i = 0; i < this.allCatsData.length; i++) {
          if (e.target.getAttribute('src') === this.allCatsData[i].pic) {
            octopus.incrementCounter(this.allCatsData[i]);
            break;
          }
        }
      });
      //this.render();
    },

    render() {
      const currentCat = octopus.getCurrentCat();
      this.currentCatPic.setAttribute('src', currentCat.pic);
      this.currentCounter.textContent = currentCat.clickCount;
      this.currentName.textContent = currentCat.name;
    }
  };


  const adminView = {
    init() {
      this.formElement = document
        .querySelector('form');
      this.adminButton = document
        .querySelector('#admin-button');
      this.newCatName = document
        .querySelector('#new-cat-name');
      this.newCatUrl = document
        .querySelector('#new-cat-url');
      this.newCatClicks = document
        .querySelector('#new-cat-clicks');
      this.adminSaveButton = document
        .querySelector('#admin-save-button');
      this.adminCancelButton = document
        .querySelector('#admin-cancel-button');




      this.adminButton.addEventListener('click', () => {
        this.formElement.style.display = 'block';
      });


      this.adminCancelButton.addEventListener('click', () => {
        this.formElement.style.display = 'none';
      });


      this.adminSaveButton.addEventListener('click', () => {
        const newObj = {
          name: this.newCatName.value,
          pic: this.newCatUrl.value,
          clickCount: this.newCatClicks.value
        };

        octopus.setNewCat(newObj);
      })
    },


    render() {

    }
  }

  octopus.init();
})();
