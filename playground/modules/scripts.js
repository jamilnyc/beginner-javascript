// Named export: must be imported with the same name
import { last, returnHi as sayHi } from './utils.js';

// Default export: can be imported with any name
import wes, * as everything from './wes.js';

import { handleButtonClick } from './handlers.js';

const name = 'jamil';
console.log(sayHi(name));
console.log(last);
console.log(wes);
console.log(everything.eat());

const button = document.querySelector('button');
button.addEventListener('click', handleButtonClick);
