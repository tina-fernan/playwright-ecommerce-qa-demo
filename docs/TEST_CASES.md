# Test Cases — Playwright E-commerce QA Suite

---

## Authentication

| ID | Title | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-AUTH-001 | Login with valid credentials | POST /auth/login with valid username + password | Returns 200 + token string | High |
| TC-AUTH-002 | Login with invalid password | POST /auth/login with wrong password | Returns 401 or error message | High |
| TC-AUTH-003 | Login with empty username | POST /auth/login with empty username | Returns validation error | High |
| TC-AUTH-004 | Login with empty password | POST /auth/login with empty password | Returns validation error | High |
| TC-AUTH-005 | Token is returned as string | POST /auth/login with valid creds | token field exists and is a string | Medium |

---

## Products

| ID | Title | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-PROD-001 | Get all products | GET /products | Returns 200 + array of 20 products | High |
| TC-PROD-002 | Get single product | GET /products/1 | Returns 200 + correct product object | High |
| TC-PROD-003 | Get invalid product | GET /products/9999 | Returns 404 or empty | High |
| TC-PROD-004 | Product schema is valid | GET /products/1 | Has id, title, price, category, image fields | High |
| TC-PROD-005 | Price is a number | GET /products/1 | price field is numeric, not string | Medium |
| TC-PROD-006 | Get products by category | GET /products/category/electronics | Returns only electronics products | Medium |
| TC-PROD-007 | Get all categories | GET /products/categories | Returns array of category strings | Medium |
| TC-PROD-008 | Limit products result | GET /products?limit=5 | Returns exactly 5 products | Medium |
| TC-PROD-009 | Create a product | POST /products with valid body | Returns 201 + new product with id | High |
| TC-PROD-010 | Update a product | PUT /products/1 with new data | Returns 200 + updated product | High |
| TC-PROD-011 | Delete a product | DELETE /products/1 | Returns 200 + deleted product | High |
| TC-PROD-012 | Response time under 3s | GET /products | Response received within 3000ms | Medium |

---

## Cart

| ID | Title | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-CART-001 | Get all carts | GET /carts | Returns 200 + array of carts | High |
| TC-CART-002 | Get single cart | GET /carts/1 | Returns 200 + cart with products array | High |
| TC-CART-003 | Cart has correct schema | GET /carts/1 | Has id, userId, date, products fields | High |
| TC-CART-004 | Create a cart | POST /carts with valid body | Returns 200 + new cart with id | High |
| TC-CART-005 | Update a cart | PUT /carts/1 with new products | Returns 200 + updated cart | Medium |
| TC-CART-006 | Delete a cart | DELETE /carts/1 | Returns 200 + deleted cart | Medium |

---

## Users

| ID | Title | Steps | Expected Result | Priority |
|---|---|---|---|---|
| TC-USER-001 | Get all users | GET /users | Returns 200 + array of users | High |
| TC-USER-002 | Get single user | GET /users/1 | Returns 200 + user object | High |
| TC-USER-003 | User schema is valid | GET /users/1 | Has id, email, username, name, address | High |
| TC-USER-004 | Get invalid user | GET /users/9999 | Returns 404 or null | Medium |

---

## Bug Report Template

| Field | Description |
|---|---|
| Bug ID | BUG-001 |
| Title | Short descriptive title |
| Severity | Critical / High / Medium / Low |
| Priority | High / Medium / Low |
| Environment | OS, Browser, Node version |
| Steps to Reproduce | 1. Go to... 2. Click... 3. See... |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Screenshot/Log | Attach file or paste log |
| Status | Open / In Progress / Fixed / Closed |