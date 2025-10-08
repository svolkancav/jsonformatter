export function generateTypeScriptInterfaces(json: string, rootName: string = 'Root'): string {
  try {
    const obj = JSON.parse(json);
    const interfaces: string[] = [];
    const processedTypes = new Set<string>();

    function getType(value: any): string {
      if (value === null) return 'any';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'any[]';
        const itemType = getType(value[0]);
        return `${itemType}[]`;
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'string') return 'string';
      if (typeof value === 'number') return 'number';
      if (typeof value === 'boolean') return 'boolean';
      return 'any';
    }

    function toPascalCase(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    function generateInterface(obj: any, name: string): string {
      if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return '';
      }

      const typeName = toPascalCase(name);
      if (processedTypes.has(typeName)) return '';
      processedTypes.add(typeName);

      const properties: string[] = [];

      for (const [key, value] of Object.entries(obj)) {
        let propType: string;

        if (value === null) {
          propType = 'any';
        } else if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0])) {
            const nestedTypeName = toPascalCase(key);
            generateInterface(value[0], key);
            propType = `${nestedTypeName}[]`;
          } else {
            propType = getType(value);
          }
        } else if (typeof value === 'object') {
          const nestedTypeName = toPascalCase(key);
          generateInterface(value, key);
          propType = nestedTypeName;
        } else {
          propType = getType(value);
        }

        properties.push(`  ${key}: ${propType};`);
      }

      interfaces.push(`export interface ${typeName} {\n${properties.join('\n')}\n}`);
      return typeName;
    }

    generateInterface(obj, rootName);
    return interfaces.reverse().join('\n\n');
  } catch (error) {
    throw new Error('Invalid JSON: ' + (error as Error).message);
  }
}

export function generateJavaClasses(json: string, rootName: string = 'Root'): string {
  try {
    const obj = JSON.parse(json);
    const classes: string[] = [];
    const processedTypes = new Set<string>();

    function getJavaType(value: any): string {
      if (value === null) return 'Object';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List<Object>';
        const itemType = getJavaType(value[0]);
        return `List<${itemType}>`;
      }
      if (typeof value === 'object') return 'Object';
      if (typeof value === 'string') return 'String';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'Integer' : 'Double';
      }
      if (typeof value === 'boolean') return 'Boolean';
      return 'Object';
    }

    function toPascalCase(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    function generateClass(obj: any, name: string): string {
      if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return '';
      }

      const className = toPascalCase(name);
      if (processedTypes.has(className)) return '';
      processedTypes.add(className);

      const properties: string[] = [];
      const imports = new Set<string>();

      for (const [key, value] of Object.entries(obj)) {
        let propType: string;

        if (value === null) {
          propType = 'Object';
        } else if (Array.isArray(value)) {
          imports.add('java.util.List');
          if (value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0])) {
            const nestedClassName = toPascalCase(key.replace(/s$/, ''));
            generateClass(value[0], nestedClassName);
            propType = `List<${nestedClassName}>`;
          } else {
            propType = getJavaType(value);
          }
        } else if (typeof value === 'object') {
          const nestedClassName = toPascalCase(key);
          generateClass(value, key);
          propType = nestedClassName;
        } else {
          propType = getJavaType(value);
        }

        properties.push(`    private ${propType} ${key};`);
      }

      let classCode = '';
      if (imports.size > 0) {
        classCode += Array.from(imports).map(imp => `import ${imp};`).join('\n') + '\n\n';
      }

      classCode += `public class ${className} {\n`;
      classCode += properties.join('\n') + '\n\n';

      for (const [key, value] of Object.entries(obj)) {
        let propType: string;
        if (value === null) {
          propType = 'Object';
        } else if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0])) {
            const nestedClassName = toPascalCase(key.replace(/s$/, ''));
            propType = `List<${nestedClassName}>`;
          } else {
            propType = getJavaType(value);
          }
        } else if (typeof value === 'object') {
          propType = toPascalCase(key);
        } else {
          propType = getJavaType(value);
        }

        const methodName = toPascalCase(key);
        classCode += `    public ${propType} get${methodName}() {\n        return ${key};\n    }\n\n`;
        classCode += `    public void set${methodName}(${propType} ${key}) {\n        this.${key} = ${key};\n    }\n\n`;
      }

      classCode += '}';
      classes.push(classCode);
      return className;
    }

    generateClass(obj, rootName);
    return classes.reverse().join('\n\n');
  } catch (error) {
    throw new Error('Invalid JSON: ' + (error as Error).message);
  }
}

