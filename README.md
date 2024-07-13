# TattooShop Backend🖋️
<br>
Welcome to my TattooShop Backend project, I hope you like it! 📈
<br><br>
<a>
<img src="https://user-images.githubusercontent.com/74038190/221352987-68da234d-4d62-4e9d-9d7f-098dc657c2dc.gif" width="550">
</a>
<br><br>

<details>
  <summary>Table of Contents📝</summary>
  <ol>
    <li><a href="#description">Description</a></li>
    <li><a href="#objetive">Objetive</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagram-bd">Diagram</a></li>
    <li><a href="#local-installation">Local installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#future-functionalities">Future functionalities</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#appreciations">Appreciations</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
<br>

## Description📚
This project consists of the recreation of a tattoo studio in which users will be able to register in the application, log in and access their personal area. Within their area, they will be able to view a list of scheduled appointments for tattoo and piercing services, as well as create new appointments for various services offered by the studio, such as:

- **Custom Tattoos**:
Clients will have the freedom to select unique motifs and designs, completely customizing their tattoo experience according to their preferences and tastes.
- **Tattoos from the catalog**:
We offer tattoos based on predefined designs in our catalog. Customers can choose from a variety of stylish and proven options.
- **Restoration and rejuvenation of works**:
We specialize in the restoration and rejuvenation of existing tattoos. Our experts work to improve and renew old tattoos, restoring their vitality.
- **Placement of piercings and dilators**: 
We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to meet individual preferences of our clients.
- **Sale of piercings and other items**:
In addition to our application services, we offer a selection of piercings and other body art related items. Customers can purchase quality products for complement your unique style.

## Objetive🎯
The objective of this project is to adapt to the work done by TypeScript together with relational databases and learn to get along with Express JS, Node, Bcrypt and Jsonwebtoken. 
With the tools I just mentioned, I have completed a list of endpoints, migrations, models and seeders, taking into account different roles with their respective permissions.

## Deploy 🚀
<div align="center">
    <a href="https://tattooshop-backend.zeabur.app/"><strong> Click here! </strong></a>🚀🚀🚀
</div>

## Stack
Used technology:
<div align="center">
<a>
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="express" />
</a>
<a>
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white" alt="node" />
</a>
<a>
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black" alt="js" />
</a>
<a>
    <img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="ts" />
</a>
<a>
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</a>
<a>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="docker" />
</a>
<a>
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="jwt" />
</a>
<a>
    <img src="https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&" alt="ts" />
</a>
</div>




## Diagram BD
<img width="1423" src="./img/diagrama.JPG">

## Local installation
1. Clone the repository:
2. ` $ npm install `
3. We connect our repository with the database: 
4. ``` $ We execute the migrations ``` 
5. ``` $ We run the seeders ``` 
6. ``` $ npm run dev ``` 
7. ...

## Endpoints
<details>
<summary>Authentication🔑</summary>

- **Register user**

          POST http://localhost:4000/api/register

    body:

    ```js
        {
            "email": "david@david.com",
            "password": "123456789"
        }
    ```

<br>

- **Login user**	

          POST http://localhost:4000/api/login

    body:

    ```js
        {
            "email": "david@david.com",
            "password": "123456789"
        }
    ```
</details>
<details>
<summary>Users🧑🏻</summary>

- **View all users** (IS ADMIN)

          GET http://localhost:4000/api/users

    auth:

    ```js
        auth token
    ```

<br>

- **View user profile**

          GET http://localhost:4000/api/users/profile

    auth:

    ```js
        auth token
    ```

<br>

- **Update user profile**

          PUT http://localhost:4000/api/profile/update/:id

    body:

    ```js
        {
        "first_name": "Carlos",
        "last_name": "Leon",
        "email": "carlos@carlos.com",
        "password": "123498765"
        }
    ```

    auth:

    ```js
        auth token
    ```

</details>
<details>
<summary>Services🖋️</summary>

- **View all services**

          GET http://localhost:4000/api/services

    auth:

    ```js
        auth token
    ```

<br>

- **Create service** (IS ADMIN)

          POST http://localhost:4000/api/services

    body:

    ```js
        {
        "service_name": "Tatuajes personalizados",
        "description": "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
        }
    ```

    auth:

    ```js
        auth token
    ```

<br>

- **Update service** (IS ADMIN)

          PUT http://localhost:4000/api/services/:id

    body:

    ```js
        {
        "service_name": "update",
        "description": "update"
        }
    ```

    auth:

    ```js
        auth token
    ```

<br>

- **Delete service** (IS ADMIN)

          DELETE http://localhost:4000/api/services/:id

    auth:

    ```js
        auth token
    ```

</details>
<details>
<summary>Appointments📅</summary>

- **Create appointment**

          POST http://localhost:4000/api/appointments/create

    body:

    ```js
        {
        "date": "2024/07/15",
        "service_id": "1"
        }
    ```

    auth:

    ```js
        auth token
    ```

<br>

- **Update my appointment**

          PUT http://localhost:4000/api/appointments/change/:id

    body:

    ```js
        {
        "date": "2024/07/20",
        "service_id": "3"
        }
    ```

    auth:

    ```js
        auth token
    ```

<br>

- **Retrieve appointment by id**

          GET http://localhost:4000/api/appointments/:id

    auth:

    ```js
        auth token
    ```

<br>

- **View appointments user**

          GET http://localhost:4000/api/appointments/user

    auth:

    ```js
        auth token
    ```

</details>

## Future functionalities
[ ]Add the tattoo artists table.
[ ] Implement migration, model and role controller.
[ ] ...


## Development:

```js
const developer = "DavidFernandez";

console.log("Developed by: " DavidFernandez);
```

## Appreciations:

I would like to dedicate my thanks to the teachers at Geeks Hubs as well as my day to day colleagues with whom we can help each other with our problems.


## Contact
- **David Fernandez Valle**
  - [GitHub](https://github.com/Davfernandezz)
