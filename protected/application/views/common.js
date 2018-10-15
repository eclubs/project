var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>', win;

var common_url_base = '/protected/index.php/Csresearch/';

var form_submit_failure_handler = function (form, action) {
  switch (action.failureType) {
    case Ext.form.Action.CLIENT_INVALID:
      Ext.Msg.alert('<span style="color:red">Failure</span>', 'Form entry error');
      break;
    case Ext.form.Action.CONNECT_FAILURE:
      Ext.Msg.alert('<span style="color:red">Failure</span>', 'Connect error');
      break;
    case Ext.form.Action.SERVER_INVALID:
      Ext.Msg.alert('<span style="color:red">Failure</span>', action.result.msg);
      break;
  }
};

var number_to_boolean_renderer = function (val) {
  if (val > 0) {
    return '<span style="color:green;">Yes</span>';
  } else {
    return '<span>No</span>';
  }
};

var projects_store = Ext.create('Ext.data.JsonStore', {
  root: 'projects',
  fields: [
    'id',
    'title',
    'researchfield',
    'secondfield',
    'thirdfield',
    'year',
    'term',
    'compensation_type',
    'url',
    'description',
    'prerequisite',
    'background',
    'capacity',
    'prof_id',
    'creation_time',
    'professor_name',
    'professor_email'
  ],
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_projects',
    reader: {
      type: 'json',
      root: 'projects',
      idProperty: 'id'
    }
  }
});

var all_projects_store = Ext.create('Ext.data.JsonStore', {
  root: 'projects',
  fields: [
    'id',
    'title',
    'researchfield',
    'secondfield',
    'thirdfield',
    'year',
    'term',
    'compensation_type',
    'url',
    'description',
    'prerequisite',
    'background',
    'capacity',
    'prof_id',
    'creation_time',
    'professor_name',
    'professor_email'
  ],
  //autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_all_projects',
    reader: {
      type: 'json',
      root: 'projects',
      idProperty: 'id'
    }
  }
});

var projects_grid_url_column = {
  text: 'URL',
  dataIndex: 'url',
  width: 160,
  renderer: function (value) {
    if (value && (value.indexOf('http://')) != 0) {
      value = 'http://' + value;
    }
    return '<a target="_blank" href="' + value + '">' + value + '</a>';
  }
};

var projects_grid_column = [
  { text: 'Title', dataIndex: 'title', width: 290 },
  { text: 'Professor', dataIndex: 'professor_name', width: 150 },
  { text: 'Research Field', dataIndex: 'researchfield', width: 150 },
  { text: 'School Year', dataIndex: 'year', width: 80 },
  { text: 'School Quarter', dataIndex: 'term', width: 80 },
  { text: 'Compensation Type', dataIndex: 'compensation_type', width: 120 },
  projects_grid_url_column,
  { text: 'Capacity', dataIndex: 'capacity', tooltip: 'the number of students allowed for this project', width: 50 },
  { text: 'Creation Time', dataIndex: 'creation_time', width: 120 }
];

var assistants_store = Ext.create('Ext.data.JsonStore', {
  root: 'assistants',
  fields: ['id', 'name', 'sunetid', 'type', 'email', 'webpage', 'interestarea', 'major', 'gpa', 'graduating', 'majorwhen', 'coterm', 'year', 'transcript', 'resume', 'matched', 'admin', 'assistantto', 'fac_id', 'assign_time'],
  //autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_assistants',
    reader: {
      type: 'json',
      root: 'assistants',
      idProperty: 'id'
    }
  }
});

var research_fields_data = [
  ['AI'],
  ['Algorithms'],
  ['Architecture & Hardware'],
  ['BioComputation'],
  ['Compilers'],
  ['Databases'],
  ['Distributed Systems'],
  ['Formal Methods and Verification'],
  ['Graphics'],
  ['HCI'],
  ['Networking'],
  ['Operating Systems'],
  ['Programming Languages'],
  ['Robotics'],
  ['Scientific Computing'],
  ['Security'],
  ['Software Engineering'],
  ['Theory of Computation'],
  ['Vision']
];

var research_fields_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['research_field'],
  data: research_fields_data
});

var research_fields_with_none_data = [
  ['None'],
  ['AI'],
  ['Algorithms'],
  ['Architecture & Hardware'],
  ['BioComputation'],
  ['Compilers'],
  ['Databases'],
  ['Distributed Systems'],
  ['Formal Methods and Verification'],
  ['Graphics'],
  ['HCI'],
  ['Networking'],
  ['Operating Systems'],
  ['Programming Languages'],
  ['Robotics'],
  ['Scientific Computing'],
  ['Security'],
  ['Software Engineering'],
  ['Theory of Computation'],
  ['Vision']
];

var research_fields_with_none_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['research_field'],
  data: research_fields_with_none_data
});

