
// DOM Elements
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const passwordOutput = document.getElementById('passwordOutput');
const strengthMeter = document.getElementById('strengthMeter');
const strengthLabel = document.getElementById('strengthLabel');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const algorithmSelect = document.getElementById('algorithm');
const algorithmDescription = document.getElementById('algorithmDescription');
const historyList = document.getElementById('historyList');

// Character sets
const characterSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Word lists for memorable passwords
const wordList = [
    'apple', 'brave', 'cloud', 'dragon', 'eagle', 'flame', 'globe', 'heart',
    'ice', 'jump', 'king', 'light', 'moon', 'night', 'ocean', 'peace',
    'quick', 'river', 'star', 'tree', 'unity', 'voice', 'water', 'xray',
    'young', 'zenith', 'alpha', 'beta', 'gamma', 'delta'
];

// Password history
let passwordHistory = [];

// Update length value display
lengthSlider.addEventListener('input', function () {
    lengthValue.textContent = this.value;
});

// Update algorithm description
algorithmSelect.addEventListener('change', function () {
    updateAlgorithmDescription();
});

function updateAlgorithmDescription() {
    const algorithm = algorithmSelect.value;
    const descriptions = {
        crypto: 'Uses cryptographically secure random number generation for maximum security.',
        pronounceable: 'Creates passwords that are easier to pronounce and remember while maintaining security.',
        pattern: 'Generates passwords based on patterns (consonants, vowels, numbers) for memorability.',
        memorable: 'Creates passphrases by combining random words for high security and memorability.'
    };
    algorithmDescription.textContent = descriptions[algorithm] || '';
}

// Initialize algorithm description
updateAlgorithmDescription();

// Generate password function
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const algorithm = algorithmSelect.value;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    // Validate at least one character set is selected
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        passwordOutput.textContent = 'Please select at least one character type';
        passwordOutput.style.color = '#e74c3c';
        return;
    }

    let password;

    switch (algorithm) {
        case 'crypto':
            password = generateCryptoPassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
            break;
        case 'pronounceable':
            password = generatePronounceablePassword(length);
            break;
        case 'pattern':
            password = generatePatternPassword(length);
            break;
        case 'memorable':
            password = generateMemorablePassword(length);
            break;
        default:
            password = generateCryptoPassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    }

    // Display the password
    passwordOutput.textContent = password;
    passwordOutput.style.color = '#2c3e50';

    // Calculate and display strength
    updatePasswordStrength(password);

    // Add to history
    addToHistory(password);
}

// Cryptographically secure password generation
function generateCryptoPassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    let chars = '';
    if (includeLowercase) chars += characterSets.lowercase;
    if (includeUppercase) chars += characterSets.uppercase;
    if (includeNumbers) chars += characterSets.numbers;
    if (includeSymbols) chars += characterSets.symbols;

    let password = '';
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        password += chars[randomValues[i] % chars.length];
    }

    return password;
}

// Pronounceable password generation
function generatePronounceablePassword(length) {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    let password = '';

    for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
            // Even positions: consonants
            password += consonants[Math.floor(Math.random() * consonants.length)];
        } else {
            // Odd positions: vowels
            password += vowels[Math.floor(Math.random() * vowels.length)];
        }
    }

    // Capitalize first letter
    password = password.charAt(0).toUpperCase() + password.slice(1);

    return password;
}

// Pattern-based password generation
function generatePatternPassword(length) {
    const patterns = [
        'CvccvC!n', // Capital, vowel, consonant, consonant, vowel, Capital, symbol, number
        'cVcc!nc',  // consonant, Vowel, consonant, consonant, symbol, number, consonant
        'Cvcn!cV',  // Capital, vowel, consonant, number, symbol, consonant, Vowel
        'nCvc!cv'   // number, Capital, vowel, consonant, symbol, consonant, vowel
    ];

    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    let password = '';

    for (let char of pattern) {
        if (password.length >= length) break;

        switch (char) {
            case 'C': // Uppercase consonant
                password += 'BCDFGHJKLMNPQRSTVWXYZ'[Math.floor(Math.random() * 21)];
                break;
            case 'c': // Lowercase consonant
                password += 'bcdfghjklmnpqrstvwxyz'[Math.floor(Math.random() * 21)];
                break;
            case 'V': // Uppercase vowel
                password += 'AEIOU'[Math.floor(Math.random() * 5)];
                break;
            case 'v': // Lowercase vowel
                password += 'aeiou'[Math.floor(Math.random() * 5)];
                break;
            case 'n': // Number
                password += '0123456789'[Math.floor(Math.random() * 10)];
                break;
            case '!': // Symbol
                password += '!@#$%^&*'[Math.floor(Math.random() * 8)];
                break;
        }
    }

    // Fill remaining length with random characters
    const allChars = characterSets.lowercase + characterSets.uppercase + characterSets.numbers + characterSets.symbols;
    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password;
}

// Memorable password generation
function generateMemorablePassword(length) {
    let password = '';
    const separator = '-';

    while (password.length < length) {
        const word = wordList[Math.floor(Math.random() * wordList.length)];
        if (password.length + word.length + 1 <= length) {
            password += (password ? separator : '') + word;
        } else {
            break;
        }
    }

    // Add numbers if there's space
    if (password.length < length - 1) {
        password += separator + Math.floor(Math.random() * 100);
    }

    return password;
}

// Calculate password strength
function updatePasswordStrength(password) {
    let strength = 0;

    // Length factor
    strength += Math.min(password.length / 4, 10);

    // Character variety
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    const varietyCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    strength += varietyCount * 5;

    // Entropy approximation
    const charSetSize = new Set(password).size;
    strength += Math.log2(charSetSize) * 2;

    // Update strength meter and label
    strengthMeter.className = 'strength-fill';

    if (strength < 10) {
        strengthMeter.classList.add('strength-weak');
        strengthLabel.textContent = 'Password Strength: Weak';
    } else if (strength < 20) {
        strengthMeter.classList.add('strength-medium');
        strengthLabel.textContent = 'Password Strength: Medium';
    } else if (strength < 25) {
        strengthMeter.classList.add('strength-strong');
        strengthLabel.textContent = 'Password Strength: Strong';
    } else {
        strengthMeter.classList.add('strength-very-strong');
        strengthLabel.textContent = 'Password Strength: Very Strong';
    }
}

// Add password to history
function addToHistory(password) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > 5) {
        passwordHistory.pop();
    }

    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    historyList.innerHTML = '';

    passwordHistory.forEach((password, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';

        const passwordSpan = document.createElement('span');
        passwordSpan.textContent = password;

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-history';
        copyButton.textContent = 'Copy';
        copyButton.addEventListener('click', () => {
            copyToClipboard(password);
        });

        historyItem.appendChild(passwordSpan);
        historyItem.appendChild(copyButton);
        historyList.appendChild(historyItem);
    });
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy password to clipboard');
    });
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', () => {
    const password = passwordOutput.textContent;
    if (password && password !== 'Your password will appear here' && !password.includes('Please select')) {
        copyToClipboard(password);
    }
});

// Generate initial password
generatePassword();
