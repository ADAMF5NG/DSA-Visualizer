export const LANGUAGES = {
  python: "3.12.2",
  javascript: "18.15.0",
  java: "15.0.2",
  csharp: "6.12.0",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
};

export const DATASTRUCTURE = {
  D1_array: {
    comment: `This is an D1 array`,
    function: VISUALIZE_ARRAY
  },
}

export function VISUALIZE_ARRAY(name, language) {
  switch(language){
    case 'javascript':
      return `\r${name}.forEach(value => console.log(value));`;
    case 'python':
      return `\rfor value in ${name}: print(value)`;
    case 'java': 
      return `\rArrays.stream(${name}).forEach(System.out::println);`;
    case 'csharp':
      return `\r${name}.ToList().ForEach(Console.WriteLine);`;
    default:
      return ``;
  }
}

