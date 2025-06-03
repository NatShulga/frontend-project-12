
const ProfanityFilter = require('leo-profanity');


ProfanityFilter.add(['asshole', 'son of a bitch']);


function containsProfanity(text) {
  return ProfanityFilter.check(text);
}

function cleanProfanity(text, replacement = '****') {
  return ProfanityFilter.clean(text, replacement);
}

module.exports = {
  containsProfanity,
  cleanProfanity
};
