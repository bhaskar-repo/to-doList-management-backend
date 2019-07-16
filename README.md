# To Do List Management Back End in Node JS
containing node js code required to run To Do List Management application. it includes all the internal and external modules required for the application.
front end has just to make a request to all the end points defined in node js application to render it or get the desired output.
i found node js is very easy to understand and learn.

## Getting Started
This instructions will tell you how to clone this to your localhost and run it.

### Prerequisites
 Note : you can skip installation steps if already installed in your system.
  1. Node JS (how to install? <a href="https://nodejs.org/en/download/">NodeJs</a>)
  
  2. Install Git (how to install? <a href="https://git-scm.com/downloads">Git Hub</a>)
  
### running locally
 
 1. create new folder in your system
 2. open that folder in cmd or linux terminal and execute following commands in sequence.
 
 ```
 > git init
 > git remote add origin https://github.com/bhaskar-repo/to-doList-management-backend.git
 > git pull origin master
 > npm install
 ```
 above commands will pull project to your newly created folder. and npm install will add project dependencies.
 Note: index.js is the entry point to the node js application.
```
 > node index.js
```
### More About Application
TO DO LIST MANAGEMENT SYSTEM

Applications has mainly three modules
 
  * **USER MODULE**
  * **TODOLIST MODULE**
  * **SHARED MODULE**
  
  * USER -> it includes sign up,login,requests,activities,friends,find friends functionalities
		signup -> during sign up user is able to sign up with country and country phone code.
			   -> added validation for fields like email,password and mobile
			   -> upon login user will be redirected to login page.
		login  -> user can login through registered email followed authentication mechanism generating jwt.
				  client side from validation for gmail and password is added.
		requests -> requests is a section where all the requests from other users will land.
					user can either cancel request or accept it. once accepted friends will be notified.
		activities -> user can see the his own activities as well as friends activities 
					 user can undo activities
					 
		Friends -> all the friends of user are listed under this section.
		           from here user can see friends list,profile,and activities.
		find friends -> here you will find a button where all the friends are listed to whom you send a request.
		
  * TODOLIST -> it has three parts, List,Items,subItems
			
		List -> upon login user will see an option to add an empty list, user can delete the list too.
			 -> here user can edit the list.
		Item -> on edit of list user can add items to the list and delete item from the list
			 -> on edit of item user is redirected to edit page here user can edit title,description,duedate and upload file too.
		subItem -> in edit section of item only user is able to add sub item.
		
		->mark done/open functionalities added for both item and subitems if you are adding sub items to items you must mark
			them complete, then only you can mark main item done.
		-> user can only edit the item if user has marked that item open 
		
		-> Dashboard also you can check the status of to dos if markded done green color will be shown
		
		-> i have used font-awesome icons instead of buttons in most of the places.
		
		-> on each action client will emit socket event for that particular action.
		
  * SHARED MODULE -> all the common things requred are kept here,
				-> header is kept in this module all the major actions have seperated with nav bar links
				-> http header is a component when any error the user will be redirected to this page
				-> hanled error with diffrent page.
				
  * Exra points -> 
			- >added file upload functionality.
			- > added icon for each action.

note: i am storing my secretKey in database. need to add an entry for each db connection (secretKey: "") in globalcofig table
for more details kindly refer to the microsoft world doc attached.

cntrl + z will work on activities page last action will be deleted and reverted back.

i have added only few of events in event docs,it is a very big params


## Built With

* [NPM](https://www.npmjs.com/) - Most of the modules are used
* [nodemailer](https://nodemailer.com/about/) - NPM module to send the mails
* [apiDoc](http://apidocjs.com/) - NPM module to create the apiDoc and eventDoc
* [nodejs](https://nodejs.org)- Node js to write back end

## Authors

* **Bhaskar Pawar** - *Initial work* - [bhaskarpawar](https://github.com/bhaskar-repo)
* **Edwisor** - *Problem Statement* - [Edwisor](https://www.edwisor.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for detailsg

## Acknowledgments

* Thanks for Edwisor to review this application.
* I would like to thank whoever supported for implenting this back end for to do list management backend application.
