
## Testing

Happy Carpenter employs a comprehensive testing strategy to ensure reliability and functionality across the application.

### Manual Testing

Extensive manual testing has been conducted throughout the development process. This includes:

- Cross-browser testing on Chrome, Firefox, Safari, and Edge
- Responsive design testing on various devices and screen sizes
- User flow testing to ensure smooth navigation and functionality
- Form validation testing
- CRUD operations testing for posts, comments, and ads

### Automated Testing

We use Jest and React Testing Library for automated testing. To run the tests: npm test

This command launches the test runner in interactive watch mode.

#### Key Areas Tested

1. **Component Rendering**: Ensure components render correctly with and without props
2. **User Interactions**: Test user interactions like clicks, form submissions
3. **API Integrations**: Mock API calls to test data fetching and state updates
4. **Routing**: Verify correct routing behavior
5. **State Management**: Test state changes and effects

### Accessibility Testing

- We use the WAVE (Web Accessibility Evaluation Tool) to check for accessibility issues
- Manual keyboard navigation testing is performed to ensure all interactive elements are accessible

### Performance Testing

- Google Lighthouse is used to assess performance, accessibility, best practices, and SEO

### Continuous Integration

- GitHub Actions are set up to run tests automatically on each push and pull request

## Known Issues

As of the latest update, the following issues are known and being addressed:

1. **Image Upload Delay**: There's occasionally a delay when uploading larger images. We're working on optimizing this process.

2. **Comment Pagination**: When a post has more than 50 comments, older comments may not load properly. A fix is in progress.

3. **Search Functionality Limitation**: The search feature currently doesn't support special characters. This will be expanded in a future update.

4. **Profile Picture Cropping**: In some cases, profile pictures may not crop consistently across different devices. We're working on a standardized cropping solution.

5. **Sign-In Page Refresh Required**: After signing in, the user has to refresh the page to see their signed-in home page. We're working on fixing this to provide a seamless sign-in experience.

We appreciate your patience as we work to resolve these issues. If you encounter any problems not listed here, please report them through our [Issue Tracker](link-to-issue-tracker) or contact our support team.

### Future Test Improvements

- Implement end-to-end testing using Cypress
- Increase unit test coverage to at least 80%
- Add more comprehensive accessibility tests

To contribute to testing or report issues, please see our [Contributing Guidelines](CONTRIBUTING.md).

