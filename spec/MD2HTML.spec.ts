import { MDReplacer } from './../src/MDReplacer';

let replacerDict = new MDReplacer().dictionary
let dictString = 'dict' + replacerDict.toString();

/**
 * this are test for the mardown replacer
 * @test {MDReplacer}
 */
describe('This project is about making a simple markdown parser.', () => {
    /**
     * @test {MDReplacer#replace}
     */
    describe('check empty input', () => {
        it('input : "",' + dictString + ' , output: ""', () => {
            // Arrange
            let input = '';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('');
        });
    });
    /**
    * @test {MDReplacer#replace}
    */
    describe('check simple input of each type', () => {
        it('input : "# Heading1", ' + dictString + ', output: "<h1>Heading1</h1>"', () => {
            // Arrange
            let input = '# Heading1';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Heading1</h1>');
        });
        it('input : "## Heading2", ' + dictString + ', output: "<h2>Heading2</h2>"', () => {
            // Arrange
            let input = '## Heading2';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h2>Heading2</h2>');
        });
        it('input : "**BoldText**", ' + dictString + ', output: "<b>BoldText</b>"', () => {
            // Arrange
            let input = '**BoldText**';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<b>BoldText</b>');
        });
        it('input : "*ItalicText*", ' + dictString + ', output: "<i>ItalicText</i>"', () => {
            // Arrange
            let input = '*ItalicText*';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<i>ItalicText</i>');
        });
        it('input : "* List", ' + dictString + ', output: "<ul><li>List</li></ul>"', () => {
            // Arrange
            let input = '* List';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<ul><li>List</li></ul>');
        });
        it('input : ">Cite text", ' + dictString + ', output: "<blockquote><p>Cite text</p></blockquote>"', () => {
            // Arrange
            let input = '>Cite text';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<blockquote><p>Cite text</p></blockquote>');
        });
        it('input : " Paragraph", ' + dictString + ', output: "<p>Paragraph</p>"', () => {
            // Arrange
            let input = ' Paragraph';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<p>Paragraph</p>');
        });
    });
    /**
     * @test {MDReplacer#replace}
     */
    describe('check multi line input', () => {
        it('input : "# Test text \\n * with list", ' + dictString + ', output: "<h1>Test text</h1><br/><ul><li>with list</li></ul>"', () => {
            // Arrange
            let input = '# Test text \n* with list';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Test text </h1><br/><ul><li>with list</li></ul>');
        });
    });
    /**
     * @test {MDReplacer#replace}
     */
    describe('check multi line list input', () => {
        it('input : "# Test text\\n* list item 1\\n* list item 2\\n* list item 3", \n\t' + dictString + ',\n\toutput: "<h1>Test text</h1><br/><ul><li>list item 1</li><br/><li>list item 2</li><br/><li>list item 3</li></ul>"', () => {
            // Arrange
            let input = '# Test text\n* list item 1\n* list item 2\n* list item 3';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<h1>Test text</h1><br/><ul><li>list item 1</li><br/><li>list item 2</li><br/><li>list item 3</li></ul>');
        });
    });
    /**
     * @test {MDReplacer#replace}
     */
    describe('check bolt and italic input', () => {
        it('input : "**Test** *text*", \n\t' + dictString + ',\n\toutput: "<b>Test</b> <i>text</i>"', () => {
            // Arrange
            let input = '**Test** *text*';
            let markdownReplacer = new MDReplacer();
            // Act
            let result = markdownReplacer.replace(input);
            // Assert
            expect(result).toBe('<b>Test</b> <i>text</i>');
        });
    });
    /**
     * @test {MDReplacer#replaceDouble}
     */
    describe('MDReplacer replace double tags', () => {
        it('input: "**Test**, \n\toutput: "<b>Test</b>"', () => {
            // Arrange
            let input = '**Test**';
            let markdownReplacer = new MDReplacer();
            let key = '**';
            // Act
            let result = markdownReplacer.replaceDouble(input, key);
            // Assert
            expect(result).toBe('<b>Test</b>');
        });
    });
    /**
     * @test {MDReplacer#startsWith}
     */
    describe('MDReplacer check startWith method', () => {
        describe('method result true', () => {
            it('input: "> test",\n\toutput: "true"', () => {
                // Arrange
                let input = '> test';
                let markdownReplacer = new MDReplacer();
                let key = '>';
                // Act
                let result = markdownReplacer.startsWith(input, key);
                // Assert
                expect(result).toBe(true);
            });
        });
        describe('method fails', () => {
            it('input: " test",\n\toutput: "true"', () => {
                // Arrange
                let input = ' test';
                let markdownReplacer = new MDReplacer();
                let key = '>';
                // Act
                let result = markdownReplacer.startsWith(input, key);
                // Assert
                expect(result).toBe(false);
            });
        });
    });
    /**
     * @test {MDReplacer#combineMultiLineTags}
     */
    describe('MDReplacer combineMultiLineTags', () => {
        it('input: "<ul><li>list item 1</li></ul><br/><ul><li>list item 2</li></ul><br/><ul><li>list item 3</li></ul>",\n\toutput: "<ul><li>list item 1</li><br/><li>list item 2</li><br/><li>list item 3</li></ul>"', () => {
            // Arrange
            let input = '<ul><li>list item 1</li></ul><br/><ul><li>list item 2</li></ul><br/><ul><li>list item 3</li></ul>';
            let markdownReplacer = new MDReplacer();
            let key = '>';
            // Act
            let result = markdownReplacer.combineMultiLineTags(input);
            // Assert
            expect(result).toBe('<ul><li>list item 1</li><br/><li>list item 2</li><br/><li>list item 3</li></ul>');
        });
    });
    /**
     * @test {MDReplacer#replaceKey}
     */
    describe('MDReplacer check all different keys', () => {
        describe('check heading 1', () => {
            it('input: "# ",\n\toutput: "<h1></h1>"', () => {
                // Arrange
                let input = '# ';
                let markdownReplacer = new MDReplacer();
                let key = '# ';
                // Act
                let result = markdownReplacer.replaceKey(input, key);
                // Assert
                expect(result).toBe('<h1></h1>');
            });
        }),
            describe('check heading 2', () => {
                it('input: "## ",\n\toutput: "<h2></h2>"', () => {
                    // Arrange
                    let input = '## ';
                    let markdownReplacer = new MDReplacer();
                    let key = '## ';
                    // Act
                    let result = markdownReplacer.replaceKey(input, key);
                    // Assert
                    expect(result).toBe('<h2></h2>');
                });
            }),
            describe('check list', () => {
                it('input: "* ",\n\toutput: "<ul><li></li></ul>"', () => {
                    // Arrange
                    let input = '* ';
                    let markdownReplacer = new MDReplacer();
                    let key = '* ';
                    // Act
                    let result = markdownReplacer.replaceKey(input, key);
                    // Assert
                    expect(result).toBe('<ul><li></li></ul>');
                });
            }),
            describe('check bold', () => {
                it('input: "**** ",\n\toutput: "<b></b>"', () => {
                    // Arrange
                    let input = '****';
                    let markdownReplacer = new MDReplacer();
                    let key = '**';
                    // Act
                    let result = markdownReplacer.replaceKey(input, key);
                    // Assert
                    expect(result).toBe('<b></b>');
                });
            }),
            describe('check italic', () => {
                it('input: "**",\n\toutput: "<i></i>"', () => {
                    // Arrange
                    let input = '**';
                    let markdownReplacer = new MDReplacer();
                    let key = '**';
                    // Act
                    let result = markdownReplacer.replaceKey(input, key);
                    // Assert
                    expect(result).toBe('<i></i>');
                });
            }),
            describe('check cite text', () => {
                it('input: ">",\n\toutput: "<blockquote><p></p></blockquote>"', () => {
                    // Arrange
                    let input = '>';
                    let markdownReplacer = new MDReplacer();
                    let key = '>';
                    // Act
                    let result = markdownReplacer.replaceKey(input, key);
                    // Assert
                    expect(result).toBe('<blockquote><p></p></blockquote>');
                });
            }),
            describe('check paragraph', () => {
                it('input: " ",\n\toutput: "<p></p>"', () => {
                    // Arrange
                    let input = ' ';

                    let markdownReplacer = new MDReplacer();
                    let key = ' ';
                    // Act
                    let result = markdownReplacer.replaceKey(input, key);
                    // Assert
                    expect(result).toBe('<p></p>');
                });
            });
    });
});