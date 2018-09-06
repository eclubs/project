var student_home_panel = new Ext.panel.Panel({
    title: 'Home',
    styleHtmlContent: true,
    padding: '0 0 10 10',
    autoScroll: true,
    loader: {
        url: '/protected/index.php/curis/get_dyn_page/student.home',
        loadMask: true
    },
    listeners: {
        render: function () {
            this.loader.load();
        }
    }
});

var update_student_profile_form = function () {
    var form = student_profile_form.getForm();
    form.load({
        url: '/protected/index.php/curis/get_user_details/' + current_user_id,
        success: function () {
            var transcript_path = form.findField('student_profile_transcript').getValue();
            var resume_path = form.findField('student_profile_resume').getValue();

            if (transcript_path && transcript_path.length > 0) {
                Ext.fly('student_profile_transcript_div').update('<a target="_blank" href="' + transcript_path + '">Current Transcript</a>');
            }

            if (resume_path && resume_path.length > 0) {
                Ext.fly('student_profile_resume_div').update('<a target="_blank" href="' + resume_path + '">Current Resume</a>');
            }
        },
        failure: function (form, action) {
            Ext.Msg.alert("Load failed", action.result.msg);
        }
    });
};

var student_profile_form = new Ext.form.Panel({
    title: 'My Profile',
    autoScroll: true,
    padding: '0 0 10 0',
    bodyStyle: {padding: '10px'},
    defaults: {labelWidth: 160},
    items: [
        {
            xtype: 'hidden',
            name: 'id',
            value: current_user_id
        },
        {
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'Your Name',
            width: 350,
            readOnly: true,
            afterLabelTextTpl: required,
            value: current_user_name
        },
        {
            xtype: 'textfield',
            name: 'sunetid',
            fieldLabel: 'Your SUNet ID',
            width: 250,
            readOnly: true,
            afterLabelTextTpl: required,
            value: current_user_sunetid
        },
        {
            xtype: 'textfield',
            name: 'suid',
            fieldLabel: 'Your SUID (8 digits)',
            width: 250,
            afterLabelTextTpl: required
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Your Preferred Email',
            width: 350,
            afterLabelTextTpl: required,
            value: current_user_email
        },
        {
            xtype: 'textfield',
            name: 'webpage',
            fieldLabel: 'Webpage (if you have one)',
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
            allowBlank: false,
            editable: true,
            store: majors_store,
            valueField: 'major',
            displayField: 'major',
            afterLabelTextTpl: required
        },
        {
            xtype: 'numberfield',
            name: 'gpa',
            fieldLabel: 'GPA in Math/CS Courses',
            width: 250
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Will you be getting your degree this coming June?',
            width: 280,
            columns: 2,
            items: [
                {boxLabel: 'Yes', name: 'graduating', inputValue: '1'},
                {boxLabel: 'No', name: 'graduating', inputValue: '0', checked: true}
            ]
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'Will you be a declared CS major by March 1?',
            width: 280,
            columns: 2,
            items: [
                {boxLabel: 'Yes', name: 'majorwhen', inputValue: '1'},
                {boxLabel: 'No', name: 'majorwhen', inputValue: '0', checked: true}
            ]
        },
        {
            xtype: 'radiogroup',
            fieldLabel: 'CS Coterm?',
            width: 280,
            columns: 2,
            items: [
                {boxLabel: 'Yes', name: 'coterm', inputValue: '1'},
                {boxLabel: 'No', name: 'coterm', inputValue: '0', checked: true}
            ]
        },
        {
            xtype: 'combo',
            name: 'year',
            fieldLabel: 'Year at Stanford',
            triggerAction: 'all',
            mode: 'local',
            width: 300,
            allowBlank: false,
            editable: false,
            store: years_store,
            valueField: 'year',
            displayField: 'year',
            value: 'Freshman',
            afterLabelTextTpl: required,
            margin: '0 0 30 0'
        },
        {
            xtype: 'hidden',
            id: 'student_profile_transcript',
            name: 'transcript'
        },
        {
            xtype: 'box',
            html: '<div id="student_profile_transcript_div">No current transcript</div>',
            margin: '0 0 10 0'
        },
        {
            xtype: 'hidden',
            id: 'student_profile_resume',
            name: 'resume'
        },
        {
            xtype: 'box',
            html: '<div id="student_profile_resume_div">No current resume</div>',
            margin: '0 0 30 0'
        },
        {
            xtype: 'fieldset',
            collapsible: false,
            title: 'All uploads must be PDF or TXT files. No special characters in file names!',
            anchor: '60%',
            items: [
                {
                    xtype: 'filefield',
                    name: 'transcript',
                    fieldLabel: 'Upload Transcript',
                    msgTarget: 'side',
                    allowBlank: true,
                    anchor: '100%',
                    buttonText: 'Browse...',
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'filefield',
                    name: 'resume',
                    fieldLabel: 'Upload Resume',
                    msgTarget: 'side',
                    allowBlank: true,
                    anchor: '100%',
                    buttonText: 'Browse...'
                }
            ]
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            text: '<b>Save</b>',
            handler: function () {
                var form = student_profile_form.getForm();
                if (form.isValid()) {
                    form.submit({
                        clientValidation: true,
                        url: '/protected/index.php/curis/update_user_profile',
                        success: function (form, action) {
                            Ext.Msg.alert('Success', 'User Profile Successfully Updated.');
                            update_student_profile_form();
                        },
                        failure: form_submit_failure_handler
                    });
                }
            }
        },
        {
            text: '<b>Clear</b>',
            handler: function () {
                student_profile_form.getForm().reset();
            }
        }
    ],
    listeners: {
        render: function () {
            update_student_profile_form();
        }
    }
});

