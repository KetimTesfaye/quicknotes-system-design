QuickNotes System Design & API Client

QuickNotes is an enterprise-grade note-taking web application and system architecture project designed to scale to 1 million active users.

Features

- Interactive API Client: Full GET, POST, and DELETE capabilities integrated with status feedback and form validation.
- RESTful API Design: Documented endpoints, status codes, and JSON payloads.
- Robust Data Model: Relational schema design with foreign keys, indexes, and SQL queries.
- Scalable Architecture: Complete system design plan handling high read/write loads with caching and replication.

How to Run the API Client Locally

1. Clone the repository to your local machine.
2. Open the project folder in Visual Studio Code.
3. Install and open the Live Server extension.
4. Right-click `index.html` and select Open with Live Server.

Documentation Links

- [API Design Specification](docs/api-design.md)
- [Data Model Document](docs/data-model.md)
- [System Architecture Plan](docs/architecture.md)

What I Learned

1. Asynchronous API Integration: Mastered `async/await`, error handling with `try/catch/finally`, and HTTP response validation.
2. Enterprise Database Modeling: Designed normalized relational schemas, junction tables for many-to-many relationships, and optimized performance using indexes.
3. Distributed System Architecture: Calculated read/write loads and designed scalable cloud topologies utilizing load balancers, CDNs, read replicas, and caching layers.
