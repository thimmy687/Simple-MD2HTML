"use strict";
exports.__esModule = true;
var MDReplacer_1 = require("./../src/MDReplacer");
var replacerDict = new MDReplacer_1.MDReplacer().dictionary;
var dictString = 'dict' + replacerDict.toString();
describe('This project is about making a simple markdown parser.', function () {
    describe('check empty input', function () {
        it('input : "",' + dictString + ' , output: ""', function () {
            // Arrange
            var input = '';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('');
        });
    });
    describe('check simple input', function () {
        it('input : "# Heading1", ' + dictString + ', output: "<h1>Heading1</h1>"', function () {
            // Arrange
            var input = '# Heading1';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Heading1</h1>');
        });
        it('input : "## Heading2", ' + dictString + ', output: "<h2>Heading2</h2>"', function () {
            // Arrange
            var input = '## Heading2';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h2>Heading2</h2>');
        });
        it('input : "**BoldText**", ' + dictString + ', output: "<b>BoldText</b>"', function () {
            // Arrange
            var input = '**BoldText**';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<b>BoldText</b>');
        });
        it('input : "*ItalicText*", ' + dictString + ', output: "<i>ItalicText</i>"', function () {
            // Arrange
            var input = '*ItalicText*';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<i>ItalicText</i>');
        });
        it('input : "* List", ' + dictString + ', output: "<ul><li>List</li></ul>"', function () {
            // Arrange
            var input = '* List';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<ul><li>List</li></ul>');
        });
        it('input : ">Cite text", ' + dictString + ', output: "<blockquote><p>Cite text</p></blockquote>"', function () {
            // Arrange
            var input = '>Cite text';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<blockquote><p>Cite text</p></blockquote>');
        });
        it('input : " Paragraph", ' + dictString + ', output: "<p>Paragraph</p>"', function () {
            // Arrange
            var input = ' Paragraph';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<p>Paragraph</p>');
        });
    });
    describe('check multi line input', function () {
        it('input : "# Test text \\n * with list", ' + dictString + ', output: "<h1>Test text</h1><br/><ul><li>with list</li></ul>"', function () {
            // Arrange
            var input = '# Test text \n* with list';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Test text </h1><br/><ul><li>with list</li></ul>');
        });
    });
    describe('check multi line list input', function () {
        it('input : "# Test text\\n* list item 1\\n* list item 2\\n* list item 3", \n\t' + dictString + ',\n\toutput: "<h1>Test text</h1><br/><ul><li>list item 1</li><br/><li>list item 2</li><br/><li>list item 3</li></ul>"', function () {
            // Arrange
            var input = '# Test text\n* list item 1\n* list item 2\n* list item 3';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Test text</h1><br/><ul><li>list item 1</li><br/><li>list item 2</li><br/><li>list item 3</li></ul>');
        });
    });
    describe('check bolt and italic input', function () {
        it('input : "**Test** *text*", \n\t' + dictString + ',\n\toutput: "<b>Test</b> <i>text</i>"', function () {
            // Arrange
            var input = '**Test** *text*';
            var markdownReplacer = new MDReplacer_1.MDReplacer();
            // Act
            var result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<b>Test</b> <i>text</i>');
        });
    });
});
//# sourceMappingURL=MD2HTML.spec.js.map