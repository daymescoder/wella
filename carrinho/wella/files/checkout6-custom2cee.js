/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/scripts/helpers/birthDate.ts":
/*!*************************************************!*\
  !*** ./src/assets/scripts/helpers/birthDate.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.insertFieldsForm = insertFieldsForm;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function insertFieldsForm() {
  var elementoExistente = document.querySelector('.client-document.input.pull-left.text.required.mask'); // classe do cpf

  var birthDateContainer = "<p class=\"client-document client-date input pull-left text required mask\" data-bind=\"visible: !hasDifferentDocument(), css: {'hide': !showDocument()}\">\n  <label for=\"client-date-of-birth\">Data de nascimento</label>\n  <input type=\"date\" id=\"client-date-of-birth\" class=\"input-small js-date ipts-validate\" data-bind=\"value: birthDate, disable: loading\" maxlength=\"10\" required placeholder=\"00/00/0000\" />\n  </p>"; // Inserir a nova tag ao lado da existente

  if (document.querySelectorAll('#client-date-of-birth').length < 1) {
    elementoExistente === null || elementoExistente === void 0 ? void 0 : elementoExistente.insertAdjacentHTML('afterend', birthDateContainer);
  }

  var htmlContentAge = // '\n    \n<p class="client-date-of-birth input pull-left text required mask">\n      \n<label for="client-date-of-birth">Data de nascimento: </label>\n\n        <input type="date" id="client-date-of-birth" class="input-small js-date ipts-validate" data-bind="value: birthDate, disable: loading" maxlength="10" required placeholder="00/00/0000" />\n\n      </p>\n\n  ';
  // INSERÇÃO NO HTML
  $('<div class="container-new-fields d-flex w-100">').insertAfter("div[data-bind='template: {name: phoneTemplate(), afterRender: window.vtex.i18n.translateHtml }']");
  $(htmlContentAge).prependTo('.box-client-info-pf'); // VALIDAÇÃO COMENTAR O BLOCO ABAIXO CASO DESNECESSÁRIO
  // DATE OF BIRTH

  var htmlContentError = '\n<span class="help error">Campo obrigat\xF3rio.</span>\n';
  $('#client-date-of-birth').on('blur', function () {
    if ($(this).hasClass('error')) {
      return;
    }

    if ($('#client-date-of-birth').val() == '') {
      $(this).addClass('error');
      $(htmlContentError).insertAfter('#client-date-of-birth');
    }
  });
  $('#client-date-of-birth').on('keyup', function () {
    if ($(this).hasClass('error')) {
      $(this).removeClass('error');
      $('#client-date-of-birth').siblings('span').remove();
    }
  }); // DT MASK

  var inputBDay = document.querySelectorAll('.js-date')[0];

  var dateInputMask = function dateInputMask(elm) {
    elm.addEventListener('keypress', function (e) {
      if (e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }

      var len = elm.value.length;

      if (len !== 1 || len !== 3) {
        if (e.keyCode == 47) {
          e.preventDefault();
        }
      }

      if (len === 2) {
        elm.value += '/';
      }

      if (len === 5) {
        elm.value += '/';
      }
    });
  };

  dateInputMask(inputBDay); // Verificar se o usuario possui  cadastro

  var clientEmail = $('.client-email > span').text() != '' ? $('.client-email > span').text() : String($('#client-email').val());
  checkUser(clientEmail);
} // function getAccessToken() {
//   let bdSearch = new URLSearchParams({
//     username: 'user.vtex@infracommerce.com.br',
//     password: '3vs58sD9t8/Pm',
//     client_id: 'vtex',
//     client_secret: 'bAbQ6KihTD3f0NlyCRlW2sWj657MNCqz',
//     grant_type: 'password',
//     scope: 'openId',
//   });
//   let xhr = new XMLHttpRequest();
//   xhr.addEventListener('readystatechange', function () {
//     if (this.readyState === this.DONE) {
//       console.log('readyState = ', this);
//       getDataNascimento();
//       //Retorno do access token e repassar para buscar a data correta
//     }
//   });
//   xhr.withCredentials = true;
//   xhr.open('POST', 'https://auth.dh.ifctech.com.br/realms/DigitalServices/protocol/openid-connect/token');
//   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
//   xhr.send(bdSearch);
// }
// function getAccessToken2(){
//   const url = 'https://auth.dh.ifctech.com.br/realms/DigitalServices/protocol/openid-connect/token';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       'username': 'user.vtex@infracommerce.com.br',
//       'password': '3vs58sD9t8/Pm',
//       'client_id': 'vtex',
//       'client_secret': 'bAbQ6KihTD3f0NlyCRlW2sWj657MNCqz',
//       'grant_type': 'password',
//       'scope': 'openid'
//     })
//   };
// fetch(url, options)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch(error => console.error('There was a problem with your fetch operation:', error));
// }


function checkUser(email) {
  getBirthDate(email);
}

function getBirthDate(email) {
  fetch('https://vtex-api.ifctech.com.br/api/client/' + email, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.length > 0) {
      // verificar se existe data de nascimento cadastrada
      if (data[0].birthDate) {
        var dataTranformada = transformData(new Date(data[0].birthDate).getDate(), new Date(data[0].birthDate).getMonth() + 1, new Date(data[0].birthDate).getFullYear()); // capturar valor da data e setar no input

        $('#client-date-of-birth').val("".concat(dataTranformada));
      }
    } else {
      console.log("without user");
    }
  });
} // async function hasEmailOnMD(email: string): Promise<any>{
//   fetch('https://vtex-api.ifctech.com.br/api/client/' + email, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO'
//     },
//   })
//   .then((response) => response.json())
//   .then((data) => data.length > 0)
// }


function transformData(day, month, year) {
  if (day && month && year) {
    var transformedDay = "".concat(day < 10 ? '0' + day : day);
    var transformedMonth = "".concat(month < 10 ? '0' + month : month);
    return "".concat(year, "-").concat(transformedMonth, "-").concat(transformedDay);
  }
} // getDataNascimento(dataNasmentoValue)


function createNewUser(email, birthDate, document) {
  fetch('https://vtex-api.ifctech.com.br/api/client/' + email, {
    method: 'POST',
    body: JSON.stringify({
      birthDate: birthDate,
      document: document
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.DocumentId) {
      console.log("Usuário criado com sucesso");
    } else {
      console.log(data);
    }
  }).catch(function (error) {
    return console.error('Algo inesperado aconteceu', error);
  });
}

$(window).on('load hashchange', function () {
  var _hash = window.location.hash;

  if (_hash == '#/profile') {
    // console.log('profile checkout - arquivo local - chrome');
    var dateBirth = $('#client-date-of-birth'); // let clientEmail = $('#client-email').val() || vtexjs?.checkout?.orderForm?.clientProfileData?.email;

    var clientEmail = $('.client-email > span').text() != '' ? $('.client-email > span').text() : String($('#client-email').val()); // $('#go-to-shipping, #go-to-payment').addClass('disabled');
    // Valida se o input de data está preenchido, se true retira o block do bt avançar e seta as variáveis para um cookie para update posteriormente
    // let iptsValidate = $('.ipts-validate');
    // $(iptsValidate).each(function () {
    //   let elem = $(this);
    //   elem.on('change propertychange click keyup input paste', function () {
    //     if (dateBirth.val() && clientEmail !== null) {
    //       $('#go-to-shipping, #go-to-payment').removeClass('disabled');
    //     } else {
    //       $('#go-to-shipping, #go-to-payment').addClass('disabled');
    //     }
    //   });
    // });
    // update do usuario já existente
    // if (vtexjs.checkout.orderForm.userProfileId || getBirthDate(String($("#client-email").val()))) {
    //   // console.log('Update User');
    //   $('#go-to-shipping, #go-to-payment').on('click', () => {
    //     //Teste
    //     let dataNascimento = String($('#client-date-of-birth').val())
    //     let updateData = JSON.stringify({ birthDate: dataNascimento });
    //     let email = $("#client-email").val();
    //     let xhr = new XMLHttpRequest();
    //     xhr.addEventListener('readystatechange', function () {
    //       if (this.readyState === this.DONE) {
    //         console.log('readyState = ', this.responseText);
    //       }
    //     });
    //     console.log("Rodando patch")
    //     xhr.open('PATCH', 'https://vtex-api.ifctech.com.br/api/client/' + email);
    //     // xhr.setRequestHeader('X-MD-Token', 'YDKO44NDqUOX64480a90228f0');
    //     xhr.setRequestHeader('Authorization', 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO');
    //     xhr.setRequestHeader('content-type', 'application/json');
    //     xhr.send(updateData);
    //   });
    // }else{
    //   // cria novo usuário
    //   $('#go-to-shipping, #go-to-payment').on('click', () => {
    //     let dataNascimento = String($('#client-date-of-birth').val())
    //     let documentVal = String($("#client-document").val()).replace("-", "").replace(".", "").replace(".", "")
    //     // let updateData = JSON.stringify({ birthDate: dataNascimento });
    //     let email = String($("#client-email").val());
    //     console.log("Entrei no else") 
    //     createNewUser(email, dataNascimento, documentVal)
    //   });
    // }

    $('#go-to-shipping, #go-to-payment').on('click', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var res, user, dataNascimento, updateData, email, xhr, _dataNascimento, documentVal, _email;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (sessionStorage.getItem('DateOfBirth-Gender') === 'false' || sessionStorage.getItem('DateOfBirth-Gender') === null) {
                sessionStorage.setItem('DateOfBirth-Gender', 'true');
              } // console.log("Clique fora parte 2")
              // hasEmailOnMD(String($("#client-email").val()))


              _context.next = 3;
              return fetch('https://vtex-api.ifctech.com.br/api/client/' + clientEmail, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO'
                }
              });

            case 3:
              res = _context.sent;
              _context.next = 6;
              return res.json();

            case 6:
              user = _context.sent;

              if (user.length || vtexjs.checkout.orderForm.userProfileId) {
                console.log("Entrei no if tem user", user[0]);
                dataNascimento = String($('#client-date-of-birth').val());
                updateData = JSON.stringify({
                  birthDate: dataNascimento
                });
                email = clientEmail;
                xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function () {
                  if (this.readyState === this.DONE) {
                    console.log('readyState = ', this.responseText);
                  }
                });
                xhr.open('PATCH', 'https://vtex-api.ifctech.com.br/api/client/' + email); // xhr.setRequestHeader('X-MD-Token', 'YDKO44NDqUOX64480a90228f0');

                xhr.setRequestHeader('Authorization', 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO');
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(updateData);
              } else {
                console.log("Entrei no else nao tem user", user);
                _dataNascimento = String($('#client-date-of-birth').val());
                documentVal = String($("#client-document").val()).replace("-", "").replace(".", "").replace(".", ""); // let updateData = JSON.stringify({ birthDate: dataNascimento });

                _email = clientEmail; // console.log("Entrei no else") 
                // console.log("Entrando no else", getBirthDate(String($("#client-email").val())));
                // console.log("Entrando no else", vtexjs.checkout.orderForm.userProfileId);

                createNewUser(_email, _dataNascimento, documentVal);
              } // if(vtexjs.checkout.orderForm.userProfileId/* ||  hasEmailOnMD(String($("#client-email").val()))*/){
              //   // console.log("Entrando no if", getBirthDate(String($("#client-email").val())));
              //   // console.log("Entrando no if", vtexjs.checkout.orderForm.userProfileId);
              //   let dataNascimento = String($('#client-date-of-birth').val())
              //   let updateData = JSON.stringify({ birthDate: dataNascimento });
              //   let email = $("#client-email").val();
              //   let xhr = new XMLHttpRequest();
              //   xhr.addEventListener('readystatechange', function () {
              //     if (this.readyState === this.DONE) {
              //       console.log('readyState = ', this.responseText);
              //     }
              //   });
              //   xhr.open('PATCH', 'https://vtex-api.ifctech.com.br/api/client/' + email);
              //   // xhr.setRequestHeader('X-MD-Token', 'YDKO44NDqUOX64480a90228f0');
              //   xhr.setRequestHeader('Authorization', 'Bearer Rgz3tmgZi94JTYsOwkI3IMGA6fNePqQO');
              //   xhr.setRequestHeader('content-type', 'application/json');
              //   xhr.send(updateData);
              // }else{
              //   let dataNascimento = String($('#client-date-of-birth').val())
              //   let documentVal = String($("#client-document").val()).replace("-", "").replace(".", "").replace(".", "")
              //   // let updateData = JSON.stringify({ birthDate: dataNascimento });
              //   let email = String($("#client-email").val());
              //   // console.log("Entrei no else") 
              //   // console.log("Entrando no else", getBirthDate(String($("#client-email").val())));
              //   // console.log("Entrando no else", vtexjs.checkout.orderForm.userProfileId);
              //   createNewUser(email, dataNascimento, documentVal)
              // }


            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  }
});

/***/ }),

/***/ "./src/assets/scripts/helpers/slider.ts":
/*!**********************************************!*\
  !*** ./src/assets/scripts/helpers/slider.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _gliderJs = _interopRequireDefault(__webpack_require__(/*! glider-js */ "./node_modules/glider-js/glider.js"));

var _window$storeTheme2;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultOptions = {
  draggable: true,
  dragVelocity: 1,
  autoplay: false,
  autoplayDelay: 5000,
  loop: true
};

