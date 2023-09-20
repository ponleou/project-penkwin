# One-Tap

Developed by team "PENKwin" with the mission to bring inclusivity, and ease integration between public transits and rideshares.

## Team

Team PENKwin (APAC)

- Ponleou Keo Sok
- Songkhattey Som
- Edward Chhun
- Ekaterina Trunova

## The Problem

The last mile problem poses a seemingly simple challenge. However, for people who use public transportation to commute to and from work or school on a daily basis, it is not a once-done and crossed-off issue like in cases of emergencies or urgent situations, but it is a repeated, daily inconvenience and frustration. This has led to a strong demand amongst a large and diverse population for a better system which we propose with One-Tap.

A major reason for why the population often choose to use an Uber to travel their first and last mile is safety concerns (caused by available infrastructure, speeding cars, poor lighting, and most gravely, crime). For example in India, 75% of people do not feel safe cycling or walking in their neighbourhoods (National Crime Records Bureau, 2019) and even in the US, a concerningly close to half the population do not feel safe walking or biking in their own neighbourhoods. Haphazardly, with the first and last mile issue, user’s are left in the open to wander around waiting or looking for their connecting ride. 

To reduce the risk and associated concern as much as possible, the One-Tap feature offer’s users an experience with as little time exposure as possible. By allowing users to pre-plan their trip and request an Uber in advance, they can quickly and efficiently secure a ride without having to wait in potentially unsafe areas. This feature not only provides convenience but also peace of mind, ensuring that users can travel to their destination with minimal hassle and maximum safety.

## The Solution 

One-Tap is a new function for the Uber app that will simplify the process for users who regularly commute to book rides ahead of their trips and according to their daily schedule. For users who rely on public transportation for the bulk of their trip, this feature will make it effortless to reserve Uber trips for the first and last mile, which will eliminate the need to wait for their ride at stops and make their trips truly a One-Tap experience.

As the user logs into the application, they will be presented with a status selector in which they will select the status best suited for them. In order to avoid any fraudulent cases for users who want to take advantage of certain benefits. There will also be an authentication process in which the user would have to submit a form of identification which proves they are eligible to sign up for their chosen status.  

At sign-up, users will be asked to input details about their daily commute-related obligations, mainly for students who need to travel to school or office workers who must commute to work. The software will learn about the user's regular commute patterns when they provide this information and be able to offer them personalised offers.

It can be hard to book a ride at the end of a public transport journey, especially during rush hour or bad weather. Users have to manually calculate how long it will take them to get from A to B, and then book a ride in advance so as to not be left stranded, which can be a hassle. This is especially unfair for elderly, disabled, and low-income users.

One-Tap is a groundbreaking initiative that will leverage existing Uber and public transportation services to create a seamless and enjoyable travel experience for users, regardless of the distance. We will achieve this by integrating Uber and public transportation services into a single platform. This will allow users to easily plan and book trips that involve both Uber rides and public transportation. The platform will also provide users with real-time information on traffic conditions, public transportation schedules, and estimated travel times.

This integration will benefit both Uber riders and public transportation users. Uber riders will benefit from having access to a wider range of transportation options, including public transportation. This will give them more flexibility in planning their trips and help them to save money. Public transportation users will benefit from having access to Uber's ride-hailing network, which can help them to get to and from public transportation stops more easily and efficiently.

## Media

### Overview:
![image_2023-09-20_22-49-25](https://github.com/ponleou/project-penkwin/assets/89851049/d40cbeca-1fdb-429d-90b8-5e267128c76a)

### Selected path: Cheapest Option
![image_2023-09-20_22-54-03](https://github.com/ponleou/project-penkwin/assets/89851049/1449843f-992c-401a-a090-8a80bbb57233)

### Selected path: Shortest Option
![image_2023-09-20_22-55-21](https://github.com/ponleou/project-penkwin/assets/89851049/498731bd-1135-4acc-8b92-72a728e06c6e)

## Prerequisite

Generate an API key for Google Maps Javascript API using Google Cloud service. This will be required to fill into the apikey section of the json file.

(Optional) Generate a personal mapID, or keep the default mapID.

### Project development deployment (Path-finding function with Google Maps API) using Node.js and Vue.js

```
npm install
npm run serve
```

### Project deployment for the User Status Assignment

Installing dependencies

```
pip install datetime
```

Run "societal_status.py" on a python supported terminal
