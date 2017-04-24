import {  MDReplacer} from './../src/MDReplacer';

let replacerDict = new MDReplacer().dictionary
let dictString = 'dict' + replacerDict.toString();


describe('This project is about making a simple markdown parser.', () => {
    describe('check empty input', () => {
        it('input : "",'+ dictString +' , output: ""', () => {
            // Arrange
            let input ='';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('');
        });
    });
    describe('check simple input', () => {
        it('input : "# Heading1", '+ dictString +', output: "<h1>Heading1</h1>"', () => {
            // Arrange
            let input ='# Heading1';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Heading1</h1>');
        });
        it('input : "## Heading2", '+ dictString +', output: "<h2>Heading2</h2>"', () => {
            // Arrange
            let input ='## Heading2';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h2>Heading2</h2>');
        }); 
        it('input : "**BoldText**", '+ dictString +', output: "<b>BoldText</b>"', () => {
            // Arrange
            let input ='**BoldText**';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<b>BoldText</b>');
        }); 
        it('input : "*ItalicText*", '+ dictString +', output: "<i>ItalicText</i>"', () => {
            // Arrange
            let input ='*ItalicText*';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<i>ItalicText</i>');
        });
        it('input : "* List", '+ dictString +', output: "<ul><li>List</li></ul>"', () => {
            // Arrange
            let input ='* List';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<ul><li>List</li></ul>');
        }); 
        it('input : ">Cite text", '+ dictString +', output: "<blockquote><p>Cite text</p></blockquote>"', () => {
            // Arrange
            let input ='>Cite text';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<blockquote><p>Cite text</p></blockquote>');
        }); 
        it('input : " Paragraph", '+ dictString +', output: "<p>Paragraph</p>"', () => {
            // Arrange
            let input =' Paragraph';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<p>Paragraph</p>');
        }); 
    });
    describe('check multi line input', () => {
        it('input : "# Test text \\n * with list", '+ dictString +', output: "<h1>Test text</h1><br/><ul><li>with list</li></ul>"', () => {
        // Arrange
        let input ='# Test text \n* with list';
        let markdownReplacer = new MDReplacer();
        // Act
        let result = markdownReplacer.replace(input);
        // Assert
        expect(result).toBe('<h1>Test text </h1><br/><ul><li>with list</li></ul>');
        }); 
    });
    describe('check multi line list input', () => {
        it('input : "# Test text\\n* list item 1\\n* list item 2", \n\t'+ dictString +',\n\toutput: "<h1>Test text</h1><br/><ul><li>list item 1</li></ul><br/><ul><li>list item 2</li></ul>"', () => {
        // Arrange
        let input ='# Test text\n* list item 1\n* list item 2';
        let markdownReplacer = new MDReplacer();
        // Act
        let result = markdownReplacer.replace(input);
        // Assert
        expect(result).toBe('<h1>Test text</h1><br/><ul><li>list item 1</li></ul><br/><ul><li>list item 2</li></ul>');
        }); 
    });
    describe('check bolt and italic input', () => {
        it('input : "**Test** *text*", \n\t'+ dictString +',\n\toutput: "<b>Test</b> <i>text</i>"', () => {
        // Arrange
        let input ='**Test** *text*';
        let markdownReplacer = new MDReplacer();
        // Act
        let result = markdownReplacer.replace(input);
        // Assert
        expect(result).toBe('<b>Test</b> <i>text</i>');
        });  
    });
});