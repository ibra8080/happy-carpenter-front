# Testing

> [!NOTE]  
> Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Page | Screenshot | Notes |
| ---  | --- | --- |
| Home  | ![screenshot](src/assets/documentation/validation/html_home.png) | |
| Profile  | ![screenshot](src/assets/documentation/validation/html_profile.png) | |

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.

| Page  | Screenshot | Notes |
| ---  | --- | --- |
| Home | ![screenshot](src/assets/documentation/validation/css_home.png) | |
| Profile | ![screenshot](src/assets/documentation/validation/css_profile.png) | |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Home | profile | Posts  | Note
| --- | --- | --- | --- | --- |
| Chrome | ![screenshot](src/assets/documentation/browsers/home_chrome.png) | ![screenshot](src/assets/documentation/browsers/profile_chrome.png) | ![screenshot](src/assets/documentation/browsers/posts_chrome.png)  | Works as expected |
| Firefox | ![screenshot](src/assets/documentation/browsers/home_fire.png) | ![screenshot](src/assets/documentation/browsers/profile_fire.png) | ![screenshot](src/assets/documentation/browsers/posts_fire.png) | Works as expected |
| Safari | ![screenshot](src/assets/documentation/browsers/home_safari.png) | ![screenshot](src/assets/documentation/browsers/profile_safari.png) | ![screenshot](src/assets/documentation/browsers/posts_safari.png) | Works as expected |

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Home | Profile | Posts | Notes |
| --- | --- | --- | --- | --- |
| Mobile (DevTools) | ![screenshot](src/assets/documentation/responsiveness/mob_h.png) | ![screenshot](src/assets/documentation/responsiveness/mob_pr.png) | ![screenshot](src/assets/documentation/responsiveness/mob_po.png) | Works as expected |
| Tablet (DevTools) | ![screenshot](src/assets/documentation/responsiveness/tab_h.png)  | ![screenshot](src/assets/documentation/responsiveness/tab_pr.png) | ![screenshot](src/assets/documentation/responsiveness/tab_po.png) | Works as expected |
| Desktop | ![screenshot](src/assets/documentation/browsers/home_chrome.png) | ![screenshot](src/assets/documentation/browsers/profile_chrome.png) | ![screenshot](src/assets/documentation/browsers/posts_chrome.png) | Works as expected |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check accessibility.

| Page | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Home | ![screenshot](src/assets/documentation/lighthouse/lighthouse_h_m.png) | ![screenshot](src/assets/documentation/lighthouse/lighthouse_h_d.png) | Some minor warnings |
| Profile | ![screenshot](src/assets/documentation/lighthouse/lighthouse_pr_m.png) | ![screenshot](src/assets/documentation/lighthouse/lighthouse_pr_d.png) | Slow response time due to large images |

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page | Expectation | Test | Result | Fix | Screenshot |
| --- | --- | --- | --- | --- | --- |
| Sign in | | | | | |
| | Users should not be able to submit an empty form | Attempted to submit form with empty fields | Form submission was prevented and error messages were displayed | Test concluded and passed | ![screenshot](src/assets/documentation/features/def_in_balnk.png) |
| | Users should see an error message for incorrect credentials | Entered incorrect username/password | An error message was displayed indicating invalid credentials | Test concluded and passed | ![screenshot](src/assets/documentation/features/def_in_wrong.png) |
| Sign up | | | | | |
| | Users should not be able to sign up with a username that already exists | Attempted to create an account with an existing username | An error message was displayed indicating the username is taken | Test concluded and passed | ![screenshot](src/assets/documentation/features/def_up_same.png) |
| | Passwords should be required to match | Entered mismatching passwords in the password and confirm password fields | An error message was displayed indicating passwords do not match | Test concluded and passed | ![screenshot](src/assets/documentation/features/def_up_pass.png) |
| Create Post | | | | | |
| | Users should not be able to create a post with an image larger than 2 MB| Attempted to submit a post with an larg image | Form submission was prevented and an error message was displayed | Test concluded and passed | ![screenshot](src/assets/documentation/features/def_larg_img.png) |


## User Story Testing

| User Story | Screenshot |
| --- | --- |
| As a new site user, I want to register for an account, so that I can access the platform's features. | ![screenshot](src/assets/documentation/features/up.png) |
| As a returning site user, I want to log in to my account, so that I can access my personalized content and interactions. | ![screenshot](src/assets/documentation/features/in.png) |
| As a user, I want to create a new post with a photo and description, so that I can share my woodworking projects with the community. | ![screenshot](src/assets/documentation/features/add.png) |
| As a user, I want to view the details of a specific post, so that I can get more information about a project and engage with it. | ![screenshot](src/assets/documentation/features/dpost.png) |
| As a user, I want to like posts to show my appreciation for other users' work. | ![screenshot](src/assets/documentation/features/like_com.png) |
| As a logged-in user, I want to add comments to a post, so that I can share my thoughts and engage in discussions about the projects. | ![screenshot](src/assets/documentation/features/like_com.png) |

## Bugs