var slider = function slider(element, options) {
  var sliderBox;

  if (typeof element === 'string') {
    sliderBox = document.querySelectorAll(element);
  } else if (element instanceof NodeList) {
    sliderBox = element;
  } else if (element instanceof HTMLElement) {
    sliderBox = [element];
  }

  if (sliderBox) {
    sliderBox.forEach(function (box) {
      var _window, _window$storeTheme, _window$storeTheme$he, _window$storeTheme$he2;

      var domOptions = {};

      try {
        var _box$closest;

        domOptions = JSON.parse(box.getAttribute('data-slider-options') || ( // opções no próprio elemento
        box === null || box === void 0 ? void 0 : (_box$closest = box.closest('[data-slider-options]')) === null || _box$closest === void 0 ? void 0 : _box$closest.getAttribute('data-slider-options')) || // ou usando elemento superior
        '{}');
      } catch (error) {
        console.error(error);
      }

      var newOptions = _objectSpread(_objectSpread(_objectSpread({}, defaultOptions), domOptions), options); // validar largura dinamicamente de cada item quando estiver com opção exactWidth verdadeira


      if (!(newOptions !== null && newOptions !== void 0 && newOptions.slideToStart)) {
        newOptions.slideToStart = 0;
      }

      if (newOptions !== null && newOptions !== void 0 && newOptions.exactWidth && !(newOptions !== null && newOptions !== void 0 && newOptions.itemWidth)) {
        newOptions.itemWidth = box.clientWidth;
      } // auto criar e inserir o elemento de controle de navegação no DOM


      if ((newOptions === null || newOptions === void 0 ? void 0 : newOptions.arrows) === true) {
        if (!box.classList.contains('has-arrows')) {
          var _box$parentNode, _box$parentNode2;

          var prevTag = document.createElement('button');
          var nextTag = document.createElement('button');
          prevTag.classList.add('glider-prev');
          prevTag.setAttribute('aria-label', 'Anterior');
          prevTag.innerHTML = 'Anterior';
          nextTag.classList.add('glider-next');
          nextTag.setAttribute('aria-label', 'Próximo');
          nextTag.innerHTML = 'Próximo';
          (_box$parentNode = box.parentNode) === null || _box$parentNode === void 0 ? void 0 : _box$parentNode.appendChild(prevTag);
          (_box$parentNode2 = box.parentNode) === null || _box$parentNode2 === void 0 ? void 0 : _box$parentNode2.appendChild(nextTag);
          box.classList.add('has-arrows');
          newOptions.arrows = {
            next: nextTag,
            prev: prevTag
          };
        }
      } // se existir elemento para controle de dots


      if ((newOptions === null || newOptions === void 0 ? void 0 : newOptions.dots) === true) {
        if (!box.classList.contains('has-dots')) {
          var _box$parentNode3;

          var dotsTag = document.createElement('div');
          dotsTag.classList.add('glider-dots');
          (_box$parentNode3 = box.parentNode) === null || _box$parentNode3 === void 0 ? void 0 : _box$parentNode3.appendChild(dotsTag);
          box.classList.add('has-dots');
          newOptions.dots = dotsTag;
        }
      }

      var glider = new _gliderJs.default(box, newOptions);

      if (newOptions.dots) {
        var _glider$dots;

        var buttons = (glider === null || glider === void 0 ? void 0 : (_glider$dots = glider.dots) === null || _glider$dots === void 0 ? void 0 : _glider$dots.querySelectorAll('button')) || [];

        if (glider.slides.length < 2) {
          var _glider$dots2;

          glider === null || glider === void 0 ? void 0 : (_glider$dots2 = glider.dots) === null || _glider$dots2 === void 0 ? void 0 : _glider$dots2.remove();
        } else {
          buttons.forEach(function (item) {
            item.removeAttribute('role');
          });
        }

        glider.refresh(false);
      } // configuração para autoplay. Ref: https://github.com/NickPiscitelli/Glider.js/issues/43#issuecomment-800188902


      if (newOptions !== null && newOptions !== void 0 && newOptions.autoplay) {
        var timeout;
        var hovering = false;
        var nextIndex = 1;

        var startTimeout = function startTimeout() {
          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(function () {
            if (!hovering) {
              if (newOptions !== null && newOptions !== void 0 && newOptions.loop && nextIndex >= glider.slides.length) {
                nextIndex = 0;
              }

              if (nextIndex < glider.slides.length) {
                glider.scrollItem(nextIndex++, false);
              }
            }
          }, (newOptions === null || newOptions === void 0 ? void 0 : newOptions.autoplayDelay) || 5000);
        };

        var animID = 0;

        var isAnimating = function isAnimating() {
          return glider.animate_id !== animID;
        };

        box.addEventListener('glider-animated', function () {
          animID = glider.animate_id;

          if (timeout) {
            clearTimeout(timeout);
          }

          if (!hovering) {
            startTimeout();
          }
        });
        box.addEventListener('mouseover', function () {
          hovering = true;

          if (timeout) {
            clearTimeout(timeout);
          }
        });
        box.addEventListener('mouseout', function () {
          hovering = false;
          if (!isAnimating()) startTimeout();
        });
        startTimeout();
      } // @ts-ignore


      if (newOptions !== null && newOptions !== void 0 && newOptions.slideToStart &&
      /* only for wella */
      $(window).width() > 768) {
        var length = glider.slides.length;

        if (length <= 2) {
          return;
        } else if (length > newOptions.slideToStart) {
          glider.scrollItem(newOptions.slideToStart, false);
        }
      }

      (_window = window) === null || _window === void 0 ? void 0 : (_window$storeTheme = _window.storeTheme) === null || _window$storeTheme === void 0 ? void 0 : (_window$storeTheme$he = _window$storeTheme.helpers) === null || _window$storeTheme$he === void 0 ? void 0 : (_window$storeTheme$he2 = _window$storeTheme$he.events) === null || _window$storeTheme$he2 === void 0 ? void 0 : _window$storeTheme$he2.ready(function () {
        return glider.refresh(true);
      }); // TODO: verificar script para transição vertical
    });
  }
}; // auto execução no carregamento do conteúdo
// mas ignorando prateleiras, pois elas precisam de tratamento na maioria das
// vezes e isso é feito dentro do arquivo layout/shelf.ts


slider('.slider:not(.shelf)');
window.storeTheme = Object.assign({}, window.storeTheme, {
  helpers: Object.assign(((_window$storeTheme2 = window.storeTheme) === null || _window$storeTheme2 === void 0 ? void 0 : _window$storeTheme2.helpers) || {}, {
    slider: slider
  })
});
var _default = slider;
exports["default"] = _default;

/***/ }),

/***/ "./src/assets/scripts/helpers/storage.ts":
/*!***********************************************!*\
  !*** ./src/assets/scripts/helpers/storage.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.getLocalStorage = getLocalStorage;
exports.localStorageExpires = localStorageExpires;
exports.removeLocalStorage = removeLocalStorage;
exports.setLocalStorage = setLocalStorage;

var _window$storeTheme;

function localStorageExpires() {
  var toRemove = [];
  var currentDate = new Date().getTime();
  var keys = Object.keys(localStorage);
  keys.forEach(function (key) {
    var current = localStorage.getItem(key);

    if (current && /^\{(.*?)\}$/.test(current)) {
      var _currentObj;

      var currentObj;

      try {
        currentObj = JSON.parse(current) || {};
      } catch (e) {}

      if (((_currentObj = currentObj) === null || _currentObj === void 0 ? void 0 : _currentObj.expires) <= currentDate) {
        toRemove.push(key);
      }
    }
  });

  if (toRemove.length) {
    // console.info('🗑  Expired storage for keys: ', toRemove);
    toRemove.reverse().forEach(function (key) {
      return localStorage.removeItem(key);
    });
  }
}

function setLocalStorage(key, value) {
  var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 99999999999;
  var expires = new Date().getTime() + 60000 * minutes;
  localStorage.setItem(key, JSON.stringify({
    value: value,
    expires: expires
  }));
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

function getLocalStorage(key) {
  var valueDefault = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  localStorageExpires();
  var itemValue = localStorage[key];

  if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {
    var current = JSON.parse(itemValue);
    return current.value;
  }

  return valueDefault;
}

localStorageExpires();
var storage = {
  save: setLocalStorage,
  read: getLocalStorage,
  remove: removeLocalStorage,
  flush: localStorageExpires
};
window.storeTheme = Object.assign({}, window.storeTheme, {
  helpers: Object.assign(((_window$storeTheme = window.storeTheme) === null || _window$storeTheme === void 0 ? void 0 : _window$storeTheme.helpers) || {}, {
    storage: storage
  })
});
var _default = storage;
exports["default"] = _default;

/***/ }),

/***/ "./src/assets/scripts/helpers/vtex-masterdata.ts":
/*!*******************************************************!*\
  !*** ./src/assets/scripts/helpers/vtex-masterdata.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _window$storeTheme;

var vtexMasterdata = function vtexMasterdata(options) {
  var config = Object.assign({
    useSafeData: true,
    entity_sigla: '',
    seller: window.jsnomeLoja || ((window.vtex || {}).vtexid || {}).accountName || window.location.hostname.split('.')[0]
  }, options);
  var obj = {
    masterDataURL: config.useSafeData ? '/api/io/safedata/' + config.entity_sigla : '/' + config.seller + '/dataentities/' + config.entity_sigla,
    post: function post(e) {
      if (null == e) throw new Error("Can't create todo without data");
      return fetch(obj.masterDataURL + '/documents', {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'POST',
        body: JSON.stringify(e)
      }).then(function (j) {
        try {
          if (j.status === 204) {
            return Promise.resolve(true);
          }

          return j.json();
        } catch (e) {
          return Promise.resolve(e);
        }
      });
    },
    update: function update(e, n) {
      return fetch(obj.masterDataURL + '/documents' + (e ? '/' + e : ''), {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'PATCH',
        body: JSON.stringify(n)
      }).then(function (j) {
        try {
          if (j.status === 204) {
            return Promise.resolve(true);
          }

          return j.json();
        } catch (e) {
          return Promise.resolve(e);
        }
      });
    },
    get: function get(_ref) {
      var fields = _ref.fields,
          where = _ref.where,
          _ref$range = _ref.range,
          range = _ref$range === void 0 ? '0-100' : _ref$range;

      try {
        return fetch(obj.masterDataURL + '/search/?' + (!!fields ? '&_fields=' + fields : '') + (!!where ? '&_where=' + where : ''), {
          headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
            'REST-Range': 'resources=' + range
          },
          method: 'GET'
        }).then(function (j) {
          return j.json();
        });
      } catch (error) {
        return [];
      }
    },
    scroll: function scroll(_ref2) {
      var fields = _ref2.fields,
          size = _ref2.size,
          _ref2$token = _ref2.token,
          token = _ref2$token === void 0 ? null : _ref2$token;
      return fetch(obj.masterDataURL + '/scroll/?' + (!!size ? '&_size=' + size : '') + (!!fields ? '&_fields=' + fields : '') + (!!token ? '&_token=' + token : ''), {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json; charset=utf-8'
        },
        method: 'GET'
      }).then(function (response) {
        return new Promise(function (resolve, reject) {
          try {
            response.json().then(function (data) {
              resolve({
                data: data,
                nextToken: response.headers.get('X-VTEX-MD-TOKEN')
              });
            });
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  };
  return obj;
};

window.storeTheme = Object.assign({}, window.storeTheme, {
  helpers: Object.assign(((_window$storeTheme = window.storeTheme) === null || _window$storeTheme === void 0 ? void 0 : _window$storeTheme.helpers) || {}, {
    vtexMasterdata: vtexMasterdata
  })
});
var _default = vtexMasterdata;
exports["default"] = _default;

/***/ }),

/***/ "./src/assets/scripts/layout/productFavorites.ts":
/*!*******************************************************!*\
  !*** ./src/assets/scripts/layout/productFavorites.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

/**
 * Arquivo responsável por realizar o controle de marcação de SKUs favoritos na loja VTEX.
 *
 * Ele utiliza conteúdo do MasterData e é indicado que seja utilizado o aplicativo SafeData para ralizaçãode operações no MasterData
 *
 * Sempre o start, será:
 * 1) Ler do MasterData os dados do usuário
 * 2) Os dados do MasterData é atualizadono localStorage
 * 3) Os dados do localStorage é atualizado no localDB
 * 4) Executa os eventos para atualizar o DOM
 *
 * Depois que a lib já foi iniciada, o processo será sempre inverso.
 * 1) Ao editar um SKU da lista, o localDB é atualizado
 * 2) Existe uma sincronia para atualizar o localStorage
 * 3) E posteriormente, sincronia para atualizar o MasterData
 */
var LocalDB = /*#__PURE__*/function () {
  function LocalDB() {
    var _this = this;

    (0, _classCallCheck2.default)(this, LocalDB);
    (0, _defineProperty2.default)(this, "DB", {
      skus: [],
      id: '',
      userId: ''
    });
    (0, _defineProperty2.default)(this, "eventListeners", {
      change: []
    });
    (0, _defineProperty2.default)(this, "add", function (skuData) {
      _this.DB.skus.push(skuData);

      _this.eventListeners.change.forEach(function (listener) {
        return listener();
      });

      return _this;
    });
    (0, _defineProperty2.default)(this, "remove", function (skuId) {
      _this.DB.skus = _this.DB.skus.filter(function (sku) {
        return "".concat(sku.skuId) !== "".concat(skuId);
      });

      _this.eventListeners.change.forEach(function (listener) {
        return listener();
      });

      return _this;
    });
    (0, _defineProperty2.default)(this, "inList", function (skuId) {
      var exist = !!_this.DB.skus.find(function (sku) {
        return "".concat(sku.skuId) === "".concat(skuId);
      });
      return exist;
    });
    (0, _defineProperty2.default)(this, "documentId", function () {
      return _this.DB.id || '';
    });
    (0, _defineProperty2.default)(this, "skus", function () {
      return _this.DB.skus || [];
    });
    (0, _defineProperty2.default)(this, "size", function () {
      return _this.DB.skus.length;
    });
    (0, _defineProperty2.default)(this, "getData", function () {
      return _this.DB;
    });
    (0, _defineProperty2.default)(this, "on", function (event, callback) {
      _this.eventListeners[event].push(callback);
    });
  }

  (0, _createClass2.default)(LocalDB, [{
    key: "reset",
    value: function reset(_ref) {
      var id = _ref.id,
          userId = _ref.userId,
          skus = _ref.skus;
      this.DB.id = id || '';
      this.DB.userId = userId || '';
      this.DB.skus = skus || [];
      this.eventListeners.change.forEach(function (listener) {
        return listener();
      });
    }
  }]);
  return LocalDB;
}();

