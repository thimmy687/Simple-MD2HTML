/**
 * the Markdown Replacer class parse a markdown string to a HTML string
 */
export class MDReplacer {
    constructor(){}

    /**
     * dictionary with md token and html replacement tags
     */
    public dictionary = {
        "## ": 
            {
                start: '<h2>',
                end: '</h2>'
            },
        "# ": 
            {
                start:'<h1>',
                end:'</h1>'
            },
        "**": 
            {
                start : '<b>',
                end: '</b>'
            },
        "* ": 
            {
                start : '<ul><li>',
                end: '</li></ul>'
            },
        "*":{
                start : '<i>',
                end: '</i>'
            }, 
        ">": {
                start : '<blockquote><p>',
                end: '</p></blockquote>'
            },
        " ": {
                start : '<p>',
                end: '</p>'
            }
    }
    
    /**
     * the replace method splits the string in blocks and parse each line
     * @param input : the whole document as string input
     */
    replace(input: string):string {
        // return if input is empty
        if(input == "") return ""; 

        let blocks = input.split('\n');
        let result = "";

        for(let line in blocks){
            for(let key in this.dictionary){
                while(blocks[line].indexOf(key) !== -1){
                    if((key === '>'|| key === ' ') && !this.startsWith(blocks[line], key)){
                        break;
                    }     
                    blocks[line] = this.replaceKey(blocks[line],key,this.dictionary[key]);          
                }
            }
            if(line !== '0'){
                result = result.concat('<br/>');
            }
            result = result.concat(blocks[line]);            
        }
        result = this.combineListElements(result);
        return result; 
    }

    /**
     * replace md tokens to html tags
     * @param input: string to parse
     * @param key: token to search
     * @param replacements: html tokens for replacements
     */
    replaceKey(input:string,key:string, replacements: object):string {
        let result = input;
        switch (key) {
            case '**':
                result = this.replaceDouble(result,key, replacements);
                break;
            case '*':
                result = this.replaceDouble(result,key, replacements);
                break;
            
            default:
                result = result.replace(key, replacements['start']).concat(replacements['end']);           
                break;
        }
        return result;
    }

    /**
     * if the markdown token have a start and en token, 
     * we replace both
     * @param input: string to parse
     * @param key: token to replace
     * @param replacements: html tags to insert
     */
    replaceDouble(input:string,key:string, replacements:object):string{
       let result = input;
        for(let i = 0; i<2; i++){
            if(i === 0){
                result = result.replace(key, replacements['start']);
            }else{
                
                result = result.replace(key, replacements['end']);
            }
        }
        return result;
    }

    /**
     * small helper method to check if the current token is a starting token
     * @param input: string to check
     * @param key: token to check
     */
    startsWith(input: string, key:string): boolean{
        let inputNormalized = input;
        if(key !== ' '){
            inputNormalized = input.replace(/ /g, '');
        }
        if(inputNormalized.charAt(0) === key){
            return true;
        }
        return false;
    }

   /**
    * combine multiline list elements to one list
    * @param input: string to parse
    */
    combineListElements(input: string):string{
        let result = input;
        result = result.replace(new RegExp('</li></ul><br/><ul><li>','g'),'</li><br/><li>')     
        return result;
    }
}