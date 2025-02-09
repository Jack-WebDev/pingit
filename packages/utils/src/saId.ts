type IDComponents = {
    dateOfBirth: Date;
    gender: 'male' | 'female';
    citizenship: 'citizen' | 'permanent-resident' | 'refugee';
    valid: boolean;
};

export class InvalidIDError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidIDError';
    }
}

export function validateIDNumber(idNumber: string): boolean {
    // Check basic format
    if (!/^\d{13}$/.test(idNumber)) {
        return false;
    }

    try {
        // Validate date
        const dob = getDateOfBirthFromID(idNumber);
        if (isNaN(dob.getTime())) {
            return false;
        }

        // Validate gender digits (6-9)
        const genderDigits = parseInt(idNumber.substring(6, 10));
        if (genderDigits < 0 || genderDigits > 9999) {
            return false;
        }

        // Validate citizenship digit (10)
        const citizenshipDigit = parseInt(idNumber.charAt(10));
        if (![0, 1, 2].includes(citizenshipDigit)) {
            return false;
        }

        // Validate checksum
        const idWithoutChecksum = idNumber.slice(0, -1);
        const providedChecksum = parseInt(idNumber.slice(-1));
        const calculatedChecksum = luhnAlgorithm(idWithoutChecksum);

        return providedChecksum === calculatedChecksum;
    } catch {
        return false;
    }
}

export function parseIDNumber(idNumber: string): IDComponents {
    if (!validateIDNumber(idNumber)) {
        throw new InvalidIDError('Invalid ID number format or checksum');
    }

    const dateOfBirth = getDateOfBirthFromID(idNumber);
    const genderDigit = parseInt(idNumber.substring(6, 10));
    const citizenshipDigit = parseInt(idNumber.charAt(10));

    const gender = genderDigit >= 5000 ? 'male' : 'female';

    let citizenship: 'citizen' | 'permanent-resident' | 'refugee';
    switch (citizenshipDigit) {
        case 0:
            citizenship = 'citizen';
            break;
        case 1:
            citizenship = 'permanent-resident';
            break;
        case 2:
            citizenship = 'refugee';
            break;
        default:
            throw new InvalidIDError('Invalid citizenship digit');
    }

    return {
        dateOfBirth,
        gender,
        citizenship,
        valid: true,
    };
}

export function getDateOfBirthFromID(idNumber: string): Date {
    const yearPart = idNumber.substring(0, 2);
    const monthPart = idNumber.substring(2, 4);
    const dayPart = idNumber.substring(4, 6);

    const currentYear = new Date().getFullYear() % 100;
    const century = parseInt(yearPart) <= currentYear ? '20' : '19';

    const year = century + yearPart;
    const month = parseInt(monthPart);
    const day = parseInt(dayPart);

    // Validate date components
    if (month < 1 || month > 12) {
        throw new InvalidIDError('Invalid month in ID number');
    }

    if (day < 1 || day > 31) {
        throw new InvalidIDError('Invalid day in ID number');
    }

    const date = new Date(parseInt(year), month - 1, day);

    // Verify the date is valid (handles edge cases like Feb 31)
    if (
        date.getFullYear() !== parseInt(year) ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        throw new InvalidIDError('Invalid date in ID number');
    }

    return date;
}

function luhnAlgorithm(idWithoutChecksum: string): number {
    let sum = 0;
    let isSecond = false;

    for (let i = idWithoutChecksum.length - 1; i >= 0; i--) {
        let digit = parseInt(idWithoutChecksum[i] ?? '0');

        if (isSecond) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isSecond = !isSecond;
    }

    return (10 - (sum % 10)) % 10;
}

export function generateFakeSouthAfricanID(
    age: number,
    gender: 'male' | 'female',
    birthMonth: number,
    birthDay: number,
    citizenship: 'citizen' | 'permanent-resident' | 'refugee' = 'citizen'
): string {
    // Input validation
    if (age < 0 || age > 120) {
        throw new Error('Age must be between 0 and 120');
    }
    if (birthMonth < 1 || birthMonth > 12) {
        throw new Error('Birth month must be between 1 and 12');
    }
    if (birthDay < 1 || birthDay > 31) {
        throw new Error('Birth day must be between 1 and 31');
    }

    // Calculate birth year
    const currentDate = new Date();
    const birthYear = currentDate.getFullYear() - age;
    const birthYearTwoDigits = birthYear % 100;

    // Format month and day with leading zeros
    const month = birthMonth.toString().padStart(2, '0');
    const day = birthDay.toString().padStart(2, '0');

    // Generate gender sequence (4000-8999 for males, 0000-3999 for females)
    const sequence =
        gender === 'male'
            ? 4000 + Math.floor(Math.random() * 5000)
            : Math.floor(Math.random() * 4000);

    // Set citizenship digit
    let citizenshipDigit: number;
    switch (citizenship) {
        case 'citizen':
            citizenshipDigit = 0;
            break;
        case 'permanent-resident':
            citizenshipDigit = 1;
            break;
        case 'refugee':
            citizenshipDigit = 2;
            break;
    }

    const placeholder = 8;

    // Build ID without checksum
    const idWithoutChecksum = `${birthYearTwoDigits.toString().padStart(2, '0')}${month}${day}${sequence.toString().padStart(4, '0')}${citizenshipDigit}${placeholder}`;

    // Calculate and append checksum
    const checksum = luhnAlgorithm(idWithoutChecksum);
    const generatedID = `${idWithoutChecksum}${checksum}`;

    return generatedID;
}
