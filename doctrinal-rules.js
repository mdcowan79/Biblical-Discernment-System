const DOCTRINAL_RULES = {
    categories: [
        { id: 1, name: 'Theology Proper' },
        { id: 2, name: 'Christology' },
        { id: 3, name: 'Pneumatology' },
        { id: 4, name: 'Trinity' },
        { id: 5, name: 'Bibliology' },
        { id: 6, name: 'Anthropology' },
        { id: 7, name: 'Hamartiology' },
        { id: 8, name: 'Soteriology' },
        { id: 9, name: 'Ecclesiology' },
        { id: 10, name: 'Eschatology' },
        { id: 11, name: 'Angelology' },
        { id: 12, name: 'Covenant & Redemptive History' },
        { id: 13, name: 'Christian Identity' },
        { id: 14, name: 'Christian Ethics' },
        { id: 15, name: 'Christian Practice' },
        { id: 16, name: 'Cultural & Philosophical' }
    ],
    verdicts: [
        { id: 1, name: 'Biblical', icon: '🟩' },
        { id: 2, name: 'Biblical but Incomplete', icon: '🟩' },
        { id: 3, name: 'Mixed', icon: '🟨' },
        { id: 4, name: 'Distorted', icon: '🟨' },
        { id: 5, name: 'Speculative', icon: '🟨' },
        { id: 6, name: 'Unbiblical', icon: '🔴' },
        { id: 7, name: 'Deceptive', icon: '🔴' },
        { id: 8, name: 'Anti-Gospel', icon: '🔴' }
    ],
    generateSmartQuestions: function(teaching) {
        const teachingLower = teaching.toLowerCase();
        const questions = [];
        
        if (teachingLower.includes('jesus') || teachingLower.includes('christ')) {
            questions.push({
                category: 2, 
                text: 'Does this teaching affirm Jesus is fully God AND fully human?', 
                options: ['Yes', 'Unclear', 'No']
            });
        }
        if (teachingLower.includes('salvation') || teachingLower.includes('save') || teachingLower.includes('gospel')) {
            questions.push({
                category: 8, 
                text: 'Does this teaching affirm salvation is through faith in Christ alone?', 
                options: ['Yes', 'Unclear', 'No']
            });
        }
        if (teachingLower.includes('bible') || teachingLower.includes('scripture')) {
            questions.push({
                category: 5, 
                text: 'Does this teaching treat the 66 books of the Bible as Gods authoritative Word?', 
                options: ['Yes', 'Unclear', 'No']
            });
        }
        if (teachingLower.includes('god')) {
            questions.push({
                category: 1, 
                text: 'Does this teaching present God accurately according to Scripture?', 
                options: ['Yes', 'Unclear', 'No']
            });
        }
        if (teachingLower.includes('holy spirit') || teachingLower.includes('spirit')) {
            questions.push({
                category: 3, 
                text: 'Does this teaching affirm the Holy Spirit is fully God?', 
                options: ['Yes', 'Unclear', 'No']
            });
        }
        
        if (questions.length < 2) {
            questions.push({
                category: 12, 
                text: 'Does this teaching align with the biblical storyline?', 
                options: ['Yes', 'Unclear', 'No']
            });
        }
        
        return questions.slice(0, 6);
    },
    calculateVerdict: function(scores) {
        let passCount = 0, partialCount = 0, failCount = 0;
        Object.values(scores).forEach(score => {
            if (score === 1) passCount++;
            else if (score === 0.5) partialCount++;
            else failCount++;
        });
        
        const redFlagCategories = [2, 4, 8];
        const hasRedFlag = redFlagCategories.some(catId => scores[catId] === 0);
        
        if (failCount >= 2 && hasRedFlag) return 8;
        if (failCount >= 2) return 6;
        if (failCount === 1 && partialCount >= 2) return 7;
        if (failCount === 1) return 4;
        if (partialCount >= 4) return 5;
        if (partialCount >= 2) return 3;
        if (partialCount === 1) return 2;
        return 1;
    }
};
