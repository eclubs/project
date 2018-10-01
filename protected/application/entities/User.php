<?php

class User extends RabbitORM\Model {
	var $table = "users";

	const UserDefinition = '{"name": "users", "table": "users"}';

	private $id;
	const idDefinition = '{"name": "id", "column": "id", "primaryKey": "true"}';

	private $name;
	const nameDefinition = '{"name": "name", "column": "name"}';

	private $sunetid;
	const sunetidDefinition = '{"name": "sunetid", "column": "sunetid"}';

    private $suid;
    const suidDefinition = '{"name": "suid", "column": "suid"}';

    private $type;
    const typeDefinition = '{"name": "type", "column": "type"}';

    private $email;
    const emailDefinition = '{"name": "email", "column": "email"}';

    private $webpage;
    const webpageDefinition = '{"name": "webpage", "column": "webpage"}';

    private $admin;
    const adminDefinition = '{"name": "admin", "column": "admin"}';

    private $cs_faculty;
    const cs_facultyDefinition = '{"name": "cs_faculty", "column": "cs_faculty"}';

    private $interestarea;
    const interestareaDefinition = '{"name": "interestarea", "column": "interestarea"}';

    private $major;
    const majorDefinition = '{"name": "major", "column": "major"}';

    private $gpa;
    const gpaDefinition = '{"name": "gpa", "column": "gpa"}';

    private $year;
    const yearDefinition = '{"name": "year", "column": "year"}';

    private $graduating;
    const graduatingDefinition = '{"name": "graduating", "column": "graduating"}';

    private $majorwhen;
    const majorwhenDefinition = '{"name": "majorwhen", "column": "majorwhen"}';

    private $coterm;
    const cotermDefinition = '{"name": "coterm", "column": "coterm"}';

    private $transcript;
    const transcriptDefinition = '{"name": "transcript", "column": "transcript"}';

    private $resume;
    const resumeDefinition = '{"name": "resume", "column": "resume"}';

    private $lecturer;
    const lecturerDefinition = '{"name": "lecturer", "column": "lecturer"}';

    private $creation_time;
    const creation_timeDefinition =  '{"name": "creation_time", "column": "creation_time"}';

    public function count($field = null) {
        return $this->newQuery()->count_all();
    }

    public function json_object() {
        return json_encode( $this->data );
    }
}

/*class User extends CI_Model {
    public function get_user_with_sunetid($sunetid)
    {
        if (!$sunetid) {
            return NULL;
        }
        $query = $this->db->get_where('users', array('sunetid' => $sunetid));
        $r = $query->row();
        if ($r) {
            foreach (get_object_vars($r) as $key => $value) {
                $this->$key = $value;
            }
        }
    }
}*/
?>
