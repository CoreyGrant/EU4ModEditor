import _ from 'lodash';

// new - object type function doesn't match used
// overriding - object type function matches used but deep doesnt
// identical - deep matches used

export var advisorType = (base, proj) => base.name == proj.name;
export var advisorHistory = (base, proj) => base.data.advisor_id == proj.data.advisor_id;
export var building = (base, proj) => base.name == proj.name;

export var deep = (base, proj) => base.name == proj.name && _.isEqual(proj.data, base.data)
