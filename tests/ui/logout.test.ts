import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { StorePage } from '../../pages/storePage';

let password: string;

test('consumer can log out successfully', async ({ page }) => {
    const login = new LoginPage(page);
    const storePage = new StorePage(page);

    //login

    if (process.env.STORE_PASSWORD !== undefined){
        password = process.env.STORE_PASSWORD;
    }
    await login.loginAsConsumer('irina', password, 'consumer'); 
    
    //logout
    await storePage.logout();
    await expect(page).toHaveURL('https://hoff.is/login/')
});