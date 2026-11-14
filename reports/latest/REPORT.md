# 🤖 AI QA Pipeline — Latest Results

_Generated: 2026-11-14T14:16:26.465Z_

## 📊 Test Case Summary

| Total | Smoke | Regression | High Priority |
|:-----:|:-----:|:----------:|:-------------:|
| **12** | 5 | 12 | 6 |

### By module

| Module | Test cases |
|--------|:----------:|
| Authentication | 1 |
| Product Listing | 3 |
| Cart | 4 |
| Checkout | 4 |

## 🧪 Generated Test Cases

| ID | Module | Title | Type | Priority | Severity | Tags |
|----|--------|-------|------|----------|----------|------|
| TC_001 | Authentication | User login with valid credentials | Positive | High | Critical | smoke, regression |
| TC_002 | Product Listing | View all available products | Positive | Medium | Major | smoke, regression |
| TC_003 | Product Listing | Sort products by price | Positive | Medium | Major | regression |
| TC_004 | Product Listing | Filter products by category | Positive | Medium | Major | regression |
| TC_005 | Cart | Add item to cart | Positive | High | Critical | smoke, regression |
| TC_006 | Cart | Remove item from cart | Positive | High | Critical | regression |
| TC_007 | Cart | View cart details | Positive | Medium | Major | regression |
| TC_008 | Cart | Check cart badge update on addition | Positive | Medium | Major | regression |
| TC_009 | Checkout | Enter shipping information with valid data | Positive | High | Critical | smoke, regression |
| TC_010 | Checkout | Validate postal code format on checkout | Negative | High | Critical | regression |
| TC_011 | Checkout | Review order summary | Positive | Medium | Major | regression |
| TC_012 | Checkout | Place order after review | Positive | High | Critical | smoke, regression |

### Test case details

<details><summary><b>TC_001</b> — User login with valid credentials</summary>

**Module:** Authentication › Login  
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
2. Enter username and password
3. Click on login button

**Expected result:** User is successfully logged in and redirected to the homepage.

</details>

<details><summary><b>TC_002</b> — View all available products</summary>

**Module:** Product Listing › View Products  
**Priority / Severity:** Medium / Major

**Preconditions**

- User is logged in

**Steps**

1. Access the product listing page

**Expected result:** All available products are displayed.

</details>

<details><summary><b>TC_003</b> — Sort products by price</summary>

**Module:** Product Listing › Sort Products  
**Priority / Severity:** Medium / Major

**Preconditions**

- User is logged in

**Test data**

```json
{
  "sortOption": "Price (low to high)"
}
```

**Steps**

1. Access the product listing page
2. Select sort option for price low to high

**Expected result:** Products are sorted by price in ascending order.

</details>

<details><summary><b>TC_004</b> — Filter products by category</summary>

**Module:** Product Listing › Filter Products  
**Priority / Severity:** Medium / Major

**Preconditions**

- User is logged in

**Test data**

```json
{
  "filterOption": "Category"
}
```

**Steps**

1. Access the product listing page
2. Select a filter option for a specific category

**Expected result:** Products are filtered according to the selected category.

</details>

<details><summary><b>TC_005</b> — Add item to cart</summary>

**Module:** Cart › Add Item to Cart  
**Priority / Severity:** High / Critical

**Preconditions**

- User is logged in
- At least one product is available

**Test data**

```json
{
  "product": "Sauce Labs Backpack"
}
```

**Steps**

1. Access the product listing page
2. Click on 'Add to Cart' for the product

**Expected result:** Item is added to the cart successfully.

</details>

<details><summary><b>TC_006</b> — Remove item from cart</summary>

**Module:** Cart › Remove Item from Cart  
**Priority / Severity:** High / Critical

**Preconditions**

- User is logged in
- At least one item in the cart

**Test data**

```json
{
  "product": "Sauce Labs Backpack"
}
```

**Steps**

1. Access the cart page
2. Click on 'Remove' for the item

**Expected result:** Item is removed from the cart successfully.

</details>

