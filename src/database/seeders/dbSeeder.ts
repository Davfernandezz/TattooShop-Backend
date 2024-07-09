import { rolesSeeder } from "./rolesSeeder";
import { servicesSeeder } from "./servicesSeeder";

(async () => {
    console.log("Starting seeders...");
    await rolesSeeder();
    await servicesSeeder();
})();