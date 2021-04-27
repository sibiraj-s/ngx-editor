import { ValidatorFn } from '@angular/forms';
import { Schema } from 'prosemirror-model';
export declare class Validators {
    static required(userSchema?: Schema): ValidatorFn;
    static maxLength(maxLength: number, userSchema?: Schema): ValidatorFn;
    static minLength(minLength: number, userSchema?: Schema): ValidatorFn;
}
//# sourceMappingURL=validators.d.ts.map