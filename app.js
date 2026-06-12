// BDS Assessment Data
const BDS_CONFIG = {
    categories: [
        { id: 1, name: 'Theology Proper', description: 'Claims about God\'s nature, attributes, existence, eternality, omniscience, etc.' },
        { id: 2, name: 'Christology', description: 'Claims about the Person and work of Christ—His deity, humanity, incarnation, resurrection.' },
        { id: 3, name: 'Pneumatology', description: 'Claims about the Holy Spirit—Personhood, deity, gifts, indwelling, filling.' },
        { id: 4, name: 'Trinity', description: 'Claims about the unity and distinction of Father, Son, and Spirit.' },
        { id: 5, name: 'Bibliology', description: 'Claims about Scripture—authority, inspiration, inerrancy, sufficiency.' },
        { id: 6, name: 'Anthropology', description: 'Claims about human nature, the image of God, sin, fallenness, dignity.' },
        { id: 7, name: 'Hamartiology', description: 'Claims about sin—nature, effects, guilt, corruption.' },
        { id: 8, name: 'Soteriology', description: 'Claims about salvation—atonement, justification, regeneration, sanctification, glorification.' },
        { id: 9, name: 'Ecclesiology', description: 'Claims about the church—identity, mission, ordinances, leadership.' },
        { id: 10, name: 'Eschatology', description: 'Claims about last things—return of Christ, resurrection, judgment, kingdom.' },
        { id: 11, name: 'Angelology', description: 'Claims about angels, demons, Satan, spiritual warfare.' },
        { id: 12, name: 'Covenant & Redemptive History', description: 'Claims about covenants, dispensations, biblical storyline, typology.' },
        { id: 13, name: 'Christian Identity', description: 'Claims about who believers are in Christ—union, adoption, new nature, freedom.' },
        { id: 14, name: 'Christian Ethics', description: 'Claims about moral living, holiness, obedience, righteousness, virtue.' },
        { id: 15, name: 'Christian Practice', description: 'Claims about spiritual disciplines, worship, prayer, sacraments, daily life.' },
        { id: 16, name: 'Cultural & Philosophical Claims', description: 'Claims about worldview, culture, ideologies, psychology, philosophy, and their theological implications.' }
    ],
    verdicts: [
        { id: 1, name: 'Biblical', color: '#27ae60', icon: '🟩' },
        { id: 2, name: 'Biblical but Incomplete', color: '#27ae60', icon: '🟩' },
        { id: 3, name: 'Mixed', color: '#f39c12', icon: '🟨' },
        { id: 4, name: 'Distorted', color: '#f39c12', icon: '🟨' },
        { id: 5, name: 'Speculative', color: '#f39c12', icon: '🟨' },
        { id: 6, name: 'Unbiblical', color: '#e74c3c', icon: '🔴' },
        { id: 7, name: 'Deceptive', color: '#e74c3c', icon: '🔴' },
        { id: 8, name: 'Anti-Gospel', color: '#c0392b', icon: '🔴' }
    ]
};