// ---------------------------------------- my uploads ----------------------------------------------
var student_my_uploads_store = Ext.create('Ext.data.JsonStore', {
    root: 'uploads',
    fields: [
        'id',
        'project_id',
        'title',
        'researchfield',
        'prof_id',
        'professor_name',
        'filename',
        'time'
    ],
    proxy: {
        type: 'ajax',
        url: '/protected/index.php/curis/get_my_uploads',
        reader: {
            type: 'json',
            root: 'uploads',
            idProperty: 'id'
        }
    }
});

var student_my_uploads_grid_file_column = {
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

var student_my_uploads_grid_column = [
    {text: 'Project Title', dataIndex: 'title', width: 290},
    {text: 'Professor', dataIndex: 'professor_name', width: 150},
    {text: 'Research Field', dataIndex: 'researchfield', width: 150},
    student_my_uploads_grid_file_column,
    {text: 'Upload Time', dataIndex: 'time', width: 120},
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
                                url: '/protected/index.php/curis/remove_upload',
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

var student_my_uploads_grid = Ext.create('Ext.grid.Panel', {
    region: 'north',
    height: 400,
    autoScroll: true,
    store: student_my_uploads_store,
    columns: student_my_uploads_grid_column,
    listeners: {
        render: function () {
            student_my_uploads_store.load();
        }
    }
});

var student_my_applied_projects_store = Ext.create('Ext.data.ArrayStore', {
    fields: ['project_id', 'project_name'],
    proxy: {
        type: 'ajax',
        url: '/protected/index.php/curis/get_my_applied_projects',
        reader: {
            type: 'json',
            root: 'projects',
            idProperty: 'project_id'
        }
    }
});

var student_my_uploads_upload_form = Ext.create('Ext.form.Panel', {
    title: 'Upload',
    region: 'center',
    autoScroll: true,
    padding: '0 0 10 0',
    bodyStyle: {padding: '10px'},
    defaults: {labelWidth: 120},
    items: [
        {
            xtype: 'combo',
            name: 'project',
            fieldLabel: 'Select Project',
            triggerAction: 'all',
            mode: 'local',
            anchor: '80%',
            allowBlank: false,
            editable: false,
            store: student_my_applied_projects_store,
            valueField: 'project_id',
            displayField: 'project_name',
            margin: '0 0 10 0'
        },
        {
            xtype: 'filefield',
            name: 'project_upload',
            fieldLabel: 'Upload Project PDF',
            msgTarget: 'side',
            allowBlank: false,
            anchor: '80%',
            buttonText: 'Browse...',
            margin: '0 0 10 0'
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            text: '<b>Upload</b>',
            handler: function () {
                var form = student_my_uploads_upload_form.getForm();
                if (form.isValid()) {
                    form.submit({
                        clientValidation: true,
                        url: '/protected/index.php/curis/upload_project_pdf',
                        success: function (form, action) {
                            Ext.Msg.alert('Success', 'File successfully uploaded.');
                            student_my_uploads_store.load();
                        },
                        failure: form_submit_failure_handler
                    });
                }
            }
        }
    ],
    listeners: {
        render: function () {
            student_my_applied_projects_store.load();
        }
    }
});

var student_my_uploads_panel = Ext.create('Ext.panel.Panel', {
    title: 'My Uploads',
    layout: 'border',
    items: [
        student_my_uploads_grid,
        student_my_uploads_upload_form
    ]
});

// ---------------------------------------- projects ----------------------------------------------
var student_project_details_form_project_id_field = new Ext.form.field.Hidden({
    name: 'id'
});

var student_project_details_form_project_name_field = new Ext.form.field.Text({
    name: 'title',
    fieldLabel: 'Project Name',
    labelWidth: 160,
    width: 600,
    readOnly: true
});

var student_apply_project_window_form_project_name_field = new Ext.form.field.Text({
    name: 'title',
    fieldLabel: 'Project',
    labelWidth: 80,
    readOnly: true,
    fieldStyle: {border: 'none 0px black', background: 'none', 'font-weight': 'bold'},
    anchor: '100%'
});

var student_apply_project_window_form = new Ext.form.Panel({
    bodyStyle: {padding: '10px'},
    padding: '0 0 5 0',
    defaults: {labelWidth: 80},
    items: [
        student_apply_project_window_form_project_name_field,
        {
            xtype: 'combo',
            triggerAction: 'all',
            mode: 'local',
            editable: false,
            store: student_scores_store,
            valueField: 'score',
            displayField: 'name',
            name: 'score',
            fieldLabel: 'Your score',
            anchor: '80%',
            allowBlank: false
        }, {
            xtype: 'textarea',
            name: 'statement',
            fieldLabel: 'Statement',
            anchor: '100%',
            height: 260,
            allowBlank: false,
            emptyText: 'Please fill in one to two sentences answering the following questions: \n' +
            'Why are you interested in this project? \r\n ' +
            'Why do you think you are qualified?'
        }
    ],
    buttonAlign: 'center',
    buttons: [
        {
            text: '<b>Submit</b>',
            handler: function () {
                var project_id = student_project_details_form_project_id_field.getValue();
                var form = student_apply_project_window_form.getForm();
                if (form.isValid()) {
                    student_apply_project_window.hide();
                    form.submit({
                        params: {project_id: project_id},
                        clientValidation: true,
                        url: '/protected/index.php/curis/apply_project',
                        success: function (form, action) {
                            Ext.Msg.alert('Success', 'Application submitted successfully.');
                            my_applications_store.load();
                        },
                        failure: form_submit_failure_handler
                    });
                }
            }
        },
        {
            text: '<b>Cancel</b>',
            handler: function () {
                student_apply_project_window.hide();
            }
        }
    ]
});

var student_apply_project_window = new Ext.window.Window({
    title: 'Project Application',
    height: 400,
    width: 600,
    layout: 'fit',
    closeAction: 'hide',
    items: [
        student_apply_project_window_form
    ],
    listeners: {
        show: function () {
            student_apply_project_window_form_project_name_field.setValue(student_project_details_form_project_name_field.getValue());
        }
    }
});

var student_project_apply_button = new Ext.button.Button({
    text: '<b>Apply</b>',
    disabled: true,
    handler: function () {
        student_apply_project_window.show();
    }
});

var student_project_details_form = new Ext.form.Panel({
    region: 'center',
    autoScroll: true,
    padding: '0 0 10 0',
    bodyStyle: {padding: '10px'},
    defaults: {labelWidth: 160, readOnly: true},
    items: [
        student_project_details_form_project_id_field,
        student_project_details_form_project_name_field,
        {
            xtype: 'textfield',
            name: 'researchfield',
            fieldLabel: 'Field of Research',
            width: 350
        }, {
            xtype: 'textfield',
            name: 'secondfield',
            fieldLabel: 'Field of Research(2nd)',
            width: 350
        }, {
            xtype: 'textfield',
            name: 'thirdfield',
            fieldLabel: 'Field of Research(3rd)',
            width: 350
        }, {
            xtype: 'textfield',
            name: 'year',
            fieldLabel: 'School Year',
            width: 350
        }, {
            xtype: 'textfield',
            name: 'term',
            fieldLabel: 'School Quarter',
            width: 350
        }, {
            xtype: 'textfield',
            name: 'compensation_type',
            fieldLabel: 'Compensation Type',
            width: 350
        }, {
            xtype: 'textfield',
            name: 'url',
            fieldLabel: 'Project URL',
            width: 700
        }, {
            xtype: 'textarea',
            name: 'description',
            fieldLabel: 'Description',
            width: 700,
            height: 200
        }, {
            xtype: 'textarea',
            name: 'background',
            fieldLabel: 'Recommended Background',
            width: 700,
            height: 100
        }, {
            xtype: 'numberfield',
            name: 'capacity',
            width: 250,
            fieldLabel: 'Number of Students (for this project)'
        }, {
            xtype: 'textfield',
            name: 'professor_name',
            fieldLabel: 'Contact Professor',
            width: 400
        }, {
            xtype: 'textfield',
            name: 'professor_email',
            fieldLabel: 'Contact Email',
            width: 400
        }, {
            xtype: 'textarea',
            name: 'spring_prep',
            fieldLabel: 'Prerequisite/Preparation',
            width: 700,
            height: 80
        }
    ],
    buttonAlign: 'center',
    buttons: [
        student_project_apply_button
    ]
});

var filter_projects = function () {
    student_project_details_form.getForm().reset();
    student_project_apply_button.setDisabled(true);

    projects_store.clearFilter();

    var professorName = student_projects_grid_professor_filter_combo.getValue();
    var researchField = student_projects_grid_researchfield_filter_combo.getValue();
    var yearField = student_projects_grid_year_filter_combo.getValue();
    var termField = student_projects_grid_term_filter_combo.getValue();

    projects_store.filterBy(function (record, id) {
        return ((professorName == 'None') ? true : record.get('professor_name') == professorName)
            && ((researchField == 'None') ? true : ((record.get('researchfield') == researchField) || (record.get('secondfield') == researchField) || (record.get('thirdfield') == researchField)))
            && ((yearField == 'None') ? true : record.get('year') == yearField)
            && ((termField == 'None') ? true : record.get('term') == termField);
    });
};

var student_projects_grid_professor_filter_combo = new Ext.form.field.ComboBox({
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
            filter_projects();
        }
    }
});

