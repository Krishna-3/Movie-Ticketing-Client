import { FormGroup } from "@angular/forms";

export class CustomValidator {

    static validatePasswords(control: FormGroup) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword');

        if (password !== confirmPassword?.value)
            return confirmPassword?.setErrors({ invalidPassword: true });

        return null
    }
}