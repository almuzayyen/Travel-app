
const fetch = require('node-fetch')
const httpMocks = require('node-mocks-http');



describe('test fetch requst ' , () => {
    test('test creat requst', () => {
    const next = jest.fn();
    const req = httpMocks.createRequest({ 
        body: { 
        url: "http://localhost:3000/test"
        }
    });
    const res = httpMocks.createResponse();
    
});
})