<details><summary><b>TC_007</b> — View cart details</summary>

**Module:** Cart › View Cart Details  
**Priority / Severity:** Medium / Major

**Preconditions**

- User is logged in
- At least one item in the cart

**Steps**

1. Access the cart page

**Expected result:** Details of items in the cart are displayed.

</details>

<details><summary><b>TC_008</b> — Check cart badge update on addition</summary>

**Module:** Cart › Cart Badge Update  
**Priority / Severity:** Medium / Major

**Preconditions**

- User is logged in
- No items in the cart

**Test data**

```json
{
  "product": "Sauce Labs Backpack"
}
```

**Steps**

1. Add item to cart
2. Check cart badge

**Expected result:** Cart badge updates immediately to reflect one item.

</details>

<details><summary><b>TC_009</b> — Enter shipping information with valid data</summary>

**Module:** Checkout › Enter Shipping Information  
**Priority / Severity:** High / Critical

**Preconditions**

- User is logged in
- Item is in cart

**Test data**

```json
{
  "postalCode": "12345"
}
```

**Steps**

1. Access checkout page
2. Enter shipping information including postal code
3. Click on continue

**Expected result:** Shipping information is accepted and user can proceed.

</details>

<details><summary><b>TC_010</b> — Validate postal code format on checkout</summary>

**Module:** Checkout › Postal Code Validation  
**Priority / Severity:** High / Critical

**Preconditions**

- User is logged in
- Item is in cart

**Test data**

```json
{
  "postalCode": "1234"
}
```

**Steps**

1. Access checkout page
2. Enter invalid postal code
3. Click on continue

**Expected result:** Error message is shown for invalid postal code.

</details>

<details><summary><b>TC_011</b> — Review order summary</summary>

**Module:** Checkout › Review Order Summary  
**Priority / Severity:** Medium / Major

**Preconditions**

- User is logged in
- Item is added to the cart
- Shipping information is entered

**Steps**

1. Access checkout page
2. Review the order summary before placing the order

**Expected result:** Order summary displays correct items and totals.

</details>

<details><summary><b>TC_012</b> — Place order after review</summary>

**Module:** Checkout › Place Order  
**Priority / Severity:** High / Critical

**Preconditions**

- User is logged in
- Item is in cart
- Shipping information entered
- Order summary reviewed

**Steps**

1. Click on place order button

**Expected result:** Order is placed successfully and user sees order confirmation.

</details>

---

## 🧠 Phase 1 — Requirement Analysis

**Run ID:** 20261114_194236_9avmbm
**Analyzed at:** 2026-11-14T14:13:04.110Z
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
View and manage product listings including sorting and filtering.

| Submodule | Category | Source |
|-----------|----------|--------|
| View Products | Positive | Requirements text |
| Sort Products | Positive | Requirements text |
| Filter Products | Positive | Requirements text |

#### Cart
Manage the shopping cart including adding and removing items.

| Submodule | Category | Source |
|-----------|----------|--------|
| Add Item to Cart | Positive | Requirements text |
| Remove Item from Cart | Positive | Requirements text |
| View Cart Details | Positive | Requirements text |
| Cart Badge Update | Positive | JIRA comments |

#### Checkout
Process for checking out and placing orders.

| Submodule | Category | Source |
|-----------|----------|--------|
| Enter Shipping Information | Positive | Requirements text |
| Review Order Summary | Positive | Requirements text |
| Place Order | Positive | Requirements text |
| Order Confirmation | Positive | Requirements text |
| Postal Code Validation | Negative | JIRA comments |

### JIRA Comments Summary
Checkout must validate postal code format. Cart badge should update immediately when items are added or removed.

### Epic Summary
Scope for this sprint: Login, Product Listing, Cart, Checkout. Order history is out of scope.

### Out of Scope
- Order history

### Review Checkpoint #1
- [ ] All sources reflected correctly
- [ ] Wireframe flows match modules
- [ ] Comments and epic tasks captured
- [ ] Conflicts and gaps reviewed
- [ ] Ready for test plan generation
