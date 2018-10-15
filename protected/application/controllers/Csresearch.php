<?php

defined('BASEPATH') OR exit('No direct script access allowed');

//require_once(APPPATH . "models/matching/application_edge.php");
//require_once(APPPATH . "models/matching/project_vertex.php");
//require_once(APPPATH . "models/matching/student_vertex.php");
//require_once(APPPATH . "models/matching/application_matching.php");

class Csresearch extends CI_Controller
{
    public $global_settings;
    public $current_user;
    public $assisted_faculty;

    function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->authenticate();
        $this->loadsettings();
    }

    /**
     * Grab the user's information from WebAuth and load any stored info from
     * the database.
     */
    function authenticate()
    {
        include 'authentication.php';
    }

    /**
     * Load the global settings from the database.
     */
    function loadsettings()
    {
        $this->global_settings = Global_settings::all()->first();
    }

    public function index()
    {
        /*if ($this->global_settings->login_link || $this->current_user->admin) {
            if (isset($_GET['student_tab'])) {
                $vdata['student_tab'] = $_GET['student_tab'];
            } else {
                $vdata['student_tab'] = 0;
            }
            $this->load->view('curis', $vdata);
        } else {
            $vdata['message'] = 'CURIS currently disabled by admin.';
            $this->load->view('message', $vdata);
        }*/
        //phpinfo();
        $vdata['message'] = 'CURIS currently under development...';
        $this->load->view('message', $vdata);
    }

    public function admin() {
        if ($this->current_user->admin) {
            $this->load->view('admin');
        }
        else {
            $vdata['message'] = "You don't have admin privilege.";
            $this->load->view('message', $vdata);
        }
    }

    public function common_js()
    {
        $this->load->view('common.js');
    }

    public function admin_js()
    {
        $this->load->view('admin.js');
    }

    public function faculty_js()
    {
        $this->load->view('faculty.js');
    }

    public function student_js()
    {
        $this->load->view('student.js');
    }

    public function success_json($msg)
    {
        $result['success'] = true;
        if (!empty($msg)) {
            $result['msg'] = $msg;
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function success_json_with_data($data, $data_name = 'data')
    {
        $result['success'] = true;
        if (!empty($data_name)) {
            $result[$data_name] = $data;
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function failure_json($msg = '')
    {
        $result['success'] = false;
        if (!empty($msg)) {
            $result['msg'] = $msg;
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function status_json($status, $msg)
    {
        if ($status) {
            $this->success_json($msg);
        } else {
            $this->failure_json($msg);
        }
    }

    public function check_array_item($arr, $key) {
        return (array_key_exists($key, $arr) && isset($arr[$key]) && !empty($arr[$key]));
    }

    public function current_user()
    {
        $result['success'] = true;
        $result['user']['id'] = $this->current_user->id;
        $result['user']['name'] = $this->current_user->name;
        $result['user']['sunetid'] = $this->current_user->sunetid;
        $result['user']['suid'] = $this->current_user->suid;
        $result['user']['type'] = $this->current_user->type;
        $result['user']['email'] = $this->current_user->email;
        $result['user']['webpage'] = $this->current_user->webpage;
        $result['user']['interestarea'] = $this->current_user->interestarea;
        $result['user']['major'] = $this->current_user->major;
        $result['user']['gpa'] = $this->current_user->gpa;
        $result['user']['year'] = $this->current_user->year;
        $result['user']['admin'] = $this->current_user->admin;

        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_projects()
    {
        $projects = array();
        $query = $this->db->query("SELECT projects.*, users.name AS professor_name, users.email AS professor_email FROM projects, users WHERE projects.prof_id = users.id and projects.full = 0 ORDER BY projects.creation_time DESC");
        foreach ($query->result_array() as $project) {
            $projects[] = $project;
        }
        $result['success'] = true;
        $result['projects'] = $projects;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_all_projects()
    {
        $projects = array();
        $query = $this->db->query("SELECT projects.*, users.name AS professor_name, users.email AS professor_email FROM projects, users WHERE projects.prof_id = users.id ORDER BY projects.creation_time DESC");
        foreach ($query->result_array() as $project) {
            $projects[] = $project;
        }
        $result['success'] = true;
        $result['projects'] = $projects;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_my_projects()
    {
        $projects = array();
        if ($this->current_user->type == 'student') {
            $query = $this->db->query("SELECT projects.* FROM projects WHERE projects.prof_id IN (SELECT fac_id FROM assistants WHERE asst_id = '{$this->current_user->id}') ORDER BY projects.creation_time DESC");
        } else {
            $query = $this->db->query("SELECT projects.* FROM projects WHERE projects.prof_id = '{$this->current_user->id}' ORDER BY projects.creation_time DESC");
        }

        foreach ($query->result_array() as $project) {
            $projects[] = $project;
        }
        $result['success'] = true;
        $result['projects'] = $projects;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_my_applied_projects()
    {
        $projects = array();
        $query = $this->db->query("SELECT projects.id as project_id, projects.title as project_name FROM projects, applications WHERE projects.id = applications.project_id and applications.user_id = '{$this->current_user->id}' ORDER BY projects.creation_time DESC");
        foreach ($query->result_array() as $project) {
            $projects[] = $project;
        }
        $result['success'] = true;
        $result['projects'] = $projects;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function add_project()
    {
        if (!$this->current_user->admin) {
            if ($this->current_user->type == 'faculty') {
                if (!$this->global_settings->fac_edit_proj) {
                    $this->failure_json('Faculty edit project function is currently disabled.');
                    return;
                }
            } else {
                $this->failure_json('Permission denied since you are not admin or faculty.');
                return;
            }
        }

        $status = true;
        if (isset($_POST['year_quarter_0'])) {
            $year_quarter = explode(" ", $_POST['year_quarter_0']);
            $project = new Project();
            foreach ($_POST as $field => $value) {
                $project->$field = $value;
            }
            $project->year = $year_quarter[0];
            $project->term = $year_quarter[1];
            $project->compensation_type = $_POST['compensation_type_0'];
            $project->prof_id = $this->current_user->id;
            $status = $status && $project->save();
        }

        if (isset($_POST['year_quarter_1'])) {
            $year_quarter = explode(" ", $_POST['year_quarter_1']);
            $project = new Project();
            foreach ($_POST as $field => $value) {
                $project->$field = $value;
            }
            $project->year = $year_quarter[0];
            $project->term = $year_quarter[1];
            $project->compensation_type = $_POST['compensation_type_1'];
            $project->prof_id = $this->current_user->id;
            $status = $status && $project->save();
        }

        if (isset($_POST['year_quarter_2'])) {
            $year_quarter = explode(" ", $_POST['year_quarter_2']);
            $project = new Project();
            foreach ($_POST as $field => $value) {
                $project->$field = $value;
            }
            $project->year = $year_quarter[0];
            $project->term = $year_quarter[1];
            $project->compensation_type = $_POST['compensation_type_2'];
            $project->prof_id = $this->current_user->id;
            $status = $status && $project->save();
        }

        if (isset($_POST['year_quarter_3'])) {
            $year_quarter = explode(" ", $_POST['year_quarter_3']);
            $project = new Project();
            foreach ($_POST as $field => $value) {
                $project->$field = $value;
            }
            $project->year = $year_quarter[0];
            $project->term = $year_quarter[1];
            $project->compensation_type = $_POST['compensation_type_3'];
            $project->prof_id = $this->current_user->id;
            $status = $status && $project->save();
        }

        $this->status_json($status, $this->db->error());
    }

    public function update_project()
    {
        if (!$this->current_user->admin) {
            if ($this->current_user->type == 'faculty') {
                if (!$this->global_settings->fac_edit_proj) {
                    $this->failure_json('Faculty edit project function is currently disabled.');
                    return;
                }
            } else {
                $this->failure_json('Permission denied since you are not admin or faculty.');
                return;
            }
        }
        $proj_id = $_POST['id'];
        //$project = new Project($proj_id);
        $project = Project::find($proj_id);

        // reject term and year update if there are existing applications
        if ($project->term != $_POST['term'] || $project->year != $_POST['year']) {
            $query = $this->db->query("SELECT * FROM applications WHERE project_id = $proj_id");
            if ($query->num_rows() > 0) {
                $this->status_json(false, "This project has existing applications. Updating Year or Quarter is disallowed. Please create it as a new project instead.");
                return;
            }

        }

        foreach ($_POST as $field => $value) {
            $project->$field = $value;
        }
        $status = $project->save();
        $this->status_json($status, "");
    }

    public function remove_project()
    {
        $proj_id = $_POST['id'];
        if (!$this->current_user->admin) {
            if ($this->current_user->type == 'faculty') {
                if (!$this->global_settings->fac_edit_proj) {
                    $this->failure_json('Faculty edit project function is currently disabled by admin.');
                    return;
                }
                $applications = new Application();
                $applications->where('project_id', $proj_id)->get();
                if ($applications->result_count() > 0) {
                    $this->failure_json('There are applications pending for this project, please contact action@cs to remove this project.');
                    return;
                }
            } else {
                $this->failure_json('Permission denied since you are not admin or faculty.');
                return;
            }
        }

        $project = Project::find($proj_id);
        $project->delete();
        $this->status_json(true, "");
    }

    public function close_project()
    {
        $proj_id = $_POST['id'];
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }

        $project = new Project($proj_id);
        $project->full = 1;
        $status = $project->save();
        $this->status_json($status, "");
    }

    public function reopen_project()
    {
        $proj_id = $_POST['id'];
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }

        $project = new Project($proj_id);
        $project->full = 0;
        $status = $project->save();
        $this->status_json($status, "");
    }

    public function add_assistant()
    {
        if (($this->current_user->type != 'faculty') && (!$this->current_user->admin)) {
            $this->failure_json("Permission denied adding assistant since you are not faculty or admin.");
            return;
        }
        if (!$this->global_settings->fac_assn_asst) {
            $this->failure_json('Add assistant function is currently disabled by admin.');
            return;
        }
        $sunetid = $_POST['sunetid'];
        if ($sunetid == $this->current_user->sunetid) {
            $this->failure_json('Adding yourself as your assistant is not allowed.');
            return;
        }
        $assistantUser = new User();
        $assistantUser->where('sunetid', $sunetid)->get();
        $count = $assistantUser->result_count();
        if ($count == 0) {
            $this->failure_json("Student with SUNet ID {$sunetid} not found in CURIS system. Please advice he/she access to this CURIS website once, then add assistant again.");
            return;
        }

        $facUser = new User();
        $facUser->where('sunetid', $this->current_user->sunetid)->get();

        $assistant = new Assistant();
        $assistant->asst_id = $assistantUser->id;
        $assistant->fac_id = $facUser->id;
        $status = $assistant->save();
        $this->status_json($status, "");
    }

    public function admin_add_assistant_to_faculty()
    {
        if (!$this->current_user->admin) {
            $this->failure_json("Permission denied adding assistant to faculty since you are not admin.");
            return;
        }
        $faculty_id = $_POST['faculty_id'];
        $sunet_id = $_POST['assistant_sunet_id'];

        $assistantUser = new User();
        $assistantUser->where('sunetid', $sunet_id)->get();
        $count = $assistantUser->result_count();
        if ($count == 0) {
            $this->failure_json("Assistant with SUNet ID {$sunet_id} not found in CURIS system. Please advice he/she access to this CURIS website once, then add assistant again.");
            return;
        }

        $facUser = new User();
        $facUser->where('id', $faculty_id)->get();

        if ($assistantUser->id == $faculty_id) {
            $this->failure_json('Adding assistant to him/herself is not allowed.');
            return;
        }

        $test_assistant = new Assistant();
        $test_assistant->where('fac_id', $faculty_id)->where('asst_id', $assistantUser->id)->get();
        $count = $test_assistant->result_count();
        if ($count > 0) {
            $this->failure_json("This assistant has been added already.");
            return;
        }

        $assistant = new Assistant();
        $assistant->asst_id = $assistantUser->id;
        $assistant->fac_id = $facUser->id;
        $status = $assistant->save();
        $this->status_json($status, "");
    }

    public function get_assistants()
    {
        $sep = "";
        $output = "{ \"status\":\"success\", \"assistants\": [";
        $query = $this->db->query("SELECT users.*, assistants.fac_id, assistants.assign_time FROM users, assistants WHERE assistants.fac_id='{$this->current_user->id}' AND assistants.asst_id = users.id");
        foreach ($query->result_array() as $row) {
            $output .= $sep;
            $output .= json_encode($row);
            $sep = ",";
        }
        $output .= "]}";
        $this->output->set_content_type('application/json')->set_output($output);
    }

    public function remove_assistant()
    {
        if (($this->current_user->type != 'faculty') && (!$this->current_user->admin)) {
            $this->failure_json("Permission denied removing assistant since you are not faculty or admin.");
            return;
        }
        $fac_id = $_POST['fac_id'];
        $asst_id = $_POST['asst_id'];
        $status = $this->db->query("DELETE FROM assistants WHERE fac_id = '$fac_id' AND asst_id = '$asst_id'");
        $this->status_json($status, "");
    }

    public function get_dyn_page($target_view)
    {
        $page = Dyn_page::where('view', $target_view)->first();
        echo $page->html;
    }

    public function set_dyn_page($target_view)
    {
        $dyn_page = new Dyn_page();
        $status = $dyn_page->where('view', $target_view)->update(array('html' => $_POST['page_content']));
        $this->status_json($status, "");
    }

    public function get_faculty_names()
    {
        $faculties = new User();
        $faculties->select('name')->where('type', 'faculty')->order_by("name", "asc")->get();
        $output = '[["None"]';
        foreach ($faculties as $faculty) {
            $output .= ",[\"{$faculty->name}\"]";
        }
        $output .= "]";
        $this->output->set_content_type('application/json')->set_output($output);
    }

    public function get_faculty_ids_and_names()
    {
        $faculties = new User();
        $faculties->select('id, name')->where('type', 'faculty')->order_by("name", "asc")->get();
        $sep = "";
        $output = '[';
        foreach ($faculties as $faculty) {
            $output .= "{$sep}[{$faculty->id}, \"{$faculty->name}\"]";
            $sep = ",";
        }
        $output .= "]";
        $this->output->set_content_type('application/json')->set_output($output);
    }

    public function get_faculties($includeBlankRecordInFront = false)
    {
        $faculties = new User();
        $faculties->where('type', 'faculty')->order_by("name", "asc")->get();
        $result = array();
        if ($includeBlankRecordInFront) {
            $result[] = array("", "");
        }
        foreach ($faculties as $faculty) {
            $result[] = array($faculty->id, $faculty->name);
        }
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    // get available professors to display in a dropdown for adding a project.
    // If current user is a professor, then he/she would be the only one returned.
    // If current user is an assistant, then all of his assisting professors would be returned.
    public function get_professors_for_adding_a_project()
    {
        if ($this->current_user->admin) {
            $this->get_faculties(true);
            return;
        } else if ($this->current_user->type == 'faculty') {
            $this->output->set_content_type('application/json')->set_output(
                json_encode(array(array($this->current_user->id, $this->current_user->name))));
            return;
        } else {
            // find all professors which this user is assisting
            $professors = array();
            $professors[] = array("0", "abc");
            $query = $this->db->query("SELECT users.id, users.name FROM users, assistants WHERE assistants.asst_id = '{$this->current_user->id}' AND assistants.fac_id = users.id ORDER BY users.name ASC");
            foreach ($query->result_array() as $professor) {
                $professors[] = array($professor['id'], $professor['name']);
            }
            $this->output->set_content_type('application/json')->set_output(json_encode($professors, JSON_NUMERIC_CHECK));
            return;
        }
    }

    public function get_global_settings()
    {
        $this->output->set_content_type('application/json')->set_output(
            "{ \"success\":\"true\", \"data\": " . $this->global_settings->json() . "}"
        );
    }

    public function update_global_settings()
    {
        if ($this->current_user->admin == 0) {
            $this->failure_json('You don\'t have permission to update global settings.');
            return;
        }

        $status = $this->db->update('global_settings',
            array('fac_edit_proj' => $_POST['fac_edit_proj'],
                'fac_assn_asst' => $_POST['fac_assn_asst'],
                'fac_rate_stud' => $_POST['fac_rate_stud'],
                'stud_edit_prof' => $_POST['stud_edit_prof'],
                'stud_see_proj' => $_POST['stud_see_proj'],
                'stud_apply' => $_POST['stud_apply'],
                'stud_accept' => $_POST['stud_accept'],
                'login_link' => $_POST['login_link']));

        $this->status_json($status, "");
    }

    private function adjust_upload_file_path_with_safe_extension($path)
    {
        $path = trim($path);
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        if (($ext != "txt") && ($ext != "pdf") && ($ext != "doc") && ($ext != "docx")) {
            $path = $path . ".txt";
        }
        return $path;
    }

    public function update_user_profile()
    {
        $id = $_POST['id'];
        if (empty($id)) {
            $this->failure_json('Did not receive user id to update.');
            return;
        }
        if ($this->current_user->id != $id) {
            $this->failure_json('Current user id does not match the provided profile id. Operation failed.');
            return;
        }
        if (!$this->global_settings->stud_edit_prof) {
            $this->failure_json('Student edit profile function is currently disabled by admin.');
            return;
        }

        //$user = new User($id);
        $user = User::find($id);
        $user->suid = $_POST['suid'];
        $user->email = $_POST['email'];
        $user->webpage = $_POST['webpage'];
        $user->interestarea = $_POST['interestarea'];
        $user->major = $_POST['major'];
        $user->gpa = $_POST['gpa'];
        //$user->graduating = $_POST['graduating'];
        //$user->majorwhen = $_POST['majorwhen'];
        //$user->coterm = $_POST['coterm'];
        $user->year = $_POST['year'];

        // performing upload
        /*$status = true;
        $fileName = $_FILES['transcript']['name'];
        if ($fileName) {
            $tmpName = $_FILES['transcript']['tmp_name'];
            $fileSize = $_FILES['transcript']['size'];
            $fileType = $_FILES['transcript']['type'];
            $relativeUploadPath = '/protected/uploads/' . $this->current_user->id . 'transcript' . '_' . time() . '_' . $fileName;
            $relativeUploadPath = $this->adjust_upload_file_path_with_safe_extension($relativeUploadPath);
            $uploadPath = '/afs/.cs/www/curis' . $relativeUploadPath;
            $status = move_uploaded_file($tmpName, $uploadPath);
            if ($status) {
                $user->transcript = $relativeUploadPath;
            }
        }

        $status2 = true;
        $fileName = $_FILES['resume']['name'];
        if ($fileName) {
            $tmpName = $_FILES['resume']['tmp_name'];
            $fileSize = $_FILES['resume']['size'];
            $fileType = $_FILES['resume']['type'];
            $relativeUploadPath = '/protected/uploads/' . $this->current_user->id . 'resume' . '_' . time() . '_' . $fileName;
            $relativeUploadPath = $this->adjust_upload_file_path_with_safe_extension($relativeUploadPath);
            $uploadPath = '/afs/.cs/www/curis' . $relativeUploadPath;
            $status2 = move_uploaded_file($tmpName, $uploadPath);
            if ($status2) {
                $user->resume = $relativeUploadPath;
            }
        }*/

        $status3 = $user->save();
        //if ($status && $status2 && $status3) {
        if ($status3) {
            //$fp      = fopen($tmpName, 'r');
            //$content = fread($fp, filesize($tmpName));
            //$content = addslashes($content);
            //fclose($fp);
            //if(!get_magic_quotes_gpc()){
            //    $fileName = addslashes($fileName);
            //}
            //$query = "INSERT INTO yourdatabasetable (`name`, `size`, `type`, `file`) VALUES ('".$fileName."','".$fileSize."', '".$fileType."', '".$content."')";
            //mysql_query($query);
            //$o = "{\"success\":true, \"data\":\"$status\"}";
            $this->success_json(0);
            return;
        } else {
            //$this->failure_json("Error : s1={$status} s2={$status2} s3={$status3}");
            $this->failure_json("Error : s3={$status3}");
            return;
        }
    }

    public function upload_project_pdf()
    {
        $project_id = $_POST['project'];
        $fileName = $_FILES['project_upload']['name'];
        if ($fileName) {
            $tmpName = $_FILES['project_upload']['tmp_name'];
            $fileSize = $_FILES['project_upload']['size'];
            $fileType = $_FILES['project_upload']['type'];
            $uniqueFileName = $this->adjust_upload_file_path_with_safe_extension($this->current_user->id . '_' . time() . '_' . $fileName);
            $relativeUploadPath = '/protected/uploads/projects/' . $uniqueFileName;
            $uploadPath = '/afs/.cs/www/curis' . $relativeUploadPath;
            if (move_uploaded_file($tmpName, $uploadPath)) {
                $upload = new Project_upload();
                $upload->project_id = $project_id;
                $upload->user_id = $this->current_user->id;
                $upload->filename = $uniqueFileName;
                if ($upload->save_as_new()) {
                    $this->success_json(0);
                    return;
                }
            }
        }

        $this->failure_json("Error when uploading file.");
        return;
    }

    public function remove_upload()
    {
        $id = $_POST['id'];
        $upload = new Project_upload();
        $upload->where('id', $id)->get();

        if (!$this->current_user->admin) {
            if ($this->current_user->id != $upload->user_id) {
                $this->failure_json('Current user id does not match the upload user id. Operation failed.');
                return;
            }
        }

        $status = $upload->delete();
        $this->status_json($status, "");
    }

    public function test_app() {
        //$s = '[{"property":"name","direction":"ASC"}]';
        //$o = json_decode($s);
        //var_dump($o);
        $apps = new Application();
        $apps->where_related_project('year', '2016-2017')->where_related_project('term', 'Summer')->get();
        $this->output->set_content_type('application/json')->set_output(json_encode($apps->all_to_array()));
    }

    public function get_users()
    {
        $start = $_GET['start'];
        $limit = $_GET['limit'];
        if (isset($_GET['sort']) && !empty($_GET['sort'])) {
            $sortObj = json_decode($_GET['sort']);
            $sortBy = $sortObj[0]->property;
            $sortDirection = $sortObj[0]->direction;
        }
        else {
            $sortBy = "name";
            $sortDirection = "asc";
        }

        if (array_key_exists('search_name', $_GET)) {
            $search_name = trim($_GET['search_name']);
        } else {
            $search_name = '';
        }

        //$users = new User();
        $queryBuilder = User::order_by($sortBy, $sortDirection);
        if ($sortBy == 'type') {
            $queryBuilder->order_by('lecturer', $sortDirection);
        }

        if (!empty($search_name)) {
            $queryBuilder->ilike('name', $search_name);
        }
        $users = $queryBuilder->limit($limit, $start)->get();
        if (!empty($search_name)) {
            $totalCount = $users->result_count();
        } else {

            $totalCount = (new User())->count();
        }

        $this->output->set_content_type('application/json')->set_output(
            "{ \"success\":true, \"totalCount\":$totalCount, \"users\": " . $users->json() . "}"
        );
    }

    public function get_user_details($id)
    {
        if (($this->current_user->admin == 0) && ($this->current_user->type != 'faculty') && ($this->current_user->id != $id)) {
            $this->failure_json('You don\'t have permission to view user details.');
            return;
        }
        //$user = new User();
        $user = User::where('id', $id)->get();
        $this->output->set_content_type('application/json')->set_output(
            "{ \"success\":true, \"data\": " . $user->json() . "}"
        );
    }

    public function update_user_details()
    {
        if ($this->current_user->admin == 0) {
            $this->failure_json('You don\'t have permission to update user details.');
            return;
        }
        $id = $_POST['id'];
        $user = User::find($id);
        foreach ($_POST as $field => $value) {
            if ($field == "type" && $value == "lecturer") {
                $user->$field = "faculty";
                $user->lecturer = 1;
            }
            else {
                $user->$field = $value;
            }
        }
        $status = $user->save();
        //$this->status_json($status, "");
        $this->status_json($status, "");
    }

    public function get_assistant_to($id)
    {
        $assistantTo = "";
        $sep = "";
        $query = $this->db->query("SELECT name from users WHERE id IN (SELECT fac_id from assistants where asst_id = '{$id}') order by name");
        foreach ($query->result_array() as $name) {
            $assistantTo .= $sep . $name['name'];
            $sep = ", ";
        }
        $result["success"] = true;
        $result["data"] = $assistantTo;
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function apply_project()
    {
        if (!$this->global_settings->stud_apply) {
            $this->failure_json('Student apply project function is currently disabled by admin.');
            return;
        }
        $project_id = $_POST['project_id'];
        $score = $_POST['score'];
        $statement = $_POST['statement'];

        $app = new Application();
        $app->where('user_id', $this->current_user->id)->where('project_id', $project_id)->get();
        if ($app->result_count() > 0) {
            //$this->output->set_content_type('application/json')->set_output("{\"success\":false, \"msg\":\"Already applied.\"}");
            $app = new Application($app->id);
            //return;
        }

        $app->user_id = $this->current_user->id;
        $app->project_id = $project_id;
        $app->score = $score;
        $app->statement = $statement;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function get_my_uploads()
    {
        $uploads = array();
        $query = $this->db->query("SELECT uploads.id, uploads.project_id, projects.title, projects.researchfield, projects.prof_id, users.name AS professor_name, uploads.filename, uploads.time FROM project_uploads uploads, projects, users WHERE uploads.user_id='{$this->current_user->id}' AND uploads.project_id = projects.id AND projects.prof_id = users.id");
        foreach ($query->result_array() as $upload) {
            $uploads[] = $upload;
        }
        $result['success'] = true;
        $result['uploads'] = $uploads;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_faculty_project_uploads()
    {
        $uploads = array();
        if ($this->current_user->type == 'student') {
            $query = $this->db->query("SELECT uploads.id, uploads.project_id, projects.title, projects.researchfield, users.id as student_id, users.name as student_name, uploads.filename, uploads.time FROM project_uploads uploads, projects, users WHERE uploads.user_id=users.id AND uploads.project_id = projects.id AND projects.prof_id in (SELECT fac_id FROM assistants WHERE asst_id = '{$this->current_user->id}')");
        } else {
            $query = $this->db->query("SELECT uploads.id, uploads.project_id, projects.title, projects.researchfield, users.id as student_id, users.name as student_name, uploads.filename, uploads.time FROM project_uploads uploads, projects, users WHERE uploads.user_id=users.id AND uploads.project_id = projects.id AND projects.prof_id = '{$this->current_user->id}'");
        }
        foreach ($query->result_array() as $upload) {
            $uploads[] = $upload;
        }
        $result['success'] = true;
        $result['uploads'] = $uploads;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_admin_project_uploads()
    {
        $uploads = array();
        $query = $this->db->query("SELECT uploads.id, uploads.project_id, projects.title, projects.researchfield, u1.id as professor_id, u1.name as professor_name, u2.id as student_id, u2.name as student_name, uploads.filename, uploads.time FROM project_uploads uploads, projects, users u1, users u2 WHERE uploads.project_id = projects.id and projects.prof_id = u1.id and uploads.user_id=u2.id");
        foreach ($query->result_array() as $upload) {
            $uploads[] = $upload;
        }
        $result['success'] = true;
        $result['uploads'] = $uploads;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function get_my_applications()
    {
        $applications = array();
        $query = $this->db->query("SELECT applications.*, projects.title, projects.researchfield, projects.secondfield, projects.thirdfield, projects.url, projects.description, projects.prerequisite, projects.background, projects.capacity, projects.prof_id, projects.creation_time, projects.year, projects.term, users.name AS professor_name, users.email AS professor_email FROM applications, projects, users WHERE applications.user_id='{$this->current_user->id}' AND applications.project_id = projects.id AND projects.prof_id = users.id");
        foreach ($query->result_array() as $application) {
            $applications[] = $application;
        }
        $result['success'] = true;
        $result['applications'] = $applications;
        $this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_NUMERIC_CHECK));
    }

    public function remove_my_application()
    {
        $application_id = $_POST['id'];
        $app = new Application($application_id);
        if ($app->user_id == $this->current_user->id) {
            $status = $app->delete();
            $this->status_json($status, "");
        } else {
            $this->failure_json('You don\'t have permission to remove this application since you are not the applicant.');
            return;
        }
    }

    public function update_my_application()
    {
        if (!$this->global_settings->stud_apply) {
            $this->failure_json('Student apply project function is currently disabled by admin.');
            return;
        }
        $id = $_POST['id'];
        $app = new Application($id);
        if ($this->current_user->id == $app->user_id) {
            $app->score = $_POST['score'];
            $app->statement = $_POST['statement'];
            $success = $app->save();
            if ($success) {
                $o = "{\"success\":true}";
            } else {
                $o = "{\"success\":false}";
            }
            $this->output->set_content_type('application/json')->set_output($o);
        } else {
            $this->failure_json('You don\'t have permission to update this application since you are not the applicant.');
            return;
        }
    }

    public function get_applications()
    {
        $year = $_GET['year'];
        $term = $_GET['term'];

        $applications = array();
        $query = $this->db->query("SELECT applications.*, projects.title, projects.capacity, projects.prof_id, projects.creation_time, projects.year, projects.term, u1.name AS professor_name, u1.email AS professor_email, u2.name AS student_name, u2.email AS student_email FROM applications, projects, users u1, users u2 WHERE applications.project_id = projects.id AND projects.prof_id = u1.id AND projects.year = '{$year}' AND projects.term = '{$term}' AND applications.user_id = u2.id");
        foreach ($query->result_array() as $application) {
            $applications[] = $application;
        }
        $result["success"] = true;
        $result["applications"] = $applications;
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function get_applications_of_my_projects()
    {
        $year = $_GET['year'];
        $term = $_GET['term'];

        $applications = array();
        if ($this->current_user->type == 'faculty') {
            $query = $this->db->query("SELECT applications.*, projects.title, projects.researchfield, projects.capacity, users.name AS student_name, users.email AS student_email FROM applications, projects, users WHERE applications.project_id = projects.id AND projects.prof_id = '{$this->current_user->id}' AND projects.year = '{$year}' AND projects.term = '{$term}' AND applications.user_id = users.id");
        } else {
            $query = $this->db->query("SELECT applications.*, projects.title, projects.researchfield, projects.capacity, users.name AS student_name, users.email AS student_email FROM applications, projects, users WHERE applications.project_id = projects.id AND applications.user_id = users.id AND projects.year = '{$year}' AND projects.term = '{$term}' AND projects.prof_id in (select fac_id from assistants where asst_id = '{$this->current_user->id}')");
        }

        foreach ($query->result_array() as $application) {
            $applications[] = $application;
        }
        $result["success"] = true;
        $result["applications"] = $applications;
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function get_application_details($application_id)
    {
        $query = $this->db->query("SELECT applications.*, projects.title, projects.capacity, projects.prof_id AS professor_id, professors.name AS professor_name, users.id as applicant_id, users.name AS applicant_name, users.sunetid, users.suid, users.type, users.email, users.webpage, users.interestarea, users.major, users.gpa, users.graduating, users.majorwhen, users.coterm, users.year, users.transcript, users.resume FROM applications, projects, users, users professors WHERE applications.id = '{$application_id}' AND applications.project_id = projects.id AND applications.user_id = users.id AND projects.prof_id = professors.id");
        $application = $query->row();
        $result["success"] = true;
        $result["data"] = $application;
        $this->output->set_content_type('application/json')->set_output(json_encode($result));
    }

    public function update_faculty_rating()
    {
        $application_id = $_POST['id'];
        $rating = $_POST['fac_rating1'];
        if (!$this->current_user->admin) {
            $query = $this->db->query("SELECT projects.prof_id FROM projects, applications WHERE projects.id = applications.project_id AND applications.id = '{$application_id}'");
            $prof_id = $query->row()->prof_id;
            if ($this->current_user->id != $prof_id) {
                $query2 = $this->db->query("SELECT * from assistants where asst_id = '{$this->current_user->id}' AND fac_id = '{$prof_id}'");
                if ($query2->num_rows() == 0) {
                    $this->failure_json('Permission denied since you are not admin or the faculty of this project application.');
                    return;
                }
            }
            if (!$this->global_settings->fac_rate_stud) {
                $this->failure_json('Faculty rating function is currently disabled by admin.');
                return;
            }
        }
        $app = new Application($application_id);
        $app->fac_rating1 = $rating;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function decline_application()
    {
        $application_id = $_POST['id'];
        $app = new Application($application_id);
        if (!$this->current_user->admin) {
            if ($this->current_user->id != $app->user_id) {
                $this->failure_json('Permission denied since you are not admin or the applicant.');
                return;
            }
            if (!$this->global_settings->stud_accept) {
                $this->failure_json('Student accept/decline project function is currently disabled by admin.');
                return;
            }
        }
        $app->status = -1;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function accept_application()
    {
        $application_id = $_POST['id'];
        $app = new Application($application_id);
        if (!$this->current_user->admin) {
            if ($this->current_user->id != $app->user_id) {
                $this->failure_json('Permission denied since you are not admin or the applicant.');
                return;
            }
            if (!$this->global_settings->stud_accept) {
                $this->failure_json('Student accept/decline project function is currently disabled by admin.');
                return;
            }
        }
        if ($app->match != 1) {
            $this->failure_json('This application has not been matched.');
            return;
        }
        $app->status = 1;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function prematch_application()
    {
        if ((!$this->current_user->admin) && ($this->current_user->type != 'faculty') && (!$this->current_user->is_assistant)) {
            $this->failure_json('Permission denied! Only admin or faculty can prematch.');
            return;
        }
        $application_id = $_POST['id'];
        $app = new Application($application_id);

        $student_id = $app->user_id;
        $project_id = $app->project_id;

        $project = new Project($project_id);
        $year = $project->year;
        $term = $project->term;

        $query = $this->db->query("SELECT u.name FROM applications a, projects p, users u WHERE a.user_id = '{$student_id}' and a.prematch = 1 and a.project_id = p.id and p.year = '{$year}' and p.term= '{$term}' and p.prof_id = u.id");
        if ($query->num_rows() > 0) {
            $prof_name = $query->row()->name;
            $this->failure_json('This student already prematched with professor ' . $prof_name . ". Please work it out with the student.");
            return;
        }

        $app->prematch = 1;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function unprematch_application()
    {
        if ((!$this->current_user->admin) && ($this->current_user->type != 'faculty') && (!$this->current_user->is_assistant)) {
            $this->failure_json('Permission denied! Only admin or faculty can prematch.');
            return;
        }
        $application_id = $_POST['id'];
        $app = new Application($application_id);
        $app->prematch = 0;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function match_application()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $application_id = $_POST['id'];
        $app = new Application($application_id);
        $app->match = 1;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function unmatch_application()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $application_id = $_POST['id'];
        $app = new Application($application_id);
        $app->match = 0;
        $status = $app->save();
        $this->status_json($status, "");
    }

    public function get_faculties_and_assistants()
    {
        $assistants = array();
        $query = $this->db->query("SELECT fac_id, faculties.name as fac_name, asst_id, students.name as asst_name, assign_time FROM assistants, users faculties, users students WHERE fac_id = faculties.id and asst_id = students.id order by fac_name");
        foreach ($query->result_array() as $assistant) {
            $assistants[] = $assistant;
        }
        $this->success_json_with_data($assistants, 'assistants');
    }

    public function get_email_templates()
    {
        $email_templates = new Email_template();
        $email_templates->get();
        $template_array = $email_templates->all_to_array();
        $this->success_json_with_data($template_array, 'templates');
    }

    public function get_email_templates_with_none()
    {
        $email_templates = new Email_template();
        $email_templates->get();
        $template_array = $email_templates->all_to_array();
        $none['id'] = 0;
        $none['name'] = 'none';
        $none['message'] = '';
        array_unshift($template_array, $none);
        $this->success_json_with_data($template_array, 'templates');
    }

    public function update_email_template()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $template_name = $_POST['template_name'];
        $template_message = $_POST['template_message'];
        $template = new Email_template();
        $template->where('name', $template_name)->get();
        if ($template->result_count() == 0) {
            $template->name = $template_name;
        }
        $template->message = $template_message;
        $status = $template->save();

        $this->status_json($status, "");
    }

    public function delete_email_template()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $template_name = $_POST['template_name'];
        $template = new Email_template();
        $template->where('name', $template_name)->get();
        if ($template->result_count() > 0) {
            $status = $template->delete();
            $this->status_json($status, "");
            return;
        } else {
            $this->failure_json('Email template [' . $template_name . '] not found.');
            return;
        }
    }

    private function get_faculty_emails_array()
    {
        $users = new User();
        $users->select('id, name, email')->where('type', 'faculty')->like('email', '@')->order_by('name')->get();
        return $users->all_to_array(array('id', 'name', 'email'));
    }

    private function get_student_emails_array()
    {
        $users = new User();
        $users->select('id, name, email')->where('type', 'student')->like('email', '@')->order_by('name')->get();
        return $users->all_to_array(array('id', 'name', 'email'));
    }

    private function get_all_emails_array($year, $term)
    {
        /*
        $users = new User();
        $users->select('id, name, email')->like('email', '@')->order_by('name')->get();
        return $users->all_to_array(array('id', 'name', 'email'));
        */
        return array_merge($this->get_faculty_emails_array(), $this->get_applied_student_emails_array($year, $term));
    }

    private function get_applied_student_emails_array($year, $term)
    {
        $applied_students = array();
        $query = $this->db->query("SELECT id, name, email FROM users WHERE id IN (SELECT DISTINCT user_id FROM applications where project_id in (SELECT id from projects where year = '{$year}' AND term = '{$term}')) ORDER BY name");
        foreach ($query->result_array() as $applied_student) {
            $applied_students[] = $applied_student;
        }
        return $applied_students;
    }

    private function get_matched_student_emails_array($year, $term)
    {
        $matched_students = array();
        $query = $this->db->query("SELECT id, name, email FROM users WHERE id IN (SELECT DISTINCT user_id FROM applications WHERE `match` = 1 and project_id in (SELECT id from projects where year = '{$year}' AND term = '{$term}')) ORDER BY name");
        foreach ($query->result_array() as $matched_student) {
            $matched_students[] = $matched_student;
        }
        return $matched_students;
    }

    private function get_unmatched_student_emails_array($year, $term)
    {
        $unmatched_students = array();
        $student_ids = array();
        $matched_student_ids = array();

        // first get all student applied for the term
        $query = $this->db->query("SELECT DISTINCT user_id FROM applications WHERE project_id in (SELECT id from projects where year = '{$year}' AND term = '{$term}')");
        foreach ($query->result_array() as $student_id) {
            $student_ids[] = $student_id['user_id'];
        }

        if (count($student_ids) == 0) {
            return array();
        }


        // then get all student applied and matched for the term
        $query = $this->db->query("SELECT DISTINCT user_id FROM applications WHERE `match` = 1 and project_id in (SELECT id from projects where year = '{$year}' AND term = '{$term}')");
        foreach ($query->result_array() as $matched_student_id) {
            $matched_student_ids[] = $matched_student_id['user_id'];
        }

        $unmatched_student_ids = array_diff($student_ids, $matched_student_ids);

        if (count($unmatched_student_ids) == 0) {
            return array();
        }

        $unmatched_student_ids_string = implode(",", $unmatched_student_ids);

        $query = $this->db->query("SELECT id, name, email FROM users WHERE id IN ({$unmatched_student_ids_string}) ORDER BY name");
        foreach ($query->result_array() as $unmatched_student) {
            $unmatched_students[] = $unmatched_student;
        }
        return $unmatched_students;
    }

    private function get_accepted_student_emails_array($year, $term)
    {
        $accepted_students = array();
        $query = $this->db->query("SELECT id, name, email FROM users WHERE id IN (SELECT DISTINCT user_id FROM applications WHERE `status` = 1 and project_id in (SELECT id from projects where year = '{$year}' AND term = '{$term}')) ORDER BY name");
        foreach ($query->result_array() as $accepted_student) {
            $accepted_students[] = $accepted_student;
        }
        return $accepted_students;
    }

    private function get_faculty_and_assistant_who_have_accepted_student_emails_array($year, $term)
    {
        $faculties_and_assistants = array();
        $prof_ids = array();
        $assistant_ids = array();

        $query = $this->db->query("SELECT DISTINCT prof_id FROM projects WHERE id IN (SELECT DISTINCT project_id FROM applications WHERE `status` = 1) and year = '{$year}' AND term = '{$term}'");
        foreach ($query->result_array() as $prof_id) {
            $prof_ids[] = $prof_id['prof_id'];
        }

        if (count($prof_ids) == 0) {
            return array();
        }

        $prof_ids_string = implode(",", $prof_ids);
        $query = $this->db->query("SELECT DISTINCT asst_id FROM assistants WHERE fac_id IN ($prof_ids_string)");
        foreach ($query->result_array() as $assistant_id) {
            $assistant_ids[] = $assistant_id['asst_id'];
        }

        if (count($assistant_ids) == 0) {
            $prof_assistant_ids_string = $prof_ids_string;
        } else {
            $assistant_ids_string = implode(",", $assistant_ids);
            $prof_assistant_ids_string = $prof_ids_string . "," . $assistant_ids_string;
        }

        $query = $this->db->query("SELECT id, name, email FROM users WHERE id IN ($prof_assistant_ids_string) ORDER BY name");
        foreach ($query->result_array() as $r) {
            $faculties_and_assistants[] = $r;
        }
        return $faculties_and_assistants;
    }

    private function get_all_assistant_emails_array()
    {
        $assistants = array();

        $query = $this->db->query("SELECT id, name, email FROM users WHERE id IN (SELECT DISTINCT asst_id FROM assistants) ORDER BY name");
        foreach ($query->result_array() as $r) {
            $assistants[] = $r;
        }
        return $assistants;
    }

    public function get_faculty_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $this->success_json_with_data($this->get_faculty_emails_array());
    }

    public function get_student_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $this->success_json_with_data($this->get_student_emails_array());
    }

    public function get_all_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $year = $_GET['year'];
        $term = $_GET['term'];
        $this->success_json_with_data($this->get_all_emails_array($year, $term));
    }

    public function get_applied_student_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $year = $_GET['year'];
        $term = $_GET['term'];
        $this->success_json_with_data($this->get_applied_student_emails_array($year, $term));
    }

    public function get_matched_student_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $year = $_GET['year'];
        $term = $_GET['term'];
        $this->success_json_with_data($this->get_matched_student_emails_array($year, $term));
    }

    public function get_unmatched_student_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $year = $_GET['year'];
        $term = $_GET['term'];
        $this->success_json_with_data($this->get_unmatched_student_emails_array($year, $term));
    }

    public function get_accepted_student_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $year = $_GET['year'];
        $term = $_GET['term'];
        $this->success_json_with_data($this->get_accepted_student_emails_array($year, $term));
    }

    public function get_faculty_and_assistant_who_have_accepted_student_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $year = $_GET['year'];
        $term = $_GET['term'];
        $this->success_json_with_data($this->get_faculty_and_assistant_who_have_accepted_student_emails_array($year, $term));
    }

    public function get_all_assistant_emails()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $this->success_json_with_data($this->get_all_assistant_emails_array());
    }

    public function send_mail()
    {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }
        $message = $_POST['message'];
        $cc = $_POST['cc'];
        $subject = str_replace(' ', '_', $_POST['subject']);
        $recipient_emails = $_POST['recipient_emails'];
        $headers = 'From: ' . $this->current_user->email . "\r\n";
        $headers .= 'Cc: ' . $cc . "\r\n";
        $headers .= 'Bcc: ' . $recipient_emails . "\r\n";
        $status = mail($this->current_user->email, $subject, $message, $headers);
        $this->status_json($status, '');
    }

    public function admin_export_applications_to_excel()
    {
        if (!$this->current_user->admin) {
            $msg = array(
                1 => array('Permission denied since you are not admin.')
            );
            $xls = new Excel_XML('UTF-8', false, 'Curis Applications');
            $xls->addArray($msg);
            $xls->generateXML('curis-applications');
            return;
        }

        $year = $_GET['year'];
        $term = $_GET['term'];

        $applications = array(1 => array(
            "Professor Name",
            "Project Title",
            "Project Capacity",
            "Student Name",
            "Student SUID",
            "Student Email",
            "Student Year at Stanford",
            "Student Score",
            "Faculty Score",
            "Prematched",
            "Matched",
            "Status"));
        $query = $this->db->query("SELECT applications.*, projects.title, projects.capacity, u1.name AS professor_name, u1.email AS professor_email, u2.name AS student_name, u2. suid,u2.email AS student_email, u2.year FROM applications, projects, users u1, users u2 WHERE applications.project_id = projects.id AND projects.prof_id = u1.id AND applications.user_id = u2.id AND projects.year = '{$year}' AND projects.term = '{$term}' order by professor_name");
        foreach ($query->result_array() as $application) {
            array_push($applications, array(
                $application['professor_name'],
                $application['title'],
                $application['capacity'],
                $application['student_name'],
                $application['suid'],
                $application['student_email'],
                $application['year'],
                $application['score'],
                $application['fac_rating1'],
                ($application['prematch'] == 0 ? "No" : "Yes"),
                ($application['match'] == 0 ? "No" : "Yes"),
                ($application['status'] == 0 ? "Pending" : ($application['status'] > 0 ? "Accepted" : "Declined"))
            ));
        }

        $xls = new Excel_XML('UTF-8', true, 'Curis Applications');
        $xls->addArray($applications);
        $xls->generateXML('curis-applications');
    }


    /*public function gu() {
        $cu = get_current_user();
        echo "$cu";
    }*/

    public function match() {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }

        $year = $_GET['year'];
        $term = $_GET['term'];

        $apps = new Application();
        $apps->where_related_project('year', $year)->where_related_project('term', $term)->get();
        $matching = new ApplicationMatching($apps);
        $matching->match();
        $this->success_json("Match process finished successfully.");
    }

    public function unmatch_all_applications() {
        if (!$this->current_user->admin) {
            $this->failure_json('Permission denied since you are not admin.');
            return;
        }

        $year = $_GET['year'];
        $term = $_GET['term'];

        $apps = new Application();
        $apps->where_related_project('year', $year)->where_related_project('term', $term)->get();

        foreach ($apps as $app) {
            $app->match = 0;
            $app->save();
        }
        $this->success_json("All applications are unmatched.");
    }
}

?>
