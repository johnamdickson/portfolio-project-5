# Testing 

## Contents

<a name="contents"></a>

- [User Story Testing](#user-story-testing)
  * [Project Setup Epic](#project-setup-epic)
  * [Basic Site Navigation Epic](#basic-site-navigation-epic)
  * [Site Administration Epic](#site-administration-epic)
  * [Create Home Page Epic](#create-home-page-epic)
  * [Emissions Display and Interaction Epic](#emissions-display-and-interaction-epic)
  * [Emission Checks Display and Interaction Epic](#emission-checks-display-and-interaction-epic)
  * [Emission Detail Page and Interaction Epic](#emission-detail-page-and-interaction-epic)
  * [Maps API Epic](#maps-api-epic)
  * [Managing HTTP Status Codes Epic](#managing-http-status-codes-epic)
  * [Fine Tuning User Experience and Site Admin Epic](#fine-tuning-user-experience-and-site-admin-epic)
  * [Testing and Documentation Epic](#testing-and-documentation-epic)
- [Validator Testing](#validator-testing)
  * [HTML](#html)
  * [CSS](#css)
  * [Javascript](#javascript)
  * [Python](#python)
  * [Lighthouse](#lighthouse)
  * [DBeaver](#dbeaver)
- [Responsiveness Testing](#responsiveness-testing)
  * [Browser Testing](#browser-testing)
  * [Device Testing](#device-testing)
- [Automated Testing](#automated-testing)
  * [Python Automated Testing](#python-automated-testing)
  * [Javascript Automated Testing](#javascript-automated-testing)
- [Manual Testing](#manual-testing)
  * [Home Page](#home-page)
  * [Emissions Page](#emissions-page)
  * [Checks Page](#checks-page)
  * [Emission Details Page](#emission-details-page) 
  * [Add Emission Page](#add-emission-page)
  * [Close Emission Page](#close-emission-page)
  * [Add Check Page](#add-check-page)
  * [Login Page](#login-page) 
  * [Signup Page](#signup-page) 
  * [Logout Page](#logout-page) 
  * [400 Error Page](#400-error-page) 
  * [403 Error Page](#403-error-page) 
  * [404 Error Page](#400-error-page) 
  * [500 Error Page](#403-error-page) 
  * [Footer](#footer) 
  * [Alerts](#alerts) 
- [Bugs](#bugs)

## User Story Testing

### [Project Setup Epic](https://github.com/johnamdickson/portfolio-project-4/issues/1)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **Site Admin** I can **deploy the project early** so that **fault finding through to deployment commences at the start of build**](https://github.com/johnamdickson/portfolio-project-4/issues/2)|Project was deployed to Heroku with an `<h1>` of Heroku Test added to the DOM. This was confirmed to be present on deployment| ✅|![user_stories](TESTING-files/user-story-testing/project-setup/deploy-early.png) 
[As a **Site Owner** I can **review wireframes** so that **site layout can be provisionally agreed**](https://github.com/johnamdickson/portfolio-project-4/issues/3) |Wireframes developed and uploaded to repository for review.|✅|Click [here](README-files/pp4-wireframes.pdf) to access the wireframes.
[As a **Site Admin** I can **confirm that the SQL database is functional** so that **the connection to project and corresponding models is assured**](https://github.com/johnamdickson/portfolio-project-4/issues/4)|Database created in Elephant SQL and confirmed operational from project by creating an emission and emission check in the Django admin panel and then confirming they appear in the DB|✅|![user_stories](TESTING-files/user-story-testing/project-setup/emission-to-database.png) ![user_stories](TESTING-files/user-story-testing/project-setup/emission-check-to-database.png) 

### [Basic Site Navigation Epic](https://github.com/johnamdickson/portfolio-project-4/issues/7)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **User** I can **navigate the website** so that **I am able to access different pages with ease.**](https://github.com/johnamdickson/portfolio-project-4/issues/8)|Navbar created and HTML structure set up in templates for required pages.|✅|![user_stories](TESTING-files/user-story-testing/basic-navigation/html-pages.png) ![user_stories](TESTING-files/user-story-testing/basic-navigation/navbar.png) 
[As a **User** I can **create a new account** so that **I am able to access the monitoring tool.**](https://github.com/johnamdickson/portfolio-project-4/issues/9)|A signup page exists with a form for the new user to fill out and submit.|✅|![user_stories](TESTING-files/user-story-testing/basic-navigation/signup-page.png) 
[As a **User** I can **effortlessly sign in and sign out of my account** so that **my access to the account is secure.**](https://github.com/johnamdickson/portfolio-project-4/issues/10)|Login and logout pages exist which are easily accessible from the navbar.|✅|![user_stories](TESTING-files/user-story-testing/basic-navigation/login-page.png) ![user_stories](TESTING-files/user-story-testing/basic-navigation/logout-page.png) 

### [Site Administration Epic](https://github.com/johnamdickson/portfolio-project-4/issues/11)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **Site Admin** I can **create, read, update and delete emissions on the provided Django panel** so that **the monitoring tool is current and reflective of emissions status**](https://github.com/johnamdickson/portfolio-project-4/issues/12)|Test emission and test emission check added to database from Django admin page.|✅|![user_stories](TESTING-files/user-story-testing/site-administration/admin-panel-add-emission.png) ![user_stories](TESTING-files/user-story-testing/site-administration/admin-panel-add-emission.png) 
[As a **Site Admin** I can **verify that emissions are locked for editing to non-superusers** so that **the monitoring tool content is locked for auditing purposes**](https://github.com/johnamdickson/portfolio-project-4/issues/13)|Time based deletion deemed unnecessary, preferring time based editing instead.|❌|N/A
[As a **Site Admin** I can **allow certain users  to create of emissions on a linked page** so that **the monitoring tool is current and reflective of emissions status**](https://github.com/johnamdickson/portfolio-project-4/issues/14)|Two different users groups created: emission_user and emission_admin. The emission_admin user is able to add a new emission whilst the emission_user is not. When a new user is created, they are automatically assigned to the emission_user group.|✅|![user_stories](TESTING-files/user-story-testing/site-administration/admin-panel-emission-admin.png) ![user_stories](TESTING-files/user-story-testing/site-administration/admin-panel-emission-user.png) 

### [Create Home Page Epic](https://github.com/johnamdickson/portfolio-project-4/issues/15)
**User Story**|**Implemented**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **User** I can **access a summary of emissions from the back-end with a designed front-end** so that **the home page contains a useful summary of all open emissions.**](https://github.com/johnamdickson/portfolio-project-4/issues/16)|A bootstrap carousel was implemented with a card for each emission that the user can scroll through.|✅|![user_stories](TESTING-files/user-story-testing/create-home-page/carousel.png)
[As a **User** I can **view images of the emissions** so that **any ambiguity around the emission location is reduced**](https://github.com/johnamdickson/portfolio-project-4/issues/17)|Emission image url as Cloudinaryfield in Emission model. Cloudinary account set up to store all images. Home page carousel displays the emissions image.|✅|![user_stories](TESTING-files/user-story-testing/create-home-page/carousel.png)
[As a **Site Admin** I can **design the home page to match site styling** so that **the user experience is a positive and informative one**](https://github.com/johnamdickson/portfolio-project-4/issues/18)|Hero image selected to fit with the site theme. A callout added on top of hero image with styling to match the navbar and clearly displaying the site purpose.|✅|![user_stories](TESTING-files/user-story-testing/create-home-page/hero-and-callout.png)
[As a **Site Admin** I can **implement a map API** so that **maps showing emission location can be made available to the user.**](https://github.com/johnamdickson/portfolio-project-4/issues/22)|User story moved to Map API Epic.|❌|N/A
[As a **User** I can **select individual emissions** so that **I can drill down into further details**](https://github.com/johnamdickson/portfolio-project-4/issues/23)|Modal created on home page with additional information from back end. The information is presented in a table and an image is visible at the top of the modal. There is also a button for submission of emission checks which references the title of the modal emission.|✅|![user_stories](TESTING-files/user-story-testing/create-home-page/home-page-modal.png)

### [Emissions Display and Interaction Epic](https://github.com/johnamdickson/portfolio-project-4/issues/19)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **User** I can **see a list of emissions** so that **I have an overview of the facility.**](https://github.com/johnamdickson/portfolio-project-4/issues/20)|On the emissions page there is a table detailing all of the emissions stored in the database.|✅|![user_stories](TESTING-files/user-story-testing/emissions-display-and-interaction/emissions-table.png)
[As a **User** I can **filter the emissions list** so that **I can view only ones that are open.**](https://github.com/johnamdickson/portfolio-project-4/issues/21)|On the emissions table there is a toggle switch which will hide/unhide closed emissions.|✅|![user_stories](TESTING-files/user-story-testing/emissions-display-and-interaction/emissions-table-filter.gif)
[As a **Site Admin** I can **implement a map API** so that **maps showing emission location can be made available to the user.**](https://github.com/johnamdickson/portfolio-project-4/issues/22)|User story moved to Map API Epic.|❌|N/A
[As a **User** I can **see a list of emissions** so that **I have an overview of the facility.**](https://github.com/johnamdickson/portfolio-project-4/issues/20)|On the emissions page there is a table detailing all of the emissions stored in the database.|✅|![user_stories](TESTING-files/user-story-testing/emissions-display-and-interaction/emissions-table.png)
[As a **Site Admin or authorised user** I can **close emissions on the emissions page** so that **the process of completing emissions once they are repaired is straight forward**](https://github.com/johnamdickson/portfolio-project-4/issues/25)|User story moved to Emission Detail Display and Interaction|❌|N/A
[As a **Site Admin** I can **delete emissions from the database on the emissions page** so that **erroneous emissions can be removed**](https://github.com/johnamdickson/portfolio-project-4/issues/26)|User story moved to Emission Detail Display and Interaction|❌|N/A
[As an **Authorised User** I can **create emissions from the emissions page** so that **new emissions can be recorded in the system**](https://github.com/johnamdickson/portfolio-project-4/issues/27)|On the emissions page there is a button in the callout for adding an emission. The button is styled dependant on the user permissions. If an unauthorised user presses the button a message appears informing them that they do not have the necessary permissions.|✅|![user_stories](TESTING-files/user-story-testing/emissions-display-and-interaction/add-emission-permission.png)![user_stories](TESTING-files/user-story-testing/emissions-display-and-interaction/add-emission-no-permission.png)

### [Emission Checks Display and Interaction Epic](https://github.com/johnamdickson/portfolio-project-4/issues/24)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **User** I can **easily create and complete emissions checks** so that **one of my duties as an operator can be fulfilled.**](https://github.com/johnamdickson/portfolio-project-4/issues/35)|There are buttons to submit a check from home page modal, emission detail modal or the emission checks page. The button links the user to a Submit Check form which once submitted is added to the database and the user is notified after being redirected to the checks page.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/submit-check-form.png)![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/submit-check-success.png)
[As a **Site Owner** I can **view the latest emissions checks on an emissions detail page** so that **I can verify checks are being completed at a glance for that particular emission**](https://github.com/johnamdickson/portfolio-project-4/issues/36)|A table of all emission checks exists on the emissions checks page of the site and is ordered by date the check was created.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/emission-checks-table.png)
[As a **Super User** I can **delete emissions checks** so that **erroneous emission checks can be removed from the system.**](https://github.com/johnamdickson/portfolio-project-4/issues/37)|A delete check button is available to only the superuser which when pressed generates a prompt to confirm deletion.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/check-deletion-non-superuser.png)![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/check-deletion-superuser.png)
[As a **Super User** I can **verify that emissions are locked for editing to non-superusers** so that **the monitoring tool content is locked for auditing purposes**](https://github.com/johnamdickson/portfolio-project-4/issues/38)|A time based option for editing exists for non-superusers which entails a 24 hour period for editing checks thereafter the option is not available.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/editing-permitted-within-24-hours.png)![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/editing-not-permitted-after-24-hours.png)![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/editing-disallowed-message.png)
[As a **User and Site Admin** I can **see all emissions checks for my facility on one page** so that **I can readily access all of the the emission check history.**](https://github.com/johnamdickson/portfolio-project-4/issues/39)|The table mentioned in previous user story exists and also has a search bar to filter per emission or username.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/check-table-searchbar.png)
[As a **User** I can **edit emissions checks** so that **any errors I have made can be corrected.**](https://github.com/johnamdickson/portfolio-project-4/issues/45)|An editing function exists as described previously. Only users can update the checks they submitted (superusers can update all). Editing completed using form page and there is a confirmation alert generated prior to submission.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/edit-check-form.png)![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/edit-check-confirmation.png)
[As a **Site Admin** I can **update emission check due dates automatically** so that **they do not have to be manually updated by users**](https://github.com/johnamdickson/portfolio-project-4/issues/46)|The FirstMonday class contains methods to automatically calculate the current and next checks due. Theses methods are accessed in the emission detail page and also when creating a new emission and will updates the respective fields in the database without requiring any input from the user.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/first-monday-class.png)![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/current-last-check.png)
[As a **User** I can **filter checks that are open or open/closed** so that **checks on open emissions are prioritised for the user**](https://github.com/johnamdickson/portfolio-project-4/issues/66)|On the emission checks table there is a toggle switch which will hide/unhide checks associated with closed emissions.|✅|![user_stories](TESTING-files/user-story-testing/emission-checks-display-and-interaction/checks-filter-switch.gif)

### [Emission Detail Page and Interaction Epic](https://github.com/johnamdickson/portfolio-project-4/issues/28)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **User** I can **view all emission details on one page** so that **I can see all of the information that exists for it.**](https://github.com/johnamdickson/portfolio-project-4/issues/29)|An emission detail page exists for each emission with a table containing all the information related to that particular emission.|✅|![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/emission-detail-table.png)
[As a **User** I can **view the emission location on a map** so that **I can visualise the emissions location**](https://github.com/johnamdickson/portfolio-project-4/issues/30)|A map view exists on the emission detail page with a marker indicating the location of the emission.|✅|![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/emission-detail-map-view.png)
[As a **Site Owner** I can **verify permissions to close and delete emissions** so that   **they are not moved to an undesirable position in error.**](https://github.com/johnamdickson/portfolio-project-4/issues/31)|Options to close and delete emissions are based on user status. An emission_user cannot close nor delete, an emission_admin can close but not delete whilst a superuser can both close and delete an emission. This is reflected in the styling of the respective buttons.|✅|![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/close-delete-emission-no-permissions.png)![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/close-delete-emission-close-permissions.png)![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/close-delete-emission-superuser.png)
[As a **Site Admin and User** I can **view the relevant emission detail based on status** so that **only pertinent information is visible**](https://github.com/johnamdickson/portfolio-project-4/issues/32)|Emission detail tables are formatted to display relevant information based upon the emission status being open or closed.|✅|![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/emission-detail-table-open.png)![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/emission-detail-table-closed.png)

### [Maps API Epic](https://github.com/johnamdickson/portfolio-project-4/issues/33)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **Site Admin** I can **implement a map API** so that **maps showing emission location can be made available to the user.**](https://github.com/johnamdickson/portfolio-project-4/issues/22)|Map API added to project and confirmed operational on the emission-detail page.|✅|![user_stories](TESTING-files/user-story-testing/create-home-page/map-api.png)
[As a **User** I can **view the emission location on a map** so that **I can visualise the emissions location**](https://github.com/johnamdickson/portfolio-project-4/issues/30)|Map added to emission detail page.|✅|![user_stories](TESTING-files/user-story-testing/emission-detail-page-and-interaction/emission-detail-map-view.png)
[As a **User** I can **see all of the emissions on a map** so that **their location is immediately obvious and given context with the users location.**](https://github.com/johnamdickson/portfolio-project-4/issues/34)|User story will not be implemented in this version of the app.|❌|N/A
[As a **User** I can **select the emission location using a map and pin** so that **I do not need to work out the latitude and longitude manually**](https://github.com/johnamdickson/portfolio-project-4/issues/70)|User story will not be implemented in this version of the app.|❌|N/A

### [Managing HTTP Status Codes Epic](https://github.com/johnamdickson/portfolio-project-4/issues/51)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **Site Admin** I can **ensure users are informed of client error responses (400,403 and 404) in an informative and design friendly manner** so that **they can be made aware of the issue whilst maintaining the site aesthetic**](https://github.com/johnamdickson/portfolio-project-4/issues/53)|A separate page exists for 400, 403 and 404 errors which all are triggered by the appropriate error and are formatted to suit the site styling.|✅|![user_stories](TESTING-files/user-story-testing/managing-http-status-codes/404-error.png)
[As a **Site Admin** I can **ensure users are informed of the server error response (500) in an informative and design friendly manner** so that **they can be made aware of the issue whilst maintaining the site aesthetic**](https://github.com/johnamdickson/portfolio-project-4/issues/54)|A page exists for 500 error code which iw triggered by the appropriate error and is formatted to suit the site styling.|✅|![user_stories](TESTING-files/user-story-testing/managing-http-status-codes/500-error.png)

### [Fine Tuning User Experience and Site Admin Epic](https://github.com/johnamdickson/portfolio-project-4/issues/55)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **User** I can **scroll to the bottom of overflowing emissions tables** so that **I have a better experience of using the tables and I can visualise that there is overflow content.**](https://github.com/johnamdickson/portfolio-project-4/issues/56)|Both the emissions and emissions checks tables have scroll buttons that are styled dynamically to indicate whereabouts in the table the user is.|✅|![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/scroll-buttons.gif)
[As a **Site Admin** I can **provide a confirm prompt that fits with site styling** so that **users experience a fluent and seamless styling in all aspects of the site**](https://github.com/johnamdickson/portfolio-project-4/issues/57)|User story will not be implemented in this version of the app.|❌|N/A
[As a **User** I can **exit form without submission using a cancel / go back button in the window as opposed to browser back button** so that **I can navigate from the site at point of use instead of using browser control.**](https://github.com/johnamdickson/portfolio-project-4/issues/58)|Each form has a go back button which enables the user to go back to the previous page without using the browser controls.|✅|![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/edit-form-go-back-button.png)
[As a **User** I can **traverse the site using commonly styled buttons** so that **the navigation experience is consistent and intuitive**](https://github.com/johnamdickson/portfolio-project-4/issues/60)|All butons across the site styled for consistency which essentially breaks down as two types: white background/red font and red background/white font.|✅|![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/button-white-background-red-font.png)![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/button-red-background-white-font.png)
[As a **Site Admin** I can **condense all form htmls into a template for extension** so that **DRY principle can be adhered to.**](https://github.com/johnamdickson/portfolio-project-4/issues/61)|User story will not be implemented in this version of the app.|❌|N/A
[As a **User** I can **log onto the monitoring tool with single sign on** so that **logging is a simple and secure process using a familiar log in**](https://github.com/johnamdickson/portfolio-project-4/issues/63)|User story will not be implemented in this version of the app.|❌|N/A
[As a **Site Admin** I can **check a users log in status** so that **those not logged in are only able to access the home page**](https://github.com/johnamdickson/portfolio-project-4/issues/64)|When no user is logged in, any attempt to access another page such as emissions will result in the user being returned to the login page.|✅|![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/redirect-to-login-page.gif)
[As a **Site Admin** I can **ensure that the add emission form contains the correct inputs** so that **unnecessary fields are removed.**](https://github.com/johnamdickson/portfolio-project-4/issues/64)|Current and next check due form fields removed as these values are automatically calculated.|✅|![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/add-emission-form-with-check-due.png)![user_stories](TESTING-files/user-story-testing/fine-tuning-user-experience-and-site-admin/add-emission-form-without-check-due.png)

### [Testing and Documentation Epic](https://github.com/johnamdickson/portfolio-project-4/issues/72)
**User Story**|**Test**|**Result**|**Evidence**
:------|:------|:----:|:-----:
[As a **Site Admin** I can **complete manual testing** so that **all aspects of the project will be tested.**](https://github.com/johnamdickson/portfolio-project-4/issues/74)|All manual testing completed and referenced in TESTING.md|✅| TESTING.md can be found [here.](TESTING.md)
[As a **Site Owner** I can **review well commented and annotated code** so that **purpose and scope of code is known now and into the future**](https://github.com/johnamdickson/portfolio-project-4/issues/82)|Review completed and updates made.|✅| Reviewed code can be found in the project area [here.](/)
[ As a **Site Owner** I can **access the project README** so that **all of the necessary information for the tool is available on project completion**](https://github.com/johnamdickson/portfolio-project-4/issues/75)|README completed.|✅| README can be found [here.](README.md)

<br><a href="#contents">BACK TO CONTENTS 🔼</a>

## Validator Testing

### HTML

All HTML pages were checked using the [W3C HTML Validator](https://validator.w3.org/) with each page checked using address with the exception of those requring user login. These pages were checked using the source text input. The text input was obtained by navigating to the page to test and then right clicking on the window. From the menu, the view page source option was selected which opened a new tab containing the DOM for the page. The test was then performed by copying and pasting the code into the text input field in the validator. The pages checked using the source text are: profile, add-product, edit-product.

Results for all HTML pages can be found in the table below:

**Page**|**First Pass**|**Warnings/Errors**|**Second Pass<br><sup><sub>(Post Fix)</sub></sup>**|**Screenshot**
:-----:|:-----:|:-----|:-----:|:-----:
 |home| ❌ |Errors/warnings returned, click [here](documentation/TESTING-files/html-validation/pre-edit-results/index.md)| ✅ |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/home-page.png) 
|products| ❌ |Errors/warnings returned, click [here](documentation/TESTING-files/html-validation/pre-edit-results/products.md)| ✅ |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/products-page.png) 
|product-detail| ❌ |Errors/warnings returned, click [here](documentation/TESTING-files/html-validation/pre-edit-results/product-detail.md)| ✅ |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/product-detail-page.png) 
|cart| ✅ |No errors/warnings returned| N/A |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/cart-page.png) 
|checkout| ✅ |No errors/warnings returned| N/A |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/checkout-page.png) 
|checkout-success| ✅ |No errors/warnings returned| N/A |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/checkout-success-page.png) 
|profile| ❌ |Errors/warnings returned, click [here](documentation/TESTING-files/html-validation/pre-edit-results/profile.md)| ✅ |![html_checker](documentation/TESTING-files/html-validation/post-edit-results/profile-page.png) 

 
### CSS

The site CSS was checked using the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/). There were 220 warnings assoiated with Bootstrap CSS and 6 in static CSS file associated with webkit code. These warnings are unavoidable in the validator because they are vendor extensions. However, looking at feedback given to other students on Slack who had a similar issue, it appears to be safe to ignore these warnings. 

The warnings and errors that are detailed in the table below reflect problems within the static CSS file and were duly corrected.

**First Pass**|**Errors**|**Warnings**|**Second Pass<br><sup><sub>(Post Fix)</sub></sup>**|**Screenshot**
:-----:|:-----|:-----|:-----:|:-----:
| ❌|Property opaity doesn't exist. The closest matching property name is opacity : 0 <br>Property size doesn't exist. The closest matching property name is resize : 50px<br>Property size doesn't exist. The closest matching property name is resize : 50px|.go-back-btn	Same color for background-color and color<br> .go-back-button Same color for background-color and border-color|✅|![css_checker](TESTING-files/css-validator/css-validator.png) 

### Javascript

The site Javascsript functionality was checked using [JS Hint](https://jshint.com/).

**File**|**Warnings**|**Warnings Remaining<br><sup><sub>(Post Fix)</sub></sup>**|**Screenshot**
|:-----:|:-----|:-----|:-----:|
cart.js |Warnings returned, click [here](documentation/TESTING-files/javascript-validation/pred-edit-results/cart-js.md) to view|Seven warnings remained post edits all relating to functions declared in loops referencing an outer scoped variable. Decided no to spend time at this stage in the project resolving as they are minor issues.<br>Bootstrap undefined variable. No action taken as necessary for operation of popovers.|![js-checker](documentation/TESTING-files/javascript-validation/post-edit-results/post-edit.png) 


### Python

Each of the site Python files containing code over and above a basic import and boilerplate comments were passed through the [Code Institute Python Linter](https://pep8ci.herokuapp.com/). The table below lists each of the main files with screenshot of the results after resolving errors and warnings.
#### Cart App
**File**|**Initial Errors/Warnings**|**Screenshot**
|:-----:|:------|:-----:|
|apps.py|No errors/warnings returned|![python-checker](documentation/TESTING-files/python-validation/cart/aps-post-edit.png)
|cart_tools.py|Errors/warnings returned, click [here](documentation/TESTING-files/python-validation/cart/cart-pre-edit.md#cart_toolspy)|![python-checker](documentation/TESTING-files/python-validation/cart/cart-tools-post-edit.png)
|contexts.py|Errors/warnings returned, click [here](documentation/TESTING-files/python-validation/cart/cart-pre-edit.md#contextspy)|![python-checker](documentation/TESTING-files/python-validation/cart/contexts-post-edit.png)
|tests.py|Errors/warnings returned, click [here](documentation/TESTING-files/python-validation/cart/cart-pre-edit.md#testspy)|![python-checker](documentation/TESTING-files/python-validation/cart/tests-post-edit.png)
|urls.py|No errors/warnings returned|![python-checker](documentation/TESTING-files/python-validation/cart/urls-post-edit.png)
|views.py|Errors/warnings returned, click [here](documentation/TESTING-files/python-validation/cart/cart-pre-edit.md#viewspy)|![python-checker](documentation/TESTING-files/python-validation/cart/tests-post-edit.png)



### Lighthouse

All HTML pages were checked using [Chrome DevTools Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/). The results were generally optimal for desktop devices as shown in the table below. The status code pages returned an error on Lighthouse in Navigation mode, possibly owing to the fact that they redirect after a countdown period. Based on their content simplicity and the fact they should be rarely accessed, the Snapshot mode was selected. Each page returned the same score which is shown at the bottom of the table.

For mobile devices, the performance score was in the 60-70 region. This was improved by changing the image format to webp and moving all scripts to bottom of body with the exeption of those essential to the page function. The Google maps API also affected performance, especially on the emissions detail page where the map is rendered. Upon researching this performance dip it would appear that this is commonplace and to be expected without any countermeasures involving workarounds. These countermeasures and any further alterations towards improving the mobile performance score were considered but in the interests of project progress this was not implemented.
**File**|**Desktop Results**|**Mobile Results**|
|:-----:|:-----:|:-----:|
|index.html|![lighthouse-desktop-results](TESTING-files/lighthouse/index-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/index-mobile.png)
|emissions.html|![lighthouse-results](TESTING-files/lighthouse/emissions-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/emissions-mobile.png)
|emission-detail.html|![lighthouse-results](TESTING-files/lighthouse/emission-detail-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/emission-detail-mobile.png)
|emission-checks.html|![lighthouse-results](TESTING-files/lighthouse/emission-checks-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/emission-checks-mobile.png)
|login.html|![lighthouse-results](TESTING-files/lighthouse/login-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/login-mobile.png)
|logout.html|![lighthouse-results](TESTING-files/lighthouse/logout-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/logout-mobile.png)
|signup.html|![lighthouse-results](TESTING-files/lighthouse/signup-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/signup-mobile.png)
error-pages|![lighthouse-results](TESTING-files/lighthouse/error-pages-desktop.png)|![lighthouse-mobile-results](TESTING-files/lighthouse/error-pages-mobile.png)


### DBeaver

The DBeaver database administration tool was used to verify the database schema and confirm the entity relationships exist as expected within the database and are correct for the project. The images below serve as a comparision between the database schema produced online and the actual database structure as reported by DBeaver.

<table width=90% align="center">
  <tr>
    <td>
      <p align="center">
        <strong>Manually Generated Schema</strong>
      </p>
    </td>
  </tr>
  <tr>
    <td>
    
  ![Schema](README-files/database-schema.png)
    </td>
  </tr>
    <tr>
    <td>
      <p align="center">
        <strong>DBeaver Entity Relationship Diagram</strong>
      </p>
    </td>
  </tr>
  <tr>
    <td>
    
![DBeaver](README-files/dbeaver-database-schema.png)
    </td>
  </tr>
</table>


<br><a href="#contents">BACK TO CONTENTS 🔼</a>

## Responsiveness Testing

### Browser Testing

The app was tested on Chrome, Firefox, Safari and Microsoft Edge. The appearance and responsiveness on each platform was satisfactory. The only exception was an anomaly observed on Safari, where the background colour of the status cells on emissions and emissions checks tables is applied after the page loads or the filter toggle switch is moved. The result is a stepped transition which looks out of place with other transitions in the app and can be seen in the gif below. This is a minor issue so will not be addressed in the first revision of the the app. It will be recorded as an [unresolved bug](https://github.com/johnamdickson/portfolio-project-4/issues/87) with a view to resolving in any future app updates.<br><br>
      <p align="center">
        ![responsiveness-results](TESTING-files/responsiveness-testing/browser-testing/safari-testing.gif)
      </p>


### Device Testing

**Device**|**Summary**|**Screenshot**|
|:-----:|:------|:-----:|
|iPhone 12 Pro Max <br><sup><sub>(Physical Device)</sub></sup>|The app's responsiveness was tested on a physical device and the results were satisfactory with only two minor issues. The first issue is as previously described in browser testing whereby the status cell background colour transition is stepped in appearance. This makes sense given iOS uses Safari as the main browser and any resolution will be considered during future updates. The second issue relates to the overlay text in emissions and emissions checks tables being difficult to read. The font-weight was changed to 400 to try and make the text stand out more.<br><br>The only other comment to make regarding responsiveness on small and extra-small screen sizes is that the emission and emission checks table columns will not fit within the screen width and must be scrolled to view. At 982 pixel width and below some of the columns are hidden, however hiding more on small and extra small screens would be detrimental to the communication of the pertinent data. There was no action taken to resolve this given it is obvious that the table needs to be scrolled in the x and y axis and also the app is designed more with tablets and laptops in mind. <br><br>All of the physical device test screenshots can be found [here.](TESTING-files/responsiveness-testing/device-testing/physical-device)|![device-testing](TESTING-files/responsiveness-testing/device-testing/physical-device/home-page-responsiveness.gif)|
|iPhone 6/7/8 <br><sup><sub>(Simulated Device)</sub></sup>| The responsiveness for these devices was simulated on Chrome Devtools and confirmed to be satisfactory.|![device-testing](TESTING-files/responsiveness-testing/device-testing/iphone-6-7-8-responsiveness.png)
|Samsung Galaxy S8+ <br><sup><sub>(Simulated Device)</sub></sup>| The responsiveness for this device was simulated on Chrome Devtools and confirmed to be satisfactory.|![device-testing](TESTING-files/responsiveness-testing/device-testing/galaxy-s8+-responsiveness.png)
|iPad<br><sup><sub>(Simulated Device)</sub></sup>| The responsiveness for this device was simulated on Chrome Devtools and confirmed to be satisfactory.|![device-testing](TESTING-files/responsiveness-testing/device-testing/ipad-responsiveness.png)
|iPad Pro<br><sup><sub>(Simulated Device)</sub></sup>| The responsiveness for this device was simulated on Chrome Devtools and confirmed to be satisfactory.|![device-testing](TESTING-files/responsiveness-testing/device-testing/ipad-pro-responsiveness.png)
|Desktop/Laptop Screen Width 1024<br><sup><sub>(Simulated Device)</sub></sup>| The responsiveness for this screensize was simulated on Chrome Devtools and confirmed to be satisfactory.|![device-testing](TESTING-files/responsiveness-testing/device-testing/laptop-1024-width.png)
|Desktop/Laptop Screen Width 1440<br><sup><sub>(Simulated Device)</sub></sup>| The responsiveness for this screensize was simulated on Chrome Devtools and confirmed to be satisfactory.|![device-testing](TESTING-files/responsiveness-testing/device-testing/laptop-1440-width.png)

<br><a href="#contents">BACK TO CONTENTS 🔼</a>

## Automated Testing

### Python Automated Testing
Automated testing was completed on the Emission class methods and the First Monday class methods using the built in Django TestCase class. The remainder of the Python based functionality was tested manually.
The individual test cases and results are shown in the table below:
**Test**|**Test Description**|**Result**                                              
|:-----|:------|:------|
|test_login_<br>verified_user| Checks if verified user created in set up can log in. Performs two assertions - checks user is verified and confirms if request has been successful.|<img src="TESTING-files/automated-testing/python-automated-testing/test-login-verfied.png" width="3000px">![device-testing](TESTING-files/automated-testing/python-automated-testing/test-login-verfied.gif)|
|test_non_<br>verified_user| Test non-verified user trying to access any page other than home, in this case emissions. Assert redirect should confirm an initial 302 error with a target status code of 200 once redirected to login page.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test_non_verified_user.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test_non_verified_user.gif)|
|test_adding_<br>emission_no_perms| Test base user trying to add an emission. Assert equal should confirm a 403 error indicating this operation IS NOT allowed for this particular user.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-adding-emission-with-perms.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-adding-emission-no-perms.gif)|
|test_adding_<br>emission_with_perms| Test admin_user with emission_admin rights trying to add an emission. Assert equal should confirma 200 status code indicating this operation IS allowed for this particular user.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-adding-emission-with-perms.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-adding-emission-with-perms.gif)|
|test_emission_<br>deletion_no_perms| Test admin_user trying to delete an emission. Assert equal should confirm a 403 status code indicating this operation IS NOT allowed for this particular user.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-emission-deletion-no-perms.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-emission-deletion-no-perms.gif)|
|test_emission_<br>deletion_with_perms| Test superuser trying to delete an emission. Assert equal should confirm a 200 status code indicating this operation IS allowed for this particular user.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-emission-deletion-with-perms.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-emission-deletion-with-perms.gif)|
|test_return_<br>datetime| Test that the first monday functions return a datetime object.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-emission-deletion-with-perms.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-return-datetime.gif)|
|test_first_monday_this_month| Use freeze gun to set datetime to 30/04/1978. This enables assertEqual to check against known first Monday of that particular month which was 03/04/1978.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-first-monday-this-month.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-first-monday-this-month.gif)|
|test_first_monday_next_month| Use freeze gun to set datetime to 30/04/1978. This enables assertEqual to check against known first Monday of the following month which was 01/05/1978.|![device-testing](TESTING-files/automated-testing/python-automated-testing/test-first-monday-next-month.png)![device-testing](TESTING-files/automated-testing/python-automated-testing/test-first-monday-next-month.gif)
### Javascript Automated Testing
Javascript testing was completed using Jest. The only function tested is the errorCountdown (used to create a countdown prior to automatic redirect on HTTP Status Code error pages) as all of the other functions would require a more complex set up to test their functionality fully. Given the time constraints of the project, the remaining functionality would be manually tested. Each test essentially checks for the same seven elements: 
1. Timer set to correct time on page load (60 seconds for 400 and 500 pages, 10 seconds 403 and 404).
2. A check to ensure that the timer is halfway through the countdown (30 or 5 seconds).
3. A check to ensure that the timer is completed and at 0.
4. A check to ensure an h2 exists.
5. A check to ensure the h2 has the correct error code string.
6. A check to ensure an h3 exists.
7. A check to ensure the h3 has the correct error description.<br>

The test running can be viewed [here.](TESTING-files/automated-testing/javascript-automated-testing/jest-tests.gif)<br>
The test results can be seen in the image below:
      <p align="center">
  ![automated-testing](TESTING-files/automated-testing/javascript-automated-testing/jest-tests.png)
      </p>



<br><a href="#contents">BACK TO CONTENTS 🔼</a>
## Manual Testing
Each feature and action on every page of the app was tested manually to verify the correct function of the site. The results are detailed per page or major feature.

### Home Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Navbar Menu Items Styling|The home navbar link should be a bolder font on page load to indicate where on the site the user is.|Load home page|The home navbar menu item is a bolder font than the others.|✅|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Carousel Control Buttons|Clicking on either of the carousel control buttons moves the carousel by one card|Left button and right button clicked|Carousel moved in the direction expected|✅|
|Carousel Indicators|Active carousel indicator will be more opaque than inactive indicators and active indicator will move depending on which card is in focus|Clicked carousel control button a number of times|Active carousel indicator changed depending on which card was in focus. The active indicator more opaque than inactive indiactors|✅|
|Carousel Card|On hover the carousel card background colour will alter and pointer appear|Moved cursor over the top of one of the carousel cards|Cursor changed to pointer and the background colour changed subtly to indicate the card is being hovered over|✅|
|Carousel Card|When clicking a card, a modal will appear with further information on the emission selected.|Selected a card and clicked|Modal appeared as expected|✅|
|Home Page Modal - Submit Check Button|When clicking on the submit emission check button it should redirect the user to the submit check page for the emission selected|Opened modal and clicked the submit emission check button|User is redirected to the submit check page for the correct emission|✅|
Home Page Modal - Content|The modal should display the following emission information: *Type*, *Description*, *Location*, *Check Status*, *Current Check Due*, *Last Checked*, *Next Check Due*.| Opened *FT-4100* modal by clicking on its carousel card. | Modal opened with all of the information expected.| ✅|
Home Page Modal - Emission Detail Button |When clicking on the go to emission detail page button it should redirect the user to the emission detail page for the emission selected|Opened modal and clicked the go to emission detail page button|User is redirected to the emission detail page for the correct emission|✅|
Home Page Modal - Go To All Emissions Page Button|When clicking on the go to all emissions page button it should redirect the user to the emissions page.|Opened modal and clicked the go to all emissions page button|User is redirected to the emissions page.|✅|
Home Page Modal - All Buttons(except close button)|When hovering over all buttons the font should change colour and the background opacity should reduce.|Hovered over all three of the home page modal buttons|The font changed colour and the background opacity reduced as expected|✅|
Home Page Modal - Close Button|When clicking on the close button, the modal should be dismissed.|Opened home page modal and clicked on the close button| Home page modal was dismissed|✅|
|Screen width <= 768px|h1, h4 and p elements comprising *Welcome to the emissions monitoring tool Your one stop shop for mangaging industrial emissions on your asset or facility.*  should be hidden from the user when screen width is 768px or below and reappear when screen width is above 768px. |Using Chrome Devtools, reduced the screen width to 768px then below before returning width to above 768px.| The h1, h4 and p elements were hidden from the user at 768px and below. They reappeared when the screen width was brought above 768px.|✅|


### Emissions Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Navbar Menu Items Styling|The emissions navbar link should be a bolder font on page load to indicate where on the site the user is.|Load emissions page|The emissions navbar menu item is a bolder font than the others.|✅|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Add New Emission Button - with permission to add an emission|Clicking the Add New Emission button should direct the user to the add emission page|Add New Emission button clicked| User is redirected to the add emission page|✅|
|Add New Emission Button - without permission to add an emission|Clicking the Add New Emission button should generate an alert informing the user that they do not have permissions to add a new emission|Add New Emission button clicked| An alert appears informing the user that they are not able to add an emission|✅|
|Add New Emission Button - User Dependant Styling|The Add Emission button should be styled to appropriately depending on user status. For superusers and emission admin users the button should be a white back ground with red font. For base emission users the button background and font colours opacity should be reduced to indicate it is not available.|Logged in as different users with the three permissions detailed previously| The button is styled as expected for all three different users.|✅|
|Add New Emission Button - User Dependant Hover Styling|For superusers and emission admin users the Add Emission button background font and border colour should all change on hover. For base emission users the button background and font colours should remain the same and a not-allowed cursor should appear.|Logged in as different users with the three permissions detailed previously and hovered over Add Emission button| The button is styled on hover as expected for all three different users. The not-allowed cursor appears when the base emission user hovers over button.|✅|
|Emissions Table Checks Complete Column|There should be coloured icons for different check statuses:<br><br><center>For checks complete&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="TESTING-files/manual-testing/checks-complete-icon.png" width="30px"></center><br><center>For checks outstanding&nbsp;&nbsp;&nbsp;&nbsp;<img src="TESTING-files/manual-testing/checks-outstanding-icon.png" width="30px"></center><br><center>For no checks completed&nbsp;<img src="TESTING-files/manual-testing/no-checks-completed-icon.png" width="30px"></center><br> | Opened emissions page and scrolled to emissions table.|The three different icons are present in the table for the correct check statuses|✅|
|Emission Table Status Column - Toggle Switch|On page load, only open emissions should displayed in the table.| Load page and scroll to emissions table|The open emissions are displayed and the closed ones are not displayed.|✅|
|Emission Table Status Column - Toggle Switch| The toggle switch in the `<th>` cell of the status column should filter Closed emissions and the switch subtitle should change accordingly to indicate what the column is displaying| Click the toggle switch to both available positions|The Closed emissions were filtered/not filtered depending on the switch position and the switch subtitle changed from *Showing Open Emissions* to *Showing Open & Closed Emissions*.|✅|
|Emission Table Status Column - Background Colour|There should be a different background colour depending on the status - green for Open and red for Closed|Opened emissions page and scrolled to emissions table.|The status dependant background colour is correct for the two different statuses|✅|
|Emission Table Row - Hover| When an emission table row is hovered over, the row background colour should darken slightly and the cursor should change to a pointer.|Move cursor onto an emission table row.| Row background colour and cursor changed as expected|✅|
|Emission Table Row - Closed Emission Row| When a closed emission row is visible, the *Next Check Due* and *Check Status* cells should not contain any text and opacity should be reduced.| Toggled table to indicate closed emissions| The *Next Check Due* and *Check Status* cells were empty and the opacity was reduced.|✅|
|Emission Table Row - Closed Emission| When an emission table row is clicked, a modal should open with the emission selected indicated in the modal title| Click on an emission table row| A modal appeared which had the emission selected in the modal title|✅|
|Emission Table - Scroll Buttons| There should be an up and down button for scrolling the table inside a set height container to the top and bottom respectively. When the table is scrolled to the top, the up button opacity should be reduced. Similarly when the table is scrolled to the bottom, the down button opacity should be reduced. In between the top and bottom position, both buttons should be fully opaque.|Pressed both up and down buttons and scrolled table manually between top and bottom of table.| The buttons opacity reduced dependant on the table scrollview being at the top or bottom. Both buttons were fully opaque between the top and bottom positions.|✅|
|Emissions Page Modal - Submit Check Button|When clicking on the submit emission check button it should redirect the user to the submit check page for the emission selected|Opened modal and clicked the submit emission check button|User is redirected to the submit check page for the correct emission|✅|
|Emissions Page Modal - Go To Emission Detail Page Button|When clicking on the go to emission detail page button it should redirect the user to the emission detail page for the emission selected|Opened modal and clicked the go to emission detail page button|User is redirected to the emission detail page for the correct emission|✅|
|Emissions Page Modal - All Available Buttons(except modal close button)|When hovering over all available buttons the font should change colour and the background opacity should reduce.|Hovered over both of the emissions page modal buttons|The font changed colour and the background opacity reduced as expected|✅|
|Emissions Page Modal - Modal Close Button|When clicking on the close button, the modal should be dismissed.|Opened emissions page modal and clicked on the close button| Emissions page modal was dismissed|✅|
|Screen width <= 982px|Location, Created On and Next Check Due columns should be hidden from the user when screen width is 982px or below and reappear when screen width is above 982px. |Using Chrome Devtools, reduced the screen width to 982px then below before returning width to above 982px.| The Location, Created On and Next Check Due columns were hidden from the user at 982px and below. The columns reappeared when the screen width was brought above 982px.|✅|
|Screen width <= 768px|Main image and all text in callout with the exception of *Easily add a new emission to the system* should be hidden from the user when screen width is 768px or below and reappear when screen width is above 768px. |Using Chrome Devtools, reduced the screen width to 768px then below before returning width to above 768px.| The image and text were hidden from the user, with *Easily add a new emission to the system* remaining at 768px and below. They reappeared when the screen width was brought above 768px.|✅|

### Checks Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Navbar Menu Items Styling|The checks navbar link should be a bolder font on page load to indicate where on the site the user is.|Load checks page|The checks navbar menu item is a bolder font than the others.|✅|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Search Bar|Typing a string into the search bar should filter the checks table based on the emission title or checked by.|Typed *P-9150* and *john_doe* into the Search Bar|The checks table filtered per the tag number and username entered.|✅|
|Checks Table Status Column - Toggle Switch|On page load, only open emission checks should be displayed in the table.| Load page and scroll to checks table|The open emission checks are displayed and the closed ones are not displayed.|✅|
|Checks Table Status Column - Toggle Switch| The toggle switch in the `<th>` cell of the status column should filter Closed emission checks and the switch subtitle should change accordingly to indicate what the column is displaying| Click the toggle switch to both available positions|The Closed emission checks were filtered/not filtered depending on the switch position and the switch subtitle changed from *Showing Open Emissions* to *Showing Open & Closed Emissions*.|✅|
|Checks Table Row - Hover| When a checks table row is hovered over, the row background colour should darken slightly and the cursor should change to a pointer.|Move cursor onto an checks table row.| Row background colour and cursor changed as expected|✅|
|Checks Table Row - Click| When checks table row is clicked, a modal should open with the emission selected indicated in the modal title.| Click on a check table row| A modal appeared which had the emission selected in the modal title|✅|
|Checks Table - Scroll Buttons| There should be an up and down button for scrolling the table inside a set height container to the top and bottom respectively. When the table is scrolled to the top, the up button opacity should be reduced. Similarly when the table is scrolled to the bottom, the down button opacity should be reduced. In between the top and bottom position, both buttons should be fully opaque.|Pressed both up and down buttons and scrolled table manually between top and bottom of table.| The buttons opacity reduced dependant on the table scrollview being at the top or bottom. Both buttons were fully opaque between the top and bottom positions.|✅|
Checks Page Modal - Content|The modal should display the following check information: *Check Completed On*, *Check Completed By* and *Comments*.| Opened check on *VN-1789* modal by clicking on the relevant checks table row. | Modal opened with all of the information expected.| ✅|
|Checks Page Modal - Submit Check Button|When clicking on the submit emission check button it should redirect the user to the submit check page for the emission selected|Opened modal and clicked the submit emission check button|User is redirected to the submit check page for the correct emission|✅|
|Checks Page Modal - Edit Check Button|When clicking on the edit emission check button it should redirect the user to the edit check page for the check selected|Opened modal and clicked the edit check button|User is redirected to the edit check page for the correct check|✅|
|Checks Page Modal - All Available Buttons(except modal close button)|When hovering over available buttons the font should change colour and the background opacity should reduce.|Hovered over all available checks page modal buttons|The font changed colour and the background opacity reduced as expected|✅|
|Checks Page Modal - Modal Close Button|When clicking on the close button, the modal should be dismissed.|Opened checks page modal and clicked on the close button| Checks page modal was dismissed|✅|
|Checks Page Modal - Delete Button (logged in as non-superuser)|Delete Button only be visible to a superuser.|Signed in as non-superuser and opened modal to check for delete button.|Delete button not visible|✅|
|Checks Page Modal - Delete Button(logged in as superuser)|Should be available to superuser and when clicked should display a confirmation dialogue box which when confirmed will delete the check from the database. On deletion the user should be notified and redirected to the checks page.|Signed in as superuser and clicked delete button and then clicked OK on confirmation dialogue.|Delete button visible to superuser and when clicked generated a confirmation dialogue. Clicking OK on dialogue deleted the check from DB and redirected user to the checks page where an alert notified the user that the check was successfully deleted|✅|
|Checks Page Modal - Edit Button(check submitted <24 hours ago)|Button should only be available to the person that submitted the check or a superuser. For any other user, the button should be styled as unavailable with the background and font opacity reduced. On clicking the button the user should be redirected to the edit check page for the check selected.|Logged in as user that did not submit check, then as superuser and then as user who did submit the check. Edit button then clicked.| Edit button styled unavailable for user that did not submit the check. Button is available for the superuser and user who did submit the check. The edit check page for the selected check was loaded when the button was clicked.|✅|
|Checks Page Modal - Edit Button(check submitted >24 hours ago)|Button should be unavailable for all users except the superuser. If user is not a superuser and clicks the button then they should be notified that they cannot edit the check after 24h hours| Logged in as user that did not submit the check, superuser and user who did submit the check. |Button was unavailable for all users with exception of the superuser. When the button was clicked by a non-superuser an alert was generated to inform the user that a check can only be edited for up to 24 hours after submission|✅|
|Checks Page Modal - Edit Button User Dependant Hover Styling|For superusers and the emission user who entered the check (within 24 hours) the Edit Emission Check button background font and border colour should all change on hover. For all other users and after 24 hours the button background and font colours should remain the same and a not-allowed cursor should appear.|Logged in as different users per criteria in expected outcome and hovered over Edit Emission Check button| The button is styled on hover as expected for all three different users. The not-allowed cursor appears when user that cannot edit the check hovers over the button.|✅|
|Screen width <= 982px|Comments column should be hidden from the user when screen width is 982px or below and reappear when screen width is above 982px. |Using Chrome Devtools, reduced the screen width to 982px then below before returning width to above 982px.| The comments column was hidden from the user at 982px and below. The column reappeared when the screen width was brought above 982px.|✅|

### Emission Details Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Facility Map|Google map should load zoomed into facility and a marker should animate into position at emission location|Navigated to emission detail page for *FT-4100*.| Map zoomed into facility and following a short delay a marker animated in at position of the emission location|✅|
|Facility Map - responsive zoom|Google map should load zoom should change to accomodate smaller screen widths. Zoom should adjust below 1200px and again at or below 768px. Map should return to zoom above 768px and at 1200px or above|Reduced screen width through 1200px to below 768px and then widened screen to original setting| Map zoom adjusted at the prescribed widths whilst reducing in increasing screen width|✅|
|Facility Map - heading|The Google map should load at a heading to frame the site faciility perpendicular with the map div frame, in this case 22°.|Checked site map with the [Google Maps page](https://www.google.com/maps/place/53%C2%B048'06.7%22N+9%C2%B033'26.4%22W/@53.80185,-9.5599149,17z/data=!3m1!4b1!4m4!3m3!8m2!3d53.80185!4d-9.55734?entry=ttu) on another tab centered the site facility| Confirmed that the heading has been applied to the site map on load.|✅|
|Map Marker|Clicking on the map marker should open an information window with the emissions title and image.|Click on marker within map.|An information window opens displaying the emission title and image.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Emission Detail Table - Status Dependant Data Display|The table should display different data depending on if the emission is open or closed|Navigated to closed emission *VN-5050* detail page and then open emission *FT-4100* detail page.| Both pages emission detail tables contain an image along with *Location*, *Type*, *Date Created*, *Description* and *Status* information. *VN-5050* emission detail table contains *Close Out Comments*, *Closed By* and *Close Out Date* data. *FT-4100* contains *Check Status*, *Last Checked*, *Current Check Due* and *Next Check Due* data.|✅|
|Emission Detail Table Status Cell|There should be a different background colour depending on the status - green for Open and red for Closed|Navigated to closed emission *VN-5050* detail page and then open emission *FT-4100* detail page.|The status dependant background colours were: VN-5050 status cell background red, FT-4100 status cell background green.|✅|
|Emission Detsil Table Row - Hover| When the emission detail table rows are hovered over, the row background colour should darken slightly and the cursor should change to a pointer.|Move cursor onto an emission detail table row.| Row background colour and cursor changed as expected|✅|
|Emission Detail Table Row - Click| When an emission detail table row is clicked, a modal should open with the emission selected indicated in the modal title| Click on an emission detail table row| A modal appeared which had the emission selected in the modal title|✅|
|Emissions Detail Page Modal - All Available Buttons(except modal close button)|When hovering over all available buttons the font should change colour and the background opacity should reduce.|Hovered over both of the emissions page modal buttons|The font changed colour and the background opacity reduced as expected|✅|
|Emission Detail Page Modal - Modal Close Button|When clicking on the close button, the modal should be dismissed.|Opened an emission detail page modal and clicked on the close button| Emission detail page modal was dismissed|✅|
|Emission Detail Page Modal - Submit Check Button|When clicking on the submit emission check button it should redirect the user to the submit check page for the emission|Opened modal and clicked the submit emission check button|User is redirected to the submit check page for the correct emission|✅|
|Emission Detail Page Modal - Close Emission Button(authorised users)|Button should only be availale to emission admin users and superusers. When clicking on the close emission button it should redirect the user to the close emission page for the emission|Opened modal as base emission user, emission admin user and superuser. Clicked the close emission button|Close button is not available to the base emission user but is available to the emission admin user and superuser. On click the user is redirected to the close emission page for the correct emission|✅|
|Emission Detail Page Modal - Close Emission Button(non-authorised users)|Button should be unavailable for all users. If unautorised user clicks the button then they should be notified that they do not have the necessary permissions to close an emission| Logged in as base emission user and clicked the close emission button.| An alert appeared informing the user that they do not have the necessary permissions to close an emission.|✅|
|Emission Detail Page Modal - Close Button(emission open)|When clicking on the close button, the modal should be dismissed.|Opened emission detail page modal and clicked on the close button| Emission detail page modal was dismissed|✅|
|Emission Detail Page Modal - Close Button|When clicking on the close button, the modal should be dismissed.|Opened emission detail page modal and clicked on the close button| Emission detail page modal was dismissed|✅|
Emission Detail Page Modal - Close Button User Dependant Hover Styling|For superusers and emission admin users the Close Emission button background font and border colour should all change on hover. For base users the button background and font colour should remain the same and a not-allowed cursor should appear.|Logged in as different users per criteria in expected outcome and hovered over Close Emission button| The button is styled on hover as expected for all three different users. The not-allowed cursor appears when user that cannot edit the check hovers over the button.|✅|
|Emission Detail Page Modal - Delete Emission Button (logged in as non-superuser)|Delete Button only be visible to a superuser.|Signed in as non-superuser and opened modal to check for delete button.|Delete button not visible|✅|
|Emission Detail Page Modal - Delete Emission Button(logged in as superuser)|Should be available to superuser and when clicked should display a confirmation dialogue box which when confirmed will delete the emission from the database. On deletion the user should be notified and then redirected to the emissions page.|Signed in as superuser and clicked delete button and then clicked OK on confirmation dialogue.|Delete button visible to superuser and when clicked generated a confirmation dialogue. Clicking OK on dialogue deleted the check from DB and redirected user to the emissions page where an alert notified the user that the emission was successfully xdeleted|✅|
|Screen width <= 982px - Open Emission|*Date Created* and *Next Check Due* data should be hidden from the user and go back button change to icon only when screen width is 982px or below and revert back when screen width is above 982px. |Using Chrome Devtools, reduced the screen width to 982px then below before returning width to above 982px.|*Date Created* and *Next Check Due* data was hidden from the user and the go back button changed to icon only at 982px and below. The column reappeared when the screen width was brought above 982px.|✅|
|Screen width <= 982px - Closed Emission|*Date Created* data should be hidden from the user when screen width is 982px or below and revert back when screen width is above 982px. |Using Chrome Devtools, reduced the screen width to 982px then below before returning width to above 982px.|*Date Created* data was hidden from the user at 982px and below. The column reappeared when the screen width was brought above 982px.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to an icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|

### Add Emission Page
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Add Emission - users with no permissions|If a base emission user types the url for adding an emission into the address bar a HTTP Status 403 code will be generated and the user should be presented with the site specific 403 error code page.|Logged in as base user *john_doe* and added */add-emission* to end of home page address and hit return|The 403 error code page was presented.|✅|
|Add Emission - users with permissions| If the user is an emission admin or superuser then they should be able to access the add emission page and add an emission to the database. The user should be able to enter the pertinent data and providing all is in order, add the emission to the database. Once confirmed, the user should be redirected to the emissions page and presented with an alert confirming that the emission has been added successfully.|Logged in as superuser and navigated to the add emission page. Completed the form and clicked submit.| The site returned to the emissions page and an alert was presented confirming that the emission had been succesfully created. Logged out of app and then logged back in as emission_admin user *jane_smith* performing the same operations as above and got the same results.|✅|
Add Emission - input fields|The user should not be able submit the form unless there is content in all of the input fields|Clicked the Add Emission button without entering any text into each input field in turn.|A warning popover appears each time over the empty the field.|✅|
Add Emission - image upload|The user should not be able submit the form unless an image file has been uploaded|Clicked the Add Emission button without uploading an image.|A warning popover appeared requesting user please select a file.|✅|
Add Emission - image upload|The user should not be able upload an image that is not of a specific range of formats|Tried to submit form with a gif uploaded as the image file.|Received an error alert with the text *Incorrect image format. Please upload jpg, jpeg, png, tiff, webp or bmp*.|✅|
Add Emission - latitude and longitude fields|The user should not be able submit the form if a non-numeric character is added to either the latitude or longitude input fields|Clicked the Add Emission button with the letter *e* in the latitude and then longitude fields.|In both instances a warning popover appeared requesting user enter a number.|✅|
Add Emission - latitude field| The number entered must be between -90 and 90. |Added the number 2000 into the input field and clicked the add emission button and then tried the same with the number -2000.|Received two warnings: *Value must be less than or equal to 90* and *Value must be greater than or equal to -90*|✅|
Add Emission - latitude field| The number entered must be between -180 and 180.| Added the number 2000 into the input field and clicked the add emission button and then tried the same with the number -2000.|Received two warnings: *Value must be less than or equal to 180* and *Value must be greater than or equal to -180*|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Add Emission Callout - Go Back and Add Emission Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and add emission buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|

### Close Emission Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Close Emission Page - Callout Title|The callout title should include the relevant emission title interpolated into the string|Clicked Close Emission button on emission detail page for *FT-4100* and then repeated the process for *P-9150*.|The close emission page loaded the first time and the callout title contained the text *FT-4100*. On the second time the title contained the text *P-9150*|✅|
|Close Emission - users with no permissions|If a base emission user types the url for closing an emission into the address bar a HTTP Status 403 code will be generated and the user should be presented with the site specific 403 error code page.|Logged in as base user *john_doe* and added */close-emission/p-9150* to end of home page address and hit return|The 403 error code page was presented.|✅|
|Close Emission - users with permissions| If the user is an emission admin or superuser then they should be able to access the close emission page and close out the emission. The user should be presented with a dialogue box to confirm that the emission is to be closed out. Once confirmed, the user should be redirected to the emissions page and presented with an alert confirming that the emission has been closed.|Logged in as superuser and clicked Close Emission button for *P-9150*. Confirmation dialogue appeared clicked OK| The site returned to the emissions page and an alert was presented confirming that the emission had been closed. Navigated to admin site and reopened *P-9150* and then logged out of app. Logged back in as emission_admin user *jane_smith* and performed the same operations as above (with the exception of accessing the admin site) and got the same results.|✅|
|Close Out Comments|The user should not be able submit the form unless there is content in the textfield box|Clicked the Close Emission button without entering any text into the close out comments textfield and then clicked OK in the resulting confirmation dialogue.|A warning popover appears requesting user fills in the field.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Close Emission Callout - Go Back and Close Emission Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and close emission buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|

### Add Check Page
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Add Check - users with no permissions|If a base emission user types the url for adding an emission into the address bar a HTTP Status 403 code will be generated and the user should be presented with the site specific 403 error code page.|Logged in as base user *john_doe* and added */add-emission* to end of home page address and hit return|The 403 error code page was presented.|✅|
|Add Check| All authorised users should be able to access the add check page and add a check to the database. The user should be able to enter the pertinent data and providing all is in order, add the check to the database. Once confirmed, the user should be redirected to the checks page and presented with an alert confirming that the emission has been added successfully.|Logged in as base emission user john_doe and navigated to the add check page for *FT-4100*. Completed the form and clicked submit.| The site returned to the checks page and an alert was presented confirming that the check had been succesfully created.|✅|
Add Check - comments field|The user should not be able submit the form unless there is content in the textfield box|Clicked the add check button without entering any text into the comments textfield.|A warning popover appears requesting user to fill in the field.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Add Check Callout - Go Back and Add Check Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and add check buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|

### Edit Check Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Edit Check Page - Callout Title|The callout title should include the relevant emission title interpolated into the string|Clicked Edit Check button on checks page for *VN-1789* check.|The edit check page loaded and the callout title contained the text *VN-1789*.|✅|
|Edit Check - users with no permissions|If a user without permissions (did not submit the check originally or check submitted more than 24 hours ago) types the url for editing acheck into the address bar a HTTP Status 403 code will be generated and the user should be presented with the site specific 403 error code page.|Selected a check that was submitted more than 24 hours ago and added */edit-check/vn-1789/109* to end of home page address and hit return|The 403 error code page was presented.|✅|
|Edit Check - users with permissions| If the user added the check less than 24 hours ago or is a superuser then they should be able to access the edit check page and edit the check on the database. The user should be presented with a dialogue box to confirm that the check is to be edited and the dialogue box should contain the Edit Comments. Once confirmed, the user should be redirected to the checks page and presented with an alert confirming that the emission has been edited.|Logged in as superuser filled in form and clicked Edit Check button for check on *VN-1789*. Confirmation dialogue appeared and clicked OK| The confirmation dialogue contained the edit comments and the site returned to the checks page. An alert was presented confirming that the check had been edited.|✅|
Edit Check - comments and status fields| The comments and status fields should match what is stored in the database.|Opened edit check page for a check on *VN-1789* and noted comments and status. Navigated to admin panel and checked status and comments for the check in question|Comments and status in the edit check form matched the admin panel.|✅|
|Edit Comments|The user should not be able submit the form unless there is content in the textfield box|Clicked the edit check button without entering any text into the edit comments textfield and then clicked OK in the resulting confirmation dialogue.|A warning popover appears requesting user fills in the field.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Edit Check Callout - Go Back and Edit Check Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and edit check buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|


### Login Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Navbar Menu - User Dependant Items|When there is no user logged in, there should only be two items in the navbar menu: *login* and *register*. When an emission user or emission admin user is logged in there should 4 menu items: *home*, *emissions*, *checks* and *logout*. When a superuser is logged in there should be the 4 menu items for other users plus an *admin* menu item.| Logged out user, then logged in as a base emission user, an emission admin user and a superuser.|For no user logged in two items are available in the navbar as expected. For superusers there are 5 items and for all other users 4 items.|✅|
Navbar Menu Items Styling|The login navbar link should be a bolder font on page load to indicate where on the site the user is.|Load login page|The login navbar menu item is a bolder font than the register item.|✅|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Sign in - authorised user|When the authorised user signs into the app they should be redirected to the home page and an alert generated welcoming them to the app.|Entered details for user *john_doe* and clicked Log In button|User was logged into the app, redirected to the home page and then an alert generated welcoming the user.|✅|
|Sign in - unauthorised user|When an unauthorised user tries to sign into the app they should received an error alert stating that the username and/or password are not correct.|Entered details for non-authorised user *ziggy_stardust* and clicked the log in button.|An error alert appeared stating that the username and/or password are not correct.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Log In Callout - Go Back and Log In Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and log in buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|
|Sign Up Link| Sign up text link in login callout should direct user to the sign up/register page.| Clicked on the sign up text link.|User is redirected to the sign up page.|✅|

### Signup Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Navbar Menu Items Styling|The register navbar link should be a bolder font on page load to indicate where on the site the user is.|Load signup page|The register navbar menu item is a bolder font than the login item.|✅|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Registration - user already registered| If a user tries to register a new user with a username that is already in use and error alert is generated informing the user.|Entered existing username *john_doe* into form and selected password before clicking the register button.| An error alert was generated telling the user that the username already exists.|✅|
|Registration - password too short|If user tries to register with a password less than 8 characters then an error alert should be generated informing the user.|Entered a new username *james_stewart_ and typed in a password less than 8 characters long.| An error alert was generated telling the user that the password is too short and it must contain at least 8 characters.|✅|
|Registration - passwords do not match|If user tries to register with the two different passwords then an error alert should be generated informing the user.|Entered a new username *james_stewart_ and typed in different passwords into the password and password(again) inputs.| An error alert was generated telling the user that they must type the same password each time.|✅|
|Registration - password entirely numeric|If user tries to register with a password that is entirely numeric then an error alert should be generated informing the user.|Entered a new username *james_stewart_ and typed in matching numerical passwords into the two password inputs.| An error alert was generated telling the user that the password is entirely numeric. There was also a error that the password is too common.|✅|
|Registration - password entirely numeric|If user tries to register with a password that is entirely numeric then an error alert should be generated informing the user.|Entered a new username *james_stewart_ and typed in matching numerical passwords into the two password inputs.| An error alert was generated telling the user that the password is entirely numeric. There was also a error that the password is too common.|✅|
|Registration - passwords to common|If user tries to register with a password that is deemed too common then an error alert should be generated informing the user.|Entered a new username *james_stewart* and typed in a series of common passwords: *qwertyuiop*, *password1* and *admin123*.| An error alert was generated telling the user that the password is too common.|✅|
Registration - password similar to username|If user tries to register with a password that is deemed too similar to the username then an error alert should be generated informing the user.|Entered a new username *james_stewart* and typed *jamesstewart* into the password inputs.| An error alert was generated telling the user that the password is too similar to the username.|✅|
Registration - successful registration|When a user successfully registers they shoud be automatically be assigned the emission user group permissions and they will be redirected to the homepage with an alert confirming they are registered.|Entered a new username *james_stewart* and typed in a password which conforms to the password requirements before clicking the Register button.| The user was redirected to the home page where an alert was generated informing them of succesful registration. Logged in as superuser and navigated to the admin panel and confirmed that user *james_stewart* had been successfully registered and was automatically added to the emission_user group.|✅|
|Sign Up Callout - Go Back and Register Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and register buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|
|Sign In Link| Sign in text link in sign up callout should direct user to the login page.| Clicked on the sign in text link.|User is redirected to the login page.|✅|

### Logout Page

 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Navbar Menu Items Styling|The logout navbar link should be a bolder font on page load to indicate where on the site the user is.|Load logoout page|The logout navbar menu item is a bolder font than the others.|✅|
|Site Logo|Clicking on logo will return user to the home page|Clicked on logo|Home page reloaded|✅|
|Sign out|When the currently logged in user signs out of the the app they should be redirected to the home page and an alert generated informing the user they have logged out and thanking them for using the app.|Accessed logout page and clicked *Log Out* button|User was logged out of the app, redirected to the home page and then an alert generated confirming log out and thanking user for using the app.|✅|
|Go Back Button|Clicking on the button should return the user to the previous page.|Click go back button.|Previous page loads.|✅|
|Log Out Callout - Go Back and Log Out Buttons|When hovering over both buttons the font should change colour and the background opacity should reduce.|Hovered over the go back and log out buttons|The font changed colour and the background opacity reduced as expected on both buttons.|✅|
|Screen width <= 992px - Go Back Button|The go back button should change to icon only when screen width is 992px or below and revert back when screen width is above 992px. |Using Chrome Devtools, reduced the screen width to 992px then below before returning width to above 992px.|The go back button changed to an icon only at 992px and below. The go back button text reappeared when the screen width was brought above 992px.|✅|

### 400 Error Page
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
400 Bad Request Page Set Up|The 400 error page should be presented when a bad request is returned|Simulate a 400 error by removing the hosting platform from the allowed hosts.|The 400 error page was returned when trying to access the site.|✅|
Automatic Redirect| There should be a message informing user they will be redirected automatically in 60 seconds. The time text should count down to 0 before attempting redirection to the homepage.|Initiated 400 error as described in page set up above and then reinstated hosting platform to allowed hosts before 60 second timeout and then waited 60 seconds.| The user was automatically redirected to the home page.|✅|
Go Back Button| The go back button should return the user to the home page.|Initiated 400 error as described in page set up above and then reinstated hosting platform to allowed hosts before pressing the Go Back button.|The user was returned to the homepage.|✅|

### 403 Error Page
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
403 Forbidden Page Set Up|The 403 error page should be presented when a user without permissions tries to access an area of the site that requires those permissions|Simulate a 403 error by logging in as base emission user *john_doe* and then typing */add-emission* at the end of the home page url.|The 403 error page was returned.|✅|
Automatic Redirect| There should be a message informing user they will be redirected automatically in 10 seconds. The time text should count down to 0 before attempting redirection to the homepage.|Initiated 403 error as described in page set up above and wait 10 seconds.| The user was automatically redirected to the home page.|✅|
Go Back Button| The go back button should return the user to the home page.|Initiated 403 error as described in page set up above and then pressed the go back button.|The user was returned to the homepage.|✅|

### 404 Error Page
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
404 Page Does Not Exist Page Set Up|The 404 error page should be presented when a user tries to access a page that does not exists|Simulate a 404 error by typing a typo */emisions* at the end of the home page url.|The 404 error page was returned.|✅|
Automatic Redirect| There should be a message informing user they will be redirected automatically in 10 seconds. The time text should count down to 0 before attempting redirection to the homepage.|Initiated 404 error as described in page set up above and wait 10 seconds.| The user was automatically redirected to the home page.|✅|
Go Back Button| The go back button should return the user to the home page.|Initiated 404 error as described in page set up above and then pressed the go back button.|The user was returned to the homepage.|✅|


### 500 Error Page
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
500 Server Error Page Set Up|The 500 error page should be presented when a server is returned|Simulate a 500 error by adding a property to emission model that has not been migrated to database.|The 500 error page was returned when trying to access the site.|✅|
Automatic Redirect| There should be a message informing user they will be redirected automatically in 60 seconds. The time text should count down to 0 before attempting redirection to the homepage.|Initiated 500 error as described in page set up above and then removed the unmigrated property from the emission model before 60 second timeout and then waited 60 seconds.| The user was automatically redirected to the home page.|✅|
Go Back Button| The go back button should return the user to the home page.|Initiated 500 error as described in page set up above and then removed the unmigrated property from the emission model before pressing the Go Back button.|The user was returned to the homepage.|✅|

### Footer
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Logged In User Feedback| The active user should be displayed in the footer when looged in.|Logged in as *john_doe*, *jane_smith* and then logged out completely.|For *john_doe* the footer displayed: *User: john_doe*. For *jane_smith* the footer displayed: *User: jane_smith*. When logged out completely the footer displayed: *no user logged in*.|✅|
Social Media Link|Clicking on the LinkedIn icon in the footer should open the app home page in a new tab|Clicked on the LinkedIn icon|A new tab opened directing the user to the LinkedIn home page|✅|
Social Media Link|On hover the LinkedIn icon should change colour|Moved cursor over the social media link|The LinkedIn icon changed colour to blue|✅|

### Alerts
 **Feature** | **Expected Outcome** | **Testing Performed** | **Testing Outcome** | **Result** |
|:-----|:------|:------|:-----|:------:|
Success Alert|When the user performs a positive action a success alert and message should be generated.|Logged in to the app|A success alert was generated with a message to the user confirming action.|✅|
Info Alert|When the user performs a non-positive action (such as deleting an emission check) an info alert and message should be generated.|Deleted an emission check from database using delete option on checks page table row|An info alert was generated with a message to the user confirming action.|✅|
Warning Alert|When the user tries to perfom an action which they do not have required permissions, a warning alert should be generated with information for the user.|Logged in as base user *john_doe* and tried to add an emission|A warning alert was generated with a message to the user informing them the reason why the action cannot be performed.|✅|
Error Alert|When the user inputs incorrect data (such as wrong password in the login page) an error alert should be generated detailing the error for the user.|Attempted to log in as a user not yet registered on the system.|An error alert was generated with a message to the user explaining the error.|✅|

<br><a href="#contents">BACK TO CONTENTS 🔼</a>

## Bugs
The were 32 recorded bugs encountered during the project. 30 were resolved and 2 remain unresolved. All of the bugs are summarised in the table below.

 **Bug** | **Description** | **Actions to Resolve** | **Outcome** |
|:-----|:------|:------|:-----|
|[Migration History Error](https://github.com/johnamdickson/portfolio-project-4/issues/43)|InconsistentMigrationHistory: Migration socialaccount.0001_initial is applied before its dependency sites.0001_initial on database ‘default'|Solution: Commented out ‘allauth.socialaccount’ in settings.py made migration successfully then uncommented before final migrate at which stage the migration was a success.|Resolved|
|[DB Relations Issue](https://github.com/johnamdickson/portfolio-project-4/issues/44)|Received numerous programming errors related to relations on DB not existing, despite performing migrations after changes.|Migrated to DB by specifying the app (monitoring_tool) before *make migrations* and *migrate* in CLI which resolved the issue.|Resolved|
|[Maps API Error on Deployment](https://github.com/johnamdickson/portfolio-project-4/issues/42)|After deploying to Heroku, an error appeared on the emission detail page map view. Issue with API not recognising the API Key.|Attempted numerous possible solutions as given in Stack Overflow with no success. Checked Slack but could not find anyone experiencing the same issue. What solved the issue was to simply regenerate the API Key and apply in the app.|Resolved|
|[Confirm action function stopped working](https://github.com/johnamdickson/portfolio-project-4/issues/47)|After setting edit check button click to confirmAction function it stopped working for previous inputs - close emission and delete check/emission. Issue occurred due to variable declaration for edit button in the function body before conditional logic. For other conditions the element does not exist and throws an error causing the function to break.|Moved declaration inside conditional logic associated with that particular element.|Resolved|
|[Update status function error](https://github.com/johnamdickson/portfolio-project-4/issues/48)|Console displaying error *Uncaught TypeError: Cannot read properties of null (reading 'innerText')*. Function being called before the element exists.|Added conditional logic to determine if the element exists.|Resolved|
|[Alert timeout error in console](https://github.com/johnamdickson/portfolio-project-4/issues/49)|Console displaying error *Uncaught TypeError: Cannot read properties of null (reading 'getAttribute')* which was related to the timeout function used to close bootstrap alert after 4 seconds|Added conditional logic to verify the element exists on the DOM before proceeding with function. This resolved the error.|Resolved|
|[Emission last checked update](https://github.com/johnamdickson/portfolio-project-4/issues/50)|When an individual check is completed all of the emissions last checked dates are updated.|Remove save comment from model (which was updating all emission objects) and instead update individual emission in the view form submit code.|Resolved|
|[Deployment error - module not found](https://github.com/johnamdickson/portfolio-project-4/issues/52)|Received error *ModuleNotFoundError: No module named 'dateutil' in Python* on Heroku build log.|Tried *pip freeze > requirements.txt* command but this did not pull across dateutil. Manually added to requirements.txt and issue resolved.|Resolved|
|[Map console errors](https://github.com/johnamdickson/portfolio-project-4/issues/59)|Two console errors *InvalidValueError: Map: Expected mapDiv of type HTMLElement but was passed null* and *Cannot read properties of undefined (reading 'setZoom')* related to Map API.|Created conditional logic to check if map div exists prior to continuing code.|Resolved|
|[Map marker info window error](https://github.com/johnamdickson/portfolio-project-4/issues/62)|When clicking the map marker in the emission detail page the expected behaviour of opening an info window did not happen.|Changed gmp-click event listener to click and the info window appeared.|Resolved|
|[Type error in console](https://github.com/johnamdickson/portfolio-project-4/issues/65)|Experienced console error *Uncaught TypeError: Assignment to constant variable.*|Changed errorSpan declaration from const to let in errorCountdown arrow function.|Resolved|
|[Server error non -null](https://github.com/johnamdickson/portfolio-project-4/issues/67)|Server returned an error stating last_checked property cannot be non-null.|Updated model for last_checked blank or null property to be true and added conditional logic to ensure last check exists before completing dependent logic on it.|Resolved|
|[Current check date not updating](https://github.com/johnamdickson/portfolio-project-4/issues/68)|Observed check due dates not updating when creating new emissions.|The queryset call for current check due did not have any arguments in it. Added calculated check due date as argument which resolved the error.|Resolved|
|[Closed emission detail table column issue](https://github.com/johnamdickson/portfolio-project-4/issues/71)|On closed emission in Emission Detail Page, when columns are hidden on small screen sizes there remains a gap in columns.|Added close out comments class and used hideElements function to change close out comment colspan from 2 to 1 on small screen size.|Resolved|
|[Testing DB Issue](https://github.com/johnamdickson/portfolio-project-4/issues/76)|Received the following error when trying to create a test *Got an error creating the test database: permission denied to create database* with a subsequent error once remedial action was taken to resolve *django.db.utils.OperationalError: no such table*.|At first, the solution was to use the Django sqllite database as testing from this solution:<br> *https://stackoverflow.com/questions/4650509/different-db-for-testing-in-django*<br>Once this was implemented the second error occurred and was resolved by commenting out views and urls before makemigrations and migrate calls and then performing again with code commented back in.|Resolved|
|[Cloudinary configuration for testing](https://github.com/johnamdickson/portfolio-project-4/issues/77)|Encountered error *ValueError: Must supply cloud_name in tag or in configuration testing* when running tests on Django testcase.|Added cloudinary configuration to test file which resolved problem but then created a security issue. To get around this I added a cloudinary config file and referenced this in git ignore. |Resolved|
|[Jest testing reference error.](https://github.com/johnamdickson/portfolio-project-4/issues/78)|During automated testing, encountered the following error: *[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "ReferenceError: google is not defined".] {code: 'ERR_UNHANDLED_REJECTION'}*|Spent a good deal of time trying to either ignore the problem or mock the google api in the test body. Resolved by adding the bootstrap loader code, normally in base html, at the top of the script.test file. |Resolved|
|[Jest testing jQuery issue.](https://github.com/johnamdickson/portfolio-project-4/issues/79)|Jest testing jQuery issue.|The issue affects jQuery function and appeared to be similar to one experienced on maps API however in this instance there is no option to add jQuery to the JS test file. Tried multiple different approaches with no resolution before successfully resolving using jest fake timers functions. |Resolved|
|[Emission Detail image error](https://github.com/johnamdickson/portfolio-project-4/issues/80)|Excessive emission detail image height on mobile device.|Changed table image rowspan to 2 for 982 size screens and below with description cell extending 4 columns. Set height of image td to 250px above 982 and 200px below, all of which resolved the error. |Resolved|
|[Emission Detail table Firefox formatting error](https://github.com/johnamdickson/portfolio-project-4/issues/81)|Emission detail table body rows overlapping table head on Firefox browser.|Moved bootstrap table class to col div above table which resolved the error. |Resolved|
|[Emission check delete alert stopped working](https://github.com/johnamdickson/portfolio-project-4/issues/83)|Alert is not appearing when a check is deleted resulting in no confirmation prior to the check being deleted.|The issue was caused as the emission title was added to button title string. The JS code was looking for string 'Delete Check'. Bug resolved by changing logic to check that the button title includes both delete AND check.|Resolved|
|[Check due calculation error](https://github.com/johnamdickson/portfolio-project-4/issues/84)|Observed bug on 1st December where the current and next check due dates are calculated, rendering the latest check expired. This should not happen until the first Monday date is reached.|Changed first Monday calculations into a class. Return next and current checks by invoking functions which calculate which dates to return based on if the current date is less than first Monday of the current month or not.|Resolved|
|[Uncaught reference error - Jest module export](https://github.com/johnamdickson/portfolio-project-4/issues/85)|The following error was returned in the devtools console: *Uncaught ReferenceError: module is not defined* The error is in reference to the Jest module export code.|Solution found on stack overflow to declare module as a var as described in the following Stack Overflow answer:<br>https://stackoverflow.com/questions/66349868/jest-unit-testing-module-export-error-in-browser-console|Resolved|
|[Check delete button not functioning](https://github.com/johnamdickson/portfolio-project-4/issues/86)|Check delete button presented with no text and the href set to '#'. After repair a further bug appeared where no alert presented to require confirmation from user.|The first issue was caused by the new event listener class confirm-action being added to the div's id. The second issue is again due to the new event listener which is called on load. As the modal divs are not present on load, the delete button was not assigned the listener. The listener was added in the emissionModal JS function which resolved the issue.|Resolved|
|[Safari background colour issue](https://github.com/johnamdickson/portfolio-project-4/issues/87)|During browser testing observed an anomaly on Safari, where the background colour of the status cells on emissions and emissions checks tables is applied after the page loads or the filter toggle switch is moved. The result is a stepped transition which looks out of place with other transitions in the app.|Due to the minor impact of this issue and time constraints it will remain unresolved in this version of the app.|Unresolved|
|[Carousel indicator overflow](https://github.com/johnamdickson/portfolio-project-4/issues/88)|During responsiveness testing, observed carousel indicators overflowing onto a second row.|Changed the indicator margin from `px` to `%` to size dependant on the parent element width which resolved the bug.|Resolved|
|[Home page callout position issue](https://github.com/johnamdickson/portfolio-project-4/issues/89)|During responsiveness testing on ipad observed that the home page callout position was incorrect, sitting underneath the navbar|Found that callout-hidden class was hiding content at 767 and below, one pixel below the iPad screenwidth. By changing this to 768 and below, the error was resolved.|Resolved|
|[Emission checks filter resetting status filter.](https://github.com/johnamdickson/portfolio-project-4/issues/90)|When searching the emission checks table the closed emissions become visible again and toggle switch remains in the *Showing Open Emissions*|Added statusFilter function call to the filterChecks function which resolved the issue.|Resolved|
|[Login redirect issue.](https://github.com/johnamdickson/portfolio-project-4/issues/91)|When no user is logged in and an incorrect url us added, the user is redirected to the sign in page but it is rendered without any inputs.|Issue centered around the Emission view class where a non-authorised user is redirected by the following code: `render(request, 'account/login.html')` . The code was changed to `redirect('/accounts/login')` and the form worked correctly thereafter.|Resolved|
|[Table scroll issue.](https://github.com/johnamdickson/portfolio-project-4/issues/92)|Issue identified during peer code review by @Stephen_5P where the table scroll stops user scrolling to page bottom on mobile device until the user taps outside of the element.|No action taken to resolve given stage of project however will be considered for future app updates.|Unresolved|
|[Checks table search and status switch position error .](https://github.com/johnamdickson/portfolio-project-4/issues/93) |If the checks table is filtered to show checks on open and closed emissions and a search is carried out by typing a valid username or emission title into the search bar the closed emissions are filtered out as expected but the toggle switch remains in the *Showing Open and Closed Emissions* state.|Added code to filterChecks function which sets the toggle switch to true position or *Showing Open Emissions* status.|Resolved|
|[Browser console TypeError.](https://github.com/johnamdickson/portfolio-project-4/issues/94)|Encountered the following error in browser console *Uncaught TypeError: Cannot set properties of null (setting 'checked')* caused by JS code trying to apply a setting to toggle switch element that does not exist on each page.|Added conditional logic to check that toggle switch exists before applying the code.|Resolved|