// Assessment State
let currentAssessment = {
    teaching: '',
    source: '',
    answers: {}
};

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selected = document.getElementById(sectionId);
    if (selected) {
        selected.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Assessment Flow
function startAssessment() {
    const text = document.getElementById('teachingText').value.trim();
    const url = document.getElementById('teachingUrl').value.trim();
    const video = document.getElementById('videoDescription').value.trim();

    if (!text && !url && !video) {
        alert('Please describe the teaching, provide a link, or tell us about a video.');
        return;
    }

    // Store the teaching
    currentAssessment.teaching = text || url || video;
    currentAssessment.source = url ? 'Link' : (text ? 'Description' : 'Video');

    // Show questions stage
    showQuestions();
}

function showQuestions() {
    const inputStage = document.getElementById('inputStage');
    const questionsStage = document.getElementById('questionsStage');
    const container = document.getElementById('questionsContainer');

    inputStage.classList.remove('active');
    questionsStage.classList.add('active');

    // Build questions for each category
    let questionsHTML = `
        <h3>Evaluating: "${truncateString(currentAssessment.teaching, 100)}"</h3>
        <p class="subtitle">Answer these questions for each theological category:</p>
    `;

    BDS_CONFIG.categories.forEach((category, index) => {
        questionsHTML += `
            <div class="question">
                <div class="question-number">Category ${index + 1} of ${BDS_CONFIG.categories.length}</div>
                <div class="question-text">${category.name}</div>
                <div class="question-text" style="font-size: 0.9rem; color: #666; margin-top: -0.5rem;">Does this teaching align with biblical ${category.name.toLowerCase()}?</div>
                <div class="question-options">
                    <button class="question-btn" onclick="answerQuestion(${category.id}, 'yes')">✓ Yes, Aligns</button>
                    <button class="question-btn" onclick="answerQuestion(${category.id}, 'partial')">⚠ Partial/Unclear</button>
                    <button class="question-btn" onclick="answerQuestion(${category.id}, 'no')">✗ No, Contradicts</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = questionsHTML;
}

function answerQuestion(categoryId, answer) {
    currentAssessment.answers[categoryId] = answer;

    // Visual feedback
    const buttons = event.target.parentElement.querySelectorAll('.question-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
}

function calculateResult() {
    // Check if all questions answered
    if (Object.keys(currentAssessment.answers).length < BDS_CONFIG.categories.length) {
        alert('Please answer all questions before continuing.');
        return;
    }

    // Calculate scores
    const scores = {
        pass: 0,
        partial: 0,
        fail: 0
    };

    Object.values(currentAssessment.answers).forEach(answer => {
        if (answer === 'yes') scores.pass++;
        else if (answer === 'partial') scores.partial++;
        else if (answer === 'no') scores.fail++;
    });

    // Determine verdict based on scores
    let verdict;
    const total = BDS_CONFIG.categories.length;

    if (scores.fail >= 2 && hasRedFlagCategory(scores)) {
        verdict = 8; // Anti-Gospel
    } else if (scores.fail >= 2) {
        verdict = 6; // Unbiblical
    } else if (scores.fail === 1 && scores.partial >= 2) {
        verdict = 7; // Deceptive
    } else if (scores.fail === 1) {
        verdict = 4; // Distorted
    } else if (scores.partial >= 4) {
        verdict = 5; // Speculative
    } else if (scores.partial >= 2) {
        verdict = 3; // Mixed
    } else if (scores.partial === 1) {
        verdict = 2; // Biblical but Incomplete
    } else {
        verdict = 1; // Biblical
    }

    showResults(verdict, scores);
}

function hasRedFlagCategory(scores) {
    // Check if the teaching contradicts core gospel categories
    const redFlagIds = [2, 4, 8]; // Christology, Trinity, Soteriology
    let hasRedFlag = false;

    redFlagIds.forEach(id => {
        if (currentAssessment.answers[id] === 'no') {
            hasRedFlag = true;
        }
    });

    return hasRedFlag;
}

function showResults(verdictId, scores) {
    const questionsStage = document.getElementById('questionsStage');
    const resultsStage = document.getElementById('resultsStage');
    const container = document.getElementById('resultsContainer');

    questionsStage.classList.remove('active');
    resultsStage.classList.add('active');

    const verdict = BDS_CONFIG.verdicts[verdictId - 1];
    const total = BDS_CONFIG.categories.length;

    let resultsHTML = `
        <div class="results-box" style="background: linear-gradient(135deg, ${verdict.color} 0%, ${adjustColor(verdict.color, -20)} 100%);">
            <div class="verdict-badge">${verdict.icon} ${verdict.name}</div>
            <div class="verdict-title">Assessment Complete</div>
            <div class="verdict-description">Based on ${total} theological categories</div>
        </div>

        <div class="analysis-section">
            <h4>Quick Summary</h4>
            <p><strong>Teaching:</strong> ${truncateString(currentAssessment.teaching, 150)}</p>
            <p style="margin-top: 1rem;">
                <strong>Results:</strong> ${scores.pass} Aligned, ${scores.partial} Partial/Unclear, ${scores.fail} Contradictions
            </p>
        </div>

        <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Category Breakdown</h4>
        <div class="category-results">
    `;

    BDS_CONFIG.categories.forEach(category => {
        const answer = currentAssessment.answers[category.id];
        let statusClass = 'status-pass';
        let statusText = '✓ Aligns';

        if (answer === 'no') {
            statusClass = 'status-fail';
            statusText = '✗ Contradicts';
        } else if (answer === 'partial') {
            statusClass = 'status-caution';
            statusText = '⚠ Partial/Unclear';
        }

        resultsHTML += `
            <div class="category-item">
                <div class="category-name">${category.name}</div>
                <div class="category-status ${statusClass}">${statusText}</div>
            </div>
        `;
    });

    resultsHTML += `
        </div>

        <div class="analysis-section">
            <h4>What This Means</h4>
            <p>${getVerdictExplanation(verdictId, scores)}</p>
        </div>

        <div class="next-steps">
            <h4>Next Steps</h4>
            <ul style="margin-left: 1.5rem;">
                <li>Review the categories where you see "Contradicts" or "Partial/Unclear"</li>
                <li>Compare the teaching to Scripture in those areas</li>
                <li>Discuss with your church leader or mentor</li>
                <li>Pray for wisdom and discernment</li>
                <li>Run the assessment again if the teaching is revised or clarified</li>
            </ul>
        </div>
    `;

    container.innerHTML = resultsHTML;
}

function getVerdictExplanation(verdictId, scores) {
    const explanations = {
        1: '✓ This teaching aligns with Scripture and biblical doctrine. It passes theological examination across all 16 categories. Safe to embrace and share.',
        2: '✓ This teaching is true but may be missing important context or qualifiers. Consider where it could be more complete or nuanced.',
        3: '⚠ This teaching contains both truth and error. Some parts align with Scripture; others need correction. Proceed with caution and seek clarity on contradictions.',
        4: '⚠ This teaching uses biblical language but reshapes its meaning. The language sounds right, but the substance has been distorted. Examine the definitions being used.',
        5: '⚠ This teaching goes beyond what Scripture reveals. It may rely on imagination, inference, or conjecture. Be cautious about treating it as doctrine.',
        6: '✗ This teaching directly contradicts Scripture. It may use Christian terminology, but the core claim is unbiblical. Avoid this teaching.',
        7: '✗ This teaching appears biblical on the surface but is designed to mislead. It obscures truth or undermines gospel clarity. This is potentially dangerous.',
        8: '✗ This teaching attacks or replaces the gospel itself. It undermines salvation, Christ\'s work, or justification by faith. This is anti-Christian and must be rejected.'
    };

    return explanations[verdictId] || 'Unable to determine explanation.';
}

function resetAssessment() {
    currentAssessment = {
        teaching: '',
        source: '',
        answers: {}
    };

    document.getElementById('teachingText').value = '';
    document.getElementById('teachingUrl').value = '';
    document.getElementById('videoDescription').value = '';

    const inputStage = document.getElementById('inputStage');
    const questionsStage = document.getElementById('questionsStage');
    const resultsStage = document.getElementById('resultsStage');

    inputStage.classList.add('active');
    questionsStage.classList.remove('active');
    resultsStage.classList.remove('active');
}

// Utility Functions
function truncateString(str, length) {
    if (str.length > length) {
        return str.substring(0, length) + '...';
    }
    return str;
}

function adjustColor(color, percent) {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('BDS App Loaded');
});