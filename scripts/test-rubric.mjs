import { chromium } from 'playwright';

async function runTests() {
  console.log('🚀 Starting Paradise Nursery Rubric Test Suite...\n');
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];

  function record(testName, passed, details = '') {
    results.push({ testName, passed, details });
    const mark = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${mark} - ${testName} ${details ? '(' + details + ')' : ''}`);
  }

  try {
    // 1. Landing page opens at '/'
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    const brandTitle = await page.locator('.brand-title').first().innerText();
    const hasLandingTitle = await page.locator('.landing-title').isVisible();
    record('Landing page opens at /', hasLandingTitle && brandTitle.includes('Paradise Nursery'), `Title: ${title}`);

    // Check AboutUs section on landing page
    const hasAboutUs = await page.locator('.about-us-section').isVisible();
    record('AboutUs section rendered on landing page', hasAboutUs);

    // 2. Get Started navigates to plant listing (/plants)
    await page.locator('#get-started-btn').click();
    await page.waitForURL('**/plants');
    record('Get Started navigates to /plants', page.url().includes('/plants'));

    // 3. Navbar appears on product page
    const hasNavbarOnPlants = await page.locator('.shared-navbar').isVisible();
    record('Shared navbar appears on product page', hasNavbarOnPlants);

    // 4. Categories & Plants check (at least 3 categories, at least 18 unique plants, at least 6 per category)
    await page.locator('.plant-card').first().waitFor();
    const categorySections = await page.locator('.category-section').all();
    record('At least three categories present', categorySections.length >= 3, `Found ${categorySections.length} categories`);

    for (let i = 0; i < categorySections.length; i++) {
      const catTitle = await categorySections[i].locator('h2').innerText();
      const plantsInCat = await categorySections[i].locator('.plant-card').all();
      record(`Category "${catTitle}" has at least 6 plants`, plantsInCat.length >= 6, `Found ${plantsInCat.length} plants`);
    }

    const allPlantCards = await page.locator('.plant-card').all();
    record('At least 18 unique plants total', allPlantCards.length >= 18, `Found ${allPlantCards.length} plants`);

    // Verify all plants have name, price, thumbnail
    let allPlantsValid = true;
    for (const card of allPlantCards) {
      const name = await card.locator('.plant-name').innerText();
      const price = await card.locator('.plant-price').innerText();
      const hasThumb = await card.locator('.plant-thumbnail').isVisible();
      if (!name || !price.includes('₹') || !hasThumb) {
        allPlantsValid = false;
        break;
      }
    }
    record('Every plant card has name, price in ₹, and thumbnail', allPlantsValid);

    // 5. Add to Cart works, button disabled with 'Added to Cart', cart badge updates
    const firstPlantBtn = page.locator('#add-btn-indoor-1');
    await firstPlantBtn.click();
    const btnText1 = await firstPlantBtn.innerText();
    const isBtnDisabled1 = await firstPlantBtn.isDisabled();
    const badgeText1 = await page.locator('#cart-count-badge').innerText();
    record('Add to Cart adds item and disables button with "Added to Cart"', isBtnDisabled1 && btnText1.includes('Added to Cart'));
    record('Cart count badge updates to 1', badgeText1 === '1');

    // Add 2 more plants
    await page.locator('#add-btn-indoor-2').click();
    await page.locator('#add-btn-outdoor-1').click();
    const badgeText3 = await page.locator('#cart-count-badge').innerText();
    record('Cart count badge correctly updates to 3 with multiple additions', badgeText3 === '3');

    // 6. Navigate to /cart via navbar
    await page.locator('#nav-cart').click();
    await page.waitForURL('**/cart');
    record('Navigate to /cart works', page.url().includes('/cart'));

    // Navbar appears on cart page
    const hasNavbarOnCart = await page.locator('.shared-navbar').isVisible();
    record('Shared navbar appears on cart page', hasNavbarOnCart);

    // 7. Verify cart items displayed with thumbnail, name, unit price, quantity controls, subtotal
    await page.locator('.cart-item-card').first().waitFor();
    const cartItemCards = await page.locator('.cart-item-card').all();
    record('Cart displays 3 unique items added', cartItemCards.length === 3);

    // Check item totals and overall total
    const subtotalText1 = await page.locator('#subtotal-indoor-1').innerText(); // Monstera: ₹799
    const totalAmountText = await page.locator('#cart-total-amount').innerText();
    record('Initial unit price and subtotal match', subtotalText1.includes('799'));

    // 8. Test Quantity Increase
    // Monstera Deliciosa price 799. Increase quantity to 2.
    await page.locator('#increase-btn-indoor-1').click();
    const qtyText1 = await page.locator('#qty-display-indoor-1').innerText();
    const subtotalAfterIncrease = await page.locator('#subtotal-indoor-1').innerText(); // 799 * 2 = 1,598
    const badgeAfterIncrease = await page.locator('#cart-count-badge').innerText();
    record('Plus button increases quantity to 2', qtyText1 === '2');
    record('Item subtotal updates to 2x unit price (₹1,598)', subtotalAfterIncrease.replace(/\s+/g, '').includes('1,598'));
    record('Navbar cart count updates to 4', badgeAfterIncrease === '4');

    // 9. Test Quantity Decrease safely
    await page.locator('#decrease-btn-indoor-1').click();
    const qtyAfterDecrease = await page.locator('#qty-display-indoor-1').innerText();
    const isMinusDisabledAtOne = await page.locator('#decrease-btn-indoor-1').isDisabled();
    record('Minus button decreases quantity back to 1 safely', qtyAfterDecrease === '1');
    record('Minus button is disabled at quantity 1 (safe decrease)', isMinusDisabledAtOne);

    // 10. Test Delete button removes plant
    await page.locator('#delete-btn-indoor-2').click(); // delete Snake Plant
    const remainingItems = await page.locator('.cart-item-card').all();
    record('Delete button removes selected plant from cart', remainingItems.length === 2);

    // 11. Test Continue Shopping button returns to /plants
    await page.locator('#continue-shopping-btn').click();
    await page.waitForURL('**/plants');
    record('Continue Shopping navigates back to /plants', page.url().includes('/plants'));

    // Re-verify that Monstera and Bougainvillea still show "Added to Cart" on /plants, while Snake Plant is reset
    const monsteraBtnStatus = await page.locator('#add-btn-indoor-1').isDisabled();
    const snakeBtnStatus = await page.locator('#add-btn-indoor-2').isDisabled();
    record('Cart state persists across page navigation', monsteraBtnStatus === true && snakeBtnStatus === false);

    // 12. Return to cart and test Checkout button
    await page.locator('#nav-cart').click();
    await page.waitForURL('**/cart');
    await page.locator('#checkout-btn').click();
    const isCheckoutModalVisible = await page.locator('.checkout-modal').isVisible();
    const checkoutModalTitle = await page.locator('#modal-title').innerText();
    record('Checkout button displays "Checkout Coming Soon!" modal', isCheckoutModalVisible && checkoutModalTitle.includes('Checkout Coming Soon'));

    // Close modal
    await page.locator('.modal-close-btn').click();
    const isCheckoutModalClosed = !(await page.locator('.checkout-modal').isVisible());
    record('Checkout modal can be closed smoothly', isCheckoutModalClosed);

    // 13. Test Empty Cart state
    // Delete remaining 2 items
    await page.locator('#delete-btn-indoor-1').click();
    await page.locator('#delete-btn-outdoor-1').click();
    const isEmptyCartVisible = await page.locator('#empty-cart-view').isVisible();
    record('Empty cart state displays when all items are removed', isEmptyCartVisible);

    // Click Browse Plants in empty cart
    await page.locator('#empty-cart-browse-btn').click();
    await page.waitForURL('**/plants');
    record('Browse Plants button in empty cart navigates to /plants', page.url().includes('/plants'));

  } catch (err) {
    console.error('Error during testing:', err);
    record('Overall test execution', false, err.message);
  } finally {
    await browser.close();
  }

  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.length - passedCount;
  console.log(`\n========================================`);
  console.log(`Total Checks: ${results.length} | Passed: ${passedCount} | Failed: ${failedCount}`);
  console.log(`========================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTests();
