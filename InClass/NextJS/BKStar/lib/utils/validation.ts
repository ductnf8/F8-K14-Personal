export const validateRegisterForm = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
): { [key: string]: string } => {
    const errors: { [key: string]: string } = {}

    // Validate name
    if (!name.trim()) {
        errors.name = 'Tên không được để trống'
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        errors.name = 'Tên chỉ được chứa chữ cái và khoảng trắng'
    } else if (name.length > 50) {
        errors.name = 'Tên không được vượt quá 50 ký tự'
    }

    // Validate email
    if (!email.trim()) {
        errors.email = 'Email không được để trống'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Email không hợp lệ'
    } else if (email.length > 100) {
        errors.email = 'Email không được vượt quá 100 ký tự'
    }

    // Validate password
    if (!password) {
        errors.password = 'Mật khẩu không được để trống'
    } else if (password.length < 8) {
        errors.password = 'Mật khẩu phải có ít nhất 8 ký tự'
    } else if (password.length > 50) {
        errors.password = 'Mật khẩu không được vượt quá 50 ký tự'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
        errors.password = 'Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt'
    }

    // Validate confirm password
    if (!confirmPassword) {
        errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }

    return errors
}