var student_projects_grid_researchfield_filter_combo = new Ext.form.field.ComboBox({
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
            filter_projects();
        }
    }
});

var student_projects_grid_year_filter_combo = Ext.create('Ext.form.field.ComboBox', {
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
            filter_projects();
        }
    }
});

var student_projects_grid_term_filter_combo = Ext.create('Ext.form.field.ComboBox', {
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
            filter_projects();
        }
    }
});


var student_projects_grid = new Ext.grid.Panel({
    region: 'north',
    height: 200,
    autoScroll: true,
    split: true,
    tbar: [
        'Filter by Professor:',
        student_projects_grid_professor_filter_combo,
        '-',
        'Filter by Research Field:',
        student_projects_grid_researchfield_filter_combo,
        '-',
        'Filter by Year',
        student_projects_grid_year_filter_combo,
        '-',
        'Filter by Quarter',
        student_projects_grid_term_filter_combo
    ],
    store: projects_store,
    columns: projects_grid_column,
    listeners: {
        select: function (grid, rec, i, eOpts) {
            var form = student_project_details_form.getForm();
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
                    {id: 'professor_name', value: rec.get('professor_name')},
                    {id: 'professor_email', value: rec.get('professor_email')},
                    {id: 'spring_prep', value: rec.get('spring_prep')},
                    {id: 'background', value: rec.get('background')},
                    {id: 'capacity', value: rec.get('capacity')}
                ]
            );
            student_project_apply_button.setDisabled(false);
        }
    }
});

