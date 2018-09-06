// ---------------- Home Panel ----------------
var faculty_home_panel = new Ext.panel.Panel({
  title: 'Home',
  styleHtmlContent: true,
  padding: '0 0 10 10',
  autoScroll: true,
  loader: {
    url: '/protected/index.php/curis/get_dyn_page/faculty.home',
    loadMask: true
  },
  listeners: {
    render: function () {
      this.loader.load();
    }
  }
});

// ---------------- Add Project Panel ----------------
var add_project_form_compensation_type_combos = [];
var add_project_form_year_quarter_checkboxes = [];
var add_project_form_year_quarter_list = [
  '2018-2019 Autumn',
  '2018-2019 Winter',
  '2018-2019 Spring',
  '2018-2019 Summer'
];

for (var i=0; i<4; i++) {
  var default_value = (i == 0) ? 'RAship (stipend)' : 'Academic Credit';
  add_project_form_compensation_type_combos[i] = Ext.create('Ext.form.field.ComboBox', {
    id: 'add_project_form_compensation_type_combo_' + i,
    name: 'compensation_type_' + i,
    fieldLabel: 'Compensation Type',
    triggerAction: 'all',
    mode: 'local',
    labelWidth: 140,
    width: 350,
    allowBlank: true,
    editable: true,
    store: compensation_type_fields_store,
    valueField: 'compensation_type_field',
    displayField: 'compensation_type_field',
    value: default_value,
    afterLabelTextTpl: required,
    hidden: true
  });
}

for (var i=0; i<4; i++) {
  add_project_form_year_quarter_checkboxes[i] = Ext.create('Ext.form.field.Checkbox', {
    boxLabel: add_project_form_year_quarter_list[i],
    name: 'year_quarter_' + i,
    associated_combo_id: 'add_project_form_compensation_type_combo_' + i,
    inputValue: add_project_form_year_quarter_list[i],
    listeners: {
      change: function(me, newValue, oldValue, opts) {
        Ext.getCmp(me.associated_combo_id).setVisible(newValue);
      }
    }
  });
}

