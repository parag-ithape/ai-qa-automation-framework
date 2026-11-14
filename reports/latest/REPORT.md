# 🤖 AI QA Pipeline — Latest Results

_Generated: 2026-11-14T14:19:10.998Z_

## 📊 Test Case Summary

| Total | Smoke | Regression | High Priority |
|:-----:|:-----:|:----------:|:-------------:|
| **12** | 4 | 12 | 7 |

### By module

| Module | Test cases |
|--------|:----------:|
| Authentication | 2 |
| Product Listing | 3 |
| Cart | 3 |
| Checkout | 4 |

## 🧪 Generated Test Cases

| ID | Module | Title | Type | Priority | Severity | Tags |
|----|--------|-------|------|----------|----------|------|
| TC_001 | Authentication | User logs in with valid credentials | Positive | High | Critical | smoke, regression |
| TC_002 | Authentication | User logs in with invalid credentials | Negative | High | Critical | regression |
| TC_003 | Product Listing | View all available products | Positive | Medium | Major | smoke, regression |
| TC_004 | Product Listing | Sort products by name | Positive | Medium | Major | regression |
| TC_005 | Product Listing | Filter products | Positive | Medium | Major | regression |
| TC_006 | Cart | Add item to cart | Positive | High | Critical | smoke, regression |
| TC_007 | Cart | Remove item from cart | Positive | High | Critical | regression |
| TC_008 | Cart | View cart details | Positive | Medium | Major | regression |
| TC_009 | Checkout | Enter shipping information | Positive | High | Critical | regression |
| TC_010 | Checkout | Validate postal code format | Negative | High | Critical | regression |
| TC_011 | Checkout | Review order summary | Positive | Medium | Major | regression |
| TC_012 | Checkout | Place order | Positive | High | Critical | smoke, regression |

### Test case details

<details><summary><b>TC_001</b> — User logs in with valid credentials</summary>

**Module:** Authentication ›   
**Priority / Severity:** High / Critical

**Preconditions**

_None_

**Test data**

```json
{
  "username": "standard_user",
  "password": "secret_sauce"
}
```

**Steps**

1. Navigate to login page
2. Enter username
3. Enter password
4. Click login button

**Expected result:** User is redirected to the product listing page.

</details>

<details><summary><b>TC_002</b> — User logs in with invalid credentials</summary>

**Module:** Authentication ›   
**Priority / Severity:** High / Critical

**Preconditions**

_None_

**Test data**

```json
{
  "username": "invalid_user",
  "password": "wrong_password"
}
```

**Steps**

1. Navigate to login page
2. Enter invalid username
3. Enter invalid password
4. Click login button

**Expected result:** Error message is displayed indicating invalid credentials.

</details>

<details><summary><b>TC_003</b> — View all available products</summary>

**Module:** Product Listing › View all products  
**Priority / Severity:** Medium / Major

**Preconditions**

- User must be logged in

**Steps**

1. Go to product listing page

**Expected result:** All products are displayed in the list.

</details>

<details><summary><b>TC_004</b> — Sort products by name</summary>

**Module:** Product Listing › Sort products  
**Priority / Severity:** Medium / Major

**Preconditions**

- User must be logged in
- Products are listed

**Steps**

1. Select sort option by name
2. View sorted product list

**Expected result:** Products are displayed in alphabetical order.

</details>

<details><summary><b>TC_005</b> — Filter products</summary>

**Module:** Product Listing › Filter products  
**Priority / Severity:** Medium / Major

**Preconditions**

- User must be logged in

**Test data**

```json
{
  "filterCriteria": "price"
}
```

**Steps**

1. Select filter by price
2. View filtered product list

**Expected result:** Products are displayed according to price criteria.

</details>

<details><summary><b>TC_006</b> — Add item to cart</summary>

**Module:** Cart › Add item to cart  
**Priority / Severity:** High / Critical

**Preconditions**

- User must be logged in
- Products are listed

**Test data**

```json
{
  "productId": "1"
}
```

**Steps**

1. Select a product
2. Click 'Add to cart'

**Expected result:** Item is added to the cart successfully.

</details>