var student_projects_panel = new Ext.panel.Panel({
    title: 'Projects',
    layout: 'border',
    items: [
        student_projects_grid,
        student_project_details_form
    ]
});

var student_my_application_details_form_id_field = new Ext.form.field.Hidden({
    name: 'id'
});

var student_my_application_details_form_status_field = new Ext.form.field.Text({
    name: 'status',
    fieldLabel: 'Status',
    labelWidth: 80,
    width: 200,
    fieldStyle: {border: 'none 0px black', background: 'none'},
    readOnly: true
});

var student_my_application_details_form_application_fieldset = new Ext.form.FieldSet({
    collapsible: true,
    collapsed: true,
    title: 'Application Details',
    anchor: '75%',
    defaults: {labelWidth: 80},
    items: [
        student_my_application_details_form_id_field,
        student_my_application_details_form_status_field,
        {
            xtype: 'combo',
            triggerAction: 'all',
            mode: 'local',
            editable: false,
            store: student_scores_store,
            valueField: 'score',
            displayField: 'name',
            name: 'score',
            fieldLabel: 'Your score',
            anchor: '65%',
            allowBlank: false
        }, {
            xtype: 'textarea',
            name: 'statement',
            fieldLabel: 'Statement',
            anchor: '100%',
            height: 160,
            allowBlank: false,
            emptyText: 'Please fill in one to two sentences answering the following questions: \nWhy are you interested in this project? \nWhy do you think you are qualified?'
        }
    ]
});

