const assert = require('assert');

require ('../app');

//  bundles tests for testing
describe('Date formatting tests', () => {
    describe('Test formatting of date entered by user, error variable ', () => {
        it('1.1 should return true when value is not present', () => {
            assert.equal(dateValidate(''), true);
        }); 
        it('1.2 should return true when no / is present', () => {
            assert.equal(dateValidate('1234567890'), true);
        }); 
        it('1.3 should return true when only one / is present index[2]', () => {
            assert.equal(dateValidate('12/4567890'), true);
        }); 
        it('1.4 should return true when only one / is present index[5]', () => {
            assert.equal(dateValidate('12345/7890'), true);
        }); 
        it('1.5 should return true when only one / present anywhere', () => {
            assert.equal(dateValidate('12345/7890'), true);
        });
        it('1.6 should return true when any character present is NOT a number other than /', () => {
            assert.equal(dateValidate('ab/de/ghij'), true);
        });
        it('1.7 should return true if date value is less than 10', () => {
            assert.equal(dateValidate('12347890'), true);
        });
        it('1.8 should return false when / are present at index[2] and index[5] AND no alpha char', () => {
            assert.equal(dateValidate('12/45/7890'), false);
        });
        
        
    }); // ends dateValidate test
}); // end of test bundle