var ProductFavorites = function ProductFavorites() {
  var localDB = new LocalDB();
  var $window = $(window);
  var $document = $(document);
  var localStorageKey = 'productfavorite-';
  var libReady = false;
  var MasterDataEntity = window.storeTheme.helpers.vtexMasterdata({
    entity_sigla: 'CL'
  });
  var localStorageExpireMinutes = 5;
  /**
   * Responsável por enviar/receber atualização do MasterData para o localStorage
   * two way sync
   */

  var syncMasterData = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(direction) {
      var _data, _window$storeThemeSes, _data$, skuFavorites, userId, id, storage, skus;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(direction === 'READ')) {
                _context.next = 17;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return MasterDataEntity.get({
                fields: 'skuFavorites,userId,id'
              });

            case 4:
              _data = _context.sent;

              if (!(Array.isArray(_data) && _data.length)) {
                _context.next = 10;
                break;
              }

              _data$ = _data[0], skuFavorites = _data$.skuFavorites, userId = _data$.userId, id = _data$.id;
              localDB.reset({
                skus: JSON.parse(skuFavorites || '[]'),
                userId: userId,
                id: id
              });
              window.storeTheme.helpers.storage.save(localStorageKey, localDB.getData(), localStorageExpireMinutes);
              return _context.abrupt("return");

            case 10:
              localDB.reset({
                skus: [],
                userId: (_window$storeThemeSes = window.storeThemeSessionUserIsAuthData) === null || _window$storeThemeSes === void 0 ? void 0 : _window$storeThemeSes.UserId
              });
              window.storeTheme.helpers.storage.save(localStorageKey, localDB.getData(), localStorageExpireMinutes);
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              console.error(_context.t0);

            case 17:
              storage = window.storeTheme.helpers.storage.read(localStorageKey);
              skus = JSON.stringify(storage.skus);
              _context.next = 21;
              return MasterDataEntity.update(localDB.documentId(), {
                skuFavorites: skus
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 14]]);
    }));

    return function syncMasterData(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Responsável por enviar/receber atualização para o LocalStorage para o localDB
   * two way sync
   */


  var syncLocalStorage = function syncLocalStorage(direction) {
    if (direction === 'READ') {
      var _data2 = window.storeTheme.helpers.storage.read(localStorageKey);

      if (_data2) {
        localDB.reset(_data2);
      }

      return;
    }

    window.storeTheme.helpers.storage.save(localStorageKey, localDB.getData(), localStorageExpireMinutes); // sempre que atualizar o localStorage, atualiza o MasterData

    syncMasterData(direction);
  };
  /**
   * Verifica se o localStorage já está montado para o usuário autenticado.
   */


  var isLocalStorageReady = function isLocalStorageReady() {
    return !!window.storeTheme.helpers.storage.read(localStorageKey);
  };
  /**
   * Responsável por sincronizar o DB local, com o localStorage, e também com o MasterData
   * Toda operação será realizada no localDB e posteriormente deve refletir no localStorage e na sequencia para o MasterData
   */


  var syncStorages = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(direction) {
      var forceUpdate,
          _args2 = arguments;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              forceUpdate = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

              if (!(direction === 'READ')) {
                _context2.next = 8;
                break;
              }

              if (!(forceUpdate || !isLocalStorageReady())) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return syncMasterData(direction);

            case 5:
              syncLocalStorage(direction);
              _context2.next = 11;
              break;

            case 8:
              syncLocalStorage(direction);
              _context2.next = 11;
              return syncMasterData(direction);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function syncStorages(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  var updateHeartIcons = function updateHeartIcons() {
    var _window;

    var $hearts = $(".wishlist-button[data-skuid], .wishlist-button.fav-product");
    var $checkedHearts = localDB.skus().map(function (sku) {
      var e = document.querySelector(".wishlist-button[data-skuid=\"".concat(sku.skuId, "\"]"));

      if (e) {
        e.classList.add('active');
      }

      return e;
    }).filter(function (e) {
      return !!e;
    }); // if, product page

    if ((_window = window) !== null && _window !== void 0 && _window.skuJson) {
      var _window$skuJson, _window$skuJson$skus;

      var productFavBtn = document.querySelector(".wishlist-button.fav-product");

      if (localDB.inList((_window$skuJson = window.skuJson) === null || _window$skuJson === void 0 ? void 0 : (_window$skuJson$skus = _window$skuJson.skus) === null || _window$skuJson$skus === void 0 ? void 0 : _window$skuJson$skus[0].sku) && productFavBtn) {
        $checkedHearts.push(productFavBtn);
        productFavBtn.classList.add('active');
      }
    }

    $hearts.not($checkedHearts).removeClass('active');
    $('.header-fav-icon-container .notify-bullets').html("".concat(localDB.size()))[localDB.size() ? 'removeClass' : 'addClass']('d-none');
  };
  /**
   * Adiciona um determinado SKU na lista de favoritos
   */


  var addSkuToList = function addSkuToList(skuId) {
    var _window$storeThemeSes2;

    // verificar se usuário está autenticado
    if ((_window$storeThemeSes2 = window.storeThemeSessionUserIsAuthData) !== null && _window$storeThemeSes2 !== void 0 && _window$storeThemeSes2.UserId) {
      localDB.add({
        skuId: skuId
      });
      syncLocalStorage('WRITE');
      return;
    } // se não está, forçar abrir o modal de login, e após o login, adicionar o SKU na lista


    var $link = $('[data-action="open-modal-login"]:eq(0)');

    if ($link.length) {
      $link.trigger('click'); // abre o modal de login
    } else {
      window.vtexid.start();
    }

    $window.one('ProductFavorites.ready', function () {
      addSkuToList(skuId);
    });
  };
  /**
   * Remove um determinado SKU da lista de favoritos
   */


  var removeSkuToList = function removeSkuToList(skuId) {
    var _window$storeThemeSes3;

    // verificar se usuário está autenticado,
    if ((_window$storeThemeSes3 = window.storeThemeSessionUserIsAuthData) !== null && _window$storeThemeSes3 !== void 0 && _window$storeThemeSes3.UserId) {
      localDB.remove(skuId);
      syncLocalStorage('WRITE');
    } // se não estiver autenticado, não faz nada.

  };
  /**
   * Verifica se o SKU está na lista  o não e toma a decisão se vai adicionar ou remover o SKU da lista
   * @param skuId
   */


  var veryAndPopulateListWithSkuId = function veryAndPopulateListWithSkuId(skuId) {
    if (localDB.inList(skuId)) {
      return removeSkuToList(skuId);
    }

    return addSkuToList(skuId);
  };
  /**
   * Função de dá início a leitura de dados salvos no MasterData e atualiza os storages locais
   */


  var startLocalDBFromMasterData = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      var _window$storeThemeSes4;

      var _window$storeThemeSes5;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!((_window$storeThemeSes4 = window.storeThemeSessionUserIsAuthData) !== null && _window$storeThemeSes4 !== void 0 && _window$storeThemeSes4.UserId)) {
                _context3.next = 6;
                break;
              }

              // console.info(`Iniciado sincroniza de produtos Favoritos para o usuário autenticado`);
              localStorageKey = "".concat(localStorageKey).concat((_window$storeThemeSes5 = window.storeThemeSessionUserIsAuthData) === null || _window$storeThemeSes5 === void 0 ? void 0 : _window$storeThemeSes5.UserId);
              _context3.next = 4;
              return syncStorages('READ');

            case 4:
              libReady = true;
              $window.trigger('ProductFavorites.ready');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function startLocalDBFromMasterData() {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Triggers de eventos
   */


  var triggers = function triggers() {
    // $document.on('click', '[data-action="faveriteSku"]', (event) => {
    $document.on('click', '.wishlist-button', function (event) {
      var $heart = $(event.currentTarget);
      var skuId; // if, product page

      if ($heart.hasClass('fav-product')) {
        var _window$skuJson2, _window$skuJson2$skus, _window$skuJson2$skus2;

        skuId = (_window$skuJson2 = window.skuJson) === null || _window$skuJson2 === void 0 ? void 0 : (_window$skuJson2$skus = _window$skuJson2.skus) === null || _window$skuJson2$skus === void 0 ? void 0 : (_window$skuJson2$skus2 = _window$skuJson2$skus[0]) === null || _window$skuJson2$skus2 === void 0 ? void 0 : _window$skuJson2$skus2.sku;
      } else {
        skuId = $heart.closest('[data-track-shelf-sid]').attr('data-track-shelf-sid');
      }

      skuId && veryAndPopulateListWithSkuId(skuId);
    });
  };

  var init = function init() {
    // verificar se usuário está autenticado
    // se sim, buscar informações do MasterData e sobrescrever os valores do localDB
    triggers();
    localDB.on('change', function () {
      return updateHeartIcons();
    });
    $window.on('shelf.newItemsLoaded', function () {
      return updateHeartIcons();
    });
    $document.ajaxStop(function () {
      return updateHeartIcons();
    }); // Vtex sempre realiza verificação se o usuário está autenticado. Usamos um filtro no Ajax logo no topo do arquivo para aproveitar e eliminar um request

    if (window.storeThemeSessionUserIsAuthData !== undefined) {
      // já verificou que o usuário está autenticado
      startLocalDBFromMasterData();
    } else {
      //aguardar o evento que indica que o usuário está autenticado ou não.
      $window.on('storeThemeSessionUserIsAuthData', startLocalDBFromMasterData);
    }

    return {
      isReady: function isReady() {
        return libReady;
      },
      getLocalDB: function getLocalDB() {
        return localDB;
      }
    };
  };

  return init();
};

var productFavorites = ProductFavorites();
Object.assign(window.storeTheme, {
  widgets: Object.assign(window.storeTheme.widgets || {}, {
    productFavorites: productFavorites
  })
});
var _default = productFavorites;
exports["default"] = _default;

/***/ }),

/***/ "./src/assets/scripts/lazyload.ts":
/*!****************************************!*\
  !*** ./src/assets/scripts/lazyload.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

__webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");

__webpack_require__(/*! lazysizes/plugins/unveilhooks/ls.unveilhooks */ "./node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js");

window.lazySizes.cfg.expand = -380;