var faculty_add_project_form = new Ext.form.Panel({
  title: 'Add Project',
  id: 'add_project_form',
  autoScroll: true,
  padding: '0 0 10 0',
  bodyStyle: {padding: '10px'},
  defaults: {labelWidth: 170},
  items: [
    {
      xtype: 'textfield',
      name: 'title',
      fieldLabel: 'Project Name',
      width: 600,
      afterLabelTextTpl: required,
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
      displayField: 'research_field',
      afterLabelTextTpl: required
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
    /*{
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
      displayField: 'year_field',
      afterLabelTextTpl: required
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
      displayField: 'term_field',
      afterLabelTextTpl: required
    },*/
    {
      xtype: 'fieldcontainer',
      fieldLabel: 'School Quarter(s)',
      afterLabelTextTpl: required,
      items: [
        add_project_form_year_quarter_checkboxes[0],
        add_project_form_compensation_type_combos[0],
        add_project_form_year_quarter_checkboxes[1],
        add_project_form_compensation_type_combos[1],
        add_project_form_year_quarter_checkboxes[2],
        add_project_form_compensation_type_combos[2],
        add_project_form_year_quarter_checkboxes[3],
        add_project_form_compensation_type_combos[3]
        /*{
          xtype: 'checkboxfield',
          boxLabel: '2015-2016 Autumn',
          name: 'year_term1',
          inputValue: '2015-2016,Autumn',
          id: 'year_term_checkbox1',
          listeners: {
            change: function(me, newValue, oldValue, opts) {
              Ext.getCmp('compensation_type_combo1').setVisible(newValue);
            }
          }
        },
        {
          xtype: 'combo',
          id: 'compensation_type_combo1',
          name: 'compensation_type1',
          fieldLabel: 'Compensation Type',
          triggerAction: 'all',
          mode: 'local',
          labelWidth: 140,
          width: 350,
          allowBlank: true,
          editable: true,
          store: compensation_type_fields_store,
          valueField: 'compensation_type_field',
          displayField: 'compensation_type_field',
          afterLabelTextTpl: required,
          hidden: true
        },
        {
          xtype: 'checkboxfield',
          boxLabel: '2015-2016 Winter',
          name: 'year_term2',
          inputValue: '2015-2016,Winter',
          id: 'year_term_checkbox2',
          listeners: {
            change: function(me, newValue, oldValue, opts) {
              Ext.getCmp('compensation_type_combo2').setVisible(newValue);
            }
          }
        },
        {
          xtype: 'combo',
          id: 'compensation_type_combo2',
          name: 'compensation_type2',
          fieldLabel: 'Compensation Type',
          triggerAction: 'all',
          mode: 'local',
          labelWidth: 140,
          width: 350,
          allowBlank: true,
          editable: true,
          store: compensation_type_fields_store,
          valueField: 'compensation_type_field',
          displayField: 'compensation_type_field',
          afterLabelTextTpl: required,
          hidden: true
        },
        {
          xtype: 'checkboxfield',
          boxLabel: '2015-2016 Spring',
          name: 'year_term3',
          inputValue: '2015-2016,Spring',
          id: 'year_term_checkbox3',
          listeners: {
            change: function(me, newValue, oldValue, opts) {
              Ext.getCmp('compensation_type_combo3').setVisible(newValue);
            }
          }
        },
        {
          xtype: 'combo',
          id: 'compensation_type_combo3',
          name: 'compensation_type3',
          fieldLabel: 'Compensation Type',
          triggerAction: 'all',
          mode: 'local',
          labelWidth: 140,
          width: 350,
          allowBlank: true,
          editable: true,
          store: compensation_type_fields_store,
          valueField: 'compensation_type_field',
          displayField: 'compensation_type_field',
          afterLabelTextTpl: required,
          hidden: true
        },
        {
          xtype: 'checkboxfield',
          boxLabel: '2016-2017 Summer',
          name: 'year_term4',
          inputValue: '2016-2017,Summer',
          id: 'year_term_checkbox4',
          listeners: {
            change: function(me, newValue, oldValue, opts) {
              Ext.getCmp('compensation_type_combo4').setVisible(newValue);
            }
          }
        },
        {
          xtype: 'combo',
          id: 'compensation_type_combo4',
          name: 'compensation_type4',
          fieldLabel: 'Compensation Type',
          triggerAction: 'all',
          mode: 'local',
          labelWidth: 140,
          width: 350,
          allowBlank: true,
          editable: true,
          store: compensation_type_fields_store,
          valueField: 'compensation_type_field',
          displayField: 'compensation_type_field',
          afterLabelTextTpl: required,
          hidden: true
        }*/
      ]
    },
    {
      xtype: 'textfield',
      name: 'url',
      fieldLabel: 'Project URL',
      width: 700,
      allowBlank: true
    },
    {
      xtype: 'textarea',
      name: 'description',
      fieldLabel: 'Description',
      width: 700,
      height: 200,
      afterLabelTextTpl: required,
      allowBlank: false
    },
    {
      xtype: 'textarea',
      name: 'background',
      fieldLabel: 'Recommended Background',
      width: 700,
      height: 100,
      afterLabelTextTpl: required,
      allowBlank: false
    },
    {
      xtype: 'numberfield',
      name: 'capacity',
      width: 250,
      fieldLabel: 'Number of Students Allowed for This Project',
      minValue: 0,
      maxValue: 100,
      afterLabelTextTpl: required,
      allowBlank: false
    },
    {
      xtype: 'combo',
      name: 'prof_id',
      fieldLabel: 'Contact Professor',
      width: 400,
      allowBlank: false,
      triggerAction: 'all',
      mode: 'local',
      editable: false,
      store: faculties_for_project_store,
      valueField: 'id',
      displayField: 'name',
      afterLabelTextTpl: required,
      listeners: {
        afterrender: function (combo) {
          var recordSelected = combo.getStore().getAt(0);
          combo.setValue(recordSelected.get('id'));
        }
      }
    },
    {
      xtype: 'textarea',
      name: 'spring_prep',
      fieldLabel: 'Prerequisite/Preparation',
      width: 700,
      height: 80,
      afterLabelTextTpl: required,
      allowBlank: false
    }
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Add</b>',
      handler: function () {
        var form = Ext.getCmp('add_project_form').getForm();
        if (form.isValid()) {
          var any_checked = false;
          for (var i=0; i<4; i++) {
            any_checked = any_checked || add_project_form_year_quarter_checkboxes[i].getValue();
            if (add_project_form_year_quarter_checkboxes[i].getValue()) {
              if (!add_project_form_compensation_type_combos[i].getValue()) {
                Ext.Msg.alert('Form Not Complete', '<span style="color:red">Please select the compensation type for the checked school quarter.</span>');
                return;
              }
            }
          }
          if (!any_checked) {
            Ext.Msg.alert('Form Not Complete', '<span style="color:red">Please select at least 1 school quarter.</span>');
            return;
          }

          form.submit({
            clientValidation: true,
            url: '/protected/index.php/curis/add_project',
            success: function (form, action) {
              Ext.Msg.alert('Success', 'Project Successfully Created.');
              projects_store.load();
              my_projects_store.load();
            },
            failure: form_submit_failure_handler
          });
        }
        else {
          Ext.Msg.alert('Form Not Complete', '<span style="color:red">Please fill in all required fields.</span>');
        }
      }
    },
    {
      text: 'Clear',
      handler: function () {
        var form = Ext.getCmp('add_project_form').getForm();
        form.reset();
      }
    }
  ]
});

