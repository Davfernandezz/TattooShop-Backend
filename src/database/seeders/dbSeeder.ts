import { rolesSeeder } from "./rolesSeeder";
import { servicesSeeder } from "./servicesSeeder";
import { usersSeeder } from "./usersSeeder";

(async () => {
    console.log("Starting seeders...");
    await rolesSeeder();
    await servicesSeeder();
    await usersSeeder();
})();