if (document.addEventListener) {
  document.addEventListener('lazybeforeunveil', function (e) {
    if (e.detail.instance != window.lazySizes) {
      return;
    }

    if (!e.defaultPrevented) {
      var code = e.target.getAttribute('data-lazyload-script');

      if (e.target.classList.contains('lazyload-children') || e.target.classList.contains('lazyload-noscript')) {
        var _e$target$children;

        e.target.classList.remove('lazyload-children', 'lazyload-noscript');

        if ((_e$target$children = e.target.children) !== null && _e$target$children !== void 0 && _e$target$children.length) {
          Array.from(e.target.children).forEach(function (child) {
            if ((child === null || child === void 0 ? void 0 : child.tagName) === 'NOSCRIPT') {
              var div = document.createElement('div');
              div.innerHTML = child.innerText.trim().replace(/<\!--.*?-->/g, '');
              child.replaceWith.apply(child, (0, _toConsumableArray2.default)(div.childNodes));
            }
          });
        }
      }

      if (code) {
        e.detail.firesLoad = false;

        try {
          setTimeout(function () {
            var fn = eval(code);

            if (typeof fn === 'function') {
              fn(e.target);
            }
          }, 10);
        } catch (e) {
          console.error('🔴 lazyload-script', e);
        }
      }

      window.lazySizes.fire(e.target, '_lazyloaded', {}, true, true);
    }
  });
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/***/ (function(module) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/***/ (function(module) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/***/ (function(module) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ (function(module) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ (function(module) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/***/ (function(module) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/***/ (function(module) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/***/ (function(module) {

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/***/ (function(module) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/***/ (function(module) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/base-component.js":
/*!**********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/base-component.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory(__webpack_require__(/*! ./dom/data.js */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./dom/event-handler.js */ "./node_modules/bootstrap/js/dist/dom/event-handler.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./dom/data */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function (Data, EventHandler) {
  'use strict';

  var _interopDefaultLegacy = function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      "default": e
    };
  };

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);

  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var MILLISECONDS_MULTIPLIER = 1000;
  var TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0;
    } // Get transition-duration of the element


    var _window$getComputedSt = window.getComputedStyle(element),
        transitionDuration = _window$getComputedSt.transitionDuration,
        transitionDelay = _window$getComputedSt.transitionDelay;

    var floatTransitionDuration = Number.parseFloat(transitionDuration);
    var floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    } // If multiple durations are defined, take the first


    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
  };

  var triggerTransitionEnd = function triggerTransitionEnd(element) {
    element.dispatchEvent(new Event(TRANSITION_END));
  };

  var isElement = function isElement(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function getElement(obj) {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  var execute = function execute(callback) {
    if (typeof callback === 'function') {
      callback();
    }
  };

  var executeAfterTransition = function executeAfterTransition(callback, transitionElement) {
    var waitForTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!waitForTransition) {
      execute(callback);
      return;
    }

    var durationPadding = 5;
    var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
    var called = false;

    var handler = function handler(_ref) {
      var target = _ref.target;

      if (target !== transitionElement) {
        return;
      }

      called = true;
      transitionElement.removeEventListener(TRANSITION_END, handler);
      execute(callback);
    };

    transitionElement.addEventListener(TRANSITION_END, handler);
    setTimeout(function () {
      if (!called) {
        triggerTransitionEnd(transitionElement);
      }
    }, emulatedDuration);
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): base-component.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var VERSION = '5.1.3';

  var BaseComponent = /*#__PURE__*/function () {
    function BaseComponent(element) {
      _classCallCheck(this, BaseComponent);

      element = getElement(element);

      if (!element) {
        return;
      }

      this._element = element;
      Data__default["default"].set(this._element, this.constructor.DATA_KEY, this);
    }

    _createClass(BaseComponent, [{
      key: "dispose",
      value: function dispose() {
        var _this = this;

        Data__default["default"].remove(this._element, this.constructor.DATA_KEY);
        EventHandler__default["default"].off(this._element, this.constructor.EVENT_KEY);
        Object.getOwnPropertyNames(this).forEach(function (propertyName) {
          _this[propertyName] = null;
        });
      }
    }, {
      key: "_queueCallback",
      value: function _queueCallback(callback, element) {
        var isAnimated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        executeAfterTransition(callback, element, isAnimated);
      }
      /** Static */

    }], [{
      key: "getInstance",
      value: function getInstance(element) {
        return Data__default["default"].get(getElement(element), this.DATA_KEY);
      }
    }, {
      key: "getOrCreateInstance",
      value: function getOrCreateInstance(element) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.getInstance(element) || new this(element, _typeof(config) === 'object' ? config : null);
      }
    }, {
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "NAME",
      get: function get() {
        throw new Error('You have to implement the static method "NAME", for each component!');
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return "bs.".concat(this.NAME);
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return ".".concat(this.DATA_KEY);
      }
    }]);

    return BaseComponent;
  }();

  return BaseComponent;
});

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/collapse.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/collapse.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory(__webpack_require__(/*! ./dom/data.js */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./dom/event-handler.js */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./dom/manipulator.js */ "./node_modules/bootstrap/js/dist/dom/manipulator.js"), __webpack_require__(/*! ./dom/selector-engine.js */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./base-component.js */ "./node_modules/bootstrap/js/dist/base-component.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./dom/data */ "./node_modules/bootstrap/js/dist/dom/data.js"), __webpack_require__(/*! ./dom/event-handler */ "./node_modules/bootstrap/js/dist/dom/event-handler.js"), __webpack_require__(/*! ./dom/manipulator */ "./node_modules/bootstrap/js/dist/dom/manipulator.js"), __webpack_require__(/*! ./dom/selector-engine */ "./node_modules/bootstrap/js/dist/dom/selector-engine.js"), __webpack_require__(/*! ./base-component */ "./node_modules/bootstrap/js/dist/base-component.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function (Data, EventHandler, Manipulator, SelectorEngine, BaseComponent) {
  'use strict';

  var _interopDefaultLegacy = function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      "default": e
    };
  };

  var Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);

  var EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

  var Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

  var SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);

  var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "".concat(obj);
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  var getSelector = function getSelector(element) {
    var selector = element.getAttribute('data-bs-target');

    if (!selector || selector === '#') {
      var hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
      // `document.querySelector` will rightfully complain it is invalid.
      // See https://github.com/twbs/bootstrap/issues/32273

      if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
        return null;
      } // Just in case some CMS puts out a full URL with the anchor appended


      if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
        hrefAttr = "#".concat(hrefAttr.split('#')[1]);
      }

      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
    }

    return selector;
  };

  var getSelectorFromElement = function getSelectorFromElement(element) {
    var selector = getSelector(element);

    if (selector) {
      return document.querySelector(selector) ? selector : null;
    }

    return null;
  };

  var getElementFromSelector = function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? document.querySelector(selector) : null;
  };

  var isElement = function isElement(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var getElement = function getElement(obj) {
    if (isElement(obj)) {
      // it's a jQuery object or a node element
      return obj.jquery ? obj[0] : obj;
    }

    if (typeof obj === 'string' && obj.length > 0) {
      return document.querySelector(obj);
    }

    return null;
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError("".concat(componentName.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
      }
    });
  };
  /**
   * Trick to restart an element's animation
   *
   * @param {HTMLElement} element
   * @return void
   *
   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
   */


  var reflow = function reflow(element) {
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight;
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  var DOMContentLoadedCallbacks = [];

  var onDOMContentLoaded = function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
      // add listener on the first call when the document is in loading state
      if (!DOMContentLoadedCallbacks.length) {
        document.addEventListener('DOMContentLoaded', function () {
          DOMContentLoadedCallbacks.forEach(function (callback) {
            return callback();
          });
        });
      }

      DOMContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };

  var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
    onDOMContentLoaded(function () {
      var $ = getjQuery();
      /* istanbul ignore if */

      if ($) {
        var name = plugin.NAME;
        var JQUERY_NO_CONFLICT = $.fn[name];
        $.fn[name] = plugin.jQueryInterface;
        $.fn[name].Constructor = plugin;

        $.fn[name].noConflict = function () {
          $.fn[name] = JQUERY_NO_CONFLICT;
          return plugin.jQueryInterface;
        };
      }
    });
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var NAME = 'collapse';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = ".".concat(DATA_KEY);
  var DATA_API_KEY = '.data-api';
  var Default = {
    toggle: true,
    parent: null
  };
  var DefaultType = {
    toggle: 'boolean',
    parent: '(null|element)'
  };
  var EVENT_SHOW = "show".concat(EVENT_KEY);
  var EVENT_SHOWN = "shown".concat(EVENT_KEY);
  var EVENT_HIDE = "hide".concat(EVENT_KEY);
  var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
  var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY).concat(DATA_API_KEY);
  var CLASS_NAME_SHOW = 'show';
  var CLASS_NAME_COLLAPSE = 'collapse';
  var CLASS_NAME_COLLAPSING = 'collapsing';
  var CLASS_NAME_COLLAPSED = 'collapsed';
  var CLASS_NAME_DEEPER_CHILDREN = ":scope .".concat(CLASS_NAME_COLLAPSE, " .").concat(CLASS_NAME_COLLAPSE);
  var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
  var WIDTH = 'width';
  var HEIGHT = 'height';
  var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
  var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = /*#__PURE__*/function (_BaseComponent__defau) {
    _inherits(Collapse, _BaseComponent__defau);

    var _super = _createSuper(Collapse);

    function Collapse(element, config) {
      var _this;

      _classCallCheck(this, Collapse);

      _this = _super.call(this, element);
      _this._isTransitioning = false;
      _this._config = _this._getConfig(config);
      _this._triggerArray = [];
      var toggleList = SelectorEngine__default["default"].find(SELECTOR_DATA_TOGGLE);

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = getSelectorFromElement(elem);
        var filterElement = SelectorEngine__default["default"].find(selector).filter(function (foundElem) {
          return foundElem === _this._element;
        });

        if (selector !== null && filterElement.length) {
          _this._selector = selector;

          _this._triggerArray.push(elem);
        }
      }

      _this._initializeChildren();

      if (!_this._config.parent) {
        _this._addAriaAndCollapsedClass(_this._triggerArray, _this._isShown());
      }

      if (_this._config.toggle) {
        _this.toggle();
      }

      return _this;
    } // Getters


    _createClass(Collapse, [{
      key: "toggle",
      value: // Public
      function toggle() {
        if (this._isShown()) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: "show",
      value: function show() {
        var _this2 = this;

        if (this._isTransitioning || this._isShown()) {
          return;
        }

        var actives = [];
        var activesData;

        if (this._config.parent) {
          var children = SelectorEngine__default["default"].find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
          actives = SelectorEngine__default["default"].find(SELECTOR_ACTIVES, this._config.parent).filter(function (elem) {
            return !children.includes(elem);
          }); // remove children if greater depth
        }

        var container = SelectorEngine__default["default"].findOne(this._selector);

        if (actives.length) {
          var tempActiveData = actives.find(function (elem) {
            return container !== elem;
          });
          activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = EventHandler__default["default"].trigger(this._element, EVENT_SHOW);

        if (startEvent.defaultPrevented) {
          return;
        }

        actives.forEach(function (elemActive) {
          if (container !== elemActive) {
            Collapse.getOrCreateInstance(elemActive, {
              toggle: false
            }).hide();
          }

          if (!activesData) {
            Data__default["default"].set(elemActive, DATA_KEY, null);
          }
        });

        var dimension = this._getDimension();

        this._element.classList.remove(CLASS_NAME_COLLAPSE);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.style[dimension] = 0;

        this._addAriaAndCollapsedClass(this._triggerArray, true);

        this._isTransitioning = true;

        var complete = function complete() {
          _this2._isTransitioning = false;

          _this2._element.classList.remove(CLASS_NAME_COLLAPSING);

          _this2._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

          _this2._element.style[dimension] = '';
          EventHandler__default["default"].trigger(_this2._element, EVENT_SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll".concat(capitalizedDimension);

        this._queueCallback(complete, this._element, true);

        this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
      }
    }, {
      key: "hide",
      value: function hide() {
        var _this3 = this;

        if (this._isTransitioning || !this._isShown()) {
          return;
        }

        var startEvent = EventHandler__default["default"].trigger(this._element, EVENT_HIDE);

        if (startEvent.defaultPrevented) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
        reflow(this._element);

        this._element.classList.add(CLASS_NAME_COLLAPSING);

        this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);

        var triggerArrayLength = this._triggerArray.length;

        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var elem = getElementFromSelector(trigger);

          if (elem && !this._isShown(elem)) {
            this._addAriaAndCollapsedClass([trigger], false);
          }
        }

        this._isTransitioning = true;

        var complete = function complete() {
          _this3._isTransitioning = false;

          _this3._element.classList.remove(CLASS_NAME_COLLAPSING);

          _this3._element.classList.add(CLASS_NAME_COLLAPSE);

          EventHandler__default["default"].trigger(_this3._element, EVENT_HIDDEN);
        };

        this._element.style[dimension] = '';

        this._queueCallback(complete, this._element, true);
      }
    }, {
      key: "_isShown",
      value: function _isShown() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._element;
        return element.classList.contains(CLASS_NAME_SHOW);
      } // Private

    }, {
      key: "_getConfig",
      value: function _getConfig(config) {
        config = _objectSpread(_objectSpread(_objectSpread({}, Default), Manipulator__default["default"].getDataAttributes(this._element)), config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        config.parent = getElement(config.parent);
        typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: "_getDimension",
      value: function _getDimension() {
        return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
      }
    }, {
      key: "_initializeChildren",
      value: function _initializeChildren() {
        var _this4 = this;

        if (!this._config.parent) {
          return;
        }

        var children = SelectorEngine__default["default"].find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
        SelectorEngine__default["default"].find(SELECTOR_DATA_TOGGLE, this._config.parent).filter(function (elem) {
          return !children.includes(elem);
        }).forEach(function (element) {
          var selected = getElementFromSelector(element);

          if (selected) {
            _this4._addAriaAndCollapsedClass([element], _this4._isShown(selected));
          }
        });
      }
    }, {
      key: "_addAriaAndCollapsedClass",
      value: function _addAriaAndCollapsedClass(triggerArray, isOpen) {
        if (!triggerArray.length) {
          return;
        }

        triggerArray.forEach(function (elem) {
          if (isOpen) {
            elem.classList.remove(CLASS_NAME_COLLAPSED);
          } else {
            elem.classList.add(CLASS_NAME_COLLAPSED);
          }

          elem.setAttribute('aria-expanded', isOpen);
        });
      } // Static

    }], [{
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME;
      }
    }, {
      key: "jQueryInterface",
      value: function jQueryInterface(config) {
        return this.each(function () {
          var _config = {};

          if (typeof config === 'string' && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          var data = Collapse.getOrCreateInstance(this, _config);

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"".concat(config, "\""));
            }

            data[config]();
          }
        });
      }
    }]);

    return Collapse;
  }(BaseComponent__default["default"]);
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler__default["default"].on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
      event.preventDefault();
    }

    var selector = getSelectorFromElement(this);
    var selectorElements = SelectorEngine__default["default"].find(selector);
    selectorElements.forEach(function (element) {
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .Collapse to jQuery only if jQuery is present
   */

  defineJQueryPlugin(Collapse);
  return Collapse;
});

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/data.js":
/*!****************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/data.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function () {
  'use strict';
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var elementMap = new Map();
  var data = {
    set: function set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }

      var instanceMap = elementMap.get(element); // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used

      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
        return;
      }

      instanceMap.set(key, instance);
    },
    get: function get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }

      return null;
    },
    remove: function remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }

      var instanceMap = elementMap.get(element);
      instanceMap["delete"](key); // free up element references if there are no instances left for an element

      if (instanceMap.size === 0) {
        elementMap["delete"](element);
      }
    }
  };
  return data;
});

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/event-handler.js":
/*!*************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/event-handler.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function () {
  'use strict';
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
      return jQuery;
    }

    return null;
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/event-handler.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */


  var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
  var stripNameRegex = /\..*/;
  var stripUidRegex = /::\d+$/;
  var eventRegistry = {}; // Events storage

  var uidEvent = 1;
  var customEvents = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };
  var customEventsRegex = /^(mouseenter|mouseleave)/i;
  var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
  /**
   * ------------------------------------------------------------------------
   * Private methods
   * ------------------------------------------------------------------------
   */

  function getUidEvent(element, uid) {
    return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
  }

  function getEvent(element) {
    var uid = getUidEvent(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }

  function bootstrapHandler(element, fn) {
    return function handler(event) {
      event.delegateTarget = element;

      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }

      return fn.apply(element, [event]);
    };
  }

  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      var domElements = element.querySelectorAll(selector);

      for (var target = event.target; target && target !== this; target = target.parentNode) {
        for (var i = domElements.length; i--;) {
          if (domElements[i] === target) {
            event.delegateTarget = target;

            if (handler.oneOff) {
              EventHandler.off(element, event.type, selector, fn);
            }

            return fn.apply(target, [event]);
          }
        }
      } // To please ESLint


      return null;
    };
  }

  function findHandler(events, handler) {
    var delegationSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var uidEventList = Object.keys(events);

    for (var i = 0, len = uidEventList.length; i < len; i++) {
      var event = events[uidEventList[i]];

      if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
        return event;
      }
    }

    return null;
  }

  function normalizeParams(originalTypeEvent, handler, delegationFn) {
    var delegation = typeof handler === 'string';
    var originalHandler = delegation ? delegationFn : handler;
    var typeEvent = getTypeEvent(originalTypeEvent);
    var isNative = nativeEvents.has(typeEvent);

    if (!isNative) {
      typeEvent = originalTypeEvent;
    }

    return [delegation, originalHandler, typeEvent];
  }

  function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    if (!handler) {
      handler = delegationFn;
      delegationFn = null;
    } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
    // this prevents the handler from being dispatched the same way as mouseover or mouseout does


    if (customEventsRegex.test(originalTypeEvent)) {
      var wrapFn = function wrapFn(fn) {
        return function (event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn.call(this, event);
          }
        };
      };

      if (delegationFn) {
        delegationFn = wrapFn(delegationFn);
      } else {
        handler = wrapFn(handler);
      }
    }

    var _normalizeParams = normalizeParams(originalTypeEvent, handler, delegationFn),
        _normalizeParams2 = _slicedToArray(_normalizeParams, 3),
        delegation = _normalizeParams2[0],
        originalHandler = _normalizeParams2[1],
        typeEvent = _normalizeParams2[2];

    var events = getEvent(element);
    var handlers = events[typeEvent] || (events[typeEvent] = {});
    var previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

    if (previousFn) {
      previousFn.oneOff = previousFn.oneOff && oneOff;
      return;
    }

    var uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
    var fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
    fn.delegationSelector = delegation ? handler : null;
    fn.originalHandler = originalHandler;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, delegation);
  }

  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    var fn = findHandler(events[typeEvent], handler, delegationSelector);

    if (!fn) {
      return;
    }

    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }

  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    var storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(function (handlerKey) {
      if (handlerKey.includes(namespace)) {
        var event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  }

  function getTypeEvent(event) {
    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
    event = event.replace(stripNameRegex, '');
    return customEvents[event] || event;
  }

  var EventHandler = {
    on: function on(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, false);
    },
    one: function one(element, event, handler, delegationFn) {
      addHandler(element, event, handler, delegationFn, true);
    },
    off: function off(element, originalTypeEvent, handler, delegationFn) {
      if (typeof originalTypeEvent !== 'string' || !element) {
        return;
      }

      var _normalizeParams3 = normalizeParams(originalTypeEvent, handler, delegationFn),
          _normalizeParams4 = _slicedToArray(_normalizeParams3, 3),
          delegation = _normalizeParams4[0],
          originalHandler = _normalizeParams4[1],
          typeEvent = _normalizeParams4[2];

      var inNamespace = typeEvent !== originalTypeEvent;
      var events = getEvent(element);
      var isNamespace = originalTypeEvent.startsWith('.');

      if (typeof originalHandler !== 'undefined') {
        // Simplest case: handler is passed, remove that listener ONLY.
        if (!events || !events[typeEvent]) {
          return;
        }

        removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
        return;
      }

      if (isNamespace) {
        Object.keys(events).forEach(function (elementEvent) {
          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
        });
      }

      var storeElementEvent = events[typeEvent] || {};
      Object.keys(storeElementEvent).forEach(function (keyHandlers) {
        var handlerKey = keyHandlers.replace(stripUidRegex, '');

        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
          var event = storeElementEvent[keyHandlers];
          removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
        }
      });
    },
    trigger: function trigger(element, event, args) {
      if (typeof event !== 'string' || !element) {
        return null;
      }

      var $ = getjQuery();
      var typeEvent = getTypeEvent(event);
      var inNamespace = event !== typeEvent;
      var isNative = nativeEvents.has(typeEvent);
      var jQueryEvent;
      var bubbles = true;
      var nativeDispatch = true;
      var defaultPrevented = false;
      var evt = null;

      if (inNamespace && $) {
        jQueryEvent = $.Event(event, args);
        $(element).trigger(jQueryEvent);
        bubbles = !jQueryEvent.isPropagationStopped();
        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
        defaultPrevented = jQueryEvent.isDefaultPrevented();
      }

      if (isNative) {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent(typeEvent, bubbles, true);
      } else {
        evt = new CustomEvent(event, {
          bubbles: bubbles,
          cancelable: true
        });
      } // merge custom information in our event


      if (typeof args !== 'undefined') {
        Object.keys(args).forEach(function (key) {
          Object.defineProperty(evt, key, {
            get: function get() {
              return args[key];
            }
          });
        });
      }

      if (defaultPrevented) {
        evt.preventDefault();
      }

      if (nativeDispatch) {
        element.dispatchEvent(evt);
      }

      if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
        jQueryEvent.preventDefault();
      }

      return evt;
    }
  };
  return EventHandler;
});

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/manipulator.js":
/*!***********************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/manipulator.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function () {
  'use strict';
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/manipulator.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  function normalizeData(val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    if (val === Number(val).toString()) {
      return Number(val);
    }

    if (val === '' || val === 'null') {
      return null;
    }

    return val;
  }

  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, function (chr) {
      return "-".concat(chr.toLowerCase());
    });
  }

  var Manipulator = {
    setDataAttribute: function setDataAttribute(element, key, value) {
      element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
    },
    removeDataAttribute: function removeDataAttribute(element, key) {
      element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
    },
    getDataAttributes: function getDataAttributes(element) {
      if (!element) {
        return {};
      }

      var attributes = {};
      Object.keys(element.dataset).filter(function (key) {
        return key.startsWith('bs');
      }).forEach(function (key) {
        var pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      });
      return attributes;
    },
    getDataAttribute: function getDataAttribute(element, key) {
      return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
    },
    offset: function offset(element) {
      var rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
    },
    position: function position(element) {
      return {
        top: element.offsetTop,
        left: element.offsetLeft
      };
    }
  };
  return Manipulator;
});

/***/ }),