var school_year_fields_data = [
  ['2018-2019']
];

var school_year_fields_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['year_field'],
  data: school_year_fields_data
});

var school_year_fields_with_none_data = [
  ['None'],
  ['2018-2019']
];

var school_year_fields_with_none_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['year_field'],
  data: school_year_fields_with_none_data
});


var school_term_fields_data = [
  ['Autumn'],
  ['Winter'],
  ['Spring'],
  ['Summer']
];

var school_term_fields_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['term_field'],
  data: school_term_fields_data
});

var school_term_fields_with_none_data = [
  ['None'],
  ['Autumn'],
  ['Winter'],
  ['Spring'],
  ['Summer']
];

var school_term_fields_with_none_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['term_field'],
  data: school_term_fields_with_none_data
});



var compensation_type_fields_data = [
  ['Academic Credit'],
  ['RAship (stipend)']
];

var compensation_type_fields_store = Ext.create('Ext.data.ArrayStore', {
  fields: ['compensation_type_field'],
  data: compensation_type_fields_data
});



var gender_store = new Ext.data.ArrayStore({
  fields: ['gender'],
  data: [
    ['M'],
    ['F']
  ]
});

var majors_store = new Ext.data.ArrayStore({
  fields: ['major'],
  data: [
    ['CS'],
    ['Symsys'],
    ['EE'],
    ['MCS']
  ]
});

var years_store = new Ext.data.ArrayStore({
  fields: ['year'],
  data: [
    ['Freshman'],
    ['Sophomore'],
    ['Junior'],
    ['Senior'],
    ['Graduate']
  ]
});

var faculty_names_store = new Ext.data.ArrayStore({
  fields: ['name'],
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_faculty_names',
    reader: {
      type: 'array'
    }
  }
});

var faculty_ids_and_names_store = new Ext.data.ArrayStore({
  fields: ['id', 'name'],
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_faculty_ids_and_names',
    reader: {
      type: 'array'
    }
  }
});

var faculties_for_project_store = new Ext.data.ArrayStore({
  fields: ['id', 'name'],
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_professors_for_adding_a_project',
    reader: {
      type: 'array'
    }
  }
});

var page_names_store = new Ext.data.ArrayStore({
  fields: ['view', 'display_name'],
  data: [
    ['landing', 'Landing Page'],
    ['academic_year.home', 'Academic Year Research Student Home'],
    ['academic_year.faq', 'Academic Year Research Student FAQ'],
    ['curis.home', 'CURIS Student Home'],
    ['curis.faq', 'CURIS Student FAQ'],
    ['faculty.home', 'Faculty Home'],
    ['faculty.faq', 'Faculty FAQ']
  ]
});

var student_scores_store = new Ext.data.ArrayStore({
  fields: ['score', 'name'],
  data: [
    [3, '3 - I would love to work on this project'],
    [2, '2 - I like this project'],
    [1, '1 - I would be willing to work on this project']
  ]
});

var faculty_scores_store = new Ext.data.ArrayStore({
  fields: ['score', 'name'],
  data: [
    //[0, '0 - This student is not to be considered'],
    [1, '1 - This student is not to be considered'],
    [2, '2 - This student is qualified and would do fine'],
    [3, '3 - I really want to work with this student']
  ]
});

var my_applications_store = new Ext.data.JsonStore({
  root: 'applications',
  fields: [
    'id',
    'project_id',
    'score',
    'statement',
    'prematch',
    'match',
    'status',
    'title',
    'researchfield',
    'secondfield',
    'thirdfield',
    'url',
    'description',
    'prerequisite',
    'background',
    'capacity',
    'prof_id',
    'creation_time',
    'professor_name',
    'professor_email'
  ],
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_my_applications',
    reader: {
      type: 'json',
      root: 'applications',
      idProperty: 'id'
    }
  }
});

var applications_store = new Ext.data.JsonStore({
  root: 'applications',
  fields: [
    'id',
    'user_id',
    'project_id',
    'score',
    'statement',
    'status',
    'topmatch',
    'prematch',
    'match',
    'fac_rating1',
    'fac_rating2',
    'fac_rating3',
    'fac_topmatch',
    'title',
    'researchfield',
    'secondfield',
    'thirdfield',
    'url',
    'description',
    'prerequisite',
    'background',
    'capacity',
    'prof_id',
    'creation_time',
    'professor_name',
    'professor_email',
    'student_name',
    'student_email'
  ],
  groupField: 'professor_name',
  proxy: {
    type: 'ajax',
    //url: common_url_base + 'get_applications',
    url: common_url_base + 'success_json/null',
    reader: {
      type: 'json',
      root: 'applications',
      idProperty: 'id'
    }
  }
});

var user_type_store = new Ext.data.ArrayStore({
  fields: ['type'],
  data: [
    ['student'],
    ['faculty'],
    ['lecturer']
  ]
});

