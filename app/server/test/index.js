require('babel-core/register');
const chaiHttp = require('chai-http');
const chai = require('chai');

chai.use(chaiHttp);
global.regeneratorRuntime = require('regenerator-runtime/runtime');

global.chai = chai;
global.expect = chai.expect;