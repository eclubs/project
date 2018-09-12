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

    private $interestarea;
    const interestareaDefinition = '{"name": "interestarea", "column": "interestarea"}';

    private $major;
    const majorDefinition = '{"name": "major", "column": "major"}';

    private $gpa;
    const gpaDefinition =  '{"name": "gpa", "column": "gpa"}';

    private $year;
    const yearDefinition =  '{"name": "year", "column": "year"}';
	/*public getIdUser() {
    }*/

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