// ---------------- My Projects Panel ----------------
var faculty_my_project_update_form_update_btn = new Ext.button.Button({
  text: '<b>Update</b>',
  disabled: true,
  handler: function () {
    var form = Ext.getCmp('my_project_details').getForm();
    if (form.isValid()) {
      form.submit({
        clientValidation: true,
        url: '/protected/index.php/curis/update_project',
        success: function (form, action) {
          Ext.Msg.alert('Success', 'Project Successfully Updated.');
          //projects_store.load();
          my_projects_store.load();
        },
        failure: form_submit_failure_handler
      });
    }
    else {
      Ext.Msg.alert('Fail to Update', 'Please enter all the fields correctly.');
    }
  }
});

var faculty_my_project_update_form_professor_combobox = new Ext.form.field.ComboBox({
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
  displayField: 'name',
  listeners: {
    afterrender: function (combo) {
      var recordSelected = combo.getStore().getAt(0);
      combo.setValue(recordSelected.get('id'));
    }
  }
});

var faculty_my_project_update_form = new Ext.form.Panel({
  id: 'my_project_details',
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
      width: 700,
      allowBlank: true
    },
    {
      xtype: 'textarea',
      name: 'description',
      fieldLabel: 'Description',
      width: 700,
      height: 200,
      allowBlank: false
    },
    {
      xtype: 'textarea',
      name: 'background',
      fieldLabel: 'Recommended Background',
      width: 700,
      height: 100,
      allowBlank: false
    },
    {
      xtype: 'numberfield',
      name: 'capacity',
      width: 250,
      fieldLabel: 'Number of Students (for this project)',
      minValue: 0,
      maxValue: 100,
      allowBlank: false
    },
    faculty_my_project_update_form_professor_combobox,
    {
      xtype: 'textarea',
      name: 'spring_prep',
      fieldLabel: 'Prerequisite/Preparation',
      width: 700,
      height: 80,
      allowBlank: false
    }
  ],
  buttonAlign: 'center',
  buttons: [
    faculty_my_project_update_form_update_btn
  ]
});

