

const otpStorage = new Map(); // Temporary in-memory storage for OTPs and user data

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    // console.log(`Generated OTP: ${otp}`); // Log the generated OTP
    return otp;
}

const storeOTP = async (email, otp, userData) => {
    otpStorage.set(email, { otp, userData });
    // console.log(`Stored OTP for ${email}: ${otp}, UserData=${JSON.stringify(userData)}`); // Log OTP storage
    setTimeout(() => {
        otpStorage.delete(email);
        // console.log(`Deleted OTP for ${email} after timeout`); // Log OTP deletion after timeout
    }, 10 * 60 * 1000); // 10 minutes
}

const getUserData = async (email) => {
    const storedData = otpStorage.get(email);
    return storedData ? storedData.userData : null;
}

const verifyOTP = async (email, otp) => {
    const storedData = otpStorage.get(email);
    // console.log(`Verifying OTP for ${email}. Provided OTP: ${otp}, Stored Data: ${JSON.stringify(storedData)}`); // Log OTP verification
    // console.log(`Verifying OTP for ${email}. Provided OTP: ${otp}, Stored OTP: ${storedData ? storedData.otp : 'none'}`); // Log OTP verification
    if (storedData && storedData.otp === otp) {
        otpStorage.delete(email); // Remove OTP and user data after verification
        return storedData.userData;
    }
    return null;
}

 export{ generateOTP, storeOTP, verifyOTP, getUserData };
