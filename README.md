#Firebase integration

1. Ng new <project-name> --no-standalone
2. Firebase init.
3. Select Setup hosting.
4. Build.
5. Firebase deploy

Then Angular Fire Integration -

1. Install the package
2. add firebase config to the environement files
3. import angularfiremodule to app.module

####OR ####OR

1. ng add @angular/fire
2. Select -- hosting, Authentication, Google Analytics, Firestore, Cloud Functions
   (callable), Cloud Messaging, Performance Monitoring, Cloud Storage from dropdown

#Generate Environments file
1.ng generate environments

npm i bootstrap bootstrap-icons primeng
npm i --save-dev prettier

For integrating your firebase with this boilerplate
You just have to go to console.firebase.google.com select your project create an app with hosting
Then update environment file and .firebaserc file

optionally
firebase init hosting //it will update your firebase.json file
