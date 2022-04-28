# Online Python compiler (interpreter) to run Python online.
# Write Pthon 3 code in this online editor and run it.
import json, requests 
import re
import random


staff_output = []

url = requests.get("https://raw.githubusercontent.com/pixelastic/fakeusers/master/data/randomuser.json")
text = url.text
input = json.loads(text)

regex = ("^(?=.*[a-z])(?=." +
        "*[A-Z])(?=.*\\d)" +
        "(?=.*[-+_!@#$%^&*., ?]).+$")
p = re.compile(regex)
rand_a = [0,0,0,0]
# student, class, staff, location
for y in range(0,4):
    rand_a[y] = random.randrange(100000000,99999999999)

for x in input:
    temp = {}
    tempString =  x["location"]["street"] + " "+ x["location"]["city"] + " , "+ x["location"]["state"] + " "+ str(x["location"]["postcode"])
    if re.search(p, tempString):
        temp['staff_id'] = (rand_a[2])
        temp['staff_name'] = x["last_name"] + " , " + x["first_name"]
        temp['staff_address'] = tempString
        temp['staff_phone_number'] = x['phone_number']
        temp['staff_email'] = x['email']
        rand_a[2] = rand_a[2]+1
        staff_output.append(temp)


# all the names that are not in the staff output
rest_people_list = staff_output[3:]
rand_a[2] = rand_a[2] - len(input)
student_output = []
class_output = []
location_output = []

for x in rest_people_list:
    student_temp = {}
    student_temp['student_id'] = (rand_a[0])
    student_temp['class_id'] = (rand_a[1])
    student_temp['student_name'] = x['staff_name']
    student_temp['student_address'] = x['staff_address']
    student_temp['student_email'] = x['staff_email']
    student_temp['student_gpa'] = round(random.uniform(1, 4),2)

    student_output.append(student_temp)

    class_temp = {}
    class_temp['class_id'] = (rand_a[1])
    class_temp['location_id'] = (rand_a[3])
    class_temp['student_id'] = (rand_a[0])
    class_temp['staff_id'] = (rand_a[2])
    class_temp['class_name'] = random.choice(['Calculus', 'PE', 'Chemistry', 'History'])
    class_temp['class_capacity'] = random.randrange(15,100)
    class_temp['class_num_enrolled'] = class_temp['class_capacity'] - random.randrange(0,15)

    class_output.append(class_temp)

    location_temp = {}
    location_temp['location_id'] = (rand_a[3])
    location_temp['class_id'] = (rand_a[1])
    location_temp['location_num_of_seats'] = random.randrange(15,100)
    location_temp['location_accessibility'] = random.choice(['TRUE','FALSE'])
    location_temp['location_building'] = random.choice(['Eiffel Tower', 'Empire Staate Building', 'Colosseum', 'Tower of Pisa'])

    location_output.append(location_temp)
    
    rand_a[0] = rand_a[0]+1
    rand_a[1] = rand_a[1]+1
    rand_a[2] = rand_a[2]+1
    rand_a[3] = rand_a[3]+1


# # get and print some fake data out :)  
pretty_staff_output = json.dumps(staff_output[0:3], indent=4)
out_file = open("pretty_staff_output.json", "w")
json.dump(staff_output[0:3], out_file, indent=4)
out_file.close()

pretty_student_output = json.dumps(student_output[0:3], indent=4)
out_file = open("pretty_student_output.json", "w")
json.dump(student_output[0:3], out_file, indent=4)
out_file.close()

pretty_class_output = json.dumps(class_output, indent=4)
out_file = open("pretty_class_output.json", "w")
json.dump(class_output[0:3], out_file, indent=4)
out_file.close()

location_output_output = json.dumps(location_output, indent=4)
out_file = open("location_output_output.json", "w")
json.dump(location_output[0:3], out_file, indent=4)
out_file.close()