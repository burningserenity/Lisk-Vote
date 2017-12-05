# Lisk Vote

Fully transparent, anonymous, and secure voting app to be deployed on a Lisk sidechain.

To get started, make sure you have NodeJS version 8.9 or higher, and Postgres version 9.6 or higher.
Open a terminal window in the app's route directory. Run the following: 

        createdb liskvote_development

        createdb postgres

        npm i && cd client && npm i && cd ..

        npm start

Follow the link to create a user. You must enter a passphrase; all other fields are optional. A user will be created with a unique, tentative blockchain address.

To log in, simply go to the main page and enter your passphrase.

Once logged in, if you are registered for any ballots, you may select them from the menu shown.

Each ballot contains several issues, or topics, to vote on. Each issues contains several positions, or options, to choose when voting. It works like this:
        
        Ballot - Plan for Lunch
              Issue - Where should we have lunch?
                    Position - McDonald's
                    Position - Buca di Beppo
                    Position - Benihana
              Issue - Who's car should we take?
                    Position - Brenda's
                    Position - Mike's
              Issue - What time should we leave?
                    Position - 11:30
                    Position - 12:00
                    Position - 1:00
                    
You may then view the results for each issue in the ballot on some lovely doughnut charts.

There is also a route to register a voter for a ballot. It is not enough to have an account, each user must be registered for each ballot they intend to vote on. On the voter registration page there are two drop down menus, one for selecting the ballot a user wants to vote on, and one for selecting that user.