/***/ "./node_modules/bootstrap/js/dist/dom/selector-engine.js":
/*!***************************************************************!*\
  !*** ./node_modules/bootstrap/js/dist/dom/selector-engine.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  ( false ? 0 : _typeof(exports)) === 'object' && "object" !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
})(this, function () {
  'use strict';
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  var isElement = function isElement(obj) {
    if (!obj || _typeof(obj) !== 'object') {
      return false;
    }

    if (typeof obj.jquery !== 'undefined') {
      obj = obj[0];
    }

    return typeof obj.nodeType !== 'undefined';
  };

  var isVisible = function isVisible(element) {
    if (!isElement(element) || element.getClientRects().length === 0) {
      return false;
    }

    return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  };

  var isDisabled = function isDisabled(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
      return true;
    }

    if (element.classList.contains('disabled')) {
      return true;
    }

    if (typeof element.disabled !== 'undefined') {
      return element.disabled;
    }

    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  };
  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.1.3): dom/selector-engine.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */


  var NODE_TEXT = 3;
  var SelectorEngine = {
    find: function find(selector) {
      var _ref;

      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
      return (_ref = []).concat.apply(_ref, _toConsumableArray(Element.prototype.querySelectorAll.call(element, selector)));
    },
    findOne: function findOne(selector) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
      return Element.prototype.querySelector.call(element, selector);
    },
    children: function children(element, selector) {
      var _ref2;

      return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(element.children)).filter(function (child) {
        return child.matches(selector);
      });
    },
    parents: function parents(element, selector) {
      var parents = [];
      var ancestor = element.parentNode;

      while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
        if (ancestor.matches(selector)) {
          parents.push(ancestor);
        }

        ancestor = ancestor.parentNode;
      }

      return parents;
    },
    prev: function prev(element, selector) {
      var previous = element.previousElementSibling;

      while (previous) {
        if (previous.matches(selector)) {
          return [previous];
        }

        previous = previous.previousElementSibling;
      }

      return [];
    },
    next: function next(element, selector) {
      var next = element.nextElementSibling;

      while (next) {
        if (next.matches(selector)) {
          return [next];
        }

        next = next.nextElementSibling;
      }

      return [];
    },
    focusableChildren: function focusableChildren(element) {
      var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) {
        return "".concat(selector, ":not([tabindex^=\"-\"])");
      }).join(', ');
      return this.find(focusables, element).filter(function (el) {
        return !isDisabled(el) && isVisible(el);
      });
    }
  };
  return SelectorEngine;
});

/***/ }),

