<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>Curis</title>
    <link rel="stylesheet" type="text/css" href="/ext/resources/css/ext-all.css"/>
    <script type="text/javascript" src="/ext/ext-all.js"></script>
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
        var student_tab_index = <?= $student_tab ?>;
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
    <script type="text/javascript" src="/protected/index.php/curis/common_js"></script>
    <script type="text/javascript" src="/protected/index.php/curis/admin_js"></script>
    <script type="text/javascript" src="/protected/index.php/curis/faculty_js"></script>
    <script type="text/javascript" src="/protected/index.php/curis/student_js"></script>
    <script type="text/javascript">
        Ext.QuickTips.init();
        Ext.tip.QuickTipManager.init();

        Ext.onReady(function () {
            var panels = new Array();
            if (!disable_student_tab) {
                panels.push(student_tab_panel);
            }
            if (!disable_faculty_tab) {
                panels.push(faculty_tab_panel);
            }
            if (!disable_admin_tab) {
                panels.push(admin_tab_panel);
            }

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

            var info_panel = Ext.create('Ext.panel.Panel', {
                region: 'south',
                height: 50,
                html: '<div style="text-align: center;"><a href="https://curis.stanford.edu">CURIS Home</a><br/>Version 3.1 2017<br/>For website problems, please file a help ticket <a href="https://support.cs.stanford.edu/hc/en-us/requests/new">here</a>.</div>'
            })

            var main_tab_panel = Ext.create('Ext.tab.Panel', {
                //renderTo: 'main',
                //height: 640,
                region: 'center',
                items: panels
            });

            Ext.create('Ext.container.Viewport', {
                layout: 'border',
                items: [
                    curis_status_panel,
                    main_tab_panel,
                    info_panel
                ]
            })



            /*
             var main_panel = Ext.create('Ext.panel.Panel', {
             //title: 'Curis Main Panel',
             layout: 'border',
             height: 640,
             renderTo: 'main',
             items: [
             {
             region: 'west',
             title: 'Status',
             width: '20%',
             collapsible: true,
             collapsed: true
             },
             main_tab_panel
             ]
             });
             */

        });
    </script>

    <!-- CSS for everything -->
    <style type="text/css">
        #container {
            margin-left: auto;
            margin-right: auto;
            width: 980px;
        }

        #topbar {
            float: left;
            width: 980px;
            height: 130px;
            text-align: center;
        }

        #main {
            float: left;
            width: 980px;
            background-color: #EEEEEE;
        }

        #sidebar {
            width: 140px;
            float: left;
            padding: 5px;
        }

        #sidebar h3, #sidebar ul {
            margin: 0px;
            padding: 0px;
            list-style: none;
        }

        #sidebar li {
            padding-left: 10px;
            margin: 0px;
        }

        #content {
            width: 645px;
            float: left;
            padding: 5px;
            padding-right: 0px;
            background-color: #FFFFFF;
            min-height: 300px;
        }

        #content h1, #content h2 {
            margin: 0px;
            text-align: center;
        }

        #content table td.caption {
            color: #990000;
            text-align: right;
            margin-top: auto;
            margin-bottom: auto;
            padding-right: 3px;
        }

        #content table td.input {
            text-align: left;
            margin-top: auto;
            margin-bottom: auto;
            padding-left: 3px;
        }

        #content table#adminsettings td {
            text-align: left;
        }

        #content table#adminsettings td.button {
            width: 100px;
            text-align: center;
        }

        #content table.projectblurb {
            background-color: #EEEEEE;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
            padding: 10px;
            width: 400px;
        }

        #content table.projectblurb td.caption {
            width: 125px;
        }

        #content .b-red {
            color: #990000;
            font-weight: bold;
        }

        #content .b {
            font-weight: bold;
        }

        #botbar {
            float: left;
            width: 980px;
            text-align: center;
        }

        a img {
            border-width: 0px;
        }

        .projectheader {
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }

        .application {
            width: 90%;
            margin-left: auto;
            margin-right: auto;
            background-color: #EEEEEE;
        }

        .application .caption {
            width: 35%;
        }

        .x-action-col-icon {
            margin-left: 8px;
        }
    </style>


</head>
<body>
<div id="container">
    <div id="topbar">
        <h1 align=left style='text-align:left;font-size:180%'>
            <a href="https://curis.stanford.edu"><img src="https://curis.stanford.edu/logo_small.png"></a>
            <span style='font-size:72.0pt;color:#990000'>C</span>
            <span style='font-size:48.0pt;color:#990000'> </span>
            <span style='color:#990000'>U</span>ndergraduate
            <span style='color:#990000'>R</span>esearch
            <span style='color:#990000'> I</span>nternship
            <span style='font-size:72.0pt;color:#990000'>S</span>
        </h1>
    </div>
    <div id="main"></div>
    <br/>&nbsp;<br/>

    <div id="botbar">
        <p><a href="https://curis.stanford.edu">CURIS Home</a><br>Version 3.1 2017<br>For website problems, please file a help ticket <a
                href="https://support.cs.stanford.edu/hc/en-us/requests/new">here</a>.
    </div>
</div>
</body>
</html>