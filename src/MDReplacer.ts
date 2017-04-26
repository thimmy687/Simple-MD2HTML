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
                    blocks[line] = this.replaceKey(blocks[line],key);          
                }
            }
            if(line !== '0'){
                result = result.concat('<br/>');
            }
            result = result.concat(blocks[line]);            
        }
        result = this.combineMultiLineTags(result);
        return result; 
    }

    /**
     * replace md tokens to html tags
     * @param input: string to parse
     * @param key: token to search
     */
    replaceKey(input:string,key:string):string {
        let result = input;
        switch (key) {
            case '**':
                result = this.replaceDouble(result,key);
                break;
            case '*':
                result = this.replaceDouble(result,key);
                break;
            default:
                result = result.replace(key, this.dictionary[key]['start']).concat(this.dictionary[key]['end']);           
                break;
        }
        return result;
    }

    /**
     * If the markdown token has a start and end token, 
     * we replaces both
     * @param input: string to parse
     * @param key: token to replace
     */
    replaceDouble(input:string,key:string):string{
       let result = input;
        for(let i = 0; i<2; i++){
            if(i === 0){
                result = result.replace(key, this.dictionary[key]['start']);
            }else{
                
                result = result.replace(key, this.dictionary[key]['end']);
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
    combineMultiLineTags(input: string):string{
        let result = input;
        result = result.replace(new RegExp('</li></ul><br/><ul><li>','g'),'</li><br/><li>') 
        result = result.replace(new RegExp('</p></blockquote><br/><blockquote><p>','g'),'</p><br/><p>') 
            
        return result;
    }
}