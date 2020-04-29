const yaml = require('js-yaml');
const fs = require('fs');
const root = require('./root');
const build = async () => {
    let langs = fs.readdirSync(root('locales'));
    let lang = {};
    for (let i of langs) {
        const content = fs.readFileSync(root(`locales/${i}`)).toString();
        lang[i.split('.')[0]] = yaml.safeLoad(content);
    }
    fs.writeFileSync(root('.build/locales.json'), JSON.stringify(lang));
}
module.exports = build;
