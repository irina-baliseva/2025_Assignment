import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

let password: string;

test('consumer can log in successfully', async ({ page }) => {
    const login = new LoginPage(page);

    if (process.env.STORE_PASSWORD !== undefined){
        password = process.env.STORE_PASSWORD;
    }
    await login.loginAsConsumer('irina', password, 'consumer');
    
});