var student_my_application_details_form_project_fieldset = new Ext.form.FieldSet({
    collapsible: true,
    collapsed: true,
    title: 'Project Details',
    anchor: '100%',
    defaults: {labelWidth: 160, readOnly: true, fieldStyle: {border: 'none 0px black', background: 'none'}},
    items: [
        {
            xtype: 'textfield',
            name: 'title',
            fieldLabel: 'Project Name',
            width: 600
        },
        {
            xtype: 'textfield',
            name: 'researchfield',
            fieldLabel: 'Field of Research',
            width: 350
        },
        {
            xtype: 'textfield',
            name: 'secondfield',
            fieldLabel: 'Field of Research(2nd)',
            width: 350
        },
        {
            xtype: 'textfield',
            name: 'thirdfield',
            fieldLabel: 'Field of Research(3rd)',
            width: 350
        },
        {
            xtype: 'textfield',
            name: 'url',
            fieldLabel: 'Project URL',
            width: 700
        },
        {
            xtype: 'textarea',
            name: 'description',
            fieldLabel: 'Description',
            width: 700,
            height: 200
        },
        {
            xtype: 'textarea',
            name: 'background',
            fieldLabel: 'Recommended Background',
            width: 700,
            height: 100
        },
        {
            xtype: 'numberfield',
            name: 'capacity',
            width: 250,
            fieldLabel: 'Number of Students (for this project)'
        },
        {
            xtype: 'textfield',
            name: 'prof',
            fieldLabel: 'Contact Professor',
            width: 400
        },
        {
            xtype: 'textfield',
            name: 'prof_email',
            fieldLabel: 'Contact Email',
            width: 400
        },
        {
            xtype: 'textarea',
            name: 'spring_prep',
            fieldLabel: 'Prerequisite/Preparation',
            width: 700,
            height: 80
        }
    ]
});

var student_my_application_update_button = new Ext.button.Button({
    text: '<b>Update</b>',
    disabled: true,
    handler: function () {
        var form = student_my_application_details_form.getForm();
        if (form.isValid()) {
            form.submit({
                clientValidation: true,
                url: '/protected/index.php/curis/update_my_application',
                success: function (form, action) {
                    my_applications_store.load();
                    Ext.Msg.alert('Success', 'Application Successfully Updated.');
                },
                failure: form_submit_failure_handler
            });
        }
    }
});

var student_my_application_details_form = new Ext.form.Panel({
    region: 'center',
    autoScroll: true,
    padding: '0 0 10 0',
    bodyStyle: {padding: '10px'},
    items: [
        student_my_application_details_form_application_fieldset,
        student_my_application_details_form_project_fieldset
    ],
    buttonAlign: 'center',
    buttons: [
        student_my_application_update_button
    ]
});

var my_applications_grid_column = [
    {text: 'Title', dataIndex: 'title', width: 290},
    {
        text: 'Professor', dataIndex: 'professor_name', width: 150,
        renderer: function (value, metaData, record) {
            return '<a href="mailto:' + record.get('professor_email') + '">' + value + '</a>';
        }
    },
    {text: 'Research Field', dataIndex: 'researchfield', width: 150},
    {text: 'School Year', dataIndex: 'year', width: 80},
    {text: 'School Quarter', dataIndex: 'term', width: 80},
    {text: 'Capacity', dataIndex: 'capacity', width: 65},
    {text: 'Score', dataIndex: 'score', width: 55}
];