var my_projects_grid_column = [
  { text: 'Title', dataIndex: 'title', width: 290 },
  { text: 'Research Field', dataIndex: 'researchfield', width: 150 },
  { text: 'School Year', dataIndex: 'year', width: 80 },
  { text: 'School Quarter', dataIndex: 'term', width: 80 },
  { text: 'Compensation Type', dataIndex: 'compensation_type', width: 120 },
  projects_grid_url_column,
  { text: 'Capacity', dataIndex: 'capacity', tooltip: 'the number of students allowed for this project', width: 50 },
  { text: 'Creation Time', dataIndex: 'creation_time', width: 120 },
  {
    xtype: 'actioncolumn',
    header: '',
    sortable: false,
    resizable: true,
    menuDisabled: true,
    width: 30,
    items: [
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
                url: '/protected/index.php/curis/remove_project',
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

var my_projects_store = new Ext.data.JsonStore({
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
    'spring_prep',
    'background',
    'capacity',
    'prof_id',
    'prof_sunetid',
    'save',
    'creation_time',
    'professor_name',
    'professor_name_email'
  ],
  proxy: {
    type: 'ajax',
    url: '/protected/index.php/curis/get_my_projects',
    reader: {
      type: 'json',
      root: 'projects',
      idProperty: 'id'
    }
  }
});

var faculty_my_projects_grid = new Ext.grid.Panel({
  id: 'my_projects_grid',
  region: 'north',
  height: 200,
  autoScroll: true,
  store: my_projects_store,
  columns: my_projects_grid_column,
  listeners: {
    select: function (grid, rec, i, eOpts) {
      var id = rec.get('id');
      var title = rec.get('title');
      var researchfield = rec.get('researchfield');
      var secondfield = rec.get('secondfield');
      var thirdfield = rec.get('thirdfield');
      var year = rec.get('year');
      var term = rec.get('term');
      var compensation_type = rec.get('compensation_type');
      var url = rec.get('url');
      var description = rec.get('description');
      var prof_id = rec.get('prof_id');
      var spring_prep = rec.get('spring_prep');
      var background = rec.get('background');
      var capacity = rec.get('capacity');
      var form = faculty_my_project_update_form.getForm();
      form.setValues(
        [
          {id: 'id', value: id},
          {id: 'title', value: title},
          {id: 'researchfield', value: researchfield},
          {id: 'secondfield', value: secondfield},
          {id: 'thirdfield', value: thirdfield},
          {id: 'year', value: year},
          {id: 'term', value: term},
          {id: 'compensation_type', value: compensation_type},
          {id: 'url', value: url},
          {id: 'description', value: description},
          {id: 'prof_id', value: prof_id},
          {id: 'spring_prep', value: spring_prep},
          {id: 'background', value: background},
          {id: 'capacity', value: capacity}
        ]
      );
      faculty_my_project_update_form_update_btn.setDisabled(false);
    },
    render: function () {
      this.store.load();
    }
  }
});

var faculty_my_projects_panel = new Ext.panel.Panel({
  title: 'My Projects',
  layout: 'border',
  items: [
    faculty_my_projects_grid,
    faculty_my_project_update_form
  ]
});

// ---------------- Assistants Panel ----------------
var faculty_assistants_panel = new Ext.panel.Panel({
  title: 'Assistants',
  layout: 'border',
  items: [
    {
      id: 'assistants_grid',
      xtype: 'gridpanel',
      region: 'north',
      height: 350,
      autoScroll: true,
      store: assistants_store,
      columns: [
        { text: 'Name', dataIndex: 'name', width: 260 },
        { text: 'SUNet ID', dataIndex: 'sunetid', width: 100 },
        { text: 'email', dataIndex: 'email', width: 160 },
        { text: 'Assign Time', dataIndex: 'assign_time', width: 120 },
        {
          xtype: 'actioncolumn',
          header: '',
          sortable: false,
          resizable: true,
          menuDisabled: true,
          width: 30,
          items: [
            {
              icon: '/images/icons/remove.png',
              tooltip: 'Remove this assistant',
              handler: function (grid, rowIndex, colIndex) {
                var rec = assistants_store.getAt(rowIndex);
                var fac_id = rec.get('fac_id');
                var asst_id = rec.get('id');
                var name = rec.get('name');
                var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove assistant \"' + name + "\"?", function (btn) {
                  if (btn == 'yes') {
                    Ext.Ajax.request({
                      url: '/protected/index.php/curis/remove_assistant',
                      params: {
                        fac_id: fac_id,
                        asst_id: asst_id
                      },
                      success: function (response, request) {
                        var responseObj = Ext.decode(response.responseText);
                        if (responseObj.success) {
                          Ext.MessageBox.alert('Success', 'Assistant \"' + name + '\" successfully removed.');
                          assistants_store.load();
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
      ]
    },
    {
      title: 'Nominate Assistants',
      layout: 'hbox',
      region: 'center',
      bodyStyle: {padding: '10px'},
      items: [
        {
          id: 'assistant_sunetid_field',
          xtype: 'textfield',
          name: 'sunetid',
          fieldLabel: 'SUNet ID',
          labelWidth: 60,
          width: 240,
          allowBlank: false
        },
        {
          xtype: 'box',
          width: 10,
          height: 10
        },
        {
          xtype: 'button',
          text: 'Add Assistant',
          tooltip: 'You can use this interface to nominate people by SUNet ID to act as your proxy through the CURIS website faculty interface.',
          handler: function () {
            var sunetid = Ext.getCmp('assistant_sunetid_field').getValue();
            Ext.Ajax.request({
              url: '/protected/index.php/curis/add_assistant',
              params: {
                sunetid: sunetid
              },
              success: function (response, request) {
                var responseObj = Ext.decode(response.responseText);
                if (responseObj.success) {
                  Ext.MessageBox.alert('Success', 'Assistant \"' + sunetid + '\" successfully added.');
                  assistants_store.load();
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
        }
      ]
    }
  ],
  listeners: {
    render: function() {
      assistants_store.load();
    }
  }
});

// ---------------- Applications Panel ----------------
var application_review_form = new Ext.form.Panel({
  autoScroll: true,
  waitMsgTarget: true,
  padding: '0 0 10 0',
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
          id: 'applicant_review_profile_transcript',
          name: 'transcript'
        },
        {
          xtype: 'box',
          html: '<div id="applicant_review_profile_transcript_div">Transcript not available</div>',
          margin: '0 0 10 0'
        },
        {
          xtype: 'hidden',
          id: 'applicant_review_profile_resume',
          name: 'resume'
        },
        {
          xtype: 'box',
          html: '<div id="applicant_review_profile_resume_div">Resume not available</div>',
          margin: '0 0 30 0'
        }
      ]
    },
    {
      xtype: 'fieldset',
      collapsible: false,
      title: 'To have a student be considered for a project you need to provide a score:',
      anchor: '100%',
      items: [
        {
          xtype: 'combo',
          name: 'fac_rating1',
          triggerAction: 'all',
          mode: 'local',
          editable: false,
          store: faculty_scores_store,
          valueField: 'score',
          displayField: 'name',
          fieldLabel: 'My rating',
          anchor: '60%',
          allowBlank: false
        }
      ]
    }
  ],
  buttonAlign: 'center',
  buttons: [
    {
      text: '<b>Submit</b>',
      handler: function () {
        var form = application_review_form.getForm();
        if (form.isValid()) {
          form.submit({
            clientValidation: true,
            url: '/protected/index.php/curis/update_faculty_rating',
            success: function (form, action) {
              Ext.Msg.alert('Success', 'Project Successfully Updated.');
              //applications_of_my_projects_store.load();
              load_applications_of_my_projects();
              faculty_applicant_profile_window.hide();
            },
            failure: form_submit_failure_handler
          });
        }
      }
    }
  ]
});

var faculty_applicant_profile_window = new Ext.window.Window({
  title: 'Application',
  width: 800,
  height: 500,
  autoScroll: true,
  closeAction: 'hide',
  items: [
    application_review_form
  ]
});

var faculty_applications_grid_column = [
  { text: 'ID', dataIndex: 'id', width: 40 },
  { text: 'Project Title', dataIndex: 'title', width: 290 },
  //{ text: 'School Year', dataIndex: 'year', width: 80 },
  //{ text: 'School Quarter', dataIndex: 'term', width: 80 },
  { text: 'Applicant', dataIndex: 'student_name', width: 150 },
  { text: 'Student Score', dataIndex: 'score', width: 80 },
  { text: 'My Rating', dataIndex: 'fac_rating1', width: 80,
    renderer: function (value) {
      return (value == 0) ? "not rated" : value;
    }},
  { text: 'Prematch', dataIndex: 'prematch', width: 65,
    renderer: function (value) {
      return (value == 0) ? "No" : "Yes";
    }
  },
  { text: 'Matched', dataIndex: 'match', width: 65,
    renderer: function (value) {
      return (value == 0) ? "No" : "Yes";
    }
  },
  {
    text: 'Status',
    dataIndex: 'status',
    width: 70,
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
                url: '/protected/index.php/curis/prematch_application',
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
                url: '/protected/index.php/curis/unprematch_application',
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
      }
    ]
  }
];

var applications_of_my_projects_store = Ext.create('Ext.data.JsonStore', {
  autoLoad: false,
  root: 'applications',
  fields: [
    'id',
    'user_id',
    'project_id',
    'score',
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
    'capacity',
    'student_name',
    'student_email'
  ],
  proxy: {
    type: 'ajax',
    //url: '/protected/index.php/curis/get_applications_of_my_projects',
    url: '/protected/index.php/curis/success_json/null',
    reader: {
      type: 'json',
      root: 'applications',
      idProperty: 'id'
    }
  }
});

var faculty_applications_grid_year_filter_combo = Ext.create('Ext.form.field.ComboBox', {
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
      //filter_projects();
      load_applications_of_my_projects();
    }
  }
});

var faculty_applications_grid_term_filter_combo = Ext.create('Ext.form.field.ComboBox', {
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
      //filter_projects();
      load_applications_of_my_projects();
    }
  }
});

var load_applications_of_my_projects = function() {
  applications_of_my_projects_store.load({
    url: '/protected/index.php/curis/get_applications_of_my_projects',
    params: {
      year: faculty_applications_grid_year_filter_combo.getValue(),
      term: faculty_applications_grid_term_filter_combo.getValue()
    }
  });
};

var faculty_applications_grid = Ext.create('Ext.grid.Panel', {
  title: 'Applications',
  autoScroll: true,
  store: applications_of_my_projects_store,
  columns: faculty_applications_grid_column,
  tbar: [
    'Select Year',
    faculty_applications_grid_year_filter_combo,
    '-',
    'Select Quarter',
    faculty_applications_grid_term_filter_combo
  ],
  listeners: {
    afterrender: function() {
      load_applications_of_my_projects();
    },
    select: function (grid, rec, i) {
      var application_id = rec.get('id');
      var form = application_review_form.getForm();
      form.reset();
      faculty_applicant_profile_window.show();
      form.load({
        url: '/protected/index.php/curis/get_application_details/' + application_id,
        waitMsg: 'Loading...',
        success: function () {
          var transcript_path = form.findField('applicant_review_profile_transcript').getValue();
          var resume_path = form.findField('applicant_review_profile_resume').getValue();

          if (transcript_path && transcript_path.length > 0) {
            Ext.fly('applicant_review_profile_transcript_div').update('<a target="_blank" href="' + transcript_path + '">Current Transcript</a>');
          }
          else {
            Ext.fly('applicant_review_profile_transcript_div').update('Transcript not available');
          }

          if (resume_path && resume_path.length > 0) {
            Ext.fly('applicant_review_profile_resume_div').update('<a target="_blank" href="' + resume_path + '">Current Resume</a>');
          }
          else {
            Ext.fly('applicant_review_profile_resume_div').update('Resume not available');
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
var faculty_project_uploads_store = Ext.create('Ext.data.JsonStore', {
  root: 'uploads',
  fields: [
    'id',
    'project_id',
    'title',
    'researchfield',
    'student_id',
    'student_name',
    'filename',
    'time'
  ],
  proxy: {
    type: 'ajax',
    url: '/protected/index.php/curis/get_faculty_project_uploads',
    reader: {
      type: 'json',
      root: 'uploads',
      idProperty: 'id'
    }
  }
});

var faculty_project_uploads_grid_file_column = {
  text: 'File Link',
  dataIndex: 'filename',
  width: 300,
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

var faculty_project_uploads_grid_column = [
  { text: 'Project Title', dataIndex: 'title', width: 340 },
  { text: 'Student Name', dataIndex: 'student_name', width: 180 },
  faculty_project_uploads_grid_file_column,
  { text: 'Upload Time', dataIndex: 'time', width: 140 }
];

var faculty_project_uploads_grid = Ext.create('Ext.grid.Panel', {
  title: 'Project Uploads',
  autoScroll: true,
  store: faculty_project_uploads_store,
  columns: faculty_project_uploads_grid_column,
  listeners: {
    render: function() {
      faculty_project_uploads_store.load();
    }
  }
});

var faculty_panels = new Array();
faculty_panels.push(faculty_home_panel);
faculty_panels.push(faculty_add_project_form);
faculty_panels.push(faculty_my_projects_panel);
if (current_user_type == 'faculty' || current_user_is_admin) {
  faculty_panels.push(faculty_assistants_panel);
}
faculty_panels.push(faculty_applications_grid);
faculty_panels.push(faculty_project_uploads_grid);

var faculty_tab_panel_title = current_user_is_lecturer ? 'Lecturer' : 'Faculty';

var faculty_tab_panel = new Ext.tab.Panel({
  title: faculty_tab_panel_title,
  disabled: disable_faculty_tab,
  items: faculty_panels
});
