// for jasmine-node support
if (typeof process !== 'undefined' && process.title && process.title === 'node') { // detect node environment
	var Validator = require('./../src/validator');
}

describe('alpha_num validation rule', function() {
	var validator;
	
	it('should fail with non-alphanumeric characters', function() {
		validator = new Validator({ age: '$' }, { age: 'alpha_num' });
		expect(validator.fails()).toBeTruthy();
		expect(validator.passes()).toBeFalsy();
		expect(validator.errors.first('age')).toEqual('The age field must be alphanumeric.');
	});

	it('should pass with only alphanumeric characters', function() {
		validator = new Validator({ age: 'abc123' }, { age: 'alpha_num' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass with only numeric characters', function() {
		validator = new Validator({ age: 123 }, { age: 'alpha_num' });
		expect(validator.passes()).toBeTruthy();
		expect(validator.fails()).toBeFalsy();
	});

	it('should pass when the field is blank / optional', function() {
		var validator = new Validator({ name: '' }, { name: 'alpha_num' });

		expect(validator.passes()).toBeTruthy();
	});
});