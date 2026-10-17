export interface SampleDataset {
  slug: string;
  title: string;
  description: string;
  category: string;
  useCase: string;
  /** Field-by-field notes, so each dataset page explains its own shape. */
  fields: { name: string; note: string }[];
  /** Why this dataset is interesting and what it is worth testing with. */
  notes: string[];
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
    fields: [
      { name: 'id', note: 'Sequential integer primary key. Fine for a demo; real systems often prefer a UUID so ids are not guessable and do not collide across shards.' },
      { name: 'firstName / lastName', note: 'Split name fields. Convenient for sorting but a poor fit for many cultures — a single fullName field avoids assuming a given/family structure.' },
      { name: 'email', note: 'Used here as the natural unique identifier alongside the numeric id.' },
      { name: 'isActive', note: 'Boolean flag. Note the is prefix, a common convention that makes the type obvious at the call site.' },
      { name: 'roles', note: 'Array of strings, so a user can hold several roles. Exercises array handling in whatever you are testing.' },
      { name: 'createdAt', note: 'ISO 8601 timestamp with a Z suffix for UTC. The format every JSON parser and date library understands without configuration.' },
    ],
    notes: [
      'This is the most generic shape in the library and the one to reach for when you just need "some objects in an array". It covers the four JSON types that matter — string, number, boolean and array — so a parser or mapper that handles this handles most payloads.',
      'The camelCase keys are deliberate. They mirror what a JavaScript or .NET API typically emits, which makes this a useful sample for testing a naming-strategy setting in Jackson, serde or System.Text.Json.',
    ],
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
    fields: [
      { name: 'id', note: 'A string SKU rather than a number. Worth testing: code that assumes numeric ids breaks here, which is exactly the point.' },
      { name: 'price', note: 'Decimal number. In production this is the field that should not be a float — see the note below.' },
      { name: 'currency', note: 'ISO 4217 code kept separate from the amount, so the value is never ambiguous.' },
      { name: 'inStock / quantity', note: 'A boolean and a count that can disagree, which is useful for testing validation rules.' },
      { name: 'categories', note: 'Array of tags, so one product belongs to several categories.' },
      { name: 'rating', note: 'Float with one decimal place — good for checking rounding and display formatting.' },
    ],
    notes: [
      'Use this when you need a catalogue-shaped payload: string identifiers, money, stock levels and tags in one object.',
      'The price field is the interesting one. Reading 79.99 into a double or float is what most code generators infer, and it is wrong for currency — binary floating point cannot represent most decimal fractions exactly, so totals drift. Map it to decimal, BigDecimal or integer minor units instead.',
    ],
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
    fields: [
      { name: 'employeeId', note: 'Numeric identifier, distinct from the row position.' },
      { name: 'name', note: 'Single full-name field rather than split parts.' },
      { name: 'department / title', note: 'Plain strings — realistic candidates for becoming enums once the set of values is known.' },
      { name: 'salary', note: 'Whole number. Kept as an integer here, which sidesteps the floating point problem entirely.' },
      { name: 'managerId', note: 'Nullable self-reference: null marks the top of the hierarchy.' },
    ],
    notes: [
      'The reason to pick this sample over users is managerId. A null that points at the same collection exercises two things at once: how your language distinguishes an absent value from a present null, and whether your code can walk a self-referencing hierarchy.',
      'It is also a good test for strongly typed languages. A field that is null in one record and an integer in another must be modelled as a nullable type — Integer rather than int in Java, Option<i64> in Rust, int? in C# — and a generator that only sees the populated rows will get it wrong.',
    ],
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
    fields: [
      { name: 'orderId', note: 'Human-readable string identifier with a year segment, as most order systems use.' },
      { name: 'customer', note: 'An email address used as a reference to another entity rather than an embedded object.' },
      { name: 'status', note: 'A string from a small fixed set — the natural candidate for an enum.' },
      { name: 'items', note: 'Array of objects: the nested level that makes this sample useful.' },
      { name: 'total', note: 'Order total, which should equal the sum of quantity times price across items.' },
      { name: 'shippingAddress', note: 'Nested object, so the payload is two levels deep in two different ways.' },
    ],
    notes: [
      'This is the sample to use when you need nesting rather than a flat list. It has an array of objects and a nested object in the same record, which is what breaks naive flatteners.',
      'It is also the best dataset here for testing JSON to CSV or JSON to Excel conversion. A flat table has no way to represent an array of line items, so you can see directly how a converter handles the mismatch — whether it creates indexed columns, joins values into one cell, or drops them.',
    ],
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
    fields: [
      { name: 'id / slug', note: 'A numeric id for storage and a URL-safe slug for routing — both present because real content systems carry both.' },
      { name: 'author', note: 'Nested object rather than a flat string, so author details stay grouped.' },
      { name: 'tags', note: 'Array of strings for categorisation.' },
      { name: 'published', note: 'Boolean that gates visibility, separate from publishedAt.' },
      { name: 'publishedAt', note: 'ISO 8601 timestamp.' },
      { name: 'readingMinutes', note: 'Derived integer — a value computed at write time rather than stored by an author.' },
    ],
    notes: [
      'A content-management shape: identifiers, a nested author, tags and a publication state. Useful for testing a static site generator, a headless CMS integration, or a listing component.',
      'Note that published and publishedAt can contradict each other — a post can carry a date while still being unpublished. Payloads where two fields encode overlapping state are common in the wild and worth having in a test set.',
    ],
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
    fields: [
      { name: 'id', note: 'Simple sequential integer.' },
      { name: 'task', note: 'Free-text description.' },
      { name: 'done', note: 'Boolean completion flag.' },
      { name: 'priority', note: 'One of a small set of string values.' },
    ],
    notes: [
      'The smallest dataset here, and the right choice when you want to check that something works at all rather than exercise edge cases. Four flat objects, no nesting, four fields each.',
      'Because every record has an identical shape with no nulls and no nested structures, it converts cleanly to CSV, a spreadsheet or a database table. That makes it a good control case: if a conversion fails on this, the problem is in the tool rather than in the data.',
    ],
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
    fields: [
      { name: 'type', note: 'Present at every level — FeatureCollection, Feature and Point. This is how a GeoJSON parser knows what it is reading.' },
      { name: 'features', note: 'Array of Feature objects, each pairing a geometry with its properties.' },
      { name: 'geometry.coordinates', note: 'Longitude first, then latitude. This ordering is the single most common source of bugs in geospatial code.' },
      { name: 'properties', note: 'Free-form object for anything that is not geometry — the specification places no constraints on it.' },
    ],
    notes: [
      'GeoJSON is a formal specification (RFC 7946) rather than an ad-hoc shape, which makes this sample useful for testing anything that claims to read map data: Leaflet, Mapbox, PostGIS, or a validator.',
      'The coordinate order catches almost everyone. GeoJSON writes [longitude, latitude], the opposite of the "lat, long" convention people say out loud and the order most mapping APIs accept. A map where every point lands in the wrong hemisphere is nearly always this.',
    ],
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
    fields: [
      { name: 'data', note: 'The payload array. Keeping results under a key rather than at the top level leaves room for metadata.' },
      { name: 'meta.page / perPage', note: 'Where you are in the result set and how large a page is.' },
      { name: 'meta.total / totalPages', note: 'The size of the full result set, so a client can render a pager without fetching everything.' },
      { name: 'links', note: 'Navigation URLs, so a client can follow next and previous without constructing URLs itself.' },
    ],
    notes: [
      'This is the envelope pattern: results wrapped in an object alongside pagination metadata, rather than returned as a bare top-level array. It is the shape most REST frameworks produce and the one worth testing an API client against.',
      'The envelope exists for a practical reason. A response that is a bare array has nowhere to put pagination, rate-limit information or warnings, so adding any of those later becomes a breaking change. Starting with an envelope keeps that door open.',
    ],
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
    fields: [
      { name: 'name', note: 'English country name — display text, not an identifier.' },
      { name: 'code', note: 'ISO 3166-1 alpha-2 code, the field to actually key on.' },
      { name: 'capital', note: 'Single string; a handful of countries genuinely have more than one, which is a nice edge case.' },
      { name: 'currency', note: 'ISO 4217 code.' },
      { name: 'population', note: 'Large integer, rounded here.' },
    ],
    notes: [
      'A small reference table, useful for populating a dropdown, testing a lookup, or seeding a database in a demo.',
      'The lesson in this shape is to key on code rather than name. Country names change, are translated, and are politically contested; the ISO code is stable and unambiguous. The same reasoning applies to any reference data where a human-readable label is tempting to use as a key.',
    ],
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
    fields: [
      { name: 'title / year', note: 'The pair that identifies a film — neither is unique on its own, since remakes share titles.' },
      { name: 'genres', note: 'Array of strings, usually more than one.' },
      { name: 'rating', note: 'Float on a ten-point scale.' },
      { name: 'cast', note: 'Array of names, truncated here to keep the sample readable.' },
    ],
    notes: [
      'A catalogue shape with two arrays in the same record, which makes it a good test for anything that has to flatten repeated values — a CSV converter has to decide what to do with both genres and cast at once.',
      'There is no id field, deliberately. Plenty of real datasets arrive without a primary key and you have to derive one, usually by combining fields such as title and year. Testing against data with no natural key is worth doing before you discover the problem in production.',
    ],
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
    fields: [
      { name: 'location', note: 'Plain place name, not coordinates.' },
      { name: 'current', note: 'Nested object holding the present conditions.' },
      { name: 'current.tempC / windKph', note: 'Numbers with the unit baked into the key name — common in weather APIs and worth noticing.' },
      { name: 'forecast', note: 'Array of day objects, each with a date and a min/max pair.' },
    ],
    notes: [
      'A nested object next to an array of objects, with a sensible real-world meaning for both. Good for testing a dashboard component or a chart that reads a series out of a payload.',
      'The unit-in-the-key convention (tempC rather than temp) is worth copying. It makes a mix-up between Celsius and Fahrenheit a visible mismatch at the field name rather than a silent error in the value, and it survives being passed through systems that know nothing about the data.',
    ],
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
    fields: [
      { name: 'invoiceNumber', note: 'Human-readable string identifier with a year segment.' },
      { name: 'issuedAt', note: 'A date with no time component, unlike the full timestamps elsewhere in this library.' },
      { name: 'customer', note: 'Nested object holding the billing contact.' },
      { name: 'items', note: 'Line items, each with quantity and unit price.' },
      { name: 'subtotal / taxRate / total', note: 'Three values where two are derived from the others — the reason this sample is interesting.' },
    ],
    notes: [
      'A billing document with nested line items and derived totals. Useful for testing a PDF generator, an accounting import, or any calculation that has to agree with values already in the payload.',
      'Every monetary field here is a decimal number, and every one of them is a trap if read as a float. Multiply 10 by 120.0, add 49.0, apply a 0.2 tax rate in binary floating point and the result can end a fraction of a cent away from 1498.8. For money, use a decimal type or integer minor units — this dataset exists partly to make that failure visible.',
    ],
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