export function generatePythonClasses(json: string, rootName: string = 'Root'): string {
  try {
    const obj = JSON.parse(json);
    const classes: string[] = [];
    const processedTypes = new Set<string>();

    function getPythonType(value: any): string {
      if (value === null) return 'Optional[Any]';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List[Any]';
        const itemType = getPythonType(value[0]);
        return `List[${itemType}]`;
      }
      if (typeof value === 'object') return 'Dict';
      if (typeof value === 'string') return 'str';
      if (typeof value === 'number') return 'float';
      if (typeof value === 'boolean') return 'bool';
      return 'Any';
    }

    function toPascalCase(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    function toSnakeCase(str: string): string {
      return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
    }

    function generateClass(obj: any, name: string): string {
      if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
        return '';
      }

      const className = toPascalCase(name);
      if (processedTypes.has(className)) return '';
      processedTypes.add(className);

      const properties: string[] = [];

      for (const [key, value] of Object.entries(obj)) {
        let propType: string;

        if (value === null) {
          propType = 'Optional[Any]';
        } else if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0])) {
            const nestedClassName = toPascalCase(key.replace(/s$/, ''));
            generateClass(value[0], nestedClassName);
            propType = `List[${nestedClassName}]`;
          } else {
            propType = getPythonType(value);
          }
        } else if (typeof value === 'object') {
          const nestedClassName = toPascalCase(key);
          generateClass(value, key);
          propType = nestedClassName;
        } else {
          propType = getPythonType(value);
        }

        properties.push(`    ${key}: ${propType}`);
      }

      let classCode = `class ${className}:\n`;
      classCode += `    def __init__(self, data: dict):\n`;

      for (const key of Object.keys(obj)) {
        classCode += `        self.${key} = data.get('${key}')\n`;
      }

      classes.push(classCode);
      return className;
    }

    generateClass(obj, rootName);
    const header = 'from typing import List, Dict, Any, Optional\n\n';
    return header + classes.reverse().join('\n\n');
  } catch (error) {
    throw new Error('Invalid JSON: ' + (error as Error).message);
  }
}

export function minifyJSON(json: string): string {
  const obj = JSON.parse(json);
  return JSON.stringify(obj);
}

export function validateJSON(json: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(json);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: (error as Error).message };
  }
}

export function escapeJSON(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

export function unescapeJSON(str: string): string {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

export function jsonToXml(json: string, rootName: string = 'root'): string {
  const obj = JSON.parse(json);

  function convertToXml(obj: any, nodeName: string, indent: string = ''): string {
    if (obj === null || obj === undefined) {
      return `${indent}<${nodeName} />`;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => convertToXml(item, nodeName, indent)).join('\n');
    }

    if (typeof obj === 'object') {
      let xml = `${indent}<${nodeName}>`;
      const entries = Object.entries(obj);

      if (entries.length > 0) {
        xml += '\n';
        for (const [key, value] of entries) {
          xml += convertToXml(value, key, indent + '  ') + '\n';
        }
        xml += `${indent}</${nodeName}>`;
      } else {
        xml += `</${nodeName}>`;
      }

      return xml;
    }

    return `${indent}<${nodeName}>${obj}</${nodeName}>`;
  }

  return '<?xml version="1.0" encoding="UTF-8"?>\n' + convertToXml(obj, rootName);
}

export function xmlToJson(xml: string): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'text/xml');

  function xmlToObject(node: any): any {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const obj: any = {};

    if (node.attributes && node.attributes.length > 0) {
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        obj['@' + attr.name] = attr.value;
      }
    }

    if (node.hasChildNodes()) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        const nodeName = child.nodeName;

        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.nodeValue?.trim();
          if (text) {
            return text;
          }
        } else {
          if (obj[nodeName] === undefined) {
            obj[nodeName] = xmlToObject(child);
          } else {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(xmlToObject(child));
          }
        }
      }
    }

    return obj;
  }

  const result = xmlToObject(xmlDoc.documentElement);
  return JSON.stringify(result, null, 2);
}

export function compareJSON(json1: string, json2: string): { differences: string[]; same: boolean } {
  try {
    const obj1 = JSON.parse(json1);
    const obj2 = JSON.parse(json2);
    const differences: string[] = [];

    function compare(o1: any, o2: any, path: string = ''): void {
      if (typeof o1 !== typeof o2) {
        differences.push(`${path}: Type mismatch - ${typeof o1} vs ${typeof o2}`);
        return;
      }

      if (Array.isArray(o1) && Array.isArray(o2)) {
        if (o1.length !== o2.length) {
          differences.push(`${path}: Array length mismatch - ${o1.length} vs ${o2.length}`);
        }
        const maxLength = Math.max(o1.length, o2.length);
        for (let i = 0; i < maxLength; i++) {
          if (i >= o1.length) {
            differences.push(`${path}[${i}]: Only exists in second JSON`);
          } else if (i >= o2.length) {
            differences.push(`${path}[${i}]: Only exists in first JSON`);
          } else {
            compare(o1[i], o2[i], `${path}[${i}]`);
          }
        }
        return;
      }

      if (typeof o1 === 'object' && o1 !== null && o2 !== null) {
        const keys1 = Object.keys(o1);
        const keys2 = Object.keys(o2);
        const allKeys = new Set([...keys1, ...keys2]);

        for (const key of allKeys) {
          const newPath = path ? `${path}.${key}` : key;
          if (!(key in o1)) {
            differences.push(`${newPath}: Only exists in second JSON`);
          } else if (!(key in o2)) {
            differences.push(`${newPath}: Only exists in first JSON`);
          } else {
            compare(o1[key], o2[key], newPath);
          }
        }
        return;
      }

      if (o1 !== o2) {
        differences.push(`${path}: Value mismatch - "${o1}" vs "${o2}"`);
      }
    }

    compare(obj1, obj2);
    return { differences, same: differences.length === 0 };
  } catch (error) {
    throw new Error('Invalid JSON: ' + (error as Error).message);
  }
}
