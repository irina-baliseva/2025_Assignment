import { test, request, APIRequestContext, expect } from "@playwright/test";

let apiContext: APIRequestContext;

test.beforeAll(async () => {
    apiContext = await request.newContext({
        baseURL: 'https://hoff.is/store2/api/v1/',

    })
})

test("Get price for Apple from API", async () => {

    // fetch a list of products
    const productListResponse = await apiContext.get("product/list");
    expect(productListResponse.ok()).toBeTruthy();

    const productListJson = await productListResponse.json();
    console.log(productListJson);

    // Locate the product Apple
    const appleProduct = productListJson.products.find((p: {name: string}) => p.name === "Apple");
    expect(appleProduct).toBeDefined();

    const appleId = appleProduct.id;

    // Get the price for Apple with ID
    const priceResponse = await apiContext.get(`price/${appleId}`);
    expect(priceResponse.ok()).toBeTruthy();

    const priceJson = await priceResponse.json();
    console.log(priceJson);

    // Kontrollera att det är rätt produkt och att priset är rimligt
    expect(priceJson.name).toBe("Apple");
    expect(typeof priceJson.price).toBe("number");
    expect(priceJson.price).toBe(15);

})