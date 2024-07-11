export const LANGUAGES = {
  python: "3.12.2",
  javascript: "18.15.0",
  java: "15.0.2",
  csharp: "6.12.0",
};

export const CODE_SNIPPETS = {
  javascript: `/**\n *Double click where you want to check the visualization\n *Name of your data structure: [_____]\n */\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  python: `"""\n Double click where you want to check the visualization\n Name of your data structure: [_____]\n"""\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `/**\n *Double click where you want to check the visualization\n *Name of your data structure: [_____]\n */\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    '/**\n *Double click where you want to check the visualization\n *Name of your data structure: [_____]\n */\nusing System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
};

export const DATASTRUCTURE = {
  D1_array: {
    comment: `<BarChart data={data} />`,
    function: VISUALIZE_ARRAY
  },
  
  D2_array: {
    comment: `This is an 1D array`,
    function: VISUALIZE_ARRAY
  },
  
  D3_array: {
    comment: `This is an 2D array`,
    function: VISUALIZE_ARRAY
  },
  
  D4_array: {
    comment: `This is an stack`,
    function: VISUALIZE_ARRAY
  },
}

export function VISUALIZE_ARRAY(name, language) {
  switch(language){
    case 'javascript':
      return `${name}.forEach(value => console.log(value));`;
    case 'python':
      return `for value in ${name}: print(value)`;
    case 'java': 
      return `Arrays.stream(${name}).forEach(System.out::println);`;
    case 'csharp':
      return `${name}.ToList().ForEach(Console.WriteLine);`;
    default:
      return ``;
  }
}