/***/ "./node_modules/glider-js/glider.js":
/*!******************************************!*\
  !*** ./node_modules/glider-js/glider.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/

/* global define */
(function (factory) {
   true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : 0;
})(function () {
  'use strict'; // eslint-disable-line no-unused-expressions

  /* globals window:true */


  var _window = typeof window !== 'undefined' ? window : this;

  var Glider = _window.Glider = function (element, settings) {
    var _ = this;

    if (element._glider) return element._glider;
    _.ele = element;

    _.ele.classList.add('glider'); // expose glider object to its DOM element


    _.ele._glider = _; // merge user setting with defaults

    _.opt = Object.assign({}, {
      slidesToScroll: 1,
      slidesToShow: 1,
      resizeLock: true,
      duration: 0.5,
      // easeInQuad
      easing: function easing(x, t, b, c, d) {
        return c * (t /= d) * t + b;
      }
    }, settings); // set defaults

    _.animate_id = _.page = _.slide = 0;
    _.arrows = {}; // preserve original options to
    // extend breakpoint settings

    _._opt = _.opt;

    if (_.opt.skipTrack) {
      // first and only child is the track
      _.track = _.ele.children[0];
    } else {
      // create track and wrap slides
      _.track = document.createElement('div');

      _.ele.appendChild(_.track);

      while (_.ele.children.length !== 1) {
        _.track.appendChild(_.ele.children[0]);
      }
    }

    _.track.classList.add('glider-track'); // start glider


    _.init(); // set events


    _.resize = _.init.bind(_, true);

    _.event(_.ele, 'add', {
      scroll: _.updateControls.bind(_)
    });

    _.event(_window, 'add', {
      resize: _.resize
    });
  };

  var gliderPrototype = Glider.prototype;

  gliderPrototype.init = function (refresh, paging) {
    var _ = this;

    var width = 0;
    var height = 0;
    _.slides = _.track.children;
    [].forEach.call(_.slides, function (_, i) {
      _.classList.add('glider-slide');

      _.setAttribute('data-gslide', i);
    });
    _.containerWidth = _.ele.clientWidth;

    var breakpointChanged = _.settingsBreakpoint();

    if (!paging) paging = breakpointChanged;

    if (_.opt.slidesToShow === 'auto' || typeof _.opt._autoSlide !== 'undefined') {
      var slideCount = _.containerWidth / _.opt.itemWidth;
      _.opt._autoSlide = _.opt.slidesToShow = _.opt.exactWidth ? slideCount : Math.max(1, Math.floor(slideCount));
    }

    if (_.opt.slidesToScroll === 'auto') {
      _.opt.slidesToScroll = Math.floor(_.opt.slidesToShow);
    }

    _.itemWidth = _.opt.exactWidth ? _.opt.itemWidth : _.containerWidth / _.opt.slidesToShow; // set slide dimensions

    [].forEach.call(_.slides, function (__) {
      __.style.height = 'auto';
      __.style.width = _.itemWidth + 'px';
      width += _.itemWidth;
      height = Math.max(__.offsetHeight, height);
    });
    _.track.style.width = width + 'px';
    _.trackWidth = width;
    _.isDrag = false;
    _.preventClick = false;
    _.opt.resizeLock && _.scrollTo(_.slide * _.itemWidth, 0);

    if (breakpointChanged || paging) {
      _.bindArrows();

      _.buildDots();

      _.bindDrag();
    }

    _.updateControls();

    _.emit(refresh ? 'refresh' : 'loaded');
  };

  gliderPrototype.bindDrag = function () {
    var _ = this;

    _.mouse = _.mouse || _.handleMouse.bind(_);

    var mouseup = function mouseup() {
      _.mouseDown = undefined;

      _.ele.classList.remove('drag');

      if (_.isDrag) {
        _.preventClick = true;
      }

      _.isDrag = false;
    };

    var events = {
      mouseup: mouseup,
      mouseleave: mouseup,
      mousedown: function mousedown(e) {
        e.preventDefault();
        e.stopPropagation();
        _.mouseDown = e.clientX;

        _.ele.classList.add('drag');
      },
      mousemove: _.mouse,
      click: function click(e) {
        if (_.preventClick) {
          e.preventDefault();
          e.stopPropagation();
        }

        _.preventClick = false;
      }
    };

    _.ele.classList.toggle('draggable', _.opt.draggable === true);

    _.event(_.ele, 'remove', events);

    if (_.opt.draggable) _.event(_.ele, 'add', events);
  };

  gliderPrototype.buildDots = function () {
    var _ = this;

    if (!_.opt.dots) {
      if (_.dots) _.dots.innerHTML = '';
      return;
    }

    if (typeof _.opt.dots === 'string') {
      _.dots = document.querySelector(_.opt.dots);
    } else _.dots = _.opt.dots;

    if (!_.dots) return;
    _.dots.innerHTML = '';

    _.dots.classList.add('glider-dots');

    for (var i = 0; i < Math.ceil(_.slides.length / _.opt.slidesToShow); ++i) {
      var dot = document.createElement('button');
      dot.dataset.index = i;
      dot.setAttribute('aria-label', 'Page ' + (i + 1));
      dot.setAttribute('role', 'tab');
      dot.className = 'glider-dot ' + (i ? '' : 'active');

      _.event(dot, 'add', {
        click: _.scrollItem.bind(_, i, true)
      });

      _.dots.appendChild(dot);
    }
  };

  gliderPrototype.bindArrows = function () {
    var _ = this;

    if (!_.opt.arrows) {
      Object.keys(_.arrows).forEach(function (direction) {
        var element = _.arrows[direction];

        _.event(element, 'remove', {
          click: element._func
        });
      });
      return;
    }

    ['prev', 'next'].forEach(function (direction) {
      var arrow = _.opt.arrows[direction];

      if (arrow) {
        if (typeof arrow === 'string') arrow = document.querySelector(arrow);

        if (arrow) {
          arrow._func = arrow._func || _.scrollItem.bind(_, direction);

          _.event(arrow, 'remove', {
            click: arrow._func
          });

          _.event(arrow, 'add', {
            click: arrow._func
          });

          _.arrows[direction] = arrow;
        }
      }
    });
  };

  gliderPrototype.updateControls = function (event) {
    var _ = this;

    if (event && !_.opt.scrollPropagate) {
      event.stopPropagation();
    }

    var disableArrows = _.containerWidth >= _.trackWidth;

    if (!_.opt.rewind) {
      if (_.arrows.prev) {
        _.arrows.prev.classList.toggle('disabled', _.ele.scrollLeft <= 0 || disableArrows);

        _.arrows.prev.classList.contains('disabled') ? _.arrows.prev.setAttribute('aria-disabled', true) : _.arrows.prev.setAttribute('aria-disabled', false);
      }

      if (_.arrows.next) {
        _.arrows.next.classList.toggle('disabled', Math.ceil(_.ele.scrollLeft + _.containerWidth) >= Math.floor(_.trackWidth) || disableArrows);

        _.arrows.next.classList.contains('disabled') ? _.arrows.next.setAttribute('aria-disabled', true) : _.arrows.next.setAttribute('aria-disabled', false);
      }
    }

    _.slide = Math.round(_.ele.scrollLeft / _.itemWidth);
    _.page = Math.round(_.ele.scrollLeft / _.containerWidth);
    var middle = _.slide + Math.floor(Math.floor(_.opt.slidesToShow) / 2);
    var extraMiddle = Math.floor(_.opt.slidesToShow) % 2 ? 0 : middle + 1;

    if (Math.floor(_.opt.slidesToShow) === 1) {
      extraMiddle = 0;
    } // the last page may be less than one half of a normal page width so
    // the page is rounded down. when at the end, force the page to turn


    if (_.ele.scrollLeft + _.containerWidth >= Math.floor(_.trackWidth)) {
      _.page = _.dots ? _.dots.children.length - 1 : 0;
    }

    [].forEach.call(_.slides, function (slide, index) {
      var slideClasses = slide.classList;
      var wasVisible = slideClasses.contains('visible');
      var start = _.ele.scrollLeft;
      var end = _.ele.scrollLeft + _.containerWidth;
      var itemStart = _.itemWidth * index;
      var itemEnd = itemStart + _.itemWidth;
      [].forEach.call(slideClasses, function (className) {
        /^left|right/.test(className) && slideClasses.remove(className);
      });
      slideClasses.toggle('active', _.slide === index);

      if (middle === index || extraMiddle && extraMiddle === index) {
        slideClasses.add('center');
      } else {
        slideClasses.remove('center');
        slideClasses.add([index < middle ? 'left' : 'right', Math.abs(index - (index < middle ? middle : extraMiddle || middle))].join('-'));
      }

      var isVisible = Math.ceil(itemStart) >= Math.floor(start) && Math.floor(itemEnd) <= Math.ceil(end);
      slideClasses.toggle('visible', isVisible);

      if (isVisible !== wasVisible) {
        _.emit('slide-' + (isVisible ? 'visible' : 'hidden'), {
          slide: index
        });
      }
    });

    if (_.dots) {
      [].forEach.call(_.dots.children, function (dot, index) {
        dot.classList.toggle('active', _.page === index);
      });
    }

    if (event && _.opt.scrollLock) {
      clearTimeout(_.scrollLock);
      _.scrollLock = setTimeout(function () {
        clearTimeout(_.scrollLock); // dont attempt to scroll less than a pixel fraction - causes looping

        if (Math.abs(_.ele.scrollLeft / _.itemWidth - _.slide) > 0.02) {
          if (!_.mouseDown) {
            // Only scroll if not at the end (#94)
            if (_.trackWidth > _.containerWidth + _.ele.scrollLeft) {
              _.scrollItem(_.getCurrentSlide());
            }
          }
        }
      }, _.opt.scrollLockDelay || 250);
    }
  };

  gliderPrototype.getCurrentSlide = function () {
    var _ = this;

    return _.round(_.ele.scrollLeft / _.itemWidth);
  };

  gliderPrototype.scrollItem = function (slide, dot, e) {
    if (e) e.preventDefault();

    var _ = this;

    var originalSlide = slide;
    ++_.animate_id;

    if (dot === true) {
      slide = slide * _.containerWidth;
      slide = Math.round(slide / _.itemWidth) * _.itemWidth;
    } else {
      if (typeof slide === 'string') {
        var backwards = slide === 'prev'; // use precise location if fractional slides are on

        if (_.opt.slidesToScroll % 1 || _.opt.slidesToShow % 1) {
          slide = _.getCurrentSlide();
        } else {
          slide = _.slide;
        }

        if (backwards) slide -= _.opt.slidesToScroll;else slide += _.opt.slidesToScroll;

        if (_.opt.rewind) {
          var scrollLeft = _.ele.scrollLeft;
          slide = backwards && !scrollLeft ? _.slides.length : !backwards && scrollLeft + _.containerWidth >= Math.floor(_.trackWidth) ? 0 : slide;
        }
      }

      slide = Math.max(Math.min(slide, _.slides.length), 0);
      _.slide = slide;
      slide = _.itemWidth * slide;
    }

    _.scrollTo(slide, _.opt.duration * Math.abs(_.ele.scrollLeft - slide), function () {
      _.updateControls();

      _.emit('animated', {
        value: originalSlide,
        type: typeof originalSlide === 'string' ? 'arrow' : dot ? 'dot' : 'slide'
      });
    });

    return false;
  };

  gliderPrototype.settingsBreakpoint = function () {
    var _ = this;

    var resp = _._opt.responsive;

    if (resp) {
      // Sort the breakpoints in mobile first order
      resp.sort(function (a, b) {
        return b.breakpoint - a.breakpoint;
      });

      for (var i = 0; i < resp.length; ++i) {
        var size = resp[i];

        if (_window.innerWidth >= size.breakpoint) {
          if (_.breakpoint !== size.breakpoint) {
            _.opt = Object.assign({}, _._opt, size.settings);
            _.breakpoint = size.breakpoint;
            return true;
          }

          return false;
        }
      }
    } // set back to defaults in case they were overriden


    var breakpointChanged = _.breakpoint !== 0;
    _.opt = Object.assign({}, _._opt);
    _.breakpoint = 0;
    return breakpointChanged;
  };

  gliderPrototype.scrollTo = function (scrollTarget, scrollDuration, callback) {
    var _ = this;

    var start = new Date().getTime();
    var animateIndex = _.animate_id;

    var animate = function animate() {
      var now = new Date().getTime() - start;
      _.ele.scrollLeft = _.ele.scrollLeft + (scrollTarget - _.ele.scrollLeft) * _.opt.easing(0, now, 0, 1, scrollDuration);

      if (now < scrollDuration && animateIndex === _.animate_id) {
        _window.requestAnimationFrame(animate);
      } else {
        _.ele.scrollLeft = scrollTarget;
        callback && callback.call(_);
      }
    };

    _window.requestAnimationFrame(animate);
  };

  gliderPrototype.removeItem = function (index) {
    var _ = this;

    if (_.slides.length) {
      _.track.removeChild(_.slides[index]);

      _.refresh(true);

      _.emit('remove');
    }
  };

  gliderPrototype.addItem = function (ele) {
    var _ = this;

    _.track.appendChild(ele);

    _.refresh(true);

    _.emit('add');
  };

  gliderPrototype.handleMouse = function (e) {
    var _ = this;

    if (_.mouseDown) {
      _.isDrag = true;
      _.ele.scrollLeft += (_.mouseDown - e.clientX) * (_.opt.dragVelocity || 3.3);
      _.mouseDown = e.clientX;
    }
  }; // used to round to the nearest 0.XX fraction


  gliderPrototype.round = function (_double) {
    var _ = this;

    var step = _.opt.slidesToScroll % 1 || 1;
    var inv = 1.0 / step;
    return Math.round(_double * inv) / inv;
  };

  gliderPrototype.refresh = function (paging) {
    var _ = this;

    _.init(true, paging);
  };

  gliderPrototype.setOption = function (opt, global) {
    var _ = this;

    if (_.breakpoint && !global) {
      _._opt.responsive.forEach(function (v) {
        if (v.breakpoint === _.breakpoint) {
          v.settings = Object.assign({}, v.settings, opt);
        }
      });
    } else {
      _._opt = Object.assign({}, _._opt, opt);
    }

    _.breakpoint = 0;

    _.settingsBreakpoint();
  };

  gliderPrototype.destroy = function () {
    var _ = this;

    var replace = _.ele.cloneNode(true);

    var clear = function clear(ele) {
      ele.removeAttribute('style');
      [].forEach.call(ele.classList, function (className) {
        /^glider/.test(className) && ele.classList.remove(className);
      });
    }; // remove track


    replace.children[0].outerHTML = replace.children[0].innerHTML;
    clear(replace);
    [].forEach.call(replace.getElementsByTagName('*'), clear);

    _.ele.parentNode.replaceChild(replace, _.ele);

    _.event(_window, 'remove', {
      resize: _.resize
    });

    _.emit('destroy');
  };

  gliderPrototype.emit = function (name, arg) {
    var _ = this;

    var e = new _window.CustomEvent('glider-' + name, {
      bubbles: !_.opt.eventPropagate,
      detail: arg
    });

    _.ele.dispatchEvent(e);
  };

  gliderPrototype.event = function (ele, type, args) {
    var eventHandler = ele[type + 'EventListener'].bind(ele);
    Object.keys(args).forEach(function (k) {
      eventHandler(k, args[k]);
    });
  };

  return Glider;
});

/***/ }),

/***/ "./node_modules/lazysizes/lazysizes.js":
/*!*********************************************!*\
  !*** ./node_modules/lazysizes/lazysizes.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (window, factory) {
  var lazySizes = factory(window, window.document, Date);
  window.lazySizes = lazySizes;

  if (( false ? 0 : _typeof(module)) == 'object' && module.exports) {
    module.exports = lazySizes;
  }
})(typeof window != 'undefined' ? window : {},
/**
 * import("./types/global")
 * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
 */
