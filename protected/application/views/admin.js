// ---------------- Settings Panel ------------------
var admin_settings_form = new Ext.form.Panel({
  title: 'Settings',
  autoScroll: true,
  padding: '0 0 10 0',
  bodyStyle: {padding: '10px'},
  defaults: {
    xtype: 'radiogroup',
    labelWidth: 210,
    width: 400,
    columns: 2
  },
  items: [
    {
      fieldLabel: 'Landing page login link',
      items: [
        { boxLabel: 'Enabled', name: 'login_link', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'login_link', inputValue: '0' }
      ]
    },
    {
      fieldLabel: 'Faculty can add projects',
      items: [
        { boxLabel: 'Enabled', name: 'fac_edit_proj', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'fac_edit_proj', inputValue: '0' }
      ]
    },
    {
      fieldLabel: 'Faculty can assign assistants',
      items: [
        { boxLabel: 'Enabled', name: 'fac_assn_asst', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'fac_assn_asst', inputValue: '0' }
      ]
    },
    {
      fieldLabel: 'Faculty can rate student applications',
      items: [
        { boxLabel: 'Enabled', name: 'fac_rate_stud', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'fac_rate_stud', inputValue: '0' }
      ]
    },
    /*
     {
     fieldLabel: 'Faculty can see matches',
     defaults: {readOnly: true},
     items: [
     { boxLabel: 'Enabled', name: 'fac_see_matches', inputValue: '1', checked: true },
     { boxLabel: 'Disabled', name: 'fac_see_matches', inputValue: '0' }
     ]
     },
     */
    {
      fieldLabel: 'Students can edit profiles',
      items: [
        { boxLabel: 'Enabled', name: 'stud_edit_prof', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'stud_edit_prof', inputValue: '0' }
      ]
    },
    {
      fieldLabel: 'Students can see projects',
      items: [
        { boxLabel: 'Enabled', name: 'stud_see_proj', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'stud_see_proj', inputValue: '0' }
      ]
    },
    {
      fieldLabel: 'Students can apply for projects',
      items: [
        { boxLabel: 'Enabled', name: 'stud_apply', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'stud_apply', inputValue: '0' }
      ]
    },
    {
      fieldLabel: 'Students can see and accept matches',
      items: [
        { boxLabel: 'Enabled', name: 'stud_accept', inputValue: '1', checked: true },
        { boxLabel: 'Disabled', name: 'stud_accept', inputValue: '0' }
      ]
    }
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Update</b>',
      handler: function () {
        var form = admin_settings_form.getForm();
        form.submit({
          clientValidation: false,
          url: common_url_base + 'update_global_settings',
          success: function (form, action) {
            Ext.Msg.alert('Success', 'Global Settings Successfully Updated.');
          },
          failure: form_submit_failure_handler
        });
      }
    }
  ],
  listeners: {
    render: function (fp, e) {
      var form = fp.getForm();
      form.load({
        url: common_url_base + 'get_global_settings',
        //waitMsg: 'Loading...',
        failure: function (form, action) {
          Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
      });
    }
  }
});

// ---------------- Projects Panel ------------------
var admin_filter_projects = function() {
  admin_project_details_form.getForm().reset();
  admin_project_details_update_btn.setDisabled(true);

  all_projects_store.clearFilter();

  var professorName = admin_projects_grid_professor_filter_combo.getValue();
  var researchField = admin_projects_grid_researchfield_filter_combo.getValue();
  var yearField = admin_projects_grid_year_filter_combo.getValue();
  var termField = admin_projects_grid_term_filter_combo.getValue();

  all_projects_store.filterBy(function (record, id) {
    return ((professorName == 'None') ? true : record.get('professor_name') == professorName)
        && ((researchField == 'None') ? true : ((record.get('researchfield') == researchField) || (record.get('secondfield') == researchField) || (record.get('thirdfield') == researchField)))
        && ((yearField == 'None') ? true : record.get('year') == yearField)
        && ((termField == 'None') ? true : record.get('term') == termField);
  });
};

var admin_projects_grid_professor_filter_combo = new Ext.form.field.ComboBox({
  triggerAction: 'all',
  mode: 'local',
  width: 180,
  editable: false,
  store: faculty_names_store,
  valueField: 'name',
  displayField: 'name',
  value: 'None',
  listeners: {
    'select': function (combo, records, index) {
      admin_filter_projects();
    }
  }
});

var admin_projects_grid_researchfield_filter_combo = new Ext.form.field.ComboBox({
  triggerAction: 'all',
  mode: 'local',
  width: 220,
  editable: false,
  store: research_fields_with_none_store,
  valueField: 'research_field',
  displayField: 'research_field',
  value: 'None',
  listeners: {
    'select': function (combo, records, index) {
      admin_filter_projects();
    }
  }
});

var admin_projects_grid_year_filter_combo = Ext.create('Ext.form.field.ComboBox', {
  triggerAction: 'all',
  mode: 'local',
  width: 150,
  editable: false,
  store: school_year_fields_with_none_store,
  valueField: 'year_field',
  displayField: 'year_field',
  value: 'None',
  listeners: {
    'select': function (combo, records, index) {
      admin_filter_projects();
    }
  }
});

var admin_projects_grid_term_filter_combo = Ext.create('Ext.form.field.ComboBox', {
  triggerAction: 'all',
  mode: 'local',
  width: 150,
  editable: false,
  store: school_term_fields_with_none_store,
  valueField: 'term_field',
  displayField: 'term_field',
  value: 'None',
  listeners: {
    'select': function (combo, records, index) {
      admin_filter_projects();
    }
  }
});

