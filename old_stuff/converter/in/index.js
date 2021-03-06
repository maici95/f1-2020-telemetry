



const fs = require('fs');


module.exports = function convert(inFile, outFile) {
    const file = inFile;
    
    let data = fs.readFileSync(file, 'utf8', (error, data) => data);

    console.log('----------------------------------------------------------');
    
    data = data.replace(/\//g, '');
    data = data.split('{');

    const packetName = [...data[0].split('struct')][1].trim();
    const objects = [];
    
    data.splice(0, 1);
    
    data = data.toString().split('\r\n');


    for (let i of data) {
        let item = i;
        let type = null;
        let key = null;
        let length = null;



        item = item.replace('\t', ' ');

        item = item.split(';');

        
 


        if (item.length > 1) {
            item = item.toString().split(/ +/g);
            if (item.length > 2) {
                type = item[1];
                key = item[2].trim().replace(',','');
            }
        }
    
        
        if (type && key) {
            key = key.replace('m_','')
    
            const match = key.match(/\[[0-9]*\]/);
    
            const i = {}
    
            if (match) {
                key = key.replace(match,'');
                length = match[0].replace(/[\[\]]/g,'');
            }
    
            i.key = key;
            i.type = type;
            
            if (length) {
                i.length = length;
            }
    
            objects.push(i);
        }
    }
    


    let output = '';
    
    output += `// packet : ${packetName}\n\n\n`;
    
    output += `module.exports = function ${packetName}(struct) {\n`;
    output += 'struct\n';
    

    for (let i of objects) {
        if (i.key === 'header') {
            continue;
        }

        if (packetName === 'PacketEventData') {
            continue;
        }

        if (i.length) {
            output += `\t.${i.type}('${i.key}', ${i.length})`; 
        } else {
            output += `\t.${i.type}('${i.key}')`; 
        }
    
        output += '\n';    
    }    
    output += '}\n';

    let typeData = '\n\n\n';

    typeData += `const ${packetName}_type = {\n`;

    for (let i of objects) {
        typeData += '\t'+i.key+': null,\n'
    }

    typeData += '}\n\n';
    typeData += `module.exports = ${packetName}_type;\n`;


    const typeFile = `${packetName}_type.js`;
    fs.writeFileSync('../out/types/'+typeFile, typeData, 'utf8', () => {});
    

    fs.writeFile(outFile, output, 'utf8', (error) => {})
}















