export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: {
    sections: Array<{
      title: string;
      content: string;
      code?: string;
      subsections?: Array<{
        title: string;
        content: string;
        code?: string;
      }>;
    }>;
  };
  relatedArticles: string[];
}

export const blogArticles: Record<string, BlogArticle> = {
  'understanding-json-guide': {
    id: 'understanding-json-guide',
    title: 'Understanding JSON: A Complete Guide for Developers',
    excerpt: 'Learn everything about JSON from basics to advanced concepts. Understand syntax, data types, best practices, and common use cases in modern web development.',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'What is JSON?',
          content: 'JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that has become the de facto standard for data exchange on the web. Despite its name suggesting a connection to JavaScript, JSON is completely language-independent and can be used with virtually any programming language.\n\nCreated by Douglas Crockford in the early 2000s, JSON was designed to be easy for humans to read and write while being simple for machines to parse and generate. Its simplicity and effectiveness have made it the preferred choice for API responses, configuration files, and data storage across the software development industry.'
        },
        {
          title: 'JSON Syntax Rules',
          content: 'JSON follows a strict set of syntax rules that ensure data can be reliably parsed across different systems:\n\n• Data is represented in name/value pairs\n• Data is separated by commas\n• Curly braces hold objects\n• Square brackets hold arrays\n• String values must be wrapped in double quotes\n• No trailing commas are allowed\n• No comments are supported in standard JSON',
          code: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "email": "john@example.com"
}`
        }
      ]
    },
    relatedArticles: ['json-best-practices', 'common-json-errors']
  },
  'json-best-practices': {
    id: 'json-best-practices',
    title: 'Best Practices for JSON Data Structure Design',
    excerpt: 'Discover proven patterns and anti-patterns for designing efficient, maintainable JSON structures. Learn about naming conventions, nesting strategies, and performance optimization.',
    date: '2024-01-20',
    readTime: '10 min read',
    category: 'Best Practices',
    content: {
      sections: [
        {
          title: 'Naming Conventions',
          content: 'Consistent naming is crucial for maintainable JSON APIs. Choose either camelCase or snake_case and stick with it throughout your entire API. camelCase (firstName, lastName) is more common in JavaScript environments, while snake_case (first_name, last_name) is popular in Python and Ruby communities.\n\nAvoid using spaces, special characters, or starting names with numbers. Keep names descriptive but concise. Instead of "usr_fn" use "userFirstName" or "user_first_name". Your JSON should be self-documenting.',
          code: `{
  "userId": 123,
  "firstName": "Jane",
  "lastName": "Smith",
  "emailAddress": "jane@example.com",
  "accountCreatedAt": "2024-01-15T10:30:00Z"
}`
        },
        {
          title: 'Structure Flattening',
          content: 'While nesting is sometimes necessary, avoid excessive depth in your JSON structures. Deep nesting makes data harder to access and increases parsing complexity. If you find yourself going more than 3-4 levels deep, consider flattening your structure or breaking it into separate resources.\n\nInstead of deeply nested objects, consider using IDs to reference related data. This approach is more scalable and easier to cache.',
          code: `{
  "user": {
    "id": 123,
    "name": "Jane Smith",
    "companyId": 456
  },
  "company": {
    "id": 456,
    "name": "Tech Corp"
  }
}`
        },
        {
          title: 'Data Type Consistency',
          content: 'Always use appropriate data types for your values. Don\'t store numbers as strings ("123" vs 123) unless there\'s a specific reason (like preserving leading zeros). Use booleans for true/false values, not 1/0 or "yes"/"no" strings.\n\nBe consistent with date formats. ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ) is the standard and most widely supported. Avoid timestamps in milliseconds unless necessary, as they\'re less human-readable.',
          code: `{
  "isActive": true,
  "age": 30,
  "balance": 1234.56,
  "createdAt": "2024-01-15T10:30:00Z",
  "tags": ["premium", "verified"]
}`
        },
        {
          title: 'Array Handling',
          content: 'When working with arrays, be consistent about singular vs plural names. Use plural names for arrays (users, not user_list). Include metadata for paginated results, such as total count and page information.\n\nFor large datasets, always implement pagination. Returning thousands of records in a single response is inefficient and can cause performance issues.',
          code: `{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalItems": 100
  }
}`
        },
        {
          title: 'Error Handling',
          content: 'Design a consistent error response format. Include an error code, human-readable message, and optionally detailed information for debugging. This makes it easier for API consumers to handle errors programmatically.\n\nProvide enough context in error messages to help developers understand what went wrong and how to fix it, but avoid exposing sensitive system information.',
          code: `{
  "error": {
    "code": "INVALID_EMAIL",
    "message": "The email address format is invalid",
    "field": "email",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`
        },
        {
          title: 'Null vs Undefined',
          content: 'Decide on a strategy for handling missing values. Should you include fields with null values, or omit them entirely? Both approaches have merits. Including null makes the schema explicit, while omitting fields reduces payload size.\n\nBe consistent across your API. If you choose to omit null values, document this behavior clearly. Consider using null to indicate "explicitly empty" versus omitting fields that don\'t apply.',
          code: `{
  "firstName": "John",
  "middleName": null,
  "lastName": "Doe"
}`
        },
        {
          title: 'Versioning Strategy',
          content: 'Plan for API evolution from the start. Include version information in your JSON responses, either in the URL path (/api/v1/) or in a version field. This allows you to make breaking changes without affecting existing clients.\n\nWhen adding new fields, make them optional and provide sensible defaults. This maintains backward compatibility with older clients that don\'t expect the new fields.',
          code: `{
  "apiVersion": "1.0",
  "data": {
    "userId": 123,
    "name": "Jane Smith"
  }
}`
        },
        {
          title: 'Performance Optimization',
          content: 'Minimize payload size by only including necessary data. Implement field filtering (allowing clients to specify which fields they need) and sparse fieldsets. This reduces bandwidth usage and improves response times.\n\nFor frequently accessed data, consider response compression (gzip) and caching strategies. Include appropriate cache headers in your HTTP responses.',
          code: `{
  "fields": ["id", "name", "email"],
  "data": {
    "id": 123,
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
}`
        }
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-to-csharp-tutorial']
  },
  'json-to-csharp-tutorial': {
    id: 'json-to-csharp-tutorial',
    title: 'How to Convert JSON to C# Classes: Step by Step Tutorial',
    excerpt: 'Complete guide to converting JSON data into C# classes. Learn about data type mapping, handling nullable values, nested objects, and arrays with practical examples.',
    date: '2024-01-25',
    readTime: '12 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Understanding Type Mapping',
          content: 'When converting JSON to C#, understanding how JSON types map to C# types is essential. JSON has six basic types, while C# has a rich type system. Here\'s how they typically map:\n\nJSON strings become C# string, numbers can be int, long, double, or decimal depending on the value, booleans map directly to bool, null maps to nullable types, objects become classes, and arrays become List<T> or arrays.',
          code: `public class User
{
    public string Name { get; set; }
    public int Age { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}`
        },
        {
          title: 'Handling Nested Objects',
          content: 'Nested JSON objects should be represented as separate C# classes. This creates a clear, maintainable structure that reflects your data hierarchy. Each nested object becomes its own class with appropriate properties.\n\nWhen naming nested classes, consider whether they\'ll be reused. If an Address class is specific to User, you might nest the class definition or prefix it (UserAddress). If it\'s generic, keep it as a standalone class.',
          code: `public class User
{
    public string Name { get; set; }
    public Address Address { get; set; }
}

public class Address
{
    public string Street { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
}`
        },
        {
          title: 'Working with Arrays',
          content: 'JSON arrays typically map to C# List<T> or IEnumerable<T> in modern C# development. List<T> is more flexible and commonly used. For read-only scenarios or when exposing properties publicly, consider using IReadOnlyList<T>.\n\nAlways initialize collection properties in the class constructor or with a property initializer to avoid null reference exceptions.',
          code: `public class User
{
    public string Name { get; set; }
    public List<string> Hobbies { get; set; } = new List<string>();
    public List<Order> Orders { get; set; } = new List<Order>();
}`
        },
        {
          title: 'Nullable Value Types',
          content: 'With C# nullable reference types (C# 8.0+), you can make your code more explicit about what can be null. For value types like int or DateTime that might be null in JSON, use the nullable syntax (int?, DateTime?).\n\nFor reference types like string, enable nullable reference types in your project and use string? for properties that might be null. This helps catch potential null reference bugs at compile time.',
          code: `public class User
{
    public string Name { get; set; }
    public string? MiddleName { get; set; }
    public int? Age { get; set; }
    public DateTime? LastLoginDate { get; set; }
}`
        },
        {
          title: 'JSON Property Attributes',
          content: 'Use JSON serialization attributes to handle naming differences between JSON and C#. The JsonPropertyName attribute (System.Text.Json) or JsonProperty (Newtonsoft.Json) lets you map JSON property names to different C# property names.\n\nThis is especially useful when working with APIs that use snake_case or other naming conventions that don\'t match C# conventions.',
          code: `using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("user_id")]
    public int UserId { get; set; }

    [JsonPropertyName("first_name")]
    public string FirstName { get; set; }

    [JsonPropertyName("email_address")]
    public string EmailAddress { get; set; }
}`
        },
        {
          title: 'Deserialization Examples',
          content: 'Once you have your C# classes defined, deserializing JSON is straightforward with System.Text.Json or Newtonsoft.Json. Here\'s how to deserialize JSON strings into C# objects using both libraries.\n\nSystem.Text.Json is the modern, built-in option with good performance. Newtonsoft.Json (Json.NET) is more feature-rich and widely used in existing projects.',
          code: `// Using System.Text.Json
using System.Text.Json;

string json = "{\\"name\\":\\"John\\",\\"age\\":30}";
User user = JsonSerializer.Deserialize<User>(json);

// Using Newtonsoft.Json
using Newtonsoft.Json;

string json = "{\\"name\\":\\"John\\",\\"age\\":30}";
User user = JsonConvert.DeserializeObject<User>(json);`
        },
        {
          title: 'Best Practices',
          content: 'When generating C# classes from JSON, follow these best practices:\n\n• Use PascalCase for class and property names (C# convention)\n• Initialize collection properties to avoid null checks\n• Use appropriate access modifiers (public for DTOs usually)\n• Add XML documentation comments for complex properties\n• Consider using records for immutable data\n• Use nullable types appropriately\n• Keep classes in separate files for maintainability\n• Add validation attributes when appropriate',
          code: `/// <summary>
/// Represents a user in the system
/// </summary>
public record User
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public List<string> Roles { get; init; } = new();
}`
        }
      ]
    },
    relatedArticles: ['nested-json-csharp', 'json-best-practices']
  },
  'common-json-errors': {
    id: 'common-json-errors',
    title: 'Common JSON Formatting Errors and How to Fix Them',
    excerpt: 'Troubleshoot the most common JSON errors developers encounter. Learn to identify and fix syntax errors, trailing commas, quote issues, and invalid data types.',
    date: '2024-02-01',
    readTime: '7 min read',
    category: 'Troubleshooting',
    content: {
      sections: [
        {
          title: 'Missing Commas',
          content: 'One of the most common JSON errors is forgetting commas between properties or array elements. Every property in an object (except the last one) must be followed by a comma. The same applies to array elements.\n\nThis error often occurs when adding or removing properties during development. Always double-check that commas are properly placed between elements.',
          code: `// ❌ Wrong - missing comma
{
  "name": "John"
  "age": 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Trailing Commas',
          content: 'While JavaScript allows trailing commas in objects and arrays, standard JSON does not. A comma after the last property in an object or last element in an array will cause a parsing error in most JSON parsers.\n\nThis is a common mistake when copying code from JavaScript to JSON configuration files.',
          code: `// ❌ Wrong - trailing comma
{
  "name": "John",
  "age": 30,
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Single Quotes Instead of Double Quotes',
          content: 'JSON requires double quotes for both property names and string values. Single quotes, which are valid in JavaScript, will cause JSON parsing to fail. This is one of the most frequent errors when developers used to JavaScript try to write JSON.\n\nAlways use double quotes, even for property names. Both keys and string values must be wrapped in double quotes.',
          code: `// ❌ Wrong - single quotes
{
  'name': 'John',
  'age': 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Unquoted Property Names',
          content: 'In JSON, all property names must be enclosed in double quotes. JavaScript allows unquoted property names in object literals, but JSON does not. This is a strict requirement that catches many developers off guard.\n\nAlways wrap your property names in double quotes, regardless of whether they contain special characters or spaces.',
          code: `// ❌ Wrong - unquoted properties
{
  name: "John",
  age: 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Comments in JSON',
          content: 'Standard JSON does not support comments. If you try to add // or /* */ comments in your JSON file, parsing will fail. This is different from JavaScript and catches many developers by surprise.\n\nIf you need to document your JSON, consider using a separate documentation file or using tools that support JSON with comments (JSONC) during development, then strip comments for production.',
          code: `// ❌ Wrong - contains comments
{
  // User information
  "name": "John",
  "age": 30
}

// ✓ Correct
{
  "name": "John",
  "age": 30
}`
        },
        {
          title: 'Incorrect Boolean or Null Values',
          content: 'Boolean values in JSON must be lowercase: true or false, not True or False. Similarly, null must be lowercase. Using capitalized versions or alternative representations (like None) will cause parsing errors.\n\nThis error commonly occurs when converting from languages like Python that use capitalized boolean values.',
          code: `// ❌ Wrong - capitalized
{
  "isActive": True,
  "value": None
}

// ✓ Correct
{
  "isActive": true,
  "value": null
}`
        },
        {
          title: 'Unescaped Special Characters',
          content: 'Special characters in strings must be properly escaped. Quotes, backslashes, and control characters need escape sequences. Forgetting to escape quotes inside string values is a common error.\n\nCommon escape sequences: \\" for quotes, \\\\ for backslash, \\n for newline, \\t for tab, \\r for carriage return.',
          code: `// ❌ Wrong - unescaped quotes
{
  "message": "He said "hello""
}

// ✓ Correct
{
  "message": "He said \\"hello\\""
}`
        },
        {
          title: 'Invalid Number Formats',
          content: 'JSON numbers must follow specific format rules. Leading zeros are not allowed (except for 0.x), NaN and Infinity are not valid JSON values, and hexadecimal notation is not supported.\n\nIf you need to represent special numeric values, use strings or null, and document the convention.',
          code: `// ❌ Wrong
{
  "value": 0123,
  "infinity": Infinity,
  "notNumber": NaN
}

// ✓ Correct
{
  "value": 123,
  "infinity": null,
  "notNumber": null
}`
        },
        {
          title: 'Mismatched Brackets',
          content: 'Every opening bracket must have a corresponding closing bracket. Mismatched brackets are common in nested structures and cause parsing to fail. This includes both square brackets for arrays and curly braces for objects.\n\nUsing a code editor with bracket matching or a JSON formatter can help identify these errors quickly.',
          code: `// ❌ Wrong - missing closing brace
{
  "user": {
    "name": "John",
    "address": {
      "city": "NYC"
    }
}

// ✓ Correct
{
  "user": {
    "name": "John",
    "address": {
      "city": "NYC"
    }
  }
}`
        }
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-best-practices']
  },
  'nested-json-csharp': {
    id: 'nested-json-csharp',
    title: 'Working with Nested JSON Objects in C#',
    excerpt: 'Master the art of handling complex, deeply nested JSON structures in C#. Learn about deserialization, navigation, and best practices for working with hierarchical data.',
    date: '2024-02-10',
    readTime: '15 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'Understanding Nested Structures',
          content: 'Nested JSON objects represent hierarchical relationships in your data. In C#, these translate to classes that contain other classes as properties. Understanding how to model these relationships correctly is crucial for working with complex APIs and data structures.\n\nWhen dealing with nested JSON, you need to create a class hierarchy that mirrors the JSON structure. Each level of nesting typically corresponds to a separate class, making your code more maintainable and type-safe.',
          code: `{
  "user": {
    "id": 123,
    "profile": {
      "firstName": "Jane",
      "lastName": "Doe",
      "contact": {
        "email": "jane@example.com",
        "phone": "+1234567890"
      }
    }
  }
}`
        },
        {
          title: 'Creating Class Hierarchies',
          content: 'For nested JSON, create a class for each level of nesting. Start from the innermost objects and work outward. Each class should be self-contained and reusable if possible.\n\nConsider whether nested classes should be separate types or nested class definitions. Separate files are better for classes used in multiple places, while nested class definitions work well for types specific to a parent class.',
          code: `public class Contact
{
    public string Email { get; set; }
    public string Phone { get; set; }
}

public class Profile
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Contact Contact { get; set; }
}

public class UserData
{
    public int Id { get; set; }
    public Profile Profile { get; set; }
}`
        },
        {
          title: 'Handling Deeply Nested Arrays',
          content: 'When JSON contains arrays at multiple levels, use List<T> for collections and create appropriate class models. Each array element type needs its own class definition if it contains multiple properties.\n\nFor arrays of simple types (strings, numbers), use List<string> or List<int>. For arrays of objects, create a class for the object type and use List<YourClass>.',
          code: `public class Order
{
    public int OrderId { get; set; }
    public List<LineItem> Items { get; set; }
}

public class LineItem
{
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public List<string> Tags { get; set; }
}`
        },
        {
          title: 'Safe Property Access',
          content: 'When working with nested objects, null reference exceptions are a common problem. Use null-conditional operators (?.) and null-coalescing operators (??) to safely navigate nested structures.\n\nC# nullable reference types (enabled with #nullable enable) help catch potential null reference issues at compile time. Mark properties as nullable (?) when they might not be present in the JSON.',
          code: `// Safe property access
string? email = userData?.Profile?.Contact?.Email;
string displayName = userData?.Profile?.FirstName ?? "Guest";

// Null checking before access
if (userData?.Profile?.Contact != null)
{
    Console.WriteLine(userData.Profile.Contact.Email);
}`
        },
        {
          title: 'Deserialization Strategies',
          content: 'When deserializing complex nested JSON, you can deserialize the entire structure at once or use selective deserialization for specific parts. For very large JSON documents, consider streaming APIs for better memory efficiency.\n\nSystem.Text.Json and Newtonsoft.Json both handle nested objects automatically. Just ensure your class structure matches the JSON hierarchy.',
          code: `using System.Text.Json;

string json = File.ReadAllText("complex-data.json");
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};

UserData userData = JsonSerializer.Deserialize<UserData>(json, options);

// Access nested data
string email = userData.Profile.Contact.Email;`
        },
        {
          title: 'Working with Dynamic Structures',
          content: 'Sometimes you don\'t know the structure ahead of time or it varies. You can use JsonDocument or JObject for dynamic JSON parsing. This is useful for APIs with variable responses or when exploring unfamiliar JSON structures.\n\nDynamic parsing trades type safety for flexibility. Use it when necessary, but prefer strongly-typed classes when the structure is known.',
          code: `using System.Text.Json;

string json = "{\\"user\\": {\\"profile\\": {\\"email\\": \\"test@example.com\\"}}}";
using JsonDocument doc = JsonDocument.Parse(json);

// Navigate dynamically
if (doc.RootElement.TryGetProperty("user", out JsonElement user))
{
    if (user.TryGetProperty("profile", out JsonElement profile))
    {
        if (profile.TryGetProperty("email", out JsonElement email))
        {
            Console.WriteLine(email.GetString());
        }
    }
}`
        },
        {
          title: 'Performance Considerations',
          content: 'For large nested structures, be mindful of memory usage and deserialization performance. Consider using streaming deserialization for very large files, implement lazy loading for deeply nested data that might not always be needed, and use records instead of classes for immutable data structures.\n\nProfile your application to identify performance bottlenecks. Sometimes breaking large JSON into smaller chunks or using pagination is better than processing everything at once.',
          code: `// Using record for immutable nested data
public record ContactInfo(string Email, string Phone);

public record UserProfile(
    string FirstName,
    string LastName,
    ContactInfo Contact
);`
        },
        {
          title: 'Error Handling',
          content: 'When deserializing nested JSON, implement proper error handling. Missing properties, type mismatches, and malformed JSON can all cause exceptions. Catch specific exceptions and provide meaningful error messages.\n\nUse try-catch blocks around deserialization code and validate the structure before accessing deeply nested properties.',
          code: `try
{
    UserData userData = JsonSerializer.Deserialize<UserData>(json);

    if (userData?.Profile?.Contact?.Email == null)
    {
        throw new InvalidDataException("Email is required");
    }

    // Process data...
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON parsing error: {ex.Message}");
}
catch (InvalidDataException ex)
{
    Console.WriteLine($"Validation error: {ex.Message}");
}`
        }
      ]
    },
    relatedArticles: ['json-to-csharp-tutorial', 'common-json-errors']
  }
};