- JS Uncaught ReferenceError: `foobar` is undefined/not defined

    ![screenshot](documentation/bugs/bug01.png)

    - To fix this, I _____________________.

- JS `'let'` or `'const'` or `'template literal syntax'` or `'arrow function syntax (=>)'` is available in ES6 (use `'esversion: 11'`) or Mozilla JS extensions (use moz).

    ![screenshot](documentation/bugs/bug02.png)

    - To fix this, I _____________________.

- Python `'ModuleNotFoundError'` when trying to import module from imported package

    ![screenshot](documentation/bugs/bug03.png)

    - To fix this, I _____________________.

- Django `TemplateDoesNotExist` at /appname/path appname/template_name.html

    ![screenshot](documentation/bugs/bug04.png)

    - To fix this, I _____________________.

- Python `E501 line too long` (93 > 79 characters)

    ![screenshot](documentation/bugs/bug04.png)

    - To fix this, I _____________________.

### GitHub **Issues**

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

An improved way to manage bugs is to use the built-in **Issues** tracker on your GitHub repository.
To access your Issues, click on the "Issues" tab at the top of your repository.
Alternatively, use this link: https://github.com/ibra8080/happycarpenter/issues

If using the Issues tracker for your bug management, you can simplify the documentation process.
Issues allow you to directly paste screenshots into the issue without having to first save the screenshot locally,
then uploading into your project.

You can add labels to your issues (`bug`), assign yourself as the owner, and add comments/updates as you progress with fixing the issue(s).

Once you've sorted the issue, you should then "Close" it.

When showcasing your bug tracking for assessment, you can use the following format:

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

**Fixed Bugs**

[![GitHub issue custom search](https://img.shields.io/github/issues-search?query=repo%3Aibra8080%2Fhappycarpenter%20label%3Abug&label=bugs)](https://github.com/ibra8080/happycarpenter/issues?q=is%3Aissue+is%3Aclosed+label%3Abug)

All previously closed/fixed bugs can be tracked [here](https://github.com/ibra8080/happycarpenter/issues?q=is%3Aissue+is%3Aclosed).

| Bug | Status |
| --- | --- |
| [JS Uncaught ReferenceError: `foobar` is undefined/not defined](https://github.com/ibra8080/happycarpenter/issues/1) | Closed |
| [Python `'ModuleNotFoundError'` when trying to import module from imported package](https://github.com/ibra8080/happycarpenter/issues/2) | Closed |
| [Django `TemplateDoesNotExist` at /appname/path appname/template_name.html](https://github.com/ibra8080/happycarpenter/issues/3) | Closed |

**Open Issues**

[![GitHub issues](https://img.shields.io/github/issues/ibra8080/happycarpenter)](https://github.com/ibra8080/happycarpenter/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/ibra8080/happycarpenter)](https://github.com/ibra8080/happycarpenter/issues?q=is%3Aissue+is%3Aclosed)

Any remaining open issues can be tracked [here](https://github.com/ibra8080/happycarpenter/issues).

| Bug | Status |
| --- | --- |
| [JS `'let'` or `'const'` or `'template literal syntax'` or `'arrow function syntax (=>)'` is available in ES6 (use `'esversion: 11'`) or Mozilla JS extensions (use moz).](https://github.com/ibra8080/happycarpenter/issues/4) | Open |
| [Python `E501 line too long` (93 > 79 characters)](https://github.com/ibra8080/happycarpenter/issues/5) | Open |

## Unfixed Bugs

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

You will need to mention unfixed bugs and why they were not fixed.
This section should include shortcomings of the frameworks or technologies used.
Although time can be a big variable to consider, paucity of time and difficulty understanding
implementation is not a valid reason to leave bugs unfixed.

If you've identified any unfixed bugs, no matter how small, be sure to list them here.
It's better to be honest and list them, because if it's not documented and an assessor finds the issue,
they need to know whether or not you're aware of them as well, and why you've not corrected/fixed them.

Some examples:

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

- On devices smaller than 375px, the page starts to have `overflow-x` scrolling.

    ![screenshot](documentation/bugs/unfixed-bug01.png)

    - Attempted fix: I tried to add additional media queries to handle this, but things started becoming too small to read.

- For PP3, when using a helper `clear()` function, any text above the height of the terminal does not clear, and remains when you scroll up.

    ![screenshot](documentation/bugs/unfixed-bug02.png)

    - Attempted fix: I tried to adjust the terminal size, but it only resizes the actual terminal, not the allowable area for text.

- When validating HTML with a semantic `section` element, the validator warns about lacking a header `h2-h6`. This is acceptable.

    ![screenshot](documentation/bugs/unfixed-bug03.png)

    - Attempted fix: this is a known warning and acceptable, and my section doesn't require a header since it's dynamically added via JS.

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-START OF NOTES (to be deleted)

If you legitimately cannot find any unfixed bugs or warnings, then use the following sentence:

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑-END OF NOTES (to be deleted)

> [!NOTE]  
> There are no remaining bugs that I am aware of.
