export const exampleJson = {
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "isActive": true,
    "roles": ["admin", "user"],
    "profile": {
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001",
        "country": "USA"
      },
      "preferences": {
        "notifications": true,
        "theme": "dark"
      }
    },
    "orders": [
      {
        "orderId": "ORD-001",
        "items": ["Laptop", "Mouse"],
        "total": 1299.99,
        "date": "2024-01-15"
      },
      {
        "orderId": "ORD-002",
        "items": ["Keyboard"],
        "total": 79.99,
        "date": "2024-02-20"
      }
    ]
  }
};

export const getExampleJsonString = (): string => {
  return JSON.stringify(exampleJson, null, 2);
};