function l(window, document, Date) {
  // Pass in the window Date function also for SSR because the Date class can be lost
  'use strict';
  /*jshint eqnull:true */

  var lazysizes,
  /**
   * @type { LazySizesConfigPartial }
   */
  lazySizesCfg;

  (function () {
    var prop;
    var lazySizesDefaults = {
      lazyClass: 'lazyload',
      loadedClass: 'lazyloaded',
      loadingClass: 'lazyloading',
      preloadClass: 'lazypreload',
      errorClass: 'lazyerror',
      //strictClass: 'lazystrict',
      autosizesClass: 'lazyautosizes',
      fastLoadedClass: 'ls-is-cached',
      iframeLoadMode: 0,
      srcAttr: 'data-src',
      srcsetAttr: 'data-srcset',
      sizesAttr: 'data-sizes',
      //preloadAfterLoad: false,
      minSize: 40,
      customMedia: {},
      init: true,
      expFactor: 1.5,
      hFac: 0.8,
      loadMode: 2,
      loadHidden: true,
      ricTimeout: 0,
      throttleDelay: 125
    };
    lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

    for (prop in lazySizesDefaults) {
      if (!(prop in lazySizesCfg)) {
        lazySizesCfg[prop] = lazySizesDefaults[prop];
      }
    }
  })();

  if (!document || !document.getElementsByClassName) {
    return {
      init: function init() {},

      /**
       * @type { LazySizesConfigPartial }
       */
      cfg: lazySizesCfg,

      /**
       * @type { true }
       */
      noSupport: true
    };
  }

  var docElem = document.documentElement;
  var supportPicture = window.HTMLPictureElement;
  var _addEventListener = 'addEventListener';
  var _getAttribute = 'getAttribute';
  /**
   * Update to bind to window because 'this' becomes null during SSR
   * builds.
   */

  var addEventListener = window[_addEventListener].bind(window);

  var setTimeout = window.setTimeout;
  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
  var requestIdleCallback = window.requestIdleCallback;
  var regPicture = /^picture$/i;
  var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];
  var regClassCache = {};
  var forEach = Array.prototype.forEach;
  /**
   * @param ele {Element}
   * @param cls {string}
   */

  var hasClass = function hasClass(ele, cls) {
    if (!regClassCache[cls]) {
      regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    }

    return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
  };
  /**
   * @param ele {Element}
   * @param cls {string}
   */


  var addClass = function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
    }
  };
  /**
   * @param ele {Element}
   * @param cls {string}
   */


  var removeClass = function removeClass(ele, cls) {
    var reg;

    if (reg = hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
    }
  };

  var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
    var action = add ? _addEventListener : 'removeEventListener';

    if (add) {
      addRemoveLoadEvents(dom, fn);
    }

    loadEvents.forEach(function (evt) {
      dom[action](evt, fn);
    });
  };
  /**
   * @param elem { Element }
   * @param name { string }
   * @param detail { any }
   * @param noBubbles { boolean }
   * @param noCancelable { boolean }
   * @returns { CustomEvent }
   */


  var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
    var event = document.createEvent('Event');

    if (!detail) {
      detail = {};
    }

    detail.instance = lazysizes;
    event.initEvent(name, !noBubbles, !noCancelable);
    event.detail = detail;
    elem.dispatchEvent(event);
    return event;
  };

  var updatePolyfill = function updatePolyfill(el, full) {
    var polyfill;

    if (!supportPicture && (polyfill = window.picturefill || lazySizesCfg.pf)) {
      if (full && full.src && !el[_getAttribute]('srcset')) {
        el.setAttribute('srcset', full.src);
      }

      polyfill({
        reevaluate: true,
        elements: [el]
      });
    } else if (full && full.src) {
      el.src = full.src;
    }
  };

  var getCSS = function getCSS(elem, style) {
    return (getComputedStyle(elem, null) || {})[style];
  };
  /**
   *
   * @param elem { Element }
   * @param parent { Element }
   * @param [width] {number}
   * @returns {number}
   */


  var getWidth = function getWidth(elem, parent, width) {
    width = width || elem.offsetWidth;

    while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
      width = parent.offsetWidth;
      parent = parent.parentNode;
    }

    return width;
  };

  var rAF = function () {
    var running, waiting;
    var firstFns = [];
    var secondFns = [];
    var fns = firstFns;

    var run = function run() {
      var runFns = fns;
      fns = firstFns.length ? secondFns : firstFns;
      running = true;
      waiting = false;

      while (runFns.length) {
        runFns.shift()();
      }

      running = false;
    };

    var rafBatch = function rafBatch(fn, queue) {
      if (running && !queue) {
        fn.apply(this, arguments);
      } else {
        fns.push(fn);

        if (!waiting) {
          waiting = true;
          (document.hidden ? setTimeout : requestAnimationFrame)(run);
        }
      }
    };

    rafBatch._lsFlush = run;
    return rafBatch;
  }();

  var rAFIt = function rAFIt(fn, simple) {
    return simple ? function () {
      rAF(fn);
    } : function () {
      var that = this;
      var args = arguments;
      rAF(function () {
        fn.apply(that, args);
      });
    };
  };

  var throttle = function throttle(fn) {
    var running;
    var lastTime = 0;
    var gDelay = lazySizesCfg.throttleDelay;
    var rICTimeout = lazySizesCfg.ricTimeout;

    var run = function run() {
      running = false;
      lastTime = Date.now();
      fn();
    };

    var idleCallback = requestIdleCallback && rICTimeout > 49 ? function () {
      requestIdleCallback(run, {
        timeout: rICTimeout
      });

      if (rICTimeout !== lazySizesCfg.ricTimeout) {
        rICTimeout = lazySizesCfg.ricTimeout;
      }
    } : rAFIt(function () {
      setTimeout(run);
    }, true);
    return function (isPriority) {
      var delay;

      if (isPriority = isPriority === true) {
        rICTimeout = 33;
      }

      if (running) {
        return;
      }

      running = true;
      delay = gDelay - (Date.now() - lastTime);

      if (delay < 0) {
        delay = 0;
      }

      if (isPriority || delay < 9) {
        idleCallback();
      } else {
        setTimeout(idleCallback, delay);
      }
    };
  }; //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html


  var debounce = function debounce(func) {
    var timeout, timestamp;
    var wait = 99;

    var run = function run() {
      timeout = null;
      func();
    };

    var later = function later() {
      var last = Date.now() - timestamp;

      if (last < wait) {
        setTimeout(later, wait - last);
      } else {
        (requestIdleCallback || run)(run);
      }
    };

    return function () {
      timestamp = Date.now();

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  };

  var loader = function () {
    var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
    var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
    var regImg = /^img$/i;
    var regIframe = /^iframe$/i;
    var supportScroll = 'onscroll' in window && !/(gle|ing)bot/.test(navigator.userAgent);
    var shrinkExpand = 0;
    var currentExpand = 0;
    var isLoading = 0;
    var lowRuns = -1;

    var resetPreloading = function resetPreloading(e) {
      isLoading--;

      if (!e || isLoading < 0 || !e.target) {
        isLoading = 0;
      }
    };

    var isVisible = function isVisible(elem) {
      if (isBodyHidden == null) {
        isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
      }

      return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
    };

    var isNestedVisible = function isNestedVisible(elem, elemExpand) {
      var outerRect;
      var parent = elem;
      var visible = isVisible(elem);
      eLtop -= elemExpand;
      eLbottom += elemExpand;
      eLleft -= elemExpand;
      eLright += elemExpand;

      while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
        visible = (getCSS(parent, 'opacity') || 1) > 0;

        if (visible && getCSS(parent, 'overflow') != 'visible') {
          outerRect = parent.getBoundingClientRect();
          visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
        }
      }

      return visible;
    };

    var checkElements = function checkElements() {
      var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
      var lazyloadElems = lazysizes.elements;

      if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
        i = 0;
        lowRuns++;

        for (; i < eLlen; i++) {
          if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
            continue;
          }

          if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
            unveilElement(lazyloadElems[i]);
            continue;
          }

          if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
            elemExpand = currentExpand;
          }

          if (!defaultExpand) {
            defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
            lazysizes._defEx = defaultExpand;
            preloadExpand = defaultExpand * lazySizesCfg.expFactor;
            hFac = lazySizesCfg.hFac;
            isBodyHidden = null;

            if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
              currentExpand = preloadExpand;
              lowRuns = 0;
            } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
              currentExpand = defaultExpand;
            } else {
              currentExpand = shrinkExpand;
            }
          }

          if (beforeExpandVal !== elemExpand) {
            eLvW = innerWidth + elemExpand * hFac;
            elvH = innerHeight + elemExpand;
            elemNegativeExpand = elemExpand * -1;
            beforeExpandVal = elemExpand;
          }

          rect = lazyloadElems[i].getBoundingClientRect();

          if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
            unveilElement(lazyloadElems[i]);
            loadedSomething = true;

            if (isLoading > 9) {
              break;
            }
          } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto'))) {
            autoLoadElem = preloadElems[0] || lazyloadElems[i];
          }
        }

        if (autoLoadElem && !loadedSomething) {
          unveilElement(autoLoadElem);
        }
      }
    };

    var throttledCheckElements = throttle(checkElements);

    var switchLoadingClass = function switchLoadingClass(e) {
      var elem = e.target;

      if (elem._lazyCache) {
        delete elem._lazyCache;
        return;
      }

      resetPreloading(e);
      addClass(elem, lazySizesCfg.loadedClass);
      removeClass(elem, lazySizesCfg.loadingClass);
      addRemoveLoadEvents(elem, rafSwitchLoadingClass);
      triggerEvent(elem, 'lazyloaded');
    };

    var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);

    var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
      rafedSwitchLoadingClass({
        target: e.target
      });
    };

    var changeIframeSrc = function changeIframeSrc(elem, src) {
      var loadMode = elem.getAttribute('data-load-mode') || lazySizesCfg.iframeLoadMode; // loadMode can be also a string!

      if (loadMode == 0) {
        elem.contentWindow.location.replace(src);
      } else if (loadMode == 1) {
        elem.src = src;
      }
    };

    var handleSources = function handleSources(source) {
      var customMedia;

      var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

      if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
        source.setAttribute('media', customMedia);
      }

      if (sourceSrcset) {
        source.setAttribute('srcset', sourceSrcset);
      }
    };

    var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
      var src, srcset, parent, isPicture, event, firesLoad;

      if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {
        if (sizes) {
          if (isAuto) {
            addClass(elem, lazySizesCfg.autosizesClass);
          } else {
            elem.setAttribute('sizes', sizes);
          }
        }

        srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
        src = elem[_getAttribute](lazySizesCfg.srcAttr);

        if (isImg) {
          parent = elem.parentNode;
          isPicture = parent && regPicture.test(parent.nodeName || '');
        }

        firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);
        event = {
          target: elem
        };
        addClass(elem, lazySizesCfg.loadingClass);

        if (firesLoad) {
          clearTimeout(resetPreloadingTimer);
          resetPreloadingTimer = setTimeout(resetPreloading, 2500);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
        }

        if (isPicture) {
          forEach.call(parent.getElementsByTagName('source'), handleSources);
        }

        if (srcset) {
          elem.setAttribute('srcset', srcset);
        } else if (src && !isPicture) {
          if (regIframe.test(elem.nodeName)) {
            changeIframeSrc(elem, src);
          } else {
            elem.src = src;
          }
        }

        if (isImg && (srcset || isPicture)) {
          updatePolyfill(elem, {
            src: src
          });
        }
      }

      if (elem._lazyRace) {
        delete elem._lazyRace;
      }

      removeClass(elem, lazySizesCfg.lazyClass);
      rAF(function () {
        // Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
        var isLoaded = elem.complete && elem.naturalWidth > 1;

        if (!firesLoad || isLoaded) {
          if (isLoaded) {
            addClass(elem, lazySizesCfg.fastLoadedClass);
          }

          switchLoadingClass(event);
          elem._lazyCache = true;
          setTimeout(function () {
            if ('_lazyCache' in elem) {
              delete elem._lazyCache;
            }
          }, 9);
        }

        if (elem.loading == 'lazy') {
          isLoading--;
        }
      }, true);
    });
    /**
     *
     * @param elem { Element }
     */

    var unveilElement = function unveilElement(elem) {
      if (elem._lazyRace) {
        return;
      }

      var detail;
      var isImg = regImg.test(elem.nodeName); //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")

      var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));

      var isAuto = sizes == 'auto';

      if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
        return;
      }

      detail = triggerEvent(elem, 'lazyunveilread').detail;

      if (isAuto) {
        autoSizer.updateElem(elem, true, elem.offsetWidth);
      }

      elem._lazyRace = true;
      isLoading++;
      lazyUnveil(elem, detail, isAuto, sizes, isImg);
    };

    var afterScroll = debounce(function () {
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
    });

    var altLoadmodeScrollListner = function altLoadmodeScrollListner() {
      if (lazySizesCfg.loadMode == 3) {
        lazySizesCfg.loadMode = 2;
      }

      afterScroll();
    };

    var onload = function onload() {
      if (isCompleted) {
        return;
      }

      if (Date.now() - started < 999) {
        setTimeout(onload, 999);
        return;
      }

      isCompleted = true;
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
      addEventListener('scroll', altLoadmodeScrollListner, true);
    };

    return {
      _: function _() {
        started = Date.now();
        lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
        preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);
        addEventListener('scroll', throttledCheckElements, true);
        addEventListener('resize', throttledCheckElements, true);
        addEventListener('pageshow', function (e) {
          if (e.persisted) {
            var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

            if (loadingElements.length && loadingElements.forEach) {
              requestAnimationFrame(function () {
                loadingElements.forEach(function (img) {
                  if (img.complete) {
                    unveilElement(img);
                  }
                });
              });
            }
          }
        });

        if (window.MutationObserver) {
          new MutationObserver(throttledCheckElements).observe(docElem, {
            childList: true,
            subtree: true,
            attributes: true
          });
        } else {
          docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);

          docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);

          setInterval(throttledCheckElements, 999);
        }

        addEventListener('hashchange', throttledCheckElements, true); //, 'fullscreenchange'

        ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function (name) {
          document[_addEventListener](name, throttledCheckElements, true);
        });

        if (/d$|^c/.test(document.readyState)) {
          onload();
        } else {
          addEventListener('load', onload);

          document[_addEventListener]('DOMContentLoaded', throttledCheckElements);

          setTimeout(onload, 20000);
        }

        if (lazysizes.elements.length) {
          checkElements();

          rAF._lsFlush();
        } else {
          throttledCheckElements();
        }
      },
      checkElems: throttledCheckElements,
      unveil: unveilElement,
      _aLSL: altLoadmodeScrollListner
    };
  }();

  var autoSizer = function () {
    var autosizesElems;
    var sizeElement = rAFIt(function (elem, parent, event, width) {
      var sources, i, len;
      elem._lazysizesWidth = width;
      width += 'px';
      elem.setAttribute('sizes', width);

      if (regPicture.test(parent.nodeName || '')) {
        sources = parent.getElementsByTagName('source');

        for (i = 0, len = sources.length; i < len; i++) {
          sources[i].setAttribute('sizes', width);
        }
      }

      if (!event.detail.dataAttr) {
        updatePolyfill(elem, event.detail);
      }
    });
    /**
     *
     * @param elem {Element}
     * @param dataAttr
     * @param [width] { number }
     */

    var getSizeElement = function getSizeElement(elem, dataAttr, width) {
      var event;
      var parent = elem.parentNode;

      if (parent) {
        width = getWidth(elem, parent, width);
        event = triggerEvent(elem, 'lazybeforesizes', {
          width: width,
          dataAttr: !!dataAttr
        });

        if (!event.defaultPrevented) {
          width = event.detail.width;

          if (width && width !== elem._lazysizesWidth) {
            sizeElement(elem, parent, event, width);
          }
        }
      }
    };

    var updateElementsSizes = function updateElementsSizes() {
      var i;
      var len = autosizesElems.length;

      if (len) {
        i = 0;

        for (; i < len; i++) {
          getSizeElement(autosizesElems[i]);
        }
      }
    };

    var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
    return {
      _: function _() {
        autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
        addEventListener('resize', debouncedUpdateElementsSizes);
      },
      checkElems: debouncedUpdateElementsSizes,
      updateElem: getSizeElement
    };
  }();

  var init = function init() {
    if (!init.i && document.getElementsByClassName) {
      init.i = true;

      autoSizer._();

      loader._();
    }
  };

  setTimeout(function () {
    if (lazySizesCfg.init) {
      init();
    }
  });
  lazysizes = {
    /**
     * @type { LazySizesConfigPartial }
     */
    cfg: lazySizesCfg,
    autoSizer: autoSizer,
    loader: loader,
    init: init,
    uP: updatePolyfill,
    aC: addClass,
    rC: removeClass,
    hC: hasClass,
    fire: triggerEvent,
    gW: getWidth,
    rAF: rAF
  };
  return lazysizes;
});

/***/ }),