if (student_can_accept_match) {
    my_applications_grid_column = my_applications_grid_column.concat(
        {
            text: 'Prematched', dataIndex: 'prematch', width: 80,
            renderer: function (value) {
                return (value == 0) ? "No" : "<span style='color: green;'>Yes</span>";
            }
        },
        {
            text: 'Matched', dataIndex: 'match', width: 80,
            renderer: function (value) {
                return (value == 0) ? "No" : "<span style='color: green;'>Yes</span>";
            }
        },
        {
            text: 'Status',
            dataIndex: 'status',
            width: 80,
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
            width: 120,
            items: [
                {
                    icon: '/images/icons/thumbs_up.gif',
                    tooltip: 'This application has been matched, accept it',
                    getClass: function (v, meta, rec) {
                        if (rec.data.match == 0) {
                            return 'x-hide-display';
                        }
                    },
                    handler: function (grid, rowIndex, colIndex) {
                        var store = grid.getStore();
                        var rec = store.getAt(rowIndex);
                        var application_id = rec.get('id');
                        var title = rec.get('title');
                        var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to accept the project \"' + title + '"?', function (btn) {
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    url: '/protected/index.php/curis/accept_application',
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
                    tooltip: 'This application has been matched, reject it',
                    getClass: function (v, meta, rec) {
                        if (rec.data.match == 0) {
                            return 'x-hide-display';
                        }
                    },
                    handler: function (grid, rowIndex, colIndex) {
                        var store = grid.getStore();
                        var rec = store.getAt(rowIndex);
                        var application_id = rec.get('id');
                        var title = rec.get('title');
                        var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to decline the project \"' + title + '"?', function (btn) {
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    url: '/protected/index.php/curis/decline_application',
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
                    icon: '/images/icons/remove.png',
                    tooltip: 'Remove this application',
                    handler: function (grid, rowIndex, colIndex) {
                        var store = grid.getStore();
                        var rec = store.getAt(rowIndex);
                        var application_id = rec.get('id');
                        var title = rec.get('title');
                        var confirmed = Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove this application for project \"' + title + "\"?", function (btn) {
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    url: '/protected/index.php/curis/remove_my_application',
                                    params: {
                                        id: application_id
                                    },
                                    success: function (response, request) {
                                        var responseObj = Ext.decode(response.responseText);
                                        if (responseObj.success) {
                                            Ext.MessageBox.alert('Success', 'Application for project \"' + title + '\" successfully removed.');
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
    );
}


var student_my_applications_grid = new Ext.grid.Panel({
    region: 'north',
    height: 200,
    autoScroll: true,
    store: my_applications_store,
    columns: my_applications_grid_column,
    listeners: {
        select: function (grid, rec, i, eOpts) {
            var statusText = '';
            var status = rec.get('status');
            if (status == 0) {
                statusText = 'Pending...';
                student_my_application_details_form_status_field.setFieldStyle({color: 'blue'});
            }
            else if (status > 0) {
                statusText = 'Accepted';
                student_my_application_details_form_status_field.setFieldStyle({color: 'green'});
            }
            else if (status < 0) {
                statusText = 'Declined';
                student_my_application_details_form_status_field.setFieldStyle({color: 'red'});
            }
            var form = student_my_application_details_form.getForm();
            form.setValues(
                [
                    {id: 'id', value: rec.get('id')},
                    {id: 'status', value: statusText},
                    {id: 'score', value: rec.get('score')},
                    {id: 'statement', value: rec.get('statement')},
                    {id: 'title', value: rec.get('title')},
                    {id: 'researchfield', value: rec.get('researchfield')},
                    {id: 'secondfield', value: rec.get('secondfield')},
                    {id: 'thirdfield', value: rec.get('thirdfield')},
                    {id: 'url', value: rec.get('url')},
                    {id: 'description', value: rec.get('description')},
                    {id: 'spring_prep', value: rec.get('spring_prep')},
                    {id: 'background', value: rec.get('background')},
                    {id: 'capacity', value: rec.get('capacity')}
                ]
            );
            student_my_application_details_form_application_fieldset.expand();
            student_my_application_update_button.setDisabled(false);
        }
    }
});

var student_my_applications_panel = new Ext.panel.Panel({
    title: 'My Applications',
    layout: 'border',
    items: [
        student_my_applications_grid,
        student_my_application_details_form
    ]
});

var student_panels = new Array();
student_panels.push(student_home_panel);
student_panels.push(student_profile_form);
student_panels.push(student_my_uploads_panel);
if (student_can_see_projects) {
    student_panels.push(student_projects_panel);
}
student_panels.push(student_my_applications_panel);


var student_tab_panel = new Ext.tab.Panel({
    title: 'Student',
    activeTab: student_tab_index,
    items: student_panels
});