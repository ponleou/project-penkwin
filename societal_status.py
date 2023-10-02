import json
import datetime as dt
from datetime import timedelta


today_date = dt.datetime.now()
one_month_duration = timedelta(weeks = 4)
next_month_date = today_date + one_month_duration

# User Variables
uber_credits = 0
user_ID = []
# Variables that are going to be sent to json files that are needed to be used
# dummy_variables = [student_id, poverty, uber_credits, help, user_input]
# Status checker for user

working = 0
student = 0
poverty = 0
accommodation = 0

# Check user ID 

def check_user_id():
    global user_id
    print("Check User")

# Check for working status

def check_status_working():
    global working
    global working_role
    global working_organization
    eligibility = input("\nAre you eligibile for organization employee benefits? (Y/N): ")
    if eligibility == "Y":
        if working == 0:
            working_organization = input("Please enter your organization's name: ")
            print("\n", working_organization)
            working_role = input("\nPlease enter your role: ")
            print("\n", working_role)
            print("\nThank you for your information, we are currently checking your status", 
                  " please give one business day for a response.")
            working += 1
            print("\nWe have updated your role, your ride information is going to be shared to help",
                  "cater transportation times to improve productivity accross Uberland.")
        # Needs to error handle (Assign data to database to make sure user is legit)
    elif eligibility == "N":
        print("\nThank you for answering!")
    else:
        print("Please type in the correct input, example: Y / N")
        check_status_working()

# Check for student status

def check_status_student():
    global student
    global student_id
    eligibility = input("\nDo you want to sign up for student's discount? (Y/N): ")
    if eligibility == "Y":
        if student == 0:
            verification = 0
            student_id = input("\nPlease enter your student ID number: ")
            print("\nYour student ID is:", student_id)

            # Needs error handling for student verification
            print("\nWe are currenly checking your student status, please give one business day for a response.")
            verification += 1

            if verification == 1:
                student += 1
                return student
            else:
                print("\nUnfortunately, we weren't able to process your applications\n"
                        "Please contact customer support: (012-223-223)")
    if eligibility == "N":
        print("\nThank you for answering!")
    else:
        print("Please type in the correct input, example: Y / N")
        check_status_student()


# NEEDS ERROR HANDLING
def check_status_poverty():
    global poverty
    global uber_credits
    global annual_income
    eligibility = input("\nDo you want to check if you are eligible for financial aid in Uber Credits? (Y/N): ")
    if eligibility == "Y":
        if poverty == 0:
                annual_income = int(input("\nPlease enter your estimate annual income: $ "))
                print("\nYour annual income is: $",annual_income)
                print("\nThe system is processing numbers.....")
                if annual_income <= 24000:
                    print("\nYou are eligible to $70.00 of Uber Credits per month starting from", dt.datetime.now(),"\n"
                        "until", next_month_date, "\n")
                    uber_credits += 70.00
                    poverty += 1
                    
                else:
                    print("\nUnfortunately, we weren't able to process your applications\n"
                            "Please contact customer support: (012-223-223)")
    elif eligibility == "N":
        print("\nThank you for answering!")
    else:
        print("Please type in the cor`rect input, example: Y / N")
        check_status_poverty()

def check_status_accommodation():
    global accommodation
    global help

    if accommodation == 0:

        # Needs fixed input of 1 character

        help = input("\nDo you require accommodation when riding with Uber (Y/N): ")

        if help == "Y":
            accommodation += 1
            print("\nWe will notify our drivers about your accommodation.")
        else:
            accommodation = 0
            return accommodation

# Time Skewing Function - Needs polishing and improvement
# +++++++++++++++++++++++++++++++++++++++++++++++++++++++
# This will be changed by data analysts each month, catering to students/working status to improve productivity 
# and increase economical growth in Uberland

# Predefined transportation schedule

transportation_schedule = {
    "Morning": dt.time(8,0),
    "Afternoon": dt.time(12,0),
    "Evening": dt.time(17,0),
}

# Function to check if the user's requested time is available
def check_time_availability(user_time, schedule):
    for slot, time_slot in schedule.items():
        if user_time == time_slot:
            return slot
    return None

# Prompt the user for their time availability
while True:
    global user_preferred_time
    print("\nThe time available for public transportation are from\n08:00 AM - 10:00 PM")
    user_preferred_time = input("\nPlease enter your preferred time (e.g., '08:00 AM'): ")
    
    # Parse user input to a datetime.time object
    try:
        user_time = dt.datetime.strptime(user_preferred_time, '%I:%M %p').time()
    except ValueError:
        print("Invalid time format. Please use 'hh:mm AM/PM' format.")
        continue

    # Check if the user's requested time is available
    slot = check_time_availability(user_time, transportation_schedule)
    
    if slot:
        print(f"Great! Your transportation is scheduled for {slot}.")
        break
    else:
        print("Sorry, the selected time is not available. Please choose another time.")

# +++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Calling the functions

check_status_working()
check_status_student()
check_status_poverty()
check_status_accommodation()
print("\nWorking Student: ", student, "\nFinancial Aid: ", poverty , "\nRequires Accommodation", accommodation)

#--------------------------------

# THIS NEEDS IMPROVEMENT AND FUNCTIONALITY

# Json Dump Files
users = {}
users['info'] = []

# Create a dictionary with user information
user_info = {
    # 0 is False, 1 is True
    "User Preferred Time": user_preferred_time,
    "Student ID" : student_id,
    "Working": working,
    "Job Role": str(working_role),
    "Job Organization": str(working_organization),
    "Student": student,
    "Financial Aid": poverty,
    "Accommodation": accommodation,
}

file_name = "user_info.json"

with open(file_name, "w") as json_file:
    json.dump(user_info, json_file, indent=4)

print(f"User information has been saved to {file_name}")
print(user_info)

