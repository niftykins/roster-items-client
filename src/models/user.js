import {Record} from 'immutable';

const User = Record({
	id: null,
	accountId: null,
	battletag: ''
});

class UserWrapper extends User {
	isNew() {
		return !this.id;
	}
}

export default UserWrapper;
