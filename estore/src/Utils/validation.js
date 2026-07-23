export const validateRegister = (formData) => {
    const errors = {};

    // First Name
    if (!formData.firstName.trim()) {
        errors.firstName = "First name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
        errors.firstName = "Only letters are allowed.";
    } else if (formData.firstName.trim().length < 2) {
        errors.firstName = "Minimum 2 characters required.";
    }

    // Last Name
    if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z ]+$/.test(formData.lastName)) {
        errors.lastName = "Only letters are allowed.";
    } else if (formData.lastName.trim().length < 2) {
        errors.lastName = "Minimum 2 characters required.";
    }

    // Email
    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required.";
    }
    else if (formData.email.includes(" ")) {
        errors.email = "Email cannot contain spaces.";
    }
    else if (!formData.email.includes("@")) {
        errors.email = "Email must contain '@'.";
    }
    else if (formData.email.startsWith("@")) {
        errors.email = "Email cannot start with '@'.";
    }
    else if (formData.email.endsWith("@")) {
        errors.email = "Domain name is missing.";
    }
    else if (!formData.email.split("@")[1]?.includes(".")) {
        errors.email = "Domain must contain a '.' (example: gmail.com).";
    }
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
        errors.email = "Please enter a valid email.";
    }

    // Phone
    if (!formData.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
        errors.phone = "Enter a valid 10-digit mobile number.";
    }

    // Password
    if (!formData.password) {
        errors.password = "Password is required.";
    } else if (formData.password.length < 4) {
        errors.password = "Password must be at least 4 characters.";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
};

export const validateLogin = (formData) => {

    const errors = {};

    // Email
    // Email
    if (!formData.email.trim()) {
        errors.email = "Email is required.";
    }
    else if (formData.email.includes(" ")) {
        errors.email = "Email cannot contain spaces.";
    }
    else if (!formData.email.includes("@")) {
        errors.email = "Email must contain '@'.";
    }
    else if (formData.email.startsWith("@")) {
        errors.email = "Email cannot start with '@'.";
    }
    else if (formData.email.endsWith("@")) {
        errors.email = "Domain name is missing.";
    }
    else if (!formData.email.split("@")[1]?.includes(".")) {
        errors.email = "Domain must contain a '.' (example: gmail.com).";
    }
    else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
        errors.email = "Please enter a valid email.";
    }

    // Password
    if (!formData.password) {
        errors.password = "Password is required.";
    }

    return errors;

};