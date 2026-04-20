# Playwright E-commerce QA Suite 🎭

GitHub Actions: https://github.com/tina-fernan/playwright-ecommerce-qa-demo/actions/workflows/playwright.yml/badge.svg

📊 Live Allure Report: https://tina-fernan.github.io/playwright-ecommerce-qa-demo

A complete end-to-end QA automation framework built with **Playwright** and **TypeScript**, 
covering UI automation, API testing, test reporting and CI/CD pipelines.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright + TypeScript | UI + API test automation |
| Page Object Model | Maintainable UI test architecture |
| Allure Report | Rich test reporting with charts |
| Jenkins + Docker | On-premise CI/CD pipeline |
| GitHub Actions | Cloud CI/CD pipeline |
| FakeStore API | E-commerce test target |

---

## Project Structure

playwright-ecommerce-qa-demo/
| Path | Type | Purpose |
|---|---|---|
| `tests/ui/login.spec.ts` | Test | UI login test cases |
| `tests/ui/products.spec.ts` | Test | UI products test cases |
| `tests/ui/products.fixture.spec.ts` | Test | UI tests using fixtures |
| `tests/api/auth.spec.ts` | Test | API authentication tests |
| `tests/api/products.spec.ts` | Test | API products CRUD tests |
| `tests/api/carts.spec.ts` | Test | API carts CRUD tests |
| `tests/api/users.spec.ts` | Test | API users tests |
| `pages/LoginPage.ts` | Page Object | Login page selectors and actions |
| `pages/ProductsPage.ts` | Page Object | Products page selectors and actions |
| `fixtures/testFixtures.ts` | Fixture | Reusable authenticated session setup |
| `data/testData.json` | Data | Centralised test data and edge cases |
| `utils/helpers.ts` | Utility | Random data, validation, wait helpers |
| `docs/TEST_PLAN.md` | Doc | Test plan — scope, approach, risks |
| `docs/TEST_CASES.md` | Doc | All test cases with IDs and priority |
| `Jenkinsfile` | CI/CD | Jenkins declarative pipeline |
| `playwright.config.ts` | Config | Browsers, reporters, timeouts |
| `index.html` | UI | Local e-commerce app for UI testing |
| `.github/workflows/playwright.yml` | CI/CD | GitHub Actions cloud pipeline |
| `.env.example` | Config | Environment variables template |

---

## Test Coverage

| Suite | Tests | Type |
|---|---|---|
| Authentication | 5 | API |
| Products API | 11 | API |
| Carts API | 6 | API |
| Users API | 7 | API |
| Login UI | 8 | UI |
| Products UI | 9 | UI |
| Products Fixtures | 4 | UI |
| **Total** | **50+** | **API + UI** |

---

## Test Design

### API Testing
- Status code validation
- Schema validation — every field checked
- Data type assertions
- Response time performance checks
- CRUD operations — GET, POST, PUT, DELETE
- Allure severity labels — critical, normal, minor

### UI Testing
- Page Object Model — selectors separated from tests
- data-testid attributes for stable selectors
- Happy path + negative + edge case coverage
- Cross-browser — Chromium + Firefox
- Fixtures for reusable authenticated sessions

---

## Quick Start

### Prerequisites
- Node.js 24+
- Git

### install
```bash
cd playwright-ecommerce-qa-demo
npm install
npx playwright install
```

### Configure environment
```bash
cp .env.example .env
# Add your credentials to .env
```

###  Run tests
```bash
# All tests
npm test

# API tests only
npm run test:api

# UI tests only  
npm run test:ui

# See browser automation
npm run test:headed
```

### View reports
```bash
# Playwright HTML report
npm run test:report

# Allure report
npx allure serve allure-results
```

---

## CI/CD

### Jenkins (local Docker)
```bash
# Start Jenkins
docker run -d -p 8080:8080 --name jenkins \
  -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts

# Open Jenkins
http://localhost:8080
```

Pipeline stages:
1. Checkout — pull from GitHub
2. Install — npm ci + Playwright browsers
3. API Tests — 29 tests with JUnit report
4. UI Tests — Chromium automation
5. Reports — Playwright HTML + Allure

### GitHub Actions
Runs automatically on every push to `main`.
See `.github/workflows/playwright.yml`

---

## Test Reports

| Report | Command | Best for |
|---|---|---|
| Playwright HTML | `npm run test:report` | Developers |
| Allure | `npx allure serve allure-results` | Managers |
| JUnit XML | Auto-generated | Jenkins |

---

## Documentation

- [Test Plan](docs/TEST_PLAN.md) — scope, approach, risks
- [Test Cases](docs/TEST_CASES.md) — all test cases with IDs

---

## Author

**Tina Fernandes**  
QA Engineer / Test Automation Engineer  
[GitHub] https://github.com/tina-fernan · 