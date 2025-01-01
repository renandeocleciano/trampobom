import * as mocha from 'mocha';
import * as chai from 'chai';
import * as td from 'testdouble';
const supertes = require('supertest');

const app = require('../../../src/bootstrap');

const request = supertes;
const expect = chai.expect;
const testDouble = td;

export { app, expect, request, testDouble }