var admin_projects_grid_columns = [
  { text: 'ID', dataIndex: 'id', width: 60, hidden: true },
  { text: 'Title', dataIndex: 'title', width: 280 },
  { text: 'Professor', dataIndex: 'professor_name', width: 140 },
  { text: 'Research Field', dataIndex: 'researchfield', width: 140 },
  { text: 'School Year', dataIndex: 'year', width: 80 },
  { text: 'School Quarter', dataIndex: 'term', width: 80 },
  { text: 'Compensation Type', dataIndex: 'compensation_type', width: 120 },
  { text: 'Capacity', dataIndex: 'capacity', tooltip: 'the number of students allowed for this project', width: 60 },
  { text: 'Available', dataIndex: 'full', tooltip: 'is it available to apply', width: 60,
    renderer: function (value) {
      return (value == 0) ? "Yes" : "No";
    }
  },
  { text: 'Creation Time', dataIndex: 'creation_time', width: 120 },
  {
    xtype: 'actioncolumn',
    header: 'Actions',
    sortable: false,
    resizable: true,
    menuDisabled: true,
    width: 110,
    items: [
      {
        icon: '/images/icons/stop.png',
        tooltip: 'Close this project',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var proj_id = rec.get('id');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to close this project \"' + title + "\" from applicants?", function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'close_project',
                params: {
                  id: proj_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    Ext.MessageBox.alert('Success', 'Project \"' + title + '\" successfully closed.');
                    store.load();
                    projects_store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/green.png',
        tooltip: 'reopen this project',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var proj_id = rec.get('id');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to reopen this project \"' + title + "\" to applicants?", function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'reopen_project',
                params: {
                  id: proj_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    Ext.MessageBox.alert('Success', 'Project \"' + title + '\" successfully reopened.');
                    store.load();
                    projects_store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/remove.png',
        tooltip: 'Remove this project',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var proj_id = rec.get('id');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove project \"' + title + "\"?", function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'remove_project',
                params: {
                  id: proj_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    Ext.MessageBox.alert('Success', 'Project \"' + title + '\" successfully removed.');
                    store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      }
    ]
  }
];

var admin_project_details_update_btn = new Ext.button.Button({
  text: '<b>Update</b>',
  id: 'update_project_details_btn',
  disabled: true,
  handler: function () {
    var form = admin_project_details_form.getForm();
    if (form.isValid()) {
      form.submit({
        clientValidation: true,
        url: common_url_base + 'update_project',
        success: function (form, action) {
          Ext.Msg.alert('Success', 'Project Successfully Updated.');
          all_projects_store.load();
        },
        failure: form_submit_failure_handler
      });
    }
  }
});

var admin_projects_grid = new Ext.grid.Panel({
  region: 'north',
  height: 200,
  autoScroll: true,
  split: true,
  tbar: [
    'Filter by Professor:',
    admin_projects_grid_professor_filter_combo,
    '-',
    'Filter by Research Field:',
    admin_projects_grid_researchfield_filter_combo,
    '-',
    'Filter by Year',
    admin_projects_grid_year_filter_combo,
    '-',
    'Filter by Quarter',
    admin_projects_grid_term_filter_combo
  ],
  store: all_projects_store,
  columns: admin_projects_grid_columns,
  listeners: {
    render: function() {
      all_projects_store.load();
    },
    select: function (grid, rec, i, eOpts) {
      var form = admin_project_details_form.getForm();
      form.setValues(
        [
          {id: 'id', value: rec.get('id')},
          {id: 'title', value: rec.get('title')},
          {id: 'researchfield', value: rec.get('researchfield')},
          {id: 'secondfield', value: rec.get('secondfield')},
          {id: 'thirdfield', value: rec.get('thirdfield')},
          {id: 'year', value: rec.get('year')},
          {id: 'term', value: rec.get('term')},
          {id: 'compensation_type', value: rec.get('compensation_type')},
          {id: 'url', value: rec.get('url')},
          {id: 'description', value: rec.get('description')},
          {id: 'prof_id', value: rec.get('prof_id')},
          {id: 'prerequisite', value: rec.get('prerequisite')},
          {id: 'background', value: rec.get('background')},
          {id: 'capacity', value: rec.get('capacity')}
        ]
      );
      admin_project_details_update_btn.setDisabled(false);
    },
    show: function () {
      projects_store.clearFilter();
    }
  }
});

var admin_project_details_form = new Ext.form.Panel({
  region: 'center',
  autoScroll: true,
  padding: '0 0 10 0',
  bodyStyle: {padding: '10px'},
  defaults: {labelWidth: 160},
  items: [
    {
      xtype: 'hidden',
      name: 'id'
    },
    {
      xtype: 'textfield',
      name: 'title',
      fieldLabel: 'Project Name',
      width: 600,
      allowBlank: false
    },
    {
      xtype: 'combo',
      name: 'researchfield',
      fieldLabel: 'Field of Research',
      triggerAction: 'all',
      mode: 'local',
      width: 400,
      allowBlank: false,
      editable: true,
      store: research_fields_store,
      valueField: 'research_field',
      displayField: 'research_field'
    },
    {
      xtype: 'combo',
      name: 'secondfield',
      fieldLabel: 'Field of Research(2nd)',
      triggerAction: 'all',
      mode: 'local',
      width: 400,
      editable: true,
      store: research_fields_store,
      valueField: 'research_field',
      displayField: 'research_field'
    },
    {
      xtype: 'combo',
      name: 'thirdfield',
      fieldLabel: 'Field of Research(3rd)',
      triggerAction: 'all',
      mode: 'local',
      width: 400,
      editable: true,
      store: research_fields_store,
      valueField: 'research_field',
      displayField: 'research_field'
    },
    {
      xtype: 'combo',
      name: 'year',
      fieldLabel: 'School Year',
      triggerAction: 'all',
      mode: 'local',
      width: 280,
      allowBlank: false,
      editable: true,
      store: school_year_fields_store,
      valueField: 'year_field',
      displayField: 'year_field'
    },
    {
      xtype: 'combo',
      name: 'term',
      fieldLabel: 'School Quarter',
      triggerAction: 'all',
      mode: 'local',
      width: 280,
      allowBlank: false,
      editable: true,
      store: school_term_fields_store,
      valueField: 'term_field',
      displayField: 'term_field'
    },
    {
      xtype: 'combo',
      name: 'compensation_type',
      fieldLabel: 'Compensation Type',
      triggerAction: 'all',
      mode: 'local',
      width: 350,
      allowBlank: false,
      editable: true,
      store: compensation_type_fields_store,
      valueField: 'compensation_type_field',
      displayField: 'compensation_type_field'
    },
    {
      xtype: 'textfield',
      name: 'url',
      fieldLabel: 'Project URL',
      width: 578,
      allowBlank: true
    },
    {
      xtype: 'textarea',
      name: 'description',
      fieldLabel: 'Description',
      width: 600,
      height: 200,
      allowBlank: false
    },
    {
      xtype: 'textarea',
      name: 'background',
      fieldLabel: 'Recommended Background',
      width: 600,
      height: 100,
      allowBlank: false
    },
    {
      xtype: 'numberfield',
      name: 'capacity',
      width: 250,
      fieldLabel: 'Number of Students (for this project)',
      allowBlank: false
    },
    {
      xtype: 'combo',
      name: 'prof_id',
      labelWidth: 160,
      fieldLabel: 'Contact Professor',
      width: 400,
      allowBlank: false,
      triggerAction: 'all',
      mode: 'local',
      editable: false,
      store: faculties_for_project_store,
      valueField: 'id',
      displayField: 'name'
    },
    {
      xtype: 'textarea',
      name: 'prerequisite',
      fieldLabel: 'Prerequisite/Preparation',
      width: 600,
      height: 80,
      allowBlank: false
    }
  ],
  buttonAlign: 'center',
  buttons: [
    admin_project_details_update_btn
  ]
});

var admin_projects_panel = new Ext.panel.Panel({
  title: 'Projects',
  layout: 'border',
  items: [
    admin_projects_grid,
    admin_project_details_form
  ]
});

// ---------------- Users Panel ------------------
var users_columns = [
  {
    text: 'id',
    dataIndex: 'id',
    hidden: true
  },
  {
    text: 'Name',
    dataIndex: 'name',
    width: 180,
    sortable: true
  },
  {
    text: 'SUNet ID',
    dataIndex: 'sunetid',
    width: 100,
    sortable: true
  },
  {
    text: 'Email',
    dataIndex: 'email',
    width: 180,
    sortable: true
  },
  {
    text: 'Type',
    dataIndex: 'type',
    width: 100,
    sortable: true,
    renderer: function (value, meta, rec) {
      if (value == 'faculty') {
        if (rec.get('lecturer') == 1) {
          return '<span style="color: blue; ">lecturer</span>';
        }
        else {
          return '<span style="color: green; ">faculty</span>';
        }
      }
      else {
        return value;
      }
    }
  },
  {
    text: 'Admin',
    dataIndex: 'admin',
    width: 100,
    renderer: number_to_boolean_renderer,
    sortable: true
  },
  {
    text: 'Creation Time',
    dataIndex: 'creation_time',
    width: 160,
    sortable: true
  }
];

var users_store = new Ext.data.JsonStore({
  pageSize: 50,
  root: 'users',
  fields: [
    'id',
    'name',
    'sunetid',
    'email',
    'type',
    'admin',
    'lecturer',
    'creation_time'
  ],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_users',
    reader: {
      type: 'json',
      root: 'users',
      idProperty: 'id',
      totalProperty: 'totalCount'
    }
  },
  remoteSort: true
});

var assistant_to_field = new Ext.form.field.Text({
  fieldLabel: 'Assistant to...',
  width: 450,
  labelWidth: 150,
  value: ''
});

var user_details_form = new Ext.form.Panel({
  title: 'User Details',
  region: 'center',
  autoScroll: true,
  waitMsgTarget: true,
  padding: '0 0 10 0',
  bodyStyle: {padding: '10px'},
  defaults: {labelWidth: 180},
  items: [
    {
      xtype: 'hidden',
      name: 'id'
    },
    {
      xtype: 'fieldset',
      collapsible: false,
      title: 'Profile',
      anchor: '65%',
      defaults: {labelWidth: 180},
      items: [
        {
          xtype: 'textfield',
          name: 'name',
          fieldLabel: 'Name',
          width: 350
        },
        {
          xtype: 'textfield',
          name: 'sunetid',
          fieldLabel: 'SUNet ID',
          width: 300
        },
        {
          xtype: 'textfield',
          name: 'suid',
          fieldLabel: 'SUID',
          width: 300
        },
        {
          xtype: 'textfield',
          name: 'email',
          fieldLabel: 'Email',
          width: 350
        },
        {
          xtype: 'textfield',
          name: 'webpage',
          fieldLabel: 'Webpage',
          width: 550
        },
        {
          xtype: 'textfield',
          name: 'interestarea',
          fieldLabel: 'Research Interest Area',
          width: 550
        },
        {
          xtype: 'combo',
          name: 'major',
          fieldLabel: 'Major',
          triggerAction: 'all',
          mode: 'local',
          width: 350,
          editable: true,
          store: majors_store,
          valueField: 'major',
          displayField: 'major'
        },
        {
          xtype: 'numberfield',
          name: 'gpa',
          fieldLabel: 'GPA in Math/CS Courses',
          width: 250
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'Conferring in June?',
          width: 280,
          columns: 2,
          items: [
            { boxLabel: 'Yes', name: 'graduating', inputValue: '1' },
            { boxLabel: 'No', name: 'graduating', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'Declared CS major by March 1?',
          width: 280,
          columns: 2,
          items: [
            { boxLabel: 'Yes', name: 'majorwhen', inputValue: '1' },
            { boxLabel: 'No', name: 'majorwhen', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'CS Coterm?',
          width: 280,
          columns: 2,
          items: [
            { boxLabel: 'Yes', name: 'coterm', inputValue: '1' },
            { boxLabel: 'No', name: 'coterm', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'combo',
          name: 'year',
          fieldLabel: 'Year at Stanford',
          triggerAction: 'all',
          mode: 'local',
          width: 300,
          editable: false,
          store: years_store,
          valueField: 'year',
          displayField: 'year',
          value: 'Freshman',
          margin: '0 0 20 0'
        }
      ]
    },
    {
      xtype: 'fieldset',
      collapsible: false,
      title: 'CURIS Status',
      anchor: '65%',
      defaults: {labelWidth: 150},
      items: [
        assistant_to_field,
        {
          xtype: 'combo',
          name: 'type',
          fieldLabel: 'Account Type',
          triggerAction: 'all',
          mode: 'local',
          width: 260,
          editable: false,
          store: user_type_store,
          valueField: 'type',
          displayField: 'type'
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'Administrative Priveleges?',
          width: 280,
          columns: 2,
          items: [
            { boxLabel: 'Yes', name: 'admin', inputValue: '1' },
            { boxLabel: 'No', name: 'admin', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'Matched?',
          width: 280,
          columns: 2,
          defaults: {readOnly: true},
          items: [
            { boxLabel: 'Yes', name: 'matched', inputValue: '1' },
            { boxLabel: 'No', name: 'matched', inputValue: '0', checked: true }
          ]
        }
      ]
    },
    {
      xtype: 'fieldset',
      collapsible: false,
      title: 'Transcript and Resume',
      anchor: '65%',
      items: [
        {
          xtype: 'hidden',
          id: 'admin_user_profile_transcript',
          name: 'transcript'
        },
        {
          xtype: 'box',
          html: '<div id="admin_user_profile_transcript_div">Current transcript not available</div>',
          margin: '0 0 10 0'
        },
        {
          xtype: 'hidden',
          id: 'admin_user_profile_resume',
          name: 'resume'
        },
        {
          xtype: 'box',
          html: '<div id="admin_user_profile_resume_div">Current resume not available</div>',
          margin: '0 0 10 0'
        }
        /*
         ,
         {
         xtype: 'filefield',
         name: 'transcript_upload',
         fieldLabel: 'Upload Transcript',
         msgTarget: 'side',
         allowBlank: true,
         anchor: '100%',
         buttonText: 'Browse...',
         margin: '0 0 10 0'
         },
         {
         xtype: 'filefield',
         name: 'resume_upload',
         fieldLabel: 'Upload Resume',
         msgTarget: 'side',
         allowBlank: true,
         anchor: '100%',
         buttonText: 'Browse...'
         }
         */
      ]
    }
  ],
  buttonAlign: 'center',
  buttons: [
    {
      id: 'user_details_form_update_btn',
      text: '<b>Update</b>',
      disabled: true,
      handler: function () {
        var form = user_details_form.getForm();
        form.submit({
          clientValidation: true,
          url: common_url_base + 'update_user_details',
          success: function (form, action) {
            Ext.Msg.alert('Success', 'User Details Successfully Updated.');
            users_store.loadPage(users_store.currentPage);
          },
          failure: form_submit_failure_handler
        });
      }
    }
  ]
});

var search_user_by_name = function () {
  var search_name = admin_users_grid_name_search_textfield.getValue();
  users_store.load({
    params: {
      search_name: search_name
    }
  });
};

var admin_users_grid_name_search_textfield = new Ext.form.field.Text({
  name: 'name',
  width: 180,
  enforceMaxLength: true,
  maxLength: 40,
  enableKeyEvents: true,
  listeners: {
    keyup: function (tf, e, eOpts) {
      if (e.getKey() == e.ENTER) {
        search_user_by_name();
      }
    }
  }
});

var admin_users_grid = new Ext.grid.Panel({
  region: 'north',
  height: 260,
  autoScroll: true,
  store: users_store,
  columns: users_columns,
  split: true,
  tbar: [
    { xtype: 'label', text: 'Name:', margin: '0 5 0 5' },
    admin_users_grid_name_search_textfield,
    {
      xtype: 'button',
      text: 'Search',
      handler: search_user_by_name
    }
  ],
  bbar: Ext.create('Ext.PagingToolbar', {
    store: users_store,
    displayInfo: true,
    displayMsg: 'Displaying Users {0} - {1} of {2}',
    emptyMsg: "No users to display"
  }),
  listeners: {
    select: function (grid, rec, i, eOpts) {
      var id = rec.get('id');
      var form = user_details_form.getForm();
      form.load({
        url: common_url_base + 'get_user_details/' + id,
        waitMsg: 'Loading...',
        success: function () {
          var transcript_path = form.findField('admin_user_profile_transcript').getValue();
          var resume_path = form.findField('admin_user_profile_resume').getValue();

          if (transcript_path && transcript_path.length > 0) {
            Ext.fly('admin_user_profile_transcript_div').update('<a target="_blank" href="' + transcript_path + '">Current Transcript</a>');
          }
          else {
            Ext.fly('admin_user_profile_transcript_div').update('Current transcript not available');
          }

          if (resume_path && resume_path.length > 0) {
            Ext.fly('admin_user_profile_resume_div').update('<a target="_blank" href="' + resume_path + '">Current Resume</a>');
          }
          else {
            Ext.fly('admin_user_profile_resume_div').update('Current resume not available');
          }

          Ext.Ajax.request({
            url: common_url_base + 'get_assistant_to/' + id,
            success: function (response, request) {
              var responseObj = Ext.decode(response.responseText);
              assistant_to_field.setValue(responseObj.data);
            }
          });
        },
        failure: function (form, action) {
          Ext.Msg.alert("Load failed", action.result.errorMessage);
        }
      });
      Ext.getCmp('user_details_form_update_btn').setDisabled(false);
    },
    render: function () {
      users_store.loadPage(1);
    }
  }
});

var admin_users_panel = new Ext.panel.Panel({
  title: 'Users',
  layout: 'border',
  items: [
    admin_users_grid,
    user_details_form
  ]
});

// ---------------- Applications Panel ------------------
var applications_grid_column = [
  { text: 'ID', dataIndex: 'id', width: 60, hidden: true },
  { text: 'Project Title', dataIndex: 'title', width: 285 },
  { text: 'Project Capacity', dataIndex: 'capacity', width: 90 },
  { text: 'Applicant', dataIndex: 'student_name', width: 145 },
  { text: 'Student Score', dataIndex: 'score', width: 80 },
  { text: 'Faculty Score', dataIndex: 'fac_rating1', width: 80 },
  { text: 'Prematched', dataIndex: 'prematch', width: 80,
    renderer: function (value) {
      return (value == 0) ? "No" : "<span style='color: green;'>Yes</span>";
    }
  },
  { text: 'Matched', dataIndex: 'match', width: 80,
    renderer: function (value) {
      return (value == 0) ? "No" : "<span style='color: green;'>Yes</span>";
    }
  },
  {
    text: 'Status',
    dataIndex: 'status',
    width: 65,
    renderer: function (value) {
      if (value == 0) {
        return '<span style="color:blue">Pending</span>';
      }
      else if (value > 0) {
        return '<span style="color:green">Accepted</span>';
      }
      else {
        return '<span style="color:red">Declined</span>';
      }
    }
  },
  {
    xtype: 'actioncolumn',
    header: 'Actions',
    sortable: false,
    resizable: true,
    menuDisabled: true,
    width: 180,
    items: [
      {
        icon: '/images/icons/prematchon.png',
        tooltip: 'Prematch this student\'s application',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var application_id = rec.get('id');
          var student_name = rec.get('student_name');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to prematch ' + student_name + '\'s application to project \"' + title + '"?', function (btn) {
            if (btn == 'yes') {
              grid.setLoading(true);
              Ext.Ajax.request({
                url: common_url_base + 'prematch_application',
                params: {
                  id: application_id
                },
                success: function (response, request) {
                  grid.setLoading(false);
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    rec.set('prematch', 1);
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  grid.setLoading(false);
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/prematchoff.png',
        tooltip: 'Undo prematch this student\'s application',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var application_id = rec.get('id');
          var student_name = rec.get('student_name');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to un-prematch ' + student_name + '\'s application to project \"' + title + '"?', function (btn) {
            if (btn == 'yes') {
              grid.setLoading(true);
              Ext.Ajax.request({
                url: common_url_base + 'unprematch_application',
                params: {
                  id: application_id
                },
                success: function (response, request) {
                  grid.setLoading(false);
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    rec.set('prematch', 0);
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  grid.setLoading(false);
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/matchon.png',
        tooltip: 'Match this student\'s application',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var application_id = rec.get('id');
          var student_name = rec.get('student_name');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to match ' + student_name + '\'s application to project \"' + title + '"?', function (btn) {
            if (btn == 'yes') {
              grid.setLoading(true);
              Ext.Ajax.request({
                url: common_url_base + 'match_application',
                params: {
                  id: application_id
                },
                success: function (response, request) {
                  grid.setLoading(false);
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    rec.set('match', 1);
                    //store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  grid.setLoading(false);
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/matchoff.png',
        tooltip: 'Undo match this student\'s application',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var application_id = rec.get('id');
          var student_name = rec.get('student_name');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to un-match ' + student_name + '\'s application to project \"' + title + '"?', function (btn) {
            if (btn == 'yes') {
              grid.setLoading(true);
              Ext.Ajax.request({
                url: common_url_base + 'unmatch_application',
                params: {
                  id: application_id
                },
                success: function (response, request) {
                  grid.setLoading(false);
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    rec.set('match', 0);
                    //store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  grid.setLoading(false);
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/thumbs_up.gif',
        tooltip: 'Accept this application!',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var application_id = rec.get('id');
          var student_name = rec.get('student_name');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to accept ' + student_name + '\'s application to project \"' + title + '"?', function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'accept_application',
                params: {
                  id: application_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      },
      {
        icon: '/images/icons/thumbs_down.png',
        tooltip: 'Decline this application!',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var application_id = rec.get('id');
          var student_name = rec.get('student_name');
          var title = rec.get('title');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to decline ' + student_name + '\'s application to project \"' + title + '"?', function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'decline_application',
                params: {
                  id: application_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      }
    ]
  }
];

var admin_application_review_form = new Ext.form.Panel({
  autoScroll: true,
  waitMsgTarget: true,
  bodyStyle: {padding: '10px'},
  defaults: {labelWidth: 160, readOnly: true},
  items: [
    {
      xtype: 'hidden',
      name: 'id'
    },
    {
      xtype: 'fieldset',
      collapsible: false,
      title: 'Application Details',
      anchor: '100%',
      defaults: {readOnly: true},
      items: [
        {
          xtype: 'textfield',
          name: 'title',
          fieldLabel: 'Project',
          width: 350,
          fieldStyle: {border: 'none 0px black', background: 'none'}
        },
        {
          xtype: 'textfield',
          name: 'applicant_name',
          fieldLabel: 'Applicant Name',
          width: 350,
          fieldStyle: {border: 'none 0px black', background: 'none'}
        },
        {
          xtype: 'numberfield',
          name: 'score',
          fieldLabel: 'Score',
          width: 200,
          fieldStyle: {border: 'none 0px black', background: 'none'}
        },
        {
          xtype: 'textarea',
          name: 'statement',
          fieldLabel: 'Statement',
          anchor: '100%',
          height: 140
        },
        {
          xtype: 'textfield',
          name: 'professor_name',
          fieldLabel: 'Professor Name',
          width: 350,
          fieldStyle: {border: 'none 0px black', background: 'none'}
        }
      ]
    },
    {
      xtype: 'fieldset',
      collapsible: false,
      title: 'Applicant Profile',
      anchor: '100%',
      defaults: {labelWidth: 170, readOnly: true, fieldStyle: {border: 'none 0px black', background: 'none'}},
      items: [
        {
          xtype: 'textfield',
          name: 'sunetid',
          fieldLabel: 'SUNet ID',
          width: 250
        },
        {
          xtype: 'textfield',
          name: 'suid',
          fieldLabel: 'SUID',
          width: 250
        },
        {
          xtype: 'textfield',
          name: 'email',
          fieldLabel: 'Email',
          width: 350
        },
        {
          xtype: 'textfield',
          name: 'webpage',
          fieldLabel: 'Webpage',
          width: 550
        },
        {
          xtype: 'textfield',
          name: 'interestarea',
          fieldLabel: 'Research Interest Area',
          width: 550
        },
        {
          xtype: 'combo',
          name: 'major',
          fieldLabel: 'Major',
          triggerAction: 'all',
          mode: 'local',
          width: 350,
          editable: true,
          store: majors_store,
          valueField: 'major',
          displayField: 'major'

        },
        {
          xtype: 'numberfield',
          name: 'gpa',
          fieldLabel: 'GPA in Math/CS Courses',
          width: 250
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'Conferring in June',
          width: 280,
          columns: 2,
          defaults: {readOnly: true},
          items: [
            { boxLabel: 'Yes', name: 'graduating', inputValue: '1' },
            { boxLabel: 'No', name: 'graduating', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'Declared CS major by March 1',
          width: 280,
          columns: 2,
          defaults: {readOnly: true},
          items: [
            { boxLabel: 'Yes', name: 'majorwhen', inputValue: '1' },
            { boxLabel: 'No', name: 'majorwhen', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'radiogroup',
          fieldLabel: 'CS Coterm',
          width: 280,
          columns: 2,
          defaults: {readOnly: true},
          items: [
            { boxLabel: 'Yes', name: 'coterm', inputValue: '1' },
            { boxLabel: 'No', name: 'coterm', inputValue: '0', checked: true }
          ]
        },
        {
          xtype: 'combo',
          name: 'year',
          fieldLabel: 'Year at Stanford',
          triggerAction: 'all',
          mode: 'local',
          width: 300,
          store: years_store,
          valueField: 'year',
          displayField: 'year',
          value: 'Freshman',
          readOnly: true,
          margin: '0 0 30 0'
        },
        {
          xtype: 'hidden',
          id: 'admin_applicant_review_profile_transcript',
          name: 'transcript'
        },
        {
          xtype: 'box',
          html: '<div id="admin_applicant_review_profile_transcript_div">Transcript not available</div>',
          margin: '0 0 10 0'
        },
        {
          xtype: 'hidden',
          id: 'admin_applicant_review_profile_resume',
          name: 'resume'
        },
        {
          xtype: 'box',
          html: '<div id="admin_applicant_review_profile_resume_div">Resume not available</div>',
          margin: '0 0 30 0'
        }
      ]
    }
  ]
});

var admin_applicant_profile_window = new Ext.window.Window({
  title: 'Applicant Profile',
  width: 800,
  height: 500,
  autoScroll: true,
  closeAction: 'hide',
  items: [
    admin_application_review_form
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Close</b>',
      handler: function () {
        admin_applicant_profile_window.hide();
      }
    }
  ]
});

var load_applications = function() {
  applications_store.load({
    url: common_url_base + 'get_applications',
    params: {
      year: admin_applications_grid_year_filter_combo.getValue(),
      term: admin_applications_grid_term_filter_combo.getValue()
    }
  });
};

var admin_applications_grid_year_filter_combo = Ext.create('Ext.form.field.ComboBox', {
  triggerAction: 'all',
  mode: 'local',
  width: 180,
  editable: false,
  store: school_year_fields_store,
  valueField: 'year_field',
  displayField: 'year_field',
  value: '',
  listeners: {
    render: function() {
      this.select(this.getStore().getAt(0));
    },
    select: function (combo, records, index) {
      load_applications();
    }
  }
});

var admin_applications_grid_term_filter_combo = Ext.create('Ext.form.field.ComboBox', {
  triggerAction: 'all',
  mode: 'local',
  width: 180,
  editable: false,
  store: school_term_fields_store,
  valueField: 'term_field',
  displayField: 'term_field',
  value: '',
  listeners: {
    render: function() {
      this.select(this.getStore().getAt(0));
    },
    select: function (combo, records, index) {
      load_applications();
    }
  }
});

var admin_applications_grid = new Ext.grid.Panel({
  title: 'Applications',
  header: 'hello',
  autoScroll: true,
  store: applications_store,
  columns: applications_grid_column,
  buttonAlign: 'center',
  tbar: [
    'Select Year',
    admin_applications_grid_year_filter_combo,
    '-',
    'Select Quarter',
    admin_applications_grid_term_filter_combo,
    '-',
    {
      type: 'button',
      text: '<i>Export</i>',
      icon: '/images/icons/excel.png',
      tooltip: 'Export to Excel format',
      handler: function () {
        var year = admin_applications_grid_year_filter_combo.getValue();
        var term = admin_applications_grid_term_filter_combo.getValue();
        var url = encodeURI(common_url_base + 'admin_export_applications_to_excel'
                + '?year='
                + year
                + '&term='
                + term);
        window.open(url, '_blank');
      }
    },
    {
      type: 'button',
      text: '<i>Match</i>',
      icon: '/images/icons/match.png',
      tooltip: 'Run matching process',
      handler: function () {
        var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to run the matching process?', function (btn) {
          if (btn == 'yes') {
            var year = admin_applications_grid_year_filter_combo.getValue();
            var term = admin_applications_grid_term_filter_combo.getValue();
            var url = common_url_base + 'match'
                + '?year='
                + year
                + '&term='
                + term;

            Ext.Ajax.request({
              url: url,
              success: function (response, request) {
                //applications_store.load();
                load_applications();
                Ext.Msg.alert('Success', 'Match process finished successfully.');
              },
              failure: function (response, request) {
                Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
              }
            });
          }
        });
      }
    },
    {
      type: 'button',
      text: '<i>Unmatch</i>',
      icon: '/images/icons/matchoff.png',
      tooltip: 'unmatching all applications',
      handler: function () {
        var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to reset all matched applications to unmatched?', function (btn) {
          if (btn == 'yes') {
            var year = admin_applications_grid_year_filter_combo.getValue();
            var term = admin_applications_grid_term_filter_combo.getValue();
            var url = common_url_base + 'unmatch_all_applications'
                + '?year='
                + year
                + '&term='
                + term;

            Ext.Ajax.request({
              url: url,
              success: function (response, request) {
                //applications_store.load();
                load_applications();
                Ext.Msg.alert('Success', 'All applications are unmatched.');
              },
              failure: function (response, request) {
                Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
              }
            });
          }
        });
      }
    }
  ],
  features: [
    {
      id: 'group',
      ftype: 'groupingsummary',
      groupHeaderTpl: '{name}',
      hideGroupedHeader: false,
      enableGroupingMenu: true
    }
  ],
  listeners: {
    afterrender: function() {
      load_applications();
    },
    select: function (grid, rec, i) {
      var application_id = rec.get('id');
      var form = admin_application_review_form.getForm();
      form.reset();
      admin_applicant_profile_window.show();
      form.load({
        url: common_url_base + 'get_application_details/' + application_id,
        waitMsg: 'Loading...',
        success: function () {
          var transcript_path = form.findField('admin_applicant_review_profile_transcript').getValue();
          var resume_path = form.findField('admin_applicant_review_profile_resume').getValue();

          if (transcript_path && transcript_path.length > 0) {
            Ext.fly('admin_applicant_review_profile_transcript_div').update('<a target="_blank" href="' + transcript_path + '">Current Transcript</a>');
          }
          else {
            Ext.fly('admin_applicant_review_profile_transcript_div').update('Transcript not available');
          }

          if (resume_path && resume_path.length > 0) {
            Ext.fly('admin_applicant_review_profile_resume_div').update('<a target="_blank" href="' + resume_path + '">Current Resume</a>');
          }
          else {
            Ext.fly('admin_applicant_review_profile_resume_div').update('Resume not available');
          }
        },
        failure: function (form, action) {
          Ext.Msg.alert("Load failed", action.result.msg);
        }
      });
    }
  }
});

// ---------------------------------------- project uploads ----------------------------------------------
var admin_project_uploads_store = Ext.create('Ext.data.JsonStore', {
  root: 'uploads',
  fields: [
    'id',
    'project_id',
    'title',
    'researchfield',
    'professor_id',
    'professor_name',
    'student_id',
    'student_name',
    'filename',
    'time'
  ],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_admin_project_uploads',
    reader: {
      type: 'json',
      root: 'uploads',
      idProperty: 'id'
    }
  }
});

var admin_project_uploads_grid_file_column = {
  text: 'File Link',
  dataIndex: 'filename',
  width: 240,
  renderer: function (filename) {
    var url = "";
    if (filename && (filename.indexOf('http://') < 0)) {
      url = 'http://curis.stanford.edu/protected/uploads/projects/' + filename;
    }
    else {
      url = filename;
    }
    return '<a target="_blank" href="' + url + '">' + filename + '</a>';
  }
};

var admin_project_uploads_grid_column = [
  { text: 'Project Title', dataIndex: 'title', width: 320 },
  { text: 'Professor Name', dataIndex: 'professor_name', width: 140 },
  { text: 'Student Name', dataIndex: 'student_name', width: 140 },
  admin_project_uploads_grid_file_column,
  { text: 'Upload Time', dataIndex: 'time', width: 120 },
  {
    xtype: 'actioncolumn',
    header: 'Actions',
    sortable: false,
    resizable: true,
    menuDisabled: true,
    width: 110,
    items: [
      {
        icon: '/images/icons/remove.png',
        tooltip: 'Remove this upload',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var project_upload_id = rec.get('id');
          var filename = rec.get('filename');
          var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove this upload \"' + filename + "\"?", function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'remove_upload',
                params: {
                  id: project_upload_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    //Ext.MessageBox.alert('Success', '\"' + filename + '\" successfully removed.');
                    store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      }
    ]
  }
];

var admin_project_uploads_grid = Ext.create('Ext.grid.Panel', {
  title: 'Project Uploads',
  autoScroll: true,
  store: admin_project_uploads_store,
  columns: admin_project_uploads_grid_column,
  listeners: {
    render: function() {
      admin_project_uploads_store.load();
    }
  }
});

// ---------------- Faculties and Assistants Panel ------------------
var faculties_and_assistants_grid_column = [
  { text: 'Faculty', dataIndex: 'fac_name', width: 200 },
  { text: 'Assistant', dataIndex: 'asst_name', width: 200 },
  { text: 'Assign Time', dataIndex: 'assign_time', width: 150 },
  {
    xtype: 'actioncolumn',
    header: 'Actions',
    sortable: false,
    resizable: true,
    menuDisabled: true,
    width: 60,
    items: [
      {
        icon: '/images/icons/remove.png',
        tooltip: 'Remove this assistant relation',
        handler: function (grid, rowIndex, colIndex) {
          var store = grid.getStore();
          var rec = store.getAt(rowIndex);
          var fac_id = rec.get('fac_id');
          var asst_id = rec.get('asst_id');
          var fac_name = rec.get('fac_name');
          var asst_name = rec.get('asst_name');
          var confirmed = Ext.MessageBox.confirm('Confirm',
              'Are you sure you want to remove assistant \"' + asst_name + "\" from \"" + fac_name +  "\"?", function (btn) {
            if (btn == 'yes') {
              Ext.Ajax.request({
                url: common_url_base + 'remove_assistant',
                params: {
                  fac_id: fac_id,
                  asst_id: asst_id
                },
                success: function (response, request) {
                  var responseObj = Ext.decode(response.responseText);
                  if (responseObj.success) {
                    Ext.MessageBox.alert('Success', 'Assistant successfully removed.');
                    faculties_and_assistants_store.load();
                  }
                  else {
                    Ext.MessageBox.alert('Failure', responseObj.msg);
                  }
                },
                failure: function (response, request) {
                  Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                }
              });
            }
          });
        }
      }
    ]
  }
];

var faculties_and_assistants_store = new Ext.data.JsonStore({
  root: 'assistants',
  fields: [
    'fac_id',
    'fac_name',
    'asst_id',
    'asst_name',
    'assign_time'
  ],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_faculties_and_assistants',
    reader: {
      type: 'json',
      root: 'assistants'
    }
  }
});

var admin_add_assistant_faculty_combo = Ext.create('Ext.form.field.ComboBox', {
  name: 'faculty_id',
  fieldLabel: 'Faculty',
  triggerAction: 'all',
  mode: 'local',
  editable: false,
  store: faculty_ids_and_names_store,
  valueField: 'id',
  displayField: 'name',
  allowBlank: false
});

var admin_add_assistant_assistant_sunetid_text = Ext.create('Ext.form.field.Text', {
  name: 'assistant_sunet_id',
  fieldLabel: 'Assistant SUNet ID',
  value: '',
  allowBlank: false
});

var admin_add_assistant_form = new Ext.create('Ext.form.Panel', {
  border: 0,
  bodyPadding: 5,
  padding: '0 0 0 0',
  fieldDefaults: {
    labelWidth: 120,
    anchor: '100%'
  },
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    admin_add_assistant_faculty_combo,
    admin_add_assistant_assistant_sunetid_text
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Add</b>',
      handler: function() {
        var form = admin_add_assistant_form.getForm();
        if (form.isValid()) {
          form.submit({
            clientValidation: true,
            url: common_url_base + 'admin_add_assistant_to_faculty',
            success: function (form, action) {
              Ext.MessageBox.alert('Success', 'Assistant added successfully.');
              faculties_and_assistants_store.load();
              admin_add_assistant_win.hide();
            },
            failure: form_submit_failure_handler
          });
        }
      }
    }
  ]
});

var admin_add_assistant_win = new Ext.create('Ext.window.Window', {
  title: 'Add Assistant',
  layout: 'border',
  width: 320,
  height: 140,
  closeAction: 'hide',
  items: [
    admin_add_assistant_form
  ]
});

var faculties_and_assistants_grid = new Ext.grid.Panel({
  title: 'Assistants',
  autoScroll: true,
  store: faculties_and_assistants_store,
  columns: faculties_and_assistants_grid_column,
  tbar: [
    {
      type: 'button',
      text: 'Add Assistant',
      icon: '/images/icons/add.png',
      tooltip: 'Add assistant',
      handler: function () {
        admin_add_assistant_win.show();
      }
    }
  ],
  listeners: {
    activate: function () {
      faculties_and_assistants_store.load();
    }
  }
});

// ---------------- Pages Panel ------------------
var set_page_editor_content = function (editor, page_name) {
  admin_pages_panel.setLoading(true);
  Ext.Ajax.request({
    url: common_url_base + 'get_dyn_page/' + page_name,
    success: function (response, request) {
      editor.setValue(response.responseText);
      admin_pages_panel.setLoading(false);
    },
    failure: function (response, request) {
      Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
    }
  });
};

var page_editor = new Ext.form.field.HtmlEditor({
  name: 'page',
  listeners: {
    initialize: function (editor) {
      set_page_editor_content(editor, 'landing');
    }
  }
});

var admin_page_names_combo = new Ext.form.field.ComboBox({
  name: 'page',
  fieldLabel: 'Edit Page',
  labelWidth: 60,
  triggerAction: 'all',
  mode: 'local',
  width: 250,
  editable: false,
  store: page_names_store,
  valueField: 'view',
  displayField: 'display_name',
  value: 'landing',
  listeners: {
    select: function (combo, records, eOpts) {
      var v = combo.getValue();
      set_page_editor_content(page_editor, v);
    }
  }
});

var admin_pages_panel = new Ext.panel.Panel({
  title: 'Pages',
  layout: 'fit',
  padding: '0 0 10 0',
  frame: true,
  tbar: [admin_page_names_combo],
  items: [page_editor],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Save</b>',
      handler: function () {
        var page_name = admin_page_names_combo.getValue();
        var page_content = page_editor.getValue();
        Ext.Ajax.request({
          url: common_url_base + 'set_dyn_page/' + page_name,
          params: {
            page_content: page_content
          },
          success: function (response, request) {
            Ext.Msg.alert('Success', 'Page Successfully Updated.');
            student_home_panel.getLoader().load();
            faculty_home_panel.getLoader().load();
          },
          failure: function (response, request) {
            Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
          }
        });
      }
    }
  ]
});

// ---------------- Email Panel ------------------
var email_recipients_store = new Ext.data.ArrayStore({
  fields: ['recipient_code', 'recipient'],
  data: [
    [1, 'All Curis Faculty'],
    [2, 'All Applied Students'],
    [3, 'All Matched Students'],
    [4, 'All Unmatched Students'],
    [5, 'All Accepted Students'],
    [6, 'All faculties and assistants who have students accepted'],
    [7, 'All assistants'],
    [0, 'All Curis Faculty and Applied Students']
  ]
});

var email_templates_store = new Ext.data.JsonStore({
  root: 'templates',
  fields: ['id', 'name', 'message'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_email_templates',
    reader: {
      type: 'json',
      root: 'templates'
    }
  }
});

var email_templates_with_none_store = new Ext.data.JsonStore({
  root: 'templates',
  fields: ['id', 'name', 'message'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_email_templates_with_none',
    reader: {
      type: 'json',
      root: 'templates'
    }
  }
});

var email_message_textarea = Ext.create('Ext.form.field.TextArea', {
  fieldLabel: 'Message text',
  hideLabel: true,
  name: 'message',
  style: 'margin:0',
  flex: 1,
  allowBlank: false
});

var email_recipient_combo = Ext.create('Ext.form.field.ComboBox', {
  store: email_recipients_store,
  displayField: 'recipient',
  valueField: 'recipient_code',
  fieldLabel: 'Send To',
  queryMode: 'local',
  selectOnTab: false,
  name: 'to',
  allowBlank: false
});

var email_templates_combo = Ext.create('Ext.form.field.ComboBox', {
  triggerAction: 'all',
  mode: 'local',
  queryMode: 'local',
  editable: false,
  store: email_templates_with_none_store,
  valueField: 'id',
  displayField: 'name',
  fieldLabel: 'Template',
  value: 'None',
  selectOnTab: false,
  allowBlank: false,
  listeners: {
    select: function (combo, records, eOpts) {
      var messageText = records[0].get('message');
      email_message_textarea.setValue(messageText);
    }
  }
});

var admin_email_confirmation_grid_columns = [
  { text: 'Name', dataIndex: 'name', width: 180 },
  { text: 'Email', dataIndex: 'email', width: 200 }
];

var all_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_all_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var faculty_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_faculty_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var applied_student_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_applied_student_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var matched_student_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_matched_student_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var unmatched_student_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_unmatched_student_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var accepted_student_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_accepted_student_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var faculty_and_assistant_who_have_accepted_student_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_faculty_and_assistant_who_have_accepted_student_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var all_assistant_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_all_assistant_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var custom_emails_store = Ext.create('Ext.data.JsonStore', {
  root: 'data',
  fields: ['id', 'name', 'email'],
  proxy: {
    type: 'ajax',
    url: common_url_base + 'get_custom_emails',
    reader: {
      type: 'json',
      root: 'data',
      idProperty: 'id'
    }
  }
});

var show_email_confirmation_window = function() {
  var form = admin_email_form_panel.getForm();
  if (form.isValid()) {
    var is_recipients_store_loadable = true;
    var recipients_store = faculty_emails_store;
    var recipient_code = email_recipient_combo.getValue();
    if (recipient_code == 0) {
      recipients_store = all_emails_store;
    }
    else if (recipient_code == 1) {
      recipients_store = faculty_emails_store;
    }
    else if (recipient_code == 2) {
      recipients_store = applied_student_emails_store;
    }
    else if (recipient_code == 3) {
      recipients_store = matched_student_emails_store;
    }
    else if (recipient_code == 4) {
      recipients_store = unmatched_student_emails_store;
    }
    else if (recipient_code == 5) {
      recipients_store = accepted_student_emails_store;
    }
    else if (recipient_code == 6) {
      recipients_store = faculty_and_assistant_who_have_accepted_student_store;
    }
    else if (recipient_code == 7) {
      recipients_store = all_assistant_emails_store;
    }
    else {
      is_recipients_store_loadable = false;
      var freeform_recipients = recipient_code.split(",");
      var data_records = new Array();
      for (var i = 0; i < freeform_recipients.length; i++) {
        var data_record = {};
        data_record['id'] = Ext.id();
        data_record['name'] = freeform_recipients[i];
        data_record['email'] = freeform_recipients[i];
        data_records.push(data_record);
      }
      recipients_store = Ext.create('Ext.data.JsonStore', {
        fields: ['id', 'name', 'email'],
        data: data_records
      });
    }

    var admin_email_confirmation_send_button = Ext.create('Ext.button.Button', {
      text: '<b>Send</b>',
      handler: function () {
        var selections = admin_email_confirmation_grid.getSelectionModel().getSelection();
        if (selections.length <= 0) {
          Ext.Msg.alert('No recipents', 'No recipients selected.');
          return;
        }
        var recipient_emails = new Array();
        for (var i = 0; i < selections.length; i++) {
          recipient_emails.push(selections[i].get('email'));
        }
        var recipient_emails_string = recipient_emails.join(',');

        var form = admin_email_form_panel.getForm();
        form.submit({
          clientValidation: true,
          url: common_url_base + 'send_mail',
          params: {
            recipient_emails: recipient_emails_string
          },
          success: function (form, action) {
            Ext.Msg.alert('Success', 'Mail successfully sent.');
            admin_email_confirmation_window.close();
          },
          failure: form_submit_failure_handler
        });
      }
    });

    var admin_email_recipients_export_button = Ext.create('Ext.button.Button', {
      text: '<b>Export Recipients</b>',
      handler: function () {
        var selections = admin_email_confirmation_grid.getSelectionModel().getSelection();
        if (selections.length <= 0) {
          Ext.Msg.alert('No recipents', 'No recipients selected.');
          return;
        }
        var recipient_emails = new Array();
        for (var i = 0; i < selections.length; i++) {
          recipient_emails.push(selections[i].get('email'));
        }
        var recipient_emails_string = recipient_emails.join('\n');

        top.popupWin = window.open('_blank', 'Recipient List', 'width=350,height=250,menubar=0,toolbar=1,status=0,scrollbars=1,resizable=1');
        top.popupWin.document.writeln(
            '<html><head><title>Recipient List</title></head>'
            + '<body bgcolor=white onLoad="self.focus()"><pre>'
            + recipient_emails_string
            + '</pre></body></html>'
        )
        top.popupWin.document.close()
      }
    });

    var admin_email_confirmation_grid = Ext.create('Ext.grid.Panel', {
      region: 'center',
      autoScroll: true,
      store: recipients_store,
      columns: admin_email_confirmation_grid_columns,
      viewConfig: {
        emptyText: 'No recipients found',
        deferEmptyText: false
      },
      selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
      },
      listeners: {
        render: function (this_grid) {
          if (is_recipients_store_loadable) {
            var year = year_term_form_for_email_year_combo.getValue();
            var term = year_term_form_for_email_term_combo.getValue();
            recipients_store.load({
                  scope: this,
                  params: {
                    year: year,
                    term: term
                  },
                  callback: function () {
                    if (recipients_store.getCount() == 0) {
                      admin_email_confirmation_send_button.setDisabled(true);
                    }
                    else {
                      this_grid.getSelectionModel().selectAll(true);
                    }
                  }
                }
            );
          }
          else {
            if (recipients_store.getCount() == 0) {
              admin_email_confirmation_send_button.setDisabled(true);
            }
            /*
             else {
             admin_email_confirmation_grid.getSelectionModel().selectAll(true);
             }
             */
          }
        }
      }
    });

    var admin_email_confirmation_window = Ext.create('Ext.window.Window', {
      title: 'Message will be sent to the following checked recipients',
      layout: 'border',
      width: 450,
      height: 600,
      items: [
        admin_email_confirmation_grid
      ],
      buttonAlign: 'center',
      buttons: [
        admin_email_confirmation_send_button,
        {
          text: '<b>Cancel</b>',
          handler: function () {
            admin_email_confirmation_window.close();
          }
        },
        admin_email_recipients_export_button
      ]
    });

    admin_email_confirmation_window.show();
  }
};

var year_term_form_for_email_year_combo = Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Year',
  triggerAction: 'all',
  mode: 'local',
  width: 180,
  editable: false,
  store: school_year_fields_store,
  valueField: 'year_field',
  displayField: 'year_field',
  allowBlank: false
});

var year_term_form_for_email_term_combo = Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Quarter',
  triggerAction: 'all',
  mode: 'local',
  width: 180,
  editable: false,
  store: school_term_fields_store,
  valueField: 'term_field',
  displayField: 'term_field',
  allowBlank: false
});

var year_term_form_for_email = Ext.create('Ext.form.Panel', {
  border: 0,
  bodyPadding: 5,
  padding: '0 0 10 0',
  fieldDefaults: {
    labelWidth: 60,
    anchor: '100%'
  },
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    year_term_form_for_email_year_combo,
    year_term_form_for_email_term_combo
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Ok</b>',
      handler: function() {
        var year_term_form = year_term_form_for_email.getForm();
        if (year_term_form.isValid()) {
          year_term_window_for_email.hide();
          show_email_confirmation_window();
        }
      }
    }
  ]
});

var year_term_window_for_email = Ext.create('Ext.window.Window', {
  title: 'Please Select Quarter',
  layout: 'border',
  width: 200,
  height: 140,
  closeAction: 'hide',
  items: [
    year_term_form_for_email
  ]
});

var process_ready_to_send_mail = function() {
  var form = admin_email_form_panel.getForm();
  if (form.isValid()) {
    //var is_recipients_store_loadable = true;
    //var recipients_store = faculty_emails_store;
    var recipient_code = email_recipient_combo.getValue();
    if (recipient_code == 0) {
      //recipients_store = all_emails_store;
      year_term_window_for_email.show();
    }
    else if (recipient_code == 1) {
      //recipients_store = faculty_emails_store;
      show_email_confirmation_window();
    }
    else if (recipient_code == 2) {
      //recipients_store = applied_student_emails_store;
      year_term_window_for_email.show();
    }
    else if (recipient_code == 3) {
      //recipients_store = matched_student_emails_store;
      year_term_window_for_email.show();
    }
    else if (recipient_code == 4) {
      //recipients_store = unmatched_student_emails_store;
      year_term_window_for_email.show();
    }
    else if (recipient_code == 5) {
      //recipients_store = accepted_student_emails_store;
      year_term_window_for_email.show();
    }
    else if (recipient_code == 6) {
      //recipients_store = faculty_and_assistant_who_have_accepted_student_store;
      year_term_window_for_email.show();
    }
    else if (recipient_code == 7) {
      //recipients_store = all_assistant_emails_store;
      show_email_confirmation_window();
    }
  }
};

var admin_email_form_panel = Ext.create('Ext.form.Panel', {
  title: 'Emails',
  border: 0,
  bodyPadding: 5,
  padding: '0 0 10 0',
  fieldDefaults: {
    labelWidth: 60,
    anchor: '100%'
  },
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    email_recipient_combo,
    {
      xtype: 'textfield',
      fieldLabel: 'Cc',
      name: 'cc',
      allowBlank: true
    },
    {
      xtype: 'textfield',
      fieldLabel: 'Subject',
      name: 'subject',
      allowBlank: false
    },
    email_templates_combo,
    email_message_textarea
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Ready to Send</b>',
      handler: process_ready_to_send_mail
    },
    {
      text: '<b>Save as Template</b>',
      handler: function () {
        var save_email_template_name_combo = Ext.create('Ext.form.field.ComboBox', {
          store: email_templates_store,
          valueField: 'name',
          displayField: 'name',
          fieldLabel: 'Template Name',
          labelWidth: 100,
          anchor: '100%',
          triggerAction: 'all',
          mode: 'local',
          queryMode: 'local',
          editable: true,
          selectOnTab: false,
          allowBlank: false
        });

        var save_email_template_form_panel = Ext.create('Ext.form.Panel', {
          region: 'center',
          border: 0,
          bodyPadding: 5,
          padding: '0 0 10 0',
          items: [
            save_email_template_name_combo
          ],
          listeners: {
            render: function () {
              email_templates_store.load();
            }
          }
        });

        var save_email_template_window = Ext.create('Ext.window.Window', {
          title: 'Saving Current Message to Template',
          layout: 'anchor',
          width: 400,
          height: 100,
          items: [
            save_email_template_form_panel
          ],
          buttonAlign: 'center',
          buttons: [
            {
              text: '<b>Save</b>',
              handler: function () {
                var template_name = save_email_template_name_combo.getValue();
                var template_message = email_message_textarea.getValue();
                Ext.Ajax.request({
                  url: common_url_base + 'update_email_template',
                  method: 'POST',
                  params: {
                    template_name: template_name,
                    template_message: template_message
                  },
                  success: function (response, request) {
                    var responseObj = Ext.decode(response.responseText);
                    if (responseObj.success) {
                      Ext.MessageBox.alert('Success', 'Email template \"' + template_name + '\" successfully saved.');
                      email_templates_with_none_store.load();
                      save_email_template_window.close();
                    }
                    else {
                      Ext.MessageBox.alert('Failure', responseObj.msg);
                    }
                  },
                  failure: function (response, request) {
                    Ext.MessageBox.alert('Failure', 'server-side failure with status code ' + response.status);
                  }
                });
              }
            },
            {
              text: '<b>Cancel</b>',
              handler: function () {
                save_email_template_window.close();
              }
            }
          ]
        });

        save_email_template_window.show();
      }
    },
    {
      text: '<b>Delete a Template</b>',
      handler: function () {
        email_templates_store.load({
          scope: this,
          callback: function (records, operation, success) {
            if (email_templates_store.count() > 0) {
              var delete_email_template_name_combo = Ext.create('Ext.form.field.ComboBox', {
                store: email_templates_store,
                name: 'template_name',
                valueField: 'name',
                displayField: 'name',
                fieldLabel: 'Template Name',
                labelWidth: 100,
                anchor: '100%',
                triggerAction: 'all',
                mode: 'local',
                queryMode: 'local',
                editable: false,
                selectOnTab: false,
                allowBlank: false
              });

              var delete_email_template_form_panel = Ext.create('Ext.form.Panel', {
                region: 'center',
                border: 0,
                bodyPadding: 5,
                padding: '0 0 10 0',
                items: [
                  delete_email_template_name_combo
                ]
              });

              var delete_email_template_window = Ext.create('Ext.window.Window', {
                title: 'Deleting a Email Template',
                layout: 'anchor',
                width: 400,
                height: 100,
                items: [
                  delete_email_template_form_panel
                ],
                buttonAlign: 'center',
                buttons: [
                  {
                    text: '<b>Delete</b>',
                    handler: function () {
                      var form = delete_email_template_form_panel.getForm();
                      if (form.isValid()) {
                        form.submit({
                          clientValidation: false,
                          url: common_url_base + 'delete_email_template',
                          success: function (form, action) {
                            Ext.MessageBox.alert('Success', 'Email template successfully removed.');
                            email_templates_with_none_store.load();
                            email_templates_combo.setValue('None');
                            delete_email_template_window.close();
                          },
                          failure: form_submit_failure_handler
                        });
                      }
                    }
                  },
                  {
                    text: '<b>Cancel</b>',
                    handler: function () {
                      delete_email_template_window.close();
                    }
                  }
                ]
              });

              delete_email_template_window.show();
            }
            else {
              Ext.MessageBox.alert('No template', 'Currently there is no email template saved.');
            }
          }
        });
      }
    }
  ],
  listeners: {
    render: function () {
      email_templates_with_none_store.load();
    }
  }
});

var admin_tab_panel = new Ext.tab.Panel({
  title: 'Admin',
  disabled: disable_admin_tab,
  items: [
    admin_settings_form,
    admin_users_panel,
    admin_projects_panel,
    admin_applications_grid,
    admin_project_uploads_grid,
    faculties_and_assistants_grid,
    admin_pages_panel,
    admin_email_form_panel
    /*
     {
     title: 'Matching Message'
     },
     {
     title: 'Select Matching'
     },
     {
     title: 'Finalize Matching'
     },
     {
     title: 'Matches'
     },
     {
     title: 'Housekeeping'
     }
     */
  ]
});