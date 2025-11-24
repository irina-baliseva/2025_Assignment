import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../../pages/loginPage';

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); 

    if (accessibilityScanResults.violations.length > 0) {
        console.log("Accessibility violations found:");
        console.table(accessibilityScanResults.violations.map(v => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length
        })));
    }

    expect(accessibilityScanResults.violations).toHaveLength(0);
});
