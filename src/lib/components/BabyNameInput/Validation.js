const validate = (fields, errors) => {
	let valid = true;
	//validate baby name
	if (fields.babyName.trim().length > 9) {
		valid = false;
		errors.babyName = 'Unfortunately, we dont suppport names longer than 9 letters at this time.';
	} else if (fields.babyName.trim().length < 1) {
		valid = false;
		errors.babyName = 'You must enter a name for the baby.';
	} else {
		errors.babyName = '';
	}

	if (fields.babyLast.trim().length < 1) {
		valid = false;
		errors.babyLast = 'You must enter a last name for the baby.';
	} else {
		errors.babyLast = '';
	}

	//validate gender
	if (fields.gender === '') {
		valid = false;
		errors.gender = 'You must select a gender.';
	} else {
		errors.gender = '';
	}

	//validate weight
	if (fields.weight) {
		if (fields.lbs === null || fields.oz === null) {
			valid = false;
			errors.weight = 'You must enter both lbs and oz.';
		} else if (fields.lbs > 20 || fields.lbs < 1) {
			valid = false;
			errors.weight = 'You must enter both lbs and oz.';
		} else {
			errors.weight = '';
		}
	}
	return { valid, errors, fields };
};

export default validate;