<details><summary><b>TC_007</b> — Remove item from cart</summary>

**Module:** Cart › Remove item from cart  
**Priority / Severity:** High / Critical

**Preconditions**

- User has items in the cart

**Test data**

```json
{
  "productId": "1"
}
```

**Steps**

1. Go to cart page
2. Select an item
3. Click 'Remove'

**Expected result:** Item is removed from the cart successfully.

</details>

<details><summary><b>TC_008</b> — View cart details</summary>

**Module:** Cart › View cart details  
**Priority / Severity:** Medium / Major

**Preconditions**

- User has items in the cart

**Steps**

1. Go to cart page

**Expected result:** User can see details of items in the cart.

</details>

<details><summary><b>TC_009</b> — Enter shipping information</summary>

**Module:** Checkout › Enter shipping information  
**Priority / Severity:** High / Critical

**Preconditions**

- User must be logged in
- User has items in the cart

**Test data**

```json
{
  "shippingAddress": "123 Main St",
  "city": "Anytown",
  "postalCode": "12345"
}
```

**Steps**

1. Go to checkout page
2. Enter shipping information
3. Click next

**Expected result:** Shipping information is accepted.

</details>

<details><summary><b>TC_010</b> — Validate postal code format</summary>

**Module:** Checkout › Validate postal code format  
**Priority / Severity:** High / Critical

**Preconditions**

- User must be logged in
- User has items in the cart

**Test data**

```json
{
  "postalCode": "ABCDE"
}
```

**Steps**

1. Go to checkout page
2. Enter invalid postal code
3. Click next

**Expected result:** Error message is displayed indicating postal code format is invalid.

</details>

<details><summary><b>TC_011</b> — Review order summary</summary>

**Module:** Checkout › Review order summary  
**Priority / Severity:** Medium / Major

**Preconditions**

- User must be logged in
- User has completed shipping information

**Steps**

1. Go to order summary page

**Expected result:** Order summary is displayed with the correct details.

</details>

<details><summary><b>TC_012</b> — Place order</summary>

**Module:** Checkout › Place order  
**Priority / Severity:** High / Critical

**Preconditions**

- User must be logged in
- User has completed all previous steps

**Steps**

1. Review order summary
2. Click 'Place Order'

**Expected result:** Order is placed successfully and confirmation is provided.

</details>

---

## 🧠 Phase 1 — Requirement Analysis

**Run ID:** 20261114_141824_7qbatg
**Analyzed at:** 2026-11-14T14:18:46.075Z
**Application:** SauceDemo
**URL:** https://www.saucedemo.com
**JIRA ticket:** STUDY-101
**Epic:** STUDY-100

### Authentication
- Required: true
- Type: UI
- Source: Requirements text

### Modules
#### Product Listing
View all available products, Sort products by name and price, Filter products

| Submodule | Category | Source |
|-----------|----------|--------|
| View all products | Positive | Requirements text |
| Sort products | Positive | Requirements text |
| Filter products | Positive | Requirements text |

#### Cart
Manage products in the cart.

| Submodule | Category | Source |
|-----------|----------|--------|
| Add item to cart | Positive | Requirements text |
| Remove item from cart | Positive | Requirements text |
| View cart details | Positive | Requirements text |

#### Checkout
Handle the checkout process.

| Submodule | Category | Source |
|-----------|----------|--------|
| Enter shipping information | Positive | Requirements text |
| Review order summary | Positive | Requirements text |
| Place order | Positive | Requirements text |
| View order confirmation | Positive | Requirements text |
| Validate postal code format | Negative | JIRA comments |

### JIRA Comments Summary
Checkout must validate postal code format; Cart badge should update immediately when item is added or removed; Scope for this sprint: Login, Product Listing, Cart, Checkout. Order history is out of scope.

### Epic Summary
Epics include development of Login, Product Listing, Cart, and Checkout functionalities.

### Out of Scope
- Order history is out of scope.

### Review Checkpoint #1
- [ ] All sources reflected correctly
- [ ] Wireframe flows match modules
- [ ] Comments and epic tasks captured
- [ ] Conflicts and gaps reviewed
- [ ] Ready for test plan generation
