import { FormGroup } from "@angular/forms";

export class PasswordValidators {
    public passwordMatchValidator(f: FormGroup) {
        return f.get('password').value ===  f.get('confirmPassword').value ? null: {'mismatch' : true};
    }
}