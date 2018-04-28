(function () {
  const model = {
    cats: [
      { name: 'Licky', pic: 'img/licky.jpg', clickCount: 0 },
      { name: 'Chewie', pic: 'img/chewie.jpg', clickCount: 0 },
      { name: 'Cool', pic: 'img/cool.jpeg', clickCount: 0 },
      { name: 'Flying', pic: 'img/flying.jpg', clickCount: 0 },
      { name: 'Wild', pic: 'img/wild.jpg', clickCount: 0 },
      { name: 'Kitty', pic: 'img/kitty.jpg', clickCount: 0 },
      { name: 'Daisy', pic: 'img/daisy.jpg', clickCount: 0 },
      { name: 'Noble', pic: 'img/noble.jpeg', clickCount: 0 },
      { name: 'Hazy', pic: 'img/hazy.jpeg', clickCount: 0 },
      { name: 'Shiny', pic: 'img/shiny.jpeg', clickCount: 0 },
      { name: 'Shy', pic: 'img/shy.jpeg', clickCount: 0 }
    ]
  };


  const octopus = {
    init: function () {
      allCatsView.init();
      currentCatView.init();
    },

    getCat: function () {
      return model.cats;
    },

    incrementCounter: function(targetCat) {
      targetCat.clickCount++;
    }
  };


  const allCatsView = {
    init: function () {
      const fragment = document.createDocumentFragment();
      octopus.getCat().forEach(cat => {
        const div = document.createElement('div');
        div.textContent = cat.name;
        div.classList.add('each-cat');
        fragment.appendChild(div);
      });
      allCatsView.render(fragment);
    },

    render: function (content) {
      const container = document.querySelector('#all-cats');
      container.appendChild(content);
    }
  };


  const currentCatView = {
    init: function () {
      const catArray = octopus.getCat();
      const eachCat = document.querySelectorAll('.each-cat')

      // Clicking on image updates the values
      document.querySelector('#current-cat-pic').addEventListener('click', (e) => {
        for (let i = 0; i < catArray.length; i++) {
          if (catArray[i].pic === e.target.getAttribute('src')) {
            octopus.incrementCounter(catArray[i]);
            currentCatView.render(catArray[i]);
            break;
          }
        }
      });

      // Select a cat to click on or just display current values
      function catHandler(e) {
        for (let i = 0; i < catArray.length; i++) {
          if (catArray[i].name === e.target.textContent) {
            // Find clicked item and render it
            currentCatView.render(catArray[i]);
            break;
          }
        }
      }

      for (let i = 0; i < eachCat.length; i++) {
        eachCat[i].addEventListener('click', catHandler);
      }
    },

    render: function (currentCat) {
      const currentCatPic = document.querySelector('#current-cat-pic');
      const currentCatCounter = document.querySelector('#current-counter');
      const currentCatName = document.querySelector('#current-name');

      currentCatPic.setAttribute('src', currentCat.pic);
      currentCatCounter.textContent = currentCat.clickCount;
      currentCatName.textContent = currentCat.name;
    }
  };

  octopus.init();
})();