/***/ "./node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js":
/*!**********************************************************************!*\
  !*** ./node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
This plugin extends lazySizes to lazyLoad:
background images, videos/posters and scripts

Background-Image:
For background images, use data-bg attribute:
<div class="lazyload" data-bg="bg-img.jpg"></div>

 Video:
 For video/audio use data-poster and preload="none":
 <video class="lazyload" preload="none" data-poster="poster.jpg" src="src.mp4">
 <!-- sources -->
 </video>

 For video that plays automatically if in view:
 <video
	class="lazyload"
	preload="none"
	muted=""
	data-autoplay=""
	data-poster="poster.jpg"
	src="src.mp4">
</video>

 Scripts:
 For scripts use data-script:
 <div class="lazyload" data-script="module-name.js"></div>


 Script modules using require:
 For modules using require use data-require:
 <div class="lazyload" data-require="module-name"></div>
*/
(function (window, factory) {
  var globalInstall = function globalInstall() {
    factory(window.lazySizes);
    window.removeEventListener('lazyunveilread', globalInstall, true);
  };

  factory = factory.bind(null, window, window.document);

  if (( false ? 0 : _typeof(module)) == 'object' && module.exports) {
    factory(__webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js"));
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function (window, document, lazySizes) {
  /*jshint eqnull:true */
  'use strict';

  var bgLoad, regBgUrlEscape;
  var uniqueUrls = {};

  if (document.addEventListener) {
    regBgUrlEscape = /\(|\)|\s|'/;

    bgLoad = function bgLoad(url, cb) {
      var img = document.createElement('img');

      img.onload = function () {
        img.onload = null;
        img.onerror = null;
        img = null;
        cb();
      };

      img.onerror = img.onload;
      img.src = url;

      if (img && img.complete && img.onload) {
        img.onload();
      }
    };

    addEventListener('lazybeforeunveil', function (e) {
      if (e.detail.instance != lazySizes) {
        return;
      }

      var tmp, load, bg, poster;

      if (!e.defaultPrevented) {
        var target = e.target;

        if (target.preload == 'none') {
          target.preload = target.getAttribute('data-preload') || 'auto';
        }

        if (target.getAttribute('data-autoplay') != null) {
          if (target.getAttribute('data-expand') && !target.autoplay) {
            try {
              target.play();
            } catch (er) {}
          } else {
            requestAnimationFrame(function () {
              target.setAttribute('data-expand', '-10');
              lazySizes.aC(target, lazySizes.cfg.lazyClass);
            });
          }
        }

        tmp = target.getAttribute('data-link');

        if (tmp) {
          addStyleScript(tmp, true);
        } // handle data-script


        tmp = target.getAttribute('data-script');

        if (tmp) {
          e.detail.firesLoad = true;

          load = function load() {
            e.detail.firesLoad = false;
            lazySizes.fire(target, '_lazyloaded', {}, true, true);
          };

          addStyleScript(tmp, null, load);
        } // handle data-require


        tmp = target.getAttribute('data-require');

        if (tmp) {
          if (lazySizes.cfg.requireJs) {
            lazySizes.cfg.requireJs([tmp]);
          } else {
            addStyleScript(tmp);
          }
        } // handle data-bg


        bg = target.getAttribute('data-bg');

        if (bg) {
          e.detail.firesLoad = true;

          load = function load() {
            target.style.backgroundImage = 'url(' + (regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg) + ')';
            e.detail.firesLoad = false;
            lazySizes.fire(target, '_lazyloaded', {}, true, true);
          };

          bgLoad(bg, load);
        } // handle data-poster


        poster = target.getAttribute('data-poster');

        if (poster) {
          e.detail.firesLoad = true;

          load = function load() {
            target.poster = poster;
            e.detail.firesLoad = false;
            lazySizes.fire(target, '_lazyloaded', {}, true, true);
          };

          bgLoad(poster, load);
        }
      }
    }, false);
  }

  function addStyleScript(src, style, cb) {
    if (uniqueUrls[src]) {
      return;
    }

    var elem = document.createElement(style ? 'link' : 'script');
    var insertElem = document.getElementsByTagName('script')[0];

    if (style) {
      elem.rel = 'stylesheet';
      elem.href = src;
    } else {
      elem.onload = function () {
        elem.onerror = null;
        elem.onload = null;
        cb();
      };

      elem.onerror = elem.onload;
      elem.src = src;
    }

    uniqueUrls[src] = true;
    uniqueUrls[elem.src || elem.href] = true;
    insertElem.parentNode.insertBefore(elem, insertElem);
  }
});

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? 0 : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************************************!*\
  !*** ./src/assets/files/checkout6-custom.ts ***!
  \**********************************************/


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

__webpack_require__(/*! bootstrap/js/dist/collapse */ "./node_modules/bootstrap/js/dist/collapse.js");

__webpack_require__(/*! ../scripts/helpers/storage */ "./src/assets/scripts/helpers/storage.ts");

__webpack_require__(/*! ../scripts/helpers/vtex-masterdata */ "./src/assets/scripts/helpers/vtex-masterdata.ts");

__webpack_require__(/*! ../scripts/layout/productFavorites */ "./src/assets/scripts/layout/productFavorites.ts");

__webpack_require__(/*! ../scripts/lazyload */ "./src/assets/scripts/lazyload.ts");

var _birthDate = __webpack_require__(/*! ../scripts/helpers/birthDate */ "./src/assets/scripts/helpers/birthDate.ts");

var _slider = _interopRequireDefault(__webpack_require__(/*! ../scripts/helpers/slider */ "./src/assets/scripts/helpers/slider.ts"));

(function () {
  var s = document.createElement('script');
  s.setAttribute('data-account', 'MibcZ2vAzA');
  s.setAttribute('src', 'https://cdn.userway.org/widget.js');
  document.body.appendChild(s);
})();

function fetchCollection() {
  return _fetchCollection.apply(this, arguments);
}

function _fetchCollection() {
  _fetchCollection = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var endpoint, _data$, response, data;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            endpoint = "/api/dataentities/SH/search?_fields=collection";
            _context2.prev = 1;
            _context2.next = 4;
            return fetch(endpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
            });

          case 4:
            response = _context2.sent;

            if (response.ok) {
              _context2.next = 7;
              break;
            }

            throw new Error("Erro na requisi\xE7\xE3o: ".concat(response.status, " - ").concat(response.statusText));

          case 7:
            _context2.next = 9;
            return response.json();

          case 9:
            data = _context2.sent;
            return _context2.abrupt("return", (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.collection);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](1);
            console.error('Erro ao buscar coleções:', _context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));
  return _fetchCollection.apply(this, arguments);
}

(function () {
  var handle = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var collectionId, templateId, url, response, $html, options, $shelf, updateAddToCartBtn;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetchCollection();

            case 2:
              collectionId = _context.sent;
              templateId = '23f5815c-e791-4fea-a15a-1b20bf4c0c31';

              if (collectionId) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              url = "/busca?fq=H:".concat(collectionId, "&sl=").concat(templateId, "&PS=50");
              _context.next = 9;
              return fetch(url);

            case 9:
              _context.next = 11;
              return _context.sent.text();

            case 11:
              response = _context.sent;
              $html = $(response).find('.shelf.track-shelf').find('ul').first();
              options = {
                skipTrack: true,
                arrows: true,
                itemWidth: 255,
                slidesToShow: 4,
                dots: true,
                responsive: [{
                  breakpoint: 320,
                  settings: {
                    slidesToShow: 1.3,
                    itemWidth: 210,
                    exactWidth: true
                  }
                }, {
                  breakpoint: 375,
                  settings: {
                    slidesToShow: 1.6
                  }
                }, {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1.9
                  }
                }, {
                  breakpoint: 540,
                  settings: {
                    slidesToShow: 2.2
                  }
                }, {
                  breakpoint: 620,
                  settings: {
                    slidesToShow: 2.6
                  }
                }, {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    itemWidth: 280
                  }
                }, {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    itemWidth: 280
                  }
                }, {
                  breakpoint: 1365,
                  settings: {
                    slidesToShow: 4,
                    itemWidth: 280
                  }
                }]
              };
              $shelf = $('<div>', {
                class: 'shelf-container row shelf'
              });

              updateAddToCartBtn = function updateAddToCartBtn() {
                $html.find('.lgn-shelf-product').each(function (_, e) {
                  $(e).find('.view-product').addClass('d-none');
                  var $cartLinkWrapper = $(e).find('.view-product-add-to-cart-wrapper');
                  var $cartLink = $cartLinkWrapper.find('.buy-button-normal a');
                  $cartLink.addClass('btn btn-outline-primary btn-lg w-100 mt-2 mt-lg-1 mb-lg-1 view-product');
                  $cartLinkWrapper.removeClass('d-none');
                });
              };

              if (!($('.shelf-container').length > 0)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return");

            case 18:
              updateAddToCartBtn();
              $shelf.html($html);
              $html.wrap('<div class="shelf-slider"> </div>');
              $shelf.find('.helperComplement').remove();
              $('.checkout-container').append($shelf);
              $('.view-product').text('ADICIONAR À SACOLA');
              $('.shelf-body').addClass('product-buy-btn');
              setTimeout(function () {
                (0, _slider.default)('.shelf-slider', options);
                $(window).trigger('shelf.newItemsLoaded');
              }, 100);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handle() {
      return _ref.apply(this, arguments);
    };
  }();

  fetch('/no-cache/profileSystem/getProfile').then(function (r) {
    return r.json();
  }).then(function (data) {
    window.storeThemeSessionUserIsAuthData = data;
    $(window).trigger('storeThemeSessionUserIsAuthData');
  });
  handle();
})();

(function () {
  var modal = $('.modal.fade:not(.show)');
  var width = modal.width();
  modal.css("left: calc((100vw - ".concat(width, ") / 2);"));
})();

(function () {
  $(window).on('scroll', function () {
    //page width
    var pageWidth = $(window).width() || 0;
    var adjust = pageWidth >= 992 ? 15 : 62;

    if (pageWidth > 979) {
      var _$$position;

      // Distance from top of base element to top of document
      var distanceTop = ((_$$position = $('.shelf-container.row.shelf').position()) === null || _$$position === void 0 ? void 0 : _$$position.top) - adjust; // sidebar height

      var sidebarHeight = getHeightOfSidebar(); // Distance user has scrolled from top of document

      var scrollDistanceFromTopOfDoc = $(document).scrollTop() || 0; // Difference between the two.

      var scrollDistanceFromTopOfFooter = scrollDistanceFromTopOfDoc - distanceTop;
      $('.cart-fixed.cart-fixed-transition').css('height', sidebarHeight); // If user has scrolled further than footer,
      // pull sidebar up using a negative margin.

      if (scrollDistanceFromTopOfDoc > distanceTop) {
        $('.cart-fixed.cart-fixed-transition').css('height', sidebarHeight);
        $('.cart-fixed.cart-fixed-transition').css('margin-top', 0 - scrollDistanceFromTopOfFooter);
      } else {
        $('.cart-fixed.cart-fixed-transition').css('height', sidebarHeight);
        $('.cart-fixed.cart-fixed-transition').css('margin-top', 0);
      }
    }
  });
})();

var getHeightOfSidebar = function getHeightOfSidebar() {
  // list of elements to include in sidebar height
  var elements = $('.cart-fixed.cart-fixed-transition > *'); // default sidebar height

  var totalHeight = 0; // loop through each element and add height to total

  elements.each(function (index, element) {
    // if element has id 'go-to-cart-button' then doesn't add to height
    if (element.id === 'go-to-cart-button') {
      totalHeight += 0;
    } else {
      var elementHeight = $(element).height() || 0;
      totalHeight += elementHeight;
    }
  }); // return total height

  return totalHeight;
};

// Função para calcular o valor dos itens
function getItemsValue(totalizers) {
  var totalizerItems = totalizers.find(function (item) {
    return item.id === 'Items';
  });
  return totalizerItems ? totalizerItems.value : 0;
} // Função para calcular o valor dos descontos


function getDiscountValue(totalizers) {
  var totalizerDiscounts = totalizers.find(function (item) {
    return item.id === 'Discounts';
  });

  if (totalizerDiscounts) {
    var discountValue = totalizerDiscounts.value.toString().split('-')[1];
    return discountValue ? parseFloat(discountValue) : 0;
  }

  return 0;
} // Função para calcular o texto da barra de progresso


function getBarText(startMessage, remainingValue) {
  if (startMessage.includes('{XXXX}')) {
    var _startMessage$split = startMessage.split('{XXXX}'),
        _startMessage$split2 = (0, _slicedToArray2.default)(_startMessage$split, 2),
        start = _startMessage$split2[0],
        end = _startMessage$split2[1];

    return start + remainingValue.toFixed(2) + end;
  }

  return '';
} // Funções do freteBar abaixo
// Função para calcular a porcentagem da barra de progresso


function getProgressPercent(currentValue, targetValue) {
  return currentValue / targetValue * 100;
} // Função para atualizar a barra de progresso e o texto


function updateProgressBar(percent, barText, isTargetReached, finalMessage) {
  var progressBar = document.querySelector('.l-frete-fill');
  var progressText = document.querySelector('.l-frete-fill-text');

  if (progressBar) {
    progressBar.style.transition = 'width 1s ease-in-out';
    progressBar.style.width = "".concat(percent, "%");
  }

  if (progressText) {
    progressText.textContent = isTargetReached ? finalMessage : barText;
  }
} // Função principal para criar o termômetro


function createThermometer(thermometer, valueThermometer, orderForm) {
  var targetValue = valueThermometer;
  var isItems = getItemsValue(orderForm.totalizers);
  var isDiscounts = getDiscountValue(orderForm.totalizers);
  var currentValue = isItems - isDiscounts;
  var percent = getProgressPercent(currentValue, targetValue);
  var remainingValue = (targetValue - currentValue) / 100;
  var barText = getBarText(thermometer.startMessage, remainingValue);
  var isTargetReached = currentValue >= targetValue;
  updateProgressBar(percent, barText, isTargetReached, thermometer.finalMessage);
}

var freteBar = function freteBar(orderForm) {
  var freteFillElement = document.querySelector('.l-frete-fill');

  if (freteFillElement !== undefined) {
    fetch('/api/dataentities/TF/search?_fields=fraseTermometro,valueTermometro&status').then(function (r) {
      return r.json();
    }).then(function (jsonBody) {
      var _document$querySelect;

      //removendo loader
      (_document$querySelect = document.querySelector('.loader-frete-free')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.remove();
      createThermometer(JSON.parse(jsonBody[0].fraseTermometro || {}), jsonBody[0].valueTermometro, orderForm);
    }).catch(function (error) {
      console.error('Erro ao buscar os dados:', error);
    });
  }
}; // Funções do freteBar acima


setTimeout(function () {
  freteBar(vtexjs.checkout.orderForm);
  $(window).on('orderFormUpdated.vtex', function (event, orderForm) {
    freteBar(orderForm);
  });
}, 3001);
window.addEventListener('hashchange', function () {
  if (location.hash == '#/profile') {
    (0, _birthDate.insertFieldsForm)();
  }
});
window.addEventListener('hashchange', function () {
  var observer = new MutationObserver(function (obs) {
    var shipComplement = $('#ship-complement');

    if (shipComplement) {
      shipComplement.attr('maxlength', 100);
      return function () {
        obs.disconnect();
      };
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
});
}();
/******/ })()
;
//# sourceMappingURL=checkout6-custom.js.map