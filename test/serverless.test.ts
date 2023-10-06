import { expect } from 'chai';
import 'mocha';
import axios from 'axios';
const BASE_URL = 'http://localhost:9000/dev';

/**/
describe('Endpoint /swapi', () => {
  it('swapi test',  async() => {
    await axios.post(`${BASE_URL}/swapi/people`,{},{headers: { 
      'id': '20'
    }}).then(function (response) {
      expect(response.status).to.equal(200, 'response status 200 SUCESSFUL');
    })
    .catch(function (error)  {
      expect(error).to.not.throw();
    });  
   
  });

});
describe('Endpoint /swapi',  () => {
  it('invalide swapi test', async () => {
    await axios.post(`${BASE_URL}/swapi/people`,{},{headers: {  }})
    .then(function (response) {
      expect(response.status).to.equal(502, 'response status 502');
    })
    .catch(function (error) {
      expect(error.response.status).to.equal(502, 'response status 502');
    });
  });

});

describe('Endpoint /findProduct', () => {
  it('findProduct test', async () => {
    await axios.get(`${BASE_URL}/findProduct`).then(function (response) {
      expect(response.status).to.equal(200, 'response status 200 SUCESSFUL');
    })
    .catch(function (error) {
      expect(error.response.status).to.equal(200, 'response status 200 SUCESSFUL');
    }); 
  });
});
describe('Endpoint /findProduct', () => {
  it('invalidate findProduct test', async () => {
    await axios.get(`${BASE_URL}/findProduc`).then(function (response) {
      expect(response.status).to.equal(404, 'response status 400 BAD REQUEST');
    })
    .catch(function (error) {
      expect(error.response.status).to.equal(404, 'response status 400 BAD REQUEST');
    }); 
  });
});

describe('Endpoint /createProduct', () => {
  it('createProduct test', async () => {
     await axios.post(`${BASE_URL}/createProduct`,{ name:"aaaa", price: 12.3},{})
    .then(function (response) {
      expect(response.status).to.equal(200, 'response status 200 SUCESSFUL');
    })
    .catch(function (error) {
      expect(error.response.status).to.equal(200, 'response status 200 SUCESSFUL');
    });
  });

});
describe('Endpoint /createProduct',  () => {
  it('Invalide createProduct', async () => {
   await axios.post(`${BASE_URL}/createProduct`,{ price: 12.3},{})
   .then(function (response) {
    expect(response.status).to.equal(400, 'response status 400 BAD REQUEST');
    })
    .catch(function (error) {      
      expect(error.response.status).to.equal(400, 'response status 400 BAD REQUEST');
    });  
  });
});
