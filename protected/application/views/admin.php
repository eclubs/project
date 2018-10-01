<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>Curis</title>
    <link rel="stylesheet" type="text/css" href="/ext/resources.4.2.1/css/ext-all-gray.css"/>
    <script type="text/javascript" src="/ext/ext-all.4.2.1.js"></script>
    <script type="text/javascript">
        var current_user_id = '<?= $this->current_user->id ?>';
        var current_user_name = <?= json_encode($this->current_user->name) ?>;
        var current_user_sunetid = '<?= $this->current_user->sunetid ?>';
        var current_user_email = '<?= $this->current_user->email ?>';
        var current_user_type = '<?= $this->current_user->type ?>';
        var current_user_is_admin = <?= ($this->current_user->admin == 1) ? "true" : "false" ?>;
        var current_user_is_lecturer = <?= ($this->current_user->lecturer == 1) ? "true" : "false" ?>;
        var current_user_is_assistant = <?= $this->current_user->is_assistant ? "true" : "false" ?>;
        var disable_student_tab = (current_user_type == 'faculty') && !current_user_is_admin;
        var disable_faculty_tab = (current_user_type == 'student') && !current_user_is_admin && !current_user_is_assistant;
        var disable_admin_tab = !current_user_is_admin;
        var landing_login_link = <?= $this->global_settings->login_link ? "true" : "false" ?>;
        var faculty_can_edit_projects = <?= $this->global_settings->fac_edit_proj ? "true" : "false" ?>;
        var faculty_can_assign_assistants = <?= $this->global_settings->fac_assn_asst ? "true" : "false" ?>;
        var faculty_can_rate_applications = <?= $this->global_settings->fac_rate_stud ? "true" : "false" ?>;
        var faculty_can_see_matches = <?= $this->global_settings->fac_see_matches ? "true" : "false" ?>;
        var student_can_edit_profiles = <?= $this->global_settings->stud_edit_prof ? "true" : "false" ?>;
        var student_can_see_projects = <?= $this->global_settings->stud_see_proj ? "true" : "false" ?>;
        var student_can_apply_projects = <?= $this->global_settings->stud_apply ? "true" : "false" ?>;
        var student_can_accept_match = <?= $this->global_settings->stud_accept ? "true" : "false" ?>;
    </script>
    <script type="text/javascript" src="/protected/index.php/Csresearch/common_js"></script>
    <script type="text/javascript" src="/protected/index.php/Csresearch/admin_js"></script>

    <script type="text/javascript">
        Ext.QuickTips.init();
        Ext.tip.QuickTipManager.init();

        Ext.onReady(function () {
            var panels = new Array();
            /*if (!disable_student_tab) {
                panels.push(student_tab_panel);
            }
            if (!disable_faculty_tab) {
                panels.push(faculty_tab_panel);
            }
            if (!disable_admin_tab) {*/
            panels.push(admin_tab_panel);
            //}

            var coloredYesNo = function(flag) {
                return flag ? '<span style="color:green">yes</span>' : '<span style="color:red">no</span>'
            }

            var status_store = Ext.create('Ext.data.ArrayStore', {
                fields: [
                    'name',
                    'value'
                ],
                data: [
                    ['Landing login', coloredYesNo(landing_login_link)],
                    ['Faculties add assistants', coloredYesNo(faculty_can_assign_assistants)],
                    ['Faculties add projects', coloredYesNo(faculty_can_edit_projects)],
                    ['Faculties rate applications', coloredYesNo(faculty_can_rate_applications)],
                    ['Students edit profiles', coloredYesNo(student_can_edit_profiles)],
                    ['Students see projects', coloredYesNo(student_can_see_projects)],
                    ['Students apply projects', coloredYesNo(student_can_apply_projects)],
                    ['Students accept match', coloredYesNo(student_can_accept_match)]
                ]
            });

            var curis_status_panel = Ext.create('Ext.grid.Panel', {
                region: 'west',
                width: 200,
                title: 'Curis status',
                collapsible: true,
                autoScroll: true,
                store: status_store,
                columns: [
                    { text: 'Settings', dataIndex: 'name', width: 140 },
                    { text: 'Allowed', dataIndex: 'value', width: 50 }
                ]
            })

            var main_tab_panel = Ext.create('Ext.tab.Panel', {
                //renderTo: 'main',
                flex: 1,
                region: 'center',
                items: [
                    admin_settings_form,
                    admin_users_panel,
                    admin_projects_panel,
                    admin_applications_grid,
                    admin_project_uploads_grid,
                    faculties_and_assistants_grid,
                    admin_pages_panel,
                    admin_email_form_panel
                ]
            });

            Ext.create('Ext.panel.Panel', {
                layout: 'border',
                width: '100%',
                height: '100%',
                renderTo: 'main',
                items: [
                    main_tab_panel
                ]
            });

        });
    </script>

    <!-- CSS for everything -->
    <style type="text/css">

        #topbar {
            background-color: rgb(177, 4, 14);
            color: #fff;
            width: 100%;
            min-height: 64px;
            position: static;
            padding-left: 24px;
            align-items: center;
            box-sizing: border-box;
            box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
            display: flex;
            position: relative;
        }

        #topbar img {
            width: 32px;
            margin-top: 5px;
            margin-right: 8px;
        }

        #topbar h2 {

            font-size: 1.3125rem;
            font-weight: 500;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            line-height: 1.16667em;
        }

        #main {
            margin-top: -5px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            min-height: 800px;
            height: 90vh;
        }


        #botbar {
            width: 100%;
            text-align: center;
        }

        a img {
            border-width: 0px;
        }

        .x-action-col-icon {
            margin-left: 8px;
        }

        .x-tab-bar {
            font-size: 12px;
        }

        .x-tab-default .x-tab-inner {
            font-size: 12px;
        }
    </style>


</head>
<body>

    <div id="topbar">
        <a href="/protected/index.html"><img src="/protected/static/images/home-icon4.png"/></a><h2>Stanford CS Research - Administration</h2>
    </div>
    <div id="main">&nbsp;</div>
    <br/>&nbsp;<br/>



</body>
</html>