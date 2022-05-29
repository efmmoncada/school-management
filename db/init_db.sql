/* mysql -u cs340_serm -p -h classmysql.engr.oregonstate.edu cs340_serm */

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `staff`;
DROP TABLE IF EXISTS `classes`;
DROP TABLE IF EXISTS `locations`;
DROP TABLE IF EXISTS `enrolled_in`;
DROP TABLE IF EXISTS `hosts`;
SET FOREIGN_KEY_CHECKS = 1;

-- Students: records the details of the Students 
--           that are attending the high school.
CREATE TABLE students (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int,
  `student_name` varchar(35) NOT NULL,
  `student_address` varchar(254) NOT NULL,
  `student_email` varchar(254) NOT NULL,
  `student_gpa` float(4) NOT NULL,
  PRIMARY KEY (`student_id`)
);
-- Staff: records the details of the staff 
--        that is working at the high school.
CREATE TABLE staff (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_name` varchar(35),
  `staff_address` varchar(254),
  `staff_phone_number` varchar(11),
  `staff_email` varchar(254) NOT NULL,
  PRIMARY KEY (`staff_id`)
);
-- Classes: records the details of the classes 
--          (subjects e.g. Calculus) 
--          that are offered at the high school.
CREATE TABLE classes (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int,
  `staff_id` int,
  `class_name` varchar(35),
  `class_capacity` int(3),
  `class_num_enrolled` int(3),
  PRIMARY KEY (`class_id`)
);
-- Locations: records the details of the location 
--            (i.e. number of seats in a room)
CREATE TABLE locations (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_id` int,
  `location_num_of_seats` int(3),
  `location_accessibility` BOOLEAN,
  `location_building` varchar(50),
  PRIMARY KEY (`location_id`),
  FOREIGN KEY (`class_id`) REFERENCES classes(`class_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- enrolled_in: records the details of the students 
--              enrolled in which class
CREATE TABLE enrolled_in (
  `student_id` int,
  `class_id` int,
  FOREIGN KEY (`student_id`) REFERENCES students(`student_id`)       
      ON DELETE CASCADE
      ON UPDATE CASCADE,
  FOREIGN KEY (`class_id`) REFERENCES classes(`class_id`)       
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- hosts: records the details of where classes 
--        are hosted in the high school.
CREATE TABLE hosts (
  `location_id` int,
  `class_id` int,
  FOREIGN KEY (`location_id`) REFERENCES locations(`location_id`)       
    ON DELETE CASCADE
    ON UPDATE CASCADE, 
  FOREIGN KEY (`class_id`) REFERENCES classes(`class_id`)       
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

ALTER TABLE students ADD FOREIGN KEY (`class_id`) REFERENCES classes(`class_id`)       
  ON DELETE CASCADE
  ON UPDATE CASCADE;
ALTER TABLE classes ADD FOREIGN KEY (`location_id`) REFERENCES locations(`location_id`)       
  ON DELETE CASCADE
  ON UPDATE CASCADE;
ALTER TABLE classes ADD FOREIGN KEY (`staff_id`) REFERENCES staff(`staff_id`)       
  ON DELETE CASCADE
  ON UPDATE CASCADE;


-- Leave the queries below untouched. These are to test your submission correctly.
-- Test that the tables were created
DESCRIBE students;
DESCRIBE staff;
DESCRIBE classes;
DESCRIBE locations;
DESCRIBE enrolled_in;
DESCRIBE hosts;





















-- write your queries to insert data here

-- insert new student
INSERT INTO students (class_id,student_name,student_address,student_email,student_gpa) 
VALUES 
  ((SELECT class_id FROM classes where class_name = "Calculus"),"rhodes , wyatt","7254 mill lane birmingham , cleveland V91 5DL","wyatt.rhodes@example.com",2.16),
  ((SELECT class_id FROM classes where class_name = "History"),"wilson , bernard","9455 the drive preston , cumbria A6N 9GS","bernard.wilson@example.com",2.56),
  ((SELECT class_id FROM classes where class_name = "Chemistry"),"beck , todd","7846 chester road wakefield , shropshire U43 3QT","todd.beck@example.com",2.64);

-- insert new staff
INSERT INTO staff (staff_name,staff_address,staff_phone_number,staff_email) 
VALUES 
  ("oliver , sarah","3503 manor road manchester , highlands and islands I30 5ZF","0761-814-654","sarah.oliver@example.com"),
  ("cole , julie","7742 king street stoke-on-trent , isle of wight DC00 3ZH","0790-578-725","julie.cole@example.com"),
  ("simpson , harold","4184 grange road wells , hampshire TF60 9PQ","0707-006-496","harold.simpson@example.com");

-- insert a new class
INSERT INTO classes (location_id,staff_id,class_name,class_capacity,class_num_enrolled) 
VALUES
  (
    (SELECT location_id FROM locations WHERE location_building = "Empire State Building"),
    (SELECT staff_id FROM staff WHERE staff_name = "oliver , sarah"),
    "Calculus",
    42,
    32
  ),
  (
    (SELECT location_id FROM locations WHERE location_building = "Sears Tower"),
    (SELECT staff_id FROM staff WHERE staff_name = "cole , julie"),
    "History",
    25,
    25
  ),
  (
    (SELECT location_id FROM locations WHERE location_building = "Eiffel Tower"),
    (SELECT staff_id FROM staff WHERE staff_name = "simpson , harold"),
    "Chemistry",
    49,
    43
  );

-- insert a new locations
INSERT INTO locations (class_id,location_num_of_seats,location_accessibility,location_building) 
VALUES 
  (
    (SELECT class_id FROM classes WHERE class_name = "Calculus"),
    50,
    0,
    "Empire State Building"
  ),
  (
    (SELECT class_id FROM classes WHERE class_name = "History"),
    93,
    0,
    "Sears Tower"
  ),
  (
    (SELECT class_id FROM classes WHERE class_name = "Chemistry"),
    74,
    1,
    "Eiffel Tower"
  );

-- insert a new enrolled_in
INSERT INTO enrolled_in() 
VALUES 
(
    (SELECT location_id FROM locations WHERE location_building = "Empire State Building"),
    (SELECT class_id FROM classes WHERE class_name = "Calculus")
),
(
    (SELECT location_id FROM locations WHERE location_building = "Sears Tower"),
    (SELECT class_id FROM classes WHERE class_name = "History")
),
(
    (SELECT location_id FROM locations WHERE location_building = "Eiffel Tower"),
    (SELECT class_id FROM classes WHERE class_name = "Chemistry")
);

SELECT * FROM students;
SELECT * FROM staff;
SELECT * FROM classes;
SELECT * FROM locations;
SELECT * FROM enrolled_in;
SELECT * FROM hosts;