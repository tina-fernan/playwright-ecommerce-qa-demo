# Test Plan — Playwright E-commerce QA Suite

## 1. Overview
This test plan covers the automated testing strategy for the 
FakeStore API (https://fakestoreapi.com), including UI automation 
and API testing using Playwright.

---

## 2. Objectives
- Validate core e-commerce functionality (auth, products, cart)
- Ensure API responses meet expected schema and data contracts
- Verify UI flows work correctly across browsers
- Integrate automated tests into Jenkins CI/CD pipeline

---

## 3. Scope

### In Scope
- User authentication (login / logout)
- Product listing, filtering by category
- Single product retrieval
- Cart operations (create, update, delete)
- User profile retrieval
- API response validation (status, schema, performance)

### Out of Scope
- Payment processing
- Third-party integrations
- Load / performance testing
- Mobile native apps

---

## 4. Test Approach

| Type | Tool | Location |
|---|---|---|
| UI Automation | Playwright + TypeScript | tests/ui/ |
| API Testing | Playwright APIRequestContext | tests/api/ |
| Cross-browser | Chromium, Firefox | playwright.config.ts |
| CI/CD | Jenkins + GitHub Actions | Jenkinsfile |
| Reporting | HTML Report + JUnit XML | reports/ |

---

## 5. Test Environment

| Item | Detail |
|---|---|
| API Base URL | https://fakestoreapi.com |
| Browser | Chromium (primary), Firefox (secondary) |
| Node.js | v24.x |
| Playwright | Latest |
| OS | Windows |

---

## 6. Test Data Strategy
- Valid credentials stored in `.env` file
- Invalid/edge case data stored in `data/testData.json`
- No real personal data used — all test accounts

---

## 7. Entry & Exit Criteria

### Entry Criteria (when can we start testing?)
- Application URL is accessible
- Test environment is stable
- Test data is prepared
- Playwright is installed and configured

### Exit Criteria (when are we done?)
- All high priority test cases executed
- Zero critical or high severity bugs open
- Test report generated and reviewed
- Pipeline passing on Jenkins

---

## 8. Risk & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| FakeStore API goes down | High | Retry logic + skip flaky tests |
| Test data changes | Medium | Use dynamic data generation |
| Browser compatibility issue | Medium | Run on Chromium + Firefox |
| Slow API response | Low | Assert response time < 3s |

---

## 9. Deliverables
- [ ] Automated UI test suite
- [ ] Automated API test suite
- [ ] HTML test report
- [ ] JUnit XML report (for Jenkins)
- [ ] Jenkins pipeline
- [ ] This test plan
- [ ] Test case documentation
- [ ] Bug report template

---

## 10. Test IDs Convention

| Prefix | Meaning | Example |
|---|---|---|
| TC-AUTH | Authentication tests | TC-AUTH-001 |
| TC-PROD | Product tests | TC-PROD-001 |
| TC-CART | Cart tests | TC-CART-001 |
| TC-USER | User tests | TC-USER-001 |
| TC-API | Generic API tests | TC-API-001 |