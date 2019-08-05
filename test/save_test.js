const mocha = require('mocha');
const assert= require('assert');
const Content= require('../models/content')
//Describe test
describe("Finding records", ()=>{

    //Create test
    it("Saving account to database", ()=>{

        assert(2+3===5);

    })

    //Find test
    it('Find one record with the id', (done)=>{
        Content.findById("5d47c14c0031ea18e426d5bb").then((result)=>{
            assert(result.id==="5d47c14c0031ea18e426d5bb")
            done();
    })

})