import { test, expect  } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { StorePage } from '../../pages/storePage';

let password: string;

test('user can buy a product', async ({ page }) => {
    const login = new LoginPage(page);
    const store = new StorePage(page);

    //login
    if (process.env.STORE_PASSWORD !== undefined){
        password = process.env.STORE_PASSWORD;
    }
    await login.loginAsConsumer('irina', password, 'consumer');

    // Add product to cart
    await store.addProductToCart('2', '3', 'Banana');

    // Confirm purchase
    await store.confirmPurchase(
        'Irina Baliseva',
        'Finnstastigen 32',
        '3 x Banana - $69'
    );
});
