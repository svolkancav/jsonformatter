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
    date: '2025-01-15',
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
    date: '2025-01-20',
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
  "accountCreatedAt": "2025-01-15T10:30:00Z"
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
  "createdAt": "2025-01-15T10:30:00Z",
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
    "timestamp": "2025-01-15T10:30:00Z"
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
    date: '2025-01-25',
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
    date: '2025-02-01',
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
    date: '2025-02-10',
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
  },
  'json-vs-xml-yaml': {
    id: 'json-vs-xml-yaml',
    title: 'JSON vs XML vs YAML: Choosing the Right Data Format',
    excerpt: 'A practical comparison of JSON, XML, and YAML covering syntax, readability, performance, and the situations where each format is the best choice.',
    date: '2025-02-18',
    readTime: '9 min read',
    category: 'Comparison',
    content: {
      sections: [
        {
          title: 'Three Formats, Three Philosophies',
          content: 'JSON, XML, and YAML all solve the same fundamental problem: representing structured data as text that both humans and machines can work with. But they were designed with different priorities. JSON optimizes for simplicity and direct mapping to programming data structures. XML optimizes for document markup, extensibility, and rigorous validation. YAML optimizes for human readability and hand-editing.\n\nChoosing the wrong format rarely makes a project fail, but choosing the right one removes friction. The goal of this guide is to help you match the format to the job rather than defaulting to whatever you used last time.'
        },
        {
          title: 'Syntax Side by Side',
          content: 'The same data looks very different in each format. Notice how JSON uses braces and quotes, XML uses opening and closing tags, and YAML uses indentation with almost no punctuation:',
          code: `// JSON
{ "user": { "name": "Ada", "active": true } }

<!-- XML -->
<user>
  <name>Ada</name>
  <active>true</active>
</user>

# YAML
user:
  name: Ada
  active: true`
        },
        {
          title: 'When to Use JSON',
          content: 'JSON is the right default for almost all web APIs and for data exchanged between services. It maps directly onto objects and arrays in every mainstream language, parses extremely fast, and has near-universal library support. Its lack of comments and strict syntax are actually advantages for machine-to-machine communication, where predictability matters more than annotation.\n\nReach for JSON when you are building or consuming REST APIs, storing structured data in a database column, or passing data between a frontend and backend.'
        },
        {
          title: 'When to Use XML',
          content: 'XML still dominates in domains that need rich document structure, namespaces, attributes, and formal schema validation. SOAP web services, office document formats, RSS feeds, and many enterprise and government systems are built on XML. If you need to validate documents against a strict schema (XSD) or mix structured data with free-form markup, XML remains a strong choice.'
        },
        {
          title: 'When to Use YAML',
          content: 'YAML shines for configuration files that humans edit by hand. Its clean, indentation-based syntax makes files like CI pipelines, Kubernetes manifests, and application config pleasant to read and write. The trade-off is that YAML is whitespace-sensitive and has subtle parsing rules, so it is less suited to machine-generated data or high-volume data exchange.'
        },
        {
          title: 'Quick Decision Guide',
          content: '• Building an API or exchanging data between services? Use JSON.\n• Need document markup, namespaces, or strict schema validation? Use XML.\n• Writing configuration that people edit by hand? Use YAML.\n\nBecause these formats are interconvertible, you can also use the right one at each layer — for example, edit configuration in YAML but serve data over an API in JSON.'
        }
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-vs-toml-config']
  },
  'understanding-toon-llm': {
    id: 'understanding-toon-llm',
    title: 'What Is TOON? Cutting LLM Token Costs with Token-Oriented Notation',
    excerpt: 'Learn how TOON (Token-Oriented Object Notation) represents structured data in fewer tokens than JSON, lowering cost and saving context when working with large language models.',
    date: '2025-02-25',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Tokens Matter for LLMs',
          content: 'Large language models do not read characters or words — they read tokens, chunks of text that the model bills and budgets by. Every prompt you send and every response you receive is measured in tokens, and both your costs and the model’s limited context window are denominated in them.\n\nWhen you feed structured data into a prompt — a product catalog, a set of records, a configuration — the way that data is serialized directly affects how many tokens it consumes. JSON is convenient but verbose: every key is repeated for every object, and braces, quotes, and commas all cost tokens. TOON was created to address exactly this overhead.'
        },
        {
          title: 'How TOON Saves Tokens',
          content: 'TOON (Token-Oriented Object Notation) represents the same logical data as JSON but strips away repetition and redundant punctuation. For arrays of uniform objects, instead of repeating each key in every element, it can declare the keys once and then list the values. The result is a denser document that encodes the same information in noticeably fewer tokens.\n\nThe savings grow with the size and regularity of your data. A handful of fields makes little difference, but a large array of similarly shaped records can shrink substantially — which translates directly into lower API costs and more room in the context window for reasoning.'
        },
        {
          title: 'A Practical Round Trip',
          content: 'The typical workflow is to keep your data in JSON everywhere in your application, convert it to TOON only at the moment you build a prompt, and convert any TOON the model returns back into JSON for the rest of your system to consume. This keeps the token savings localized to the model boundary without forcing your whole stack to understand a new format.',
          code: `// Application data (JSON)
[
  { "id": 1, "name": "Ada", "role": "admin" },
  { "id": 2, "name": "Linus", "role": "editor" }
]

// Converted to TOON for the prompt — keys declared once,
// values listed compactly, fewer tokens overall.`
        },
        {
          title: 'When TOON Is Worth It',
          content: 'TOON is most valuable when you are sending sizable, repetitive structured data into a model and you are sensitive to cost or bumping against context limits. For small payloads the overhead of converting is not worth it, and for normal application or API work plain JSON remains the right choice. Think of TOON as an optimization you apply at the LLM boundary, not a wholesale replacement for JSON.'
        },
        {
          title: 'Trying It Yourself',
          content: 'The easiest way to understand TOON is to convert a real dataset and compare. Paste a JSON array into our JSON to TOON converter, look at the compact result, and then convert it back with the TOON to JSON tool to confirm the round trip is lossless. Seeing the difference on your own data makes the token savings concrete.'
        }
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-vs-xml-yaml']
  },
  'json-vs-toml-config': {
    id: 'json-vs-toml-config',
    title: 'JSON vs TOML for Configuration Files',
    excerpt: 'When should you use JSON and when should you reach for TOML in your configuration files? A clear breakdown of readability, comments, data types, and tooling.',
    date: '2025-03-04',
    readTime: '7 min read',
    category: 'Comparison',
    content: {
      sections: [
        {
          title: 'Configuration Is Read by Humans',
          content: 'Unlike data exchanged between services, configuration files are usually written and edited by people. That changes the priorities: readability, the ability to leave comments, and forgiving syntax matter more than parsing speed or compactness. This is the context in which TOML was designed, and where it often beats JSON.'
        },
        {
          title: 'The Comment Problem',
          content: 'Standard JSON does not allow comments. For a configuration file this is a real limitation — you cannot explain why a value is set the way it is, or temporarily disable a setting by commenting it out. TOML supports comments natively with the # character, which makes config files self-documenting.',
          code: `# TOML — comments are allowed
[server]
port = 8080      # default development port
debug = true

{
  "server": {
    "port": 8080,
    "debug": true
  }
}
// JSON has no place for that explanatory note`
        },
        {
          title: 'Readability of Nested Data',
          content: 'TOML uses named tables (sections in square brackets) that read naturally for grouped settings, whereas deeply nested JSON quickly becomes a thicket of braces. For flat or shallow configuration, TOML tends to be easier to scan. That said, for deeply nested or highly dynamic structures, JSON’s explicit nesting can actually be clearer than TOML’s table syntax.'
        },
        {
          title: 'Tooling and Ecosystem',
          content: 'JSON has the broadest support of any format — every language parses it out of the box. TOML is the configuration standard for modern toolchains like Rust’s Cargo and Python’s packaging (pyproject.toml), and has solid library support, though not quite JSON’s ubiquity. If your ecosystem already expects one format, follow that convention rather than fighting it.'
        },
        {
          title: 'Choosing Between Them',
          content: 'Use TOML when humans edit the file regularly and benefit from comments and clear sections — application config, tool settings, project metadata. Use JSON when the file is generated or consumed by code, when you need maximum tooling compatibility, or when the structure is deeply nested. And remember you can convert between them at any time: edit in TOML, then convert to JSON for your build pipeline if needed.'
        }
      ]
    },
    relatedArticles: ['json-vs-xml-yaml', 'json-best-practices']
  },
  'parsing-large-json-files': {
    id: 'parsing-large-json-files',
    title: 'How to Parse and Process Large JSON Files Efficiently',
    excerpt: 'Strategies for handling JSON files too big to fit comfortably in memory, including streaming parsers, chunking, and practical performance tips.',
    date: '2025-03-12',
    readTime: '10 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'When JSON Gets Too Big',
          content: 'Most JSON is small enough that you can read the whole file, parse it into memory, and work with the result. But once files reach hundreds of megabytes or gigabytes — export dumps, logs, large datasets — loading everything at once can exhaust memory and freeze your application. Handling large JSON well requires a different approach: process the data as it streams in, rather than all at once.'
        },
        {
          title: 'The Problem with JSON.parse',
          content: 'A call like JSON.parse(hugeString) must hold the entire input string and the entire resulting object in memory simultaneously. For a 2 GB file that can mean needing several gigabytes of RAM, and the parse blocks your thread until it finishes. This is fine for typical payloads and fatal for very large ones.'
        },
        {
          title: 'Streaming Parsers',
          content: 'A streaming parser reads the input incrementally and emits events or values as it encounters them, so you never hold the whole document in memory. In Node.js, libraries like stream-json or clarinet let you process one record at a time as it arrives. The key insight is that most large JSON files are an array of many similar objects, and you rarely need them all in memory at once — you need to do something with each one and move on.',
          code: `// Node.js: process a huge array one item at a time
const { parser } = require('stream-json');
const { streamArray } = require('stream-json/streamers/StreamArray');
const fs = require('fs');

fs.createReadStream('huge.json')
  .pipe(parser())
  .pipe(streamArray())
  .on('data', ({ value }) => {
    // handle one record; it is garbage-collected after
    processRecord(value);
  });`
        },
        {
          title: 'Newline-Delimited JSON (NDJSON)',
          content: 'If you control how the data is produced, consider NDJSON — one JSON object per line. It is trivially streamable: read the file line by line and parse each line independently, with no special parser required. Many data pipelines and logging systems use this format precisely because it scales to enormous sizes while staying simple.',
          code: `{"id":1,"name":"Ada"}
{"id":2,"name":"Linus"}
{"id":3,"name":"Grace"}
// Each line is independent valid JSON`
        },
        {
          title: 'Practical Tips',
          content: '• Process and discard each record as you go; do not accumulate everything in an array.\n• Prefer streaming or NDJSON over loading the full document for files above a few hundred megabytes.\n• If you only need part of the data, filter during the stream so you keep just what matters.\n• For one-off inspection of a large but not enormous file, our online viewer can format multi-megabyte JSON directly in the browser.\n• Move heavy parsing off the main thread (a worker) so your UI or server stays responsive.'
        }
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-best-practices']
  },
  'json-schema-validation-guide': {
    id: 'json-schema-validation-guide',
    title: 'JSON Schema: Validating Your Data Structure',
    excerpt: 'An introduction to JSON Schema — how to describe the shape of your JSON, enforce required fields and types, and catch bad data before it causes bugs.',
    date: '2025-03-20',
    readTime: '11 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Validation Matters',
          content: 'Valid JSON syntax only guarantees that your data parses — not that it contains the right fields, types, or values. An API might return perfectly valid JSON that is missing a required field or has a string where your code expects a number. JSON Schema lets you describe what correct data looks like and automatically check real data against that description, turning a whole class of runtime bugs into clear, early validation errors.'
        },
        {
          title: 'A Basic Schema',
          content: 'A JSON Schema is itself a JSON document. It describes the expected type of each field, which fields are required, and constraints on their values. Here is a schema for a simple user object:',
          code: `{
  "type": "object",
  "properties": {
    "id":    { "type": "integer" },
    "name":  { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "age":   { "type": "integer", "minimum": 0 }
  },
  "required": ["id", "name", "email"]
}`
        },
        {
          title: 'Common Keywords',
          content: '• type — the expected data type (string, number, integer, boolean, object, array, null).\n• required — the list of properties that must be present.\n• properties — the schema for each named field.\n• minimum / maximum — numeric bounds.\n• minLength / maxLength / pattern — string constraints, including regular expressions.\n• enum — restricts a value to a fixed set of options.\n• items — the schema each element of an array must satisfy.'
        },
        {
          title: 'Validating in Code',
          content: 'You do not validate by hand — you use a validator library that takes your schema and your data and reports any violations. In JavaScript, Ajv is the de facto standard; most languages have an equivalent. The validator returns either success or a list of precise errors describing what failed and where.',
          code: `import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(schema);

if (!validate(data)) {
  console.log(validate.errors); // exactly what is wrong
}`
        },
        {
          title: 'Where to Use It',
          content: 'JSON Schema is most valuable at the boundaries of your system: validating incoming API request bodies, checking configuration files at startup, verifying responses from third-party services, and documenting the contract between a frontend and backend. By rejecting malformed data at the edge, you keep the inside of your application clean and prevent bad data from spreading into bugs that are hard to trace.'
        }
      ]
    },
    relatedArticles: ['json-best-practices', 'common-json-errors']
  },
  'json-rest-api-design': {
    id: 'json-rest-api-design',
    title: 'Designing JSON REST API Responses: Patterns and Conventions',
    excerpt: 'Proven conventions for structuring JSON responses in REST APIs — consistent envelopes, error formats, pagination, and naming that clients can rely on.',
    date: '2025-03-28',
    readTime: '10 min read',
    category: 'Best Practices',
    content: {
      sections: [
        {
          title: 'Consistency Is the Whole Game',
          content: 'The single most important property of a good API is consistency. When every endpoint shapes its responses the same way — the same envelope, the same error format, the same naming convention — clients can write generic handling code and developers can predict the response without reading the docs every time. Most API design debates matter far less than simply picking conventions and applying them everywhere.'
        },
        {
          title: 'A Predictable Response Envelope',
          content: 'Many APIs wrap their payload in a consistent envelope so that data, metadata, and errors always live in known places. A common pattern returns the resource under a data key, with optional meta for things like pagination:',
          code: `{
  "data": [
    { "id": 1, "title": "First" },
    { "id": 2, "title": "Second" }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 137
  }
}`
        },
        {
          title: 'A Standard Error Format',
          content: 'Errors deserve as much design attention as success responses. A good error body includes a stable machine-readable code, a human-readable message, and ideally a pointer to the offending field. Pair this with correct HTTP status codes — 400 for bad input, 401/403 for auth, 404 for missing resources, 422 for validation failures, 500 for server errors.',
          code: `{
  "error": {
    "code": "validation_failed",
    "message": "The email field is required.",
    "field": "email"
  }
}`
        },
        {
          title: 'Naming and Types',
          content: 'Pick one casing convention and never mix: camelCase suits JavaScript clients, snake_case is common in many backends — either works, consistency is what matters. Use real JSON types rather than stringifying everything: numbers as numbers, booleans as true/false, and ISO 8601 strings for dates (for example 2025-03-28T10:00:00Z). Avoid returning null and an absent key interchangeably; decide what each means and be consistent.'
        },
        {
          title: 'Pagination and Evolution',
          content: 'For collections, always paginate from the start — returning unbounded arrays will eventually break under real data volumes. Expose page size and total counts in the meta section so clients can build navigation. Finally, design for change: add new fields rather than repurposing old ones, and treat removing or renaming a field as a breaking change that warrants a new API version.'
        }
      ]
    },
    relatedArticles: ['json-best-practices', 'json-schema-validation-guide']
  },
  'convert-json-to-excel-guide': {
    id: 'convert-json-to-excel-guide',
    title: 'How to Convert JSON to Excel: A Complete Guide',
    excerpt: 'Turn JSON data into clean Excel spreadsheets your whole team can use. Learn how arrays map to rows, how to flatten nested data, and how to avoid common pitfalls.',
    date: '2025-04-05',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Convert JSON to Excel',
          content: 'JSON is the language of APIs and code, but spreadsheets are the language of business. When you need to hand a dataset to an analyst, a manager, or a client, an Excel file they can sort, filter, and chart is far more useful than a block of JSON. Converting JSON to Excel bridges the gap between your technical data and the people who need to read it.'
        },
        {
          title: 'How Arrays Become Rows',
          content: 'The cleanest JSON to convert is an array of flat objects. Each object becomes a row, and each property name becomes a column header. Given the array below, you get a two-column sheet with a header row and one row per object:',
          code: `[
  { "name": "Ada",   "age": 36 },
  { "name": "Linus", "age": 54 },
  { "name": "Grace", "age": 41 }
]
// becomes:
// name  | age
// Ada   | 36
// Linus | 54
// Grace | 41`
        },
        {
          title: 'Handling Nested Data',
          content: 'Real JSON is often nested, and spreadsheets are flat. The common solution is to flatten nested objects into dotted column names — an address object with a city field becomes an address.city column. Arrays of values can be joined into a single cell, or, if they represent separate records, broken out into their own sheet. Deciding how to flatten is the main design choice when converting complex JSON.'
        },
        {
          title: 'Step by Step',
          content: '1. Make sure your JSON is an array of objects with consistent keys.\n2. Paste it into our JSON to Excel converter.\n3. Review the detected columns to confirm the mapping looks right.\n4. Download the generated .xlsx file.\n5. Open it in Excel, Google Sheets, or Numbers and verify the data.\n\nBecause the conversion runs entirely in your browser, even confidential data never leaves your device.'
        },
        {
          title: 'Common Pitfalls',
          content: '• Inconsistent keys across objects produce sparse columns — normalize your data first so every object has the same fields.\n• Deeply nested structures may need flattening or splitting into multiple sheets to stay readable.\n• Numbers stored as strings in JSON will arrive as text in Excel; convert them to real numbers if you plan to do math.\n• Very large datasets can be slow to open in a spreadsheet; consider CSV for bulk imports instead. You can also convert Excel back to JSON when you need to bring edited data back into your application.'
        }
      ]
    },
    relatedArticles: ['understanding-json-guide', 'json-best-practices']
  },
  'json-parse-error-unexpected-token': {
    id: 'json-parse-error-unexpected-token',
    title: 'How to Fix "Unexpected token in JSON" and Other Parse Errors',
    excerpt: 'Decode the most-searched JSON parse errors — "Unexpected token < in JSON at position 0", "Unexpected end of JSON input" and more — and learn exactly how to fix each one.',
    date: '2025-04-14',
    readTime: '9 min read',
    category: 'Troubleshooting',
    content: {
      sections: [
        {
          title: 'Why These Errors Appear',
          content: 'Almost every developer has pasted a cryptic error like "Unexpected token < in JSON at position 0" into a search engine. These messages come from JSON.parse() (or a library built on it) when the text you handed it is not valid JSON. The parser reads until it hits a character it cannot make sense of, then reports the offending token and its position. The message looks scary but it is precise: it tells you exactly where parsing broke.',
        },
        {
          title: '"Unexpected token < in JSON at position 0"',
          content: 'This is the single most common one, and it almost never means your JSON is malformed — it means you are not receiving JSON at all. Position 0 with a < character means the very first byte is an HTML tag. Your fetch call got back an HTML page (usually a 404 or 500 error page, a login redirect, or a proxy error) instead of the JSON API response. Check the actual response body and HTTP status before parsing:',
          code: `const res = await fetch('/api/data');
if (!res.ok) throw new Error('HTTP ' + res.status);
const text = await res.text();
console.log(text.slice(0, 200)); // see what really came back
const data = JSON.parse(text);   // parse only once you trust it`,
        },
        {
          title: '"Unexpected end of JSON input"',
          content: 'This means the parser reached the end of the string before the structure was complete — an unclosed brace or bracket, or an empty string. Common causes: the response body was empty (a 204 No Content, or a failed request), the JSON was truncated in transit, or you called JSON.parse("") on an empty value. Guard against empty input and make sure every { and [ has a matching } and ].',
        },
        {
          title: 'Other Frequent Culprits',
          content: '• "Unexpected token \\047 in JSON" — you used single quotes; JSON requires double quotes.\n• "Unexpected token } in JSON" — a trailing comma before the closing brace or bracket.\n• "Unexpected non-whitespace character after JSON" — you have two JSON values concatenated, or extra text after the object.\n• "Unexpected token o in JSON at position 1" — you passed an object to JSON.parse() that was already an object (it got stringified to "[object Object]"); you probably meant to skip parsing.',
        },
        {
          title: 'The Fastest Way to Locate the Problem',
          content: 'When the position number is not enough, paste the raw text into our JSON formatter or validator. It highlights the exact line and character where the structure breaks and names the specific issue — missing comma, unquoted key, wrong quote style — which is far quicker than counting brackets by hand. Once it validates cleanly there, it will parse cleanly in your code.',
        },
      ],
    },
    relatedArticles: ['common-json-errors', 'json-schema-validation-guide'],
  },
  'json-array-to-csv': {
    id: 'json-array-to-csv',
    title: 'How to Convert a JSON Array to CSV',
    excerpt: 'Turn an array of JSON objects into clean CSV — learn how keys map to columns, how to handle nested fields and commas, and the fastest way to do it online.',
    date: '2025-04-22',
    readTime: '7 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'Why Convert JSON to CSV',
          content: 'CSV is the lingua franca of data import: spreadsheets, databases, BI tools, and countless scripts all accept it. When you have an array of JSON objects — an API export, a query result, a log dump — converting it to CSV lets you open it in Excel, load it into a database, or feed it to a data pipeline without writing any parsing code.',
        },
        {
          title: 'How the Mapping Works',
          content: 'The conversion is conceptually simple: each object in the array becomes one row, and the union of all object keys becomes the header row of columns. Given a clean array of flat objects, the result is a tidy table:',
          code: `[
  { "id": 1, "name": "Ada",   "city": "London" },
  { "id": 2, "name": "Linus", "city": "Helsinki" }
]

// becomes
id,name,city
1,Ada,London
2,Linus,Helsinki`,
        },
        {
          title: 'Handling Commas, Quotes, and Newlines',
          content: 'CSV breaks if a value itself contains a comma, a double quote, or a line break. The rule (RFC 4180) is to wrap such values in double quotes and escape any internal double quote by doubling it. A value like Smith, John becomes "Smith, John". A good converter does this automatically — doing it by hand with a naive join(",") is the number-one cause of corrupted CSV.',
          code: `// value: He said "hi", then left
// correct CSV cell:
"He said ""hi"", then left"`,
        },
        {
          title: 'What About Nested Objects?',
          content: 'CSV is flat, so nested JSON needs a strategy. The usual approach is to flatten nested keys with a separator — user.name becomes a user.name column — or to serialize the nested part back to a JSON string inside a single cell. Arrays of objects that represent separate records are better split into their own file. If your data is deeply nested, flatten it first (see our guide on flattening nested JSON).',
        },
        {
          title: 'The Quick Way',
          content: 'Rather than writing a script, paste your array into our Excel/CSV converters — they detect the columns, escape special characters correctly, and give you a downloadable file in seconds. For a spreadsheet instead of raw CSV, the JSON to Excel converter produces an .xlsx directly.',
        },
      ],
    },
    relatedArticles: ['convert-json-to-excel-guide', 'flatten-nested-json'],
  },
  'flatten-nested-json': {
    id: 'flatten-nested-json',
    title: 'How to Flatten Nested JSON Objects',
    excerpt: 'Flattening turns deeply nested JSON into a single-level structure with dotted keys — essential for CSV, spreadsheets, and tables. Learn the patterns and edge cases.',
    date: '2025-04-30',
    readTime: '8 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'What "Flattening" Means',
          content: 'Flattening converts a nested JSON structure into a single-level object where nested paths become compound keys, usually joined by dots. It is the step that makes hierarchical JSON fit into flat formats like CSV, Excel, or a database table. Understanding it well is the difference between a clean export and a mangled one.',
          code: `// nested
{ "user": { "name": "Ada", "address": { "city": "London" } } }

// flattened
{ "user.name": "Ada", "user.address.city": "London" }`,
        },
        {
          title: 'The Basic Algorithm',
          content: 'Flattening is a recursive walk: for each key, if the value is a plain object, recurse into it while building up the prefix; otherwise, record the value at the accumulated key. The result is a flat map from dotted paths to leaf values.',
          code: `function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? prefix + '.' + k : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, out);
    } else {
      out[key] = v;
    }
  }
  return out;
}`,
        },
        {
          title: 'Handling Arrays',
          content: 'Arrays are the tricky part, and there is no single right answer. Three common strategies: (1) index the array into the key — items.0.sku, items.1.sku — which keeps everything in one row but explodes the column count; (2) join primitive arrays into one cell — tags becomes "red;green;blue"; or (3) if each array element is really a separate record, break it out into its own set of rows. Pick based on how you will consume the output.',
        },
        {
          title: 'Common Pitfalls',
          content: '• Key collisions: if a real key already contains a dot, dotted flattening becomes ambiguous — choose a separator your data does not use.\n• Losing types: flattening for CSV turns everything into text, so numbers and booleans may need re-typing downstream.\n• Sparse columns: different objects with different nested shapes produce many mostly-empty columns; normalize your data first if possible.',
        },
        {
          title: 'When You Just Need the Result',
          content: 'If your goal is simply to get nested JSON into a spreadsheet, our JSON to Excel converter flattens nested objects into dotted columns for you automatically — no code required. Use the manual approach above when you need custom control over how arrays and collisions are handled.',
        },
      ],
    },
    relatedArticles: ['json-array-to-csv', 'convert-json-to-excel-guide'],
  },
  'minify-json-guide': {
    id: 'minify-json-guide',
    title: 'How to Minify JSON (and When You Actually Should)',
    excerpt: 'Minifying JSON strips whitespace to shrink payloads and speed up APIs. Learn how it works, how much it saves, and when to minify versus keep JSON readable.',
    date: '2025-05-08',
    readTime: '6 min read',
    category: 'Tutorial',
    content: {
      sections: [
        {
          title: 'What Minifying Does',
          content: 'Minifying JSON removes every character that a parser does not need: indentation, line breaks, and the spaces after colons and commas. The data is completely unchanged — only the formatting whitespace is gone. The result is a single dense line that is harder for humans to read but smaller and faster for machines to transfer and parse.',
          code: `// formatted (readable)
{
  "id": 1,
  "name": "Ada"
}

// minified
{"id":1,"name":"Ada"}`,
        },
        {
          title: 'How Much Space You Save',
          content: 'For typical nested JSON, minifying cuts 15-30% off the raw size, and more for deeply indented documents. On top of that, servers usually apply gzip or brotli compression, which shrinks both versions dramatically — but minified JSON still comes out ahead and, importantly, parses marginally faster because the parser scans fewer bytes.',
        },
        {
          title: 'When to Minify',
          content: 'Minify JSON for anything that travels over the network or is stored at scale: API responses, data embedded in HTML, config bundled into a build, or records written to a database in bulk. In these machine-to-machine contexts, readability does not matter and every kilobyte and millisecond counts.',
        },
        {
          title: 'When NOT to Minify',
          content: 'Keep JSON formatted whenever a human reads or edits it: configuration files checked into git (minified diffs are unreadable), documentation examples, and files you debug by eye. A good workflow is to author and store config in a readable form and minify only at the boundary where it ships. You can always toggle between the two — paste a minified blob into our formatter to beautify it, or paste formatted JSON to minify it instantly.',
        },
      ],
    },
    relatedArticles: ['understanding-json-guide', 'json-rest-api-design'],
  },
  'json-vs-jsonl-ndjson': {
    id: 'json-vs-jsonl-ndjson',
    title: 'JSON vs JSONL vs NDJSON: Line-Delimited JSON Explained',
    excerpt: 'JSONL and NDJSON put one JSON object per line. Learn how they differ from regular JSON, why they scale to huge datasets, and when to use each.',
    date: '2025-05-16',
    readTime: '7 min read',
    category: 'Comparison',
    content: {
      sections: [
        {
          title: 'The Core Difference',
          content: 'Regular JSON represents an entire dataset as one value — typically a single array containing every record. JSONL (JSON Lines) and NDJSON (Newline-Delimited JSON) instead put one complete, independent JSON object on each line, with no enclosing array and no commas between records. JSONL and NDJSON are essentially the same format under two names.',
          code: `// Regular JSON — one array
[
  {"id":1,"name":"Ada"},
  {"id":2,"name":"Linus"}
]

// JSONL / NDJSON — one object per line
{"id":1,"name":"Ada"}
{"id":2,"name":"Linus"}`,
        },
        {
          title: 'Why Line-Delimited Scales Better',
          content: 'Because each line is independent, you can read and process a JSONL file one record at a time without loading the whole thing into memory — critical for files with millions of records. You can also append a new record by simply writing another line, and split the file across workers by line count. A giant JSON array, by contrast, must be fully parsed before you can touch the first element.',
        },
        {
          title: 'Where Each Is Used',
          content: 'Regular JSON dominates APIs and config, where the payload is small and a single well-formed value is convenient. JSONL/NDDJSON dominates data engineering: log streams, big data exports, machine-learning training sets, and LLM fine-tuning files (OpenAI and others expect JSONL). If the data is a stream or a large collection processed record-by-record, line-delimited wins.',
        },
        {
          title: 'Converting Between Them',
          content: 'Converting is straightforward: to go from a JSON array to JSONL, write each element on its own line; to go the other way, wrap the lines in [ ] and join them with commas. Note that a JSONL file as a whole is not valid JSON — each line is valid JSON, but the file is not — so do not try to JSON.parse() the entire file at once. Parse it line by line instead.',
        },
      ],
    },
    relatedArticles: ['parsing-large-json-files', 'json-vs-xml-yaml'],
  },
  'json-security-guide': {
    id: 'json-security-guide',
    title: 'JSON Security: Common Risks and How to Protect Your Application',
    excerpt: 'JSON looks harmless, but parsing untrusted JSON opens the door to injection, prototype pollution, denial-of-service, and data leaks. A practical, in-depth guide to the real risks and the defenses that actually work.',
    date: '2025-06-02',
    readTime: '14 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'Why JSON Security Deserves Attention',
          content: 'JSON is just data, so it feels safe — but the moment your application parses JSON that came from outside (a client, a third-party API, a file upload, a webhook), you are executing decisions based on input you do not control. Attackers know this. Most JSON-related incidents are not about the format itself but about what your code does with the parsed result: trusting it, expanding it, or feeding it into something more powerful.\n\nThis guide walks through the concrete risks — injection, prototype pollution, denial-of-service, and information disclosure — and, more importantly, the defenses that actually hold up in production. The recurring theme is simple: never trust the shape or size of incoming JSON, and validate before you use it.',
        },
        {
          title: 'Prototype Pollution',
          content: 'Prototype pollution is the most JSON-specific vulnerability, and it is easy to introduce by accident. It happens when a parser or a deep-merge function copies attacker-controlled keys like __proto__, constructor, or prototype into an object, mutating the base Object prototype for the entire process. From there an attacker can influence unrelated code paths — turning a bad payload into privilege escalation or remote code execution in some frameworks.\n\nJSON.parse itself does not pollute prototypes, but naive code that merges parsed data into existing objects does. The fix is to reject dangerous keys and avoid unsafe recursive merges.',
          code: `// DANGEROUS: a deep merge that copies __proto__
merge(target, JSON.parse(untrustedInput));

// SAFER: reject dangerous keys during parse
const data = JSON.parse(untrustedInput, (key, value) => {
  if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
    return undefined; // drop it
  }
  return value;
});

// Or create objects without a prototype for lookups
const safe = Object.assign(Object.create(null), data);`,
        },
        {
          title: 'JSON Injection and Downstream Injection',
          content: 'JSON injection happens when you build JSON by string concatenation instead of serialization, letting attacker input break out of a string and inject new fields. The rule is absolute: never build JSON with string templates — always use a real serializer (JSON.stringify or your language equivalent), which escapes values correctly.\n\nThe more dangerous cousin is downstream injection: a value that is valid JSON but malicious when your code passes it, unescaped, into SQL, a shell command, an HTML page, or a NoSQL query. The parsed value is fine as data; the vulnerability is in how you use it.',
          code: `// DANGEROUS: hand-built JSON
const body = '{"name":"' + userName + '"}'; // userName can break out

// CORRECT: let the serializer escape everything
const body = JSON.stringify({ name: userName });

// And escape/parameterize again at every downstream boundary
db.query('SELECT * FROM users WHERE name = $1', [data.name]); // parameterized`,
        },
        {
          title: 'Denial-of-Service: Big and Deep Payloads',
          content: 'Because JSON.parse loads the entire input into memory at once, an attacker can send a payload designed to exhaust resources: a multi-gigabyte body, a deeply nested structure that blows the stack, or a huge array that consumes all available RAM. Even a "small" 20 KB payload can expand dramatically once deserialized into objects.\n\nDefenses are about limits, applied before and during parsing:',
          code: `// 1. Cap request body size at the server/middleware level
app.use(express.json({ limit: '100kb' }));

// 2. Reject absurd nesting depth (many parsers/validators support this)
// 3. Validate the schema so unexpected giant arrays are rejected early
// 4. Stream very large legitimate inputs instead of buffering them`,
        },
        {
          title: 'Validate Before You Trust: JSON Schema',
          content: 'The single most effective defense is to validate incoming JSON against a strict schema before your code touches it. A schema rejects unexpected fields, wrong types, out-of-range numbers, and oversized arrays at the boundary — turning a whole class of attacks and bugs into a clean 400 response.\n\nUse a battle-tested validator (Ajv for JavaScript, and equivalents in every language), define required fields and types, set maxLength / maximum / maxItems constraints, and disallow additional properties. Treat validation as a security control, not just data hygiene.',
          code: `const schema = {
  type: 'object',
  additionalProperties: false,          // reject unexpected fields
  required: ['email', 'age'],
  properties: {
    email: { type: 'string', format: 'email', maxLength: 254 },
    age:   { type: 'integer', minimum: 0, maximum: 130 },
    tags:  { type: 'array', maxItems: 20, items: { type: 'string' } }
  }
};`,
        },
        {
          title: 'Information Disclosure and Sensitive Data',
          content: 'JSON responses leak data more often than people realize. Serializing a full database object can expose password hashes, internal IDs, tokens, or fields you never meant to return. Verbose error responses can reveal stack traces and library versions that help an attacker.\n\nAdopt an allow-list mindset for output: explicitly choose which fields to serialize rather than returning whole entities. Strip secrets, and return generic error messages to clients while logging the details server-side.',
          code: `// DANGEROUS: returns everything, including passwordHash, internalNotes...
res.json(user);

// SAFER: serialize only what the client should see
res.json({ id: user.id, name: user.name, email: user.email });`,
        },
        {
          title: 'A Practical Checklist',
          content: '• Never build JSON by string concatenation — always serialize.\n• Validate every incoming payload against a strict schema (required fields, types, maxLength/maxItems, no additional properties).\n• Cap request body size and reject excessive nesting depth.\n• Drop __proto__ / constructor / prototype keys and avoid unsafe deep merges.\n• Re-escape or parameterize values at every downstream boundary (SQL, shell, HTML, NoSQL).\n• Serialize responses with an explicit allow-list of fields; never dump full entities.\n• Return generic errors to clients; log details privately.\n\nNone of these are exotic — they are the difference between JSON as safe data and JSON as an attack surface. When you need to inspect a suspicious payload, do it in a client-side tool like our formatter and validator so the data never leaves your machine.',
        },
      ],
    },
    relatedArticles: ['json-schema-validation-guide', 'common-json-errors'],
  },
  'dates-in-json': {
    id: 'dates-in-json',
    title: 'Working with Dates and Times in JSON: The Complete Guide',
    excerpt: 'JSON has no date type, which is the source of endless bugs. A thorough guide to representing dates and times in JSON correctly — ISO 8601 vs Unix timestamps, time zones, and the pitfalls that bite everyone.',
    date: '2025-06-12',
    readTime: '12 min read',
    category: 'Best Practices',
    content: {
      sections: [
        {
          title: 'The Root of the Problem: JSON Has No Date Type',
          content: 'JSON defines exactly six value types — string, number, boolean, null, object, and array. There is no date. Every date you have ever seen in JSON is really a string or a number by convention, and every system on both ends must agree on that convention. When they do not, you get off-by-hours bugs, dates that shift when they cross a time zone, and values that sort incorrectly.\n\nThis guide covers the two mainstream conventions — ISO 8601 strings and Unix timestamps — when to use each, and the time-zone traps that cause the most production incidents.',
        },
        {
          title: 'Option 1: ISO 8601 Strings (Recommended for APIs)',
          content: 'The most interoperable choice is an ISO 8601 string in UTC, ending with Z (the "Zulu"/UTC designator). It is human-readable, unambiguous, sorts correctly as text, and is parsed natively by virtually every language. For most APIs, this is the right default.',
          code: `{
  "createdAt": "2026-07-06T14:30:00Z",
  "updatedAt": "2026-07-06T14:30:00.123Z"
}

// Always store/transmit in UTC, convert to local time only for display.
new Date("2026-07-06T14:30:00Z"); // parsed reliably everywhere`,
        },
        {
          title: 'Option 2: Unix Timestamps (Compact and Unambiguous)',
          content: 'A Unix timestamp — the number of seconds (or milliseconds) since 1 January 1970 UTC — is a single integer with no formatting or time-zone ambiguity at all. It is compact, trivially comparable, and common in tokens (JWT exp/iat) and event pipelines. The main downsides are that it is not human-readable and that you must be crystal clear about seconds vs. milliseconds.',
          code: `{
  "exp": 1783410231,      // seconds — 10 digits (common in JWT, Unix tools)
  "eventTime": 1783410231000  // milliseconds — 13 digits (JavaScript Date)
}

// Seconds -> Date in JS (multiply by 1000):
new Date(1783410231 * 1000);`,
        },
        {
          title: 'The Time Zone Trap',
          content: 'Most date bugs come from ambiguous time zones. A value like "2026-07-06 14:30:00" with no offset is meaningless without knowing which zone it refers to — and different systems will guess differently. The fix is a discipline, not a library: store and transmit instants in UTC, include the offset or Z designator, and convert to the user’s local time only at the moment you display it.\n\nAlso beware of "floating" dates like a birthday (2026-07-06) that should NOT be converted across zones — represent those as a plain date string and treat them as date-only, never as an instant at midnight UTC.',
        },
        {
          title: 'Durations, Dates, and Times',
          content: 'ISO 8601 covers more than instants. A date-only value is 2026-07-06. A time-only value is 14:30:00. A duration uses the P format — P1Y2M10DT2H30M means one year, two months, ten days, two hours, thirty minutes. Using these standard forms keeps your JSON self-describing and avoids inventing custom formats that the other side has to reverse-engineer.',
          code: `{
  "date": "2026-07-06",          // date only, no time/zone
  "time": "14:30:00",            // time only
  "timeout": "PT30M",            // ISO 8601 duration: 30 minutes
  "subscription": "P1Y"          // one year
}`,
        },
        {
          title: 'Common Pitfalls and How to Avoid Them',
          content: '• Sending local time without an offset — always include Z or the offset.\n• Mixing seconds and milliseconds — pick one and document it; 10 digits is seconds, 13 is milliseconds.\n• Relying on Date.toString() formats — they are locale- and engine-dependent; use toISOString().\n• Treating date-only values as UTC midnight — this shifts the day backward for users west of UTC.\n• Assuming lexical sort equals chronological sort — it only works for ISO 8601 strings in the same zone, or for numeric timestamps.\n• Losing sub-second precision when you need it — include milliseconds in the ISO string.',
        },
        {
          title: 'Best Practices Summary',
          content: 'For APIs, default to ISO 8601 strings in UTC (2026-07-06T14:30:00Z) — readable, sortable, unambiguous. For tokens, high-volume events, or when size matters, use Unix timestamps and clearly document seconds vs. milliseconds. Always store instants in UTC, convert to local only for display, and use date-only strings for calendar dates that must not shift across zones.\n\nWhen you receive a raw timestamp and need to see what it means, paste it into our Unix Timestamp Converter to get the human-readable date, or decode a JWT to read its exp/iat claims as real dates.',
        },
      ],
    },
    relatedArticles: ['json-rest-api-design', 'json-best-practices'],
  },
  'json-performance-at-scale': {
    id: 'json-performance-at-scale',
    title: 'JSON at Scale: Performance, Size, and Parsing Speed',
    excerpt: 'When JSON goes from kilobytes to gigabytes, naive code falls over. An in-depth look at what makes JSON slow, how to measure it, and the techniques — streaming, NDJSON, minification, and alternatives — that keep it fast at scale.',
    date: '2025-06-22',
    readTime: '13 min read',
    category: 'Advanced',
    content: {
      sections: [
        {
          title: 'Where JSON Performance Actually Goes',
          content: 'For most applications JSON is effectively free — a few kilobytes parse in microseconds. Performance only becomes a topic at scale: large payloads, high request rates, or memory-constrained environments. Before optimizing, it helps to know where the cost really is. There are three main areas: the bytes on the wire (network and storage), the CPU spent parsing and serializing, and the memory used to hold the parsed structure.\n\nCrucially, the parsed, in-memory representation is often several times larger than the JSON text, because every object, string, and number becomes a full language object with overhead. A 100 MB JSON file can need several hundred megabytes of RAM once parsed.',
        },
        {
          title: 'The Cost of JSON.parse and Serialization',
          content: 'JSON.parse and JSON.stringify are highly optimized in modern engines, but they are synchronous and all-or-nothing: they block the thread and require the entire input (and output) in memory at once. On a server, a big parse blocks the event loop and delays every other request; on the client, it can freeze the UI.\n\nThe first rule of JSON performance is therefore: keep payloads small and parse off the hot path. Move heavy parsing to a worker thread, and never parse more than you need.',
          code: `// Blocking: a large synchronous parse stalls everything
const data = JSON.parse(hugeString);

// Better on the client: parse in a Web Worker so the UI stays responsive
// Better on the server: stream (below) instead of buffering the whole body`,
        },
        {
          title: 'Reduce Bytes: Minification and Compression',
          content: 'Two cheap wins shrink the payload. Minifying removes formatting whitespace, cutting 15-30% off the raw size for free. On top of that, HTTP compression (gzip or brotli) typically reduces JSON by 70-90% because JSON is highly repetitive — the same keys appear in every object. Always enable compression on JSON endpoints; it is usually the single biggest transfer win.\n\nFor data with many repeated keys, structural changes help even more: return columnar data (arrays of values with a separate header) instead of an array of objects, so keys are not repeated thousands of times.',
          code: `// Repetitive: keys repeated for every row
[{"id":1,"name":"A"},{"id":2,"name":"B"}]

// Columnar: keys once, values compact (great with compression)
{ "columns": ["id","name"], "rows": [[1,"A"],[2,"B"]] }`,
        },
        {
          title: 'Stream Instead of Buffer: NDJSON',
          content: 'The biggest scalability unlock is to stop treating a large dataset as one JSON value. Newline-delimited JSON (NDJSON) puts one object per line, so you can read, parse, and process records one at a time with constant memory — no matter how many records there are. This is how log pipelines, data exports, and ML training sets handle gigabytes without exhausting RAM.\n\nStreaming parsers (like stream-json) achieve the same for a regular JSON array, emitting each element as it is read rather than building the whole array first.',
          code: `// NDJSON: process millions of records in constant memory
const rl = readline.createInterface({ input: fs.createReadStream('data.ndjson') });
for await (const line of rl) {
  if (line.trim()) handle(JSON.parse(line));
}`,
        },
        {
          title: 'Send Less: Pagination and Field Selection',
          content: 'The fastest JSON is the JSON you never send. Two API-level techniques matter most at scale: pagination (return a page of results with a cursor, never an unbounded array) and field selection (let clients request only the fields they need, GraphQL-style or via a fields parameter). Both cut payload size, parse time, and memory simultaneously, and they protect your server from a single client requesting everything at once.',
        },
        {
          title: 'When to Consider Alternatives',
          content: 'JSON is the right default, but at extreme scale other formats earn their place. Binary formats like Protocol Buffers, MessagePack, or Avro are smaller and faster to parse because they skip text encoding and repeated keys, at the cost of human readability and tooling. For LLM prompts, token-oriented formats like TOON represent the same data in fewer tokens, cutting cost and context usage. The trade-off is always the same: you give up JSON’s universality and readability for size or speed, so switch only where you have measured a real bottleneck.',
        },
        {
          title: 'Measure, Then Optimize',
          content: 'Every optimization here has a cost in complexity, so do not apply them blindly. Measure first: log payload sizes, time your parse/serialize calls, and watch memory under realistic load. Optimize the one number that is actually hurting you — usually payload size (fix with compression + pagination) or main-thread blocking (fix with streaming or a worker). Most applications never need more than small payloads, gzip, and pagination.\n\nWhen you are inspecting or shrinking a payload by hand, our JSON formatter can minify it and our JSON to TOON converter shows how much a token-oriented representation would save.',
        },
      ],
    },
    relatedArticles: ['parsing-large-json-files', 'minify-json-guide'],
  }
};
