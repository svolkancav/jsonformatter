export interface SampleDataset {
  slug: string;
  title: string;
  description: string;
  category: string;
  useCase: string;
  json: string;
}

// Copy-paste-ready sample JSON datasets. Targets searches like
// "sample json data", "example json for testing", "dummy json".
export const sampleDatasets: SampleDataset[] = [
  {
    slug: 'users',
    title: 'Sample JSON: Users',
    description: 'A ready-to-use sample JSON array of user objects for testing forms, tables, APIs, and front-end mock data.',
    category: 'People',
    useCase:
      'Ideal for prototyping user lists, seeding a database, or mocking an authentication or profile API while you build the UI.',
    json: `[
  {
    "id": 1,
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada@example.com",
    "isActive": true,
    "roles": ["admin", "editor"],
    "createdAt": "2025-01-15T09:24:00Z"
  },
  {
    "id": 2,
    "firstName": "Linus",
    "lastName": "Torvalds",
    "email": "linus@example.com",
    "isActive": true,
    "roles": ["user"],
    "createdAt": "2025-02-02T14:10:00Z"
  },
  {
    "id": 3,
    "firstName": "Grace",
    "lastName": "Hopper",
    "email": "grace@example.com",
    "isActive": false,
    "roles": ["user", "moderator"],
    "createdAt": "2025-03-19T11:45:00Z"
  }
]`,
  },
  {
    slug: 'products',
    title: 'Sample JSON: Products',
    description: 'A sample JSON array of e-commerce product objects with price, stock, categories, and tags for testing catalogs and carts.',
    category: 'E-commerce',
    useCase:
      'Great for building product grids, shopping carts, or a store API mock with realistic fields like price, currency, and inventory.',
    json: `[
  {
    "id": "SKU-1001",
    "name": "Wireless Headphones",
    "price": 79.99,
    "currency": "USD",
    "inStock": true,
    "quantity": 128,
    "categories": ["audio", "electronics"],
    "rating": 4.6
  },
  {
    "id": "SKU-1002",
    "name": "Mechanical Keyboard",
    "price": 119.0,
    "currency": "USD",
    "inStock": false,
    "quantity": 0,
    "categories": ["accessories", "electronics"],
    "rating": 4.8
  }
]`,
  },
  {
    slug: 'employees',
    title: 'Sample JSON: Employees',
    description: 'A sample JSON dataset of employees with departments, salaries, and managers — useful for HR apps, tables, and reporting demos.',
    category: 'People',
    useCase:
      'Handy for org charts, HR dashboards, or demonstrating grouping and aggregation (by department, salary bands, etc.).',
    json: `[
  {
    "employeeId": 501,
    "name": "Maria Silva",
    "department": "Engineering",
    "title": "Senior Developer",
    "salary": 95000,
    "managerId": null
  },
  {
    "employeeId": 502,
    "name": "Chen Wei",
    "department": "Engineering",
    "title": "Developer",
    "salary": 72000,
    "managerId": 501
  },
  {
    "employeeId": 503,
    "name": "Omar Haddad",
    "department": "Design",
    "title": "Product Designer",
    "salary": 68000,
    "managerId": 501
  }
]`,
  },
  {
    slug: 'orders',
    title: 'Sample JSON: Orders',
    description: 'A sample JSON array of orders with nested line items, totals, and shipping — perfect for testing order history and invoices.',
    category: 'E-commerce',
    useCase:
      'Use it to build order-history screens, invoices, or to test how your code flattens nested line items into rows.',
    json: `[
  {
    "orderId": "ORD-2025-0001",
    "customer": "ada@example.com",
    "status": "shipped",
    "placedAt": "2025-04-01T10:00:00Z",
    "items": [
      { "sku": "SKU-1001", "name": "Wireless Headphones", "qty": 1, "price": 79.99 },
      { "sku": "SKU-1002", "name": "Mechanical Keyboard", "qty": 2, "price": 119.0 }
    ],
    "total": 317.99,
    "shippingAddress": {
      "city": "London",
      "country": "UK",
      "postalCode": "EC1A 1BB"
    }
  }
]`,
  },
  {
    slug: 'blog-posts',
    title: 'Sample JSON: Blog Posts',
    description: 'A sample JSON array of blog post objects with author, tags, and timestamps for testing CMS front-ends and feeds.',
    category: 'Content',
    useCase:
      'Perfect for building a blog list, an RSS-style feed, or testing pagination and tag filtering in a CMS front-end.',
    json: `[
  {
    "id": 12,
    "title": "Getting Started with JSON",
    "slug": "getting-started-with-json",
    "author": { "name": "Ada Lovelace", "handle": "@ada" },
    "tags": ["json", "beginners"],
    "published": true,
    "publishedAt": "2025-05-10T08:00:00Z",
    "readingMinutes": 6
  },
  {
    "id": 13,
    "title": "Understanding APIs",
    "slug": "understanding-apis",
    "author": { "name": "Grace Hopper", "handle": "@grace" },
    "tags": ["api", "http"],
    "published": false,
    "publishedAt": null,
    "readingMinutes": 9
  }
]`,
  },
  {
    slug: 'todos',
    title: 'Sample JSON: Todo List',
    description: 'A simple sample JSON array of todo items with status and priority — the classic dataset for tutorials and to-do apps.',
    category: 'Basic',
    useCase:
      'The go-to dataset for framework tutorials and to-do app demos. Small, flat, and easy to render in a list.',
    json: `[
  { "id": 1, "task": "Write documentation", "done": false, "priority": "high" },
  { "id": 2, "task": "Review pull request", "done": true, "priority": "medium" },
  { "id": 3, "task": "Deploy to production", "done": false, "priority": "high" },
  { "id": 4, "task": "Update dependencies", "done": false, "priority": "low" }
]`,
  },
  {
    slug: 'geojson',
    title: 'Sample GeoJSON: Points',
    description: 'A sample GeoJSON FeatureCollection with point features and properties for testing maps and geospatial code.',
    category: 'Geospatial',
    useCase:
      'Drop it into Leaflet, Mapbox, or any GeoJSON-aware map to test rendering markers and reading feature properties.',
    json: `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-0.1276, 51.5072] },
      "properties": { "name": "London", "population": 8982000 }
    },
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [2.3522, 48.8566] },
      "properties": { "name": "Paris", "population": 2161000 }
    }
  ]
}`,
  },
  {
    slug: 'api-response',
    title: 'Sample JSON: Paginated API Response',
    description: 'A sample JSON API response with a data array plus pagination metadata — the common envelope pattern for REST APIs.',
    category: 'API',
    useCase:
      'Model your API client against a realistic envelope with data and meta, including page, perPage, and total counts.',
    json: `{
  "data": [
    { "id": 1, "name": "Item One" },
    { "id": 2, "name": "Item Two" },
    { "id": 3, "name": "Item Three" }
  ],
  "meta": {
    "page": 1,
    "perPage": 3,
    "total": 42,
    "totalPages": 14
  },
  "links": {
    "next": "/api/items?page=2",
    "prev": null
  }
}`,
  },
  {
    slug: 'countries',
    title: 'Sample JSON: Countries',
    description: 'A sample JSON array of countries with capital, currency, population, and ISO codes — great for dropdowns and reference data.',
    category: 'Reference',
    useCase:
      'Perfect for country pickers, phone/currency selectors, or any app that needs reference data with ISO codes.',
    json: `[
  { "name": "Turkey", "code": "TR", "capital": "Ankara", "currency": "TRY", "population": 85000000 },
  { "name": "Germany", "code": "DE", "capital": "Berlin", "currency": "EUR", "population": 83000000 },
  { "name": "Japan", "code": "JP", "capital": "Tokyo", "currency": "JPY", "population": 125000000 }
]`,
  },
  {
    slug: 'movies',
    title: 'Sample JSON: Movies',
    description: 'A sample JSON array of movies with title, year, genres, rating, and cast — ideal for demos, tables, and search UIs.',
    category: 'Content',
    useCase:
      'A rich, familiar dataset for building catalogs, search-and-filter UIs, or demonstrating nested arrays (genres, cast).',
    json: `[
  {
    "title": "Inception",
    "year": 2010,
    "genres": ["Sci-Fi", "Thriller"],
    "rating": 8.8,
    "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
  },
  {
    "title": "The Matrix",
    "year": 1999,
    "genres": ["Sci-Fi", "Action"],
    "rating": 8.7,
    "cast": ["Keanu Reeves", "Carrie-Anne Moss"]
  }
]`,
  },
  {
    slug: 'weather',
    title: 'Sample JSON: Weather',
    description: 'A sample JSON weather API response with current conditions and a daily forecast — great for weather widgets and dashboards.',
    category: 'API',
    useCase:
      'Model a weather widget or dashboard against a realistic response with current conditions and a nested forecast array.',
    json: `{
  "location": "Istanbul",
  "current": {
    "tempC": 21,
    "condition": "Partly cloudy",
    "humidity": 60,
    "windKph": 14
  },
  "forecast": [
    { "date": "2026-07-02", "minC": 19, "maxC": 28, "condition": "Sunny" },
    { "date": "2026-07-03", "minC": 20, "maxC": 30, "condition": "Sunny" }
  ]
}`,
  },
  {
    slug: 'invoice',
    title: 'Sample JSON: Invoice',
    description: 'A sample JSON invoice with line items, tax, totals, and customer details — perfect for billing and PDF-generation demos.',
    category: 'Business',
    useCase:
      'Use it to build invoice screens, test tax/total calculations, or feed a PDF generator with realistic nested line items.',
    json: `{
  "invoiceNumber": "INV-2026-0042",
  "issuedAt": "2026-07-01",
  "customer": { "name": "Acme Inc.", "email": "billing@acme.com" },
  "items": [
    { "description": "Consulting", "quantity": 10, "unitPrice": 120.0 },
    { "description": "Hosting", "quantity": 1, "unitPrice": 49.0 }
  ],
  "subtotal": 1249.0,
  "taxRate": 0.2,
  "total": 1498.8
}`,
  },
];

export const sampleBySlug: Record<string, SampleDataset> = Object.fromEntries(
  sampleDatasets.map((s) => [s.slug, s]),
);
